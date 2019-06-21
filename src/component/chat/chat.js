import React from 'react';
import {List,InputItem,NavBar,Icon} from 'antd-mobile'
import {sendMsg,getMsgList,recvMsg,readMsg,openSocket,closeSocket} from '../../redux/chat.redux'
import {getChatId} from '../../util'
import {connect} from 'react-redux'
@connect(
    state=>state,
    {sendMsg,recvMsg,getMsgList,readMsg,openSocket,closeSocket}
)
class Chat extends React.Component{
    componentDidMount(){
        this.props.openSocket()
        this.props.recvMsg()
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
        }
    }
    componentWillUnmount(){
        const to=this.props.match.params.user;

        this.props.readMsg(to)
        this.props.getMsgList()
        this.props.closeSocket()
    }
    constructor(props){
        super(props);
        this.state={
            text:''
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleSubmit(e){
        //从me发送消息给to,发送内容this.state.text

        this.props.sendMsg({
            from:this.props.user._id,
            to:this.props.match.params.user,
            msg:this.state.text
        })
        this.setState({
            text:''
        })
    }
    render(){
        const to=this.props.chat.users[this.props.match.params.user];
        const me=this.props.chat.users[this.props.user._id];
        if(!to||!me){
            return null;
        }
        const toAvatar=require(`../img/${to.avatar}.png`);
        const meAvatar=require(`../img/${me.avatar}.png`);
        const chatmsg=this.props.chat.chatmsg.filter(v=>v.chatid==getChatId(this.props.match.params.user,this.props.user._id))
        return (
            <div id='chat-page'>
                <NavBar style={{background:"gold",position:'fixed',top:0,width:'100%'}}
                icon={(<Icon type="left"/>)}
                onLeftClick={()=>{chatmsg[chatmsg.length-1].read=true;this.props.history.goBack()
                }}>{to.name}</NavBar>
                <div className="chat-list">
                    {
                        chatmsg.map(v=>{
                            return v.from==this.props.user._id?(
                                <List key={v._id}>
                                    <List.Item thumb={meAvatar}>
                                        {v.content}
                                    </List.Item>
                                </List>
                            ):(
                                <List key={v._id}>
                                    <List.Item
                                    className="chat-me"
                                    extra={<img src={toAvatar}/>}>
                                        {v.content}
                                    </List.Item>
                                </List>
                            )
                        })
                    }
                </div>
                <div className="stick-footer">
                    <List>
                    <InputItem placeholder="请输入"
                    extra={<span onClick={(e)=>{this.handleSubmit(e)}}>发送</span>}
                    value={this.state.text}
                    onChange={v=>this.setState({text:v})}
                    />
                    </List>
                </div>
            </div>
        )
    }
}
export default Chat;