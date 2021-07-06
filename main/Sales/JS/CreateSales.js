$(document).ready(function () {
//---------------------- 0. 載入需要的資料、設定變數 -------------------------------
    // window.localStorage.removeItem('outOrders');
    var ProdaJSON = window.localStorage.getItem("ProdaValue");
    var ProdaArray = JSON.parse(ProdaJSON);          // 載入產品資料
    var CusJSON = window.localStorage.getItem("UserValue");
    var CusArray = JSON.parse(CusJSON);              // 載入客戶資料
    var OrderJSON = window.localStorage.getItem("outOrders");
    var outOrderArray = JSON.parse(OrderJSON);       // 載入訂單資料

//---------------------- 1. 載入日期 --------------------------------------------
    $('#OutDate').prop('value', function () {        // 畫面進入自動帶入今天日期
        var setdate = new Date;
        var y = (setdate.getFullYear() - 1911).toString();
        var m = (setdate.getMonth() + 1).toString().padStart(2, 0);
        var d = setdate.getDate().toString().padStart(2, 0);
        return `${y}${m}${d}`;
    })

//---------------------- 2. 載入客戶選項 ---------------------------------------
    for (var i = 0; i < CusArray.length; i++) {
        $('#CustomerName').append(
            `<option value="${CusArray[i].CustomerName}">` +
            `${CusArray[i].CustomerName}</option>`);
    }
//---------------------- 2-1. 載入客戶資料 --------------------------------------
    function getValue(){
        for(var i=0;i<CusArray.length;i++){
            if(CusArray[i].CustomerName == $('#CustomerName').prop('value')){
                $('#ContactPerson').prop('value',CusArray[i].ContactPerson);
                $('#CPPhone').prop('value',CusArray[i].CPPhone);
                $('#ShipAddress').prop('value',CusArray[i].ShipAddress);
            }
        };
    }
    getValue();

//---------------------- 3. 載入第一列給值、命名 ---------------------------------
    var DNumber = 0;                                  // 初始化訂單列
    InsertIn();                                      
    $('#CNewBtn').on('click', InsertIn);
    function InsertIn() {                             // 增加一列商品欄位
        DNumber++;                                    // 計算行列數
        var OutOrderobj = {}
        var col = `<tr id=tr${DNumber}>` +            // 給這列(tr)一個id
            `<td>${DNumber}</td>` +                   // '#1DNumber'商品型號
            `<td><select id="sel${DNumber}" class="Onewinput"></select></td>` +
            `<td id="td2${DNumber}"></td>` +          // '#2DNumber'名稱
            `<td id="td3${DNumber}"></td>` +          // '#3DNumber'規格
            `<td id="td4${DNumber}">` +               // '#4DNumber'單價
                `<input id="i4${DNumber}" value="0" class="Onewinput"></td>` +
            `<td id="td5${DNumber}">` +               // '#5DNumber'數量
                `<input id="i5${DNumber}" value="1" class="Onewinput"></td>` +
            `<td id="td6${DNumber}">` +               // '#6DNumber'折數
                `<input id="i6${DNumber}" value="1.00" class="Onewinput"></td>` +
            `<td id="td7${DNumber}"></td>` +          // '#7DNumber'金額
            '</tr>';
        $('#myTable').append(col);
        ProdaFromC();                                 // p.3-1 抓取商品型號
        getName();
        aadevent();                                   // p.4-2 抓取商品內容+監聽
        keyReplace();                                 // p.9 設定input只能數字
    }
//---------------------- 3-1. 抓取商品型號 ----------------------------------------
    function ProdaFromC() {                           // 商品型號(下拉式的內容)
        var PNid = "" ;                               // 重新抓取 商品型號
        $(`#sel${DNumber}`).empty();                  // 清空原有 型號欄位 再重新加入
        for(var i=0;i<ProdaArray.length;i++){
            PNid = (`<option value="${ProdaArray[i].ProductNameID}">` +
                `${ProdaArray[i].ProductNameID}</option>`);
            $(`#sel${DNumber}`).append(PNid);
        }
    }
    $('#CustomerName').on('change',function(){
        getValue();                                   // 切換客戶的時候 切換客戶資訊
        reSetOrder();                                 // p.3-2如果有2商品以上,還去換客戶執行清除
        getName();
    })
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
                $(`#i4${DNint}`).prop('value', ProdaArray[i].outPrice);
            }
        }
        littleCount();                                // p.4-1 計算商品價格
        Inputaddevent();                              // p.4-3 設定addEventListener
    }
