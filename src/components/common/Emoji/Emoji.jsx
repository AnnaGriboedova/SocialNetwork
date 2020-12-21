import React, {useState, useEffect, useRef} from 'react';
import s from './EmojiContainer.module.scss';
import {connect} from "react-redux";
import {getSubcategoryEmojis, initEmojisByCategory} from "../../../redux/appReducer";
import EmojiList from "./EmojiList";
import smile from "../../../assets/img/icons/smile.svg";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

const EmojiContainer = ({emojisByCategory, initEmojisByCategory, getSubcategoryEmojis, change}) => {
    const ref = useRef();

    useOnClickOutside(ref, () => setIsEmojiOpen(false));

    let [isEmojiOpen, setIsEmojiOpen] = useState(false);

    const onEmojiBtnClick = (e) => {
        e.preventDefault();
        if (!isEmojiOpen) {
            if (!emojisByCategory.length) {
                initEmojisByCategory().then(() => {
                    setIsEmojiOpen(true)
                })
            } else {
                setIsEmojiOpen(true)
            }
        } else {
            setIsEmojiOpen(false)
        }
    };

    return (<div ref={ref} className={s.wrap}>
        <button className={s.openBtn} onClick={onEmojiBtnClick}><img src={smile}/></button>

        {isEmojiOpen && emojisByCategory &&
        <EmojiList change={change} getSubcategoryEmojis={getSubcategoryEmojis} emojisByCategory={emojisByCategory}/>}
    </div>)

};


let mapStateToProps = (state) => {
    return {
        emojisByCategory: state.app.emojisByCategory
    }
};

export default connect(mapStateToProps, {
    initEmojisByCategory,
    getSubcategoryEmojis
})(EmojiContainer);
