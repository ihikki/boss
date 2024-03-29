import React from 'react';
import {withRouter} from 'react-router-dom'
import {loadData} from '../../redux/user.redux'
import axios from 'axios'
import { connect } from 'react-redux';
@withRouter
@connect(
    state=>state.user,
    {loadData}
)
class AuthRoute extends React.Component{
    componentDidMount(){
        const pathname=this.props.location.pathname;
        const publicList=['/login','/register']
        if(publicList.indexOf(pathname)>-1){
            return null
        }
    //获取用户信息
        axios.get('/user/info').then(res=>{
            if(res.status==200){
                if(res.data.code===0){
                    this.props.loadData(res.data.data)
                }else{
                    this.props.history.push('/login')
                }
            }
        })
    }
    render(){
        return null
    }
}
export default AuthRoute;