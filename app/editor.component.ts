import { Component, OnInit, EventEmitter,Input, Output} from 'angular2/core';
import { Router } from 'angular2/router';
import { AppComponent } from '../app/app.component';
import {HoverMenu} from '../services/hoverMenu';
/*import { Init } from './app';*/``
@Component({
    selector: 'my-home',
    templateUrl: "app/editor/index.html"
})

export class EditorComponent implements OnInit {
  errorMessage: string;
  //_HoverMenu: HoverMenu;
  //name: string = localStorage.getItem("name");
  constructor(_HoverMenu:HoverMenu) {
    //this._HoverMenu = _HoverMenu;
  }
  ngOnInit() {
    console.log("editor.conponent ngInInit");
    //this._HoverMenu.hoverOff();
    //init();
  }
  /*vote(agreed:boolean){
    this.onVoted.emit(agreed);
    this.voted = true;
  }*/
}
