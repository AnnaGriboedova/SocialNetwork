import {getAuthUserData} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {InferActionTypes, StateType} from "./redux-store";
import {emojiApi} from "../api/emojiApi";

const INITIALIZED_SUCCESS = 'APP/INITIALIZED_SUCCESS';
const SET_EMOJI_BY_CATEGORY = 'APP/SET_EMOJI_BY_CATEGORY';
const SET_SUBCATEGORY_EMOJIS = 'APP/SET_SUBCATEGORY_EMOJIS';

type InitialStateType = {
    initialized: boolean,
    emojisByCategory: Array<EmojiCategory>,
};

export type EmojiCategory = {
    categorySlug: string,
    subcategoryEmojis?: Array<EmojiType>
}
export type EmojiType = {
    slug: string,
    character: string,
    unicodeName: string,
    codePoint: string,
    group: string,
    subGroup: string
}

let initialState: InitialStateType = {
    initialized: false,
    emojisByCategory: [],

};

export type ActionTypes = InferActionTypes<typeof actions>

type ThunkType = ThunkAction<void, StateType, unknown, ActionTypes>

const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true,
            };
        }
        case SET_EMOJI_BY_CATEGORY: {
            return {
                ...state,
                emojisByCategory: [...state.emojisByCategory, ...action.emojisByCategory]
            };
        }
        case SET_SUBCATEGORY_EMOJIS: {
            return {
                ...state,
                emojisByCategory: state.emojisByCategory.map((category: EmojiCategory) => {
                    if (category['categorySlug'] === action.categorySlug) {
                        return {...category, subcategoryEmojis: action.subcategoryEmojis}
                    }
                    return category
                })
            }
        }

    }
    return state
};

const actions = {
    setEmojisByCategory: (emojisByCategory: Array<EmojiCategory>) => ({
        type: SET_EMOJI_BY_CATEGORY,
        emojisByCategory
    }) as const,
    initializedSuccess: () => ({
        type: INITIALIZED_SUCCESS,
    }) as const,
    setSubcategoryEmojis: (categorySlug: string, subcategoryEmojis: Array<EmojiType>) => ({
        type: SET_SUBCATEGORY_EMOJIS,
        categorySlug,
        subcategoryEmojis
    }) as const
}

export const getSubcategoryEmojis = (categorySlug: string): ThunkType =>
    async (dispatch) => {
        let response = await emojiApi.getSubcategoryEmojis(categorySlug);
        if (response.data) {
            let subcategoryEmojis = response.data;
            dispatch(actions.setSubcategoryEmojis(categorySlug, subcategoryEmojis))
        } else {
            if (typeof response.data === 'object' && response.status === 200) {
                return Promise.reject('В этой категории ещё нет эмоджи')
            }
            return Promise.reject('Ошибка' + response.status)

        }

    };

export type InitEmojisByCategoryThunkAction = ThunkAction<Promise<void>, StateType, unknown, ActionTypes>
export const initEmojisByCategory = (): InitEmojisByCategoryThunkAction =>
    async (dispatch) => {
        let emojisCategory_response = await emojiApi.getEmojiCategory();
        if (emojisCategory_response.data) {
            let emojisByCategory = [];
            for (const category of emojisCategory_response.data) {
                let categoryObj = {categorySlug: category.slug};

                emojisByCategory.push(categoryObj)

            }

            dispatch(actions.setEmojisByCategory(emojisByCategory));
        }
    };

export const initializeApp = (): ThunkType =>
    (dispatch) => {
        let promise = dispatch(getAuthUserData());
        Promise.all([promise]).then(
            () => {
                dispatch(actions.initializedSuccess())
            }
        )
    };


export default appReducer;