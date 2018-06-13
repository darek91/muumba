ukrytyBlokLayer=0;
zapOmyKas=0;
function blokLayersF(){
	//okno = new oknoBlok("1");
	//okno = new oknoBlok("2");
	okno = new oknoBlok("Warstwy");okno.mini()
	blokLayers=okno.blok;
	blokLayersSrodek=okno.blokSrodek;
	var ico = new icoLeft("sort-down",17,28);
	var ico2=new  icoLeft("sort-up",17,28);
	var icoPlus=new icoLeft("plus-squared",17,22);
	var icoKosz=new icoLeft("trash",17,24);
	/*ico.scaleX=ico.scaleY= 0.15;
	ico2.scaleX=ico2.scaleY= 0.15;
	icoPlus.scaleX=icoPlus.scaleY= 0.15;
	icoKosz.scaleX=icoKosz.scaleY= 0.15;
	*/okno.blokDown.addChild(ico);
	okno.blokDown.addChild(ico2);
	okno.blokDown.addChild(icoPlus);
	okno.blokDown.addChild(icoKosz);
	ico.x=120;
	ico2.x=140;
	icoPlus.x=160;
	icoKosz.x=180;
	icoPlus.on("mousedown", function (evt) {
		var okno = new oknoFull().con;
		var okno2 = new createjs.Container();
		okno.addChild(okno2);
		var button= new createjs.Container();
		var graphics2 = new createjs.Graphics().beginFill("#f00").drawRect(0,0, 100, 30);
		var te2 = new createjs.Shape(graphics2);
		button.addChild(te2);

		/*okno.on("DOMMouseScroll", function (evt) {
				console.log("zdarzenie");
		});*/
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
				this.offset = { y: this.y - evt.stageY, yy: okno2.y};
		});
		liniaC.addChild(suwak);
		funZW=new fZmianWielkosci(function (argument) {
			liniaC.x=canvas.width-12;
		});

		
		suwak.on("pressmove", function (evt) {
			var bounds = okno2.getBounds();
			//console.log(bounds)
			var pt = okno.globalToLocal(stage.mouseX, stage.mouseY);
			//this.y = evt.stageY + this.offset.y;
			if(pt.y>=20 && pt.y<=canvas.height && bounds){
				this.y = evt.stageY + this.offset.y;
				okno2.y=-(this.y/canvas.height)*(bounds.height);
			}
		});



		bAnuluj=button.clone(1);
		bAnuluj.y=400;
		okno.addChild(bAnuluj);
		var text = new createjs.Text("Anuluj", "22px Arial", "#000");
		bAnuluj.addChild(text);
		bAnuluj.on("mousedown", function (evt) {stage.removeChild(okno);funZW.koniec();});
		
		bPlik=button.clone(1);
		bPlik.y=365;
		var text = new createjs.Text("Z pliku", "22px Arial", "#000");
		bPlik.addChild(text);
		okno.addChild(bPlik);

		bPusty=button.clone(1);
		bPusty.y=330;
		var text = new createjs.Text("Pusty", "22px Arial", "#000");
		bPusty.addChild(text);
		okno.addChild(bPusty);
		bPusty.on("mousedown", function (evt) {
			new layer;
			stage.removeChild(okno);
			funZW.koniec();	
		});
		bBib=button.clone(1);
		bBib.y=295;
		var text = new createjs.Text("Biblioteka", "22px Arial", "#000");
		bBib.addChild(text);
		okno.addChild(bBib);
		bBib.on("mousedown", function (evt) {
			okno.removeChild(okno2);
			okno2.removeAllChildren();
			okno2.y=0;
			suwak.y=0;
			okno.addChild(okno2);
			for (var i = 1; i <= 2; i++) {
				var bitmap = new createjs.Bitmap("image/"+i+".png");
				var a=new createjs.Container();
				a.addChild(bitmap);
				a.x=75*i;
				okno2.addChild(a);
				bitmap.on("mousedown", function (evt) {
					var b=new layer;
					b.con.addChild(this.clone());
					stage.removeChild(okno);
					funZW.koniec();
				});
			};
		});
		bFb=button.clone(1);
		bFb.y=260;
		var text = new createjs.Text("Facebook", "22px Arial", "#000");
		bFb.addChild(text);
		okno.addChild(bFb);

		bCamera=button.clone(1);
		bCamera.y=225;
		bCamera.addChild(new createjs.Text("Z kamerki", "22px Arial", "#000"));
		okno.addChild(bCamera);

		bCamera.on("mousedown", function (evt) {
			okno.removeChild(okno2);
			okno2.removeAllChildren();
			okno2.y=0;
			suwak.y=0;
			video();
			stage.removeChild(okno);
			funZW.koniec();
		});

		bFb.on("mousedown", function (evt) {
			okno2.removeAllChildren();
			okno.removeChild(okno2);
			okno.addChild(okno2);
			okno2.y=0;
			suwak.y=0;
			b=0;c=0;dalej='';
			pokazZdjecia();
			function pokazZdjecia (link) {
				FB.api(
				    link ? link : "/me/photos",
				    function (response) {
				    	if (response && !response.error) {
				    		k=Math.floor((canvas.width-150-15)/110)-1;
				    		function fTemp (i,b,c) {
								var image = new Image();
								image.crossOrigin = '';
								image.src=response.data[i].picture;
								image.onload = function (argument) {
									new pImageFb(event.target,i,b,c,okno2,response,funZW,okno);
								}
							}
							for (var i = 0; i <= response.data.length; i++) {
					    		if(i!=response.data.length){
					    			fTemp(i,b,c);
					    			if(b==k) {b=0; c++;} else b++;
					    		} else {
					    			if(dalej!='') {
					    				console.log(dalej);	
					    				okno2.removeChild(dalej);
					    				console.log("kasowanie"+dalej);
					    				//dlaczego to nie dziala
					    			}
					    			if(response.paging.next){
						    			dalej=new przyciskNext(" Następne ",okno2);
								    	dalej.con.x=150+110*b;dalej.con.y=50+110*c;
								    	if(b==k) {b=0; c++;}
								    	dalej.con.on("mousedown", function (evt) {
											pokazZdjecia(response.paging.next);
										});
								    }
									var bounds = okno2.getBounds();
									suwak.y =-canvas.height*(okno2.y/(bounds.height));
					    		}
					    	}
						} else if(response.error) console.log(response.error); else uwaga("Error");
					} 
				);
			}
		});
		bPlik.on("mousedown", function (evt) {
			input = $(document.createElement('input'));
			//input.appendTo('body');
			input.attr("type", "file");
			input.attr("id","fileupload");
			input.attr("name", "files[]");
			input.attr("multiple","");
			input.change(wczytaj);
			input.trigger('click');
			stage.removeChild(okno);
			funZW.koniec();
		});	
	});	
	icoKosz.on("mousedown", function (evt) {
		var data = new Date();
		if(!zapOmyKas || data.getTime()>zapOmyKas.getTime()+400){
			zapOmyKas=data;
			console.log(layerAkt.sort+" ==== "+layerAkt.name);
			layerAkt.del();
		}
	});
	ico.on("mousedown", function (evt) {
		var data = new Date();
		if(!zapOmyKas || data.getTime()>zapOmyKas.getTime()+500){
			if(layerAkt.sort>1){
				zapOmyKas=data;
				layers[layers.length-layerAkt.sort+1].sort++;
				layerAkt.sort--;
				sortWarstwy(layers);
			}
		}
	});
	ico2.on("mousedown", function (evt) {
		var data = new Date();
		if(!zapOmyKas || data.getTime()>zapOmyKas.getTime()+400){
			if(layerAkt.sort<layers.length){
				zapOmyKas=data;
				layers[layers.length-layerAkt.sort-1].sort--;
				layerAkt.sort++;
				sortWarstwy(layers);
			}
		}
	});
}
function wczytaj (argument) {
	var files =input[0].files;
	function wczytaj2 (i) {
		this.postep=new postepLadowania("Wgrywanie pliku");
		var file = files[i];
		var name = "photo.jpg";
		var parseFile = new Parse.File(name, file);
		var th=this
		parseFile.save().then(function(){
				var query = new Parse.Object("tempImage");
				//query.set("applicantName", "");
				query.set("file", parseFile);
				query.save(null, {	
					success: function(object) {
						loadImage(object.get("file").url(), function (argument) {
							th.postep.koniec();
						});
						object.destroy({
							success: function(myObject) {},
					  		error: function(myObject, error) {
						    uwaga("Error! #inE01")
						    console.log("#inE01");
							}
						});
					}	
				});
		});
	}
	for (var i = 0;i<files.length; i++) {
		a=new wczytaj2 (i)
	}
	input.remove();
}