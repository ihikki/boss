import axios from 'axios';
import UserCard from '../component/usercard/usercard';
const USER_LIST="获取用户列表";
const initState={
    userlist:[]
};
export function chatuser(state=initState,action){
    switch (action.type){
        case USER_LIST:
            return {...state,userlist:action.data}
        default:
            return state
    }
}
function userList(data){
    return {type:USER_LIST,data:data}
}
export function getUserList(type){
    return dispatch=>{
        axios.get('/user/list?type='+type).then(res=>{
            if(res.data.code==0){
                dispatch(userList(res.data.data))
            }
        })
    }
}