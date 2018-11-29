var $tel = document.querySelector('.tel');
console.log($tel);
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
	var timer = 0;
	return {
		init: function() {
			this.event();
		},
		event: function() {

			$lock.onmousedown = function(ev) {
				console.log(1);
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

		}

	}

}())
fn.init();