System.register(['./datepicker/datepicker-popup', './datepicker/datepicker'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var datepicker_popup_1, datepicker_1;
    var DATEPICKER_DIRECTIVES;
    return {
        setters:[
            function (datepicker_popup_1_1) {
                datepicker_popup_1 = datepicker_popup_1_1;
                exports_1({
                    "DatePickerPopup": datepicker_popup_1_1["DatePickerPopup"]
                });
            },
            function (datepicker_1_1) {
                datepicker_1 = datepicker_1_1;
                exports_1({
                    "DatePicker": datepicker_1_1["DatePicker"]
                });
            }],
        execute: function() {
            exports_1("DATEPICKER_DIRECTIVES", DATEPICKER_DIRECTIVES = [datepicker_1.DatePicker, datepicker_popup_1.DatePickerPopup]);
        }
    }
});
//# sourceMappingURL=datepicker.js.map