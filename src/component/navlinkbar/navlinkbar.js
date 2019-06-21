import React from 'react';
import {withRouter} from 'react-router-dom'
import {TabBar} from 'antd-mobile'
import {connect} from 'react-redux'

@withRouter
@connect(
    state=>state.chat,
    {}
)
class NavLinkBar extends React.Component{
    render(){
        const navList=this.props.data.filter(v=>!v.hidden);
        const {pathname} = this.props.location;
        const Item =TabBar.Item;
        return (
            <TabBar  tintColor="#eec900">
                {
                    navList.map(v=>(
                        <Item className='Item'
                        badge={v.path=='/msg'?this.props.unread:0}
                        key={v.path}
                        title={v.text}
                        icon={{uri:require(`./img/${v.icon}.png`)}}
                        selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
                        selected={pathname==v.path}
                        onPress={()=>{
                            this.props.history.push(v.path)
                        }}
                        >

                        </Item>
                    )
                    )
                }
            </TabBar>
        )
    }
}
export default NavLinkBar;