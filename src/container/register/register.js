import React from 'react';
import Logo from '../../component/logo/logo'
import { InputItem,List,WingBlank, WhiteSpace,Button,Radio } from 'antd-mobile';
import {connect} from 'react-redux';
import {register} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
@connect(
    state=>{
        return state.user
    },{register}
)
class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:'',
            pwd:'',
            repeatpwd:'',
            type:'genius'
        }
        this.handleRegister=this.handleRegister.bind(this)
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleRegister(){
        this.props.register(this.state)
    }
    render(){
        const RadioItem = Radio.RadioItem;
        const Item = List.Item;
        return(
            <div>
                {
                    this.props.redirectTo&&this.props.redirectTo!='/register'?<Redirect to={this.props.redirectTo}></Redirect>:null
                }
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem onChange={(val)=>{this.handleChange('user',val)}}>用户名</InputItem>
                        <InputItem type="password" onChange={(val)=>{this.handleChange('pwd',val)}}>密码</InputItem>
                        <InputItem type="password" onChange={(val)=>{this.handleChange('repeatpwd',val)}}>确认密码</InputItem>
                        <RadioItem
                        checked={this.state.type==='genius'}
                        onChange={()=>{this.handleChange('type','genius')}}>牛人</RadioItem>
                        <RadioItem
                        checked={this.state.type==='boss'}
                        onChange={()=>{this.handleChange('type','boss')}}>BOSS</RadioItem>
                    </List>
                    {this.props.msg?(<Item>{this.props.msg}</Item>):null}
                    <WhiteSpace/>
                        <Button style={{background:"gold"}} onClick={this.handleRegister}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Register;