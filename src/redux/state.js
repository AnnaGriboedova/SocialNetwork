let state = {
  profilePage: {
    posts: [
      {id: 1, message: 'i love you', likesCount: '100'},
      {id: 2, message: 'hi. i bad boy', likesCount: '3'}
    ]
  },
  dialogsPage: {
    dialogs: [
      {id: 1, name: 'Anna'},
      {id: 2, name: 'Andrey'},
      {id: 3, name: 'Dima'}
    ],
    messages: [
      {id: 1, message: 'yo'},
      {id: 2, message: 'How are you'},
      {id: 3, message: 'Where are you'}
    ]
  },
  navbar : {
    friends:[
      {id: 1, name: 'Anna'},
      {id: 2, name: 'Lusia'},
      {id: 3, name: 'Sasha'}
    ]
  }
};

export default state;
