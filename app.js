const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// 前台接口
const indexRouter = require('./routes/index');
// 后台接口
const backstageRouter = require('./routes/backstage.js')
// 默认访问接口
const usersRouter = require('./routes/users');

const app = express();

// express-session
const session = require('express-session')
app.use(session({ // .use 增加中间件
	secret: '12345', // 对会话ID cookie设置签名秘钥,内容可以任意填写
	resave: false, // 强制将会话保存回会话存储区
	saveUninitialized: true, // 强制将“未初始化”的会话保存到存储区
	httpOnly: true, // 不允许客户端JavaScript查看document.cookie中的cookie
	cookie: { // 设置session有效时间，毫秒
		maxAge: 1000 * 60 * 60 * 24
	}
}))

//设置跨域访问响应头——CORS跨域
// app.all('*', (req, res, next) => {
// 	res.header("Access-Control-Allow-Origin", "http://localhost:8080");
// 	res.header("Access-Control-Allow-Headers", "X-Requested-With");
// 	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

// 	res.header("X-Powered-By", ' 3.2.1');
// 	res.header("Content-Type", "application/json;charset=utf-8");
// 	res.header('Access-Control-Allow-Credentials', 'true');
// 	if (req.method == 'OPTIONS') { // 获取当前URL所支持的方法，如果是options请求则直接返回不读取后续中间件，能够加快响应速度
// 		res.sendStatus(200);
// 	} else {
// 		next(); // 继续执行请求
// 	}
// });

//设置跨域访问响应头——CORS跨域——解决使用sesion时存在的跨域问题（同一客户端的访问被认定为两个客户端的访问）
// app.all('*', (req, res, next)=>{
// 	// res.header('Access-Control-Allow-Origin', '*');  // 设置允许访问的Origin Domain,多个Origin用逗号(,)分隔,Domain结尾不要加斜杠(/)
// 	res.header('Access-Control-Allow-Origin', 'http://localhost:8080');  // 请求携带cookies时不能为*

// 	res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, DELETE');  // 允许跨域的请求方式
// 	res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');  // 用于 preflight request （预检请求，检查服务器是否支持 CORS 即跨域资源共享）中
// 	res.header('Access-Control-Max-Age', '600');  //  preflight request（预检请求）的返回结果（上述两种HTTP消息头提供的结果）可以被缓存多久

// 	res.header('Access-Control-Allow-Credentials', 'true');  // 是否可以将对请求的响应暴露给页面（为false时浏览器会忽略响应，不会返回到web内容）；请求携带cookies时必须得有它
// 	next();
// })

// 开发后台管理系统也需要跨域，所以改为动态的允许ip访问
app.all('*', (req, res, next) => {
	// console.log(req.headers);  // 打印请求头
	
	const ALLOW_ORIGIN = [undefined, "http://127.0.0.1:3000", "http://localhost:3000", "http://localhost:8080", "http://localhost:9090", "http://test.com", "http://test.com:3000", "http://test.com:9090", "http://xinggui.top", "http://xinggui.top:3000", "http://xinggui.top:9090"]  // 白名单
	let reqOrigin = req.headers.origin; // 请求头的origin属性
	
	if (ALLOW_ORIGIN.includes(reqOrigin)) {
		res.header('Access-Control-Allow-Origin', reqOrigin);  // 只能是一个字符串，所以上上要进行if判断
		res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
		res.header('Access-Control-Allow-Headers',
			'Origin, Content-Type, Content-Length, Authorization, Accept, X-Requested-With, accessToken');
		res.header('Access-Control-Max-Age', '600');

		res.header('Access-Control-Allow-Credentials', 'true');
		
		// res.header('X-Content-Type-Options', 'nosniff')
		next();
	} else {  // 源地址不存在 ALLOW_ORIGIN 中则视为非法请求
		res.send({
			code: -2,
			msg: '非法请求'
		})
	}
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 路由组件——接口
app.use('/', indexRouter);
app.use('/backstage', backstageRouter)
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!')
// })
// app.listen(3000,'0.0.0.0', function () {
//   console.log('Example app listening on port 3000!')
// })

module.exports = app;
