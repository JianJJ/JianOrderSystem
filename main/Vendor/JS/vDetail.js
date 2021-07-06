// vDetail
//---------------------- 0. 載入需要的資料、設定變數 -------------------------------
    var myJSON = window.localStorage.getItem('VendorValue');
    var VendorArray = JSON.parse(myJSON);                 // 載入廠商資料
    var JSONsearchNum = window.localStorage.getItem('V_LSNum');
    var Num = JSON.parse(JSONsearchNum);                  // 載入搜尋流水號
    var OrderJSON = window.localStorage.getItem("inOrders");
    var OrderArray = JSON.parse(OrderJSON);               // 載入進貨訂單資料
    var ProdaJSON = window.localStorage.getItem("ProdaValue");
    var ProdaArray = JSON.parse(ProdaJSON);               // 載入產品資料
    var searchNum = Num - 1 ;
    var ChangeVName = VendorArray[searchNum].VendorName;  // 先記錄更改前的廠商名稱
//---------------------- 1. 載入查詢的廠商資料 ------------------------------------
    var v = document.getElementsByClassName('VinP');
    for(i=0; i < v.length; i++){
        var str = v[i].id;
        v[i].value = VendorArray[searchNum][str];
    }  
//---------------------- 2. 儲存鍵 ----------------------------------------------
    var vendorObj = {};
    function KeepALT(){                                   // '儲存修改'後的資料
        var v = document.getElementsByClassName('VinP');
        for(i=0; i < v.length; i++){
            vendorObj[v[i].id]=v[i].value;               // 把各個欄位的value 放進 obj
        }
        VendorArray[searchNum] = vendorObj;              // 覆蓋原本的資料
        UpdateInOrder();                                  // p.6 更新訂單資料
        UpdateJSON();                                    // Update:LoaclStoeage.VendorValue
        location.href='./Vendor.html';                   // 回到總表
    }
//---------------------- 3. 刪除鍵 ----------------------------------------------
    function DeleteThis(){
        var r = window.confirm('是否確定刪除資料?');
        if(r){
            for(var i = searchNum;i<VendorArray.length;i++){  
                // 將這筆'刪除的資料後面' 所有的VendorID -1(往前遞補流水號)
                VendorArray[i].VendorID = parseInt((VendorArray[i].VendorID)) - 1 ;
            }
            VendorArray.splice((searchNum), 1);
            UpdateJSON();                                   // Update:LoaclStoeage.VendorValue
            location.href='./Vendor.html';                  // 回到總表
        }
    }
//---------------------- 4. input欄位開、關 --------------------------------------
    CloseInput('VinP');
    function CloseInput(Askput) {                       // '關閉'input編輯
        var x = document.getElementsByClassName(Askput);
        for (i = 0; i < x.length; i++) {
            x[i].setAttribute("readOnly", 'true');
        }
    }
    function OpenInput(Askput2){                        // 1.'開啟'input編輯  2.'修改'vDetail
        var x =document.getElementsByClassName(Askput2);
        for(i = 1; i < x.length; i++) {
            x[i].removeAttribute('readOnly');
        }
    }
//---------------------- 4-1. 點擊修改,顯示其他按鈕 --------------------------------
    function showbtn(){
        document.getElementById('Sbtn').style.visibility="visible";
        document.getElementById('Cbtn').style.visibility="visible";
        document.getElementById('Fbtn').style.visibility="hidden";
        document.getElementById('Bbtn').value="取消";
    }
//---------------------- 5. Update:LoaclStoeage.VendorValue ---------------------
    function UpdateJSON(){
        window.localStorage.setItem('VendorValue',JSON.stringify(VendorArray));
    }
//---------------------- 6. 找出訂單、產品,要被更改的資料 --------------------------
    function UpdateInOrder(){
        for(var i=0;i<OrderArray.length;i++){
            if(OrderArray[i].VendorName == ChangeVName){
                OrderArray[i].VendorName = vendorObj.VendorName;
            }
        }
        for(var i=0;i<ProdaArray.length;i++){
            if(ProdaArray[i].VendorName == ChangeVName){
                ProdaArray[i].VendorName = vendorObj.VendorName;
            }
        }
        window.localStorage.setItem('inOrders',JSON.stringify(OrderArray));
        window.localStorage.setItem('ProdaValue',JSON.stringify(ProdaArray));
    }

        
        