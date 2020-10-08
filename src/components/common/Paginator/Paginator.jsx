import React from 'react'
import styles from './Paginator.module.scss'

let Paginator = (props) => {
    let pagesCount = Math.ceil(props.itemsTotalCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return <>
        <div className={styles.paginationWrapper}>
            {pages.map(p => {
                return <span onClick={() => {
                    props.onPageChanged(p)
                }} className={props.currentPage === p && styles.selectedPage}>{p}</span>
            })}
        </div>

    </>

};

export default Paginator;