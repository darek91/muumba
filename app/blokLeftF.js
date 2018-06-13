var e1,e2,e3, wylaczOlowek,maskaWlaczona;
function blokLeftF(){
	var blok = new createjs.Graphics().beginFill("#888").drawRect(0,0, 26, canvas.height);
	var blok = new createjs.Shape(blok);
	gui.addChild(blok);
	var blok = new createjs.Graphics().beginFill("#888").drawRect(0,0, 100, 27);
	var blok = new createjs.Shape(blok);
	gui.addChild(blok);
	gui.on("mousedown", function (evt) {});
	var icoNew = new icoLeft("home");
	icoNew.y=2;
	gui.addChild(icoNew);

	var icoSave = new icoLeft("floppy");
	icoSave.y=2;icoSave.x=26;
	gui.addChild(icoSave);

	var icoOpcje = new icoLeft("cog");
	icoOpcje.y=2;icoOpcje.x=52;
	gui.addChild(icoOpcje);
	icoOpcje.on("mousedown", opcje );

	var icoPro = new icoLeft("star-empty");
	icoPro.y=2;icoPro.x=78;
	gui.addChild(icoPro);
	icoPro.on("mousedown", edytorGen);

	var icoOlowek = new icoLeft("pencil");
	icoOlowek.y=250;//icoOlowek.x=86;
	aktOlu=0;
	gui.addChild(icoOlowek);

	var bk = new createjs.Graphics().beginFill(kolor1).drawRect(0,0, 25, 25);
	var bk = new createjs.Shape(bk);
	var icoKolor = new createjs.Container();
	icoKolor.addChild(new getIcon("tint",24,36).con);
	icoKolor.addChild(bk)
	icoKolor.y=276;
	gui.addChild(icoKolor);

	var icoRoz = new icoLeft("resize-full");
	icoRoz.alpha=1;
	icoRoz.y=28;
	gui.addChild(icoRoz);
	akt=0;
	roz = new createjs.Bitmap("img/roz2.png");
	roz.regY=12;roz.regX=12;
	roz.scaleX=-1

	var icoObr = new icoLeft("cw");
	icoObr.alpha=1;
	icoObr.y=54;
	gui.addChild(icoObr);
	aktObr=0;
	obr = new createjs.Bitmap("img/roz.png");
	obr.regY=12;obr.regX=12;

	var icoPlus = new icoLeft("zoom-in");
	icoPlus.y=150;
	gui.addChild(icoPlus);
	var icoMinus = new icoLeft("zoom-out");
	icoMinus.y=180;
	gui.addChild(icoMinus);

	function cos(evt2) {
		rob.addChild(roz);
		e=roz.on("mousedown", function (evt) {
			this.offset = {x: roz.x - evt.stageX/rob.scaleX, y: roz.y - evt.stageY/rob.scaleY};
			this.starex=evt.stageX/rob.scaleX;
			this.starey=evt.stageY/rob.scaleY;
			this.scx=layerAkt.con.scaleX;
			this.scy=layerAkt.con.scaleY;
			this.sx=layerAkt.con.x;
			this.sy=layerAkt.con.y;
		});
		e2=roz.on("pressmove", function (evt){
			if(1 || window.event.shiftKey){
				//pitagoras=Math.sqrt(evt.stageX*evt.stageX+evt.stageY*evt.stageY);
				//this.x = evt.stageX/rob.scaleX + this.offset.x;
				//this.y = evt.stageX/rob.scaleY + this.offset.y;

				//this.y = evt.stageY/rob.scaleY + this.offset.y;
				layerAkt.con.scaleX=this.scx-((evt.stageX/rob.scaleX-this.starex)/75);
				layerAkt.con.scaleY=this.scy-((evt.stageX/rob.scaleX-this.starex)/75);//this.scy-((evt.stageY/rob.scaleY-this.starey)/75);
				this.x =layerAkt.con.x=this.sx+(evt.stageX/rob.scaleX-this.starex);
				this.y =layerAkt.con.y=this.sy+(evt.stageX/rob.scaleY-this.starex);
			} else {
				this.x = evt.stageX/rob.scaleX + this.offset.x;
				this.y = evt.stageY/rob.scaleY + this.offset.y;
				layerAkt.con.scaleX=this.scx-((evt.stageX/rob.scaleX-this.starex)/75);
				layerAkt.con.scaleY=this.scy-((evt.stageY/rob.scaleY-this.starey)/75);
				//layerAkt.con.scaleY=this.scy-((evt.stageY/rob.scaleY-this.starex)/75);
				//layerAkt.con.scaleX=this.scx-((evt.stageY/rob.scaleY-this.starex)/75);

				layerAkt.con.x=this.sx+(evt.stageX/rob.scaleX-this.starex);
				layerAkt.con.y=this.sy+(evt.stageY/rob.scaleY-this.starey);
			}
		});
	}
	function cos2(evt) {
		rob.addChild(obr);
		e4=obr.on("mousedown", function (evt) {
			this.offset = {x: obr.x - evt.stageX, y: obr.y - evt.stageY};
			this.starex=evt.stageX;
			this.starey=evt.stageY;
			this.scx=layerAkt.con.scaleX;
			this.scy=layerAkt.con.scaleY;
			this.scr=layerAkt.con.rotation;

			this.sx=layerAkt.con.x;
			this.sy=layerAkt.con.y;
		});
		e2=obr.on("pressmove", function (evt){
			this.x = evt.stageX + this.offset.x;
			//this.y = evt.stageY + this.offset.y;
			layerAkt.con.rotation=this.scr+((evt.stageX-this.starex)/1);
			//layerAkt.con.rotation=this.scr+Math.sqrt((evt.stageX-this.starex)*(evt.stageX-this.starex)+(evt.stageY-this.starey)*(evt.stageY-this.starey));

			layerAkt.con.x=this.sx+(evt.stageX-this.starex);
			//console.log(layerAkt.con.rotation);
			stage.update();
			//layerAkt.con.y=this.sy+(evt.stageX-this.starex);
		});
	}
	icoKolor.on("mousedown", function (evt) {
		//gui.removeChild(paleta.con);
		paleta=new paletaKolor(klik);
		paleta.con.y=300;
		gui.addChild(paleta.con);
		function klik (argument) {
			kolor1=argument.kolor;
			var icoKolorte = new createjs.Graphics().beginFill(kolor1).drawRect(0,0, 24, 24);
			var icoKolorte = new createjs.Shape(icoKolorte);
			icoKolor.addChild(icoKolorte);
			icoKolor.addChild(new getIcon("tint",24,36).con);
			gui.removeChild(paleta.con);
			//icoKolor.y=276;
		}


	});
	icoNew.on("mousedown", function (evt) {
		czyZapisac(newFile);
	});
	icoSave.on("mousedown", function (evt) {
		save();
	});
	icoPlus.on("mousedown", function (evt) {
		if(rob.scaleY<4){
			rob.scaleY=rob.scaleX=rob.scaleX+0.05;
			rob.x-=plutnoW*0.025;
			rob.y-=plutnoH*0.025;//resize_canvas();
		}
	});
	icoMinus.on("mousedown", function (evt) {
		if(rob.scaleY>0.1){
			rob.scaleY=rob.scaleX=rob.scaleX-0.05;
			rob.x+=plutnoW*0.025;
			rob.y+=plutnoH*0.025;//resize_canvas();
		}
	});
	icoRoz.on("mousedown", function (evt) {
		if(!akt){
			wylaczOlowek();
			akt=1;aktNor=1;
			cos();
			roz.visible=1;
			obr.visible=0;
			icoObr.alpha=1;
			icoOlowek.alpha=1;
			aktObr=0;aktOlu=0;
			this.alpha=0.5;
		} else {
			roz.visible=0;
			akt=0;
			this.alpha=1;
		}
	});
	oldPt=0;
	oldMidPt=0;
	midPt=0;
	minx=0;
	maxx=0;
	miny=0;
	maxy=0;
	var drawingCanvas;
	drawingCanvas = new createjs.Shape();
	temp=new createjs.Graphics();
	icoOlowek.on("mousedown", function (evt) {
		if(!aktOlu){
			aktOlu=1;aktNor=0;
			roz.visible=0;
			obr.visible=0;
			akt=0;aktObr=0
			icoObr.alpha=1;
			icoRoz.alpha=1;
			this.alpha=0.5;
			e1=tlo.on("mousedown", function (evt) {
	            //if(stage.mouseX>25){
	            	oldPt = new createjs.Point(evt.stageX, evt.stageY);
		            oldMidPt = oldPt;
		            stage.addChild(drawingCanvas);
		            maxx=stage.mouseX;minx=stage.mouseX;maxy=stage.mouseY;miny=stage.mouseY;
		        //}
			});
			e2=tlo.on("pressmove", function (evt){
				var midPt = new createjs.Point(oldPt.x + evt.stageX>>1, oldPt.y+evt.stageY>>1);
				if (midPt.x>maxx) {maxx=midPt.x;}
				else if (midPt.x<minx) {minx=midPt.x;}
				if (midPt.y>maxy) {maxy=midPt.y;}
				else if (midPt.y<miny) {miny=midPt.y;}
	            drawingCanvas.graphics.setStrokeStyle(9, 'round', 'round').beginStroke(kolor1).moveTo(midPt.x, midPt.y).curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);
	            oldPt.x = stage.mouseX;
	            oldPt.y = stage.mouseY;
	            oldMidPt.x = midPt.x;
	            oldMidPt.y = midPt.y;
				//layerAkt.con.addChild(drawingCanvas.clone(1));
				//drawingCanvas.graphics.clear();
	            //stage.update();
			});

			e3=tlo.on("pressup", function (evt){
				var warstwa = new createjs.Container();
				var obiekt=drawingCanvas.clone(1);
				var minx2=minx-=5;
				var miny2=miny-=5;
				var maxx2=maxx+=5;
				var maxy2=maxy+=5;
				obiekt.cache(minx2,miny2, maxx2-minx2, maxy2-miny2,1);
				var image = new Image();
				if(obiekt.getCacheDataURL()){
					image.src =obiekt.getCacheDataURL();
					image.onload = function (event) {
			    		var image = event.target;
			    		var bitmap = new createjs.Bitmap(image);
			    		//aaa.addChild(bitmap);
			    		//aaa.uncache();
			    		if(!maskaWlaczona){
			    			layerAkt.con.addChild(bitmap);
			    		} else {
			    			layerAkt.conMask.addChild(bitmap);
			    		}

			    		bitmap.scaleX=(1/layerAkt.con.scaleX)*(1/rob.scaleX);
						bitmap.scaleY=(1/layerAkt.con.scaleY)*(1/rob.scaleY);
			            ww=layerAkt.con.rotation;
			            var pt = tlo.localToGlobal(minx, miny);
 						pt = layerAkt.con.globalToLocal(pt.x,pt.y);
		    			x=maxx2-minx2;
		    			y=maxy2-miny2;
						bitmap.setBounds(0,0, x, y);
						bitmap.x=pt.x;//+layerAkt.con.x*(1/layerAkt.con.scaleX);
						bitmap.y=pt.y;//+layerAkt.con.y*(1/rob.scaleY)*(1/layerAkt.con.scaleY);
			            bitmap.rotation=360-ww;
			            drawingCanvas.graphics.clear();
			            if(layerAkt.con.getCacheDataURL()) layerAkt.con.updateCache();
			            stage.update();
					}
			    } else console.log("brak obiek cache");
			});
		} else {
			wylaczOlowek();
		}
	});
	wylaczOlowek = function  (argument) {
		aktOlu=0;aktNor=1;
		icoOlowek.alpha=1;
		roz.visible=0;
		obr.visible=0;
		akt=0;aktObr=0
		icoObr.alpha=1;
		icoRoz.alpha=1;
		tlo.removeEventListener("mousedown", e1);
		tlo.removeEventListener("pressmove", e2);
		tlo.removeEventListener("pressup", e3);
	}
	icoObr.on("mousedown", function (evt) {
		if(!aktObr){
			wylaczOlowek();
			aktObr=1;
			cos2();
			obr.visible=1;
			roz.visible=0;
			icoRoz.alpha=1;
			akt=0;aktOlu=0;
			this.alpha=0.5;
		} else {
			obr.visible=0;
			aktObr=0;
			this.alpha=1;
		}
	});
}
