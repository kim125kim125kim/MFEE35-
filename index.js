var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'))
var axios = require('axios');


//伺服器連線
var connhelper = mysql.createConnection({
    host: 'localhost',
    port: '8889',
    user: 'root',
    password: 'root',
    database: 'buybuy_database'

});


// 引用cors模組設定可以存取的名單 把server3000給5500
var cors = require('cors');
var setting = {
    origin: ['http://127.0.0.1:5500']
};
app.use(cors(setting));


// session設定
var session = require('express-session');
app.use(session({
    secret: 'lincodadlovewinnie',
    resave: true,
    saveUninitialized: true,

    cookie: {
        path: '/',
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 1000 // 記憶時間
    }
}));



//資料庫連線驗證
connhelper.connect((err) => {

    if (!err) {

        console.log('資料庫連線成功')

    } else {

        console.log('資料庫連線失敗' + err.sqlMessage ? err.sqlMessage : err);
    }

})

//聽port3000
app.listen(3000, () => {

    console.log('伺服器執行中');

});




// //商品資訊V1
// var data = {};
// var sql_query1 = "SELECT * FROM `product_data` WHERE product_id ='p0001';"
// connhelper .query(sql_query1, function (err, rows, fields) {
//     if (err) throw err;
//     data = rows[0]
//     console.log(data);
// })
// //使用者資訊V1
// var data2 = {};
// var sql_query2 = "SELECT * FROM `user_data` WHERE user_id='u1';"
// connhelper .query(sql_query2, function (err, rows, fields) {
//     if (err) throw err;
//     data2 = rows[0]
//     // console.log(data2);
// })


app.get('/payment', (req, res) => {

    res.sendFile(__dirname + "/payment_V2.html");

});

//商品卡片所需資料Ver-axios
app.get('/card', (req, res) => {

    var sql = `SELECT p.product_id, p.user_id, p.shop_name, p.product, p.country, p.shop_state, p.pic_url1, p.pic_url2, p.pic_url3, p.pic_url4, p.product_url, p.exp_date, p.product_type, p.product_intro, p.trade_state, p.start_date, p.end_date, p.trade_date, p.notefication, p.discount, p.spec1, p.spec1_price, u.email, u.user_name, u.nick_name,u.selfie FROM product_data p JOIN user_data u ON p.user_id = u.user_id WHERE p.product_id = 9;
    `;
    //應該要抓session的product_id
    // var sql = `SELECT p.product_id, p.user_id, p.shop_name, p.product, p.country, p.shop_state, p.pic_url1, p.pic_url2, p.pic_url3, p.pic_url4, p.product_url, p.exp_date, p.product_type, p.product_intro, p.trade_state, p.start_date, p.end_date, p.trade_date, p.notefication, p.discount, p.spec1, p.spec1_price, u.email, u.user_name, u.nick_name,u.selfie FROM product_data p JOIN user_data u ON p.user_id = u.user_id WHERE p.user_id = ?;
    // `;
    connhelper.query(sql, (err, results, fields) => {

        // console.log(err);
        // console.log(results)
        res.json(results);

    })



})
//開團結帳日期相關
app.get('/date', (req, res) => {

    var sql2 = `SELECT user_id, DATE_FORMAT(end_date, '%Y/%m/%d') AS end_date_v2,DATE_FORMAT(trade_date, '%Y/%m/%d') AS trade_date_v2,exp_date from product_data where product_id=9;`
    connhelper.query(sql2, (err, results, fields) => {

        // console.log(err);
        // console.log(results);
        res.json(results);

    });
})

//商品卡片insert進來
// app.post('/order_data', (req, res) => {
//     var body = req.body;
//     console.log(body);
//     var sql = "INSERT INTO `order_data`(`product_id`, `user_id`, `user_name`, `shipping`, `address`, `product_spec`, `price`, `quantity`, `pay_way`, `credit_card`) VALUES ('1','2','0','0','0','蕃薯餅禮盒(10入)','300',?,?,'0');"
//     // 應該要insert session抓到的user_id
//     // var sql ="INSERT INTO `order_data`(`product_id`, `user_id`, `shipping`, `address`, `product_spec`, `pay_way`, `credit_card`) VALUES (1,?,?,?,'單顆',?,?);"
//     var data = [body.shipping, body.quantity];
//     connhelper.query(sql, data, function (results, fields) {
//         console.log(results);
//     })


