// CreateCustomer 
// window.localStorage.clear();
var myJSON = window.localStorage.getItem('UserValue');      // 載入LocalStorgre
var CustomerArray = JSON.parse(myJSON);
console.log(CustomerArray);
runANDread();

function SetValue(){                // 新增客戶資料(儲存鍵)
    var CustomerObj = {};
    var v = document.getElementsByClassName('inP');
    for(i=0; i < v.length; i++){
        CustomerObj[v[i].id]=v[i].value;    // 把各個欄位的value 放進 obj
        if(i!=0)v[i].value = '';            // 儲存後 把input 變成空字串
    }
    if(v[0].value != 1){CustomerArray[CustomerArray.length] = CustomerObj;} // 把這一個客戶的obj 存入[]
    else {CustomerArray = [];
          CustomerArray[0] = CustomerObj};
    window.localStorage.setItem('UserValue',JSON.stringify(CustomerArray)); 
    runANDread();
    window.alert('已新增一筆資料');
}                                                      // 上面 把[]變字串 放進 LocalStorgre
function runANDread(){      // 自動編流水號, 把ID設為readOnly
    var cID = document.getElementById('CustomerID');
    if(isNaN(CustomerArray))            // 檢查myJSON是不是有東西了
        {cID.value = CustomerArray.length + 1;}
    else 
        {cID.value = 1}
    document.getElementById('CustomerID').setAttribute("readOnly", 'true');
}
