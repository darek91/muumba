System.register(['angular2/core', './dropdown.directive'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, dropdown_directive_1;
    var KeyboardNav;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (dropdown_directive_1_1) {
                dropdown_directive_1 = dropdown_directive_1_1;
            }],
        execute: function() {
            KeyboardNav = (function () {
                function KeyboardNav(dd, el) {
                    this.dd = dd;
                    this.el = el;
                    console.warn('keyboard-nav deprecated');
                    dd.keyboardNav = true;
                }
                KeyboardNav.prototype.onKeydown = function (event) {
                    if (event.which !== 40 && event.which !== 38) {
                        return;
                    }
                    event.preventDefault();
                    event.stopPropagation();
                    var elems = this.dd.menuEl.nativeElement.getElementsByTagName('a');
                    switch (event.which) {
                        case (40):
                            if (typeof this.dd.selectedOption !== 'number') {
                                this.dd.selectedOption = 0;
                                break;
                            }
                            if (this.dd.selectedOption === elems.length - 1) {
                                break;
                            }
                            this.dd.selectedOption++;
                            break;
                        case (38):
                            if (typeof this.dd.selectedOption !== 'number') {
                                return;
                            }
                            if (this.dd.selectedOption === 0) {
                                // todo: return?
                                break;
                            }
                            this.dd.selectedOption--;
                            break;
                    }
                    elems[this.dd.selectedOption].nativeElement.focus();
                };
                KeyboardNav = __decorate([
                    core_1.Directive({
                        selector: '[dropdown][dropdownKeyboardNav]',
                        host: {
                            '(keydown)': 'onKeydown($event)'
                        }
                    }), 
                    __metadata('design:paramtypes', [dropdown_directive_1.Dropdown, core_1.ElementRef])
                ], KeyboardNav);
                return KeyboardNav;
            }());
            exports_1("KeyboardNav", KeyboardNav);
        }
    }
});
//# sourceMappingURL=dropdown-keyboard-nav.js.map