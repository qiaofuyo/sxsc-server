/*
 * 后台管理系统接口
 * */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const fs = require('fs')
const jwt = require('jsonwebtoken'); // token令牌

const {
	userInfoModel,
	// 一级分类导航
	primaryClassifyModel,
	// 二级分类
	secondaryClassifyModelA,
	secondaryClassifyModelB,
	secondaryClassifyModelC,
	secondaryClassifyModelD,
	secondaryClassifyModelE,
	secondaryClassifyModelF,
	secondaryClassifyModelG,
	secondaryClassifyModelH,
	secondaryClassifyModelI,
	secondaryClassifyModelJ,
	secondaryClassifyModelK,
	secondaryClassifyModelL,
	secondaryClassifyModelM,
	secondaryClassifyModelN,
	secondaryClassifyModelO,
	secondaryClassifyModelP,
	secondaryClassifyModelQ,
	secondaryClassifyModelR,
} = require('../db/models.js')

// 响应对路由(/backstage)路径的get请求
router.get('/', function(req, res, next) {
	// res.render('index', {
	// 	title: '这是后台管理系统接口'
	// });
	res.send('<h3>正在访问后台管理系统接口</h3>')
});



// 登陆
router.post('/login', (req, res) => {
	// 生成令牌
	let payload = {
		username: req.body.username
	}
	let secret = req.body.password
	const token = jwt.sign(
		payload, // 要生成token的主题信息
		secret, // 密钥
		{
			expiresIn: '1h'
		} // 1小时过期
	);
	// 写入
	let options = {
		encoding: 'utf8',
		flag: 'w'
	}
	fs.writeFile('./db/token.txt', token, options, (err) => {
		if (err) return console.log('token写入文件失败');
		// console.log('写入文件成功');
	})
	// 读取
	// fs.readFile('./db/token.txt', (err, data) => {
	// 	console.log('读取到的数据：' + data);
	// })

	if(req.body.username !== 'admin' || req.body.password !== '123456'){
		res.json({
			token: token,
			meta: {
				msg: '登陆失败',
				status: 201
			}
		})
	}

	res.json({
		token: token,
		meta: {
			msg: '登陆成功',
			status: 200
		}
	})
})

// 获取用户列表
router.get('/users', (req, res) => {
	userInfoModel.find((err, docs) => {
		res.json({
			data: docs,
			meta: {
				msg: '获取成功',
				status: 200
			}
		})
	})
})

// 添加用户
router.post('/adduser', (req, res) => {
	let obj = {
		user_name: req.body.user_name,
		user_phone: req.body.user_phone,
		user_pwd: req.body.user_pwd,
		user_gender: req.body.user_gender,
		user_birthdate: req.body.user_birthdate
	}
	userInfoModel.insertMany(obj, (err, docs) => {
		if (err) return
		userInfoModel.find((err, docs) => {
			res.json({
				data: docs,
				meta: {
					msg: '添加用户成功！',
					status: 201
				}
			})
		})
	})
})

// 删除用户
router.delete('/deluser', (req, res) => {
	// console.log(req.query);
	// console.log(req.params);
	// console.log(req.body);
	let sql = {
		_id: req.query[0]
	}
	userInfoModel.deleteOne(sql, err => {
		if (err) return
		userInfoModel.find((err, docs) => {
			res.json({
				data: docs,
				meta: {
					msg: '删除成功',
					status: 200
				}
			})
		})
	})
})

// 响应一级分类导航
router.get('/primaryclassify', (req, res) => {
	primaryClassifyModel.find({}, (err, docs) => {
		if (err) {
			res.json('查询语句错误!!!')
		} else if (docs.length == 0) {
			res.json('没查到相应数据!!!')
		} else {
			res.json(docs)
		}
	})
})

// 获取二级分类导航
router.get('/secondaryclassify([a-r]{1})', (req, res) => {
	let lastchar = req.originalUrl.charAt(req.originalUrl.length - 1)
	if (lastchar == 'a') {
		Model = secondaryClassifyModelA
	}
	if (lastchar == 'b') {
		Model = secondaryClassifyModelB
	}
	if (lastchar == 'c') {
		Model = secondaryClassifyModelC
	}
	if (lastchar == 'd') {
		Model = secondaryClassifyModelD
	}
	if (lastchar == 'e') {
		Model = secondaryClassifyModelE
	}
	if (lastchar == 'f') {
		Model = secondaryClassifyModelF
	}
	if (lastchar == 'g') {
		Model = secondaryClassifyModelG
	}
	if (lastchar == 'h') {
		Model = secondaryClassifyModelH
	}
	if (lastchar == 'i') {
		Model = secondaryClassifyModelI
	}
	if (lastchar == 'j') {
		Model = secondaryClassifyModelJ
	}
	if (lastchar == 'k') {
		Model = secondaryClassifyModelK
	}
	if (lastchar == 'l') {
		Model = secondaryClassifyModelL
	}
	if (lastchar == 'm') {
		Model = secondaryClassifyModelM
	}
	if (lastchar == 'n') {
		Model = secondaryClassifyModelN
	}
	if (lastchar == 'o') {
		Model = secondaryClassifyModelO
	}
	if (lastchar == 'p') {
		Model = secondaryClassifyModelP
	}
	if (lastchar == 'q') {
		Model = secondaryClassifyModelQ
	}
	if (lastchar == 'r') {
		Model = secondaryClassifyModelR
	}
	Model.find({}, (err, docs) => {
		if (err) {
			res.json('查询语句错误!!!')
		} else if (docs.length == 0) {
			res.json('没查到相应数据!!!')
		} else {
			res.json(docs)
		}
	})
})

