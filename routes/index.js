const express = require('express');
const router = express.Router();

const {
	homeSlideModel,
	homeNavModel,
	homeShopListModel
} = require('../db/models.js')

router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});

// 响应首页——轮播图图片
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
	let sql = {}
	setTimeout(function() { // 为什么要延时3毫秒
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
	}, 300)
})

module.exports = router;