// });

//開團結帳表單insert
app.post('/order_data2', (req, res) => {
    var body = req.body;
    var user_id = req.session.user.id;
    console.log(user_id);
    console.log(body);
    var sql = "INSERT INTO `order_data`(`product_id`, `user_id`, `user_name`, `shipping`, `address`, `product_spec`, `price`,`quantity`,`pay_way`, `credit_card`) VALUES ('1',?,?,?,?,'蕃薯餅禮盒(10入)','300','4',?,?);"
    // 應該要insert session抓到的user_id
    // var sql ="INSERT INTO `order_data`(`product_id`, `user_id`,`user_name`, `shipping`, `address`, `product_spec`, `pay_way`, `credit_card`) VALUES ('1','2',?,?,?,'蕃薯餅禮盒(10入)','300',?,?);"
    var data = [user_id, body.user_name, body.shipping, body.address, body.pay_way, body.credit_card]
    connhelper.query(sql, data, function (results, fields) {
        console.log(results);
    })


});

// //開團結帳表單insert進來
// app.post('/order_data', (req, res) => {
//     var body = req.body;
//     console.log(body);
//     var sql = "INSERT INTO `order_data`(`product_id`, `user_id`, `user_name`, `shipping`, `address`, `product_spec`, `price`, `quantity`, `pay_way`, `credit_card`) VALUES ('1','2',?,?,?,'蕃薯餅禮盒(10入)','300',4,?,?);"
//     // 應該要insert session抓到的user_id
//     // var sql ="INSERT INTO `order_data`(`product_id`, `user_id`, `shipping`, `address`, `product_spec`, `pay_way`, `credit_card`) VALUES (1,?,?,?,'單顆',?,?);"
//     var data = [body.user_name, body.shipping, body.address, body.pay_way, body.credit_card];
//     connhelper.query(sql, data, function (results, fields) {
//         console.log(results);
//     })


// });


app.get('/allProducts', (req, res) => {
    res.sendFile(__dirname + '/allProducts_V3.html');
})

//搜尋功能
app.get('/allProducts/search/:search', (req, res) => {
    // 從HTTP請求中獲取搜尋字串
    const search = req.query.search;
    const sql = `SELECT 
    product_data.product_id, 
    product_data.user_id, 
    product_data.shop_name, 
    product_data.product, 
    product_data.country, 
    product_data.product_type, 
    product_data.pic_url1, 
    product_data.spec1_price, 
    product_data.spec3_price, 
    product_data.end_date, 
    DATE_FORMAT(product_data.end_date, '%Y-%m-%d') AS end_date2, 
    DATE_FORMAT(user_data.birthday, '%Y-%m-%d') AS birthday2, 
    user_data.email, 
    user_data.user_name, 
    user_data.nick_name ,
    user_data.selfie
  FROM 
    product_data 
   JOIN user_data 
      ON product_data.user_id = user_data.user_id
       WHERE shop_name LIKE '%${search}%' OR product LIKE '%${search}%'  OR nick_name LIKE '%${search}%'`;
    connhelper.query(sql, (err, results, fields) => {
        if (err) throw err;
        res.send(results);
    });
})
//搜尋功能_all
app.get('/allProducts/:search_content', (req, res) => {
    // 從HTTP請求中獲取搜尋字串
    const keyword = req.params.search_content;
    const sql = `SELECT 
    product_data.product_id, 
    product_data.user_id, 
    product_data.shop_name, 
    product_data.product, 
    product_data.country, 
    product_data.product_type, 
    product_data.pic_url1, 
    product_data.spec1_price, 
    product_data.spec3_price, 
    product_data.end_date, 
    DATE_FORMAT(product_data.end_date, '%Y-%m-%d') AS end_date2, 
    DATE_FORMAT(user_data.birthday, '%Y-%m-%d') AS birthday2, 
    user_data.email, 
    user_data.user_name, 
    user_data.nick_name ,
    user_data.selfie
  FROM 
    product_data 
   JOIN user_data 
      ON product_data.user_id = user_data.user_id
       WHERE shop_name LIKE '%${keyword}%' OR product LIKE '%${keyword}%'  OR nick_name LIKE '%${keyword}%'`;
    connhelper.query(sql, (err, results, fields) => {
        if (err) throw err;
        res.json(results);
        // res.sendFile(__dirname + '/allProducts_Vtest.html');
        console.log(keyword)
       
       
     
    });
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////會員系統
// 註冊頁面請求
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
})

