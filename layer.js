//var qq2.y=0;
function layer()
{
	zmiana=1;
	this.i=ii++;
	this.sort=1+max(layers);
	this.name = "Bez Nazwy "+this.i;
	layers.push(this);
	this.con = new createjs.Container();
	this.con.x=0;
	this.con.y=0;
	pole.addChild(this.con);
	pole.setChildIndex(this.con,100);
	graphics = new createjs.Shape(new createjs.Graphics().beginFill("#fff000").drawRect(0,0, 190, 25));
	this.text = new createjs.Text(this.name, "18px Arial", "#ff7700");
	this.warstwa = new createjs.Container();
	this.warstwa.addChild(graphics);
	this.warstwa.addChild(this.text);
	this.warstwa.y=20+(this.i)*30;
	blokLayersSrodek.addChild(this.warstwa);
	this.conMask=new createjs.Container();//new createjs.Shape();
	//this.con.mask=this.conMask;
	var th=this;
	this.warstwa.on("mousedown", function (evt) {
		var pt = blokLayersSrodek.globalToLocal(evt.stageY, evt.stageY);
		//if(evt.stageY<blokLayersSrodek.hit.y + 200 && evt.stageY>blokLayersSrodek.hit.y) 
		if(pt.y>=20 && pt.y<=blokLayersSrodek.height+20)
			{
				th.active();
			}
	});
	this.qq2={x: 0, y: 0};
	this.xx=[1,1,1,1,0,0,0,0,0,0,0,0];
	this.con.cursor = 'Text';
	this.con.on("mousedown", function (evt) {
		if(aktNor){
			th.active();
			if(window.event.ctrlKey){
				nowy = new layer;
				for (var i = 0; i < th.con.children.length; i++) {
					nowy.con.addChild(th.con.children[i].clone(1));
				};
				nowy.con.scaleX=th.con.scaleX;
				nowy.con.scaleY=th.con.scaleY;
				nowy.con.x=th.con.x;
				nowy.con.y=th.con.y;
				nowy.con.rotation=th.con.rotation;
				nowy.nName("~"+th.name);
				layerAkt=nowy;
				nowy.active();
				qq=layerAkt.con;
				for (var i = th.xx.length - 1; i >= 0; i--) {
					nowy.xx[i]=th.xx[i];
				};
				//if(th.maEfekt ) dodajEfekty(nowy);
				
			} else qq=this;
			qq.offset = {x: qq.x - evt.stageX/rob.scaleY, y: qq.y- evt.stageY/rob.scaleY}
		}
	});
	this.con.on("pressmove", function (evt) {
		if(aktNor){
			if(!maskaWlaczona){
				if(window.event.ctrlKey) qq=layerAkt.con; else qq=this;
				obr.x=roz.x=qq.x = (evt.stageX/rob.scaleY + qq.offset.x);
				obr.y=roz.y=qq.y = (evt.stageY/rob.scaleY + qq.offset.y);
			} else {
				//if(window.event.ctrlKey) qq=layerAkt.con; else 
				qq=this;
				obr.x=roz.x=qq.x = (evt.stageX/rob.scaleY + qq.offset.x);
				obr.y=roz.y=qq.y = (evt.stageY/rob.scaleY + qq.offset.y);
				//qq2=layerAkt.conMask;
				th.qq2.x = -(evt.stageX/rob.scaleY + qq.offset.x);
				th.qq2.y = -(evt.stageY/rob.scaleY + qq.offset.y);
			
			}

		}
	});
	this.active();
	sortWarstwy(layers);
}
layer.prototype.nName = function(nowe) {
	this.name=nowe;
	this.warstwa.removeChild(this.text);
	this.text=new createjs.Text(this.name, "18px Arial", "#ff7700");
	this.text.maxWidth=190;
	this.warstwa.addChild(this.text);
};
layer.prototype.active = function() {
	roz.x=obr.x=this.con.x;
	roz.y=obr.y=this.con.y;
	if(layerAkt) layerAkt.warstwa.alpha=0.4;
	this.warstwa.alpha=1;
	layerAkt=this;
	
	/*for (var i = 0; i < layerAkt.con.children.length; i++) {
		var bb= layerAkt.con.children[i].getBounds();
		obr2(bb,"#f00");
	};*/
	var bb= layerAkt.con.getBounds();
	if(bb && !window.event.ctrlKey){
		//var bb2=rob.localToGlobal(layerAkt.con.x, layerAkt.con.y);
		var graphics = new createjs.Graphics();
		graphics.beginStroke("#333");
		graphics.setStrokeStyle(2);
		graphics.drawRect(0,0, bb.width, bb.height);
		var te = new createjs.Shape(graphics);
		te.x=bb.x;
		te.y=bb.y;
		layerAkt.con.addChild(te);
		createjs.Ticker.addEventListener("tick", handleTick);
		function handleTick(event) {
		     	layerAkt.con.removeChild(te);
		     	event.remove();
		}
		//layerAkt.con.addChild(te);
	}
	odswiezOpcje();
	//stage.update();
	
};
layer.prototype.del = function() {
	console.log("kasowanie");
	for (var i=0; i<layers.length; i++) {
    	if(layers[i]==this){ 
			this.sort=-1000;
			for (var i=i-1; i>-1; i--) {
				layers[i].sort=layers[i].sort-1;
			}
			sortWarstwy(layers);
			layers.pop();
			this.con.removeAllChildren();
			this.con.uncache();
			this.warstwa.removeAllChildren();
			if(layers[0]) {layers[0].active();}
			break;
		}
	}
	if(layers.length==0) {x=new layer;}
};
function max(tablica) {
    if(tablica.length!=0){
	    var maximum = tablica[0].sort;
	    for (var i=0; i<tablica.length; i++) {
	    	if(tablica[i].sort > maximum) maximum=tablica[i].sort;
	    }
	    return (maximum);
	} else return 0;
}
function porownaj(a, b) {
    return b.sort - a.sort;
}
function sortWarstwy(tablica){
	tablica.sort(porownaj);
	for (var i=0; i<tablica.length; i++) {
    	tablica[i].warstwa.y=20+i*30;
    	pole.setChildIndex(tablica[i].con,tablica[i].sort-1);
    }
	//stage.update();
}