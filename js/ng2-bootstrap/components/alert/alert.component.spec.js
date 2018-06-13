System.register(['angular2/testing', './alert.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var testing_1, alert_component_1;
    return {
        setters:[
            function (testing_1_1) {
                testing_1 = testing_1_1;
            },
            function (alert_component_1_1) {
                alert_component_1 = alert_component_1_1;
            }],
        execute: function() {
            describe('Alert', function () {
                testing_1.beforeEachProviders(function () { return [
                    alert_component_1.Alert
                ]; });
                testing_1.it('should have default type', testing_1.inject([alert_component_1.Alert], function (alert) {
                    expect(alert.type).toEqual('warning');
                }));
            });
        }
    }
});
//# sourceMappingURL=alert.component.spec.js.map