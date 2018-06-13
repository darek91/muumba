function newFile(){
	var okno = new oknoFull().con;
	$("title").text("muumba");
	tabPFOG=[];
	adresPlikuProjekt='';
	b480=new pOknoGlowne("480/640",okno,function (evt) {
		plutnoW=480;
		plutnoH=640;
		plutnoK='#FFF';
		nameFile="BezNazwy";
		adresPlikProjekt='';
		newPlutno();
		var bg = new layer;
		stage.removeChild(okno);
	} );
	b480.con.y=50;b480.con.x=100;
	b640=new pOknoGlowne("640/480",okno,function (evt) {
		plutnoW=640;
		plutnoH=480;
		plutnoK='#FFF';
		nameFile="BezNazwy";
		adresPlikProjekt='';
		newPlutno();
		var bg = new layer;
		stage.removeChild(okno);
	});
	b640.con.y=50;b640.con.x=220;
	bKam=new pOknoGlowne("Kamerka",okno,function (evt) {
		plutnoW=640;
		plutnoH=480;
		plutnoK='#FFF';
		nameFile="Photo";
		adresPlikProjekt='';
		newPlutno();
		video();
		stage.removeChild(okno);
	});
	iKam=new getIcon("camera",70,100).con;
	iKam.y=25;
	console.log(iKam.lineWidth);
	bKam.con.addChild(iKam)
	bKam.con.y=50;bKam.con.x=340;
	wylaczOlowek();
	/*user=Parse.User.current();
	var query = new Parse.Query("projekty");
	//query.limit(10);
	query.descending("updatedAt");
	query.equalTo("user", user);
	query.find({
	  success: function(results) {
	  	for (var i = 0; i < results.length; i++) {
	  		var object = results[i];
	    	file=new pFileOknoGlowne(object.get("name"),okno,object,object.get('file').url());
			file.con.y=175;
			file.con.x=i*120+100;
	    }
	  }
	});*/
}
function newPlutno(){
	rob.removeAllChildren();
	rob.removeAllEventListeners();
	for (var i=layers.length-1; i>=0; i--) {
		layers[i].con.uncache();
		layers[i].con.removeAllChildren();
		layers[i].warstwa.removeAllChildren();
		layers.pop();
	}
	plutnoT = new createjs.Graphics();
	plutnoT.beginStroke("#444");
	plutnoT.setStrokeStyle(1);
	plutnoT.beginFill(plutnoK).drawRect(0,0, plutnoW, plutnoH);
	plutnoT = new createjs.Shape(plutnoT);
	plutno = new createjs.Container();
	plutno.addChild(plutnoT);
	rob.addChild(plutno);
	rob.setChildIndex(plutno,0);
	rob.addChild(pole);
	rob.setChildIndex(pole,1);
	resize_canvas();
	rob.x=((canvas.width-plutnoW*rob.scaleX))/2;
	rob.y=((canvas.height-plutnoH*rob.scaleY))/2;
	plutno.on("mousedown", function (evt) {
		if(aktNor) this.offset = {x: rob.x - evt.stageX, y: rob.y - evt.stageY};
	});
	plutno.on("pressmove", function (evt) {
		if(aktNor){
			rob.x = evt.stageX + this.offset.x;
			rob.y = evt.stageY + this.offset.y;
		}
	});
}
function loadP(json,lay) {
	var image = new Image();
	image.src = json.con;
	image.onload = function (event) {
		var image = event.target;
		var bitmap = new createjs.Bitmap(image);
		lay.con.addChild(bitmap);
		bitmap.x=json.x*1*(1/json.scaleX);
		bitmap.y=json.y*1*(1/json.scaleX);
		bitmap.scaleX=json.scaleX*1;
		bitmap.scaleY=json.scaleY*1;
		bitmap.rotation=json.rotation*1;
		bitmap.setBounds ( 0,  0,  json.width*1,  json.height*1 );
	}
}
function loadP2(json,lay) {
	adres=json.con;
	var image = new Image();
	image.src = adres;
	image.onload = function (event) {
		var image = event.target;
		var bitmap = new createjs.Bitmap(image);
		lay.conMask.addChild(bitmap);
		bitmap.x=json.x*1*(1/json.scaleX);
		console.log("->"+bitmap.x);
		bitmap.y=json.y*1*(1/json.scaleX);
		console.log("->"+bitmap.y);
		bitmap.scaleX=json.scaleX*1;
		bitmap.scaleY=json.scaleY*1;
		bitmap.rotation=json.rotation*1;
		bitmap.setBounds ( 0,  0,  json.width*1,  json.height*1 );
	}
}
function loadFile (file,id) {
	if(id) adresPlikProjekt=id; else adresPlikProjekt='';

	czekaj=new oknoCzekaj(null, 1);
	$.get(file,{},function(data) {
		data=unescape(decodeURIComponent(data));
		data=JSON.parse(data);
		nameFile=data.plik.name;
		$("title").text("-"+nameFile)
        plutnoW=data.plutno.plutnoW;
		plutnoH=data.plutno.plutnoH;
		plutnoK=data.plutno.plutnoK;
		newPlutno();
        for (var i=data.layers.length-1; i>=0; i--) {
	    	var lay=new layer;
	    	lay.nName(data.layers[i].name);
	    	lay.con.x=data.layers[i].x*1;
			lay.con.y=data.layers[i].y*1;
			lay.con.scaleX=data.layers[i].scaleX*1;
			lay.con.scaleY=data.layers[i].scaleY*1;
			lay.con.rotation=data.layers[i].rotation*1;
			lay.con.setBounds ( 0,  0,  data.layers[i].width*1,  data.layers[i].height*1 );
	    	for (var j=0; j<=data.layers[i].con.length-1; j++) {
	    		if(data.layers[i].con[j]!="null") loadP(data.layers[i].con[j],lay);

	    	}

	    	lay.conMask.x=data.layers[i].conMask.x*1;
	    	lay.conMask.y=data.layers[i].conMask.y*1;
			lay.conMask.scaleX=data.layers[i].conMask.scaleX*1;
			lay.conMask.scaleY=data.layers[i].conMask.scaleY*1;
			lay.conMask.rotation=data.layers[i].conMask.rotation*1;
			lay.conMask.setBounds ( 0,  0,  data.layers[i].conMask.width*1,  data.layers[i].conMask.height*1 );
	    	for (var j=0; j<=data.layers[i].conMask.con.length-1; j++) {
	    		if(data.layers[i].conMask.con[j]!="null") loadP2(data.layers[i].conMask.con[j],lay);
	    	}

			if(data.layers[i].conMask.con.length>0) dodajMaski(lay);
	    }
	czekaj.koniec();
	});
	dodajMaski();
}
function pokazCookie(nazwa) {
    if (document.cookie!="") {
        var cookies=document.cookie.split("; ");
        for (i=0; i<cookies.length; i++) {
            var nazwaCookie=cookies[i].split("=")[0];
            if (nazwaCookie===nazwa) {
            	var wartoscCookie=cookies[i].split("=")[1];
                return unescape(wartoscCookie)
            }
        }
        return '';
    } else return '';
}

