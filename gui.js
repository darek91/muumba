iloscBlok=0;
function odswiezOkienka (argument) {
	var xx=0;
	function porownaj(b, a) {
    	return b.dok - a.dok;
	}
	okienka.sort(porownaj);
	for (var i=0; i<okienka.length; i++) {		    	
    	if(okienka[i].dok) {
    		okienka[i].blok.y=xx;
    		okienka[i].blok.x=canvas.width-203;
    		if(!okienka[i].ukrytyBlok) {xx+=340;} else xx+=20; 
    	}
	}
}
function oknoBlok (nazwa) {
	this.nazwa=nazwa;
	okienka.push(this);
	this.dok=1;
	if (!this.nazwa) {this.nazwa="nazwa"};
	this.blok = new createjs.Container();
	this.blok.y=20*iloscBlok++;
	gui.addChild(this.blok);
	this.blok.x=canvas.width-203;
	this.blokUp = new createjs.Container();
	this.blok.addChild(this.blokUp);
	var graphics = new createjs.Graphics();
	graphics.beginStroke("#333");
	graphics.setStrokeStyle(1);
	graphics.beginFill("#bbb").drawRect(-1,20, 202, 300);
	var srodek = new createjs.Shape(graphics);
	this.blokSrodek = new createjs.Container();
 	var mask = new createjs.Shape();
	mask.graphics.beginFill("#000").drawRect(0, 20, 200, 300);
	this.blokSrodek.height= 300;
	this.blokSrodek.mask=mask;
	this.blok.addChild(srodek);
	this.blok.addChild(this.blokSrodek);
	var graphics = new createjs.Graphics();
	graphics.beginStroke("#333");
	graphics.setStrokeStyle(1);
	graphics.beginFill("#999").drawRect(-2,0, 204, 20);
	var te = new createjs.Shape(graphics);
	this.blokUp.addChild(te);
	var text=new createjs.Text(this.nazwa, "12px Arial", "#000");
	text.y=4; text.x=5;text.maxWidth=150;
	this.blokUp.addChild(text);
	var suwak = new createjs.Graphics();
	suwak.beginStroke("#666");
	suwak.setStrokeStyle(1);
	suwak.beginFill("#999").drawRect(191,22, 8, 28);
	this.suwak = new createjs.Shape(suwak)
	this.blok.addChild(this.suwak);
	var th=this;
	this.suwak.on("mousedown", function (evt) {
			this.offset = { y: this.y - evt.stageY, yy: th.blok.y};
	});
	this.suwak.on("pressmove", function (evt) {
		var bounds = th.blokSrodek.getBounds();
		var pt = th.blokSrodek.globalToLocal(stage.mouseX, stage.mouseY);
		if(pt.y>=20 && pt.y<=380 && bounds){
			this.y = evt.stageY + this.offset.y;
			th.blokSrodek.y=-(this.y/400)*bounds.height;
			//th.hit.y=(this.y/400)*bounds.height;

		}
	});
	this.ukrytyBlok=0;
	this.mini = function () {
		if(!th.ukrytyBlok){
			for (obj in th.blok.children){
	    		th.blok.children[obj].visible=0;
			}
			th.blokUp.visible=1;
			th.ukrytyBlok=1;
		} else {
			for (obj in th.blok.children){
	    		th.blok.children[obj].visible=1;
			}
			th.ukrytyBlok=0;
		}
		odswiezOkienka();
	}
	this.blokUp.on("dblclick", this.mini);
	this.blokSrodek.on("mousedown", function (evt) {});
	this.blokUp.on("mousedown", function (evt) {
		this.parent.addChild(this);
		this.parent.offset = {x: this.parent.x - evt.stageX, y: this.parent.y - evt.stageY};
	});
	this.blokUp.on("pressmove", function (evt) {
		this.parent.x = evt.stageX + this.parent.offset.x;
		this.parent.y = evt.stageY + this.parent.offset.y;
	});
	this.blokUp.on("pressup", function (evt) {
		var bounds=0;
		if(th.dok==0 ) {
			if(canvas.width-170>th.blok.x && th.blok.x>canvas.width-230){
				//console.log("dokowanie"); 
				th.blok.x=canvas.width-203;
				var ostatnie=0;
				var j=0;
				th.dok=0;
				for (var i=0; i<okienka.length; i++) {
			    	
			    	if(okienka[i].dok) {
			    		//okienka[i].blok.getBounds().height
			    		j++;
			    		ostatnie=okienka[i];
			    		bounds = j*20-20; 
			    		//console.log(okienka[i].blok.getBounds() );}
			    	}
				    if(ostatnie) th.dok=ostatnie.dok+1; else th.dok=1;
					if(!bounds) bounds=0;
					//th.blok.y=bounds; console.log(th.blok.y);
				}
			}
		} else if(canvas.width-170<th.blok.x || th.blok.x<canvas.width-230) {th.dok=0;}
	odswiezOkienka();
	});
	this.blokDown = new createjs.Container();
	this.blok.addChild(this.blokDown);
	var graphics = new createjs.Graphics();
	graphics.beginStroke("#333");
	graphics.setStrokeStyle(1);
	graphics.beginFill("#999").drawRect(-1,-1, 202, 21);
	var te2 = new createjs.Shape(graphics);
	this.blokDown.addChild(te2);
	this.blokDown.y=320;
	this.mini();
}
function oknoFull (arg) {
	var th=this;
	if(!arg) arg=[];
	var okno = new createjs.Container();
	okno.on("mousedown", function (evt) {});
	stage.addChild(okno);
	var graphics = new createjs.Graphics().beginFill("#405261").drawRect(0,0, canvas.width*4, canvas.height*4);
	var te = new createjs.Shape(graphics);
	okno.addChild(te);
	this.content = new createjs.Container();
	okno.addChild(this.content);
	this.con = okno;
	this.con.alpha=0;
	if(arg.suwak){
		var linia = new createjs.Graphics();
		linia.beginStroke("#666");
		linia.setStrokeStyle(1);
		linia.beginFill("#bbb").drawRect(0,0, 10, canvas.height);
		linia = new createjs.Shape(linia);
		liniaC = new createjs.Container();
		liniaC.addChild(linia);
		liniaC.x=canvas.width-12;
		okno.addChild(liniaC);

		var suwak = new createjs.Graphics();
		suwak.beginStroke("#666");
		suwak.setStrokeStyle(1);
		suwak.beginFill("#999").drawRect(0,0, 10, 25);
		suwak = new createjs.Shape(suwak);
		suwak.on("mousedown", function (evt) {
				this.offset = { y: this.y - evt.stageY, yy: content.y};
		});
		liniaC.addChild(suwak);
		this.liniaC=liniaC;
		
		suwak.on("pressmove", function (evt) {
			var bounds = th.content.getBounds();
			//console.log(bounds)
			var pt = okno.globalToLocal(stage.mouseX, stage.mouseY);
			//this.y = evt.stageY + this.offset.y;
			if(pt.y>=20 && pt.y<=canvas.height && bounds){
				this.y = evt.stageY + this.offset.y;
				th.content.y=-(this.y/canvas.height)*(bounds.height);
			}
		});
		krzyzyk2 = new createjs.Graphics();
		krzyzyk2.beginStroke("#555");
		krzyzyk2.setStrokeStyle(1);
		krzyzyk2.beginFill("#66a").drawRect(0,0, 20, 20);
		var ico = new createjs.Text(icons["cancel-circled"], "22px fontello", "#000");

		krzyzyk2 = new createjs.Shape(krzyzyk2);
		krzyzyk2.alpha=0.45;
		krzyzyk = new createjs.Container();
		krzyzyk.addChild(krzyzyk2);
		krzyzyk.addChild(ico);
		krzyzyk.x=canvas.width-35;
		krzyzyk.y=0;
		okno.addChild(krzyzyk);
		krzyzyk.on("mousedown", function (evt) {
				th.zamknij();
		});
		this.krzyzyk=krzyzyk;
		this.suwak=suwak;
		this.funZW=new fZmianWielkosci(function (argument) {
			th.liniaC.x=canvas.width-12;
			th.krzyzyk.x=canvas.width-35;
		});
	} else this.suwak=0;
	createjs.Tween.get(this.con).to({alpha:1}, 450).call(function handleComplete() {
    		
    });
}
oknoFull.prototype.zamknij = function(first_argument) {
	var th=this;
	createjs.Tween.get(this.con).to({alpha:0}, 600).call(function handleComplete() {
    	stage.removeChild(this);
    	if(th.funZW) th.funZW.koniec();	
    });
};
function oknoFullP () {
	var okno = new createjs.Container();
	okno.on("mousedown", function (evt) {});
	stage.addChild(okno);
	var graphics = new createjs.Graphics().beginFill("#405261").drawRect(0,0, canvas.width*4, canvas.height*4);
	var te = new createjs.Shape(graphics);
	okno.addChild(te);
	okno.alpha = 0.05;
	okno.on("mousedown", function (argument) {});
	
	
	createjs.Tween.get(okno).to({alpha:0.75}, 700).call(handleComplete);
    function handleComplete() {   }
    this.con = okno;   
}
oknoFullP.prototype.zamknij = function(first_argument) {
	createjs.Tween.get(this.con).to({alpha:0}, 700).call(function handleComplete() {
    stage.removeChild(this);	
    });
};
function oknoCzekaj (fun, beze1) {
	okno = new oknoFullP();
	tekst=new createjs.Text(icons["hourglass"]+" Proszę czekać. Trwa ładowanie pliku", "18px fontello", "#000");
	tekst.x=((canvas.width-220))/2;
	tekst.y=((canvas.height-20))/2;
	okno.con.addChild(tekst)
	this.okno=okno;
	if(!beze1) stage.update();
	var th=this;
	if(!beze1) this.e1=stage.addEventListener("drawend", handleTick);
	function handleTick(event) {
	 	if(!beze1) th.koniec();
	 	if(fun) fun();
	}
	
}
oknoCzekaj.prototype.koniec = function(first_argument) {
	stage.removeChild(this.okno.con);
	if(this.e1) stage.removeEventListener("drawend", this.e1);
	stage.update();
};
function oknoTA (fun,tekst) {
	th=this;
	this.ofp=new oknoFullP();
	this.okno = new createjs.Container();
	this.okno.on("mousedown", function (evt) {});
	stage.addChild(this.okno);
	var g2 = new createjs.Graphics();
	g2.setStrokeStyle(1);
 	g2.beginStroke("#555");
	g2.beginFill("#aaa").drawRoundRect(0,0, 410, 155,4);
	var te = new createjs.Shape(g2);
	this.okno.addChild(te);
	if(!tekst) tekst= "Czy jesteś pewien?";
	tekst=new createjs.Text(tekst, "18px Arial", "#000");
	tekst.lineWidth=380;
	tekst.maxWidth=380;
	this.okno.addChild(tekst);
	tekst.x=20;tekst.y=20;
	pAnuluj = new przycisk(icons["cancel"]+" Anuluj",this.okno);
	var th=this;
	pOk = new przycisk(icons["ok"]+" Ok",this.okno);
	pOk.con.on("mousedown", function (evt) {
		stage.removeChild(th.con);
		//stage.removeChild(th.ofp.con);
		th.ofp.zamknij();
		this.funZmian=function() {};
		fun();
	});
	pOk.con.y=120;pOk.con.x=10;
	this.con = this.okno;
	pAnuluj.con.on("mousedown", function (evt) {
		th.ofp.zamknij();
		this.funZmian=function() {};
		stage.removeChild(th.con);
		
		//stage.removeChild(this.ofp.con);
	});
	pAnuluj.con.y=120;pAnuluj.con.x=210;
	this.okno.x=((canvas.width-410))/2;
	this.okno.y=((canvas.height-155))/2;
	var th=this;
	this.funZmian = new fZmianWielkosci(function () {
		th.okno.x=((canvas.width-410))/2;
		th.okno.y=((canvas.height-155))/2;
	});
}
function przycisk (tekst,miejsce) {
	var button= new createjs.Container();
	var g2 = new createjs.Graphics();
	g2.setStrokeStyle(1);
 	g2.beginStroke("#082567");
	g2.beginFill("#8AA4B7").drawRoundRect(0,0, 190, 30,2);
	var te2 = new createjs.Shape(g2);
	var g3 = new createjs.Graphics();
	g3.setStrokeStyle(1);
 	g3.beginStroke("#00f");
	g3.drawRoundRect(-2,-2, 194, 34,2);
	this.te3 = new createjs.Shape(g3);
	button.addChild(te2);
	button.cursor ="pointer";
	tekst=new createjs.Text(tekst, "20px fontello", "#000");
	tekst.x=5; tekst.y=4;
	if(tekst) button.addChild(tekst);
	if(miejsce) miejsce.addChild(button);
	var th=this;
	button.on("mouseover",function (evt) {
		this.addChild(th.te3);
	});
	button.on("mouseout",function (evt) {
		this.removeChild(th.te3);
	});
	this.con = button;
}
ww=0;
function kwadrat(i,j,paleta,klik){
	this.i=i;
	this.j=j;
	this.ww=ww++;
	this.kolor="#"+this.j+"0"+this.i+"000";
	this.graphics = new createjs.Graphics().beginFill(this.kolor).drawRect(i*17,j*17, 15, 15);
	this.te = new createjs.Shape(this.graphics);
	var th=this;
	this.con = new createjs.Container();
	this.con.addChild(this.te);
	paleta.addChild(this.con);
	this.con.on("mousedown", function (evt) {
		klik(th);
	});
}

