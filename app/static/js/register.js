var $tel = document.querySelector('.tel');
var checkInput = {
	username(str) {
		var reg = /^\w{6,14}$/;
		return reg.test(str);
	},
	password(str) {
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
$tel.oninput = function() {
	var $p = this.nextElementSibling;
	console.log(1);
	if(this.value == '') {
		//    $p.className = 'text-danger bg-danger';
		$p.innerHTML = '请输入您的手机号';
	} else {
		// 调用对应的方法, 把文本值传入
		var bool = checkInput[this.name](this.value);
		if(bool) {
			// 验证成功
			//    $p.className = 'text-success bg-success';
			$p.innerHTML = '验证成功';
		} else {
			// 验证失败
			//   $p.className = 'text-danger bg-danger';
			//   $p.innerHTML = this.getAttribute('data-error');
			$p.innerHTML = '验证失败';
		}
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
	console.log($sub1,$sub2);
	var $biao1 = document.querySelector('.biao1');
	var $biao = document.querySelector('.biao1 .biao');
	var $biao2 = document.querySelector('.biao2');
	var $biao3 = document.querySelector('.biao1 .success');
	var $liAll = document.querySelectorAll('.header ul li');
	console.log($liAll);
	console.log($biao3);
//	console.log($sub1);
	var timer = 0;
	return {
		init: function() {
			this.event();
		},
		event: function() {
		
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

				console.log(1);
				timer = setInterval(function() {
					var left = $lock.offsetLeft;
					left = left - 1;
					console.log(left);

					if(left <= 0) {
						left = 0;
						clearInterval(timer);
					}
					$lock.style.left = left + 'px';
					//					left1 = left1 +'px';
				}, 10)

			}
               $sub1.onclick = function(){
				$biao.style.display = 'none';
				$biao2.style.display = 'block';
				$liAll[1].className = 'active';
			}
                 $sub2.onclick = function(){
				$biao.style.display = 'none';
				$biao2.style.display = 'none';
				$biao3.style.display = 'block';
				$liAll[2].className = 'active';
			}
               

		}

	}

}())
fn.init();