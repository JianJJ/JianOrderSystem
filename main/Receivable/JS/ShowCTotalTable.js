$(document).ready(function(){
//---------------------- 0. 載入需要的資料、設定變數 -------------------------------
    var CusJSON = window.localStorage.getItem("UserValue");
    var CusArray = JSON.parse(CusJSON);              // 載入客戶資料
    var OrderJSON = window.localStorage.getItem("outOrders");
    var outOrderArray = JSON.parse(OrderJSON);       // 載入訂單資料
    var inquireJSON = window.localStorage.getItem("Cinquire");
    var inquireObj = JSON.parse(inquireJSON);        // 載入查詢資料

//---------------------- 1. 帶入表格抬頭 ------------------------------------------
    $('h3').text(`${inquireObj.startDate} ~ ${inquireObj.endDate}   客戶應收`);

//---------------------- 2. 創建各個廠商表格 ---------------------------------------
    var sunTotal = 0;
    for (var i = 0; i < CusArray.length; i++) {
        $('table').append(
            "<tr>" +
                `<td>${CusArray[i].CustomerID}</td>`+
                `<td>${CusArray[i].CustomerName}</td>`+
                `<td id="total${i}"></td>`+
            "</tr>");
        var Total = 0;
        for(var s=0;s<outOrderArray.length;s++){
            if(parseInt(outOrderArray[s].OutDate+0) >= parseInt(inquireObj.startDate+0)
                    && CusArray[i].CustomerName   == outOrderArray[s].CustomerName
                    && outOrderArray[s].State     == 'Show'){
                if(inquireObj.endDate){
                    if(parseInt(outOrderArray[s].OutDate+0) <= parseInt(inquireObj.endDate+0)){
                        Total = Total + parseFloat(outOrderArray[s].SumCount);
                    }
                }else{
                    Total = Total + parseFloat(outOrderArray[s].SumCount);
                }
            }
        }
        sunTotal += Total;
        $(`#total${i}`).text(`${Total}`);
    }
    $('#sunTotal').prop('value',`${sunTotal}`);
})