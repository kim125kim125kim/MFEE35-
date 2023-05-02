

var form = document.getElementById("my_form");

form.addEventListener('submit', (event) => {
  event.preventDefault(); // 阻止表單的默認提交行為
  const selectValue = document.querySelector('#payment').value;
  const radioValue = document.querySelector('input[name="radio"]:checked').value;
  const inputValue = document.querySelector('#address').value;

  axios.post('/order_data', {
    selectValue: selectValue,
    inputValue: inputValue,
    radioValue: radioValue
  })
  .then((response) => {
    console.log(response.data); // 處理伺服器回應
  })
  .catch((error) => {
    console.error(error); // 處理錯誤
  });
});