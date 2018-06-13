System.register(['./carousel/slide.component', './carousel/carousel.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var slide_component_1, carousel_component_1;
    var CAROUSEL_DIRECTIVES;
    return {
        setters:[
            function (slide_component_1_1) {
                slide_component_1 = slide_component_1_1;
                exports_1({
                    "Slide": slide_component_1_1["Slide"]
                });
            },
            function (carousel_component_1_1) {
                carousel_component_1 = carousel_component_1_1;
                exports_1({
                    "Carousel": carousel_component_1_1["Carousel"]
                });
            }],
        execute: function() {
            exports_1("CAROUSEL_DIRECTIVES", CAROUSEL_DIRECTIVES = [carousel_component_1.Carousel, slide_component_1.Slide]);
        }
    }
});
//# sourceMappingURL=carousel.js.map