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
	var lineData = $("line");
	var svg = $("svg");
	var active
	// var tlLoader = new TimelineMax({repeat:2, onComplete: loadContent});

	var svgLoader = new TimelineMax({onComplete: ticking});
	var svgLo = new TimelineMax({onComplete: changeBg});

	svgLoader
		.staggerFromTo(line, 0.1,  {y:10, autoAlpha:0},{y:0, autoAlpha:1, ease: Back.easeInOut.config(1.5)},0.01)
		.fromTo(svg, 2.4, {opacity:0, scale:0.1, y:100}, {opacity:1,  scale:1, y:0, ease:Back.easeInOut},0.1,0)
		.set(svg, {className:"+=finish"})
		// .delay(5);
		// .staggerFromTo(line, 0.1,  {x:0, y: 0},{x:10, y:10, ease: Back.easeInOut.config(1.5)},0.05) 
		// .staggerFromTo(line, 0.1,  {x:10, y:10},{x:-10, y:-10, ease: Back.easeInOut.config(1.5)},0.05) 
		//.set(wrapper, {opacity:1});

		// svgLo
		// .staggerTo(lineData, 1, {y:8, x:7, ease:Elastic.easeOut.config(1.1, 0.4)}, 0.2);
		// .staggerTo(lineData	, 0.05	, {y:10, className:"active"},0.05);

function random_value() {
	$(".color").each(function(){
		$(this).css({"top": Math.random()+"%"});
		$(this).css({"left": Math.random()+"%"});
	})
}



