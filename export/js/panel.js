
 var ttUrl;
// 获取当前标签页的url,getSelected在click()内无效

 chrome.tabs.getSelected(null, function (tab) {
    ttUrl = tab.url;
  });


// 本页window.location.href地址为chrome-extension//... 不明所以

 /*
document.addEventListener('DOMContentLoaded', function () {

  
	
  $('#size').change(function() {
     // alert($('#size').val());
  });


});
*/
 
// 不一定要放在document.addEventListener('DOMContentLoaded', function () {})内
   $('#expt').click(function(){
    var sz = $('#size').val(); //需要导出的收藏条数
  if (sz!='') { 
   // expt(ttUrl);// 未能解决跨域请求问题
   
    // 向页面注入JavaScript 脚本执行
    chrome.tabs.executeScript(null,
      // {code:"$('#wrapper > div.left > div:nth-child(1) > ul > li:nth-child(2)').click();"}
      {file: "js/content-export.js"});  //注意路径
      
window.close();
  }else{
    alert("请指定需要导出收藏数据的条数！");
  }     
  });


function expt(url){
  var protocol = url.split("//")[0],path = url.split("//")[1];
  var host = path.substring(0,path.indexOf('/')),
  pathname = path.indexOf("?") != -1 ? path.substring(path.indexOf('/'),path.indexOf("?")) : path.substring(path.indexOf('/')),
  search = url.indexOf("?") != -1 ? url.substring(url.indexOf("?")) : "";
  var usrid = pathname.split("/")[3];
  var sz = $('#size').val();
 
  var max_repin_time = 0; 
  var pageUrl = "https://www.toutiao.com/c/user/favourite/?page_type=2&user_id="+usrid+"&count=20&max_repin_time="+max_repin_time;
  rData(pageUrl);

}

function rData(pgUrl) {
  // alert(pgUrl);
var xhr = new XMLHttpRequest();
alert(pgUrl);
xhr.open("GET", pgUrl, true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    // JSON解析器不会执行攻击者设计的脚本.
    var resp = JSON.stringify(xhr.responseText);
    
    // var resp = JSON.parse(xhr.responseText);  //返回的是空
    alert(resp);
  }
}
xhr.send()

}
/*
getCSDNNews();
function getCSDNNews(){
	var alist=$('.news_list ul li a');
	var len=alist.length;
	for(var i=0;i<len;i++){
		alert($(alist[i]).attr('title'));
	}
	alist[0].click();

}
*/
