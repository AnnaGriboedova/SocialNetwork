import {getAuthUserData} from "./authReducer";
import {emojiApi} from "../api/api";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
const SET_EMOJI_BY_CATEGORY = 'SOC-NET/SET_EMOJI_BY_CATEGORY';
const SET_SUBCATEGORY_EMOJIS = 'SOC-NET/SET_SUBCATEGORY_EMOJIS';

type InitialStateType = {
    initialized: boolean,
    emojisByCategory: Array<any>,

};

let initialState: InitialStateType = {
    initialized: false,
    emojisByCategory: [],

};

const appReducer = (state = initialState, action: any): InitialStateType => {
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
                emojisByCategory: state.emojisByCategory.map((category: any) => {
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

export const getSubcategoryEmojis = (categorySlug: any) =>
    async (dispatch: any) => {
        debugger
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

export const initEmojisByCategory = () =>
    async (dispatch: any) => {
        let emojisCategory_response = await emojiApi.getEmojiCategory();
        if (emojisCategory_response.data) {
            let emojisByCategory = [];
            for (const category of emojisCategory_response.data) {
                let categoryObj: any = {};
                categoryObj['categorySlug'] = category.slug;

                emojisByCategory.push(categoryObj)

            }

            dispatch(setEmojisByCategory(emojisByCategory));
        }

    };


export const setEmojisByCategory = (emojisByCategory: any) => ({
    type: SET_EMOJI_BY_CATEGORY,
    emojisByCategory
});

export const setSubcategoryEmojis = (categorySlug: any, subcategoryEmojis: any) => ({
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

export const initializeApp = () =>
    (dispatch: any) => {
        let promise = dispatch(getAuthUserData());
        Promise.all([promise]).then(
            () => {
                dispatch(initializedSuccess())
            }
        )
    };


export default appReducer;