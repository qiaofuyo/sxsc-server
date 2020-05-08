const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

// 验证码——svg-captcha
const svgCaptcha = require('svg-captcha');

const {
	// 首页
	homeSlideModel,
	homeNavModel,
	homeShopListModel,
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
	// 用户信息
	userInfoModel,
	// 购物车信息
	cartInfoModel
} = require('../db/models.js')

// 响应对根路由(/)路径的get请求————已改为被app.all(*)进行拦截
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});


// 响应对路由路径 /api/homeslide 的 get 请求  首页——轮播图
router.get('/api/homeslide', (req, res) => {
	let sql = {}
	homeSlideModel.find(sql, (err, docs) => {
		if (err) {
			res.json({
				status_code: 0,
				message: '查询语句错误!!!'
			})
		} else if (docs.length == 0) {
			res.json({
				status_code: 1,
				message: [{
					'error': '没查到相应数据!!!'
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

// 响应首页——导航
router.get('/api/homenav', (req, res) => {
	let sql = {}
	homeNavModel.find(sql, (err, docs) => {
		if (err) {
			res.json({
				status_code: 0,
				message: '查询语句错误!!!'
			})
		} else if (docs.length == 0) {
			res.json({
				status_code: 1,
				message: [{
					'error': '没查到相应数据!!!'
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

// 响应首页——商品列表
router.get('/api/homeshoplist', (req, res) => {
	let sql = {}
	setTimeout(function() { // 为什么要延时3毫秒???
		let sql = {}
		homeShopListModel.find(sql, (err, docs) => {
			if (err) {
				res.json({
					status_code: 0,
					message: '查询语句错误!!!'
				})
			} else if (docs.length == 0) {
				res.json({
					status_code: 1,
					message: [{
						'error': '没查到相应数据!!!'
					}]
				})
			} else {
				res.json({
					status_code: 200,
					message: docs
				})
			}
		})
	}, 300)
})

// 响应一级分类
router.get('/api/primaryclassify', (req, res) => {
	let sql = {}
	primaryClassifyModel.find(sql, (err, docs) => {
		if (err) {
			res.json('查询语句错误!!!')
		} else if (docs.length == 0) {
			res.json('没查到相应数据!!!')
		} else {
			res.json(docs)
		}
	})
})

// 响应二级分类
// 需求: 二级分类请求有18种,数目太多不建议像上面一条请求对应一条router.get()
// 思路: 对请求路径进行 条件判断 + 循环 + 拼接 => 获得对应的一级分类号 => 传给router.get()和mongoose.model()
// 否决: 不知如何确定满足判断条件
// 思路修正: 使用字符串模式或正则表达式匹配路径 => 通过req.route.path取得路由路径 => 使用String.charAt()获得对应的一级分类号 => 传给mongoose.model()
// 否决: 获得的一级分类号有误
// 思路修正: 使用字符串模式或正则表达式匹配路径 => 通过req.originalUrl获得原始的URL请求 => 使用String.charAt()获得对应的一级分类号 => 传给mongoose.model()
// 经测试,获得了正确的一级分类号
// 其他方案: 使用动态路由,请求路径上带参数( req.params 或 req.query )
// 否决: 不知如何传递给mongoose.model(),使用global时model先执行了
// 干,最终还是采取了最笨的办法实现————但是写完后发现这办法好像还行
router.get('/api/secondaryclassify([a-r]{1})', (req, res) => {
	let sql = {}
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
	Model.find(sql, (err, docs) => {
		if (err) {
			res.json('查询语句错误!!!')
		} else if (docs.length == 0) {
			res.json('没查到相应数据!!!')
		} else {
			res.json(docs)
		}
	})
})

// 搜索商品
router.post('/api/searchGoods', async (req, res) => {
	let search = Object.keys(req.body)[0]
	let arr = []  // 存放查询到的商品
	for (let i = 97; i <= 114; i++) {
		let lastchar = String.fromCharCode(i)
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
		await Model.aggregate([
			{ $unwind : "$cate" },
			{ $unwind : "$cate.products" },
			{ $match : {"cate.products.name": {$regex: new RegExp(search,'i')}} },
			{ $project : {"cate.products": 1} }
		], (err, docs) => {
			if(err) console.log(err);
			// arr = arr.concat(docs)
			docs.forEach(item=>{
				arr.push(item.cate.products)
			})
		})
	}
	res.json(arr)
})

// 图形验证码
// const userCaptcha={}  // 保存生成的验证码
router.get('/api/captcha', (req, res) => {
	// 生成验证码
	let captcha = svgCaptcha.create({
		ignoreChars: '0oO1iIlJt',
		noise: 2,
		color: true,
		size: 4
	});
	// 保存最后一次生成的验证码
	// for (let key in userCaptcha) {  // 清空
	// 	delete userCaptcha[key]
	// }
	// userCaptcha[req.session.captcha] = req.session.captcha  //保存

	// 转小写保存到服务器的session里(session只保存最后一次生成的验证码)
	// session.captcha = captcha.text.toLowerCase()
	// console.log(session);

	// 转小写保存到服务器的session里(session只保存最后一次生成的验证码)
	req.session.captcha = captcha.text.toLocaleLowerCase();

	// 设置类型
	res.type('svg');
	// 返回
	res.status(200).send(captcha.data);
	// res.send({
	// 	text: captcha.text,
	// 	data: captcha.data
	// })
});

// 用户登陆
router.post('/api/login', (req, res) => {
	let phone = req.body[0] // 手机号
	let pwd = req.body[1] // 密码
	let captcha = req.body[2].toLowerCase() // 验证码

	let sql = {
		user_phone: phone
	}
	userInfoModel.find(sql, (err, docs) => {
		if (err) {
			res.json({
				status_code: 0,
				message: '查询语句错误!!!'
			})
		} else if (docs.length == 0) {
			res.json({
				status_code: 1,
				message: '用户不存在，请注册'
			})
		} else if (pwd !== docs[0].user_pwd) {
			res.json({
				status_code: 2,
				message: '登陆失败，手机号或密码错误'
			})
		}
		// else if (userCaptcha[captcha] !== captcha) {  // 验证码错误
		// 	res.json({
		// 		status_code: 0,
		// 		message: '验证码错误'
		// 	})
		// 	return
		// }
		// delete userCaptcha[captcha]	// 验证手机号、密码
		// else if (session.captcha !== captcha) {
		else if (req.session.captcha !== captcha) { // 验证码错误
			res.json({
				status_code: 3,
				message: '验证码错误'
			})
			return
		} else {
			delete req.session.captcha // 登陆成功则删除session所保存的验证码
			req.session.userId = docs[0]._id // 登陆成功保存id,用以记录用户的登陆状态
			userInfoModel.find({_id: docs[0]._id}, {user_pwd: 0}, (err, doc)=>{
				res.json({
					status_code: 200,
					message: doc[0]
				})
			})
			// userInfoModel.find({
			// 	_id: docs[0]._id
			// }, {
			// 	user_cart_info: {
			// 		$elemMatch: {
			// 			goods_is_pay: false
			// 		}
			// 	},
			// 	user_pwd: 0
			// }, (err, doc) => {
			// 	res.json({
			// 		status_code: 200,
			// 		message: doc
			// 	})
			// })
		}
	})
})

// 用户注册
router.post('/api/register', (req, res) => {
	let name = req.body.name
	let phone = req.body.phone
	let pwd = req.body.pwd

	let sql = {
		user_phone: phone
	}
	// 查询用户是否存在
	userInfoModel.find(sql, (err, docs) => {
		if (err) {
			res.json({
				status_code: 0,
				message: '查询语句错误！！！'
			})
		} else if (docs.length == 0) { // 不存在，创建新用户
			let obj = {
				user_name: name,
				user_phone: phone,
				user_pwd: pwd,
			}
			userInfoModel.insertMany(obj, (err, docs) => {
				if (err) {
					res.json({
						status_code: 1,
						message: '注册新用户失败!!!'
					})
				} else {
					res.json({
						status_code: 200,
						message: {
							phone: phone
						}
					})
				}
			})
		} else {
			res.json({
				status_code: 2,
				message: '用户已存在'
			})
		}
	})
})

// 自动登陆
router.get('/api/auto_login', (req, res) => {
	let userId = req.session.userId // 用户登陆成功时保存到session里的

	let sql = {
		_id: userId
	}
	userInfoModel.find(sql, { user_pwd: 0 }, (err, docs) => { // 不返回密码字段
		if (err) {
			res.json({
				status_code: 0,
				message: '查询语句错误！！！'
			})
		} else if (!docs[0]) {
			// delete req.session.captcha  // 
			res.json({
				status_code: 1,
				message: '请先登录'
			})
		} else {
			res.json({
				status_code: 2,
				message: docs[0]
			})
		}
	})
	// 数据流修改，下述作废————不管商品是否被购买统统发给前端，由前端判断
	// userInfoModel.aggregate([
	// 	{"$unwind":"$user_cart_info"},
	// 	{"$match": {
	// 		"_id": mongoose.Types.ObjectId(userId),  // mongoose使用管道需手动转换字符串id为ObjectId
	// 		"user_cart_info.goods_is_pay": false,
	// 		}
	// 	},
	// 	{"$project": {"_id":0, "user_cart_info":1} }
	// ]).exec((err, docs)=>{
	// 	if (err) {
	// 		res.json({
	// 			status_code: 0,
	// 			message: '查询语句错误！！！'
	// 		})
	// 	} else if (!docs[0]) {
	// 		// delete req.session.captcha  // 
	// 		res.json({
	// 			status_code: 1,
	// 			message: '请先登录'
	// 		})
	// 	} else {
	// 		res.json({
	// 			status_code: 2,
	// 			message: docs
	// 		})
	// 	}
	// })
})

// 退出登录
router.get('/api/logout', (req, res) => {
	delete req.session.userId // 清除session中的userId
	res.json({
		status_code: 200,
		message: '退出登录成功'
	})
})

// 修改用户信息
router.post('/api/change_user_info', (req, res) => {
	// 获取提交的信息
	let id = req.body._id || null // 所接收的id是不带类型（ObjectId）的字符串，mongoose会自动转换成ObjectId类型
	// let photo = req.body.user_photo
	let name = req.body.user_name
	// let phone = req.body.user_phone
	// let pwd = req.body.user_pwd
	let gender = req.body.user_gender
	let birthdate = req.body.user_birthdate

	// 验证
	if (!id) {
		res.json({
			status_code: 0,
			message: '验证信息失败'
		})
	} else {
		// 更新数据
		let sql = {
			_id: id
		}
		let newValue = {
			$set: {
				user_name: name,
				user_gender: gender,
				user_birthdate: birthdate
			}
		}
		userInfoModel.updateOne(sql, newValue, (err, docs) => {
			if (err) {
				res.json({
					status_code: 1,
					message: '修改信息失败'
				})
			} else {
				res.json({
					status_code: 200,
					message: '修改信息成功'
				})
			}
		})
	}
})

// 非购物车界面商品添加到购物车
router.post('/api/add_shop_cart', (req, res) => {
	// 验证用户——登陆了的用户才能进行购物车变动
	let userId = req.body.user_id
	if (!userId || userId !== req.session.userId) {
		res.json({
			status_code: 0,
			message: '请先登录'
		})
		return
	}

	// 获取客户端传过来的信息
	let goods_id = req.body.goods_id
	let goods_name = req.body.goods_name
	let goods_image_url = req.body.goods_image_url
	let goods_price = req.body.goods_price
	let goods_buy_count = req.body.goods_buy_count

	// 更新数据
	// let sql = {
	// 	$and: [{
	// 			"_id": userId
	// 		},
	// 		{
	// 			"user_cart_info.goods_name": goods_name
	// 		}
	// 	]
	// }
	let sql = { "_id": userId, "user_cart_info.goods_name": goods_name }
	let filter = { "user_cart_info.$": 1 }
	userInfoModel.find(sql, filter, (err, docs) => {
		if (err) { // 查询语句错误
			res.json({
				status_code: 1,
				message: '查询失败'
			})
		} else if (docs.length === 0) { // 商品不存在
			let new_sql = { _id: userId }
			let new_value = {
				goods_id: goods_id,
				goods_name: goods_name,
				goods_image_url: goods_image_url,
				goods_price: goods_price,
				goods_buy_count: goods_buy_count,
			}
			let insert_value = {
				$push: {
					user_cart_info: {
						$each: [new_value]
					}
				}
			}
			userInfoModel.updateOne(new_sql, insert_value, (err, result) => {
				if (err) {
					res.json({
						status_code: 2,
						message: '加入购物车失败！'
					})
				} else {
					// 返回更新后的购物车信息
					userInfoModel.find({ _id: userId }, { user_pwd: 0 }, (err, docs) => {
						res.json({
							status_code: 3,
							message: '添加了新的商品',
							updateResults: docs[0]
						})
					})
				}
			})
		} else { // 商品已存在
			// $inc增量操作符
			// 操作 user_cart_info.$.goods_buy_coun 字段：$操作符使其仅返回第一个满足条件的元素。
			let update_filter = {
				$inc: { 'user_cart_info.$.goods_buy_count': goods_buy_count }
			}
			userInfoModel.updateOne(sql, update_filter, (err, result) => {
				if (err) {
					res.json({
						status_code: 4,
						message: '加入购物车失败'
					})
				} else {
					// 返回更新后的购物车信息
					userInfoModel.find({ _id: userId }, { user_pwd: 0 }, (err, docs) => {
						res.json({
							status_code: 5,
							message: '当前商品数量+1',
							updateResults: docs[0]
						})
					})
				}
			})
		}
	})
})

// 购物车界面商品增减
router.post('/api/add_shop_counter', (req, res) => {
	// 获取信息
	let user_id = req.body.user_id
	let goods_name = req.body.goods_name
	let isAdd = req.body.isAdd

	let sql = {
		$and: [{
			"_id": user_id
		}, {
			"user_cart_info.goods_name": goods_name
		}]
	}
	if (isAdd === 0) { // 减量商品
		let del = {
			$pull: {
				"user_cart_info": {
					"goods_name": goods_name
				}
			}
		}
		userInfoModel.updateOne(sql, del, (err, result) => {
			if (err) {
				res.json({
					status_code: 0,
					message: '删除商品失败!'
				})
				return
			}
			userInfoModel.find({ _id: user_id }, { user_pwd: 0 }, (err, docs) => {
				res.json({
					status_code: 1,
					message: '成功删除商品',
					updateResults: docs[0]
				})
				return
			})
		})
	} else { // 增量商品
		let filter = {
			$inc: {
				'user_cart_info.$.goods_buy_count': isAdd
			}
		}
		userInfoModel.updateOne(sql, filter, (err, result) => {
			if (err) {
				res.json({
					status_code: 2,
					message: '增减失败!'
				})
				return
			}
			// 返回更新后的购物车信息
			userInfoModel.find({ _id: user_id }, { user_pwd: 0 }, (err, docs) => {
				res.json({
					status_code: 3,
					message: '当前商品数量' + isAdd,
					updateResults: docs[0]
				})
			})
		})
	}
})

// 清空购物车
router.post('/api/empty_cart', (req, res) => {
	console.log(req.body);
	let sql = { _id: req.body._id }
	let uptate_sql = { $set: { user_cart_info: req.body.receiving_goods } }
	userInfoModel.updateOne(sql, uptate_sql, (err) => {
		if (err) {
			res.json({
				status_code: 0,
				message: '清空购物车失败！'
			})
			return
		}
		userInfoModel.find(sql, {
			user_pwd: 0
		}, (err, docs) => {
			res.json({
				status_code: 1
			})
		})
	})
})

// 收货地址
router.post('/api/harvest_address', (req, res) => {
	userInfoModel.updateOne({
		_id: req.body.user_id
	}, {
		$push: {
			user_receiving: {
				$each: [{
					receiving_name: req.body.receiving_name,
					receiving_phone: req.body.receiving_phone,
					receiving_address: req.body.receiving_address
				}],
				$position: 0
			}
		}
	}, (err, docs) => {
		userInfoModel.find({_id: req.body.user_id},
		{
			// user_cart_info: {
			// 	$elemMatch: {
			// 		goods_is_pay: false
			// 	}
			// },
			user_pwd: 0
		}, (err, doc) => {
			res.json(doc[0].user_receiving)
		})
	})
})

// 提交订单
router.post('/api/settlement', (req, res) => {
	// 重构购物车，增加订单页
	let userId = req.body._id  // 用户id
	let order = req.body.order  // 订单信息

	userInfoModel.updateOne({_id: userId}, {  // 先在订单表中插入数据
		$push: {
			user_orders: {
				$each: [{
					'order_id': order.order_id,  // 订单编号
					'already_bought_goods': order.already_bought_goods,  // 购买的商品
					'order_amount': order.order_amount,  // 订单金额
					'order_status': order.order_status,  // 订单状态  1待发货 2待收货 3已收货
					'order_time': order.order_time,  // 下单时间
					'order_buyer': order.order_buyer,  // 买家
					'order_contact': order.order_contact,  // 联系方式
					'order_address': order.order_address  // 地址
				}],
				$position: 0
			}
		}
	}, (err)=>{
		if(err) return console.log(err);
		// 整合购物车中已购商品的名称
		let arr = []
		order.already_bought_goods.forEach(item=>{
			arr.push(item.goods_name)
		})
		userInfoModel.update({_id: userId}, {  // 再删除购物车表中的已购商品
			$pull: {
				user_cart_info: {
					goods_name: {
						$in: arr
					}
				}
			}
		}, {multi: true}, err=>{
			if(err) return console.log(err);
			userInfoModel.find({ _id: userId }, { user_pwd: 0 }, (err, docs) => {
				res.json({
					status_code: 1,
					message: docs[0]
				})
			})
		})
	})
	
	
	/* *
	 * 添加商品时会另外生成一个 _id， 分类中的商品是没有 goods_id
	 * > 前端提交 用户_id 和 购买商品的_id*/
	// let buyGoods = [...req.body]  // 拷贝前端传来的数据
	// let userId = buyGoods.shift()  // 获取到用户id后 buyGoods 只剩下商品id
	
	// userInfoModel.update(
	// 	{ _id: userId },
	// 	{ $set: { "user_cart_info.$[condition].goods_is_pay": true } },
	// 	{ multi: true,
	// 	  arrayFilters: [{"condition._id": { $in: buyGoods }}]
	// 	}, err => {
	// 		if(err)	return res.json({ status_code: 0, message: '失败！' })
	// 		// 返回数据
	// 		userInfoModel.find({ _id: userId }, { user_pwd: 0 }, (err, docs) => {
	// 			res.json({
	// 				status_code: 1,
	// 				message: docs[0]
	// 			})
	// 		})
	// })
})

// 确认收货
router.post('/api/confirm_receipt', (req, res) => {
	console.log(req.body);
	userInfoModel.updateOne({
		"user_orders._id": req.body.id
	}, {
		$set: {
			"user_orders.$.order_status": "已收货"
		}
	}, err => {
		if (err) return
		userInfoModel.find((err, docs) => {
			res.json({
				message: docs[0],
				status_code: 200
			})
		})
	})
})


/* 
	session测试
*/
// //读取session
// router.post("/select",function(req,res){
//   //查看session
//   console.log(req.session)
//   res.send("查询成功")
// })
// //设置session里面的内容
// router.post("/add",function(req,res){
//   //往session里存储数据
//   req.session.loginok='asdf';			//loginok:可以是任意内容，可以为true或false
//   console.log(req.session)
// 	res.send("添加成功")
// })





module.exports = router;
