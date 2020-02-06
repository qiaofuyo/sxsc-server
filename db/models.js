const conn = require('./db.js')
const mongoose = require('mongoose')

// 创建Schema

// 首页轮播图
let homeSlideSchema = new mongoose.Schema({
	_id: Object,
	name: String,
	image_url: String,
	goto: String,
})

// 首页中间导航
let homeNavSchema = new mongoose.Schema({
	_id: Object,
	image_url: String,
	name: String
})

// 首页商品列表
let homeShopListSchema = new mongoose.Schema({
	_id: String,
	name: String,
	describe: String,
	image_url: String,
	price: String,
	origin_price: String,
	sold: Number,
	inventory: Number
})

// 生成Model
const homeSlideModel = mongoose.model('homeslides', homeSlideSchema)
const homeNavModel = mongoose.model('homenavs', homeNavSchema)
const homeShopListModel = mongoose.model('homeshoplists', homeShopListSchema)

module.exports = {
	homeSlideModel,
	homeNavModel,
	homeShopListModel
}
