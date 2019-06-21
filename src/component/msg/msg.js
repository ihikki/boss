import React from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'
import {getMsgList} from '../../redux/chat.redux'
@connect(
    state=>state,{getMsgList}
)
class Msg extends React.Component{
    getLast(list){
        return list[list.length-1];
    }
    render(){
        const msgGroup={};
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid]=msgGroup[v.chatid]||[];
            msgGroup[v.chatid].push(v)
        })
        const chatList=Object.values(msgGroup)
        chatList.sort((a,b)=>{
            const aTime=this.getLast(a).create_time;
            const bTime=this.getLast(b).create_time;
            return bTime-aTime;
        })
        const userid=this.props.user._id;
        const userInfo=this.props.chat.users;
        return (<div>
            <List>
                {
                    chatList.map(v=>{
                        const lastItem=this.getLast(v);
                        const targetId=lastItem.from==userid?lastItem.to:lastItem.from;
                        const unreadNum=v.filter(v=>!v.read&&v.to==userid).length;
                        if(!userInfo[targetId]){
                            return null
                        }
                        return (
                            <List key={lastItem._id}>
                                <List.Item
                                thumb={require(`../img/${userInfo[targetId].avatar}.png`)}
                                extra={<Badge text={unreadNum}></Badge>}
                                arrow="horizontal"
                                onClick={()=>{this.props.history.push(`/chat/${targetId}`)}}
                                >
                                    {lastItem.content}
                                    <List.Item.Brief>{userInfo[targetId].name}</List.Item.Brief>
                                </List.Item>
                            </List>
                        )
                    })
                }
            </List>
        </div>)
    }
}
export default Msg;