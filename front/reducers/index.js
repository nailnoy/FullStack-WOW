import { HYDRATE } from "next-redux-wrapper";

import user from './user';
import post from './post';
import { combineReducers } from "redux";

//changeNickname('kwanyong'); 은 다음과 같다.
//{
//  type: 'CHANGE_NICKNAME',
//  data: 'kwanyong',
//}

// (이전 상태, 액션) => 다음 상태
const rootReducer = combineReducers({ 
    index :(state = {} , action) => {
        switch (action.type) {
            case HYDRATE:
                console.log('HYDRATE', action)
                return { ...state, ...action.payload };

            default:
                return state;
        }
    },
    user,
    post,
});

export default rootReducer;