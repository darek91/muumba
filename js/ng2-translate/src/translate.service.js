"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/fromArray');
require('rxjs/add/operator/share');
require('rxjs/add/operator/map');
var translate_parser_1 = require('./translate.parser');
var MissingTranslationHandler = (function () {
    function MissingTranslationHandler() {
    }
    return MissingTranslationHandler;
}());
exports.MissingTranslationHandler = MissingTranslationHandler;
var TranslateLoader = (function () {
    function TranslateLoader() {
    }
    TranslateLoader = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], TranslateLoader);
    return TranslateLoader;
}());
exports.TranslateLoader = TranslateLoader;
var TranslateStaticLoader = (function () {
    function TranslateStaticLoader(http, prefix, suffix) {
        this.sfLoaderParams = { prefix: 'i18n', suffix: '.json' };
        this.http = http;
        this.configure(prefix, suffix);
    }
    /**
     * Defines the prefix & suffix used for getTranslation
     * @param prefix
     * @param suffix
     */
    TranslateStaticLoader.prototype.configure = function (prefix, suffix) {
        this.sfLoaderParams.prefix = prefix ? prefix : this.sfLoaderParams.prefix;
        this.sfLoaderParams.suffix = suffix ? suffix : this.sfLoaderParams.suffix;
    };
    /**
     * Gets the translations from the server
     * @param lang
     * @returns {any}
     */
    TranslateStaticLoader.prototype.getTranslation = function (lang) {
        return this.http.get(this.sfLoaderParams.prefix + "/" + lang + this.sfLoaderParams.suffix)
            .map(function (res) { return res.json(); });
    };
    TranslateStaticLoader = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Optional()),
        __param(2, core_1.Optional()), 
        __metadata('design:paramtypes', [http_1.Http, String, String])
    ], TranslateStaticLoader);
    return TranslateStaticLoader;
}());
exports.TranslateStaticLoader = TranslateStaticLoader;
var TranslateService = (function () {
    function TranslateService(http, loader) {
        this.http = http;
        /**
         * The lang currently used
         */
        this.currentLang = this.defaultLang;
        /**
         * An EventEmitter to listen to lang changes events
         * onLangChange.subscribe((params: {lang: string, translations: any}) => {
         *     // do something
         * });
         * @type {ng.EventEmitter}
         */
        this.onLangChange = new core_1.EventEmitter();
        this.translations = {};
        this.parser = new translate_parser_1.Parser();
        if (loader !== null) {
            this.currentLoader = loader;
        }
        else {
            this.useStaticFilesLoader();
        }
    }
    /**
     * Use a translations loader
     * @param loader
     */
    TranslateService.prototype.useLoader = function (loader) {
        this.currentLoader = loader;
    };
    /**
     * Use a static files loader
     */
    TranslateService.prototype.useStaticFilesLoader = function (prefix, suffix) {
        this.currentLoader = new TranslateStaticLoader(this.http, prefix, suffix);
    };
    /**
     * Sets the default language to use as a fallback
     * @param lang
     */
    TranslateService.prototype.setDefaultLang = function (lang) {
        this.defaultLang = lang;
    };
    /**
     * Changes the lang currently used
     * @param lang
     * @returns {Observable<*>}
     */
    TranslateService.prototype.use = function (lang) {
        var _this = this;
        var pending;
        // check if this language is available
        if (typeof this.translations[lang] === 'undefined') {
            // not available, ask for it
            pending = this.getTranslation(lang);
        }
        if (typeof pending !== 'undefined') {
            pending.subscribe(function (res) {
                _this.changeLang(lang);
            });
            return pending;
        }
        else {
            this.changeLang(lang);
            return Observable_1.Observable.of(this.translations[lang]);
        }
    };
    /**
     * Gets an object of translations for a given language with the current loader
     * @param lang
     * @returns {Observable<*>}
     */
    TranslateService.prototype.getTranslation = function (lang) {
        var _this = this;
        this.pending = this.currentLoader.getTranslation(lang).share();
        this.pending.subscribe(function (res) {
            _this.translations[lang] = res;
            _this.updateLangs();
        }, function (err) {
            throw err;
        }, function () {
            _this.pending = undefined;
        });
        return this.pending;
    };
    /**
     * Manually sets an object of translations for a given language
     * @param lang
     * @param translations
     */
    TranslateService.prototype.setTranslation = function (lang, translations) {
        this.translations[lang] = translations;
        this.updateLangs();
    };
    /**
     * Returns an array of currently available langs
     * @returns {any}
     */
    TranslateService.prototype.getLangs = function () {
        return this.langs;
    };
    /**
     * Update the list of available langs
     */
    TranslateService.prototype.updateLangs = function () {
        this.langs = Object.keys(this.translations);
    };
    /**
     * Returns the parsed result of the translations
     * @param translations
     * @param key
     * @param interpolateParams
     * @returns {any}
     */
    TranslateService.prototype.getParsedResult = function (translations, key, interpolateParams) {
        var res;
        if (key instanceof Array) {
            var result = {};
            for (var _i = 0, key_1 = key; _i < key_1.length; _i++) {
                var k = key_1[_i];
                result[k] = this.getParsedResult(translations, k, interpolateParams);
            }
            return result;
        }
        if (translations) {
            res = this.parser.interpolate(translations[key], interpolateParams);
        }
        if (typeof res === 'undefined' && this.defaultLang && this.defaultLang !== this.currentLang) {
            var translations_1 = this.parser.flattenObject(this.translations[this.defaultLang]);
            res = this.parser.interpolate(translations_1[key], interpolateParams);
        }
        if (!res && this.missingTranslationHandler) {
            this.missingTranslationHandler.handle(key);
        }
        return res || key;
    };
    /**
     * Gets the translated value of a key (or an array of keys)
     * @param key
     * @param interpolateParams
     * @returns {any} the translated key, or an object of translated keys
     */
    TranslateService.prototype.get = function (key, interpolateParams) {
        var _this = this;
        if (!key) {
            throw new Error('Parameter "key" required');
        }
        // check if we are loading a new translation to use
        if (this.pending) {
            return this.pending.map(function (res) {
                return _this.getParsedResult(_this.parser.flattenObject(res), key, interpolateParams);
            });
        }
        else {
            var translations = void 0;
            if (this.translations[this.currentLang]) {
                translations = this.parser.flattenObject(this.translations[this.currentLang]);
            }
            return Observable_1.Observable.of(this.getParsedResult(translations, key, interpolateParams));
        }
    };
    /**
     * Returns a translation instantly from the internal state of loaded translation.
     * All rules regarding the current language, the preferred language of even fallback languages will be used except any promise handling.
     * @param key
     * @param interpolateParams
     * @returns {string}
     */
    TranslateService.prototype.instant = function (key, interpolateParams) {
        if (!key) {
            throw new Error('Parameter "key" required');
        }
        // check if we are loading a new translation to use
        var translations;
        if (this.translations[this.currentLang]) {
            translations = this.parser.flattenObject(this.translations[this.currentLang]);
        }
        return this.getParsedResult(translations, key, interpolateParams);
    };
    /**
     * Sets the translated value of a key
     * @param key
     * @param value
     * @param lang
     */
    TranslateService.prototype.set = function (key, value, lang) {
        if (lang === void 0) { lang = this.currentLang; }
        this.translations[lang][key] = value;
        this.updateLangs();
    };
    TranslateService.prototype.changeLang = function (lang) {
        this.currentLang = lang;
        this.onLangChange.emit({ lang: lang, translations: this.translations[lang] });
    };
    TranslateService.prototype.setMissingTranslationHandler = function (handler) {
        this.missingTranslationHandler = handler;
    };
    TranslateService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Optional()), 
        __metadata('design:paramtypes', [http_1.Http, TranslateLoader])
    ], TranslateService);
    return TranslateService;
}());
exports.TranslateService = TranslateService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0cmFuc2xhdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEscUJBQWlELGVBQWUsQ0FBQyxDQUFBO0FBQ2pFLHFCQUE2QixlQUFlLENBQUMsQ0FBQTtBQUM3QywyQkFBeUIsaUJBQ3pCLENBQUMsQ0FEeUM7QUFDMUMsUUFBTywrQkFBK0IsQ0FBQyxDQUFBO0FBQ3ZDLFFBQU8seUJBQXlCLENBQUMsQ0FBQTtBQUNqQyxRQUFPLHVCQUF1QixDQUFDLENBQUE7QUFFL0IsaUNBQXFCLG9CQUFvQixDQUFDLENBQUE7QUFFMUM7SUFBQTtJQUVBLENBQUM7SUFBRCxnQ0FBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRnFCLGlDQUF5Qiw0QkFFOUMsQ0FBQTtBQUdEO0lBQUE7SUFFQSxDQUFDO0lBSEQ7UUFBQyxpQkFBVSxFQUFFOzt1QkFBQTtJQUdiLHNCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFGcUIsdUJBQWUsa0JBRXBDLENBQUE7QUFHRDtJQUlJLCtCQUFZLElBQVUsRUFBYyxNQUFjLEVBQWMsTUFBYztRQUZ0RSxtQkFBYyxHQUFHLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFDLENBQUM7UUFHdkQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSx5Q0FBUyxHQUFoQixVQUFpQixNQUFjLEVBQUUsTUFBYztRQUMzQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxNQUFNLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO1FBQzFFLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLE1BQU0sR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUM7SUFDOUUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSw4Q0FBYyxHQUFyQixVQUFzQixJQUFZO1FBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sU0FBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFRLENBQUM7YUFDckYsR0FBRyxDQUFDLFVBQUMsR0FBYSxJQUFLLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUE1Qkw7UUFBQyxpQkFBVSxFQUFFO21CQUtnQixlQUFRLEVBQUU7bUJBQWtCLGVBQVEsRUFBRTs7NkJBTHREO0lBNkJiLDRCQUFDO0FBQUQsQ0FBQyxBQTVCRCxJQTRCQztBQTVCWSw2QkFBcUIsd0JBNEJqQyxDQUFBO0FBR0Q7SUErQkksMEJBQW9CLElBQVUsRUFBYyxNQUF1QjtRQUEvQyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBOUI5Qjs7V0FFRztRQUNJLGdCQUFXLEdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQU85Qzs7Ozs7O1dBTUc7UUFDSSxpQkFBWSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUdwRCxpQkFBWSxHQUFRLEVBQUUsQ0FBQztRQUd2QixXQUFNLEdBQVcsSUFBSSx5QkFBTSxFQUFFLENBQUM7UUFRbEMsRUFBRSxDQUFBLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7UUFDaEMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDaEMsQ0FBQztJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSSxvQ0FBUyxHQUFoQixVQUFpQixNQUF1QjtRQUNwQyxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztJQUNoQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSwrQ0FBb0IsR0FBM0IsVUFBNEIsTUFBZSxFQUFFLE1BQWU7UUFDeEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRDs7O09BR0c7SUFDSSx5Q0FBYyxHQUFyQixVQUFzQixJQUFZO1FBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksOEJBQUcsR0FBVixVQUFXLElBQVk7UUFBdkIsaUJBbUJDO1FBbEJHLElBQUksT0FBd0IsQ0FBQztRQUM3QixzQ0FBc0M7UUFDdEMsRUFBRSxDQUFBLENBQUMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDaEQsNEJBQTRCO1lBQzVCLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFFRCxFQUFFLENBQUEsQ0FBQyxPQUFPLE9BQU8sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFRO2dCQUN2QixLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNuQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXRCLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEQsQ0FBQztJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0kseUNBQWMsR0FBckIsVUFBc0IsSUFBWTtRQUFsQyxpQkFZQztRQVhHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDL0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFXO1lBQy9CLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzlCLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDLEVBQUUsVUFBQyxHQUFRO1lBQ1IsTUFBTSxHQUFHLENBQUM7UUFDZCxDQUFDLEVBQUU7WUFDQyxLQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0kseUNBQWMsR0FBckIsVUFBc0IsSUFBWSxFQUFFLFlBQW9CO1FBQ3BELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBWSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksbUNBQVEsR0FBZjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7T0FFRztJQUNLLHNDQUFXLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ssMENBQWUsR0FBdkIsVUFBd0IsWUFBaUIsRUFBRSxHQUFRLEVBQUUsaUJBQTBCO1FBQzNFLElBQUksR0FBVyxDQUFDO1FBRWhCLEVBQUUsQ0FBQSxDQUFDLEdBQUcsWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksTUFBTSxHQUFRLEVBQUUsQ0FBQztZQUNyQixHQUFHLENBQUMsQ0FBVSxVQUFHLEVBQUgsV0FBRyxFQUFILGlCQUFHLEVBQUgsSUFBRyxDQUFDO2dCQUFiLElBQUksQ0FBQyxZQUFBO2dCQUNOLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsaUJBQWlCLENBQUMsQ0FBQzthQUN4RTtZQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUVELEVBQUUsQ0FBQSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDZCxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDeEUsQ0FBQztRQUVELEVBQUUsQ0FBQSxDQUFDLE9BQU8sR0FBRyxLQUFLLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDekYsSUFBSSxjQUFZLEdBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUN2RixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsY0FBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDeEUsQ0FBQztRQUVELEVBQUUsQ0FBQSxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBRUQsTUFBTSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksOEJBQUcsR0FBVixVQUFXLEdBQXlCLEVBQUUsaUJBQTBCO1FBQWhFLGlCQW1CQztRQWxCRyxFQUFFLENBQUEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDTixNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDaEQsQ0FBQztRQUVELG1EQUFtRDtRQUNuRCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQVE7Z0JBQzdCLE1BQU0sQ0FBQyxLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3hGLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxZQUFZLFNBQUssQ0FBQztZQUV0QixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2xGLENBQUM7WUFFRCxNQUFNLENBQUMsdUJBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUMsQ0FBQztRQUNyRixDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLGtDQUFPLEdBQWQsVUFBZSxHQUF5QixFQUFFLGlCQUEwQjtRQUNoRSxFQUFFLENBQUEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDTixNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDaEQsQ0FBQztRQUVELG1EQUFtRDtRQUNuRCxJQUFJLFlBQWlCLENBQUM7UUFFdEIsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksOEJBQUcsR0FBVixVQUFXLEdBQVcsRUFBRSxLQUFhLEVBQUUsSUFBK0I7UUFBL0Isb0JBQStCLEdBQS9CLE9BQWUsSUFBSSxDQUFDLFdBQVc7UUFDbEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDckMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTyxxQ0FBVSxHQUFsQixVQUFtQixJQUFZO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVNLHVEQUE0QixHQUFuQyxVQUFvQyxPQUFrQztRQUNsRSxJQUFJLENBQUMseUJBQXlCLEdBQUcsT0FBTyxDQUFDO0lBQzdDLENBQUM7SUExT0w7UUFBQyxpQkFBVSxFQUFFO21CQWdDd0IsZUFBUSxFQUFFOzt3QkFoQ2xDO0lBNE9iLHVCQUFDO0FBQUQsQ0FBQyxBQTNPRCxJQTJPQztBQTNPWSx3QkFBZ0IsbUJBMk81QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIsIE9wdGlvbmFsfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7SHR0cCwgUmVzcG9uc2V9IGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzL09ic2VydmFibGUnXG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvZnJvbUFycmF5JztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3Ivc2hhcmUnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xuXG5pbXBvcnQge1BhcnNlcn0gZnJvbSAnLi90cmFuc2xhdGUucGFyc2VyJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIge1xuICAgIGFic3RyYWN0IGhhbmRsZShrZXk6IHN0cmluZyk6IHZvaWQ7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUcmFuc2xhdGVMb2FkZXIge1xuICAgIGFic3RyYWN0IGdldFRyYW5zbGF0aW9uKGxhbmc6IHN0cmluZyk6IE9ic2VydmFibGU8YW55Pjtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0ZVN0YXRpY0xvYWRlciBpbXBsZW1lbnRzIFRyYW5zbGF0ZUxvYWRlciB7XG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwO1xuICAgIHByaXZhdGUgc2ZMb2FkZXJQYXJhbXMgPSB7cHJlZml4OiAnaTE4bicsIHN1ZmZpeDogJy5qc29uJ307XG5cbiAgICBjb25zdHJ1Y3RvcihodHRwOiBIdHRwLCBAT3B0aW9uYWwoKSBwcmVmaXg6IHN0cmluZywgQE9wdGlvbmFsKCkgc3VmZml4OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5odHRwID0gaHR0cDtcbiAgICAgICAgdGhpcy5jb25maWd1cmUocHJlZml4LCBzdWZmaXgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIHByZWZpeCAmIHN1ZmZpeCB1c2VkIGZvciBnZXRUcmFuc2xhdGlvblxuICAgICAqIEBwYXJhbSBwcmVmaXhcbiAgICAgKiBAcGFyYW0gc3VmZml4XG4gICAgICovXG4gICAgcHVibGljIGNvbmZpZ3VyZShwcmVmaXg6IHN0cmluZywgc3VmZml4OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZkxvYWRlclBhcmFtcy5wcmVmaXggPSBwcmVmaXggPyBwcmVmaXggOiB0aGlzLnNmTG9hZGVyUGFyYW1zLnByZWZpeDtcbiAgICAgICAgdGhpcy5zZkxvYWRlclBhcmFtcy5zdWZmaXggPSBzdWZmaXggPyBzdWZmaXggOiB0aGlzLnNmTG9hZGVyUGFyYW1zLnN1ZmZpeDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB0cmFuc2xhdGlvbnMgZnJvbSB0aGUgc2VydmVyXG4gICAgICogQHBhcmFtIGxhbmdcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRUcmFuc2xhdGlvbihsYW5nOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHt0aGlzLnNmTG9hZGVyUGFyYW1zLnByZWZpeH0vJHtsYW5nfSR7dGhpcy5zZkxvYWRlclBhcmFtcy5zdWZmaXh9YClcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHJlcy5qc29uKCkpO1xuICAgIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0ZVNlcnZpY2Uge1xuICAgIC8qKlxuICAgICAqIFRoZSBsYW5nIGN1cnJlbnRseSB1c2VkXG4gICAgICovXG4gICAgcHVibGljIGN1cnJlbnRMYW5nOiBzdHJpbmcgPSB0aGlzLmRlZmF1bHRMYW5nO1xuXG4gICAgLyoqXG4gICAgICogQW4gaW5zdGFuY2Ugb2YgdGhlIGxvYWRlciBjdXJyZW50bHkgdXNlZFxuICAgICAqL1xuICAgIHB1YmxpYyBjdXJyZW50TG9hZGVyOiBUcmFuc2xhdGVMb2FkZXI7XG5cbiAgICAvKipcbiAgICAgKiBBbiBFdmVudEVtaXR0ZXIgdG8gbGlzdGVuIHRvIGxhbmcgY2hhbmdlcyBldmVudHNcbiAgICAgKiBvbkxhbmdDaGFuZ2Uuc3Vic2NyaWJlKChwYXJhbXM6IHtsYW5nOiBzdHJpbmcsIHRyYW5zbGF0aW9uczogYW55fSkgPT4ge1xuICAgICAqICAgICAvLyBkbyBzb21ldGhpbmdcbiAgICAgKiB9KTtcbiAgICAgKiBAdHlwZSB7bmcuRXZlbnRFbWl0dGVyfVxuICAgICAqL1xuICAgIHB1YmxpYyBvbkxhbmdDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHJpdmF0ZSBwZW5kaW5nOiBhbnk7XG4gICAgcHJpdmF0ZSB0cmFuc2xhdGlvbnM6IGFueSA9IHt9O1xuICAgIHByaXZhdGUgZGVmYXVsdExhbmc6IHN0cmluZztcbiAgICBwcml2YXRlIGxhbmdzOiBBcnJheTxzdHJpbmc+O1xuICAgIHByaXZhdGUgcGFyc2VyOiBQYXJzZXIgPSBuZXcgUGFyc2VyKCk7XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZvciBtaXNzaW5nIHRyYW5zbGF0aW9uc1xuICAgICAqL1xuICAgIHByaXZhdGUgbWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlcjogTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlcjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCwgQE9wdGlvbmFsKCkgbG9hZGVyOiBUcmFuc2xhdGVMb2FkZXIpIHtcbiAgICAgICAgaWYobG9hZGVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRMb2FkZXIgPSBsb2FkZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVzZVN0YXRpY0ZpbGVzTG9hZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVc2UgYSB0cmFuc2xhdGlvbnMgbG9hZGVyXG4gICAgICogQHBhcmFtIGxvYWRlclxuICAgICAqL1xuICAgIHB1YmxpYyB1c2VMb2FkZXIobG9hZGVyOiBUcmFuc2xhdGVMb2FkZXIpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50TG9hZGVyID0gbG9hZGVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVzZSBhIHN0YXRpYyBmaWxlcyBsb2FkZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgdXNlU3RhdGljRmlsZXNMb2FkZXIocHJlZml4Pzogc3RyaW5nLCBzdWZmaXg/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50TG9hZGVyID0gbmV3IFRyYW5zbGF0ZVN0YXRpY0xvYWRlcih0aGlzLmh0dHAsIHByZWZpeCwgc3VmZml4KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBkZWZhdWx0IGxhbmd1YWdlIHRvIHVzZSBhcyBhIGZhbGxiYWNrXG4gICAgICogQHBhcmFtIGxhbmdcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0RGVmYXVsdExhbmcobGFuZzogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZGVmYXVsdExhbmcgPSBsYW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoYW5nZXMgdGhlIGxhbmcgY3VycmVudGx5IHVzZWRcbiAgICAgKiBAcGFyYW0gbGFuZ1xuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPCo+fVxuICAgICAqL1xuICAgIHB1YmxpYyB1c2UobGFuZzogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdmFyIHBlbmRpbmc6IE9ic2VydmFibGU8YW55PjtcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhpcyBsYW5ndWFnZSBpcyBhdmFpbGFibGVcbiAgICAgICAgaWYodHlwZW9mIHRoaXMudHJhbnNsYXRpb25zW2xhbmddID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgLy8gbm90IGF2YWlsYWJsZSwgYXNrIGZvciBpdFxuICAgICAgICAgICAgcGVuZGluZyA9IHRoaXMuZ2V0VHJhbnNsYXRpb24obGFuZyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0eXBlb2YgcGVuZGluZyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHBlbmRpbmcuc3Vic2NyaWJlKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlTGFuZyhsYW5nKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gcGVuZGluZztcbiAgICAgICAgfSBlbHNlIHsgLy8gd2UgaGF2ZSB0aGlzIGxhbmd1YWdlLCByZXR1cm4gYW4gT2JzZXJ2YWJsZVxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VMYW5nKGxhbmcpO1xuXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZih0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGFuIG9iamVjdCBvZiB0cmFuc2xhdGlvbnMgZm9yIGEgZ2l2ZW4gbGFuZ3VhZ2Ugd2l0aCB0aGUgY3VycmVudCBsb2FkZXJcbiAgICAgKiBAcGFyYW0gbGFuZ1xuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPCo+fVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRUcmFuc2xhdGlvbihsYW5nOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICB0aGlzLnBlbmRpbmcgPSB0aGlzLmN1cnJlbnRMb2FkZXIuZ2V0VHJhbnNsYXRpb24obGFuZykuc2hhcmUoKTtcbiAgICAgICAgdGhpcy5wZW5kaW5nLnN1YnNjcmliZSgocmVzOiBPYmplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNsYXRpb25zW2xhbmddID0gcmVzO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVMYW5ncygpO1xuICAgICAgICB9LCAoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wZW5kaW5nID0gdW5kZWZpbmVkO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5wZW5kaW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1hbnVhbGx5IHNldHMgYW4gb2JqZWN0IG9mIHRyYW5zbGF0aW9ucyBmb3IgYSBnaXZlbiBsYW5ndWFnZVxuICAgICAqIEBwYXJhbSBsYW5nXG4gICAgICogQHBhcmFtIHRyYW5zbGF0aW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBzZXRUcmFuc2xhdGlvbihsYW5nOiBzdHJpbmcsIHRyYW5zbGF0aW9uczogT2JqZWN0KSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRpb25zW2xhbmddID0gdHJhbnNsYXRpb25zO1xuICAgICAgICB0aGlzLnVwZGF0ZUxhbmdzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBvZiBjdXJyZW50bHkgYXZhaWxhYmxlIGxhbmdzXG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0TGFuZ3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxhbmdzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgbGlzdCBvZiBhdmFpbGFibGUgbGFuZ3NcbiAgICAgKi9cbiAgICBwcml2YXRlIHVwZGF0ZUxhbmdzKCkge1xuICAgICAgICB0aGlzLmxhbmdzID0gT2JqZWN0LmtleXModGhpcy50cmFuc2xhdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHBhcnNlZCByZXN1bHQgb2YgdGhlIHRyYW5zbGF0aW9uc1xuICAgICAqIEBwYXJhbSB0cmFuc2xhdGlvbnNcbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICogQHBhcmFtIGludGVycG9sYXRlUGFyYW1zXG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFBhcnNlZFJlc3VsdCh0cmFuc2xhdGlvbnM6IGFueSwga2V5OiBhbnksIGludGVycG9sYXRlUGFyYW1zPzogT2JqZWN0KTogc3RyaW5nIHtcbiAgICAgICAgdmFyIHJlczogc3RyaW5nO1xuXG4gICAgICAgIGlmKGtleSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBhbnkgPSB7fTtcbiAgICAgICAgICAgIGZvciAodmFyIGsgb2Yga2V5KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W2tdID0gdGhpcy5nZXRQYXJzZWRSZXN1bHQodHJhbnNsYXRpb25zLCBrLCBpbnRlcnBvbGF0ZVBhcmFtcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodHJhbnNsYXRpb25zKSB7XG4gICAgICAgICAgICByZXMgPSB0aGlzLnBhcnNlci5pbnRlcnBvbGF0ZSh0cmFuc2xhdGlvbnNba2V5XSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodHlwZW9mIHJlcyA9PT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5kZWZhdWx0TGFuZyAmJiB0aGlzLmRlZmF1bHRMYW5nICE9PSB0aGlzLmN1cnJlbnRMYW5nKSB7XG4gICAgICAgICAgICBsZXQgdHJhbnNsYXRpb25zOiBhbnkgPSB0aGlzLnBhcnNlci5mbGF0dGVuT2JqZWN0KHRoaXMudHJhbnNsYXRpb25zW3RoaXMuZGVmYXVsdExhbmddKTtcbiAgICAgICAgICAgIHJlcyA9IHRoaXMucGFyc2VyLmludGVycG9sYXRlKHRyYW5zbGF0aW9uc1trZXldLCBpbnRlcnBvbGF0ZVBhcmFtcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZighcmVzICYmIHRoaXMubWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5taXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyLmhhbmRsZShrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlcyB8fCBrZXk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdHJhbnNsYXRlZCB2YWx1ZSBvZiBhIGtleSAob3IgYW4gYXJyYXkgb2Yga2V5cylcbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICogQHBhcmFtIGludGVycG9sYXRlUGFyYW1zXG4gICAgICogQHJldHVybnMge2FueX0gdGhlIHRyYW5zbGF0ZWQga2V5LCBvciBhbiBvYmplY3Qgb2YgdHJhbnNsYXRlZCBrZXlzXG4gICAgICovXG4gICAgcHVibGljIGdldChrZXk6IHN0cmluZ3xBcnJheTxzdHJpbmc+LCBpbnRlcnBvbGF0ZVBhcmFtcz86IE9iamVjdCk6IE9ic2VydmFibGU8c3RyaW5nfGFueT4ge1xuICAgICAgICBpZigha2V5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlciBcImtleVwiIHJlcXVpcmVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBpZiB3ZSBhcmUgbG9hZGluZyBhIG5ldyB0cmFuc2xhdGlvbiB0byB1c2VcbiAgICAgICAgaWYodGhpcy5wZW5kaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wZW5kaW5nLm1hcCgocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJzZWRSZXN1bHQodGhpcy5wYXJzZXIuZmxhdHRlbk9iamVjdChyZXMpLCBrZXksIGludGVycG9sYXRlUGFyYW1zKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHRyYW5zbGF0aW9uczogYW55O1xuXG4gICAgICAgICAgICBpZih0aGlzLnRyYW5zbGF0aW9uc1t0aGlzLmN1cnJlbnRMYW5nXSkge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9ucyA9IHRoaXMucGFyc2VyLmZsYXR0ZW5PYmplY3QodGhpcy50cmFuc2xhdGlvbnNbdGhpcy5jdXJyZW50TGFuZ10pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZih0aGlzLmdldFBhcnNlZFJlc3VsdCh0cmFuc2xhdGlvbnMsIGtleSwgaW50ZXJwb2xhdGVQYXJhbXMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSB0cmFuc2xhdGlvbiBpbnN0YW50bHkgZnJvbSB0aGUgaW50ZXJuYWwgc3RhdGUgb2YgbG9hZGVkIHRyYW5zbGF0aW9uLlxuICAgICAqIEFsbCBydWxlcyByZWdhcmRpbmcgdGhlIGN1cnJlbnQgbGFuZ3VhZ2UsIHRoZSBwcmVmZXJyZWQgbGFuZ3VhZ2Ugb2YgZXZlbiBmYWxsYmFjayBsYW5ndWFnZXMgd2lsbCBiZSB1c2VkIGV4Y2VwdCBhbnkgcHJvbWlzZSBoYW5kbGluZy5cbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICogQHBhcmFtIGludGVycG9sYXRlUGFyYW1zXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBwdWJsaWMgaW5zdGFudChrZXk6IHN0cmluZ3xBcnJheTxzdHJpbmc+LCBpbnRlcnBvbGF0ZVBhcmFtcz86IE9iamVjdCk6IHN0cmluZ3xhbnkge1xuICAgICAgICBpZigha2V5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlciBcImtleVwiIHJlcXVpcmVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBpZiB3ZSBhcmUgbG9hZGluZyBhIG5ldyB0cmFuc2xhdGlvbiB0byB1c2VcbiAgICAgICAgbGV0IHRyYW5zbGF0aW9uczogYW55O1xuXG4gICAgICAgIGlmKHRoaXMudHJhbnNsYXRpb25zW3RoaXMuY3VycmVudExhbmddKSB7XG4gICAgICAgICAgICB0cmFuc2xhdGlvbnMgPSB0aGlzLnBhcnNlci5mbGF0dGVuT2JqZWN0KHRoaXMudHJhbnNsYXRpb25zW3RoaXMuY3VycmVudExhbmddKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcnNlZFJlc3VsdCh0cmFuc2xhdGlvbnMsIGtleSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHRyYW5zbGF0ZWQgdmFsdWUgb2YgYSBrZXlcbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHBhcmFtIGxhbmdcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBsYW5nOiBzdHJpbmcgPSB0aGlzLmN1cnJlbnRMYW5nKSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRpb25zW2xhbmddW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVMYW5ncygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlTGFuZyhsYW5nOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50TGFuZyA9IGxhbmc7XG4gICAgICAgIHRoaXMub25MYW5nQ2hhbmdlLmVtaXQoe2xhbmc6IGxhbmcsIHRyYW5zbGF0aW9uczogdGhpcy50cmFuc2xhdGlvbnNbbGFuZ119KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0TWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlcihoYW5kbGVyOiBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyKSB7XG4gICAgICAgIHRoaXMubWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlciA9IGhhbmRsZXI7XG4gICAgfVxuXG59XG4iXX0=