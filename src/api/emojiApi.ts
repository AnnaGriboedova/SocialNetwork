import {EmojiType} from "../redux/appReducer";
import {instanceEmoji} from "./api";

type EmojiApi = {
    getEmojiCategory: Array<{
        slug: string
        subCategories: Array<string>
    }>
    getSubcategoryEmojis: Array<EmojiType>
}
export const emojiApi = {
    getEmojiCategory() {
        return instanceEmoji.get<EmojiApi['getEmojiCategory']>('categories?access_key=df363abb0aaceb6736b1e98b26ac4127aa5a6e4e')
    },
    getSubcategoryEmojis(categorySlug: string) {
        return instanceEmoji.get<EmojiApi['getSubcategoryEmojis']>(`categories/${categorySlug}?access_key=df363abb0aaceb6736b1e98b26ac4127aa5a6e4e`)
    },
};