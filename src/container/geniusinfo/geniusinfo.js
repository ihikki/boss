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
class GeniusInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            desc:'',
            avatar:''
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
                牛人完善信息页面
                </NavBar>
                <AvatarSelector selectAvatar={this.selectAvatar}>

                </AvatarSelector>
                <InputItem onChange={(val)=>this.handleChange('title',val)}>求职岗位</InputItem>
                <TextareaItem title="个人简历" rows={3} autoHeight onChange={(val)=>this.handleChange('desc',val)}></TextareaItem>
                <Button style={{background:"gold"}} onClick={()=>{this.props.update(this.state)}}>保存</Button>
            </div>
        )
    }
}
export default GeniusInfo;