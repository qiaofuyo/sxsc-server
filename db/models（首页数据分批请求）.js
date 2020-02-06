const conn=require('./db.js')
const mongoose=require('mongoose')

// 创建Schema

// 首页轮播图
let homeSlideSchema=new mongoose.Schema({
	imgurl:String,
	detail:String
})
// var user=new homeSlideModel({  // 在集合中定义条文档
// 	imgurl:'http://www.baidu.com/',
// 	detail:87,
// 	logindate:new Date()
// })
// user.save((err,res)=>{
// 	if(err) return console.log(err);
// 	// 打印文档
// 	homeSlideModel.find((err,data)=>{
// 		console.log(data);
// 	})
// })
// 首页中间导航
let homeNavSchema=new mongoose.Schema({
	iconurl:String,
	icontitle:String
})
// 首页商品列表
let homeShopListSchema=new mongoose.Schema({
	iconurl:String,
	icontitle:String
})

// 生成Model
const homeSlideModel=mongoose.model('homeslides',homeSlideSchema)
const homeNavModel=mongoose.model('homenavs',homeNavSchema)

module.exports ={homeSlideModel,homeNavModel}