// 登入頁面請求
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
  // if (req.session.user) {
  //     res.redirect('/member');
  // } else {
  //     res.sendFile(__dirname + '/login.html');
  // }
})

// 會員中心頁面請求
app.get('/member', (req, res) => {
  // res.sendFile(__dirname + '/member.html');
  if (req.session.user) {
      res.sendFile(__dirname + '/member.html');
      console.log("member請求:" + req.session.user.id)
  } else {
      res.redirect('/login');
  }
})

// 忘記密碼頁面請求
app.get('/resetPWD', (req, res) => {
  res.sendFile(__dirname + '/resetPWD.html');
})

// 0511 加密 忘記密碼修改------------------------------------
// 加密模組
const crypto = require('crypto');

// 註冊頁面:接收註冊頁面帳號密碼insert到資料庫
app.post('/register', (req, res) => {
  // 未加密-----------------------------------------------------------------
  var sql = "INSERT INTO user_data (email,password)VALUES(?,?);";
  connhelper.query(sql, [req.body.email, req.body.password], (err, results, fields) => {
      console.log(results);
      console.log(err);
      res.json({ redirectUrl: '/login' });
  })
  console.log("email" + req.body.email)
  console.log("password" + req.body.password)

  // // 加密版--------------------------------------------------------------------
  // // 加密密碼
  // var email = req.body.email;
  // var password = req.body.password;
  // const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
  // var sql = "INSERT INTO user_data (email, password) VALUES (?, ?);";
  // connhelper.query(sql, [email, hashedPassword], (err, results, fields) => {
  //     console.log(results);
  //     console.log(err);
  //     res.json({ redirectUrl: '/login' });
  // });

})


// 登入頁面:從資料庫select出來給前端比對
// 驗證加密密碼
function verifyPassword(password, hashedPassword) {
  const inputHashedPassword = crypto.createHash('sha256').update(password).digest('hex');
  return inputHashedPassword === hashedPassword;
}
app.post('/login', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  console.log(email);
  console.log(password);
  // 未加密-----------------------------------------------------------
  var sql = "SELECT * FROM user_data WHERE email=? AND password=?";

  connhelper.query(sql, [email, password], (err, results, fields) => {
      console.log(results);
      if (results.length > 0) {
          // 登入成功
          const user = results[0];
          req.session.user = {
              id: user.user_id,
              email: user.email,
              user_name: user.user_name
          };

          console.log('登入成功');
          console.log(req.session.user);

          res.json({ redirectUrl: '/member' });
      } else {
          // 帳號或密碼不符
          res.status(401).json({ error: "帳號或密碼不正確" });
      }
  });

  // // 加密版-------------------------------------------
  // var sql = "SELECT * FROM user_data WHERE email=?;";
  // connhelper.query(sql, email, (err, results, fields) => {

  //     console.log(results);
  //     if (results) {
  //         const hashedPassword = results[0].password;

  //         // 驗證密碼
  //         const isValidPassword = verifyPassword(password, hashedPassword);

  //         if (isValidPassword) {
  //             const user = results[0];
  //             req.session.user = {
  //                 id: user.user_id,
  //                 email: user.email,
  //                 user_name: user.user_name
  //             }
  //             console.log('登入成功')
  //             console.log(req.session.user)
  //             res.json({ redirectUrl: '/member' });
  //         }

  //     }
  // });
})

