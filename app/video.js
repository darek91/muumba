function video(){
	var videoStream;
	var video = document.querySelector('video');
	video.style.display = 'block';
	var okno = new createjs.Container();
	stage.addChild(okno);
	var graphics = new createjs.Graphics().beginFill("#405261").drawRect(0,0, canvas.width, canvas.height);
	var te = new createjs.Shape(graphics);
	okno.addChild(te);
	var button= new createjs.Container();
	var graphics2 = new createjs.Graphics().beginFill("#f00").drawRect(0,0, 200, 30);
	var te2 = new createjs.Shape(graphics2);
	button.addChild(te2);
	bAnuluj=button.clone(1);
	bAnuluj.y=500;
	okno.addChild(bAnuluj);
	var text = new createjs.Text("Anuluj", "22px Arial", "#000");
	bAnuluj.addChild(text);
	bAnuluj.on("mousedown", function (evt) {
		stage.removeChild(okno);
		video.style.display = 'none';
		videoStream.stop();
	});

	/*bEfekt=button.clone(1);
	bEfekt.y=280;
	okno.addChild(bEfekt);
	bEfekt.addChild(new createjs.Text("Efekty", "22px Arial", "#000"));
	bEfekt.on("mousedown",changeFilter);*/

	bZdjecie=button.clone(1);
	bZdjecie.y=245;
	okno.addChild(bZdjecie);
	bZdjecie.addChild(new createjs.Text("Wykonaj zdjęcie!", "22px Arial", "#000"));
	bZdjecie.on("mousedown",snapshot);

	bDodaj=button.clone(1);
	bDodaj.y=480;bDodaj.x=300;
	okno.addChild(bDodaj);
	bDodaj.addChild(new createjs.Text("Dodaj zdjęcie", "22px Arial", "#000"));
	bDodaj.on("mousedown",function (){
		stage.removeChild(okno);
		video.style.display = 'none';
		loadImage(image.src);
		videoStream.stop();
	});
	bDodaj.visible=0;
	$('video').on("mousedown",snapshot);
	function successCallback(stream) {
		if (video.mozSrcObject !== undefined) {
			video.mozSrcObject = stream;
		} else {
			video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
		}
		videoStream = stream;
		video.play();
	}
	 
	function errorCallback(error) {
		console.error('An error occurred: [CODE ' + error.code + ']');
	}
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
	 
	if (navigator.getUserMedia ) {
		if(!navigator.getUserMedia.video) 
		navigator.getUserMedia({video: true}, successCallback, errorCallback);
	} else {
		console.log('It is not supported in your browser');
		alert("Funkcja niewspierana przez twoją przeglądarkę.")
	}
	var image = new Image();
	var bitmap = new createjs.Bitmap(image);
	bitmap.x=300;
	okno.addChild(bitmap);
	bitmap.on("mousedown", function (evt) {
		stage.removeChild(okno);
		video.style.display = 'none';
		loadImage(image.src);
		videoStream.stop();
	});
	/*var filters = ['grayscale', 'sepia', 'blur', 'brightness',
               'contrast', 'hue-rotate', 'hue-rotate2',
               'hue-rotate3', 'saturate', 'invert', ''];
    var idx = 0;
    video.classList.add('sepia');
    function changeFilter() {
    	console.log("zmiana efektu");
		var el = video;//e.target;
		video.className = '';
		var effect = filters[idx++ % filters.length]; // loop through filters.
		if (effect) {
	    	el.classList.add(effect);
		}
	}*/
	function snapshot() {
	  	var canvas = document.getElementById('dd');
	  	canvas.setAttribute("width", 640);
		canvas.setAttribute("height", 480);
		var ctx = canvas.getContext('2d'); 
	  	console.log("snapshot!");
	    ctx.drawImage(video, 0, 0);
	    image.src = canvas.toDataURL('image/webp');
	    bDodaj.visible=1;
		//loadImage(canvas.toDataURL('image/webp'))
	    // "image/webp" works in Chrome.
	    // Other browsers will fall back to image/png.
	}
}