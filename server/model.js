const mongoose =require('mongoose');
const DB_URL='mongodb://127.0.0.1:27017/bossapp';
mongoose.connect(DB_URL);
const models={
    user:{
        'user':{type:String,require:true},
        'pwd':{type:String,require:true},
        'type':{type:String,require:true},
        'avatar':{type:String},
        'desc':{type:String},
        'title':{type:String},
        'company':{type:String},
        'money':{type:String}
    },
    chat:{
        'from':{type:String,require:true},
        'to':{type:String,require:true},
        'content':{type:String,require:true,default:''},
        'create_time':{type:Number,require:true},
        'read':{type:Boolean,default:false},
        'chatid':{type:String,require:true}
    }
}

for(let m in models){
    mongoose.model(m,mongoose.Schema(models[m]))
}
mongoose.connection.on('connected',()=>{
    console.log('mongo connect success')
})
module.exports={
    getModel:function(name){
        return mongoose.model(name)
    }
}