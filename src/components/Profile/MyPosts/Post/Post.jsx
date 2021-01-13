import React from 'react'
import s from './Post.module.scss'
import UserSmallPhoto from "../../../common/UserSmallPhoto/UserSmallPhoto";
import cn from "classnames";
import {dateFormat} from "../../../../utils/dateFormat";

const Post = (props) => {

    return (
        <div className={cn('infoBlock', s.post)}>
            <div className={s.wrapper}>
                <div className={s.userInfo}>
                    <UserSmallPhoto photo={props.photo} styles={{circle: true, size: 'md'}}/>
                    <div className={s.userNameWrap}>
                        <span className={cn(s.userName)}>{props.name}</span>
                        <span className={s.postDate}>{dateFormat(props.date)}</span>
                    </div>
                </div>
                <div className={s.message}>{props.message}</div>
                <div>
                    <span>{props.like} like</span>
                </div>
            </div>
        </div>
    )
};

export default Post;