// 2023/05/05 google登入-----------------
app.post('/google_login', (req, res) => {

  let google_email = req.body.email;
  let google_user_name = req.body.name;
  let google_pic = req.body.picture;
  // console.log(email)
  // console.log(user_name)
  let sql = "SELECT * FROM user_data WHERE email=? and user_name=?;";
  connhelper.query(sql, [google_email, google_user_name], (err, results, fields) => {
      if (!err) {
          if (results[0]) {   //登入成功後設定session
              req.session.user = {
                  id: results[0].user_id,
                  email: results[0].email,
                  user_name: results[0].user_name,
                  pic: google_pic
              };

              res.json({ redirectUrl: '/member' });
          } else {
              let sql = 'INSERT INTO user_data (email,user_name,password)VALUES(?,?,"gojsgjsi#lvs4@%%lkhrlgi");' //若沒有註冊過則自動新增會員資料進資料庫(沒有id)
              connhelper.query(sql, [google_email, google_user_name], (err, results, field) => {
                  if (!err) {
                      let select_id = 'SELECT user_id FROM user_data WHERE email =?;';                           //把上一步驟新增的資料重新取得其id
                      connhelper.query(select_id, [google_email], (err1, results1, field1) => {
                          req.session.user = {
                              id: results1[0].user_id,
                              email: google_email,
                              user_name: google_user_name,
                              pic: google_pic
                          };
                      });
                  }
              })
          }
      } else {
          res.send(err.sqlMessage)
      }
  })
})

// 2023/05/05 google登入-----------------


// 忘記密碼頁面:前端送帳號過來比對資料庫的帳號，發送預設密碼至使用者信箱
var nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
      user: "dailybuy0531@gmail.com",
      pass: "vumyhusgwckfqlqu",
  },
});

// 生成隨機亂碼
function RandomPWD(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';

  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
  }

  return code;
}
app.post('/resetPWD', (req, res) => {
  var email = req.body.email;
  console.log(email);
  var sql = "SELECT * FROM user_data WHERE email=?;";
  var sqlReset = "UPDATE user_data SET password=? WHERE email=?;"
  connhelper.query(sql, email, (err, results, fields) => {
      if (results) {
          // 生成隨機亂碼
          const newPassword = RandomPWD(8);

          // 加密新密碼 下列變數要記得修改
          // const hashedPassword = crypto.createHash('sha256').update(newPassword).digest('hex');
          connhelper.query(sqlReset, [newPassword, email], (err, setDefaultPWD) => {
              var options = {
                  //寄件者
                  from: "dailybuy0531@gmail.com",
                  //收件者
                  to: email,
                  //主旨
                  subject: "DailyBuy:您的帳戶密碼已經重置", // Subject line
                  //純文字
                  text: `親愛的 ${results[0].user_name}，

請使用新的隨機密碼 "${newPassword}" 登入您的帳戶。
為了保障您的帳戶安全，我們強烈建議您登入後立即變更密碼。

如果您在變更密碼或登入時遇到任何問題，
請聯繫我們的客戶支援團隊，我們將竭誠為您服務。

祝您購物愉快！

此郵件為系統自動發送，請勿回復。`
                  , // plaintext body
              };
              //發送信件方法
              transporter.sendMail(options, function (error, info) {
                  if (error) {
                      console.log(error);
                  } else {
                      console.log("訊息發送: " + info.response);
                  }
              });
              res.json({ redirectUrl: '/login' });
          })
      } else {
          alert("此帳號不存在");
      }
  })

})

// 登出
app.post('/logout', (req, res) => {
  // console.log(req.session)
  req.session.destroy();
  res.json({ redirectUrl: '/login' });

})

