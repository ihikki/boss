import React from 'react'
import {Grid,List} from 'antd-mobile'
class AvatarSelector extends React.Component{
    constructor(props){
        super(props)
        this.state={
            ele:''
        }
    }
    render(){
        const avatarList=['animal','boy','bull','car','dog','fish','flower',
    'girl','grass','man','pear','pig','sheep','tree','woman'].map(v=>({
        icon:require(`../img/${v}.png`),
        text:v
    }));
    const gridHeader=this.state.ele?(<div><span>已选头像</span>
    <img src={this.state.ele.icon} style={{width:'20px'}}/></div>):(<div>请选择头像</div>)
        return(
            <div>
                <List renderHeader={gridHeader}>
                <Grid data={avatarList} columnNum={5} 
                onClick={ele=>{this.setState({ele})
                this.props.selectAvatar(ele.text)
            }
            }></Grid>
            </List>
            </div>
        )
    }
}
export default AvatarSelector;