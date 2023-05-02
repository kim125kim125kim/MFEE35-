//axios發出sql請求 商品卡片

var my_trade_date = document.getElementById("trade_date")



axios.get(`/date`).then(
    (data) => {
        data.data.forEach((val, ind) => {

            my_trade_date.innerHTML = (`
            <div class="card col-12   mx-auto d-flex flex-row  align-items-center"
            style="width: 100%; height: 70px; border-radius: 0px; background-color: #F3D7A8;">
            <p class="ms-4 mt-4 font_size_title">預計到貨日</p>
            <p class="ms-4 mt-4 font_size " style="color: red;">${val.trade_date_v2}</p>
            <p class="ms-5 mt-4 font_size_title">商品賞味期限</p>
            <p class="ms-4 mt-4 font_size " style="color: red;">${val.exp_date}</p>
        </div>
                     `)

           


        });



    })