import React from "react";
import styles from "./FormsControls.module.scss";
import {WrappedFieldMetaProps} from "redux-form";

type InputProps = {
    input: any
    meta: WrappedFieldMetaProps
}

const Element = (Element: string): React.FC<InputProps> => ({input, meta: {touched, error}, ...props}) => {
    const hasError = touched && error;
    return (
        <span className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <Element {...input} {...props} />
            {hasError && <span> {error} </span>}
        </span>
    );
};

export const Textarea = Element("textarea");

export const Input = Element("input");