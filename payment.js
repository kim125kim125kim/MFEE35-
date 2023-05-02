var express = require('express');
var app = express();
var mysql = require('mysql');
let engine = require('ejs-locals');
const axios = require('axios');
var bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: false }));//解析form data資料
app.use(bodyParser.json());



app.use(express.static(__dirname + '/public'))

var conneko = mysql.createConnection({
    host: 'localhost',
    port: '8889',
    user: 'root',
    password: 'root',
    database: 'buybuy_database'

});

conneko.connect((err) => {

    if (!err) {

        console.log('資料庫連線成功')

    } else {

        console.log('資料庫連線失敗' + err.sqlMessage ? err.sqlMessage : err);
    }

})


app.listen(3000, () => {

    console.log('伺服器執行中');

});




// //商品資訊V1
// var data = {};
// var sql_query1 = "SELECT * FROM `product_data` WHERE product_id ='p0001';"
// conneko.query(sql_query1, function (err, rows, fields) {
//     if (err) throw err;
//     data = rows[0]
//     console.log(data);
// })
// //使用者資訊V1
// var data2 = {};
// var sql_query2 = "SELECT * FROM `user_data` WHERE user_id='u1';"
// conneko.query(sql_query2, function (err, rows, fields) {
//     if (err) throw err;
//     data2 = rows[0]
//     // console.log(data2);
// })
app.get('/', (req, res) => {

    res.sendFile(__dirname + "/payment.html");

});

//商品卡片所需資料Ver-axios
app.get('/card', (req, res) => {

    var sql = `SELECT p.product_id, p.user_id, p.shop_name, p.product, p.country, p.shop_state, p.pic_url1, p.pic_url2, p.pic_url3, p.pic_url4, p.product_url, p.exp_date, p.product_type, p.product_intro, p.trade_state, p.start_date, p.end_date, p.trade_date, p.notefication, p.discount, p.spec1, p.spec1_price, u.email, u.user_name, u.nick_name FROM product_data p JOIN user_data u ON p.user_id = u.user_id WHERE p.user_id = 1;
    `;
    conneko.query(sql, (err, results, fields) => {
      
        // console.log(err);
        // console.log(results)
        res.json(results);

    })



})   
 //日期相關
app.get('/date', (req, res) => {

    var sql2 = `SELECT user_id, DATE_FORMAT(end_date, '%Y/%m/%d') AS end_date_v2,DATE_FORMAT(trade_date, '%Y/%m/%d') AS trade_date_v2,exp_date from product_data;`
    conneko.query(sql2, (err, results, fields) => {
      
        // console.log(err);
        // console.log(results);
        res.json(results);

    });
})

app.post('/order_data', (req, res) => {
    const { selectValue, inputValue, radioValue } = req.body;
    const query = 'INSERT INTO `order_data`(`product_id`, `user_id`, `shipping`, `address`, `product_spec`, `pay_way`) VALUES (1,2,?,?,`單顆`,?)';
  
    conneko.query(query, [selectValue ,inputValue,radioValue], (error, results,fields) => {
       // console.log(err);
        // console.log(results);
        res.json(results);
    });
  });