var input;
var canvas, stage;
var pole, gui,rob, plutno;
var layers,okienka;
var blokLayers,blokLayersSrodek,blokOpcje;
var ii=0;ii2=0;
var layerAkt;
var roz,obr;
zmianyWielkosci=[];
tabPFOG=[];
plutnoW=640;
plutnoH=480;
var adresPlikProjekt;
plutnoK="#FFF";
kolor1="#000";
nameFile="BezNazwy";
zmiana=0;
var tlo;
var aktNor=1;
var currentUser;
function czyZapisac (fun) {
	if(zmiana==1){
		new oknoTA(fun,"Czy jesteś pewien? Wszystkie niezapisane zmiany zostaną utracone.");
} else fun();
}
odswiezOpcje=function () {}
window.status="***";
/*$(function(){
	$.contextMenu({
			selector: '.context-menu-one',
			callback: function(key, options) {
				if(key=='zapisz') save();
				if(key=='opcje') opcje();//jeszcze sprawdzenie czy istnieje plutno itd
					//var m = "clicked: " + key;
					//window.console && console.log(m) || alert(m);
			},
			items: {
				"zapisz": {name: "Zapisz", icon: "edit"},
					"opcje": {name: "Właściwości płutna", icon: "edit"},
					//"cut": {name: "Cut", icon: "cut"},
					//"copy": {name: "Copy", icon: "copy"},
					//"paste": {name: "Paste", icon: "paste"},
					//"delete": {name: "Delete", icon: "delete"},
					//"sep1": "---------",
					//"quit": {name: "Quit", icon: "quit"}
			}
	});
});
$('.context-menu-one').on('click', function(e){
		//console.log('clicked', this);
})*/
function resize_canvas(){
	if(window.innerWidth>150 && window.innerHeight>150 ){
		canvas.width  = window.innerWidth;
		canvas.height = window.innerHeight-75;
		for (var i=0; i<okienka.length; i++) {
			if(!okienka[i].dok) {
				if(okienka[i].blok.x>canvas.width) okienka[i].blok.x=canvas.width-202;
			}
		}
		odswiezOkienka();
		var graphics = new createjs.Graphics().beginFill("#405261").drawRect(0,0, canvas.width, canvas.height);
		var te = new createjs.Shape(graphics);
		tlo.addChildAt(te,0);
		for (var i = 0; i < zmianyWielkosci.length; i++)
		{
			zmianyWielkosci[i].fun()
		};
	}
	lpostepLadowania.x=canvas.width-200;
	lpostepLadowania.y=canvas.height;
}

function loadImage(adres,fun) {
var image = new Image();
image.crossOrigin = '';
image.ladowanie=new postepLadowania("Ładowanie pliku");
if(fun){
	image.fun=fun;
}
image.onload = handleFileComplete;
image.src = adres;
}
function handleFileComplete(event) {
	var image = event.target;
	var bitmap = new createjs.Bitmap(image);
	var bg = new layer;
	bg.con.addChild(bitmap);
	if(bitmap.image.width>plutnoW)
	bg.con.scaleX=bg.con.scaleY=(plutnoW)/bitmap.image.width;
	//bitmap.regX = bitmap.image.width / 2 | 0;
	//bitmap.regY = bitmap.image.height / 2 | 0;
	var adresPliku =event.target.src.split('/');
	var nazwa=adresPliku[adresPliku.length-1]
	if(nazwa.length<30 && adresPliku.length>2) bg.nName("_"+nazwa);
	stage.update();
	if(event.target.ladowanie) event.target.ladowanie.koniec();
	if(event.target.fun) event.target.fun();
}
function init() {
	layers = [];
	okienka = [];
	canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight-65;
	stage = new createjs.Stage(canvas);
	stage.enableMouseOver(3);
	gui = new createjs.Container();
	tlo = new createjs.Container();
	rob = new createjs.Container();
	listaGenLayers= new createjs.Container();
	var graphics = new createjs.Graphics().beginFill("#405261").drawRect(0,0, canvas.width, canvas.height);
	var te = new createjs.Shape(graphics);
	tlo.addChild(te);
	tlo.addChildAt(rob,1);
	//tlo.setChildIndex(rob,1);
	stage.addChildAt(tlo,0);
	stage.addChild(gui);
	blokLayersF();
	pole = new createjs.Container();

	createjs.Ticker.on("tick", stage);
	blokLeftF();
	newFile();
	inicjacjaOpcji();
	stage.update();
	lpostepLadowania=new createjs.Container();
	lpostepLadowania.x=canvas.width-200;
	lpostepLadowania.y=canvas.height;
	stage.addChild(lpostepLadowania);
	odswiezLog();
	document.getElementById("info").style.display="none";
	canvas.style.display="block";
}
