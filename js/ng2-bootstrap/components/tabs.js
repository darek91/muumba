System.register(['./tabs/tab.directive', './tabs/tabset.component', './tabs/tab-heading.directive'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var tab_directive_1, tabset_component_1, tab_heading_directive_1;
    var TAB_DIRECTIVES;
    return {
        setters:[
            function (tab_directive_1_1) {
                tab_directive_1 = tab_directive_1_1;
                exports_1({
                    "Tab": tab_directive_1_1["Tab"]
                });
            },
            function (tabset_component_1_1) {
                tabset_component_1 = tabset_component_1_1;
                exports_1({
                    "Tabset": tabset_component_1_1["Tabset"]
                });
            },
            function (tab_heading_directive_1_1) {
                tab_heading_directive_1 = tab_heading_directive_1_1;
                exports_1({
                    "TabHeading": tab_heading_directive_1_1["TabHeading"]
                });
            }],
        execute: function() {
            exports_1("TAB_DIRECTIVES", TAB_DIRECTIVES = [tab_directive_1.Tab, tab_heading_directive_1.TabHeading, tabset_component_1.Tabset]);
        }
    }
});
//# sourceMappingURL=tabs.js.map