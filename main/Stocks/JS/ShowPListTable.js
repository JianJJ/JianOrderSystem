$(document).ready(function(){
//---------------------- 0. 載入需要的資料、設定變數 --------------------------------
    var ProJSON = window.localStorage.getItem("ProdaValue");
    var ProArray = JSON.parse(ProJSON);                // 載入產品資料
    var myJSON = window.localStorage.getItem('VendorValue');
    var VendorArray = JSON.parse(myJSON);              // 載入供應商資料
    var inquireJSON = window.localStorage.getItem("Pinquire");
    var inquireObj = JSON.parse(inquireJSON);          // 載入查詢資料
    console.log(inquireObj);

//---------------------- 1. 帶入表格抬頭 ------------------------------------------
    $('h3').text(`${inquireObj.VendorName}       產品庫存`);

//---------------------- 1. 創建該供應商產品表格＋帶入資訊 -------------------------------
    var sunTotal = 0;
    for (var i = 0; i < ProArray.length; i++) {
        if(inquireObj.VendorName == ProArray[i].VendorName){
            $('table').append(
            "<tr>" +
                `<td>${ProArray[i].ProductID}</td>`+
                `<td>${ProArray[i].ProductNameID}</td>`+
                `<td>${ProArray[i].ProductName}</td>`+
                `<td>${ProArray[i].ProductSP}</td>`+
                `<td>${ProArray[i].StockNum}</td>`+
            "</tr>");
        }
    }
})