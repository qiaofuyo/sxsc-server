const express = require('express');
// 使用Router模块, 接收到某种路径的请求后做出响应
const router = express.Router();
// // 导入连接数据库
// const conn=require('../db/db.js')
// 导入 Model
const Models = require('../db/models.js')

/* 应用服务器默认首页 */
router.get('/', function(req, res, next) { // next: 继续执行
	res.render('index', {
		title: 'Express'
	});
});

/*
	服务器 => 后台管理系统,应用服务器(数据分发)
	这里仅搭建应用服务器的接口部分,不涉及后端操作,全部是数据库操作
*/

// 响应首页——轮播图图片
router.get('/api/homeslide', (req, res) => {
	// 1. 这是通过请求json文件代替数据库,尚未使用数据库
	// const data=require('../data/homeSlide.json')
	// console.log(data)
	// res.json({status_code:200,message:data})  // status_code: 响应的状态码, message: 响应的数据		imgurl:图片地址	detail:跳转页面
	// 2. 这是请求数据库
	let sql = {}
	Models.homeSlideModel.find(sql, (err, docs) => {
		if (err) {
			res.json({
				status_code: 0,
				message: '查询语句错误!!!'
			})
		} else if (docs.length == 0) {
			res.json({
				status_code: 1,
				message: [{
					'error': '数据库中没有数据!!!'
				}]
			})
		} else {
			res.json({
				status_code: 200,
				message: docs
			})
		}
	})
})

// 响应首页——导航图片
router.get('/api/homenav', (req, res) => {
	// 1. 这是通过请求json文件代替数据库,尚未使用数据库
	// const data=require('../data/homeNav.json')
	// res.json({success_code:200,message:data})
	// 2. 这是请求数据库
	let sql = {}
	Models.homeNavModel.find(sql, (err, docs) => {
		if (err) {
			res.json({
				status_code: 0,
				message: '查询语句错误!!!'
			})
		} else if (docs.length == 0) {
			res.json({
				status_code: 1,
				message: [{
					'error': '数据库中没有数据!!!'
				}]
			})
		} else {
			res.json({
				status_code: 200,
				message: docs
			})
		}
	})
})
// 响应首页——商品列表图片
router.get('/api/homeshoplist', (req, res) => {
	setTimeout(function() { // 为什么要延时3毫秒
		const data = require('../data/homeShopList.json')
		res.json({
			success_code: 200,
			message: data
		})
	}, 300)
})

module.exports = router;