// random_value();

		window.fast_dur = 0.5;
		window.normal_dur = 250;	
		window.rotation = false;
		window.duration_time = normal_dur;	
		window.arrVal = 0; 
		window.arrValColor = 0;

		
	function ticking() {

		function Timer(fn, t){

			var timerObj = setInterval(fn, t);

			this.stop = function() {
		        if (timerObj) {
		            clearInterval(timerObj);
		            timerObj = null;
		        }
		        return this;
		    }

		    this.start = function() {
		        if (!timerObj) {
		            this.stop();
		            timerObj = setInterval(fn, t);
		        }
		        return this;
		    }

		    this.reset = function(newT) {
		        t = newT;
		        return this.stop().start();
		    }
		}

		// window.t = window.setInterval(function(){
		// 	timeInterval();
		// }, duration_time);

		var timer = new Timer(function() {
		    // your function here
			timeInterval();
		}, duration_time);

		window.reversetimer = new Timer(function() {
		    // your function here			
			reversetimerFn();
		}, duration_time);

		reversetimer.stop();

		// if(svgLo.progress() > 0){
		// 	 svgLo.play();
		//  } else {
		// 	 svgLo.play(0); //reverses from the end
		//  }

		// window.duration_time = dur;
		
		window.isPaused = false;
		window.timetick = 0;
		window.data_order_pipe = "no";
		window.line_length= $(line).length;
		window.reverse_tick= false;
		window.reverse_rotation= false;
		

		var timeInterval = function() {

			if(rotation == true) {
				// clearInterval(t);
				duration_time = parseInt(fast_dur);	
				// t = window.setInterval(function(){
				// 	timeInterval();
				// }, duration_time);
				timer.reset(duration_time);

			}else {
				duration_time = parseInt(normal_dur);				
				// console.log(duration_time);
			}

			window.output = $('line[data-order='+timetick+']');
			console.log(reverse_tick + " - "+ reverse_rotation)
			if(!isPaused){
				if(!reverse_tick && !reverse_rotation){
					output.addClass("active");
					timetick++;	
				}else{
					timetick--;
				}
			}
			if(!isPaused && reverse_rotation == false) {
				
				// console.log(data_order_pipe);
				if(data_order_pipe == timetick && rotation == true ){
					if(!reverse_tick){
						console.log("hi");
						duration_time = parseInt(normal_dur);	
						timer.reset(duration_time);
						rotation = false;
					}
					if(timetick == 271 || reverse_tick == true){
						console.log("bhoo");
						// timetick--;
						// reversetimer.reset(fast_dur);
						timer.reset(fast_dur);
						reversetimerFn();
											
					}

					arrVal = output.attr("prod-color");
					arrValColor = output.attr("prod-color-line");
					// alert(arrVal);
					// alert("boaaaahhhaaa");

					getRandomPosition(arrVal);
					// svgLo.restart();
					
					// clearInterval(t);
					// rotation = false;
					// window.t = window.setInterval(function(){
					// 	timeInterval();
					// isPaused = false;
					// }, duration_time); 
				} else if(output.attr("data-mode") == "big" && output.next("line").length > 0 &&  rotation == false){
					if(!reverse_tick){
						console.log("bye");
						isPaused = true;
						updateRotation();
						arrVal = output.attr("prod-color");
						arrValColor = output.attr("prod-color-line");
						// alert("a" + arrVal);
						// alert("hhhaaa");
						getRandomPosition(arrVal);
					}	
					if(timetick == 271 || reverse_tick == true){
						// console.log(timetick);
						// timetick--;
						// reversetimer.reset(fast_dur);
						timer.reset(fast_dur);
						reversetimerFn();
											
					}	

					// svgLo.restart();


				} else if(reverse_rotation == true) {
					timer.reset(fast_dur);
					output.removeClass("active");

				} else {
					// if(timetick == 271){
					// 	timer.stop();						
					// }
					if(timetick == 271 || reverse_tick == true){
						console.log("woo");
						// timetick--;
						// reversetimer.reset(fast_dur);
						timer.reset(fast_dur);
						reversetimerFn();
											
					}			

				}
				
			}else if(reverse_rotation == true) {
				reverse_tick = false;
				timer.reset(fast_dur);
				output.removeClass("active");
				isPaused = false;
				console.log(reverse_rotation);

				if((data_order_pipe - 1) == timetick && rotation == true ){
					
						timer.reset(normal_dur);
						// output.removeClass("active");
						reverse_rotation = false;
						rotation = false;
						console.log(reverse_rotation);
						arrVal = output.next("line").attr("prod-color");
						arrValColor = output.attr("prod-color-line");
					// alert(arrVal);
					// alert(arrVal);

					getRandomPosition(arrVal);

						// getRestored();
				}
			} else {

			}
		}

		var reversetimerFn = function() {

			if(timetick == 271){
				// timer.stop();
				isPaused=true;
				setTimeout(function(){isPaused=false},2000)
				console.log("started");
				reverse_tick = true;	
				// timetick--;
				// reversetimer.start();					
			}		

			console.log(timetick);
			if(timetick < 0) {
				output.removeClass("active");
				console.log("started");
				// reversetimer.stop();
				timetick = 0;
				timer.stop();
				TweenMax.to(knob, 1, {rotation:timetick});
				setTimeout(function(){timer.reset(normal_dur);},2000);
				reverse_tick = false;


				arrVal = output.attr("prod-color");
				arrValColor = output.attr("prod-color-line");
				console.log(arrVal+"10001");
				getReverseRandomPosition(arrVal);
			}
			if(timetick <= 270){
				output.removeClass("active");
			}
		}

		// window.cars = ["blue", "yellow", "orange","green","#3f51b5", "gae", "yellow", "orange","green","#3f51b5",];

		function getRandomPosition(dataVal) {
			console.log(arrVal);
			if(reverse_rotation == false){
			// arrVal = 4;
				$(".bg_1").animate({left:randxPos(),top: randyPos()}, 500);
				$(".bg_2").animate({left:randxPos(),top: randyPos()}, 500);
				$(".bg_3").animate({left:randxPos(),top: randyPos()}, 500);
				$(".bg_4").animate({left:randxPos(),top: randyPos()}, 500);
				$(".bg_5").animate({left:randxPos(),top: randyPos()}, 500);
				$(".bg_6").animate({left:randxPos(),top: randyPos()}, 500);
				$(".color").css({ background: dataVal});
				$(".color").animate({width:"2000px", height:"2000px"}, 500, function(){
					$("body").css({backgroundColor: dataVal});
					$("line[data-mode='big']").css({stroke:arrValColor});
					document.documentElement.style.setProperty('--themeColor', arrValColor);

				});			
				$(".color").animate({ left: "50%", top:"50%", width:"0", height: "0"}, 1000);
			}
		}

		function getReverseRandomPosition(dataVal){
				var lastElementColor = $("line[data-mode='big']").first().attr("prod-color");
				$(".bg_1").animate({left:randxPos(),top: randyPos()}, 500);
				$(".bg_2").animate({left:randxPos(),top: randyPos()}, 500);
				$(".bg_3").animate({left:randxPos(),top: randyPos()}, 500);
				$(".bg_4").animate({left:randxPos(),top: randyPos()}, 500);
				$(".bg_5").animate({left:randxPos(),top: randyPos()}, 500);
				$(".bg_6").animate({left:randxPos(),top: randyPos()}, 500);
				$(".color").css({ background: lastElementColor});
				$(".color").animate({width:"2000px", height:"2000px"}, 500, function(){
					$("body").css({backgroundColor: dataVal});
					$("line[data-mode='big']").css({stroke:arrValColor});
					document.documentElement.style.setProperty('--themeColor', arrValColor);
				});			
				$(".color").animate({ left: "50%", top:"50%", width:"0", height: "0"}, 1000);
		}

		// function getRandomPosition() {
		// 	console.log(arrVal);
		// 	// arrVal = 4;
		// 	svgLo
		// 	.to(".bg_1",1,{left:randxPos(),top: randyPos()}, 0.1)
		// 	.to(".bg_2",1,{left:randxPos(),top: randyPos()}, 0.1)
		// 	.to(".bg_3",1,{left:randxPos(),top: randyPos()}, 0.1)
		// 	.to(".bg_4",1,{left:randxPos(),top: randyPos()}, 0.1)
		// 	.to(".bg_5",1,{left:randxPos(),top: randyPos()}, 0.1)
		// 	.to(".bg_6",1,{left:randxPos(),top: randyPos()}, 0.1)
		// 	.to(".color", 1,{css:{ opacity:1}}, 0.1)
		// 	.to(".color", 1,{css:{ width:"2000px", height:"2000px",  backgroundColor: arrVal }}, 1)
		// 	.set("body", {css:{backgroundColor: arrVal}}, "-=0.2")
		// 	// .to(".color",0.5, {css:{opacity: 1, left: "50%", top:"50%", width:"10px", height: "10px", backgroundColor: arrVal}}, 2)
		// }

		


		// window.t = window.setInterval(function(){
		// 	timeInterval();
		// }, duration_time);

		

		

		// var i=0;
		// var lineCount = $("line").length;
		// $("line").each(function(){
		// 	$("line[data-order="+i+"]").addClass("active");
		// 	var test = i++;
		// 	console.log(test);
		// })
		// i = test;
	}
	function changeBg() {

		// $("body").css({backgroundColor: "red"});
		// alert("why")
	}

	// function fast_ticking(time_dur) {
		
	// 	var t= window.setInterval(function() {
	// 		if(!isPaused) {
	// 			var output = $('line[data-order='+timetick+']');
	// 			output.addClass("active");
	// 			timetick++;	
	// 			if(output.attr("data-mode") == "big" && output.next("line").length > 0){
	// 				revIsPause = true;
	// 				updateRotation();
	// 			}
	// 		}
	// 	},10);

	// }

	function reverse_ticking(time_dur) {
		window.revIsPause = false;
		var t= window.setInterval(function() {
			if(!revIsPause) {
				var output = $('line[data-order='+timetick+']');
				output.addClass("active");
				timetick++;	
				if(output.attr("data-mode") == "big" && output.next("line").length > 0){
					revIsPause = true;
					updateRotation();
				}
			}
		},10);

	}

	
		
		// svgLo.pause();
		
	// }

	function getRestored(dataVal) {
		// svgLo
		// .to(".color", 1,{css:{opacity: 0}})
		// .to(".bg_1",1,{left:randxPos(),top: randyPos()}, 0.1)
		// .to(".bg_2",1,{left:randxPos(),top: randyPos()}, 0.1)
		// .to(".bg_3",1,{left:randxPos(),top: randyPos()}, 0.1)
		// .to(".bg_4",1,{left:randxPos(),top: randyPos()}, 0.1)
		// .to(".bg_5",1,{left:randxPos(),top: randyPos()}, 0.1)
		// .to(".bg_6",1,{left:randxPos(),top: randyPos()}, 0.1)
		// .to(".color", 1,{css:{width:"2000px", height:"2000px", backgroundColor: cars[1]}}, 1.2)
		// .add("stop1")
		// .to(".color",1,{css:{opacity: 1, left: "50%", top:"50%", width:"10px", height: "10px", backgroundColor: cars[dataVal]}}, "stop1")
	}

	function randxPos(){
		return random(0, ($(window).width()))+"px";
	}

	function randyPos(){
		return random(0, ($(window).height()))+"px";
	}

	function random(min, max) {
	  return min + Math.floor( Math.random() * (max - min));
	}

	// getRestored();

	//with jquery
	$('.pause').on('click', function(e) {
	e.preventDefault();
	isPaused = true;
	});

	$('.play').on('click', function(e) {
	e.preventDefault();
	isPaused = false;
	});

	function animateMiniPins() {

	}

	function onStart(){
		// console.log("animation on start");
	}

	function onUpdate(){
		// console.log("animation is in progress");
	}

	function onComplete(){
		// console.log("animation is complete");
	}


	var content = document.getElementById("content");
