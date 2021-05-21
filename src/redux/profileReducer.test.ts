import profileReducer, {actions, initialState} from "./profileReducer";

let state = {
    posts: [
        {id: 1, message: 'i love you', likesCount: '100'},
        {id: 2, message: 'hi. i bad boy', likesCount: '3'}
    ]
} as typeof initialState;

let post = {
    user: {
        userName: 'test name'
    },
    id: 99,
    message: 'test message',
    likesCount: '9',
    date: 0
}

it('length of posts should be incremented', () => {

    let action = actions.setPost(post);

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(3);
});

it('message of new posts should be corrected', () => {

    let action = actions.setPost(post);

    let newState = profileReducer(state, action);

    expect(newState.posts[2].message).toBe(post.message);
});

it('after deleting length of messages should be decrement', () => {

    let action = actions.deletePost(1);

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(1);
});

it(`after deleting length of messages shouldn't be decrement if id is incorrect`, () => {

    let action = actions.deletePost(1000);

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(2);
});