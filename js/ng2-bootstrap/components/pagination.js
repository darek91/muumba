System.register(['./pagination/pagination.component', './pagination/pager.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var pagination_component_1, pager_component_1;
    var PAGINATION_DIRECTIVES;
    return {
        setters:[
            function (pagination_component_1_1) {
                pagination_component_1 = pagination_component_1_1;
                exports_1({
                    "Pagination": pagination_component_1_1["Pagination"]
                });
            },
            function (pager_component_1_1) {
                pager_component_1 = pager_component_1_1;
                exports_1({
                    "Pager": pager_component_1_1["Pager"]
                });
            }],
        execute: function() {
            exports_1("PAGINATION_DIRECTIVES", PAGINATION_DIRECTIVES = [pagination_component_1.Pagination, pager_component_1.Pager]);
        }
    }
});
//# sourceMappingURL=pagination.js.map