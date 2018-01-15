$(function() {
	var _jf = false; //控制是否有签到积分，有为true，默认没有积分；
	
	var signFun = function() {
//		获取到已签到的日期数组（要+1）
		var dateArray = [0, 1, 2, 3];

		var $dateBox = $("#qiandao_list"),
			$currentDate = $(".current-date"),
			$qiandaoBnt = $("#qiandao_btn"),
			_html = '',
			_handle = true,
			myDate = new Date();
		$currentDate.text(myDate.getFullYear() + '年' + parseInt(myDate.getMonth() + 1) + '月' + myDate.getDate() + '日');

		var monthFirst = new Date(myDate.getFullYear(), parseInt(myDate.getMonth()), 1).getDay();

		var d = new Date(myDate.getFullYear(), parseInt(myDate.getMonth() + 1), 0);
		
		//获取当前月的天数
		var totalDay = d.getDate(); 
		
		//生成日历网格
		for(var i = 0; i < 42; i++) {
			_html += ' <li class="qiandao-icon"></li>'
		}
		$dateBox.html(_html) 

		//生成当月的日历且含已签到
		var $dateLi = $dateBox.find("li");
		for(var i = 0; i < totalDay; i++) {
			$dateLi.eq(i + monthFirst).text(parseInt(i + 1));
			$dateLi.eq(i + monthFirst).addClass("date" + parseInt(i + 1));
			for(var j = 0; j < dateArray.length; j++) {
				if(i == dateArray[j]) {
					$dateLi.eq(i + monthFirst).addClass("qiandao");
				}
			}
		}
		
		$(".date" + myDate.getDate()).addClass('able-qiandao');
		
		//点签到按钮签到
		$qiandaoBnt.on("click", function() {
			if(_handle) {
				qiandaoFun();
			}else{
				alert("您已经签过到了！");
			}
		}); 

		function qiandaoFun() {
			$qiandaoBnt.addClass('actived');
			openLayer("qiandao-active", qianDao);
			_handle = false;
		}

		function qianDao() {
			//获取到当前的日期;
			console.log(myDate.getDate())
			$(".date" + myDate.getDate()).addClass('qiandao');
		}
	}();
	
	//打开弹窗
	function openLayer(a, Fun) {
		if(_jf){
			//有积分的情况
			$("#mjf").hide();
		}else{
			$("#mjf").show();
		}
		$('.' + a).fadeIn(Fun)
	}
	
	//关闭弹窗
	var closeLayer = function() {
		$("body").on("click", ".close-btn", function() {
			$(this).parents(".alert-box").fadeOut()
		})
	}() 
})