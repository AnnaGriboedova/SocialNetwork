import React, {useRef, useState} from 'react';
import s from './EmojiContainer.module.scss';
import {connect} from "react-redux";
import {getSubcategoryEmojis, initEmojisByCategory} from "../../../redux/appReducer";
import EmojiList from "./EmojiList";
import smile from "../../../assets/img/icons/smile.svg";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import {StateType} from "../../../redux/redux-store";

const EmojiContainer: React.FC<StateProps & DispatchProps & OwnProps> =
    ({
         emojisByCategory,
         initEmojisByCategory,
         getSubcategoryEmojis,
         change
     }) => {
        const ref = useRef<HTMLDivElement>(null);

        useOnClickOutside(ref, (e) => setIsEmojiOpen(false));

        let [isEmojiOpen, setIsEmojiOpen] = useState(false);

        const onEmojiBtnClick = (e: React.MouseEvent<HTMLElement>) => {
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
            <button type='button' className={s.openBtn} onClick={onEmojiBtnClick}><img src={smile}/></button>

            {isEmojiOpen && emojisByCategory &&
            <EmojiList change={change} getSubcategoryEmojis={getSubcategoryEmojis}
                       emojisByCategory={emojisByCategory}/>}
        </div>)

    };


let mapStateToProps = (state: StateType) => {
    return {
        emojisByCategory: state.app.emojisByCategory
    }
};
type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = {
    initEmojisByCategory: () => Promise<void> & any
    getSubcategoryEmojis: (categorySlug: string) => Promise<string> & any
}
type OwnProps = {
    change: (newVal: string) => void
}

export default connect<StateProps, DispatchProps, OwnProps, StateType>(mapStateToProps, {
    initEmojisByCategory,
    getSubcategoryEmojis
})(EmojiContainer);