var knob = document.getElementById("knob");
// var maxScroll = content.scrollHeight - content.offsetHeight;
var needsRotationUpdate = false;
var sections = 5;

//when the user drags the knob, we must update the scroll position. We're using the special scrollProxy object of Draggable because it allows us to overscroll (normal browser behavior won't allow it to scroll past the top/bottom). 
function onRotateKnob() {
  // dragContent.scrollProxy.top(maxScroll * dragKnob.rotation / -360);
  // needsRotationUpdate = false;
  // console.log("onRotateKnob")
}

//this method updates the knob rotation, syncing it to wherever the content's scroll position is
function updateRotation() {
	var get_last_active = $("line.active:first").attr("data-order");

  // console.log(get_last_active);
  TweenMax.to(knob, 1, {rotation:get_last_active});
  // needsRotationUpdate = false;

   setTimeout(function(){ isPaused = false;}, 100)
  // console.log("updateRotation");
}

//if the user flicks/spins/drags with momentum, a tween is created, but if the user interacts again before the tween is done, we must kill that tweens (so as not to fight with the user). This method kills any tweens of the knob or the content's scrollProxy.
function killTweens() {
  // TweenLite.killTweensOf([knob, dragContent.scrollProxy]);
  // console.log("killTweens")
}
// content.addEventListener("mousewheel", killTweens);
// content.addEventListener("DOMMouseScroll", killTweens);

