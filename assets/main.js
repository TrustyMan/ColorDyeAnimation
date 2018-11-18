$('input[type="range"]').rangeslider({polyfill: false});

function onMix(){
	var y_s = document.getElementById("yellow_slider_input");
	var b_s = document.getElementById("blue_slider_input");
	var rgb1 = [255,255,0], rgb2 = [0, 0, 255];
	// The colors to blend
	var source = { r: 255, g: 255, b: 0, a: y_s.value/100.0 }
	var backdrop = { r: 0, g: 0, b: 255, a: b_s.value/100.0 }

	// This example shows the result of blending 'source' and 'backdrop' with the 'hue' blending mode, according to the W3C or Adobe spec
	// However the composite could also be calculated by 'saturation', 'color' or 'luminosity' mode
	var composite = { r: 0, g: 255, b: 0 }

	// The mentioned colour compositing formula as a function
	var colourCompositingFormula = function(as, ab, ar, Cs, Cb, Bbs) {
	    return (1 - (as / ar)) * Cb + (as / ar) * Math.round((1 - ab) * Cs + ab * Bbs);
	}

	// Calculate the opacity of the result
	var resultingAlpha = source.a + backdrop.a * (1 - source.a) // Adobe PDF Format Part 1 - page 331

	var result = {
	    // Adobe PDF Format Part 1 - page 328
	    r: colourCompositingFormula(source.a, backdrop.a, resultingAlpha, source.r, backdrop.r, composite.r),
	    g: colourCompositingFormula(source.a, backdrop.a, resultingAlpha, source.g, backdrop.g, composite.g),
	    b: colourCompositingFormula(source.a, backdrop.a, resultingAlpha, source.b, backdrop.b, composite.b),
	    a: resultingAlpha
	}
	var mixed_liquid = document.createElement("div");
	var m_color = "rgba("+result.r+", "+result.g+", "+result.b+", "+result.a+")";
	if(y_s.value == 0 && b_s.value == 0) m_color="white";
	mixed_liquid.style.backgroundColor = m_color;
	// console.log("rgba("+result.r+", "+result.g+", "+result.b+", "+result.a+")");
	// console.log(result);
	var mixed_water = document.getElementById("mixed_water");
	mixed_water.setAttribute("fill", m_color);
	if(isCanvasSupported()){
		var c = document.getElementById('waterfall');
		var cw = c.width = 30;
		var ch = c.height = 140;
		var ctx=c.getContext("2d");
		ctx.fillStyle = m_color;
		ctx.fillRect(0,0,10,100);
		// var waterfall = new waterfallCanvas(c, cw, ch, m_color);			  
		// setupRAF();
		// waterfall.init();
		var width = window.innerWidth;
		var height = window.innerHeight;
		console.log("xxx:",width, height);
		var c = document.getElementById('waterfall1');
		$(c).css("position", "fixed");
		$(c).css("left", width / 2 - width*1.5/12 - 50 + width / 96 + "px");
		$(c).css("top", height / 4 + height/8 + "px");
		var cw = c.width = 30;
		var ch = c.height = 140;
		var ctx=c.getContext("2d");
		ctx.fillStyle = "rgba("+source.r+","+source.g+","+source.b+","+y_s.value/100+")";
		ctx.fillRect(0,0,width/40,height/3);
		var c = document.getElementById('waterfall2');
		$(c).css("position", "fixed");
		$(c).css("left", width / 2 + width*1.5/12 + 50 + width * 5 / (12*8) + "px");
		$(c).css("top", height / 4 + height/8 + "px");
		var cw = c.width = 30;
		var ch = c.height = 140;
		var ctx=c.getContext("2d");
		ctx.fillStyle = "rgba("+backdrop.r+","+backdrop.g+","+backdrop.b+","+b_s.value/100+")";
		ctx.fillRect(0,0,width/40,height/3);
	}
}
$(document).ready(function(){
	function responsive(){
		var svg_tag = $(document.getElementsByTagName("svg"));
		var width = window.innerWidth;
		var height = window.innerHeight;
		var yellow_faucet = document.getElementById("yellow_faucet");
		var blue_faucet = document.getElementById("blue_faucet");
		var out_faucet = document.getElementById("out_faucet");
		var waterfall = document.getElementById('waterfall');
		$(yellow_faucet).css("position","fixed");
		$(blue_faucet).css("position","fixed");
		$(yellow_faucet).css("top", height / 4 + "px");
		$(yellow_faucet).css("left", width / 2 - width*1.5/12 - 50 + "px");
		$(yellow_faucet).css("width", width/12 + "px");
		$(yellow_faucet).css("height", height/8);
		$(blue_faucet).css("top", height / 4 + "px");
		$(blue_faucet).css("left", width / 2 + width*1.5/12 + 50 + "px");
		$(blue_faucet).css("width", width/12 + "px");
		$(blue_faucet).css("height", height/8);
		$(out_faucet).css("position", "relative");
		// $(out_faucet).css("width", width/25+"px");
		// $(out_faucet).css("height", height*3/40+"px");
		$(out_faucet).css("left", width/2+"px");
		$(out_faucet).css("top", -100+"px");
		$(waterfall).css("position", "relative");
		$(waterfall).css("left", width/2 + 85 + "px");
		$(waterfall).css("top", -100-20+"px");
		onMix();
	}
	responsive();
	window.addEventListener('resize', function(){
		responsive();
	});
});