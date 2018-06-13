System.register(['./dropdown/dropdown.directive', './dropdown/dropdown-menu.directive', './dropdown/dropdown-toggle.directive'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var dropdown_directive_1, dropdown_menu_directive_1, dropdown_toggle_directive_1;
    var DROPDOWN_DIRECTIVES;
    return {
        setters:[
            function (dropdown_directive_1_1) {
                dropdown_directive_1 = dropdown_directive_1_1;
                exports_1({
                    "Dropdown": dropdown_directive_1_1["Dropdown"]
                });
            },
            function (dropdown_menu_directive_1_1) {
                dropdown_menu_directive_1 = dropdown_menu_directive_1_1;
                exports_1({
                    "DropdownMenu": dropdown_menu_directive_1_1["DropdownMenu"]
                });
            },
            function (dropdown_toggle_directive_1_1) {
                dropdown_toggle_directive_1 = dropdown_toggle_directive_1_1;
                exports_1({
                    "DropdownToggle": dropdown_toggle_directive_1_1["DropdownToggle"]
                });
            }],
        execute: function() {
            exports_1("DROPDOWN_DIRECTIVES", DROPDOWN_DIRECTIVES = [dropdown_directive_1.Dropdown, dropdown_toggle_directive_1.DropdownToggle, dropdown_menu_directive_1.DropdownMenu]);
        }
    }
});
//# sourceMappingURL=dropdown.js.map