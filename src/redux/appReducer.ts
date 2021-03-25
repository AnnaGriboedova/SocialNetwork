import {getAuthUserData} from "./authReducer";
import {emojiApi} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {StateType} from "./redux-store";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
const SET_EMOJI_BY_CATEGORY = 'SOC-NET/SET_EMOJI_BY_CATEGORY';
const SET_SUBCATEGORY_EMOJIS = 'SOC-NET/SET_SUBCATEGORY_EMOJIS';

type InitialStateType = {
    initialized: boolean,
    emojisByCategory: Array<EmojiCategory>,
};

type EmojiCategory = {
    categorySlug: string,
    subcategoryEmojis?: Array<Emoji>
}
export type Emoji = {
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

type ActionTypes = SetEmojisByCategoryActionType | SetSubcategoryEmojisActionType | InitializedSuccessActionType

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

export const getSubcategoryEmojis = (categorySlug: string): ThunkType =>
    async (dispatch) => {
        let response = await emojiApi.getSubcategoryEmojis(categorySlug);
        if (response.data) {
            let subcategoryEmojis = response.data;
            dispatch(setSubcategoryEmojis(categorySlug, subcategoryEmojis))
        } else {
            if (typeof response.data === 'object' && response.status === 200) {
                return Promise.reject('В этой категории ещё нет эмоджи')
            }
            return Promise.reject('Ошибка' + response.status)

        }

    };

export const initEmojisByCategory = (): ThunkType =>
    async (dispatch) => {
        let emojisCategory_response = await emojiApi.getEmojiCategory();
        if (emojisCategory_response.data) {
            let emojisByCategory = [];
            for (const category of emojisCategory_response.data) {
                let categoryObj = {categorySlug: category.slug};

                emojisByCategory.push(categoryObj)

            }

            dispatch(setEmojisByCategory(emojisByCategory));
        }

    };

type SetEmojisByCategoryActionType = {
    type: typeof SET_EMOJI_BY_CATEGORY
    emojisByCategory: Array<EmojiCategory>
}

export const setEmojisByCategory = (emojisByCategory: Array<EmojiCategory>): SetEmojisByCategoryActionType => ({
    type: SET_EMOJI_BY_CATEGORY,
    emojisByCategory
});

type SetSubcategoryEmojisActionType = {
    type: typeof SET_SUBCATEGORY_EMOJIS,
    categorySlug: string,
    subcategoryEmojis: Array<Emoji>
}

export const setSubcategoryEmojis = (categorySlug: string, subcategoryEmojis: Array<Emoji>): SetSubcategoryEmojisActionType => ({
    type: SET_SUBCATEGORY_EMOJIS,
    categorySlug,
    subcategoryEmojis
});

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({
    type: INITIALIZED_SUCCESS,
});

export const initializeApp = (): ThunkType =>
    (dispatch) => {
        let promise = dispatch(getAuthUserData());
        Promise.all([promise]).then(
            () => {
                dispatch(initializedSuccess())
            }
        )
    };


export default appReducer;