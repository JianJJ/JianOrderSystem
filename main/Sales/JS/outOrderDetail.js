$(document).ready(function () {
//---------------------- 0. 載入需要的資料、設定變數 -------------------------------
    // window.localStorage.removeItem('outOrders');
    var ProdaJSON = window.localStorage.getItem("ProdaValue");
    var ProdaArray = JSON.parse(ProdaJSON);            // 載入產品資料
    var CusJSON = window.localStorage.getItem("UserValue");
    var CusArray = JSON.parse(CusJSON);                // 載入客戶資料
    var OrderJSON = window.localStorage.getItem("outOrders");
    var outOrderArray = JSON.parse(OrderJSON);         // 載入訂單資料
    var myJSONnum = window.localStorage.getItem("OutOrderNumber");
    var outOrderNum = JSON.parse(myJSONnum);          // 載入查詢的訂單編號
    var DNumber = 0;                                  // 初始化訂單列

//---------------------- 1. 找出此訂單訂單資料 ------------------------------------
    var SelOrderobj ={};
    for(var i=0;i<outOrderArray.length;i++){
        if(outOrderArray[i].OrderID == outOrderNum){
            SelOrderobj = outOrderArray[i];
            break;
        }
    }
//---------------------- 2. 代入編號,客戶名稱 --------------------------------------
    $('#OrderID').prop('value',`${SelOrderobj.OrderID}`);
    $('#CustomerName').prop('value',`${SelOrderobj.CustomerName}`);
    $('#OutDate').prop('value',`${SelOrderobj.OutDate}`);
    for(var i=0;i<CusArray.length;i++){
        if(CusArray[i].CustomerName == $('#CustomerName').prop('value')){
            $('#ContactPerson').prop('value',CusArray[i].ContactPerson);
            $('#CPPhone').prop('value',CusArray[i].CPPhone);
            $('#ShipAddress').prop('value',CusArray[i].ShipAddress);
        }
    };
//---------------------- 3. 計算此訂單的資料列數 ------------------------------------
    var rows = 0;
    var i = 0;
    rows = (Object.keys(SelOrderobj).length-5)/4;
    while(i<=rows){
        InsertIn();    
    }
//---------------------- 3.1 創建商品列--------------------------------------------
    function InsertIn() {                              // 增加一列商品欄位
        DNumber++;                                     // 計算行列數
        var col = `<tr id=tr${DNumber}>` +             // 給這列(tr)一個id
            `<td>${DNumber}</td>` +                    // '#1DNumber'商品型號
            `<td><select id="sel${DNumber}" class="OutOinput"></select></td>` +
            `<td id="td2${DNumber}"></td>` +           // '#2DNumber'名稱
            `<td id="td3${DNumber}"></td>` +           // '#3DNumber'規格
            `<td id="td4${DNumber}">` +                // '#4DNumber'單價
                `<input id="i4${DNumber}" value="0" class="OutOinput"></td>` +
            `<td id="td5${DNumber}">` +                // '#5DNumber'數量
                `<input id="i5${DNumber}" value="1" class="OutOinput"></td>` +
            `<td id="td6${DNumber}">` +                // '#6DNumber'折數
                `<input id="i6${DNumber}" value="1.00" class="OutOinput"></td>` +
            `<td id="td7${DNumber}"></td>` +           // '#7DNumber'金額
            '</tr>';
        $('#myTable').append(col);
        ProdaFromV();                                  // p.3-2 抓取商品型號
        getValue(DNumber);                             // p.7   載入查詢的值
        getName();
        aadevent();                                    // p.4-2 抓取商品內容+監聽
        keyReplace();                                  // p.11 設定input只能是數字
    }
    $('#CNewBtn').on('click', InsertIn);               // 設定新增按鈕        
//---------------------- 3-2. 抓取商品型號 -----------------------------------------
    function ProdaFromV() {
        PNid = "" ;                                    // 抓取商品型號
        for(var i=0;i<ProdaArray.length;i++){
            PNid = (`<option value="${ProdaArray[i].ProductNameID}">` +
                `${ProdaArray[i].ProductNameID}</option>`);
            $(`#sel${DNumber}`).append(PNid);
        }
    }
//---------------------- 4. 取得商品名稱,規格,單價(還不是訂單的資料)    ------------------
//----------------------    這裡開始到p.7以前,都是"複製新增訂單的"Func ------------------
//----------------------    p.7 才是帶入真正的帶入"查詢的訂單"的資料   ------------------
    var DNint = "";
    function getName(){                                 // 這裡有可能是監聽者觸發,做一個判斷
        if (this.id){                                   // 找出監聽者的 DNumber號碼
            DNint = parseInt(this.id.substr(3,3));
        }else{                                          // 或是第一次的自動執行
            DNint = DNumber.toString();
        }
        for(var i=0;i<ProdaArray.length;i++){
            if(ProdaArray[i].ProductNameID == $(`#sel${DNint}`).prop('value')){
                $(`#td2${DNint}`).prop('value',ProdaArray[i].ProductName);
                $(`#td2${DNint}`).text(ProdaArray[i].ProductName);
                $(`#td3${DNint}`).prop('value',ProdaArray[i].ProductSP);
                $(`#td3${DNint}`).text(ProdaArray[i].ProductSP);
                $(`#i4${DNint}`).prop('value', ProdaArray[i].outPrice);
            }
        }
        littleCount();                                   // p.4-1 計算商品價格
        Inputaddevent();                                 // p.4-3 帶入監聽者的ID
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
            suntotal();                                   // p.5 計算合計
        }
    }
//---------------------- 4-2. 當變換產品型號重新抓取內容 -------------------------------
    function aadevent(){
        var temp = document.getElementById(`sel${DNumber}`);
        temp.addEventListener('change',getName);
    }
//---------------------- 4-3. 當變換單價,數量,折數 更新小計-----------------------------
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
//---------------------- 6. 刪除最後一列-------------------------------------------------
    $('#DelBtn').on('click',function(){                  // 刪除最後一列
        DNumber -= 1;
        $('#myTable').find('tr').each(function(index ,elm){
            if(index + 1 == $('tr').length){
                elm.remove();
            }
        })
        suntotal();                                      // 計算合計
    })
//---------------------- 7. 代入查詢訂單的資料 ---------------------------------------
    function getValue(DN){
        var selnum = SelOrderobj[`sel${DN}`];
        if(selnum){                                      // 這裡判斷是不是修改新增的資料
            $(`#sel${DN}`).prop('value', `${selnum}`);   // 如果是新增的沒有"舊的值"undefind
            var i4num = SelOrderobj[`i4${DN}`];
            $(`#i4${DN}`).prop('value', `${i4num}`);
            var i5num = SelOrderobj[`i5${DN}`];
            $(`#i5${DN}`).prop('value', `${i5num}`);
            var i6num = SelOrderobj[`i6${DN}`];
            $(`#i6${DN}`).prop('value', `${i6num}`);
        }
        for(var i=0;i<ProdaArray.length;i++){           // 帶入的時候 先把訂單的庫存'加回去'
            if(selnum == ProdaArray[i].ProductNameID){  // 更新資料後,儲存時再'扣回去'
                ProdaArray[i].StockNum = 
                    parseInt(ProdaArray[i].StockNum) + parseInt(i5num);
            }
        }
    }
//---------------------- 7-1. 載入完成後計算小記合計,並設定Readonly --------------------
    littleCount();
    $('.OutOinput').prop({
        'readOnly':true,
        'disabled':true
    });
//---------------------- 8. "修改"按鍵,取消input的readony ----------------------------
    $('#reInput').on('click',function(){
        $('.OutOinput').prop({
            'readOnly':false,
            'disabled':false
        });
        $('#OrderID,#CustomerName,#SumCount').prop('readOnly',true);
        $('#CNewBtn,#DelBtn,#setOver,#DelNO').css('visibility','visible');
        $('#reInput').css('visibility','hidden');
        $('#backup').prop('value','取消');
    })
//---------------------- 8-1. "刪除"的按鍵, 設定刪除訂單的狀態為"NoShow"-----------------
    $('#DelNO').on('click',function(){                   // 不記錄任何修改,新增狀態後
        var r = window.confirm('是否確定刪除資料?');
        if(r){
            for(var i=0;i<outOrderArray.length;i++){     // 直接回存資料
                if(outOrderArray[i].OrderID == outOrderNum){
                    outOrderArray[i]["State"] = "NoShow";
                    break;
                }
            }
            saveLS();                                    // p.9 儲存LocalStorage
            window.localStorage.setItem('ProdaValue',JSON.stringify(ProdaArray));
            location.href='./Sales.html';                // 儲存回上一頁
        }
    })
//---------------------- 8-2. "儲存"的按鍵,儲存資料------------------------------------
    $('#setOver').on('click', function(){
        SelOrderobj = {};
        for(var i=0;i<$('.OutOinput').length;i++){
            SelOrderobj[$('.OutOinput')[i].id] = $('.OutOinput')[i].value;
        }
        for(var i=0;i<outOrderArray.length;i++){
            if(parseInt(SelOrderobj.OrderID)==parseInt(outOrderArray[i].OrderID)){
                outOrderArray.splice(i,1,SelOrderobj);
                break;
            }
        }
        saveLS();                                         // p.9 儲存LocalStorage
        UpdateStocks();                                   // p.10 更新庫存
        location.href='./Sales.html';                     // 儲存回上一頁
    })
//---------------------- 9. JSON => LocalStorage ----------------------------------
    function saveLS(){
        window.localStorage.setItem('outOrders',JSON.stringify(outOrderArray));
    }
//---------------------- 10. 減少商品庫存--------------------------------------------
    function UpdateStocks(){
        for(var i=1;i<=DNumber;i++){                      // 尋訪產品Array,找出一樣名字的商品
            for(var j=0;j<ProdaArray.length;j++){         //   New庫存 ＝ 庫存 - 訂單數量
                if($(`#sel${i}`).prop('value') == ProdaArray[j].ProductNameID){
                    ProdaArray[j].StockNum = 
                        parseInt(ProdaArray[j].StockNum) - parseInt($(`#i5${i}`).prop('value'));
                }
            }
        }                                                 // 儲存產品資料
        window.localStorage.setItem('ProdaValue',JSON.stringify(ProdaArray));
    }
//----------------------- 11. 限制input只能輸入數字 ----------------------------------    
    function keyReplace(){
        $('input').keyup(function(){ 
            $(this).val($(this).val().replace(/[^\d\.]/g,''));
        })
    }
})