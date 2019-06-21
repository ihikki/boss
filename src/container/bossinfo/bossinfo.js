import React from 'react';
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile';
import {Redirect} from 'react-router-dom';
import AvatarSelector from '../../component/avatarselector/avatarselector';
import {update} from "../../redux/user.redux"
import {connect} from "react-redux"
@connect(
    state=>state.user,
    {update}
)
class BossInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            desc:'',
            avatar:'',
            company:'',
            money:''
        }
        this.selectAvatar=this.selectAvatar.bind(this)
    }
    handleChange(key,val){
        this.setState(
            {[key]:val}
        )
    }
    selectAvatar(imgname){
        this.setState({
            avatar:imgname
        })
    }
    render(){
        const path= this.props.location.pathname;
        const redirect =this.props.redirectTo;
        return (
            <div>
                {
                    redirect&&redirect!=path?<Redirect to={redirect}></Redirect>:null
                }
                <NavBar
                mode="light"
                style={{background:"gold"}}
               >
                Boss完善信息页面
                </NavBar>
                <AvatarSelector selectAvatar={this.selectAvatar}>

                </AvatarSelector>
                <InputItem onChange={(val)=>this.handleChange('title',val)}>招聘岗位</InputItem>
                <InputItem onChange={(val)=>this.handleChange('company',val)}>公司名称</InputItem>
                <InputItem onChange={(val)=>this.handleChange('money',val)}>职位薪资</InputItem>
                <TextareaItem title="职位要求" rows={3} autoHeight onChange={(val)=>this.handleChange('desc',val)}></TextareaItem>
                <Button style={{background:"gold"}} onClick={()=>{this.props.update(this.state)}}>保存</Button>
            </div>
        )
    }
}
export default BossInfo;