//---------------------- 4-1. 計算商品價格(單價*數量*折數)每一列都算 ---------------------
    function littleCount(){
        for(var i=1;i<=DNumber;i++){
            var result = 1;
            $(`#tr${i}`).find('input').each(function(index, elm){
                result *= parseFloat(elm.value).toFixed(2);
                })
            $(`#td7${i}`).prop('value', `${result}`);
            $(`#td7${i}`).text(`${result}`);
            suntotal();                                // p.5 計算合計
        }
    }
//---------------------- 4-2. 當變換產品型號重新抓取內容 -------------------------------
    function aadevent(){
        var temp = document.getElementById(`sel${DNumber}`);
        temp.addEventListener('change',getName);
    }

//---------------------- 4-3. addEventListener--------------------------------------
    function Inputaddevent(){
        var temp;
        for(var i=4;i<7;i++){
            temp = document.getElementById(`i${i}${DNumber}`);
            temp.addEventListener('change',littleCount);
        }
    }
//---------------------- 5. 計算合計-------------------------------------------------
    function suntotal(){
        var total = 0;
        for(i=1;i<$('tr').length;i++){
            total += parseFloat($(`#td7${i}`).prop('value'));
        }
        $('#SumCount').prop('value',`${total.toFixed(0)}`);
    }
//---------------------- 6. 刪除最後一列----------------------------------------------
    $('#DelBtn').on('click',function(){                  // 刪除最後一列
        DNumber -= 1;
        $('#myTable').find('tr').each(function(index ,elm){
            if(index + 1 == $('tr').length){
                elm.remove();
            }
        })
        suntotal();                                      // 計算合計
    })
//---------------------- 7. 儲存資料-------------------------------------------------
    var Orderobj = {};
    var sNum= "0001";
    $('#setOver').on('click', function(){
        for(var i=0;i<$('.Onewinput').length;i++){
            Orderobj[$('.Onewinput')[i].id] = $('.Onewinput')[i].value;
        }
        Orderobj["OrderID"] = Orderobj.OutDate + sNum;   // 這裏將訂單日加上編號,變成訂單編號
        if(outOrderArray){                               // 這裡依照日期大小存入
            for(var i=0;i<outOrderArray.length;i++){
                if(parseInt(Orderobj.OrderID)<parseInt(outOrderArray[i].OrderID)){
                    outOrderArray.splice(i,0,Orderobj);
                    break;
                }             // 下面這的if else 是在判斷 1.將相同日期的訂單 把編號+1
                                // 並且判斷是不是最後一筆資料,如果是,加入陣列脫離迴圈
                else if(parseInt(Orderobj.OutDate) == parseInt(outOrderArray[i].OutDate)){
                    Orderobj["OrderID"] = (parseInt(Orderobj.OrderID)+1).toString();
                    if(i==(outOrderArray.length-1)){
                        outOrderArray.push(Orderobj);
                        break;
                    }
                }else if(i==(outOrderArray.length-1)){
                    outOrderArray.push(Orderobj);        
                    break;
                }
            }
        }else{                                           // 判斷是不是第一筆資料
            outOrderArray = [];                          // 初始化 outOrderArray
            outOrderArray.push(Orderobj);
        }
        window.localStorage.setItem('outOrders',JSON.stringify(outOrderArray));
        UpdateStocks();                                  // 更新庫存
        location.href='./Sales.html';                    // 儲存回上一頁
    })
//---------------------- 8. 增加商品庫存-------------------------------------------
    function UpdateStocks(){
        for(var i=1;i<=DNumber;i++){                     // 尋訪產品Array,找出一樣名字的商品
            for(var j=0;j<ProdaArray.length;j++){        //   New庫存 ＝ 庫存 - 訂單數量
                if($(`#sel${i}`).prop('value') == ProdaArray[j].ProductNameID){
                    ProdaArray[j].StockNum = 
                        parseInt(ProdaArray[j].StockNum) - parseInt($(`#i5${i}`).prop('value'));
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
    $('#OutDate').keyup(function(){ 
        $(this).val($(this).val().replace(/^[0-9]{8}$/,''));
    })
})