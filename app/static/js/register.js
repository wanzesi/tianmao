var checkInput = {
	username(str) {
		var reg = /^\w{6,14}$/;
		return reg.test(str);
	},
	password(str) {
		var reg = /^\w{6,11}$/;
		return reg.test(str);
	},
	repassword(str) {
		var reg = /^\w{6,11}$/;
		return reg.test(str);
	},
	tel(str) {
		var reg = /^1[35789]\d{9}$/;
		return reg.test(str);
	},
	email(str) {

	}
}

function getStyle(ele, attr) {
	if(window.getComputedStyle) {
		return window.getComputedStyle(ele, false)[attr];
	}
	return ele.currentStyle[attr];
}
var timer = null;
var fn = (function() {
	var $lock = document.querySelector('.lock');
	var $kuang = document.querySelector('.kuang');
	var $sub1 = document.querySelector('.biao1 .biao .sub');
	var $sub2 = document.querySelector('.biao1 .biao2 .sub');
	var $biao1 = document.querySelector('.biao1');
	var $biao = document.querySelector('.biao1 .biao');
	var $biao2 = document.querySelector('.biao2');
	var $biao3 = document.querySelector('.biao1 .success');
	var $liAll = document.querySelectorAll('.header ul li');
	var $psd = document.querySelector('.biao1 .biao2 .password');
	var $repsd = document.querySelector('.biao1 .biao2 .repassword');
	//	console.log($sub1);
	var timer = 0;
	return {
		init: function() {
			this.event();
		},

		event: function() {
			//验证第一面的信息  满足条件后可以跳转第二面
			var $tel = document.querySelector('.tel');
			var $inputAll = document.querySelectorAll('.biao1 .biao2 input');
			console.log($inputAll);
			$tel.onblur = function() {
				var $p = this.parentNode.nextElementSibling;
				if(this.value == '') {
					$p.innerHTML = '请输入您的手机号';
				} else {
					// 调用对应的方法, 把文本值传入
					var bool = checkInput[this.name](this.value);
					if(bool) {
						$p.innerHTML = '验证成功';
						$sub1.onclick = function() {
							$biao.style.display = 'none';
							$biao2.style.display = 'block';
							$liAll[1].className = 'active';
						}

					} else {

						$p.innerHTML = '验证失败';
					}
				}
			}
			
			for(let i = 0; i < $inputAll.length; i++) {
				console.log($inputAll);
				$inputAll[i].onblur = function() {
					var $b = this.parentNode.nextElementSibling;
					console.log($b);
					if(this.value == '') {
						$b.innerHTML = '内容不可以为空';
					} else {
						// 调用对应的方法, 把文本值传入
						console.log(this.name, this.value);
						var bool = checkInput[this.name](this.value);
						if(bool) {
							$b.innerHTML = '验证成功';
						$sub2.onclick = function() {
				           $biao.style.display = 'none';
				           $biao2.style.display = 'none';
				           $biao3.style.display = 'block';
				           $liAll[2].className = 'active';
			     }

						} else {

							$b.innerHTML = '验证失败';
						}
					}
				}
				
				
			}
//			console.log(input['password']);
              $psd.addEventListener('blur' , function(){
              	 $repsd.onblur();
              	 console.log(11111);
              })
						// 第二次输入密码
				$repsd.onblur = function(){
              	  var $b = this.parentNode.nextElementSibling;
						console.log(2222);
						if(this.value == $psd.value) {
							$b.innerHTML = '验证成功';
              }else{
              	          $b.innerHTML = '密码不一致';
              }	}
						
              
			//  第一面的滑块
			$lock.onmousedown = function(ev) {
				ev = ev || window.event;
				var x = ev.offsetX;
				var y = ev.offsetY;
				$lock.clientWidth = getStyle($lock, 'width');
				$kuang.clientWidth = getStyle($kuang, 'width');
				console.log($kuang.clientWidth);
				var $maxL = $kuang.clientWidth - $lock.clientWidth;

				$kuang.onmousemove = function(ev) {
					ev = ev || window.event;
					var moveX = ev.pageX - $kuang.offsetLeft - x;

					console.log($lock.offsetLeft);
					if(moveX >= $maxL) {
						moveX = $maxL;
						$kuang.style.background = '#00FF00';
						$kuang.innerHTML = '验证成功';
						document.onmouseup = null;
						$kuang.onmousemove = null;
					}
					if(moveX < 0) {
						moveX = 0;
					}

					$lock.style.left = moveX + 'px';

				}

			}

			document.onmouseup = function(e) {
				e = e || window.event;
				$kuang.onmousemove = null;

				timer = setInterval(function() {
					var left = $lock.offsetLeft;
					left = left - 1;

					if(left <= 0) {
						left = 0;
						clearInterval(timer);
					}
					$lock.style.left = left + 'px';

				}, 10)

			}

			//满足条件后跳转第三面
		

		}

	}

}())
fn.init();