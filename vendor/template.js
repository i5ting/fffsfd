var user_answer_arr = []
// var debug = true
var debug = true
var is_show_right_info = true;

var is_show_right_info = false;

var is_show_current_status = true;
var is_show_current_status = false;

var user = {

}

var user_answer_dic = {

}

var main_weixin_url = "http://mp.weixin.qq.com/s?__biz=MzA3ODk1NzQxNA==&mid=200904455&idx=1&sn=39486707ffef126a1ca767a319713dad#rd"

var GET_RESULT_URL = function(){
	return 'http://2.dabuu.sinaapp.com/getresult.php';
}



function play(url){
	var audio = document.createElement('audio');
	var source = document.createElement('source');
	source.type = "audio/mpeg";
	source.type = "audio/mpeg";
	source.src = url;
	source.autoplay = "autoplay";
	source.controls = "controls";
	audio.appendChild(source);
	audio.play();
	$('.btn').hide();
	$('.stop').show();
}
// var audio = new Audio();

var tScore = 0;
var scoreArr = new Array();
    scoreArr[0] = 0;
    scoreArr[1] = 10;
    scoreArr[2] = 20;
    scoreArr[3] = 30;
    scoreArr[4] = 40;
    scoreArr[5] = 50;
    scoreArr[6] = 60;
	scoreArr[7] = 70;
	scoreArr[8] = 80;
	scoreArr[9] = 90;

function next(t){
	if(t==0){
		$('.text-center').hide()
	}
	show_current_status(t);
	count_right(t);
		//
	// <a class="btn btn-block" style='text-align: center;'  onclick="return next(0);">
	//    		<image src='vendor/img/进行测试(选择).png'>
	// </a>
	// $('.question_next_btn').last().html("提交");

	//如果是最后一题，下一个，变为“提交”
	if(true){
		$('.question_next_btn').last().html("提交");
	}

    //console.log(t);
    $(".panel-body").hide();
    var $_this = $(".js_answer").eq(t);
        $_this.show();
    var type = $_this.attr('data-type');
    if(type==2){
        // audio.src = $_this.find('audio').attr('src');
        // audio.load();
        // audio.play();
        $('#sicon').html('<span class="glyphiconsang glyphiconsang-headphones"></span>');
    }
    else if(type==1){
        // stop = true;
        // audio.pause();
        $('#sicon').html('<span class="glyphiconsang glyphiconsang-picture"></span>');
    }
    else{
        // stop = true;
        // audio.pause();
        $('#sicon').html('<span class="glyphiconsang glyphiconsang-pencil"></span>');
    }
}

function result(t){
		var all_count = $('.js_answer').length;
		var right_count = count_right(t);

		var result = parseInt(right_count/all_count * 100)
		// alert(result);
		console.log(user_answer_arr);


		var q_obj = {};
		$.each(user_answer_arr,function(i){
			var answer = user_answer_arr[i]
				console.log(answer);

				var q = "q_" + i;

				var r = 0;
				if(answer.is_right == true){
					r = 1;
				}

				var user_answer= answer.user_answers.join('{#$}')

				//POST: getresult.php? user_id=1010&q_11=1{#$}2_1&&q_22=3_0
			 var cString =  user_answer + '_' + r


			 eval('q_obj.' + q + '=cString' )

		});

		if(debug == true){
				user.user_id =1010
		}

		q_obj.user_id = user.user_id

		var url = GET_RESULT_URL();
		var params = q_obj

		$.post(url,params,function(data){
			// user.aid = aid;			//
			// user.uid = uid;
			if(data.status == true){
				var obj = data.data;

				if(obj.focus == 1){
					user.uid = obj.user_id;
					user.fenable = true;
					alert('focus enable');
				}else{
					user.uid = '0';
					user.fenable = false;
					alert('focus disable');
				}



			}else{
				alert('服务器返回status=false');
				if(result>=50){
					show_final_result(0);
				}else{
					show_final_result(1);
				}

			}


		})

		// return;

}

function show_final_result(type){

	if(type == 0){
		// 查看成绩
	}else{
		// 进入关注界面
	}

  $(".panel-body").hide();

	if(type==0){
		$(".js_result").eq(0).show();
		$(".js_result").eq(0).find('div').show();
	}else{
		$('#panel4').show();
		$(".js_result").eq(1).show();
		// 强制展示，改不了，以后一定要查到原因
		$(".js_result").eq(1).find('div').show();
	}
}

