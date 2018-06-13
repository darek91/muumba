iNapis=0;
function dodajEfekty (argLayer, jakosc) {
	//czekaj = new oknoCzekaj();
	if(!jakosc) jakosc = 1;
	argLayer.maEfekt=1;
	cm = new createjs.ColorMatrix();
	cm.adjustColor(argLayer.xx[8], argLayer.xx[9], argLayer.xx[10], argLayer.xx[11]);
    colorFilter = new createjs.ColorMatrixFilter(cm);
	argLayer.con.filters = [colorFilter,new createjs.ColorFilter(argLayer.xx[0], argLayer.xx[1], argLayer.xx[2], argLayer.xx[3], argLayer.xx[4], argLayer.xx[5], argLayer.xx[6], argLayer.xx[7])];
    var bounds = argLayer.con.getBounds();
    if(bounds) argLayer.con.cache(bounds.x,bounds.y, bounds.width, bounds.height,jakosc); else console.log("brak bounds"); 
    //console.log(bounds.x+"  "+bounds.y+"  "+bounds.width+"  "+ bounds.height);
    console.log("koniec dodajEfekty - jakosc: "+jakosc);
    //if(jakosc == 0.28) dodajEfekty(argLayer, 1);
    //czekaj.koniec();
}
function zapisCache (argLayer) {
	aaa=argLayer.con;
	aaa2=argLayer.name;
	licznik=0;ile=0;
	var image = new Image();
	var boundsObraz = argLayer.con.getBounds();
	if(aaa.getCacheDataURL() ){
		image.src =aaa.getCacheDataURL();
		image.onload = function (event) {
			console.log("wywolanie onload "+argLayer.name+" *");
    		var image = event.target;
    		//argLayer.con2=aaa;
    		aaa.removeAllChildren(1);
    		var bitmap = new createjs.Bitmap(image);
    		aaa.addChild(bitmap);
    		aaa.uncache();
    		argLayer.maEfekt=0;
    		argLayer.xx=[1,1,1,1,0,0,0,0,0,0,0,0];
    		bitmap.x=boundsObraz.x;
    		bitmap.y=boundsObraz.y;
    	}
    } else console.log("bez cache");
}
function suwakP(zmienna, min, max, cb){
	this.i=++iNapis;
	this.cc=new createjs.Container();
	var linia = new createjs.Graphics().beginFill("#F88").drawRect(10,12, 180, 5);
	linia = new createjs.Shape(linia);
	this.cc.addChild(linia);
	var kropka = new createjs.Graphics().beginFill("#F88").drawRect(10,12-5, 10, 15);
	kropka = new createjs.Shape(kropka);
	kropka.x=(eval(zmienna)*170)/(max-min)-(min*170)/(max-min)  +linia.x;
	this.cc.addChild(kropka);
	this.cc.y=iNapis*30;
	kropka.on("mousedown", function (evt) {
		this.offset = { x: this.x - evt.stageX};
	});
	kropka.on("pressmove", function (evt) {
		var pt = linia.globalToLocal(stage.mouseX, stage.mouseY);
		//console.log(pt.x, pt.y);
		if(pt.x>=15 && pt.x<=185 ){
			this.x = evt.stageX + this.offset.x;
			eval(zmienna+"=((this.x-linia.x)*(max-min) )/170+min;");
			//console.log(((this.x-linia.x)*(max-min) )/170+min);
			cb();
		}
	});
}
function opcje(){
	wylaczOlowek();
	okno = new oknoFull();
	formularz=$('<form id="utawieniaplutna" style="position:absolute; left:20px; top:100px;">    				Nazwa Pliku: <input type="text" id="nameFile" value="'+nameFile+'"/></br>			szerokość: <input type="text" id="szerokoscPlutna" value="'+plutnoW+'"/></br>    wysokość: <input type="text" id="wysokoscPlutna" value="'+plutnoH+'"/></br>   kolor tła: <input type="text" id="kolorPlutna" value="'+plutnoK+'"/></br> </form>').appendTo('body');
	function klik (argument) {
			plutnoK=$("#kolorPlutna").val(argument.kolor);
	}
	paleta = new paletaKolor(klik).con;
	paleta.y=200;
	okno.con.addChild(paleta);
	$('<input/>', {  
        'type': 'button',  
        'value': 'Zapisz',
        click: function(){  
            stage.removeChild(okno.con);
            nameFile=$("#nameFile").val();
            $("title").text("-"+nameFile)
            plutnoW=$("#szerokoscPlutna").val();
            plutnoH=$("#wysokoscPlutna").val();
            plutnoK=$("#kolorPlutna").val();
            plutnoT = new createjs.Graphics();
			plutnoT.beginStroke("#444");
			plutnoT.setStrokeStyle(1);
            plutnoT.beginFill(plutnoK).drawRect(0,0, plutnoW, plutnoH);
			plutnoT = new createjs.Shape(plutnoT);
			plutno.removeAllChildren();
			plutno.addChild(plutnoT);
			stage.update();
			formularz.remove();
        }  
    }).appendTo('#utawieniaplutna'); 
	bAnuluj = new przycisk("Anuluj",okno.con);
	bAnuluj.con.on("mousedown", function (evt) {
		stage.removeChild(okno.con);
		formularz.remove();
	});
    
}
function OpcjaNapis (name, miejsce, fun) {
	this.name=name;
	this.i=++iNapis;
	graphics = new createjs.Shape(new createjs.Graphics().beginFill("#a000f0").drawRect(0,0, 190, 25));
	this.text = new createjs.Text(this.name, "18px Arial", "#ff7700");
	this.warstwa = new createjs.Container();
	this.warstwa.addChild(graphics);
	this.warstwa.addChild(this.text);
	this.warstwa.y=30*this.i;
	miejsce.addChild(this.warstwa);
	this.warstwa.on("mousedown", fun);
}
function inicjacjaOpcji(){
	okno = new oknoBlok("Opcje");
	blokOpcje = okno.blok;
	blokOpcjeSrodek=okno.blokSrodek;
	function oknoNazwa() {
    	var nazwa = prompt('Podaj nową nazwę:', layerAkt.name);
        if (nazwa != null) {
            layerAkt.nName(nazwa);
        }
    }
    function efektAlpha() {
    	var nowa = prompt('Alpha', layerAkt.con.alpha);
        if (nowa != null) {
            layerAkt.con.alpha=nowa;
        }
    }
    maskaWlaczona=0;
    var xxx, yyy;
    function maska() {
    	if(!maskaWlaczona){
    		//pole.alpha=0.5;
    		maskaWlaczona=1;
    		wylaczOlowek();
    		//usuniecie filtru
    		var bb= layerAkt.con.getBounds();
    		layerAkt.con.filters=[];
    		
    		/*temp=layerAkt.conMask;
    		console.log(layerAkt.con);
    		layerAkt.conMask.setTransform(layerAkt.con);//layerAkt.con.transformMatrix;
    		console.log(layerAkt.conMask.transformMatrix);
    		layerAkt.conMask.addChild(temp);*/
    		layerAkt.conMask.scaleX=layerAkt.con.scaleX;
			layerAkt.conMask.scaleY=layerAkt.con.scaleY;

            layerAkt.conMask.x+=layerAkt.con.x+2*layerAkt.qq2.x;//*(1/layerAkt.con.scaleY);
			layerAkt.conMask.y+=layerAkt.con.y+2*layerAkt.qq2.y;//*(1/layerAkt.con.scaleY);
			console.log(layerAkt.conMask);
            layerAkt.conMask.rotation=layerAkt.con.rotation;
            //hitaera jeszcze
    		
    		pole.addChild(layerAkt.conMask);
    		layerAkt.con.uncache();
    		
    	} else {
    		var bb= layerAkt.con.getBounds();
    		pole.removeChild(layerAkt.conMask);
    		layerAkt.conMask.x-=layerAkt.con.x+2*layerAkt.qq2.x;//*(1/layerAkt.con.scaleY);
			layerAkt.conMask.y-=layerAkt.con.y+2*layerAkt.qq2.y;
    		var mask=layerAkt.conMask.clone(1);
    		//*(1/layerAkt.con.scaleY);
    		//var mask=layerAkt.conMask.clone(1);

    		//mask.scaleX=mask.scaleY=1/layerAkt.con.scaleY;
    		//mask.cache(layerAkt.con.x*(1/layerAkt.con.scaleY), layerAkt.con.y*(1/layerAkt.con.scaleY), bb.width, bb.height);
    		mask.cache(layerAkt.conMask.x*(1/layerAkt.con.scaleY), layerAkt.conMask.y*(1/layerAkt.con.scaleY), bb.width, bb.height);
    		layerAkt.con.filters=[
    			new createjs.AlphaMaskFilter(mask.cacheCanvas), 
    			//new createjs.AlphaMapFilter(mask.cacheCanvas)
    			];
    		layerAkt.con.cache(0, 0, bb.width, bb.height);
    		layerAkt.con.hitArea=layerAkt.conMask;
    		pole.alpha=1;
    		maskaWlaczona=0;
    	}
    }
    function efekty() {
    	odswiezOpcje = function () {
    		blokOpcjeSrodek.removeChild(blokEfekty);
    		efekty();
    	}
    	iNapis=0;
    	blokOpcjeSrodekGlowny.visible=0;
    	blokEfekty=new createjs.Container();
    	blokOpcjeSrodek.addChild(blokEfekty);
    	new OpcjaNapis('<--',blokEfekty, function () {
    		blokOpcjeSrodekGlowny.visible=1;
    		blokEfekty.removeAllChildren();
    		odswiezOpcje=function (){};
    	});
    	new OpcjaNapis('Przezroczystość',blokEfekty,efektAlpha);
    	var sPrzezrocz = new suwakP("layerAkt.con.alpha",0,1,function(){});
		blokEfekty.addChild(sPrzezrocz.cc);
		new OpcjaNapis('Efekty',blokEfekty,oknoOpcji);
    }
    blokOpcjeSrodekGlowny=new createjs.Container();
	o1 = new OpcjaNapis('Zmiana nazwy',blokOpcjeSrodekGlowny,oknoNazwa);
	o1 = new OpcjaNapis('Efekty',blokOpcjeSrodekGlowny,efekty);
	o1 = new OpcjaNapis('Maska',blokOpcjeSrodekGlowny,maska);
	blokOpcjeSrodek.addChild(blokOpcjeSrodekGlowny);
}
function oknoOpcji () {
	iNapis=0;
	wylaczOlowek();
	var obraz = new createjs.Container();
	kopia=layerAkt.con.clone(1);
	//kopia.x=0;kopia.y=0;
    obraz.addChild( kopia );
    var boundsObraz = obraz.getBounds();
    //console.log(boundsObraz);
    //kopia.x=-boundsObraz.x;
    //kopia.y=-boundsObraz.y;
    
    stare=layerAkt.xx;
    var okno = new oknoFull();
    okno=okno.con
    
	function filtrKolor(){
		if(boundsObraz){
			cm = new createjs.ColorMatrix();
		    //cm.adjustColor(brightnessValue, contrastValue, saturationValue, hueValue);
		    cm.adjustColor(layerAkt.xx[8], layerAkt.xx[9], layerAkt.xx[10], layerAkt.xx[11]);
		    colorFilter = new createjs.ColorMatrixFilter(cm);
		    obraz.filters = [colorFilter,new createjs.ColorFilter(layerAkt.xx[0], layerAkt.xx[1], layerAkt.xx[2], layerAkt.xx[3], layerAkt.xx[4], layerAkt.xx[5], layerAkt.xx[6], layerAkt.xx[7])];
		    
		    obraz.cache(boundsObraz.x,boundsObraz.y, boundsObraz.width, boundsObraz.height,0.70);
		    obraz.updateCache();
		    stage.update();
		} else console.log("brak podgladu brak bounds");
    }
    var graphics = new createjs.Graphics().beginFill(plutnoK).drawRect(0,0, canvas.width, canvas.height);
	var te = new createjs.Shape(graphics);
	var graphics = new createjs.Graphics().beginFill("#405261").drawRect(0,0, 200, canvas.height);
	var te2 = new createjs.Shape(graphics);
    okno2 = new createjs.Container();
    okno2.addChild(te2);
    oknoPodglad = new createjs.Container();
    oknoPodglad.x=200;
    
	okno.addChild(oknoPodglad);
	okno.addChild(okno2);
	oknoPodglad.addChild(te);
	oknoPodglad.addChild(obraz);
	oknoPodglad.on("mousedown", function (evt) {
		this.offset = {x: obraz.x - evt.stageX, y: obraz.y - evt.stageY};
	});
	oknoPodglad.on("pressmove", function (evt) {
		obraz.x = evt.stageX + this.offset.x;
		obraz.y = evt.stageY + this.offset.y;
	});
	button = new przycisk();
    button=button.con;
	
	bAnuluj=button.clone(1);
	bAnuluj.y=500;
	okno.addChild(bAnuluj);
	bAnuluj.addChild(new createjs.Text("Anuluj", "22px Arial", "#000"));
	bAnuluj.on("mousedown", function (evt) {
		layerAkt.xx=stare;
		stage.removeChild(okno);
	});
	bOk=button.clone(1);
	bOk.y=550;
	okno.addChild(bOk);
	bOk.addChild(new createjs.Text("Ok", "22px Arial", "#000"));
	bOk.on("mousedown", function (argument) {
		stage.removeChild(okno);
		stage.update();
		czekaj = new oknoCzekaj(function (argument) {
			dodajEfekty(layerAkt);
			zapisCache(layerAkt);
		});
	});
	var aa = new suwakP("layerAkt.xx[7]",-255,255,filtrKolor); okno2.addChild(aa.cc);
    var aa = new suwakP("layerAkt.xx[0]",0,1,filtrKolor); okno2.addChild(aa.cc);
	var aa = new suwakP("layerAkt.xx[1]",0,1,filtrKolor); okno2.addChild(aa.cc);
	var aa = new suwakP("layerAkt.xx[2]",0,1,filtrKolor); okno2.addChild(aa.cc);
	var aa = new suwakP("layerAkt.xx[3]",0,1,filtrKolor); okno2.addChild(aa.cc);
	var aa = new suwakP("layerAkt.xx[4]",-255,255,filtrKolor); okno2.addChild(aa.cc);
	var aa = new suwakP("layerAkt.xx[5]",-255,255,filtrKolor); okno2.addChild(aa.cc);
	var aa = new suwakP("layerAkt.xx[6]",-255,255,filtrKolor); okno2.addChild(aa.cc);

	var aa = new suwakP("layerAkt.xx[8]",-100,100,filtrKolor); okno2.addChild(aa.cc);
	var aa = new suwakP("layerAkt.xx[9]",-100,100,filtrKolor); okno2.addChild(aa.cc);
	var aa = new suwakP("layerAkt.xx[10]",-100,100,filtrKolor); okno2.addChild(aa.cc);
	var aa = new suwakP("layerAkt.xx[11]",-100,100,filtrKolor); okno2.addChild(aa.cc);
	new OpcjaNapis('Przywróć',okno2,function () {
		layerAkt.xx=[1,1,1,1,0,0,0,0,0,0,0,0];
		layerAkt.maEfekt=0;
		stage.removeChild(okno);
		oknoOpcji();
    });
    /*new OpcjaNapis('Zapisz na stałę',okno2,function () {
		zapisCache(layerAkt);
		stage.removeChild(okno);
    });*/
    filtrKolor();
}

function maska2() {
    	
    		var mask=new createjs.Shape(layerAkt.conMask);
    		mask.scaleX=mask.scaleY=1/layerAkt.con.scaleY;
    		//layerAkt.con.addChild( mask);
    		layerAkt.con.mask=mask
    		console.log(layerAkt.conMask);
    	
    }