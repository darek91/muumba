System.register(['./progressbar/progress.directive', './progressbar/bar.component', './progressbar/progressbar.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var progress_directive_1, bar_component_1, progressbar_component_1;
    var PROGRESSBAR_DIRECTIVES;
    return {
        setters:[
            function (progress_directive_1_1) {
                progress_directive_1 = progress_directive_1_1;
                exports_1({
                    "Progress": progress_directive_1_1["Progress"]
                });
            },
            function (bar_component_1_1) {
                bar_component_1 = bar_component_1_1;
                exports_1({
                    "Bar": bar_component_1_1["Bar"]
                });
            },
            function (progressbar_component_1_1) {
                progressbar_component_1 = progressbar_component_1_1;
                exports_1({
                    "Progressbar": progressbar_component_1_1["Progressbar"]
                });
            }],
        execute: function() {
            exports_1("PROGRESSBAR_DIRECTIVES", PROGRESSBAR_DIRECTIVES = [progress_directive_1.Progress, bar_component_1.Bar, progressbar_component_1.Progressbar]);
        }
    }
});
//# sourceMappingURL=progressbar.js.map