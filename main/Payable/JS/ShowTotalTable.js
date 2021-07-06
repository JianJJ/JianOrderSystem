$(document).ready(function(){
//---------------------- 0. 載入需要的資料、設定變數 -------------------------------
    var VenJSON = window.localStorage.getItem("VendorValue");
    var VenArray = JSON.parse(VenJSON);              // 載入廠商資料
    var OrderJSON = window.localStorage.getItem("inOrders");
    var OrderArray = JSON.parse(OrderJSON);          // 載入訂單資料
    var inquireJSON = window.localStorage.getItem("Vinquire");
    var inquireObj = JSON.parse(inquireJSON);        // 載入查詢資料
//---------------------- 1. 帶入表格抬頭 ------------------------------------------
    $('h3').text(`${inquireObj.startDate} ~ ${inquireObj.endDate}   廠商應付`);

//---------------------- 2. 創建各個廠商表格 ---------------------------------------
    var sunTotal = 0;
    for (var i = 0; i < VenArray.length; i++) {
        $('table').append(
            "<tr>" +
                `<td>${VenArray[i].VendorID}</td>`+
                `<td>${VenArray[i].VendorName}</td>`+
                `<td id="total${i}"></td>`+
            "</tr>");
        var Total = 0;
        for(var s=0;s<OrderArray.length;s++){
            if(parseInt(OrderArray[s].Indate+0) >= parseInt(inquireObj.startDate+0)
                    && VenArray[i].VendorName   == OrderArray[s].VendorName
                    && OrderArray[s].State      == 'Show'){
                if(inquireObj.endDate){
                    if(parseInt(OrderArray[s].Indate+0) <= parseInt(inquireObj.endDate+0)){
                        Total = Total + parseFloat(OrderArray[s].SumCount);
                    }
                }else{
                    Total = Total + parseFloat(OrderArray[s].SumCount);
                }
            }
        }
        sunTotal += Total;
        $(`#total${i}`).text(`${Total}`);
    }
    $('#sunTotal').prop('value',`${sunTotal}`);
})