function save(){
	var okno = new oknoFull().con;
	var button= new createjs.Container();
	var graphics2 = new createjs.Graphics().beginFill("#f00").drawRect(0,0, 200, 30);
	var te2 = new createjs.Shape(graphics2);
	plutno2=plutno.clone(1);
	pole2=pole.clone();
	for (x=layers.length-1; x>=0; x--) {
    	lay=layers[x];
    	con=layers[x].con.clone(1);
    	pole2.addChild(con);
    	var bb= con.getBounds();
    	if(!bb) {bb={width: 0, height: 0};};
    	if(bb){
    		var mask=lay.conMask.clone(1);
    		if(mask.children.length)
    		{
	    		mask.cache(lay.conMask.x*(1/lay.con.scaleY), lay.conMask.y*(1/lay.con.scaleY), bb.width, bb.height);
	    		con.filters=[
	    			new createjs.AlphaMaskFilter(mask.cacheCanvas),
	    			];
	    		con.cache(0, 0, bb.width, bb.height);
	    	}
    	}
	}
	plutno2.x=220;
	plutno2.y=50;
	plutno2.addChild(pole2);
	okno.addChild(plutno2);
	var shape = new createjs.Shape();
	shape.graphics.drawRect(plutno2.x, plutno2.y, plutnoW, plutnoH);
	var mask = new createjs.Shape(shape.graphics);
	plutno2.mask=mask;
	if(plutnoW>canvas.width-plutno2.x-20) plutno2.scaleX=plutno2.scaleY=(canvas.width-plutno2.x-20)/plutnoW;
	else plutno2.scaleX=plutno2.scaleY=(canvas.height-plutno2.y-20)/plutnoH;

	button.addChild(te2);
	bFile=button.clone(1);
	bFile.y=5;
	okno.addChild(bFile);
	bFile.addChild(new createjs.Text("Zapisz na dysku", "22px Arial", "#000"));
	bFile.on("mousedown", function (evt) {
		zapisz(saveLocal);
		stage.removeChild(okno);
	});
	bServer=button.clone(1);
	bServer.y=40;
	okno.addChild(bServer);
	bServer.addChild(new createjs.Text("Zapisz na serwerze", "22px Arial", "#000"));
	bServer.on("mousedown", function (evt) {
		zapisz(saveServer)
		stage.removeChild(okno);
	});

	bServerAs=button.clone(1);
	bServerAs.y=75;
	okno.addChild(bServerAs);
	bServerAs.addChild(new createjs.Text("Zapisz Projekt jako", "22px Arial", "#000"));
	bServerAs.on("mousedown", function (evt) {
		stage.update();
		createjs.Ticker.addEventListener("tick", handleTick);
		function handleTick(event) {
		     	czekaj = new oknoCzekaj(function (argument) {
		    		a= new saveProjekt(null,{x:plutno2.x,y:plutno2.y});
		    	});
		     	event.remove();
		}
		stage.removeChild(okno);
	});
	bAnuluj=button.clone(1);
	bAnuluj.y=180;bAnuluj.x=0;
	okno.addChild(bAnuluj);
	bAnuluj.addChild(new createjs.Text("Anuluj", "22px Arial", "#000"));
	bAnuluj.on("mousedown", function (evt) {
		stage.removeChild(okno);
	});
	bPro=button.clone(1);
	bPro.y=110;
	if(adresPlikProjekt) okno.addChild(bPro);
	bPro.addChild(new createjs.Text("Zapisz Projekt", "22px Arial", "#000"));
	bPro.on("mousedown", function (evt) {
		stage.removeChild(okno);
		stage.update();
		createjs.Ticker.addEventListener("tick", handleTick);
		function handleTick(event) {
			console.log(adresPlikProjekt);
		    czekaj = new oknoCzekaj(function (argument) {
		    	a = new saveProjekt(adresPlikProjekt,{x:plutno2.x,y:plutno2.y});
		    });
		    event.remove();
		}
	});
	bFb=button.clone(1);
	bFb.y=145;
	okno.addChild(bFb);
	bFb.addChild(new createjs.Text("FB", "22px Arial", "#000"));
	bFb.on("mousedown", function (evt) {
		stage.removeChild(okno);
		stage.update();
		createjs.Ticker.addEventListener("tick", handleTick);
		function handleTick(event) {
		    czekaj = new oknoCzekaj(function (argument) {
				zapisz(saveFb);
			});
			event.remove();
		};
	});
}
tab1=[];
function zapisz(funKon) {
	function zapisW (razy) {
		if(!razy) razy=1;
		//moze zmienic na ladniejszy soposob zapisu
		//mozliwosc zapisu z kanalem alfa
		$('body').append('<canvas id="testCanvas2" width="500" height="600" style="background-color: #888;"></canvas>');
    	can2 = document.getElementById("testCanvas2");
    	can2.width = razy*plutnoW;
    	can2.height = razy*plutnoH;
    	stage2 = new createjs.Stage(can2);
    	var plutnoT = new createjs.Graphics().beginFill(plutnoK).drawRect(0,0, razy*plutnoW, razy*plutnoH);
		var plutnoT = new createjs.Shape(plutnoT);
		var plutno = new createjs.Container();
		plutno.addChild(plutnoT);
		plutno.addChild(pole.clone(1));
		plutno.scaleX=plutno.scaleY=razy;
		stage2.addChild(plutno);
		stage2.update();
		dataURL=can2.toDataURL();
		funKon();
		for (var i = tab1.length - 1; i >= 0; i--) {
			console.log(i);
			a=tab1[i][0];//aaa;
			b=tab1[i][1];//warstwa
			a.removeChild(b);
			for (var ii=0; ii<a.children.length; ii++){
				a.children[ii].visible=1;
			}
			tab1.pop();
		}
	}
	licznik=0;ile=0;
	for (var i = 0; i < layers.length ; i++) {
		if(layers[i].con.getCacheDataURL() ) ile++;
	}
	i=0;
	if(ile==0) {
		if(funKon==saveFb) zapisW(2); else zapisW();
	} else f1(layers[i]);
	function f1 (argument) {
		aaa=argument.con;
		aaa2=argument.name;
		console.log("wywolanie f1 "+aaa2+" *"+i);
		var image = new Image();
		if(aaa.getCacheDataURL() ){
			image.src =aaa.getCacheDataURL();
			image.onload = function (event) {
				console.log("wywolanie onload "+aaa2+" *"+i);
        		var image = event.target;
        		var bitmap = new createjs.Bitmap(image);
        		for (var j=0; j<aaa.children.length; j++){
					aaa.children[j].visible=0;
				}
        		aaa.addChild(bitmap);
        		var cos=[aaa, bitmap];
        		tab1.push( cos );
        		licznik++;
        		if (licznik==ile) {
        			if(funKon==saveFb) zapisW(2); else zapisW();
				}
				if(i < layers.length-1) {i++; f1(layers[i]);}
        	}
        } else if(i < layers.length-1) {i++; f1(layers[i]);}
    }
}
dataURL=0;
function saveServer(){
	/*$.ajax({
	  type: "POST",
	  url: "savefile.php",
	  data: {
	     img: dataURL
	  }
	}).done(function(o) {
	  console.log('savedServer');
	  can2.remove();
	});*/
	//if($_GET['adres'])$file =$_GET['adres']; else $file = UPLOAD_DIR . uniqid() . '.wgp';
	var filedata = dataURL;
	console.log(dataURL)
  var name = "image.jpg";
	backandUrl="https://api.backand.com";
	jwt= localStorage.getItem('jwt');
	$.ajax({
	  type: "POST",
		contentType: 'application/json',
    dataType: 'json',
		beforeSend: function (request)
            {
								request.setRequestHeader("Authorization", "Bearer " + jwt);
            },
	  url: backandUrl+"/1/objects/images",
	  data: JSON.stringify({"filename":name, "filedata":filedata.substr(filedata.indexOf(',') + 1, filedata.length) })
	}).done(function(r) {
	  console.log('savedServer');
		console.log(r);
	  //can2.remove();, "filedata":filedata.substr(filedata.indexOf(',') + 1, filedata.length)
		//url: backandUrl+"/1/objects/action/users?name=files2",
	});
  /*var parseFile = new Parse.File(name, { base64: file });
  parseFile.save();
  var zap = new Parse.Object("export");
	zap.set("user", Parse.User.current());
	zap.set("file", parseFile);
	mini=miniatura(null, null);
	var parseFileMini = new Parse.File("mini", { base64: mini });
	parseFileMini.save();
	zap.set("mini", parseFileMini);
	zap.save(null, {
		success: function(post) {
			uwaga("Zapisano");
		}
	});
*/}
function saveLocal(){
	var a=$("<a download id='ccc'>")
	a.attr("href", dataURL);
	//'image/png'
	$('body').append(a);
	document.getElementById("ccc").click();
	a.remove();
	can2.remove();
}
function saveFb(){
	function PostImageToFacebook(authToken) {
		var imageData = dataURL
		try {
		    blob = dataURItoBlob(imageData);
		} catch (e) {
		    console.log(e);
		}
		var fd = new FormData();
		if(authToken){
			fd.append("access_token", authToken);
			fd.append("source", blob);
			fd.append("message", "Stworzone dzięki muumba.ml");
			try {
			    $.ajax({
			        url: "https://graph.facebook.com/me/photos?access_token=" + authToken,
			        type: "POST",
			        data: fd,
			        processData: false,
			        contentType: false,
			        cache: false,
			        success: function (data) {
			            uwaga("Zdjęcie opublikowane")
			        },
			        error: function (shr, status, data) {
			            uwaga("error: " + data + " Status " + shr.status);
			        }/*,
			        complete: function () {
			            uwaga("Zdjęcie dodano do Facebook!");
			        }*/
			    });
			} catch (e) {
			    console.log(e);
			}
		} else uwaga("Niepołączony Facebook")
	}
	function dataURItoBlob(dataURI) {
		var byteString = atob(dataURI.split(',')[1]);
		var ab = new ArrayBuffer(byteString.length);
		var ia = new Uint8Array(ab);
		for (var i = 0; i < byteString.length; i++) {
		    ia[i] = byteString.charCodeAt(i);
		}
		return new Blob([ab], {
		    type: 'image/png'
		});
	}
	PostImageToFacebook(FB.getAccessToken());
	can2.remove();
}
function saveProjekt (adresPliku, dane) {
	this.postep=new postepLadowania("Zapisywanie projektu");
	var th=this;
	mini=miniatura(null, dane);
	if(adresPliku) console.log(adresPliku);
	var zmienna='';
	zmienna+='{"plik": ';
	zmienna+='{"name": "'+nameFile+'",';
	zmienna+='"ver": "0.8"},';
	zmienna+='"plutno": ';
	zmienna+='{"plutnoH": "'+plutnoH+'", "plutnoW": "'+plutnoW+'", "plutnoK": "'+plutnoK+'" },';
	zmienna+='"layers": ';
	zmienna+='[';
	for (var i=0; i<layers.length; i++) {
    	zmienna+='{"name": "'+layers[i].name+'",';
    	//zmienna+='"con": "'+zap(layers[i])+'",';
    	//zapisywanie kazdego elementu
    	zmienna+='"x": "'+layers[i].con.x+'",';
    	zmienna+='"y": "'+layers[i].con.y+'",';
    	zmienna+='"rotation": "'+layers[i].con.rotation+'",';
    	zmienna+='"scaleX": "'+layers[i].con.scaleX+'",';
    	zmienna+='"scaleY": "'+layers[i].con.scaleY+'",';
    	var bb= layers[i].con.getBounds();
    	if(!bb) {bb={width: 200, height: 200};};
    	zmienna+='"width": "'+bb.width+'",';
    	zmienna+='"height": "'+bb.height+'",';
    	zmienna+='"con": ';
    	zmienna+='[';
    	for (var j=0; j<layers[i].con.children.length; j++) {
    		var boundsObraz = layers[i].con.children[j].getBounds();
    		if(boundsObraz) {xx=boundsObraz.x; yy=boundsObraz.y;} else {xx=0; yy=0;}
    		zmienna+='{"con": "'+zap(layers[i].con.children[j])+'",';
    		rotation=layers[i].con.children[j].rotation;
    		zmienna+='"rotation": "'+rotation+'",';
    		scaleX=layers[i].con.children[j].scaleX;
    		zmienna+='"scaleX": "'+scaleX+'",';
    		scaleY=layers[i].con.children[j].scaleY;
    		zmienna+='"scaleY": "'+scaleY+'",';
    		var bb= layers[i].con.children[j].getBounds();
    		if(!bb) {bb={width: 0, height: 0};};
    		zmienna+='"width": "'+bb.width+'",';
    		zmienna+='"height": "'+bb.height+'",';
    		x=scaleY*(layers[i].con.children[j].x+xx)*1;
    		zmienna+='"x": "'+x+'",';
    		y=scaleY*(layers[i].con.children[j].y+yy)*1;
    		zmienna+='"y": "'+y+'"}';
    		//zmienna+='"conMask": "'+zap(layers[i].conMask.children[j])+'"';
    		if(j+1<layers[i].con.children.length) zmienna+=',';

    		//zapisywanie maski
    		//if(bounds) argLayer.con.cache(bounds.x,bounds.y, bounds.width, bounds.height,jakosc);
    	}
    	zmienna+='],';
    	//zmienna+='},';
    	zmienna+='"conMask": {';
    	zmienna+='"x": "'+layers[i].conMask.x+'",';
    	zmienna+='"y": "'+layers[i].conMask.y+'",';
    	console.log("y:"+layers[i].conMask.y);
    	zmienna+='"rotation": "'+layers[i].conMask.rotation+'",';
    	zmienna+='"scaleX": "'+layers[i].conMask.scaleX+'",';
    	zmienna+='"scaleY": "'+layers[i].conMask.scaleY+'",';
    	var bb= layers[i].conMask.getBounds();
    	if(!bb) {bb={width: 0, height: 0};};
    	zmienna+='"width": "'+bb.width+'",';
    	zmienna+='"height": "'+bb.height+'",';
    	zmienna+='"con": ';
    	zmienna+='[';
    	for (var j=0; j<layers[i].conMask.children.length; j++) {
    		var boundsObraz = layers[i].conMask.children[j].getBounds();
    		if(boundsObraz) {xx=boundsObraz.x; yy=boundsObraz.y;} else {xx=0; yy=0;}
    		zmienna+='{"con": "'+zap(layers[i].conMask.children[j])+'",';
    		rotation=layers[i].conMask.children[j].rotation;
    		zmienna+='"rotation": "'+rotation+'",';
    		scaleX=layers[i].conMask.children[j].scaleX;
    		zmienna+='"scaleX": "'+scaleX+'",';
    		scaleY=layers[i].conMask.children[j].scaleY;
    		zmienna+='"scaleY": "'+scaleY+'",';
    		x=scaleY*(layers[i].conMask.children[j].x+xx)*1;
    		var bb= layers[i].conMask.children[j].getBounds();
    		if(!bb) {bb={width: 0, height: 0};};
    		zmienna+='"width": "'+bb.width+'",';
    		zmienna+='"height": "'+bb.height+'",';
    		zmienna+='"x": "'+x+'",';
    		y=scaleY*(layers[i].conMask.children[j].y+yy)*1;
    		zmienna+='"y": "'+y+'"}';
    		if(j+1<layers[i].conMask.children.length) zmienna+=',';

    		//zapisywanie maski
    		//if(bounds) argLayer.con.cache(bounds.x,bounds.y, bounds.width, bounds.height,jakosc);
    	}
    	zmienna+=']';
    	zmienna+='}';
    	zmienna+='}';
    	/*zmienna+='"conMask": ';
    	zmienna+='[';
    	for (var j=0; j<layers[i].conMask.children.length; j++) {
    		var boundsObraz = layers[i].conMask.children[j].getBounds();
    		if(boundsObraz) {xx=boundsObraz.x; yy=boundsObraz.y;} else {xx=0; yy=0;}

    		rotation=layers[i].conMask.children[j].rotation;
    		zmienna+='"rotation": "'+rotation+'",';
    		scaleX=layers[i].conMask.children[j].scaleX;
    		zmienna+='"scaleX": "'+scaleX+'",';
    		scaleY=layers[i].conMask.children[j].scaleY;
    		zmienna+='"scaleY": "'+scaleY+'",';
    		x=scaleY*(layers[i].conMask.children[j].x+xx)*1;
    		zmienna+='"x": "'+x+'",';
    		y=scaleY*(layers[i].conMask.children[j].y+yy)*1;
    		zmienna+='"y": "'+y+'"}';
    		if(j+1<layers[i].conMask.children.length) zmienna+=',';
    		//zapisywanie maski
    		//if(bounds) argLayer.con.cache(bounds.x,bounds.y, bounds.width, bounds.height,jakosc);
    	}
    	zmienna+=']';
    	zmienna+='}';*/
    	if(i+1<layers.length) zmienna+=',';
    }
    zmienna+=']';
    zmienna+='}';
    var file = btoa(encodeURIComponent(escape(zmienna)));

    var name = "nameFile"+".muu";
    var parseFile = new Parse.File(name, { base64: file });
    parseFile.save();
    var parseFileMini = new Parse.File("mini", { base64: mini });
    parseFileMini.save();
    if(adresPliku){
		var query = new Parse.Query("projekty");
		query.equalTo("objectId", adresPliku);
    	query.find({
    		success: function(results) {
	    		query = results[0];
		    	query.set("file", parseFile);
				query.set("mini", parseFileMini);
				query.set("name", nameFile);
		    	query.save(null, {
					success: function(post) {
						th.postep.koniec();
						console.log("Zapisano ***");
					}
				});
		    }
	    });
    } else {
    	var query = new Parse.Object("projekty");
		query.set("user", Parse.User.current());
		query.set("file", parseFile);
		query.set("mini", parseFileMini);
		query.set("name", nameFile);
		query.save(null, {
			success: function(post) {
				th.postep.koniec();
				console.log("Zapisano jako nowy");
			}
		});
	}
}
function zap (argLayer) {
	aaa=argLayer;
	var boundsObraz = aaa.getBounds();
	if(boundsObraz){
		aaa.cache(boundsObraz.x,boundsObraz.y, boundsObraz.width, boundsObraz.height,1);
		aaa.updateCache();
	}
	a=aaa.getCacheDataURL()
	if( a ){
		aaa.uncache();
    	return a;
    } else return null;
}
/*function ustawCookie(nazwa, wartosc, dni) {
    if (dni) {
        var data = new Date();
        data.setTime(data.getTime()+(dni*24*60*60*1000));
        var expires = "; expires="+data.toGMTString();
    } else {
        var expires = "";
    }
    document.cookie = nazwa+"=" + escape(wartosc) + expires + "; path=/";
}*/

