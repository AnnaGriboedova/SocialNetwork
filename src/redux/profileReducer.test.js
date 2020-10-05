import profileReducer, {addPostActionCreator, deletePost} from "./profileReducer";
import ReactDOM from "react-dom";
import App from "../App";
import React from "react";

let state = {
    posts: [
        {id: 1, message: 'i love you', likesCount: '100'},
        {id: 2, message: 'hi. i bad boy', likesCount: '3'}
    ]
};

it('length of posts should be incremented', () => {

    let action = addPostActionCreator('test text');

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(3);
});

it('message of new posts should be corrected', () => {

    let action = addPostActionCreator('test text');

    let newState = profileReducer(state, action);

    expect(newState.posts[2].message).toBe('test text');
});

it('after deleting length of messages should be decrement', () => {

    let action = deletePost(1);

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(1);
});

it(`after deleting length of messages shouldn't be decrement if id is incorrect`, () => {

    let action = deletePost(1000);

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(2);
});