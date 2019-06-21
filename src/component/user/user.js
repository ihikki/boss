import React from 'react'
import {Result,WhiteSpace,List} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import browserCookies from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
@connect(
    state=>state,
    {logoutSubmit}
)
class User extends React.Component{
    constructor(props){
        super(props);
        this.logout=this.logout.bind(this)
    }
    logout(){
        browserCookies.erase('userid');
        this.props.chat.chatmsg.length=0
        this.props.logoutSubmit()
    }
    render(){
        return (
            this.props.user.user?(
                <div>   
                    <Result
                        img={<img src={require(`../img/${this.props.user.avatar}.png`)} style={{width:50}}/>}
                        title={this.props.user.user}
                        message={this.props.user.type=="boss"?this.props.user.company:null}
                    />
                    <List renderHeader={()=>'简介'}>
                        <List.Item>
                            {this.props.user.title}
                            {
                                this.props.user.desc.split('\n').map(
                                    d=>(
                                        <List.Item.Brief key={d}>{d}</List.Item.Brief>
                                    )
                                )
                            }
                            {
                                this.props.user.money?<List.Item.Brief>薪资：{this.props.user.money}</List.Item.Brief>:null
                            }
                        </List.Item>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <List type="primany">
                        <List.Item onClick={this.logout}>退出登录</List.Item>
                    </List>

                </div>
            ):(<Redirect to={this.props.user.redirectTo}></Redirect>)
        )
    }
}
export default User;