// 會員中心:基本資料
app.post('/member/info', (req, res) => {
  // console.log("info:"+req.session.user.id)
  var sql = "SELECT user_id , email, user_name , nick_name , DATE_FORMAT(birthday, '%Y-%m-%d') AS birthday , phone , address , user_intro , selfie FROM `user_data` WHERE user_id=?;"
  connhelper.query(sql, req.session.user.id, (err, results, fields) => {
      var server_to_client = [results, { pic: req.session.user.pic }]
      console.log(server_to_client)
      res.json(server_to_client);
  })
})

// 會員中心:更新基本資料
// 檔案上傳路徑和檔名
// 使用multer套件
const multer = require('multer');
const path = require('path');
var headStorage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/media/member')
  },
  filename: function (req, file, cb) {
      cb(null, `selfie${req.session.user.id}${path.extname(file.originalname)}`)
  }
})
var upload = multer({ storage: headStorage })
app.post('/upload/update_info',
  upload.fields([
      { name: "user_name" },
      { name: "nick_name" },
      { name: "password" },
      { name: "birthday" },
      { name: "phone" },
      { name: "address" },
      { name: "user_intro" },
      { name: "selfie" },
  ])
  , (req, res) => {
      var sql = "UPDATE user_data SET user_name = ?, nick_name = ?, password = ?, birthday = ?, phone = ?, address = ?, user_intro = ?,selfie=? WHERE user_id = ?;";
      var selfie = `media/member/selfie${req.session.user.id}.jpg`; //副檔名寫死的
      connhelper.query(sql, [req.body.user_name, req.body.nick_name, req.body.password, req.body.birthday, req.body.phone, req.body.address, req.body.user_intro, selfie, req.session.user.id], (err, results, fields) => {
          if (err) {
              console.error(err);

          } else {
              console.log("done")
          }


      })
  }
)

// 會員中心:跟團者介面
app.post('/member/follower', (req, res) => {
  // console.log("follower:"+req.session.user.id)
  var sql = "SELECT `order_data`.`user_id`,`order_data`.`product_id`,shop_name,product,pic_url1,DATE_FORMAT(end_date, '%Y-%m-%d') AS end_date,shipping_status FROM `order_data` JOIN `product_data` ON `order_data`.`product_id` = `product_data`.`product_id` WHERE `order_data`.`user_id` = ?;"
  connhelper.query(sql, req.session.user.id, (err, results, fields) => {
      console.log(results);
      res.json(results);
  })
})

// 會員中心:跟團者訂單對話框
app.post('/member/follower/modal', (req, res) => {
  // console.log("follower:"+req.session.user.id);
  console.log("follower:" + req.body.product_id);
  var sql = "SELECT `order_data`.`product_id`,pic_url1,country,shop_name,product,DATE_FORMAT(trade_date, '%Y-%m-%d') AS trade_date,DATE_FORMAT(end_date, '%Y-%m-%d') AS end_date,exp_date,product_spec,price,quantity,`product_data`.`user_id`,`user_data`.`nick_name`,`user_data`.`selfie`,shipping,pay_way,`order_data`.`user_name` AS order_user , shipping_status FROM order_data JOIN product_data ON `order_data`.`product_id` = `product_data`.`product_id` JOIN user_data ON `product_data`.`user_id` = `user_data`.`user_id` WHERE `order_data`.`user_id` = ? AND `order_data`.`product_id` = ?;"
  connhelper.query(sql, [req.session.user.id, req.body.product_id], (err, results, fields) => {
      console.log(results);
      res.json(results);
  })
})

// 會員中心:開團者介面
app.post('/member/leader', (req, res) => {
  var sql = "SELECT product_id,shop_name,product,pic_url1,DATE_FORMAT(end_date, '%Y-%m-%d') AS end_date FROM `product_data` WHERE user_id = ?;"
  connhelper.query(sql, req.session.user.id, (err, results, fields) => {
      // console.log(results);
      res.json(results);
  })
})