// 多选
function toggle_only(t){
	console.log("当前得分"+score);
    $(".list-group-item").removeClass('active')
    var score = $(t).attr("data-score");
    tScore  = parseInt(tScore) + parseInt(score);

	var iii = $(t).find('i').find('span').length > 0 ? true :false;

	if( $(t).find('i').hasClass('glyphiconsang-unchecked')){
		// alert(iii);
		$(t).find('i').find('span').addClass('right');
		$(t).find('i').removeClass('glyphiconsang-unchecked').addClass('glyphiconsang-ok');
	}else{
		$(t).find('i').removeClass('glyphiconsang-ok').addClass('glyphiconsang-unchecked');
	}

	show_result(t);

    var t = $(".js_answer").index($(t).parents(".js_answer")) + 1;
	//音乐播放beg
	$('.btn').show();
    $('.stop').hide();
}

function show_result(t){
	var a_count = $(t).parent().find('span').length
	var b_count = $(t).parent().find('span.right').length
	var c_count = $(t).parent().find('i.glyphiconsang-ok').length

	if(a_count == b_count && b_count == c_count){
		// alert(' 完全答对了 ');
		if(is_show_right_info == true){
			$(t).parent().css('border','5px dashed green');
		}

	}else{
		// alert(' 答错了 ');
		if(is_show_right_info == true){
			$(t).parent().css('border','5px dashed red');
		}
	}
}


// 单选
function toggle(t){
	// dump_user_answer_arr(t);

	console.log("当前得分"+score);
    $(".list-group-item").removeClass('active')
    var score = $(t).attr("data-score");
    tScore  = parseInt(tScore) + parseInt(score);
    $(t).find('i').removeClass('glyphiconsang-unchecked').addClass('glyphiconsang-ok');

	$(t).find('i').find('span').addClass('right');

	dump_user_answer_arr_one(t)

    var t = $(".js_answer").index($(t).parents(".js_answer")) + 1;
	//音乐播放beg
	$('.btn').show();
    $('.stop').hide();
	//音乐播放end



    if(t == total){
        result(tScore);
    }
    else{
        setTimeout(function(){next(t);},300);
    }
}

/**
 * 多选的时候，点击下一个按钮事件处理
 */
function next_btn(t) {
	//console.log(p)
	// console.log(user_answers);

	var user_answers = $(t).parent().find('ul li i.glyphiconsang-ok')

	if(user_answers.length == 0){
		alert('没选择任何答案');
		return;
	}

	dump_user_answer_arr_multy(t);

	var current = $(".js_answer").index($(t).parents(".js_answer"))
    var t1 = current + 1;

	//音乐播放beg
	$('.btn').show();
    $('.stop').hide();
	//音乐播放end

	// alert(t);
    if(t1 == total){
        result(tScore);
    }else{
        setTimeout(function(){next(t1);},300);
    }
}


function dump_user_answer_arr_one(t,type)
{
	dump_user_answer_arr(t,1);
}


function dump_user_answer_arr_multy(t,type)
{
	dump_user_answer_arr(t,2);
}
/**
type  = 0 无选
type  = 1 单选
type  = 2 多选
**/
function dump_user_answer_arr(t,type){
	var user_answers_index_array = [];
	var right_answers_index_array = [];
	var is_all_right = false;

	var user_answers = $(t).parent().find('ul li i.glyphiconsang-ok')
	var all_answers = $(t).parent().find('ul li');

	// 单选
	if(type == 1){
		user_answers = $(t).parent().find('.glyphiconsang-ok')
		all_answers = $(t).parent().find('li');
	}

	if(user_answers.length == 0){
		alert('没选择任何答案');
		return;
	}

	$.each(user_answers, function(i){
		var o = $(user_answers[i]).parent();
		console.log('o=' + o);
		var index = $(all_answers).index(o) + 1;
		console.log('index=' + index);

		if($(o).find('span').length > 0){
			right_answers_index_array.push(i + 1);
		}

		user_answers_index_array.push(index);
	});

	//console.log(user_answers_index_array);
	$(t).closest('#panel2').data('user_answers_index_array', user_answers_index_array);

	var current = $(".js_answer").index($(t).parents(".js_answer"))

	var a_count = $(t).parent().find('span').length
	var b_count = $(t).parent().find('span.right').length
	var c_count = $(t).parent().find('i.glyphiconsang-ok').length
	var is_right = false;

	if(a_count == b_count && b_count == c_count){
		is_right = true;
	}

	var answer_obj = {
		'right_answers'	: right_answers_index_array,
		'user_answers' 	: user_answers_index_array,
		'is_right' 		: is_right
	}

	user_answer_arr.push(answer_obj);

	console.log('user_answer_arr',user_answer_arr);
}

