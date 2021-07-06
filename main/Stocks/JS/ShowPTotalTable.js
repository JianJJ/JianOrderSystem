$(document).ready(function(){
//---------------------- 0. 載入需要的資料、設定變數 --------------------------------
    var ProJSON = window.localStorage.getItem("ProdaValue");
    var ProArray = JSON.parse(ProJSON);              // 載入產品資料
    var inquireJSON = window.localStorage.getItem("Pinquire");
    var inquireObj = JSON.parse(inquireJSON);        // 載入查詢資料

//---------------------- 1. 創建各個產品表格＋帶入資訊 -------------------------------
    var sunTotal = 0;
    for (var i = 0; i < ProArray.length; i++) {
        $('table').append(
            "<tr>" +
                `<td>${ProArray[i].ProductID}</td>`+
                `<td>${ProArray[i].ProductNameID}</td>`+
                `<td>${ProArray[i].ProductName}</td>`+
                `<td>${ProArray[i].ProductSP}</td>`+
                `<td>${ProArray[i].StockNum}</td>`+
            "</tr>");
    }
})