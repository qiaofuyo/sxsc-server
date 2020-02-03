// import mongoose from 'mongoose'	报错
const mongoose=require('mongoose')
//  数据库连接
let DB_URL='mongodb://localhost:27017/pw'
const conn=mongoose.connect(DB_URL,{useNewUrlParser:true,useUnifiedTopology:true})
// 监听连接状态
mongoose.connection.on('error', () => {
	console.error('connection failure!!!')
})
mongoose.connection.on('open', () => {
	console.log('connection success: ' + DB_URL+', http://localhost:3000')
})
mongoose.connection.on('disconnected', () => {
	console.log('connection disconnected.');
});
// 导出
module.exports=conn