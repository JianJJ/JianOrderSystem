$(document).ready(function(){
//---------------------- 0. 載入廠商資料 ----------------------------------------
    var VenJSON = window.localStorage.getItem("VendorValue");
    var VenArray = JSON.parse(VenJSON);              // 載入廠商資料

//---------------------- 1. 選擇不同表格,顯示廠商選項或隱藏 ------------------------
    $('input[name="show"]').on('change',function(){
        $('#venTr').toggleClass('Vendor');
    })
//---------------------- 1-1. 將廠商名稱加入select -------------------------------
    for (var i = 0; i < VenArray.length; i++) {
            $('#VendorName').append(
                `<option value="${VenArray[i].VendorName}">` +
                `${VenArray[i].VendorName}</option>`);
    }
//---------------------- 2. 點擊"查詢"紀錄查詢的值 ---------------------------------
    $('#inquire').on('click',function(){
        var inquireObj = {
            show : $('input[name="show"]:checked').prop('value'),
            startDate : $('#startDate').prop('value'),
            endDate : $('#endDate').prop('value'),
            VendorName : $('#VendorName').prop('value')
        }
        window.localStorage.setItem('Vinquire',JSON.stringify(inquireObj));
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
//----------------------- 3. 限制input只能輸入數字 ----------------------------------
    $('input').keyup(function(){ 
        $(this).val($(this).val().replace(/\D/g,''));
    })
})