/**
 * 获取用户答对题目数字
 */
function count_right(){
	var user_right_count = 0;
	var user_answers_count = user_answer_arr.length;
	$.each(user_answer_arr ,function(i){
		var answer = user_answer_arr[i]

		if(answer.is_right == true){
			user_right_count ++;
		}
	})

	var all_questions_count = $('.js_answer').length;

	if(debug == true){
		var info = ' 一共'+ all_questions_count +'道题:做了'+user_answers_count + "道"+"，答对了"+user_right_count +"道";
		$('#current_answer_info').html(info);
	}
	console.log("user_right_count = "+user_right_count +'; and all count='+user_answers_count);

	return user_right_count;
}

function show_current_status(t){
	var count = $('.js_answer').length;

	if(t == count){
		return
	}
	var current = t + 1;

	if(is_show_current_status == true){
		var info = ' 一共'+ count + "道题"+"，当前是第"+ current +"道";
		$('#current_status').html(info);
	}
}

/**
 * 根据QueryString参数名称获取值
 */
function getQueryStringByName(name){
	var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));

	if(result == null || result.length < 1){
	   return "";
	}

	return result[1];
}


WeixinApi.ready(function(Api) {
    Api.showOptionMenu();
    var wxData = {
        "appId": "wx6987e3e535ea35fe",
        "imgUrl" : 'http://weixiaoxinpic.qiniudn.com/Public/upload/42755/54082eb7c71e3.jpg',
        "link" : 'http://wap.weixiaoxin.com/Fy/index/?wid=42755&id=87&r=99517',
        "desc" : '刚在会计考试中，得了[n]分，你也来测试一下吧！',
        "title" : '在会计考试中我获得了[n]分，足厉害啊！'
    };
    // 分享的回调
    var wxCallbacks = {
        // 分享操作开始之前
        ready:function () {
            wxData['title']=wxData['title'].replace('[n]',tScore);
            wxData['desc']=wxData['desc'].replace('[n]',tScore);
        },
        // 分享被用户自动取消
        cancel : function(resp) {
            alert("别这样的啦，好东西要和朋友分享的嘛！分享后我告诉你一个秘密。");
        },
        // 分享失败了
        fail : function(resp) {
            alert("分享失败，可能是网络问题，一会儿再试试？");
        },
        // 分享成功
        confirm : function(resp) {
            //$.get("mobile.php?act=module&name=dialect&do=detail&weid=6", {id: "7",op:'share'});
			 $.get("/Fy/up_share/", {
				wid: 42755,
				id: 87,
				score: tScore
			});
			window.location.href='http://mp.weixin.qq.com/s?__biz=MzA3ODk1NzQxNA==&mid=200904455&idx=1&sn=39486707ffef126a1ca767a319713dad#rd';
        },
    };
    Api.shareToFriend(wxData,wxCallbacks);
    Api.shareToTimeline(wxData,wxCallbacks);
    Api.shareToWeibo(wxData,wxCallbacks);
});

$("#content img").each(function(){
$(this).removeAttr('height');
if(($(this).width()+20)>$('#content').innerWidth()){

	$(this).removeAttr('style').removeAttr('width');
	$(this).removeAttr('style').attr('width',($('#content').innerWidth()-20));
}else{
	$(this).removeAttr('style').attr('max-width','100%');
}

});
$("#content2 img").each(function(){
$(this).removeAttr('height');
if(($(this).width()+20)>$('#content2').innerWidth()){

	$(this).removeAttr('style').removeAttr('width');
	$(this).removeAttr('style').attr('width',($('#content2').innerWidth()-20));
}else{
	$(this).removeAttr('style').attr('max-width','100%');
}

});

var GET_Q_URL = 'http://2.dabuu.sinaapp.com/getquestions.php'

