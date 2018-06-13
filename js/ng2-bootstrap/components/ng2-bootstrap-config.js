System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Ng2BootstrapTheme, Ng2BootstrapConfig;
    return {
        setters:[],
        execute: function() {
            (function (Ng2BootstrapTheme) {
                Ng2BootstrapTheme[Ng2BootstrapTheme["BS3"] = 1] = "BS3";
                Ng2BootstrapTheme[Ng2BootstrapTheme["BS4"] = 2] = "BS4";
            })(Ng2BootstrapTheme || (Ng2BootstrapTheme = {}));
            exports_1("Ng2BootstrapTheme", Ng2BootstrapTheme);
            Ng2BootstrapConfig = (function () {
                function Ng2BootstrapConfig() {
                }
                Object.defineProperty(Ng2BootstrapConfig, "theme", {
                    get: function () {
                        // hack as for now
                        var w = window;
                        if (w && w.__theme === 'bs4') {
                            return Ng2BootstrapTheme.BS4;
                        }
                        return (this._theme || Ng2BootstrapTheme.BS3);
                    },
                    set: function (v) {
                        this._theme = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Ng2BootstrapConfig;
            }());
            exports_1("Ng2BootstrapConfig", Ng2BootstrapConfig);
        }
    }
});
//# sourceMappingURL=ng2-bootstrap-config.js.map