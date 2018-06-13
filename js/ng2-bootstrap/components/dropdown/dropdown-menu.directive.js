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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, dropdown_directive_1;
    var DropdownMenu;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (dropdown_directive_1_1) {
                dropdown_directive_1 = dropdown_directive_1_1;
            }],
        execute: function() {
            DropdownMenu = (function () {
                function DropdownMenu(dropdown, el) {
                    this.dropdown = dropdown;
                    this.el = el;
                }
                DropdownMenu.prototype.ngOnInit = function () {
                    this.dropdown.dropDownMenu = this;
                };
                DropdownMenu = __decorate([
                    core_1.Directive({ selector: '[dropdownMenu]' }),
                    __param(0, core_1.Host()), 
                    __metadata('design:paramtypes', [dropdown_directive_1.Dropdown, core_1.ElementRef])
                ], DropdownMenu);
                return DropdownMenu;
            }());
            exports_1("DropdownMenu", DropdownMenu);
        }
    }
});
//# sourceMappingURL=dropdown-menu.directive.js.map