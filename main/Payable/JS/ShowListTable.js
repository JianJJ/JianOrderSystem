$(document).ready(function(){
//---------------------- 0. 載入需要的資料、設定變數 -------------------------------
    var ProdaJSON = window.localStorage.getItem("ProdaValue");
    var ProdaArray = JSON.parse(ProdaJSON);          // 載入產品資料
    var OrderJSON = window.localStorage.getItem("inOrders");
    var inOrderArray = JSON.parse(OrderJSON);        // 載入訂單資料
    var inquireJSON = window.localStorage.getItem("Vinquire");
    var inquireObj = JSON.parse(inquireJSON);        // 載入查詢資料

//---------------------- 1. 帶入表格抬頭 ------------------------------------------
    $('h3').text(`${inquireObj.startDate} ~ ${inquireObj.endDate} `
                                        +`${inquireObj.VendorName}  廠商應付`);
//---------------------- 2. 找出該供應商的訂單資料 ----------------------------------
    var sunTotal = 0;                                               // 判斷
    for(var i=0;i<inOrderArray.length;i++){                         // 1. 查詢名稱一樣的訂單
        if(inquireObj.VendorName == inOrderArray[i].VendorName      // 2. 不是被刪除的
            && inOrderArray[i].State == 'Show'                      // 3. 日期區間內
            && parseInt(inOrderArray[i].Indate+0) >= parseInt(inquireObj.startDate+0)
            && parseInt(inOrderArray[i].Indate+0) <= parseInt(inquireObj.endDate+0)){
                createTable(i,Object.keys(inOrderArray[i]).length);   // 計算該筆訂單的資料長度
                $("tr:last-child>td").css('border-bottom','1px solid #56789a'); // 畫線區分訂單
                sunTotal = sunTotal + parseFloat(inOrderArray[i].SumCount);  // 計算總和
        }
    }
    $('#sunTotal').prop('value',sunTotal);                               // 顯示總和
//---------------------- 3. 創建各個廠商表格,找出商品名稱,計算小計 --------------------
    function createTable(i, len){
        for(var j=1;j<=(len-5)/4;j++){                            // 計算這筆訂單要印幾列
            $('table').append('<tr>'+
                                `<td id="td1${i}${j}">${inOrderArray[i].Indate}</td>`+
                                `<td id="td2${i}${j}"">${inOrderArray[i].OrderID}</td>`+
                                `<td id="sel${i}${j}">${inOrderArray[i][`sel${j}`]}</td>`+
                                `<td id="ProdaName${i}${j}"></td>`+
                                `<td id="i4${i}${j}">${inOrderArray[i][`i4${j}`]}</td>`+
                                `<td id="i5${i}${j}">${inOrderArray[i][`i5${j}`]}</td>`+
                                `<td id="i6${i}${j}">${inOrderArray[i][`i6${j}`]}</td>`+
                                `<td id="suncount${i}${j}"></td>`+
                            '</tr>');
            if(j>1){                                               // 同一訂單 第二行以後
                $(`#td1${i}${j}`).text(" ");                       // 不在顯示日期,編號
                $(`#td2${i}${j}`).text(" ");
            }
            for(var k=0;k<ProdaArray.length;k++){                  // 從產品資料 找出一樣名字的
                if(ProdaArray[k].ProductNameID == $(`#sel${i}${j}`).text()){
                    $(`#ProdaName${i}${j}`).text(`${ProdaArray[k].ProductName}`);
                }
            }
            var Suncount = parseFloat($(`#i4${i}${j}`).text()) *
                            parseFloat($(`#i5${i}${j}`).text()) *
                                parseFloat($(`#i6${i}${j}`).text());
            $(`#suncount${i}${j}`).text(Suncount);
        }
    }
})