belkaLog=0;
function newUser()
{
	var user = new Parse.User();
	user.set("username", "my name");
	user.set("password", "my pass");
	user.set("email", "email@example.com");

	// other fields can be set just like with Parse.Object
	user.set("phone", "415-392-0202");

	user.signUp(null, {
	  success: function(user) {
	    // Hooray! Let them use the app now.
	    uwaga("Zalogowanie "+user);
	  },
	  error: function(user, error) {
	    // Show the error message somewhere and let the user try again.
	    uwaga("Error: " + error.code + " " + error.message);
	  }
	});
}
function login(login, pass,fun1,fun2)
{
	pass='my pass';
	console.log(login);
	Parse.User.logIn(login, pass, {
		success: function(user) {
			fun1();
		},
		error: function(user, error) {
			fun2(error);
		}
	});
}
function okienkoLog (fun,tekst) {
	ofp=new oknoFullP();
	var okno = new createjs.Container();
	okno.on("mousedown", function (evt) {});
	stage.addChild(okno);
	var g2 = new createjs.Graphics();
	g2.setStrokeStyle(1);
 	g2.beginStroke("#555");
	g2.beginFill("#aaa").drawRoundRect(0,0, 410, 155,4);
	var te = new createjs.Shape(g2);
	okno.addChild(te);
	if (!Parse.User.current()){
		if(!tekst) tekst= "Logowanie:";
		tekst=new createjs.Text(tekst, "18px Arial", "#000");
		tekst.maxWidth=380;
		okno.addChild(tekst);
		tekst.x=20;tekst.y=20;

		var log=document.createElement("input");
		log.type="text";
		log.style.position = "absolute";
		log.style.top = 0;
		log.style.left = 0;
		document.body.appendChild(log);
		var domElement = new createjs.DOMElement(log);
		domElement.x = 20;
		domElement.y = 50;
		okno.addChild(domElement);

		var pass=document.createElement("input");
		pass.type="password";
		pass.style.position = "absolute";
		pass.style.top = 0;
		pass.style.left = 0;
		document.body.appendChild(pass);
		var domElement = new createjs.DOMElement(pass);
		domElement.x = 20;
		domElement.y = 70;
		okno.addChild(domElement);

		pfb = new przycisk("Fb",okno);
		pfb.con.on("mousedown", function (evt) {
			fu();
			stage.removeChild(th.con);
			stage.removeChild(ofp.con);
			if(pass) pass.remove();
			if(log) log.remove();
		});
		pfb.con.x=220;pfb.con.y=50;

		pOk = new przycisk("Zaloguj",okno);
		pOk.con.on("mousedown", function (evt) {
			login(log.value,pass.value,function  () {
				stage.removeChild(th.con);
				stage.removeChild(ofp.con);
				pass.remove();
				log.remove();
				odswiezLog();
			},function (error) {
				console.log(error.code + " " + error.message);
				okno.removeChild(tekst);
				tekst=new createjs.Text(error.code + " " + error.message, "18px Arial", "#000");
				tekst.maxWidth=380;
				okno.addChild(tekst);
				tekst.x=20;tekst.y=20;
				stage.update();
			});

		});
		pOk.con.y=120;pOk.con.x=10;
	} else {
		if (!Parse.FacebookUtils.isLinked(user)) {
			pfb2 = new przycisk("Linking",okno);
			pfb2.con.on("mousedown", function (evt) {
				if (!Parse.FacebookUtils.isLinked(user)) {
				  Parse.FacebookUtils.link(user, null, {
				    success: function(user) {
				    	stage.removeChild(th.con);
						stage.removeChild(ofp.con);
						if(pass) pass.remove();
						if(log) log.remove();
				    	uwaga("Podłączono kontem FB");
				    },
				    error: function(user, error) {
				    	uwaga("Error.");
				    	console.log(error);
				    }
				  });
				}
			});
			pfb2.con.x=210;pfb2.con.y=10;
		} else {
			FB.api(
			    "/me",
			    function (response) {
			    	if (response && !response.error) {
			    		text = new createjs.Text(response.name, "18px Arial", "#ff7700");
						okno.addChild(text);
						text.x=10;text.y=10;
					} else {
						if(response.error) uwaga(response.error.message); else uwaga("Error");
					}
				}
			);
		}

		pOk = new przycisk(icons["ok"]+" Wyloguj",okno);

		pOk.con.on("mousedown", function (evt) {
			Parse.User.logOut();
			odswiezLog();
			stage.removeChild(th.con);
			stage.removeChild(ofp.con);
			if(pass) pass.remove();
			if(log) log.remove();
			var currentUser = Parse.User.current();

		});
		pOk.con.y=120;pOk.con.x=10;
	}
	pAnuluj = new przycisk(icons["cancel"]+" Anuluj",okno);
	var th=this;
	//if (currentUser){}
	this.con = okno;
	pAnuluj.con.on("mousedown", function (evt) {
		stage.removeChild(th.con);
		stage.removeChild(ofp.con);
		if(pass) pass.remove();
		if(log) log.remove();
	});
	pAnuluj.con.y=120;pAnuluj.con.x=210;
	okno.x=((canvas.width-410))/2;
	okno.y=((canvas.height-155))/2;
}



