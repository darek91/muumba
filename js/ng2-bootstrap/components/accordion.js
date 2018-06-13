System.register(['./accordion/accordion.component', './accordion/accordion-group.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var accordion_component_1, accordion_group_component_1;
    var ACCORDION_DIRECTIVES;
    return {
        setters:[
            function (accordion_component_1_1) {
                accordion_component_1 = accordion_component_1_1;
                exports_1({
                    "Accordion": accordion_component_1_1["Accordion"]
                });
            },
            function (accordion_group_component_1_1) {
                accordion_group_component_1 = accordion_group_component_1_1;
                exports_1({
                    "AccordionPanel": accordion_group_component_1_1["AccordionPanel"]
                });
            }],
        execute: function() {
            exports_1("ACCORDION_DIRECTIVES", ACCORDION_DIRECTIVES = [accordion_component_1.Accordion, accordion_group_component_1.AccordionPanel]);
        }
    }
});
//# sourceMappingURL=accordion.js.map