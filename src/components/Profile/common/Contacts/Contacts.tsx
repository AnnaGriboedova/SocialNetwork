import s from "../../Profile.module.scss";
import useCopyToClipboard from "../../../../hooks/useCopyToClipboard";
import vk from "../../../../assets/img/icons/soc-network/vk.svg";
import instagram from "../../../../assets/img/icons/soc-network/instagram.svg";
import twitter from "../../../../assets/img/icons/soc-network/twitter.svg";
import facebook from "../../../../assets/img/icons/soc-network/facebook.svg";
import github from "../../../../assets/img/icons/soc-network/github.svg";
import youtube from "../../../../assets/img/icons/soc-network/youtube.svg";
import cn from "classnames";
import React from "react";
import {ContactsType} from "../../../../types/types";

type ContactsProps = {
    contacts: ContactsType
}
const Contacts: React.FC<ContactsProps> = ({contacts}) => {
    let isEmptyContactsArrValues = !Object.values(contacts).some(value => !!value);

    if (Object.keys(contacts).length !== 0 && contacts.constructor === Object && !isEmptyContactsArrValues) {
        return <div className={s.contacts}>
            {Object.keys(contacts).map((key) => {
                const contactLink = contacts[key];
                if (contactLink) {
                    return <Contact contactLink={contactLink} socKey={key}/>
                }
                return '';
            })}
        </div>
    }
    return null;
};

type ContactProps = {
    contactLink: string
    socKey: string
}
const Contact: React.FC<ContactProps> = ({contactLink, socKey}) => {
    const [copied, copy] = useCopyToClipboard(contactLink);

    type SocNetworkIcons = {
        [key: string]: string
    }
    let socNetworkIcons: SocNetworkIcons = {
        vk,
        instagram,
        twitter,
        facebook,
        github,
        youtube
    };
    return <div className={cn(s.contactWrap, 'copyBlock')}>
        <a className={s.contact} href={contactLink}>
            {socNetworkIcons[socKey] &&
            <img className={s.contactIcon} src={socNetworkIcons[socKey]}/>}
            {contactLink}
        </a>
        <div className={'copyBlock__btnWrap'}>
            <button className={'copyBlock__btn'} onClick={copy}></button>
        </div>
    </div>
};

export default Contacts;