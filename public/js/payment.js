
window.onload = function () {
    //電子發票輸入
    var select2 = document.getElementById('bill_choice');
    select2.addEventListener('change', (event) => {
        var selectedValue2 = event.target.value;

        var cloud_bill_Div = document.getElementById('cloud_bill_no');
      

        if (selectedValue2 == 'cloud_bill') {
            cloud_bill_Div.classList.remove("d-none");
        }else if (selectedValue2 == 'paper_bill') {
            cloud_bill_Div.classList.add("d-none");
         

        } else if (selectedValue2 == 'donate_bill') {
            cloud_bill_Div.classList.add("d-none");
            
        }

    });
    //付款方式切換，底下的div變化功能
    var select = document.getElementById('payment');
    select.addEventListener('change', (event) => {
        var selectedValue = event.target.value;

        var cash_Div = document.getElementById('cash');
        var c_card_Div = document.getElementById('c_card');
        var ATM_Div = document.getElementById('ATM');

        if (selectedValue == 'cash') {
            cash_Div.classList.remove("d-none");
            c_card_Div.classList.add("d-none");
            ATM_Div.classList.add("d-none");





        } else if (selectedValue == 'ATM') {
            cash_Div.classList.add("d-none");
            c_card_Div.classList.add("d-none"); // 顯示信用卡、金融卡 div
            ATM_Div.classList.remove("d-none");

        } else if (selectedValue == 'credit_card') {
            cash_Div.classList.add("d-none");
            c_card_Div.classList.remove("d-none"); // 隱藏 div
            ATM_Div.classList.add("d-none");
        }
    });
    //信用卡的添加功能
    var click = document.querySelector("#increment");
    var incrementDiv = document.querySelector("#increment_c_card");
    click.addEventListener('click', (event) => {


        // 將信用卡表單的 div 樣式從 d-none 改為顯示，例如：
        document.querySelector('#increment_form').classList.remove('d-none');
        incrementDiv.classList.add("d-none");

    })
    let currentIndex = 1;
    //添加完成後顯示在畫面上
    var click2 = document.querySelector("#c_card_form_go");
    click2.addEventListener('click', (event) => {
        event.preventDefault();
        var c_no = document.getElementById("validationServer01").value;
        var newCard = document.createElement('div');
        //console.log(newCard)
        newCard.classList.add('card', 'mb-5', 'ms-4', 'test');
        newCard.style.width = "450px";
        newCard.style.height = "150px";
        newCard.style.flexDirection = "row";
        newCard.innerHTML = `
        <i class="bi bi-pip ms-4 mt-2 " style="font-size:50px"></i>
        <p class="ms-4 " style="margin-top: 30px;font-size: 18px;">中國信託</p>
        <p class="ms-4 " style="margin-top: 30px;font-size: 18px;">****\t${c_no.slice(-4)}</p>
        <button class="btn btn-warning align-items-center"
            style="width: 150px;height: 40px; margin-top: 90px;margin-right: 10px;" id="new_card">添加信用卡</button>
        <button class="btn btn-warning align-items-center"
            style="width: 150px;height: 40px; margin-top: 90px;margin-right: 10px;" id="delete_card">移除信用卡</button>
        `;
        document.querySelector('#increment_form').classList.add('d-none');
        document.getElementById('c_card').appendChild(newCard);
        
var deleteBtn=document.getElementById("delete_card");
deleteBtn.addEventListener("click",(event)=>{
   document.getElementsByClassName("test").classList.add("d-none");
})

        showFormAndAddClickListener();
    })

    //newCard為動態生成的html元素，必須額外監聽事件
    function showFormAndAddClickListener() {
        document.querySelector('#increment_form').classList.add('d-none');

        var click3 = document.querySelector("#new_card");
        click3.addEventListener('click', (event) => {
            showFormAndAddClickListener();
            var newCard2 = document.createElement('div');
            newCard2.classList.add('card', 'mb-5', 'ms-4', 'justify-content-center')
            newCard2.style.width = "550px";
            newCard2.style.height = "300px";
            newCard2.innerHTML = ` <form class="row g-3 ms-4 me-4    justify-content-center align-items-center">
            <div class="col-md-6">
                <label for="validationServer01" class="form-label" >信用卡號碼
                </label>
                <input type="text" class="form-control " id="validationServer01" required pattern="[0-9]{15,17}">
                <div class="invalid-feedback">
                    信用卡卡號介於15~17個數字
                  </div>
            </div>
            <div class="col-md-3">
                <label for="validationServer02" class="form-label">到期日</label>
                <input type="text" class="form-control " id="validationServer02" required pattern="^0[1-9]|1[0-2]\/[0-9][0-9]$">
                <div class="invalid-feedback">
                    格式為月份/年分末兩碼
                  </div>
            </div>
            <div class="col-md-3">
                <label for="validationServerUsername" class="form-label">安全碼</label>
                <div class="input-group has-validation">

                    <input type="text" class="form-control " id="validationServer03" required pattern="^\d{3}$">
                    <div class="invalid-feedback">
                        安全碼為3位數字
                      </div>
                  
                </div>
            </div>
            <div class="col-md-6">
                <label for="validationServer03" class="form-label">帳單寄送地址</label>
                <input type="text" class="form-control " id="validationServer04"
                    aria-describedby="validationServer03Feedback" required>
             
            </div>
          
            <div class="col-md-3">
                <label for="validationServer05" class="form-label">郵遞區號</label>
                <input type="text" class="form-control " id="validationServer05"
                    aria-describedby="validationServer05Feedback" required pattern="^\d{3,6}$">
                    <div class="invalid-feedback">
                        郵遞區號為3~6位數字
                      </div>
            </div>
            <div class="col-md-3">
                <label for="validationServer05" class="form-label">持卡人姓名</label>
                <input type="text" class="form-control " id="validationServer06"
                    aria-describedby="validationServer05Feedback" required>
              
            </div>
           
            <div class="col-12">
                <button class="btn btn-warning" type="button" id="c_card_form_go">確定送出</button>
            </div>
        </form>`
            // 在動態生成的"確定送出"按鈕上添加點擊事件監聽器
            var submitBtn = newCard2.querySelector("#c_card_form_go");
            submitBtn.addEventListener('click', (event) => {
                // 防止表單自動提交
                event.preventDefault();
                // 在這裡添加相應的代碼來實現跳轉到完成添加的狀態


            });
            document.querySelector("#new_card").classList.add("d-none");

            document.getElementById('c_card').appendChild(newCard2);
            showFormAndAddClickListener();
        });
    }

    //信用卡表單的驗證
    //驗證信用卡號
    var card_no = document.getElementById("validationServer01");
    console
    card_no.addEventListener('input', (event) => {
        if (/^\d{15,17}$/.test(card_no.value)) {
            card_no.classList.add('is-valid');
            card_no.classList.remove('is-invalid');
        } else {
            card_no.classList.add('is-invalid');
            card_no.classList.remove('is-valid');
        }

    })
    //   驗證到期日 
    var deadline = document.getElementById("validationServer02");
    console
    deadline.addEventListener('input', (event) => {
        if (/^(0[1-9]|1[0-2])\/([2-9]\d)$/
            .test(deadline.value)) {
            deadline.classList.add('is-valid');
            deadline.classList.remove('is-invalid');
        } else {
            deadline.classList.add('is-invalid');
            deadline.classList.remove('is-valid');
        }

    })
    //   驗證安全碼 
    var safe = document.getElementById("validationServer03");
    console
    safe.addEventListener('input', (event) => {
        if (/^\d{3}$/
            .test(safe.value)) {
            safe.classList.add('is-valid');
            safe.classList.remove('is-invalid');
        } else {
            safe.classList.add('is-invalid');
            safe.classList.remove('is-valid');
        }

    })
    //   驗證郵遞區號 
    var ad = document.getElementById("validationServer05");
    console
    ad.addEventListener('input', (event) => {
        if (/^\d{3,6}$/
            .test(ad.value)) {
            ad.classList.add('is-valid');
            ad.classList.remove('is-invalid');
        } else {
            ad.classList.add('is-invalid');
            ad.classList.remove('is-valid');
        }

    })
   
 
}

