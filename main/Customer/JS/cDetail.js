var myJSON = window.localStorage.getItem('UserValue');      // 載入L.S.客戶資料
var CustomerArray = JSON.parse(myJSON);
var JSONsearchNum = window.localStorage.getItem('LSNum')    // 載入L.S.搜尋流水號
var Num = JSON.parse(JSONsearchNum);
var OrderJSON = window.localStorage.getItem("outOrders");
var outOrderArray = JSON.parse(OrderJSON);                  // 載入訂單資料
var searchNum = Num - 1 ;
var CName = CustomerArray[searchNum].CustomerName;          // 紀錄修改前的公司名稱
// 載入 客戶查詢的資料
var v = document.getElementsByClassName('outP');
for(i=0; i < v.length; i++){
    var str = v[i].id;
    v[i].value = CustomerArray[(searchNum)][str];
}  

function KeepALT(){                         // '儲存修改'後的資料
    var CustomerObj = {};
    var v = document.getElementsByClassName('outP');
    for(var i=0; i < v.length; i++){
        CustomerObj[v[i].id]=v[i].value;    // 把各個欄位的value 放進 obj
    }
    CustomerArray[searchNum] = CustomerObj;
    for(var i=0;i<outOrderArray.length;i++){
        if(outOrderArray[i].CustomerName == CName){
            outOrderArray[i].CustomerName = CustomerObj.CustomerName;
        }
    }
    window.localStorage.setItem("outOrders",JSON.stringify(outOrderArray));
    UpdateJSON()                            // Update:LoaclStoeage.UserValue
    location.href='./Customer.html';        // 回到總表
}
function DeleteThis(){              // '刪除'此筆資料
    var r = window.confirm('是否確定刪除資料?');
    if(r){
        for(var i = searchNum;i<CustomerArray.length;i++){  
            // 將這筆'刪除的資料後面' 所有的CustomerID -1(往前遞補流水號)
            CustomerArray[i].CustomerID = parseInt((CustomerArray[i].CustomerID)) - 1 ;
        }
        CustomerArray.splice((searchNum), 1);
        UpdateJSON()                            // Update:LoaclStoeage.UserValue
        location.href='./Customer.html';        // 回到總表
    }
}

CloseInput('outP');
function CloseInput(Askput) {               // '關閉'input編輯
    var x = document.getElementsByClassName(Askput);
    for (i = 0; i < x.length; i++) {
        x[i].setAttribute("readOnly", 'true');
    }
}
function OpenInput(Askput2){                // 1.'開啟'input編輯  2.'修改'cDetail
    var x =document.getElementsByClassName(Askput2);
    for(i = 1; i < x.length; i++) {
        x[i].removeAttribute('readOnly');
    }
}
function UpdateJSON(){                       // Update:LoaclStoeage.UserValue
    window.localStorage.setItem('UserValue',JSON.stringify(CustomerArray));
}
function showbtn(){
    document.getElementById('Sbtn').style.visibility="visible";
    document.getElementById('Cbtn').style.visibility="visible";
    document.getElementById('Fbtn').style.visibility="hidden";
    document.getElementById('Bbtn').value="取消";
}