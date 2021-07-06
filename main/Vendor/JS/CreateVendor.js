// CreateVendor 
// window.localStorage.clear();
var myJSON = window.localStorage.getItem('VendorValue');      // 載入LocalStorgre
var VendorArray = JSON.parse(myJSON);
console.log(VendorArray);
runANDread();

function SetValue(){                // 新增廠商資料(儲存鍵)
    var VendorObj = {};
    var v = document.getElementsByClassName('VinP');
    for(i=0; i < v.length; i++){
        VendorObj[v[i].id]=v[i].value;    // 把各個欄位的value 放進 obj
        if(i!=0)v[i].value = '';            // 儲存後 把input 變成空字串
    }
    if(v[0].value != 1){VendorArray[VendorArray.length] = VendorObj;} // 把這一個客戶的obj 存入[]
    else {VendorArray = [];
          VendorArray[0] = VendorObj};
    window.localStorage.setItem('VendorValue',JSON.stringify(VendorArray)); 
    runANDread();
    window.alert('已新增一筆資料');
}                                                      // 上面 把[]變字串 放進 LocalStorgre
function runANDread(){      // 自動編流水號, 把ID設為readOnly
    var cID = document.getElementById('VendorID');
    if(isNaN(VendorArray))            // 檢查myJSON是不是有東西了
        {cID.value = VendorArray.length + 1;}
    else 
        {cID.value = 1}
    document.getElementById('VendorID').setAttribute("readOnly", 'true');
}
