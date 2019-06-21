import React from 'react';
import Logo from '../../component/logo/logo'
import { InputItem,List,WingBlank, WhiteSpace,Button } from 'antd-mobile';
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/user.redux'
import {connect} from 'react-redux'
@connect(
    state=>state.user,
    {login}
)
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:'',
            pwd:''
        }
        this.register=this.register.bind(this);
        this.handleLogin=this.handleLogin.bind(this)
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleLogin(){
        this.props.login(this.state)
    }
    register(){
        this.props.history.push('/register')
    }
    render(){
        return(
            <div>
                {
                    this.props.redirectTo&&this.props.redirectTo!='/login'?<Redirect to={this.props.redirectTo}></Redirect>:null
                }
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem onChange={(val)=>{this.handleChange('user',val)}}>用户名</InputItem>
                        <InputItem type='password' onChange={(val)=>{this.handleChange('pwd',val)}}>密码</InputItem>
                    </List>
                    <WhiteSpace size='xl'/>
                        <Button style={{background:"gold"}} onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace/>
                        <Button style={{background:"gold"}} onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Login;