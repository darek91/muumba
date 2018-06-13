System.register(['./typeahead/typeahead.directive', './typeahead/typeahead-container.component', './typeahead/typeahead-options.class'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var typeahead_directive_1, typeahead_container_component_1;
    var TYPEAHEAD_DIRECTIVES;
    return {
        setters:[
            function (typeahead_directive_1_1) {
                typeahead_directive_1 = typeahead_directive_1_1;
                exports_1({
                    "Typeahead": typeahead_directive_1_1["Typeahead"]
                });
            },
            function (typeahead_container_component_1_1) {
                typeahead_container_component_1 = typeahead_container_component_1_1;
                exports_1({
                    "TypeaheadContainer": typeahead_container_component_1_1["TypeaheadContainer"]
                });
            },
            function (typeahead_options_class_1_1) {
                exports_1({
                    "TypeaheadOptions": typeahead_options_class_1_1["TypeaheadOptions"]
                });
            }],
        execute: function() {
            exports_1("TYPEAHEAD_DIRECTIVES", TYPEAHEAD_DIRECTIVES = [typeahead_directive_1.Typeahead, typeahead_container_component_1.TypeaheadContainer]);
        }
    }
});
//# sourceMappingURL=typeahead.js.map