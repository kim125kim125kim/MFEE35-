//axios發出sql請求 商品卡片

var my_store_card = document.getElementById("my_store_card")



axios.get(`/card`).then(
    (data) => {
        data.data.forEach((val, ind) => {

            my_store_card.innerHTML = (`
             <div class="card col-12  justify-content-center mx-auto d-flex flex-row"
                 style="width: 100%; height: 250px; border-radius: 34px;">
                 <div class="d-flex flex-column justify-content-center align-items-center col-2 ">
                     <img src=${val.pic_url1} class="store_photo" alt="微熱山丘鳳梨酥">
                     <div class=" mb-5 d-flex flex-column">
                         <p class="mt-auto fs-5">${val.country}</p>
                         <p class="mt-auto fs-5">${val.shop_name}${val.product}</p>
                     </div>
                 </div>
                 <div class="container row col-9">
                     <table class="table">
                         <thead>
                             <tr class="border-black font_size_title">
                                 <th scope="col" class="text-center">開團者</th>
                                 <th scope="col" class="text-center">單價</th>
                                 <th scope="col" class="text-center">件數</th>
                                 <th scope="col" class="text-center">運費</th>
                                 <th scope="col" class="text-center">共計</th>
                             </tr>
                         </thead>
                         <tbody>
         
                             <tr class=" border-black font_size">
                                 <th scope="col" class="text-center justify-content-center p-1">
                                     <img class="mt-4" src="./media/member/大頭貼.png" alt="大頭貼">
                                     <p class="mt-5">${val.user_name}</p>
                                 </th>
                                 <th scope="col" class="text-center align-middle p-1">${val.spec1_price}NT.</th>
                                 <th scope="col" class="text-center align-middle p-1"><input style="width: 80px;" type="number"
                                         id="count" value=1></th>
                                 <th scope="col" class="text-center align-middle p-1">0NT.</th>
                                 <th scope="col" class="text-center align-middle p-1">${parseInt(val.spec1_price)}NT.</th>
                             </tr>
                         </tbody>
                     </table>
                 </div>
             </div>
                     `)

            let inputValue;
            my_store_card.addEventListener('input', function (event) {
                if (event.target && event.target.nodeName === 'INPUT') {
                    inputValue = parseInt(event.target.value);
                    var total = val.spec1_price * inputValue;
                    var totalEl = my_store_card.querySelector('.text-center.align-middle.p-1:last-of-type');
                    totalEl.textContent = `${total}NT.`;
                }
            });



        });



    })