function paletaKolor (klik) {
	ww=0;
	var paleta = new createjs.Container();

	for (var j = 0; j < 10; j++) {
		for (var i = 0; i < 10; i++) {
			new kwadrat(i,j,paleta,klik);
		};
	}
	this.con = paleta;
	
}
function obr2(co, kolor) {
	var bb = co.getBounds();
	if(bb){
		//console.log("test");
		var graphics = new createjs.Graphics();
		if(!kolor)kolor="#7f7";
		graphics.beginStroke(kolor);
		graphics.setStrokeStyle(1);
		graphics.drawRect(0,0, bb.width, bb.height);
		//console.log(bb2.x+" "+" "+bb.x+" "+bb2.y+" "+" "+bb.y+" "+" "+ bb.width+" "+ bb.height)
		var te = new createjs.Shape(graphics);
		te.x=co.x+rob.x;
		te.y=co.y+rob.y;
		//layerAkt.con.addChild(te);
		stage.addChild(te);
	}
}
function pOknoGlowne(text,okno,fun){
	var button= new createjs.Container();
	var graphics2 = new createjs.Graphics().setStrokeStyle(1).beginStroke("#555").beginFill("#f00").drawRect(0,0, 100, 100);
	var te2 = new createjs.Shape(graphics2);
	button.addChild(te2);
	this.con=button;
	
	var text = new createjs.Text(text, "22px Arial", "#000");
	text.x=(100-90)/2;
	button.addChild(text);
	button.cursor ="pointer";
	okno.addChild(this.con);
	button.on("mousedown",function (argument) {
		cos=new oknoCzekaj(fun);
		//fun()
	});
}
function pFileOknoGlowne(text,okno,object,file){
	//file=object.get('file').url();
	//if(!tabPFOG) tabPFOG=[];
	this.sort=0;
	tabPFOG.push(this);
	this.okno=okno;
	mini=object.get('mini').url();
	this.file=file;
	var id=object.id;
	var th=this;
	var button= new createjs.Container();
	var graphics2 = new createjs.Graphics().beginFill("#911").drawRect(0,0, 100, 100);
	var te2 = new createjs.Shape(graphics2);
	button.addChild(te2);
	var image = new Image();		
	//localStorage.getItem(  );
	var belka = new createjs.Shape(new createjs.Graphics().beginFill("#11a").drawRect(0,103, 100, 18));
	belka.alpha=0.55;
	belka.cursor="pointer";
	var ico = new createjs.Text(icons["ellipsis"]+" ", "12px fontello", "#000");
	var text = new createjs.Text(" "+text+" ", "12px fontello", "#000");
	var dol= new createjs.Container();
	dol.addChild(belka);
	dol.addChild(text);
	dol.addChild(ico);
			
	text.maxWidth=87;
	text.y=105;
	ico.y=105;
	ico.x=88;
	this.object=object;
	if(mini!='') {
		image.crossOrigin = '';
		image.src = mini;//localStorage.getItem(file);
		image.onload = function (event) {
			var image = event.target;
			var bitmap = new createjs.Bitmap(image);
			button.addChild(dol);
			bitmap.cursor ="pointer";
			bitmap.alpha = 0;
			button.addChild(bitmap);
		    createjs.Tween.get(bitmap).wait(100).to({alpha:1, visible:true}, 1000).call(handleComplete);
		    function handleComplete() {
		        //Tween complete
		    }
			bitmap.on("mousedown",function (argument) {
				new oknoCzekaj(function (argument) {
					stage.removeChild(okno);
					loadFile(file,id);
				});	
			});
			dol.on("mousedown",function (argument) {
				new menuPodreczne(th);
			});
		};
	};
	this.con=button;
	this.okno.addChild(this.con);
}
pFileOknoGlowne.prototype.kasuj = function  (argument) {
	this.okno.removeChild(this.con);
	for (var i=0; i<tabPFOG.length; i++) {
    	if(tabPFOG[i]==this){ 
			this.sort=-1000;
			/*for (var i=i-1; i>-1; i--) {
				layers[i].sort=layers[i].sort-1;
			}*/
			//sortWarstwy(layers);
			
		}
	}
	function porownaj(a, b) {
    	return  b.sort - a.sort;
	}
	tabPFOG.sort(porownaj);
	tabPFOG.pop();
	var tablica=tabPFOG;
	for (var i=0; i<tablica.length; i++) {
		createjs.Tween.get(tablica[i].con).to({x:i*120+100,y:tablica[i].con.y},1000,createjs.Ease.backInOut);
		//tablica[i].con.x=i*120+100;
    }
}
pFileOknoGlowne.prototype.odswiez = function  (argument) {
	console.log("odswiezenie");
}
function uwaga (tekst) {
	this.ofp=new oknoFullP();
	var okno = new createjs.Container();
	okno.on("mousedown", function (evt) {});
	stage.addChild(okno);
	var g2 = new createjs.Graphics();
	g2.setStrokeStyle(1);
 	g2.beginStroke("#555");
	g2.beginFill("#aaa").drawRoundRect(0,0, 410, 155,4);
	var te = new createjs.Shape(g2);
	okno.addChild(te);
	if(!tekst) tekst = " Uwaga!";
	var ico = new createjs.Text(icons["attention"], "12px fontello", "#000");
	ico.x=390;ico.y=5;
	okno.addChild(ico);
	tekst=new createjs.Text(tekst, "18px Arial", "#000");
	tekst.lineWidth=380;
	tekst.maxWidth=380;
	okno.addChild(tekst);
	tekst.x=20;tekst.y=20;
	pAnuluj = new przycisk(icons["ok"]+" OK",okno);
	var th=this;
	this.con = okno;
	pAnuluj.con.on("mousedown", function (evt) {
		stage.removeChild(th.con);
		stage.removeChild(th.ofp.con);
	});
	pAnuluj.con.y=120;pAnuluj.con.x=410-200-200/2;
	okno.x=((canvas.width-410))/2;
	okno.y=((canvas.height-155))/2;
}
function fZmianWielkosci (fun) {
	this.fun=fun;
	zmianyWielkosci.push(this);
}
fZmianWielkosci.prototype.koniec = function(first_argument) {
	this.fun=function() {};
	//ladniejszy sposob skasowania rekordu!
};
ipostepLadowania=0;
tpostepLadowania=[]
var lpostepLadowania;
function postepLadowania (text) {
	this.text = new createjs.Text("#"+ipostepLadowania+" "+text, "18px Arial", "#ff7700");
	lpostepLadowania.addChild(this.text);
	tpostepLadowania["p"+ipostepLadowania]=this;
	this.iel="p"+ipostepLadowania;
	ipostepLadowania++;
	var x=1;
	for (i in tpostepLadowania) {
		tpostepLadowania[i].text.y=-30*x++;
	};
	stage.update();

}
postepLadowania.prototype.koniec = function(first_argument) {
	lpostepLadowania.removeChild(this.text);
	delete tpostepLadowania[this.iel];
	var x=0;
	for (i in tpostepLadowania) {
		tpostepLadowania[i].text.y=-30*x++;
	}

};
function przyciskNext (tekst,miejsce) {
	var button= new createjs.Container();
	var g2 = new createjs.Graphics();
	g2.setStrokeStyle(1);
 	g2.beginStroke("#000000");
	g2.beginFill("#5B5D74").drawRoundRect(1,1, 98, 98,2);
	var te2 = new createjs.Shape(g2);
	button.addChild(te2);
	tekst=new createjs.Text(tekst, "20px fontello", "#000");
	tekst.x=5; tekst.y=4;
	if(tekst) button.addChild(tekst);
	if(miejsce) miejsce.addChild(button);
	button.cursor ="pointer";
	this.con = button;
}
function menuPodreczne(par) {
	var th=this;
	this.object=par;
	i=1;
	this.con = new createjs.Container();
	this.con.x=par.con.x;
	this.con.y=par.con.y+100;
	opcja = new opcjaMenu(icons["trash"]+" usuń",this.con,usunProjekt,i++,this.object);
	opcja = new opcjaMenu(icons["paragraph"]+" zmień nazwę",this.con,uwaga,i++);
	opcja = new opcjaMenu(icons["cog"]+" opcje",this.con,uwaga,i++);
	opcja = new opcjaMenu(icons["download"]+" pobierz",this.con,uwaga,i++);
	opcja = new opcjaMenu(icons["info"]+" info",this.con,uwaga,i++);
	stage.addChild(this.con);
	this.con.on("mouseout",function (evt) {
		stage.removeChild(th.con);
	});
	
}
function opcjaMenu (text,gdzie,fun,i,object) {
	var th=this;
	this.object=object;
	//console.log(this.object);
	graphics = new createjs.Shape(new createjs.Graphics().beginFill("#33d").drawRect(0,0, 100, 20));
	this.g2 = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("#000000").drawRect(-1,-1, 102, 22));
	this.text = new createjs.Text(" "+text, "13px fontello", "#aaa");
	this.text.y=2;
	/*this.text.lineWidth=12;*/
	this.opcja=new createjs.Container();
	this.opcja.addChild(graphics);
	this.opcja.addChild(this.text);
	gdzie.addChild(this.opcja);
	this.opcja.y=20*i;
	this.opcja.cursor ="pointer";
	this.opcja.on("mouseout",function (evt) {
		//this.removeChild(th.g2);
	});
	this.opcja.on("mouseover",function (evt) {
		//this.addChild(th.g2);
	});
	this.opcja.on("click",function f1 (argument) {
		fun(th.object);
	});
}
function getIcon (name, px,wid) {
	if(!name) name="block";
	if(!px) px="20";
	if(!wid) wid=px;
 	tekst=new createjs.Text(icons[name], px+"px fontello", "#000");
 	tekst.lineHeight=px;
 	tekst.maxWidth=px;
 	this.con=tekst;
 	tekst.x=(wid-px)/2;
 	//console.log(tekst.x);
 	//return tekst;
}
function icoLeft (name,px, wid) {
	if(!px) px=23;
	ico=new getIcon(name, px, wid).con;
	var blok = new createjs.Graphics().beginFill("#ccc").drawRect(0,0, px+2, px+2);
	var blok = new createjs.Shape(blok);
	var icoBlock = new createjs.Container();
	icoBlock.addChild(blok);
	icoBlock.addChild(ico);
	if(!wid){ico.x=2;}
	icoBlock.cursor ="pointer";
	return icoBlock;
}
function pImageFb (image,i,b,c,okno2,response,funZW,okno) {
	var th=this;
	var bitmap = new createjs.Bitmap(image);
	var a=new createjs.Container();
	bitmap.alpha = 0;
    createjs.Tween.get(bitmap).wait(450).to({alpha:1, visible:true}, 1100).call(handleComplete);
    function handleComplete() {
        //Tween complete
    }
	a.addChild(bitmap);
	//a.scaleY=a.scaleX=0.3;
	a.x=150+110*b;
	a.y=50+110*c;
	if(image.width>image.height)
		bitmap.scaleX=bitmap.scaleY=100/image.height;
	else bitmap.scaleX=bitmap.scaleY=100/image.width;
	var mask = new createjs.Shape();
	mask.graphics.beginFill("#000").drawRect(a.x, a.y, 100, 100);
	//var mask = new createjs.Shape(shape.graphics);
	a.mask=mask;
	var hit = new createjs.Shape();
	hit.graphics.beginFill("#000").drawRect(0, 0, 100, 100);
	a.hitArea=hit;
	a.cursor ="pointer";
	okno2.addChild(a);
	a.setBounds(0,0,100,100);
	a.on("mousedown", function (evt) {
		th.okienko=new oknoNormal({
			name:"Zdjęcie z Facebooka",
			w:"600",
			h:"550",
			p:[
				{text:"Dodaj",typ:"ok"},
				{text:"Anuluj",typ:"anuluj"},	
			]
		},function function_name (evt) {
			loadImage(response.data[i].images[0].source);
			stage.removeChild(okno);
			funZW.koniec();
			this.zamknij();

		});
		th.image = new Image();
		th.image.crossOrigin = '';
		//image.ladowanie=new postepLadowania("Ładowanie pliku");
		/*if(fun){
			image.fun=fun;
		}*/
		th.image.onload = function function_name (argument) {
			var image = event.target;
			var bitmap = new createjs.Bitmap(image);
			if(image.width>th.image.height)
				bitmap.scaleX=bitmap.scaleY=445/image.width;
			else bitmap.scaleX=bitmap.scaleY=445/image.height;
			image.src = response.data[i].images[1].source;
			//bitmap.x=15;
			bitmap.y=50;
			th.okienko.content.addChild(bitmap);
		};
		th.image.src = response.data[i].images[1].source;
	});
	a.on("mouseover",function (evt) {
		//this.addChild(th.te3);
	});
	a.on("mouseout",function (evt) {
		//this.removeChild(th.te3);
	});
	this.a=a;
}
function oknoNormal (arg,funOk) {
	var th=this;
	if(arg.w) w=arg.w*1; else w=400;
	if(arg.h) h=arg.h*1; else h=300;
	this.ofp=new oknoFullP();
	this.okno = new createjs.Container();
	this.okno.on("mousedown", function (evt) {});
	stage.addChild(this.okno);
	var g2 = new createjs.Graphics();
	g2.setStrokeStyle(1);
 	g2.beginStroke("#555");
	g2.beginFill("#aaa").drawRoundRect(0,0, w, h,4);
	var te = new createjs.Shape(g2);
	this.okno.addChild(te);
	this.content = new createjs.Container();
	this.content.y=15;this.content.x=15;
	this.okno.addChild(this.content);
	if(arg.text) {
		tekst=new createjs.Text(arg.text, "18px Arial", "#000");
		tekst.lineWidth=w-30;
		tekst.maxWidth=w-30;
		this.content.addChild(tekst);
		tekst.x=20;tekst.y=20;
	}
	function pOknoNormal (th,arg,fZam,fun) {
		//pAnuluj = new przycisk(icons["cancel"]+" Anuluj",this.okno);
		//var th=this;
		if(arg.typ=="ok") {ico=icons["ok"];}
		else if(arg.typ=="anuluj") {ico=icons["cancel"];}
		else ico='';
		this.p = new przycisk(ico+arg.text,th.okno);
		this.p.con.on("mousedown", function (evt) {
			//stage.removeChild(th.okno);
			//stage.removeChild(ofp.con);
			//this.funZmian=function() {};
			if(fZam) fZam(th);
			if(arg.typ && arg.typ!='anuluj' && fun) fun(th);
		});
		if(arg.y) this.p.con.y=arg.y;
		if(arg.x) this.p.con.x=arg.x;
	}
	if(arg.p){
		var odl=((w-190*arg.p.length)/(arg.p.length+1));
		for (var i=0; i < arg.p.length; i++) {
			//if(arg.p[i].typ=="anuluj")  f=this.zamknij;
			//else if(arg.p[i].typ=="ok") f=funOk;
			new pOknoNormal(this,{
				text: arg.p[i].text,
				typ: arg.p[i].typ,
				x:i*(190+odl)+odl,
				y:h-35
			},function function_name () {
				th.zamknij();
			} ,funOk);
		};
	}
	this.ico = new createjs.Text(icons["cancel-circled"], "19px fontello", "#000");
	this.ico.x=w-20;this.ico.y=5;
	this.okno.addChild(this.ico);
	this.ico.on("mousedown",function (argument) {
		th.zamknij();
	} );
	/*pAnuluj = new przycisk(icons["cancel"]+" Anuluj",this.okno);
	var th=this;
	pOk = new przycisk(icons["ok"]+" Ok",this.okno);
	pOk.con.on("mousedown", function (evt) {
		stage.removeChild(th.con);
		stage.removeChild(ofp.con);
		this.funZmian=function() {};
		funOk();
	});
	pOk.con.y=h-35;pOk.con.x=15;
	this.con = this.okno;
	pAnuluj.con.on("mousedown", function (evt) {
		this.funZmian=function() {};
		stage.removeChild(th.con);
		stage.removeChild(ofp.con);
	});
	pAnuluj.con.y=h-35;pAnuluj.con.x=w-190-15;
	*/
	this.okno.x=((canvas.width-w))/2;
	this.okno.y=((canvas.height-h))/2;
	var th=this;
	this.funZmian = new fZmianWielkosci(function () {
		th.okno.x=((canvas.width-w))/2;
		th.okno.y=((canvas.height-h))/2;
	});
}
oknoNormal.prototype.zamknij = function(th) {
	//console.log(typeof(th));
	//if(!th || th.parent ) th=this; 
	this.funZmian=function() {};
	//if(th && th.ofp && th.ofp.zamknij) th.ofp.zamknij();
	if(this.ofp && this.ofp.zamknij) this.ofp.zamknij();
	
	stage.removeChild(this.okno);
};

