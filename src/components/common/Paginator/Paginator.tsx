import React, {useState} from 'react'
import styles from './Paginator.module.scss'
import cn from 'classnames'

type PaginatorType = {
    itemsTotalCount: number
    pageSize: number
    portionSize?: number
    currentPage: number
    onPageChanged: (page: number) => void
}

let Paginator: React.FC<PaginatorType> = (props) => {
    let pagesCount = Math.ceil(props.itemsTotalCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionSize = props.portionSize || 10;

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <>
        <div className={styles.paginationWrapper}>
            {portionNumber > 1 &&
            <button onClick={() => setPortionNumber(portionNumber - 1)}>PREV</button>}

            {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span key={p} onClick={() => {
                        props.onPageChanged(p)
                    }} className={cn({
                        [styles.selectedPage]: props.currentPage === p
                    }, styles.paginator__pageItem)}>{p}</span>
                })}

            {portionCount > portionNumber &&
            <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>}
        </div>

    </>

};

export default Paginator;