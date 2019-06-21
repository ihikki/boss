import axios from "axios";
import {getRedirectPath} from '../util'
const LOGOUT="LOGOUT";
const AUTH_SUCCESS="AUTH_SUCCESS";
const ERROR_MSG="ERROR_MSG";
const LOAD_DATA="LOAD_DATA";

const initState={
    user:'',
    type:'',
    msg:'',
    redirectTo:''
};

//reducer
export function user(state=initState,action){
    switch(action.type){
        case AUTH_SUCCESS:
            return {...state,...action.data,msg:'',redirectTo:getRedirectPath(action.data)}
        case LOGOUT:
            return {...initState,redirectTo:'/login'}
        case ERROR_MSG:
            return {...state,msg:action.msg}
        case LOAD_DATA:
            return {...state,...action.data}
        default:
            return state
    }
}
//action creator
function authSuccess(data){
    return {type:AUTH_SUCCESS,data:data}
}

function logout(){
    return {type:LOGOUT}
}

function errorMsg(msg){
    return {type:ERROR_MSG,msg}
}

export function loadData(userinfo){
    return {type:LOAD_DATA,data:userinfo}
}
export function register({user,pwd,repeatpwd,type}){
    if(!user||!pwd||!type){
        return errorMsg('用户名和密码必须填入')
    }
    if(pwd!==repeatpwd){
        return errorMsg('两次输入的密码不相同')
    }
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type}).then(res=>{
            if(res.data.code==0&&res.status==200){
                dispatch(authSuccess(res.data.data))
            }else{
                    dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
export function login({user,pwd}){
    if(!user||!pwd){
        return errorMsg('用户名和密码必须输入')
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd}).then(res=>{
            if(res.status==200&&res.data.code==0){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
export function update(data){
    return dispatch=>{
        axios.post('/user/update',data).then(res=>{
            if(res.status==200&&res.data.code==0){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
export function logoutSubmit(){
    return {type:LOGOUT}
}