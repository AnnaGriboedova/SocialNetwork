import React from 'react'

export function withSuspense<P>(Component: React.ComponentType<P>) {
    return (props: P) => {
        return <React.Suspense fallback={<div>Загрузка...</div>}>
            <Component {...props}/>
        </React.Suspense>
    }
};