// 添加商品
router.post('/addGood', (req, res) => {
	let query = req.body.query
	let addData = req.body.addData // 添加的商品数据
	addData.price = addData.price.toFixed(2)
	if(addData.origin_price){
		addData.origin_price = addData.origin_price.toFixed(2)
	}

	let lastchar = query.secondary.toLowerCase()
	if (lastchar == 'a') {
		Model = secondaryClassifyModelA
	}
	if (lastchar == 'b') {
		Model = secondaryClassifyModelB
	}
	if (lastchar == 'c') {
		Model = secondaryClassifyModelC
	}
	if (lastchar == 'd') {
		Model = secondaryClassifyModelD
	}
	if (lastchar == 'e') {
		Model = secondaryClassifyModelE
	}
	if (lastchar == 'f') {
		Model = secondaryClassifyModelF
	}
	if (lastchar == 'g') {
		Model = secondaryClassifyModelG
	}
	if (lastchar == 'h') {
		Model = secondaryClassifyModelH
	}
	if (lastchar == 'i') {
		Model = secondaryClassifyModelI
	}
	if (lastchar == 'j') {
		Model = secondaryClassifyModelJ
	}
	if (lastchar == 'k') {
		Model = secondaryClassifyModelK
	}
	if (lastchar == 'l') {
		Model = secondaryClassifyModelL
	}
	if (lastchar == 'm') {
		Model = secondaryClassifyModelM
	}
	if (lastchar == 'n') {
		Model = secondaryClassifyModelN
	}
	if (lastchar == 'o') {
		Model = secondaryClassifyModelO
	}
	if (lastchar == 'p') {
		Model = secondaryClassifyModelP
	}
	if (lastchar == 'q') {
		Model = secondaryClassifyModelQ
	}
	if (lastchar == 'r') {
		Model = secondaryClassifyModelR
	}
	Model.update({
		"cate.secondaryClassify": query.secondaryClassify
	}, {
		$push: {
			"cate.$.products": {
				$each: [addData],
				$position: 0
			}
		}
	}, err => {
		if (err) return
		Model.find({}, (err, docs) => {
			if (err) {
				res.json('查询语句错误!!!')
			} else if (docs.length == 0) {
				res.json('没查到相应数据!!!')
			} else {
				res.json(docs)
			}
		})
	})
})

// 删除商品
router.delete('/delGood', (req, res) => {
	let sql = {
		['cate.' + req.query.index + '.products']: {
			"name": req.query.name
		}
	}

	let lastchar = req.query.index1.toLowerCase()
	if (lastchar == 'a') {
		Model = secondaryClassifyModelA
	}
	if (lastchar == 'b') {
		Model = secondaryClassifyModelB
	}
	if (lastchar == 'c') {
		Model = secondaryClassifyModelC
	}
	if (lastchar == 'd') {
		Model = secondaryClassifyModelD
	}
	if (lastchar == 'e') {
		Model = secondaryClassifyModelE
	}
	if (lastchar == 'f') {
		Model = secondaryClassifyModelF
	}
	if (lastchar == 'g') {
		Model = secondaryClassifyModelG
	}
	if (lastchar == 'h') {
		Model = secondaryClassifyModelH
	}
	if (lastchar == 'i') {
		Model = secondaryClassifyModelI
	}
	if (lastchar == 'j') {
		Model = secondaryClassifyModelJ
	}
	if (lastchar == 'k') {
		Model = secondaryClassifyModelK
	}
	if (lastchar == 'l') {
		Model = secondaryClassifyModelL
	}
	if (lastchar == 'm') {
		Model = secondaryClassifyModelM
	}
	if (lastchar == 'n') {
		Model = secondaryClassifyModelN
	}
	if (lastchar == 'o') {
		Model = secondaryClassifyModelO
	}
	if (lastchar == 'p') {
		Model = secondaryClassifyModelP
	}
	if (lastchar == 'q') {
		Model = secondaryClassifyModelQ
	}
	if (lastchar == 'r') {
		Model = secondaryClassifyModelR
	}
	
	Model.update({}, {
		$pull: sql
	}, (err, docs) => {
		if (err) return console.log(err);
		Model.find({}, (err, docs) => {
			if (err) {
				res.json('查询语句错误!!!')
			} else if (docs.length == 0) {
				res.json('没查到相应数据!!!')
			} else {
				res.json(docs)
			}
		})
	})
})

// 获取订单列表
router.get('/orders', (req, res) => {
	userInfoModel.find({}, {
		_id: 0,
		user_orders: 1
	}, (err, docs) => {
		res.json({
			data: docs,
			meta: {
				msg: '获取成功',
				status: 200
			}
		})
	})
})

// 发货
router.post('/delivergoods', (req, res) => {
	userInfoModel.updateOne({
		"user_orders._id": req.body.id
	}, {
		$set: {
			"user_orders.$.order_status": "已发货"
		}
	}, err => {
		if (err) return
		userInfoModel.find((err, docs) => {
			res.json({
				data: docs,
				meta: {
					msg: '发货成功',
					status: 200
				}
			})
		})
	})
})

// 删除订单
router.delete('/delorder', (req, res) => {
	let sql = {
		"user_orders": {
			"_id": req.query[0]
		}
	}
	userInfoModel.updateOne({"user_orders._id": req.query[0]}, {
		$pull: sql
	}, err => {
		if (err) return
		userInfoModel.find((err, docs) => {
			res.json({
				data: docs,
				meta: {
					msg: '删除成功',
					status: 200
				}
			})
		})
	})
})

module.exports = router;
