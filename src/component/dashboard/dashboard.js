import React from 'react';
import {Switch,Route} from 'react-router-dom'
import {NavBar} from 'antd-mobile';
import {connect} from 'react-redux';
import Boss from '../boss/boss';
import Genius from '../genius/genius';
import Msg from '../msg/msg';
import User from '../user/user';
import NavLinkBar from '../navlinkbar/navlinkbar'
import {getMsgList} from '../../redux/chat.redux'
@connect(
    state=>state,
    {getMsgList}
)
class Dashboard extends React.Component{
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
        }
    }
    render(){
        const {pathname}=this.props.location;
        const navList =[
            {
                path:'/boss',
                text:'牛人',
                icon:'boss',
                title:'牛人列表',
                component:Boss,
                hidden:this.props.user.type=="genius"
            },
            {
                path:'/genius',
                text:'boss',
                icon:'job',
                title:'Boss列表',
                component:Genius,
                hidden:this.props.user.type=="boss"
            },
            {
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg
            },
            {
                path:'/me',
                text:'我',
                icon:'user',
                title:'个人中心',
                component:User
            }
        ]
        const head = navList.find(v=>v.path===pathname);
        if(!head){
            return null
        }
        return (
        <div className='dashboard'>
            <NavBar style={{background:"gold"}}>{head.title}</NavBar>
                <div style={{marginTop:45,marginBottom:45,overflow:'hidden'}}>
                    <Switch>
                        {
                            navList.map(v=>(
                                <Route path={v.path} component={v.component} key={v.path}></Route>
                            )
                            )
                        }
                    </Switch>
                </div>
            <NavLinkBar data={navList}></NavLinkBar>
        </div>
        )
    }
}
export default Dashboard;