import React, {useEffect, useState} from 'react';
import s from './EmojiContainer.module.scss';
import cn from 'classnames'
import smile from '../../../assets/img/icons/emoji/smile1.svg'
import like from '../../../assets/img/icons/emoji/like.svg'
import footprint from '../../../assets/img/icons/emoji/footprint.svg'
import cupcake from '../../../assets/img/icons/emoji/cupcake.svg'
import earth from '../../../assets/img/icons/emoji/earth.svg'
import ball from '../../../assets/img/icons/emoji/ball.svg'
import tshirt from '../../../assets/img/icons/emoji/t-shirt.svg'
import faq from '../../../assets/img/icons/emoji/faq.svg'
import flag from '../../../assets/img/icons/emoji/flag.svg'
import more from '../../../assets/img/icons/emoji/more.svg'
import Preloader from "../Preloader/Preloader";
import {EmojiCategory, EmojiType} from '../../../redux/appReducer';

type EmojiListProps = {
    emojisByCategory: Array<EmojiCategory>
    change: (newVal: string) => void
    getSubcategoryEmojis: (categorySlug: string) => Promise<string>
}
const EmojiList: React.FC<EmojiListProps> = ({emojisByCategory, getSubcategoryEmojis, change}) => {
    let [currentCategory, setCurrentCategory] = useState('');

    useEffect(() => {
        setCurrentCategory(emojisByCategory[0].categorySlug)
    }, []);


    return (
        <div className={s.listWrap}>

            <EmojiButtons emojisByCategory={emojisByCategory} setCurrentCategory={setCurrentCategory}
                          currentCategory={currentCategory}/>

            {
                currentCategory && <Emoji emojisByCategory={emojisByCategory} currentCategory={currentCategory}
                                          getSubcategoryEmojis={getSubcategoryEmojis} change={change}/>
            }

        </div>

    )

};

type EmojiButtonsProps = {
    emojisByCategory: Array<EmojiCategory>
    setCurrentCategory: (categorySlug: string) => void
    currentCategory: string
}
const EmojiButtons: React.FC<EmojiButtonsProps> = ({emojisByCategory, setCurrentCategory, currentCategory}) => {
    type EmojiCategoryIcons = {
        [key: string]: string
    }
    let emojiCategoryIcons: EmojiCategoryIcons = {
        "smileys-emotion": smile,
        "people-body": like,
        "animals-nature": footprint,
        "food-drink": cupcake,
        "travel-places": earth,
        "activities": ball,
        "objects": tshirt,
        "symbols": faq,
        "flags": flag
    };
    const onClick = (categorySlug: string) => {
        setCurrentCategory(categorySlug);
    };

    return <div className={s.buttonsWrap}>
        {emojisByCategory.map((category) => {
            return (
                <div className={s.buttonWrap}>
                    <button type={"button"} onClick={() => {
                        onClick(category['categorySlug']);
                    }}
                            className={cn(s.button, currentCategory === category.categorySlug && s.active)}>
                        <span className={s.BtnIcon}
                              style={{backgroundImage: `url(${emojiCategoryIcons[category.categorySlug] || more})`}}/>
                    </button>
                </div>

            )
        })}
    </div>
};

type EmojiProps = {
    emojisByCategory: Array<EmojiCategory>
    currentCategory: string
    change: (newVal: string) => void
    getSubcategoryEmojis: (categorySlug: string) => Promise<string>
}
const Emoji: React.FC<EmojiProps> = ({emojisByCategory, currentCategory, getSubcategoryEmojis, change}) => {
    let [isFetching, setIsFetching] = useState(false);


    let allEmojis;

    let cat = emojisByCategory.filter(category =>
        category.categorySlug === currentCategory
    );
    let error = '';

    if (!cat[0].subcategoryEmojis) {
        if (!isFetching && !error) {
            setIsFetching(true);
            getSubcategoryEmojis(currentCategory).then((value) => {
                setIsFetching(false);
            }, (value) => {
                debugger
                error = value || 'что-то пошло не так..';
                setIsFetching(false);

            })
        }
    } else {
        allEmojis = cat[0].subcategoryEmojis.map(emoji =>
            <EmojiItem change={change} key={emoji.character} emoji={emoji}/>
        );
    }


    return <div className={s.listScrollWrap}>
        <div className={s.list}>
            {
                allEmojis || (isFetching && <Preloader/>) || error


            }
        </div>
    </div>
};

type EmojiItemProps = {
    emoji: EmojiType
    change: (newVal: string) => void
}
const EmojiItem: React.FC<EmojiItemProps> = ({emoji, change}) => {

    const onEmojiClick = (emojiCharacter: string) => {
        change(emojiCharacter)
    };

    return <span
        className={s.emoji}
        role="img"
        aria-label={emoji.slug && emoji.slug}
        aria-hidden={!emoji.slug}
        onClick={() => {
            onEmojiClick(emoji.character)
        }}
    >
        {emoji.character}
    </span>
};


export default EmojiList;
