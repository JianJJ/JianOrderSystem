// Vendor
var myJSON = window.localStorage.getItem('VendorValue');      // 載入V_LocalStorgre
var VendorArray = JSON.parse(myJSON);
for(var i=0;i<VendorArray.length;i++){        // 依照資料數量創建表格＋載入資料
    var VendorTable = document.getElementById("VTable");
    var num = VendorTable.rows.length;
    var row = VendorTable.insertRow(num);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = VendorArray[i].VendorID;
    cell2.innerHTML = VendorArray[i].VendorName;
    cell3.innerHTML = VendorArray[i].VendorPhone;
    cell4.innerHTML = VendorArray[i].VendorFax;
    cell5.innerHTML = VendorArray[i].VendorAddress;
}
var searchNum;      //  '輸入'想查詢的流水號 載入所選的資料
function inNumber(){
    searchNum =  parseInt(window.prompt("請輸入流水號","1")); 
    window.localStorage.setItem('V_LSNum',JSON.stringify(searchNum)); // 存入新的L.S.Num
    if(searchNum>0 && searchNum<=(VendorArray.length)){            // 判斷是否有輸入
        location.href='./vDetail.html';
    }else{
        window.alert('資料不在範圍內');
    }
}