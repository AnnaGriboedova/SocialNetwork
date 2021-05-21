import {useCallback, useEffect, useState} from 'react';

export default function useCopy(text: string): [boolean, () => void] {
    const copyToClipboard = (str: string) => {
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);

        let selection = document.getSelection()
        const selected =
            selection && selection.rangeCount > 0
                ? selection.getRangeAt(0)
                : false;
        el.select();
        const success = document.execCommand('copy');
        document.body.removeChild(el);
        if (selection && selected) {
            selection.removeAllRanges();
            selection.addRange(selected);
        }
        return success;
    };

    const [copied, setCopied] = useState(false);

    const copy = useCallback(() => {
        if (!copied) setCopied(copyToClipboard(text));
    }, [text]);

    useEffect(() => () => setCopied(false), [text]);

    return [copied, copy];
};