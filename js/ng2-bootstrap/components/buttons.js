System.register(['./buttons/button-checkbox.component', './buttons/button-radio.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var button_checkbox_component_1, button_radio_component_1;
    var BUTTON_DIRECTIVES;
    return {
        setters:[
            function (button_checkbox_component_1_1) {
                button_checkbox_component_1 = button_checkbox_component_1_1;
                exports_1({
                    "ButtonCheckbox": button_checkbox_component_1_1["ButtonCheckbox"]
                });
            },
            function (button_radio_component_1_1) {
                button_radio_component_1 = button_radio_component_1_1;
                exports_1({
                    "ButtonRadio": button_radio_component_1_1["ButtonRadio"]
                });
            }],
        execute: function() {
            exports_1("BUTTON_DIRECTIVES", BUTTON_DIRECTIVES = [button_checkbox_component_1.ButtonCheckbox, button_radio_component_1.ButtonRadio]);
        }
    }
});
//# sourceMappingURL=buttons.js.map