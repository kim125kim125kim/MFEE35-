//axios發出sql請求 商品卡片

var my_end_date = document.getElementById("end_date")



axios.get(`/date`).then(
    (data) => {
        data.data.forEach((val, ind) => {

            my_end_date.innerHTML = (`
            <div class="card col-12   mx-auto d-flex flex-row  align-items-center"
            style="width: 100%; height: 70px; border-radius: 0px; background-color: #F3D7A8;">
            <p class="ms-4 mt-4 font_size_title">團購截止時間</p>
            <p class="ms-4 mt-4 font_size">${val.end_date_v2}</p>
        </div>
                     `)

           


        });



    })