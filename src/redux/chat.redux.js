import axios from 'axios';
import io from 'socket.io-client';
// const socket =io('http://127.0.0.1:8888',{autoConnect:false});
const socket =io('http://127.0.0.1:8888');
const MSG_LIST = "获取消息列表"
const MSG_RECV="接收新消息"
const MSG_READ="读取消息"
const initState={
    chatmsg:[],
    users:{},
    unread:0
}

//reducer
export function chat(state=initState,action){
    switch(action.type){
        case MSG_LIST:
            return {...state,chatmsg:action.data,users:action.users,unread:action.data.filter(v=>!v.read&&v.to==action.userid).length}
        case MSG_RECV:
            const n=action.data.to==action.userid?1:0;
            return {...state,chatmsg:[...state.chatmsg,action.data],unread:state.unread+n}
        case MSG_READ:
            return {...state,chatmsg:state.chatmsg.map(v=>({...v,read:true})),unread:state.unread-action.num}
        default:
            return state
    }
}

function msgList(msgs,users,userid){
    return {type:MSG_LIST,data:msgs,users,userid}
}

function msgRecv(msg){
    return {type:MSG_RECV,data:msg}
}

function msgRead({userid,from,num}){
    return {type:MSG_READ,data:{userid,from,num}}
}

export function readMsg(from){
    return (dispatch,getState)=>{
        axios.post('/user/readMsg',{from}).then(
            res=>{
                const userid=getState().user._id;
                if(res.status==200&res.data.code==0){
                    dispatch(msgRead({userid,from,num:res.data.num}))
                }
            }
        )
    }
}

export function getMsgList(){
    return (dispatch,getState)=>{
        axios.get('/user/getMsgList').then(res=>{
            if(res.status==200&&res.data.code==0){
                const userid =getState().user._id;
                dispatch(msgList(res.data.msgs,res.data.users,userid))
            }
        })
    }
}

export function recvMsg(){
    return (dispatch)=>{
        socket.on('recvMsg',(msg)=>{
            dispatch(msgRecv(msg))
        })
    }
}

export function sendMsg(msg){
    return dispatch=>{
        socket.emit('sendMsg',msg)
    }
}

export function openSocket(){
    return dispatch=>{
        socket.open()
        }
}

export function closeSocket(){
   return dispatch=>{
    socket.off('recvMsg')
    }
} 