// 會員中心:開團者訂單對話框
app.post("/member/leader/modal", (req, res) => {
  console.log("leader:" + req.session.user.id);
  console.log("leader:" + req.body.product_id);
  var sql = "SELECT `order_data`.`user_id`,`order_data`.`user_name`,`order_data`.`product_id`,product_spec,price,address,quantity,pay_way,shipping, shipping_status,DATE_FORMAT(trade_date, '%Y-%m-%d') AS trade_date FROM order_data JOIN `product_data` ON `product_data`.`product_id` = `order_data`.`product_id` WHERE `product_data`.`user_id` = ? AND `order_data`.`product_id` = ?;"
  connhelper.query(sql, [req.session.user.id, req.body.product_id], (err, results, fields) => {
      console.log(results);
      res.json(results);
  })
})


// 會員中心；開團者訂單 出貨狀態更新
app.post("/member/leader/update", (req, res) => {
  var { orderIds } = req.body;
  console.log(orderIds);
  var sql = "UPDATE `order_data` SET shipping_status = 1 WHERE product_id = ? AND user_id IN (?);";
  console.log(req.body.product_id)
  connhelper.query(sql, [req.body.product_id, orderIds], (err, results, fields) => {
      console.log(results);
      res.json(results);
  })
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////商品資訊頁
app.get("/product", function (req, res) {
    let mysql_pd = "select * from `product_data`;";
    let mysql_collete = "select * from `member_collectList`;";
    connhelper.query(mysql_pd, (err, results1, fields) => {
      if (err) {
        res.send("select發生錯誤", err.sqlMessage);
      } else {
        connhelper.query(mysql_collete, (err, results2, fields) => {
          if (err) {
            console.log(err);
          } else {
            //  console.log([results1, results2]);
            res.sendFile(__dirname + "/daily_buy_product.html");
          }
        });
      }
    });
  });
  // 取得商品資料+許願清單的資料
  app.get("/product/:product_id", function (req, res) {
    
    uid = req.session.user.id;
    pid = req.params.product_id;
    // console.log(req.params.product_id);
    let mysql_pd =
      "SELECT `product_id`, `user_id`, `shop_name`, `product`, `country`, `shop_state`, `pic_url1`, `pic_url2`, `pic_url3`, `pic_url4`, `product_url`, `exp_date`, `product_type`, `spec1`, `spec1_price`, `spec2`, `spec2_price`, `spec3`, `spec3_price`, `product_intro`, `trade_state`, `start_date`, DATE_FORMAT(`end_date`,'%Y/%m/%d')end_date , `trade_date`, `notefication`, `discount` FROM `product_data` WHERE product_id=?;";
    let mysql_collete_list =
      "SELECT * FROM `member_collectList` WHERE product_id=? AND user_id=?;";
    connhelper.query(mysql_pd, [pid], (err, results1, fields) => {
      if (err) {
        res.send("select發生錯誤", err.sqlMessage);
      } else {
        const results = Object.keys(results1).map((key) => results1[key]);
        let productData = results;
        if(!uid){
          res.json(productData)
        }else {
          connhelper.query(mysql_collete_list, [pid,req.session.user.id], (err, results2) => {
            if (err) {
              res.json(productData);
            } else {
              let collectList = results2;
              let result = {productData, collectList };
              res.json(result);
              
            }
          });
        }
        // console.log(results);
        // console.log(Array.isArray(results));
        // 第二個query語法
        
      }
    });
  });
  

  app.post("/product/send-email", (req, res) => {
    uid = req.session.user.id;
    pid = req.body.pid;
    pname = req.body.pname;
    message = req.body.message;
    let send_email =
      "SELECT u1.email AS email1, u2.email AS email2, p.shop_name, p.product, p.user_id FROM product_data p JOIN user_data u1 ON p.user_id = u1.user_id JOIN user_data u2 ON u2.user_id = ? WHERE p.product_id = ?;";
    connhelper.query(
      send_email,
      [req.body.uid, req.body.pid],
      (err, results, fields) => {
        if (err) {
          res.send("select發生錯誤" + err.sqlMessage);
        } else {
          console.log(results);
          var options = {
            //寄件者
            from: "dailybuy0531@gmail.com",
            //收件者
            to: results[0].email1,
            // to: "minho5200421@gmail.com",
            //主旨
            subject: `來自DailyBuy帶你買，所發送的商品詢問信件`,
            //嵌入 html 的內文
            html: `<h2>商品：${
              results[0].shop_name + results[0].product
            }，問題信件</h2><br>
          <h3>請團主回信至會員:${uid} <br> email為${results[0].email2}</h3><br>,
          <h4>問題內容如下：${message}</h4>`,
          };
          transporter.sendMail(options, (error, info) => {
            if (error) {
              console.log(error);
              res.send("郵件發送失敗");
            } else {
              console.log("郵件已成功發送：" + info.response);
              res.send("郵件已成功發送");
            }
          });
        }
      }
    );
  });
  
  // 將產品新增到收藏清單內
  app.post("/add-to-favorites", function (req, res) {
    let mysql_add_favor =
      "INSERT INTO `member_collectList`(`user_id`, `product_id`) VALUES (?,?);";
    connhelper.query(
      mysql_add_favor,
      [req.body.uid, req.body.pid],
      (err, results, fields) => {
        if (err) {
          // console.log(err);
          console.log(req.body.pid);
          res.send("select發生錯誤" + err.sqlMessage);
        } else {
          console.log(results);
           res.send(results);
        }
      }
    );
  });
  // 將產品移除收藏清單
  app.delete("/remove-to-favorites", function (req, res) {
    let mysql_remove_favor =
      "DELETE FROM `member_collectList` WHERE product_id =?;";
    connhelper.query(mysql_remove_favor, [req.body.pid]),
      (err, results, fields) => {
        if (err) {
          res.send("select發生錯誤" + err.sqlMessage);
        } else {
          console.log(results);
          console.log(fields);
        }
      };
  });
  
  //跟團之後的同意說明表單
  app.get("/agreement", function (req, res) {
    let mysql_agreement =
      "SELECT `product_id` FROM `product_data` WHERE product_id =?;";
    connhelper.query(mysql_agreement, [req.body.pid], (err, results, fields) => {
      if (err) {
        res.send("select發生錯誤", err.sqlMessage);
      } else {
        res.sendFile(__dirname + "/statement.html");
      }
    });
  });
  // 將產品資料新增到訂單資料庫
  app.post("/add_order", function (req, res) {
    let sql_add_order =
      "INSERT INTO `order_data` (`product_id`, `product_spec`, `price`, `user_id`, `user_name`, `address`) VALUES (?, ?, ?, ?, (SELECT `user_name` FROM `user_data` WHERE `user_id` = ?), (SELECT `address` FROM `user_data` WHERE `user_id` = ?));";
    connhelper.query(
      sql_add_order,
      [
        req.body.pid,
        req.body.product_name,
        parseInt(req.body.product_price),
        req.body.uid,
        req.body.uid,
        req.body.uid,
      ],
      (err, results) => {
        if (err) {
          console.log("產生錯誤" + err);
        } else {
          console.log(results);
        }
      }
    );
  });
  app.get("/create_new", (req, res) => {
    let sql_form = "SELECT * FROM `product_data` WHERE product_id=?;";
    console.log(req.body.pid);
    // connhelper.query(sql_form,[req.body.pid],(err,results)=>{
    //   console.log(results);
    res.sendFile(__dirname + "/create_new.html");
    // })
  });
  app.get("/creat_new_form", (req, res) => {
    let sql_find = "SELECT * FROM `product_data` WHERE product_id=?;";
    connhelper.query(sql_find, [req.query.pid], (err, results1) => {
      if (err) {
        console.log(err);
      } else {
        // res.json(results1);
        const results = Object.keys(results1).map((key) => results1[key]);
        let product_data = results[0];
        res.json(product_data);
      }
    });
  });
  
  app.post("/new_order", (req, res) => {
    let add_productorder = "insert into ";
  });
  