$(function() {
	//Parse.$ = jQuery;
	Parse.initialize("U4unTbNQuMFjI0PFatkEDsgHpxIYvr8hiFhoOxFp",
                   "Q31xnNLXBOST5RBSbPFQq8mG1X02ZJ8GQI33NXLv");
	window.fbAsyncInit = function() {
    Parse.FacebookUtils.init({ // this line replaces FB.init({
      appId      : '342028705986112', // Facebook App ID
      status     : true,  // check Facebook Login status
      cookie     : true,  // enable cookies to allow Parse to access the session
      xfbml      : true,  // initialize Facebook social plugins on the page
      version    : 'v2.2' // point to the latest Facebook Graph API version
    });
    FB.Event.subscribe('auth.statusChange', callback);
    function callback(flag) {
	    console.log(flag);
	}
 	FB.getLoginStatus(function(response) {
        var flag;
        if (response.status === 'connected') {
            flag = 1;
        } else if (response.status === 'not_authorized') {
            flag = 2;
        } else {
            flag = 3;
            uwaga("niezalogowany, błąd autoryzacji")
        }
        callback(flag);
        /* This will call the anonymous function specified as
           "callback" with a parameter of whatever is in the
           "flag" variable. */
    });
    // Run code after the Facebook SDK is loaded.

	$(window).on('beforeunload', function() {
           //if(zmiana)
           	//return "Niezapisane dane zostaną utracone";
           //wylaczone do testow
    });



};

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
});
function fu (argument) {
	Parse.User.logOut();
	FB.logout()
	currentUser = Parse.User.current();
	console.log(currentUser);
	Parse.FacebookUtils.logIn(null, {
      success: function(user) {
        if (!user.existed()) {
          uwaga("User signed up and logged in through Facebook!");
          odswiezLog();
        } else {
          uwaga("User logged in through Facebook!");
          odswiezLog();
        }
      },
      error: function(user, error) {
        uwaga("Error: "+error);
      }
    });
}
function odswiezLog (argument) {
	if(belkaLog) stage.removeChild(belkaLog);
	currentUser = Parse.User.current();
	if (currentUser) {napisZal=icons["facebook-squared"]+" Zalogowany"} else napisZal="Zaloguj"
	belkaLog = new przycisk (napisZal,stage);
	belkaLog.con.on("mousedown", function (evt) {
		okienkoLog();
	});
	//ico=new getIcon("facebook-squared");
	//belkaLog.con.addChild(ico.con);
	belkaLog.con.x=100;
}