function dodajMaski (data) {
		setTimeout(fun, 100);
		function fun (data) {
			stage.update();
			console.log("dod "+layers.length);
			for (var i = layers.length - 1; i >= 0; i--) {
				if(layers[i].conMask.children.length>0) {
		    		var bb= layers[i].con.getBounds();
		    		console.log(bb);
		    		if(!bb) {bb={width: 0, height: 0};}
		    		var mask=layers[i].conMask.clone(1);
		    		mask.cache(layers[i].conMask.x*(1/layers[i].con.scaleY), layers[i].conMask.y*(1/layers[i].con.scaleY), bb.width, bb.height);
		    		layers[i].con.filters=[
		    			new createjs.AlphaMaskFilter(mask.cacheCanvas),
		    			];
		    		if(bb) layers[i].con.cache(0, 0, bb.width, bb.height);
		    		layers[i].con.hitArea=layers[i].conMask;
		    	}
			};
			console.log(data)
			var lay=data;
			/*var bb= lay.con.getBounds();
			if(!bb) {bb={width: 200, height: 200};};
	    	lay.con.filters=[];
	    		lay.conMask.scaleX=lay.con.scaleX;
				lay.conMask.scaleY=layerAkt.con.scaleY;

	            lay.conMask.x+=lay.con.x+2*lay.qq2.x;//*(1/layerAkt.con.scaleY);
				lay.conMask.y+=layerAkt.con.y+2*lay.qq2.y;//*(1/layerAkt.con.scaleY);
				console.log(lay.conMask);
	            lay.conMask.rotation=lay.con.rotation;
	            //hitaera jeszcze

	    		pole.addChild(lay.conMask);
	    		lay.con.uncache();


	    		pole.removeChild(lay.conMask);
	    	*/	/*stage.update();
				console.log("dod2 - "+lay.conMask.children.length);
				//if(layers[i].conMask.children.length>0) {
		    		console.log("dodanie maskki");
		    		var bb= lay.con.getBounds();
		    		console.log(bb);
		    		if(!bb) {bb={width: 200, height: 200};};
		    		var mask=lay.conMask.clone(1);
		    		mask.cache(lay.conMask.x*(1/lay.con.scaleY), lay.conMask.y*(1/lay.con.scaleY), bb.width, bb.height);
		    		lay.con.filters=[
		    			new createjs.AlphaMaskFilter(mask.cacheCanvas),
		    			];
		    		lay.con.cache(0, 0, bb.width, bb.height);
		    	//}
		    	//stage.update();*/
		}
	}
