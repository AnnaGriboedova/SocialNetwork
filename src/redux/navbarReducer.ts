let initialState = {
    friends: [
        {id: 1, name: 'Anna'},
        {id: 2, name: 'Lusia'},
        {id: 3, name: 'Sasha'}
    ] as Array<{ id: number; name: string }>
};

type InitialStateType = typeof initialState;
const navbarReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {

    }

    return state
};

export default navbarReducer;