function miniatura(funKon, dane) {
	/*$('body').append('<canvas id="testCanvas3" width="500" height="600" style="background-color: #888;"></canvas>');
	can2 = document.getElementById("testCanvas3");
	can2.width = plutnoW;
	can2.height = plutnoH;
	stage2 = new createjs.Stage(can2);
	var plutno = new createjs.Graphics().beginFill(plutnoK).drawRect(0,0, plutnoW, plutnoH);
	var plutno = new createjs.Shape(plutno);
	con = new createjs.Container();
	con.addChild(pole.clone(1));
	stage2.addChild(plutno)
	stage2.addChild(con);
	stage2.update();
	//var bounds = con.getBounds();
	//if(bounds) dataURL=con.cache(bounds.x,bounds.y, bounds.width, bounds.height,0.5); else console.log("brak bounds");
	if(plutnoW<plutnoH)
	stage2.cache(0,0,plutnoW,plutnoW,100/plutnoW);
	else
		stage2.cache(0,0,plutnoH,plutnoH,100/plutnoH);
	//dataURL=stage2.getCacheDataURL();
	can2.remove();*/
	if(plutnoW<plutnoH)
		stage.cache(rob.x,rob.y,plutnoW,plutnoW,100/plutnoW);
	else stage.cache(rob.x,rob.y,plutnoH,plutnoH,100/plutnoH);
    dataURL=stage.getCacheDataURL();
    stage.uncache();
    return dataURL;
}
function usunProjekt (object) {
	oknoTA(usunProjekt2,"Projekt zosatnie skosowany.");
	function usunProjekt2 () {
		var id=object.object.id;
		var tab = Parse.Object.extend("projekty");
		var query = new Parse.Query(tab);
		query.get(id, {
		  success: function(myObject) {
		    myObject.destroy({
			  success: function(myObject) {
				object.kasuj();
			    console.log("ok, skasowany");
			  },
			  error: function(myObject, error) {
			  	uwaga("Err");
			    console.log(error);
			  }
			});
			myObject.save();
		  },
		  error: function(object, error) {
		     console.log(error);
		     uwaga("Err");
		  }
		});
	}
}
