System.register(['./components/accordion', './components/buttons', './components/carousel', './components/collapse', './components/datepicker', './components/dropdown', './components/pagination', './components/progressbar', './components/rating', './components/tabs', './components/timepicker', './components/tooltip', './components/typeahead', './components/alert', './components/position', './components/common', './components/ng2-bootstrap-config'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var accordion_1, buttons_1, carousel_1, collapse_1, datepicker_1, dropdown_1, pagination_1, progressbar_1, rating_1, tabs_1, timepicker_1, tooltip_1, typeahead_1;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (accordion_1_1) {
                accordion_1 = accordion_1_1;
                exportStar_1(accordion_1_1);
            },
            function (buttons_1_1) {
                buttons_1 = buttons_1_1;
                exportStar_1(buttons_1_1);
            },
            function (carousel_1_1) {
                carousel_1 = carousel_1_1;
                exportStar_1(carousel_1_1);
            },
            function (collapse_1_1) {
                collapse_1 = collapse_1_1;
                exportStar_1(collapse_1_1);
            },
            function (datepicker_1_1) {
                datepicker_1 = datepicker_1_1;
                exportStar_1(datepicker_1_1);
            },
            function (dropdown_1_1) {
                dropdown_1 = dropdown_1_1;
                exportStar_1(dropdown_1_1);
            },
            function (pagination_1_1) {
                pagination_1 = pagination_1_1;
                exportStar_1(pagination_1_1);
            },
            function (progressbar_1_1) {
                progressbar_1 = progressbar_1_1;
                exportStar_1(progressbar_1_1);
            },
            function (rating_1_1) {
                rating_1 = rating_1_1;
                exportStar_1(rating_1_1);
            },
            function (tabs_1_1) {
                tabs_1 = tabs_1_1;
                exportStar_1(tabs_1_1);
            },
            function (timepicker_1_1) {
                timepicker_1 = timepicker_1_1;
                exportStar_1(timepicker_1_1);
            },
            function (tooltip_1_1) {
                tooltip_1 = tooltip_1_1;
                exportStar_1(tooltip_1_1);
            },
            function (typeahead_1_1) {
                typeahead_1 = typeahead_1_1;
                exportStar_1(typeahead_1_1);
            },
            function (alert_1_1) {
                exportStar_1(alert_1_1);
            },
            function (position_1_1) {
                exportStar_1(position_1_1);
            },
            function (common_1_1) {
                exportStar_1(common_1_1);
            },
            function (ng2_bootstrap_config_1_1) {
                exportStar_1(ng2_bootstrap_config_1_1);
            }],
        execute: function() {
            exports_1("default",{
                directives: [
                    accordion_1.ACCORDION_DIRECTIVES,
                    buttons_1.BUTTON_DIRECTIVES,
                    carousel_1.CAROUSEL_DIRECTIVES,
                    collapse_1.Collapse,
                    datepicker_1.DATEPICKER_DIRECTIVES,
                    dropdown_1.DROPDOWN_DIRECTIVES,
                    pagination_1.PAGINATION_DIRECTIVES,
                    progressbar_1.PROGRESSBAR_DIRECTIVES,
                    rating_1.Rating,
                    tabs_1.TAB_DIRECTIVES,
                    timepicker_1.Timepicker,
                    tooltip_1.TOOLTIP_DIRECTIVES,
                    typeahead_1.TYPEAHEAD_DIRECTIVES
                ]
            });
        }
    }
});
//# sourceMappingURL=ng2-bootstrap.js.map