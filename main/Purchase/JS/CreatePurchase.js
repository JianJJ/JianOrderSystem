$(document).ready(function () {
//---------------------- 0. 載入需要的資料、設定變數 -------------------------------
    // window.localStorage.removeItem('inOrders');
    var ProdaJSON = window.localStorage.getItem("ProdaValue");
    var ProdaArray = JSON.parse(ProdaJSON);          // 載入產品資料
    var VenJSON = window.localStorage.getItem("VendorValue");
    var VenArray = JSON.parse(VenJSON);              // 載入廠商資料
    var OrderJSON = window.localStorage.getItem("inOrders");
    var OrderArray = JSON.parse(OrderJSON);          // 載入訂單資料

//---------------------- 1. 帶入日期 --------------------------------------------
    $('#Indate').prop('value', function () {         // 畫面進入自動帶入今天日期
        var setdate = new Date;
        var y = (setdate.getFullYear() - 1911).toString();
        var m = (setdate.getMonth() + 1).toString().padStart(2, 0);
        var d = setdate.getDate().toString().padStart(2, 0);
        return `${y}${m}${d}`;
    })

//---------------------- 2. 代入供應商選項 ---------------------------------------
    for (var i = 0; i < VenArray.length; i++) {
        $('#VendorName').append(
            `<option value="${VenArray[i].VendorName}">` +
            `${VenArray[i].VendorName}</option>`);
    }

//---------------------- 3. 載入第一列給值、命名 ----------------------------------
    var DNumber = 0;                                  // 初始化訂單列
    InsertIn();                                      
    $('#CNewBtn').on('click', InsertIn);
    function InsertIn() {                             // 增加一列商品欄位
        DNumber++;                                    // 計算行列數
        var InOrderobj = {}
        var col = `<tr id=tr${DNumber}>` +            // 給這列(tr)一個id
            `<td>${DNumber}</td>` +                   // '#1DNumber'商品型號
            `<td><select id="sel${DNumber}" class="Cnewinput"></select></td>` +
            `<td id="td2${DNumber}"></td>` +          // '#2DNumber'名稱
            `<td id="td3${DNumber}"></td>` +          // '#3DNumber'規格
            `<td id="td4${DNumber}">` +               // '#4DNumber'單價
                `<input id="i4${DNumber}" value="0" class="Cnewinput"></td>` +
            `<td id="td5${DNumber}">` +               // '#5DNumber'數量
                `<input id="i5${DNumber}" value="1" class="Cnewinput"></td>` +
            `<td id="td6${DNumber}">` +               // '#6DNumber'折數
                `<input id="i6${DNumber}" value="1.00" class="Cnewinput"></td>` +
            `<td id="td7${DNumber}"></td>` +          // '#7DNumber'金額
            '</tr>';
        $('#myTable').append(col);
        ProdaFromV();                                 // p.3-1 抓取商品型號
        getName();
        aadevent();                                   // p.4-2 抓取商品內容+監聽
        keyReplace();                                 // p.9 設定input只能是數字
    }
//---------------------- 3-1. 載入第一列給值、命名 ----------------------------------
    $('#VendorName').on('change',function(){
        ProdaFromV();                                 // 切換進貨廠商的時候
        reSetOrder();                                 // p.3-2如果有2商品以上,還去換廠商執行清除
        getName();
    })
    var PNid = "";                                    // 商品型號(下拉式的內容)
    function ProdaFromV() {                           // 當供應商選項變動時
        PNid = "" ;                                   // 重新抓取 該供應商的商品型號
        $(`#sel${DNumber}`).empty();                  // 清空原有 型號欄位 再重新加入
        for(var i=0;i<ProdaArray.length;i++){
            if(ProdaArray[i].VendorName == $('#VendorName').prop('value')){
                PNid = (`<option value="${ProdaArray[i].ProductNameID}">` +
                    `${ProdaArray[i].ProductNameID}</option>`);
                $(`#sel${DNumber}`).append(PNid);
            }
        }
    }
//---------------------- 3-2. 如果有2商品以上,還去換廠商,執行清除 ----------------------
    function reSetOrder() {
        if(DNumber>1){                                // 但如果只有第一列 不用清除
        DNumber = 0;
        $('#myTable').find('tr').each(function(index ,elm){
            if(index>=1){
                elm.remove();
            }
        })
        InsertIn();                                   // p.3 重新建立第一列
        }
    }        
//---------------------- 4. 取得商品名稱,規格,單價 -----------------------------------
    var DNint;
    function getName(){                               // 這裡有可能是監聽者觸發,做一個判斷
        if (this.id){                                 // 找出監聽者的 DNumber號碼
            DNint = parseInt(this.id.substr(3,3));
        }else{                                        // 或是第一的自動執行
            DNint = DNumber;
        }
        for(var i=0;i<ProdaArray.length;i++){
            if(ProdaArray[i].ProductNameID == $(`#sel${DNint}`).prop('value')){
                $(`#td2${DNint}`).prop('value',ProdaArray[i].ProductNameID);
                $(`#td2${DNint}`).text(ProdaArray[i].ProductName);
                $(`#td3${DNint}`).prop('value',ProdaArray[i].ProductSP);
                $(`#td3${DNint}`).text(ProdaArray[i].ProductSP);
                $(`#i4${DNint}`).prop('value', ProdaArray[i].inPrice);
            }
        }
        littleCount();                                // p.4-1 計算商品價格
        Inputaddevent();                              // p.4-1 帶入監聽者的ID

    }
//---------------------- 4-1. 計算商品價格(單價*數量*折數)每一列都算 -------------------
    function littleCount(){
        for(var i=1;i<=DNumber;i++){
            var result = 1;
            $(`#tr${i}`).find('input').each(function(index, elm){
                result *= parseFloat(elm.value).toFixed(2);
                })
            $(`#td7${i}`).prop('value', `${result}`);
            $(`#td7${i}`).text(`${result}`);
            suntotal();                                   // p.5 計算合計
        }
    }
//---------------------- 4-2. 當變換產品型號重新抓取內容 ------------------------------
    function aadevent(){
        var temp = document.getElementById(`sel${DNumber}`);
        temp.addEventListener('change',getName);
    }

//---------------------- 4-3. 當變換單價,數量,折數 更新小計----------------------------
    function Inputaddevent(){
        var temp;
        for(var i=4;i<7;i++){
            temp = document.getElementById(`i${i}${DNumber}`);
            temp.addEventListener('change',littleCount);
        }
    }
//---------------------- 5. 計算合計------------------------------------------------
    function suntotal(){
        var total = 0;
        for(i=1;i<$('tr').length;i++){
            total += parseFloat($(`#td7${i}`).prop('value'));
        }
        $('#SumCount').prop('value',`${total.toFixed(0)}`);
    }
//---------------------- 6. 修改資料------------------------------------------------
    $('#DelBtn').on('click',function(){                 // 刪除最後一列
        DNumber -= 1;
        $('#myTable').find('tr').each(function(index ,elm){
            if(index + 1 == $('tr').length){
                elm.remove();
            }
        })
        suntotal();                                     // 計算合計
    })
//---------------------- 7. 儲存資料------------------------------------------------
    var Orderobj = {};
    var sNum= "0001";
    $('#setOver').on('click', function(){
        if($('#sel1').prop('value')){                                     // 如果供應商沒有產品無法儲存
            for(var i=0;i<$('.Cnewinput').length;i++){
            Orderobj[$('.Cnewinput')[i].id] = $('.Cnewinput')[i].value;
            }
            Orderobj["OrderID"] = Orderobj.Indate + sNum;   // 這裏將訂單日加上編號,變成訂單編號
            if(OrderArray){                                 // 這裡依照日期大小存入
                for(var i=0;i<OrderArray.length;i++){
                    if(parseInt(Orderobj.OrderID)<parseInt(OrderArray[i].OrderID)){
                        OrderArray.splice(i,0,Orderobj);
                        break;
                    }             // 下面這的if else 是在判斷 1.將相同日期的訂單 把編號+1
                                    // 並且判斷是不是最後一筆資料,如果是,加入陣列脫離迴圈
                    else if(parseInt(Orderobj.Indate) == parseInt(OrderArray[i].Indate)){
                        Orderobj["OrderID"] = (parseInt(Orderobj.OrderID)+1).toString();
                        if(i==(OrderArray.length-1)){
                            OrderArray.push(Orderobj);
                            break;
                        }
                    }else if(i==(OrderArray.length-1)){
                        OrderArray.push(Orderobj);        
                        break;
                    }
                }
            }else{                                       // 判斷是不是第一筆資料
                OrderArray = [];                         // 如果是第一筆,初始化 OrderArray
                OrderArray.push(Orderobj);
            }
            window.localStorage.setItem('inOrders',JSON.stringify(OrderArray));
            UpdateStocks();                              // 更新庫存
            location.href='./Purchase.html';             // 儲存回上一頁
        }else{
            alert('該供應商目前沒有商品,無法儲存');
        }
    })
//---------------------- 8. 增加商品庫存-------------------------------------------
    function UpdateStocks(){
        for(var i=1;i<=DNumber;i++){                     // 尋訪產品Array,找出一樣名字的商品
            for(var j=0;j<ProdaArray.length;j++){        //   New庫存 ＝ 庫存 ＋ 訂單數量
                if($(`#sel${i}`).prop('value') == ProdaArray[j].ProductNameID){
                    ProdaArray[j].StockNum = 
                        parseInt(ProdaArray[j].StockNum) + parseInt($(`#i5${i}`).prop('value'));
                }
            }
            
        }                                                // 儲存產品資料
        window.localStorage.setItem('ProdaValue',JSON.stringify(ProdaArray));
    }
//----------------------- 9. 限制input只能輸入數字 ----------------------------------    
    function keyReplace(){
        $('input').keyup(function(){ 
            $(this).val($(this).val().replace(/[^\d\.]/g,''));
        })
    }
    $('#Indate').keyup(function(){ 
        $(this).val($(this).val().replace(/^[0-9]{8}$/,''));
    })
})