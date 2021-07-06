// Customer
var myJSON = window.localStorage.getItem('UserValue');      // 載入LocalStorgre
var CustomerArray = JSON.parse(myJSON);
console.log(CustomerArray.length); 
for(var i=0;i<CustomerArray.length;i++){        // 依照資料數量創建表格＋載入資料
    var CustomerTable = document.getElementById("CTable");
    var num = CustomerTable.rows.length;
    var row = CustomerTable.insertRow(num);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = CustomerArray[i].CustomerID;
    cell2.innerHTML = CustomerArray[i].CustomerName;
    cell3.innerHTML = CustomerArray[i].CustomerPhone;
    cell4.innerHTML = CustomerArray[i].CustomerFax;
    cell5.innerHTML = CustomerArray[i].CustomerAddress;
}

var searchNum;      //  '輸入'想查詢的流水號 載入所選的資料
function inNumber(){
    searchNum =  parseInt(window.prompt("請輸入流水號","1")); 
    window.localStorage.setItem('LSNum',JSON.stringify(searchNum)); // 存入新的L.S.Num
    if(searchNum>0 && searchNum<=(CustomerArray.length)){            // 判斷是否有輸入
        location.href='./cDetail.html';
    }else{
        window.alert('資料不在範圍內');
    }
}




