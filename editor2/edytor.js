genLayers=[];
var listaGenLayers;
function edytorGen (argument) {
	var okno = new oknoFull({
		suwak: true,
		krzyzyk: true
	});
	con=okno.content;
	listaGenLayers.y=200;
	//listaGenLayers.x=5;
	menuOpcje = new menuOpcjeClass(con);
	
	var linia = new createjs.Graphics();
	linia.beginFill("#bbb").drawRect(0,0, 10, 100);
	//con.addChild(linia);
	con.addChild(listaGenLayers);
	dodaj=new przycisk("dodaj",con);
	dodaj.con.on("mousedown", function (evt) {
		console.log("dodaj");
		nowa=new genLayer();
	});

	//podgląd
	plutno2=plutno.clone(1);
	pole2=pole.clone();
	for (x=layers.length-1; x>=0; x--) {
    	lay=layers[x];
    	conLay=layers[x].con.clone(1);
    	pole2.addChild(conLay);
    	var bb= conLay.getBounds();
    	if(!bb) {bb={width: 0, height: 0};};
    	if(bb){
    		var mask=lay.conMask.clone(1);
    		if(mask.children.length)
    		{
	    		mask.cache(lay.conMask.x*(1/lay.con.scaleY), lay.conMask.y*(1/lay.con.scaleY), bb.width, bb.height);
	    		conLay.filters=[
	    			new createjs.AlphaMaskFilter(mask.cacheCanvas), 
	    			];
	    		conLay.cache(0, 0, bb.width, bb.height);
	    	}
    	}	
	}
	plutno2.x=220;
	plutno2.y=50;
	plutno2.addChild(pole2);
	con.addChild(plutno2);
	var shape = new createjs.Shape();
	shape.graphics.drawRect(plutno2.x, plutno2.y, plutnoW, plutnoH);
	var mask = new createjs.Shape(shape.graphics);
	plutno2.mask=mask;
		if(plutnoW>canvas.width-plutno2.x-20) plutno2.scaleX=plutno2.scaleY=(canvas.width-plutno2.x-20)/plutnoW;
	else plutno2.scaleX=plutno2.scaleY=(canvas.height-plutno2.y-20)/plutnoH;


	
}
function listaGenLayersReflash () {
	for (var i=0; i<genLayers.length; i++) {
    	genLayers[i].warstwa.y=40+i*30;
    	//pole.setChildIndex(tablica[i].con,tablica[i].sort-1);
    }
}
function genLayer (argument) {
	var th=this;
	genLayers.push(this);
	this.name="text...";
	graphics = new createjs.Shape(new createjs.Graphics().beginFill("#fff000").drawRect(0,0, 190, 25));
	this.text = new createjs.Text(this.name, "18px Arial", "#ff7700");
	this.warstwa = new createjs.Container();
	this.warstwa.addChild(graphics);
	this.warstwa.addChild(this.text);
	this.warstwa.y=20+(this.i)*30;
	listaGenLayers.addChild(this.warstwa);
	listaGenLayersReflash();
	this.warstwa.on("mousedown", function (evt) {
		console.log("aktywcja warstwy");
		th.active()
	});
}
genLayer.prototype.active = function() {
	genLayerAkt=this;
};
genLayer.prototype.nName = function(nowe) {
	this.name=nowe;
	this.warstwa.removeChild(this.text);
	this.text=new createjs.Text(this.name, "18px Arial", "#ff7700");
	this.text.maxWidth=190;
	this.warstwa.addChild(this.text);
};
function menuOpcjeClass (con) {
	bZmienNazwe = new przycisk(icons["pencil"]+" Zmień nazwę",con);
	bZmienNazwe.con.y=75;
	bZmienNazwe.con.on("mousedown", function (evt) {
		genLayerAkt.nName("nnnnnn");
	});
}
