System.register(['moment'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var moment;
    var DateFormatter;
    return {
        setters:[
            function (moment_1) {
                moment = moment_1;
            }],
        execute: function() {
            DateFormatter = (function () {
                function DateFormatter() {
                }
                DateFormatter.prototype.format = function (date, format) {
                    return moment(date.getTime()).format(format);
                };
                return DateFormatter;
            }());
            exports_1("DateFormatter", DateFormatter);
        }
    }
});
//# sourceMappingURL=date-formatter.js.map