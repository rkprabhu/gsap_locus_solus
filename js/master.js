// jQuery(document).ready(function($){
// 	var firstelement = $(".first-element");
// 	// var tl = new TweenLite();
// 	//alert("hi");
// 	TweenLite.fromTo(firstelement, 0.7, {y: 100, x:100 }, {y: 190, x:0 });
// })


(function($){
	var wrapper = $(".wrapper");
	var logo = $(".logo_img");
	var caption = $(".caption");
	var banner_img = $(".banner_img");
	var firstelement = $(".first-element");
	var links = $(".links");
	var buttons = $(".buttons button");
	var btnPlay = $("#btnPlay");
	var btnPause = $("#btnPause");
	var btnResume = $("#btnResume");
	var btnReverse = $("#btnReverse");
	var btnSpeedUp = $("#btnSpeedUp");
	var btnSlowDown = $("#btnSlowDown");
	var btnSeek = $("#btnSeek");
	var btnProgress = $("#btnProgress");
	var btnRestart = $("#btnRestart");
	var tl = new TimelineLite();
	var dot = $(".dot");
	var loader = $("#loader");
	var line = $("line");
	var i = 0;
	// var lineData = $("line");
	var svg = $("svg");
	var tlLoader = new TimelineMax({repeat:2, onComplete: loadContent});
	var svgLoader = new TimelineMax({onComplete: dataOrder});

// 	//alert("hi");
	// TweenLite.fromTo(logo, 0.7, {opacity:0, y: -50},  {opacity:0.3, y: 0, ease:  Power1.easeInOut, onStart: onStart, onUpdate: onUpdate, onComplete: onComplete });
	// TweenLite.fromTo(banner_img, 0.7, {opacity:0, x: 50}, {opacity:0.3, x: 0, ease:  Back.easeInOut.config(3) });
	// TweenLite.fromTo(firstelement, 0.7, {opacity:0, x: -50}, {opacity:0.3, x: 0, ease:  Back.easeInOut.config(3) });
	// TweenLite.fromTo(links, 0.7, {opacity:0, y: 50}, {opacity:0.3, y: 0, ease:  Back.easeInOut.config(3)});

	tl

		.from(logo, 0.3,  {opacity:0, y: -20, ease:  Power1.easeNone })
		.add("intro")
		.from(caption, 0.3, {opacity:0, y: -20, ease:  Power1.easeNone })
		.from(banner_img, 0.3, {opacity:0, y: -20, ease:  Power1.easeNone })
		.from(firstelement, 0.3, {opacity:0, y: -20, ease:  Power1.easeNone })
		.from(links, 0.3, {opacity:0, y: -20, ease:  Power1.easeNone}, "intro")
		// .staggerFrom(buttons, 0.2, {x:200, ease: Power1.easeOut}, 0.1);
		// .staggerFrom(buttons, 0.2, {opacity:0, cycle: {x:[100, -100]}, ease: Power1.easeOut}, 0.1);

	tlLoader
		.staggerFromTo(dot, 0.3, {y:0, opacity:0}, {y:20, opacity:1, ease: Back.easeInOut.config(2)}, 0.05)
		.fromTo(loader, 0.3, {opacity:1, scale:1.3}, {opacity:0, scale:1, ease:Power0.easeNone},0.9);

	svgLoader
		.staggerFromTo(line, 0.1,  {y:10, opacity:0},{y:0, opacity:1, ease: Back.easeInOut.config(1.5)},0.01)
		.fromTo(svg, 2.4, {opacity:0, scale:0.1, y:100}, {opacity:1,  scale:1, y:0, ease:Back.easeInOut},0.1,0)
		.set(wrapper, {opacity:1});
		// .staggerTo(line	, 0.5, {className:"active"},0.10);





	function dataOrder() {
		// var i=0;
		// var lineCount = $("line").length;
		// $("line").each(function(){
		// 	$("line[data-order="+i+"]").addClass("active");
		// 	var test = i++;
		// 	console.log(test);
		// })
		// i = test;
	}

	function loadContent() {
		var tlContent= new TimelineLite({onComplete: loadData});
		tlContent
			.set(dot, {backgroundColor: "#005849"})
			.to(loader, 0.3, {opacity:1, scale:1.3, ease:Power0.easeNone})
			.staggerFromTo(dot, 0.3, {y:0, opacity:0}, {y:20, opacity:1, ease: Back.easeInOut.config(2)}, 0.05)
			.to(loader, 0.3, {y:-100, opacity:0, ease:Power0.easeIn}, "+=0.3");

	}

	function loadData() {
		tl.play()
	}

	$('body').mousemove(function(event) {
		cx = Math.ceil($(window).width() / 2.0);
		cy = Math.ceil($(window).height() / 2.0);
		dx = (event.pageX - cx);
		dy = (event.pageY - cy) - $(window).scrollTop();
		tiltx = (dy / cy);
		tilty = - (dx / cx);
		radius = Math.sqrt(Math.pow(tiltx,2) + Math.pow(tilty,2));
		degree = (radius * 15);
		degree_2 = (radius * 20);

		TweenLite.to(".main_wrapper",3, {transform:'rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree_2 + 'deg)'});
		//TweenLite.to(".container article header,.title_fixed", 1.2, {transform:'rotate3d(' + tiltx*-1 + ', ' + tilty*-1 + ', 0, ' + degree_2 + 'deg)'});
		// TweenLite.to(".shadow", 1.2, { tra});
	});

	tl.pause();

	$("#btnPlay").on("click",function(){
		tl.play();
	});

	$("#btnPause").on("click",function(){
		tl.pause();
	});

	$("#btnResume").on("click",function(){
		tl.resume();
	});

	$("#btnReverse").on("click",function(){
		tl.reverse();
	});

	$("#btnSpeedUp").on("click",function(){
		tl.timeScale(2);
	});

	$("#btnSlowDown").on("click",function(){
		tl.timeScale(0.1);
	});

	$("#btnSeek").on("click",function(){
		tl.seek(0.5);
	});

	$("#btnProgress").on("click",function(){
		tl.progress(0.5);
	});

	$("#btnRestart").on("click",function(){
		tl.restart();
	});

	// $("#btnPlay").on("click",function(){
	// 	tl.play();
	// })
	// $("#btnPlay").on("click",function(){
	// 	tl.play();
	// })
	// $("#btnPlay").on("click",function(){
	// 	tl.play();
	// })

	function onStart(){
		console.log("animation on start");
	}

	function onUpdate(){
		console.log("animation is in progress");
	}

	function onComplete(){
		console.log("animation is complete");
	}
})(jQuery);
