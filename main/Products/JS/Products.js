// Product
var myJSON = window.localStorage.getItem('ProdaValue');      // 載入P_LocalStorgre
var ProductArray = JSON.parse(myJSON);
for(var i=0;i<ProductArray.length;i++){        // 依照資料數量創建表格＋載入資料
    var ProductTable = document.getElementById("PTable");
    var num = ProductTable.rows.length;
    var row = ProductTable.insertRow(num);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = ProductArray[i].ProductID;
    cell2.innerHTML = ProductArray[i].ProductNameID;
    cell3.innerHTML = ProductArray[i].ProductShort;
    cell4.innerHTML = ProductArray[i].inPrice;
    cell5.innerHTML = ProductArray[i].outPrice;
}
var searchNum;      //  '輸入'想查詢的流水號 載入所選的資料
function inNumber(){
    searchNum =  parseInt(window.prompt("請輸入流水號","1")); 
    window.localStorage.setItem('P_LSNum',JSON.stringify(searchNum)); // 存入新的P_L.S.Num
    if(searchNum>0 && searchNum<=(ProductArray.length)){            // 判斷是否有輸入
        location.href='./pDetail.html';
    }else{
        window.alert('資料不在範圍內');
    }
}