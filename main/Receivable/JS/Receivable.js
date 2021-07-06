$(document).ready(function(){
//---------------------- 0. 載入客戶資料 ----------------------------------------
    var CusJSON = window.localStorage.getItem("UserValue");
    var CusArray = JSON.parse(CusJSON);                // 載入客戶資料

//---------------------- 1. 選擇不同表格,顯示客戶選項或隱藏 ------------------------
    $('input[name="show"]').on('change',function(){
        $('#CusTr').toggleClass('Customer');
    })
//---------------------- 1-1. 將客戶名稱加入select -------------------------------
    for (var i = 0; i < CusArray.length; i++) {
            $('#CustomerName').append(
                `<option value="${CusArray[i].CustomerName}">` +
                `${CusArray[i].CustomerName}</option>`);
    }
//---------------------- 2. 點擊"查詢"紀錄查詢的值 ---------------------------------
    $('#inquire').on('click',function(){
        var inquireObj = {
            show : $('input[name="show"]:checked').prop('value'),
            startDate : $('#startDate').prop('value'),
            endDate : $('#endDate').prop('value'),
            CustomerName : $('#CustomerName').prop('value')
        }
        window.localStorage.setItem('Cinquire',JSON.stringify(inquireObj));
        location.href=`./Show${inquireObj.show}.html`;
    })
//---------------------- 2. 帶入當月的第一天到今天的日期,預設 --------------------------
    var fdate = new Date();
    var sdate = new Date();
    fdate.setDate(1);
    var y = (fdate.getFullYear()-1911).toString();
    var m = (fdate.getMonth()+1).toString().padStart(2,0);
    var fd = (fdate.getDate()).toString().padStart(2,0);
    var sd = (sdate.getDate()).toString().padStart(2,0);
    var sDate = `${y}${m}${fd}`;
    var eDate = `${y}${m}${sd}`;
    $('#startDate').prop('value',`${sDate}`);
    $('#endDate').prop('value',`${eDate}`);
//----------------------- 9. 限制input只能輸入數字 ----------------------------------
    $('input').keyup(function(){ 
        $(this).val($(this).val().replace(/\D/g,''));
    })
})