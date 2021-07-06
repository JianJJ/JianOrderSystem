$(document).ready(function () {
//---------------------- 0. 載入需要的資料、設定變數 -------------------------------
    var OrderJSON = window.localStorage.getItem("outOrders");
    var outOrderArray = JSON.parse(OrderJSON);         // 載入訂單資料

    var myJSON = window.localStorage.getItem('UserValue');      // 載入L.S.客戶資料
    var CustomerArray = JSON.parse(myJSON);

//---------------------- 1. 創建表格, 帶入值---------------------------------------
    var str = "";
    for(var i=0;i<outOrderArray.length;i++){
        if(outOrderArray[i].State == 'Show'){          // 刪除的訂單會是NoShow不顯示
            str = `<tr>`+
                `<td><input type="button" value="" class="ShowOrder" `+
                    `id="${outOrderArray[i].OrderID}"></td>`+
                `<td>${outOrderArray[i].OrderID}</td>`+
                `<td>${outOrderArray[i].CustomerName}</td>`+
                `<td>${((Object.keys(outOrderArray[i]).length)-5)/4}</td>`+
                `<td>${outOrderArray[i].SumCount}</td>`+
                `</tr>`
        $('#SalTable').append(str);
        }
    }
//---------------------- 2. 點擊訂單查詢按鈕,紀錄是哪張訂單,跳轉畫面--------------------
    $('.ShowOrder').on('click', function(){
        var temp = this.id;
        window.localStorage.setItem('OutOrderNumber', temp);
        location.href='./outOrderDetail.html';          // outOrderDetail.html
    })  
})