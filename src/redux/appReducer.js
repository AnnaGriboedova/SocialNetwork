import {getAuthUserData} from "./authReducer";
import {emojiApi} from "../api/api";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
const SET_EMOJI_BY_CATEGORY = 'SOC-NET/SET_EMOJI_BY_CATEGORY';
const SET_SUBCATEGORY_EMOJIS = 'SOC-NET/SET_SUBCATEGORY_EMOJIS';

let initialState = {
    initialized: false,
    emojisByCategory: [],

};

const appReducer = (state = initialState, action) => {
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
                emojisByCategory: state.emojisByCategory.map(category => {
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

export const getSubcategoryEmojis = (categorySlug) =>
    async (dispatch) => {
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
    async (dispatch) => {
        let emojisCategory_response = await emojiApi.getEmojiCategory();
        if (emojisCategory_response.data) {
            let emojisByCategory = [];
            for (const category of emojisCategory_response.data) {
                let categoryObj = {};
                categoryObj['categorySlug'] = category.slug;

                emojisByCategory.push(categoryObj)

            }

            dispatch(setEmojisByCategory(emojisByCategory));
        }

    };


export const setEmojisByCategory = (emojisByCategory) => ({
    type: SET_EMOJI_BY_CATEGORY,
    emojisByCategory
});

export const setSubcategoryEmojis = (categorySlug, subcategoryEmojis) => ({
    type: SET_SUBCATEGORY_EMOJIS,
    categorySlug,
    subcategoryEmojis
});

export const initializedSuccess = () => ({
    type: INITIALIZED_SUCCESS,
});

export const initializeApp = () =>
    (dispatch) => {
        let promise = dispatch(getAuthUserData());
        Promise.all([promise]).then(
            () => {
                dispatch(initializedSuccess())
            }
        )
    };


export default appReducer;