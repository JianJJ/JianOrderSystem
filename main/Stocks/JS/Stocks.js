$(document).ready(function(){
//---------------------- 0. 載入資料 -----------------------------------------
    var ProJSON = window.localStorage.getItem("ProdaValue");
    var ProArray = JSON.parse(ProJSON);                // 載入產品資料
    var myJSON = window.localStorage.getItem('VendorValue');
    var VendorArray = JSON.parse(myJSON);              // 載入供應商資料
    console.log(ProArray);
//---------------------- 1. 選擇不同表格,顯示供應商選項或隱藏 ------------------------
    $('input[name="show"]').on('change',function(){
        $('#Ven').toggleClass('VendorName');
    })
//---------------------- 1-1. 將供應商名稱加入select -------------------------------
    for (var i = 0; i < VendorArray.length; i++) {
            $('#VendorName').append(
                `<option value="${VendorArray[i].VendorName}">` +
                `${VendorArray[i].VendorName}</option>`);
    }
//---------------------- 2. 點擊"查詢"紀錄查詢的值 ----------------------------------
    $('#inquire').on('click',function(){
        var inquireObj = {
            show : $('input[name="show"]:checked').prop('value'),
            startDate : $('#startDate').prop('value'),
            endDate : $('#endDate').prop('value'),
            VendorName : $('#VendorName').prop('value')
        }
        window.localStorage.setItem('Pinquire',JSON.stringify(inquireObj));
        location.href=`./Show${inquireObj.show}.html`;
    })
})