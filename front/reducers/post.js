const initialState = {
    mainPosts: [{
        id : 1,
        User:{
            id: 1,
            nickname: 'Zomd',
        },
        content: '첫 개시글',
        Images: [{
            src: "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg",
        }, {
            src: "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg", 
        },{
            src: "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg",
        }],
        Comments: [{
            User: {
                nickname: 'hero'
            },
            content: '코딩 어려워',
        },{
             User:{
                nickname: 'nero'
             },
             content: '저도요 ㅜㅜ',
        }]
    }],
imagePaths: [],
postAdded: false,
};

const ADD_POST = 'ADD_POST';
export const addPost = {
    type : ADD_POST,
}

const dummyPost = {
    id : 2,
    content: '더미데이터',
    User:{
        id: 1,
        nickname: 'Zomd',
    },
    Images: [],
    Comments: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return{
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdded: true,
            }
            

        default:
            return state;
    }
};

export default reducer;
