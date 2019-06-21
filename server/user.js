const express=require('express');
const Router=express.Router();
const User=require('./model').getModel('user')
const utils=require('utility')
const Chat =require('./model').getModel('chat');
//列表接口
Router.get('/list',(req,res)=>{
    const {type}=req.query;
    User.find({type},{__v:0,pwd:0},(err,doc)=>{
        if(err){
            res.end('服务端出错');
            return;
        }
        return res.json({code:0,data:doc})
    })
})
//注册接口
Router.post('/register',(req,res)=>{
    const {user,pwd,type}=req.body;
    User.findOne({user},(err,doc)=>{
        if(doc){
            return res.json({
                code:1,msg:'用户名重复'
            })
        }
        User.create({user,pwd:md5Pwd(pwd),type},(err,doc)=>{
            if(err){
                return res.json({code:1,msg:"后端出错"})
            }
            console.log(doc)
            const _id=doc._id;
            res.cookie('userid',_id)
            return res.json({code:0,data:{user,type,_id}})
        })
    })
})
//查找用户
Router.get('/info',(req,res)=>{
    //用户有无cookie
    const {userid}=req.cookies;
    if(!userid){
        res.json({code:1})
    }
    User.findOne({_id:userid},{__v:0,pwd:0},(err,doc)=>{
        if(err){
            return res.json({code:1,msg:"后端出错"})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })
})
//登录接口
Router.post('/login',(req,res)=>{
    const {user,pwd}=req.body;
    User.findOne({user,pwd:md5Pwd(pwd)},{__v:0,pwd:0},(err,doc)=>{
        if(!doc){
            return res.json({code:1,msg:"用户名或密码错误"})
        }
        res.cookie('userid',doc._id);
        return res.json({code:0,data:doc})
    })
})
//更新数据
Router.post('/update',(req,res)=>{
    const {userid}=req.cookies;
    if(!userid){
        return res.json({code:1})
    }
    User.findByIdAndUpdate(userid,req.body,(err,doc)=>{
        const data=Object.assign({},{
            user:doc.user,
            type:doc.type
        },req.body)
        return res.json({code:0,data})
    })
})
//查询消息列表接口
Router.get('/getMsgList',(req,res)=>{
    const userid=req.cookies.userid;
    //用户列表
    User.find({},(err,userdoc)=>{
        let users={};
        userdoc.forEach(v=>{
            users[v._id]={name:v.user,avatar:v.avatar}
        });
        //消息列表
        Chat.find({'$or':[{from:userid},{to:userid}]},(err,doc)=>{
            if(!err){
                return res.json({code:0,msgs:doc,users:users})
            }
        })
    })
})
//读取消息
Router.post('/readMsg',(req,res)=>{
    const {from}=req.body;
    const userid=req.cookies.userid;
    Chat.updateMany({from,to:userid},{'$set':{read:true}},{'multi':true},(err,doc)=>{
        if(!err){
            return res.json({code:0,num:doc.nModified})
        }
        return res.json({code:1,msg:"修改失败"})
    })
})
//加密
function md5Pwd(pwd){
    const salt='china_soft_bobi+zzxxx+@/*13-z;)'
    return utils.md5(utils.md5(salt+pwd+salt))
}
module.exports=Router;