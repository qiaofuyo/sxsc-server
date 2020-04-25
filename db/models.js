const conn = require('./db.js')
const mongoose = require('mongoose')



// 创建Schema
// 首页——轮播图
let homeSlideSchema = new mongoose.Schema({
	// _id: Object,
	name: String,
	image_url: String,
	goto: String
})
// 首页——中间导航
let homeNavSchema = new mongoose.Schema({
	// _id: Object,
	image_url: String,
	name: String
})
// 首页——商品列表
let homeShopListSchema = new mongoose.Schema({
	// _id: String,
	name: String,
	describe: String,
	image_url: String,
	price: String,
	origin_price: String,
	sold: Number,
	inventory: Number
})
// 一级分类
let primaryClassifySchema = new mongoose.Schema({
    // "_id" : String,
    "name" : String,
    "primary_classify" : String,
    "timestamp" : Number
})
// 二级分类
let grandsonSchema = new mongoose.Schema({
	"name" : {type:String, default: null},
	"describe" : {type:String, default: null},
	"image_url" : {type:String, default: null},
	"price" : {type:String, default: null},
	"origin_price" : {type:String, default: null},
	"sold" : {type:Number, default: 0},
	"inventory" : {type:Number, default: 0}
})
let subSchema = new mongoose.Schema({
  // "_id" : Object,
  "name" : String,
  "secondaryClassify" : String,
	"products": [ grandsonSchema ],
	"timestamp" : Number
})
let secondaryClassifySchema = new mongoose.Schema({
  "_id" : Object,
  "name" : String,
  "primary_classify" : String,
	"cate": [ subSchema ],
  "timestamp" : Number
})

// 用户信息
let receivingSchema = new mongoose.Schema({  // 收获地址信息
	'receiving_name': {type:String, default: null}, 
	'receiving_phone':{type:String, default: null}, 
	'receiving_address': {type:String, default: null}
})
let ordersSchema = new mongoose.Schema({  // 订单信息（已付款商品）
	'order_id': String,  // 订单编号
	'already_bought_goods': Array,  // 购买的商品
	'order_amount': String,  // 订单金额
	'order_status': String,  // 订单状态  1待发货 2待收货 3已收货
	'order_time': String,  // 下单时间
	'order_buyer': String,  // 买家
	'order_contact': String,  // 联系方式
	'order_address': String  // 地址
})
let cartInfoSchema = new mongoose.Schema({  // 购物车信息（未付款商品）
	"goods_id": String,
	"goods_name": String,
	"goods_image_url":String,
	"goods_price": String,
	"goods_buy_count": Number,
})
let userInfoSchema = new mongoose.Schema({
	'user_photo': {type:String, default: null},  // 头像
	'user_name': {type:String, default: null},  // 昵称
	'user_phone': {type:String, default: null},  // 电话
	'user_pwd': {type:String, default: null},  // 密码
	'user_gender': {type:String, default: null},  // 性别
	'user_birthdate':  {type:String, default: null},  // 出生日期
	'user_cart_info': [ cartInfoSchema ],  // 购物车（未付款商品）
	'user_orders': [ ordersSchema ],  // 订单（已付款商品）
	'user_receiving': [receivingSchema]  // 收获地址
}, {versionKey:false})



// 生成Model
// 首页
const homeSlideModel = mongoose.model('home_slide', homeSlideSchema, 'home_slide')
const homeNavModel = mongoose.model('home_nav', homeNavSchema, 'home_nav')
const homeShopListModel = mongoose.model('home_shop_list', homeShopListSchema, 'home_shop_list')
// 一级分类
const primaryClassifyModel = mongoose.model('primary_classify', primaryClassifySchema, 'primary_classify')
// 二级分类
// const secondaryClassifyModel = mongoose.model('secondary_classify', secondaryClassifySchema, 'secondary_classify_'+global.PC)
const secondaryClassifyModelA = mongoose.model('secondary_classify', secondaryClassifySchema, 'secondary_classify_a')
const secondaryClassifyModelB = mongoose.model('secondary_classify', secondaryClassifySchema, 'secondary_classify_b')
const secondaryClassifyModelC = mongoose.model('secondary_classify', secondaryClassifySchema, 'secondary_classify_c')
const secondaryClassifyModelD = mongoose.model('secondary_classify', secondaryClassifySchema, 'secondary_classify_d')
const secondaryClassifyModelE = mongoose.model('secondary_classify', secondaryClassifySchema, 'secondary_classify_e')
const secondaryClassifyModelF = mongoose.model('secondary_classify', secondaryClassifySchema, 'secondary_classify_f')
const secondaryClassifyModelG = mongoose.model('secondary_classify', secondaryClassifySchema, 'secondary_classify_g')
const secondaryClassifyModelH = mongoose.model('secondary_classify', secondaryClassifySchema, 'secondary_classify_h')
const secondaryClassifyModelI = mongoose.model('secondary_classify', secondaryClassifySchema, 'secondary_classify_i')
const secondaryClassifyModelJ = mongoose.model('secondary_classify', secondaryClassifySchema, 'secondary_classify_j')
const secondaryClassifyModelK = mongoose.model('secondary_classify', secondaryClassifySchema, 'secondary_classify_k')
const secondaryClassifyModelL = mongoose.model('secondary_classify', secondaryClassifySchema, 'secondary_classify_l')
const secondaryClassifyModelM = mongoose.model('secondary_classify', secondaryClassifySchema, 'secondary_classify_m')
const secondaryClassifyModelN = mongoose.model('secondary_classify', secondaryClassifySchema, 'secondary_classify_n')
const secondaryClassifyModelO = mongoose.model('secondary_classify', secondaryClassifySchema, 'secondary_classify_o')
const secondaryClassifyModelP = mongoose.model('secondary_classify', secondaryClassifySchema, 'secondary_classify_p')
const secondaryClassifyModelQ = mongoose.model('secondary_classify', secondaryClassifySchema, 'secondary_classify_q')
const secondaryClassifyModelR = mongoose.model('secondary_classify', secondaryClassifySchema, 'secondary_classify_r')
// 用户信息
const userInfoModel = mongoose.model('user_info', userInfoSchema, 'user_info')



module.exports = {
	// 首页
	homeSlideModel,
	homeNavModel,
	homeShopListModel,
	// 一级分类导航
	primaryClassifyModel,
	// 二级分类导航
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
}