/*
	var htmlElement = document.createElement('i'); //tworzymy nowego Diva
	htmlElement.id = 'icon-facebook-squared';
	htmlElement.setAttribute('class', 'icon-facebook-squared');
	htmlElement.innerHTML="test";
	htmlElement.setAttribute('style',"left:10px; top:10px;");
	conIcon = document.getElementById('body');
	conIcon.appendChild(htmlElement);
	var domElement = new createjs.DOMElement("icon-facebook-squared");
*/
var icons=new Array();
icons['spin3']='';
icons['spin2']='';
icons['reply']='';
icons['forward']='';
icons['eye-off']='';
icons['minus-squared']='';
icons['star-empty']='';
icons['star']='';
icons['th-list']='';
icons['download']='';
icons['ok']='';
icons['link-ext-alt']='';
icons['cancel']='';
icons['cancel-circled']='';
icons['plus-squared']='';
icons['upload']='';
icons['download-cloud']='';
icons['upload-cloud']='';
icons['share-squared']='';
icons['attention']='';
icons['cog']='';
icons['wrench']='';
icons['lock']='';
icons['lock-open']='';
icons['scissors']='';
icons['toggle-off']='';
icons['toggle-on']='';
icons['facebook-squared']='';
icons['language']='';
icons['gplus-squared']='';
icons['tumblr-squared']='';
icons['cc']='';
icons['cw']='';
icons['progress-1']='';
icons['progress-2']='';
icons['progress-3']='';
icons['spin5']='';
icons['picture']='';
icons['block']='';
icons['th-list-1']='';
icons['trash']='';
icons['paragraph']='';
icons['pencil']='';
icons['camera']='';
icons['hourglass']='';
icons['floppy']='';
icons['sliders']='';
icons['file-image']='';
icons['folder']='';
icons['folder-open']='';
icons['th-large']='';
icons['th']='';
icons['eye']='';
icons['thumbs-up']='';
icons['thumbs-down']='';
icons['thumbs-up-alt']='';
icons['thumbs-down-alt']='';
icons['share']='';
icons['zoom-in']='';
icons['zoom-out']='';
icons['resize-full']='';
icons['move-1']='';
icons['home']='';
icons['info']='';
icons['cloud']='';
icons['link-ext']='';
icons['magic']='';
icons['brush']='';
icons['copyright']='';
icons['instagramm']='';
icons['paste']='';
icons['ellipsis']='';
icons['ajust']='';
icons['tint']='';
icons['sort']='';
icons['sort-down']='';
icons['sort-up']='';
icons['eraser']='';
icons['at']='';
icons['android']='';