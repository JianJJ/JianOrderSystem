$(document).ready(function () {
//---------------------- 0. 載入需要的資料、設定變數 -------------------------------
    var ProdaJSON = window.localStorage.getItem("ProdaValue");
    var ProdaArray = JSON.parse(ProdaJSON);           // 載入產品資料
    var VenJSON = window.localStorage.getItem("VendorValue");
    var VenArray = JSON.parse(VenJSON);               // 載入廠商資料
    var OrderJSON = window.localStorage.getItem("inOrders");
    var OrderArray = JSON.parse(OrderJSON);           // 載入訂單資料

//---------------------- 1. 創建表格, 帶入值---------------------------------------
    var str = "";
    for(var i=0;i<OrderArray.length;i++){
        if(OrderArray[i].State == 'Show'){            // 刪除的訂單會是NoShow不顯示
            str = `<tr>`+
                `<td><input type="button" value="" class="ShowOrder" `+
                    `id="${OrderArray[i].OrderID}"></td>`+
                `<td>${OrderArray[i].OrderID}</td>`+
                `<td>${OrderArray[i].VendorName}</td>`+
                `<td>${((Object.keys(OrderArray[i]).length)-5)/4}</td>`+
                `<td>${OrderArray[i].SumCount}</td>`+
                `</tr>`
        $('#PurTable').append(str);
        }
    }
//---------------------- 2. 點擊訂單查詢按鈕,紀錄是哪張訂單,跳轉畫面--------------------
    $('.ShowOrder').on('click', function(){
        var temp = this.id;
        window.localStorage.setItem('InOrderNumber', temp);
        location.href='./inOrderDetail.html';          // inOrderDetail.html
    })
})