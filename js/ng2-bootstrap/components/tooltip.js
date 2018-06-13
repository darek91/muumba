System.register(['./tooltip/tooltip.directive', './tooltip/tooltip-container.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var tooltip_directive_1, tooltip_container_component_1;
    var TOOLTIP_DIRECTIVES;
    return {
        setters:[
            function (tooltip_directive_1_1) {
                tooltip_directive_1 = tooltip_directive_1_1;
                exports_1({
                    "Tooltip": tooltip_directive_1_1["Tooltip"]
                });
            },
            function (tooltip_container_component_1_1) {
                tooltip_container_component_1 = tooltip_container_component_1_1;
                exports_1({
                    "TooltipContainer": tooltip_container_component_1_1["TooltipContainer"]
                });
            }],
        execute: function() {
            exports_1("TOOLTIP_DIRECTIVES", TOOLTIP_DIRECTIVES = [tooltip_directive_1.Tooltip, tooltip_container_component_1.TooltipContainer]);
        }
    }
});
//# sourceMappingURL=tooltip.js.map