Zepto(function($){
    $('.loads').hide();

		$('#subscript_a_id').attr('href',main_weixin_url);

		var aid = getQueryStringByName('aid');
		var uid = getQueryStringByName('uid')

		user.aid = aid;
		user.uid = uid;

		// alert(aid+'-'+uid);

		var qs = '?aid='+aid+'&uid='+uid+''

		$.getJSON(GET_Q_URL + qs,function(data){
			if(data.status == true){
				var obj = data.data;

				if(obj.user_id > 0){
					user.uid = obj.user_id;
					user.enable = true;
					alert('user enable');
				}else{
					user.uid = '0';
					user.enable = false;
				}
			}else{
				// alert('服务器返回status=false');
			}
			console.log(data);
			console.log(user);
		})

		init_questions();
})


function init_questions(){

	var url = 'http://2.dabuu.sinaapp.com/getquestions.php?aid=18e6255ebbf2d72f64625c63f29c600d&uid=o123127fsdouvpz'

	$.getJSON(url,function(data){
			var questions = data.data.questions;
			console.log(questions);


			if(data.data.is_ad){

			}

			$('title').html(data.data.name)

			$('#all_desc_pan').html(data.data.desc);

			$('#all_name_pan').html(data.data.name);
			$('#all_count_pan').html(data.data.count);



			$('#all_weixin_name_pan').html(data.data.weixinName);
			$('#all_weixin_id_pan').html(data.data.weixinId);


			total = questions.length

			$.each(questions,function(i){
				console.log(questions[i]);

				var currentQuestion = questions[i];

				var answerHtml = "";

				//(这里 是题目的类型， type =1 单选， type=2 多选)
				var type = currentQuestion.question_info.type


				$.each(currentQuestion.question_info.answers,function(j){
					var cAnswer = currentQuestion.question_info.answers[j];
					console.log(cAnswer);
					// {
	// 						"label":"注意没注意",
	// 						"is_answer":true
	// 					},
	//
					var data_score = 0;

					var answer_info = '';
					if(cAnswer.is_answer){
						data_score = 10;

						answer_info +="<span>答案</span>"
					}

					function iToChar(z){
						switch(z)
						{
							case 0:
							  return "A";
							  break;
							case 1:
							  return "B";
							  break;
							case 2:
							  return "C";
							  break;
							case 3:
							  return "D";
							  break;
							case 4:
							  return "E";
							  break;
							default:

						}
					}


					if(type == 1){
						// <li class='list-group-item' data-score='10' onclick='return toggle(this);'>
						// 	<i class='glyphiconsang glyphiconsang-unchecked'></i>
						// 	&nbsp;&nbsp; A 萨顶顶
						// </li>
						answerHtml += ""+"	<li class='list-group-item' data-score='10' onclick='return toggle(this);'>"
										+"		<i class='glyphiconsang glyphiconsang-unchecked'>"
										+ answer_info
										+"</i>&nbsp;&nbsp;"+iToChar(j)+" "+ cAnswer.label+" "
										+"	</li>";
					}


					if(type == 2){
						answerHtml += ""+"	<li class='list-group-item' data-score='10' onclick='return toggle_only(this);'>"
										+"		<i class='glyphiconsang glyphiconsang-unchecked'>"
										+ answer_info
										+"</i>&nbsp;&nbsp;"+iToChar(j)+" "+ cAnswer.label+" "
										+"	</li>";
					}


				});

				var extra = '';
				if(type == 2){
					extra +="<a class='btn btn-block' style='text-align: center;'  onclick='return next_btn(this);'>   	"
						+ "<image src='vendor/img/提交答案(选择).png'> "
						+ "</a>";
				}


				var html = "<div id='panel2' class='panel-body js_answer' data-type='1'		 style='display: none;padding-top:5px'>"
						+"<image src='vendor/img/answer_top.png' style='margin-left: -12px;'>"
				    +"<dl>"
					+"	<dd><p><font color='white' size='6'>"
					+" 看到那几个孩子在哪里藏老门二突然发现自己老了！藏老门是是弄啥了？"
					+"</font></p></dd>				"
				    +"</dl>"
				    +"<ul class='list-group js_group'>"
							+ answerHtml
					+"</ul>"
					+ extra
					+"</div>";

				$("#timu_shengcheng_container").append(html);
			});
		});

}
