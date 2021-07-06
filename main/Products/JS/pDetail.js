var myJSON = window.localStorage.getItem('ProdaValue');       // 載入P_L.S.資料
var ProductArray = JSON.parse(myJSON);
var JSONsearchNum = window.localStorage.getItem('P_LSNum')    // 載入P_L.S.搜尋流水號
var Num = JSON.parse(JSONsearchNum);
var searchNum = Num - 1 ;
// 載入 客戶查詢的資料
var v = document.getElementsByClassName('Proda');
for(i=0; i < v.length; i++){
    var str = v[i].id;
    v[i].value = ProductArray[(searchNum)][str];
}  
function KeepALT(){                         // '儲存修改'後的資料
    var ProductObj = {};
    var v = document.getElementsByClassName('Proda');
    for(i=0; i < v.length; i++){
        ProductObj[v[i].id]=v[i].value;    // 把各個欄位的value 放進 obj
    }
    ProductArray[searchNum] = ProductObj;
    UpdateJSON()                            // Update:LoaclStoeage.UserValue
    location.href='./Products.html';        // 回到總表
}
function DeleteThis(){              // '刪除'此筆資料
    var r = window.confirm('是否確定刪除資料?');
    if(r){
        for(var i = searchNum;i<ProductArray.length;i++){  
            // 將這筆'刪除的資料後面' 所有的ProductID -1(往前遞補流水號)
            ProductArray[i].ProductID = parseInt((ProductArray[i].ProductID)) - 1 ;
        }
        ProductArray.splice((searchNum), 1);
        UpdateJSON()                            // Update:LoaclStoeage.UserValue
        location.href='./Products.html';        // 回到總表
    }
}
CloseInput('Proda');
function CloseInput(Askput) {               // '關閉'input編輯
    var x = document.getElementsByClassName(Askput);
    for (i = 0; i < x.length; i++) {
        x[i].setAttribute("readOnly", "true");
    }
}
function OpenInput(Askput2){                // 1.'開啟'input編輯  2.'修改'cDetail
    var x =document.getElementsByClassName(Askput2);
    for(i = 2; i < x.length; i++) {
        x[i].removeAttribute("readOnly");
    }
}
function UpdateJSON(){                       // Update:LoaclStoeage.UserValue
    window.localStorage.setItem('ProdaValue',JSON.stringify(ProductArray));
}
function showbtn(){
    document.getElementById('Sbtn').style.visibility="visible";
    document.getElementById('Cbtn').style.visibility="visible";
    document.getElementById('Fbtn').style.visibility="hidden";
    document.getElementById('Bbtn').value="取消";
}