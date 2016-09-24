$(document).ready(function() {	
	setTimeout("move()",2000);
});
function move(){
	var c = $(".dot");
	function d(f) {
		for (var e = 0; e < c.length; e++) {
			c[e].className = "dot";
		}
		c[f].className = "dot current";
	}
	var b = new Swipe(document.getElementById("slider-banner"), {auto:5000, callback:function (g, f) {
		d(f);
	}});
	for (var a = 0; a < c.length; a++) {
		c[a].onclick = function () {
			var e = parseInt(this.getAttribute("index"), 10);
			d(e);
			b.slide(e, 300);
		};
	}
}