//whenever the content gets scrolled (like by using the mousewheel or dragging the content), we simply set a flag indicating we need to update the knob's rotation. We use a "tick" handler later to actually trigger the update because that optimizes performance since ticks happen on requestAnimationFrame and we want to avoid thrashing
// content.addEventListener("scroll", function() {
  // needsRotationUpdate = true;
// });
// TweenLite.ticker.addEventListener("tick", function() {
//   if (needsRotationUpdate) {
//     updateRotation();
//   }
// });

var rotationSnap = 30;
//create the knob Draggable
Draggable.create("#knob", {
  type:"rotation",
  throwProps:true,
   bounds:{minRotation:0, maxRotation:270},
   onThrowUpdate: function() {
    // console.log(this.endRotation);
 //    data_order_pipe = (this.endRotation+1);
 //    if(data_order_pipe != $("line.active:first").attr("data-order")) {
	//     rotation = true;
	// }else{
	// 	rotation = false;
	// }

    // duration_time = fast_dur;

  },
  onPress: function(){
  	TweenLite.set("#arc_path_1", {"opacity":1});
  	isPaused = true;
  	window.getOnPressRotation = this.Rotation;
  },
  onDrag: function(){
  	isPaused = true;
  },
  onRelease: function(){
  	TweenLite.set("#arc_path_1", {"opacity":0});
  	isPaused = false;

  	data_order_pipe = (this.endRotation+1);
  	console.log(data_order_pipe + (rotationSnap -1));
  	console.log(getOnPressRotation);
  	
    if(data_order_pipe != $("line.active:first").attr("data-order") ) {
    	if($('line[data-order='+(data_order_pipe-1)+']').hasClass("active") && $('line[data-order='+(data_order_pipe)+']').prev("line").hasClass("active") && $('line[data-order='+(data_order_pipe)+']').prevAll('line[data-order='+(data_order_pipe + (rotationSnap -1))+']').hasClass("active")) {
			    rotation = true;
				reverse_rotation = true;
				console.log("reverse_rotation");
		}else if(!$('line[data-order='+(data_order_pipe-1)+']').hasClass("active") ) {
				rotation = true;
				reverse_rotation = false;
				reverse_tick = false;
				console.log("rotation");
		}else {

		}
	}else{
		rotation = false;
	}
  },
  // onDragEnd: function(){
  // 	isPaused = false;
  // },
  // lockAxis:true,
  snap: function(endValue) {
  	console.log(Math.round(endValue / rotationSnap) * rotationSnap);
        //this function gets called when the mouse/finger is released and it plots where rotation should normally end and we can alter that value and return a new one instead. This gives us an easy way to apply custom snapping behavior with any logic we want. In this case, just make sure the end value snaps to 90-degree increments but only when the "snap" checkbox is selected.
        return Math.round(endValue / rotationSnap) * rotationSnap;
    
  },
  // snap:[10,50,200,450]
});

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



//grab the Draggable instances for the content and the knob, and store them in variables so that we can reference them in other functions very quickly. 
// var dragContent = Draggable.get(content);
// var dragKnob = Draggable.get(knob);

})(jQuery);



