// CreateProduct
// window.localStorage.removeItem('ProdaValue');
var myJSON = window.localStorage.getItem('ProdaValue');      // 載入L.S.客戶資料
var ProductArray = JSON.parse(myJSON);
var myJSON2 = window.localStorage.getItem('VendorValue');    // 載入V_L.S.客戶資料
var VendorArray = JSON.parse(myJSON2);
// console.log(ProductArray);
runANDread();   //自動編流水號
vselect();      //帶入供應商名稱

function SetValue(){                // 新增商品資料(儲存鍵)
    var ProductObj = {};
    var v = document.getElementsByClassName('Proda');
    for(i=0; i < v.length; i++){
        ProductObj[v[i].id]=v[i].value;    // 把各個欄位的value 放進 obj
        if(i!=0)v[i].value = '';            // 儲存後 把input 變成空字串
    }
    if(v[0].value != 1){ProductArray[ProductArray.length] = ProductObj;} // 把這一個商品的obj 存入[]
    else {ProductArray = [];
        ProductArray[0] = ProductObj};
    window.localStorage.setItem('ProdaValue',JSON.stringify(ProductArray)); 
    runANDread();
    window.alert('已新增一項商品');
}                                                      // 上面 把[]變字串 放進 LocalStorgre

function runANDread(){      // 自動編流水號, 把ID設為readOnly
    var cID = document.getElementById('ProductID');
    if(isNaN(ProductArray))            // 檢查myJSON是不是有東西了
        {cID.value = ProductArray.length + 1;}
    else 
        {cID.value = 1}
    document.getElementById('ProductID').setAttribute("readOnly", 'true');
}
function vselect(){     // 帶入供應商名稱（值）
    for(var i=0;i<VendorArray.length;i++){
        var mySelect = document.getElementById('VendorName');
        mySelect.options.add(new Option(VendorArray[i].VendorName, VendorArray[i].VendorName));
    }
}
