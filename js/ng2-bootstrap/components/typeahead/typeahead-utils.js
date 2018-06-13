System.register(['./latin-map'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var latin_map_1;
    var TypeaheadUtils;
    return {
        setters:[
            function (latin_map_1_1) {
                latin_map_1 = latin_map_1_1;
            }],
        execute: function() {
            TypeaheadUtils = (function () {
                function TypeaheadUtils() {
                }
                TypeaheadUtils.latinize = function (str) {
                    return str.replace(/[^A-Za-z0-9\[\] ]/g, function (a) {
                        return TypeaheadUtils.latinMap[a] || a;
                    });
                };
                TypeaheadUtils.escapeRegexp = function (queryToEscape) {
                    // Regex: capture the whole query string and replace it with the string that will be used to match
                    // the results, for example if the capture is 'a' the result will be \a
                    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
                };
                TypeaheadUtils.tokenize = function (str, wordRegexDelimiters, phraseRegexDelimiters) {
                    if (wordRegexDelimiters === void 0) { wordRegexDelimiters = ' '; }
                    if (phraseRegexDelimiters === void 0) { phraseRegexDelimiters = ''; }
                    var regexStr = '(?:[' + phraseRegexDelimiters + '])([^' + phraseRegexDelimiters + ']+)(?:[' + phraseRegexDelimiters + '])|([^' + wordRegexDelimiters + ']+)';
                    var preTokenized = str.split(new RegExp(regexStr, 'g'));
                    var result = [];
                    var preTokenizedLength = preTokenized.length;
                    var token;
                    var replacePhraseDelimiters = new RegExp('[' + phraseRegexDelimiters + ']+', 'g');
                    for (var i = 0; i < preTokenizedLength; i += 1) {
                        token = preTokenized[i];
                        if (token && token.length && token !== wordRegexDelimiters) {
                            result.push(token.replace(replacePhraseDelimiters, ''));
                        }
                    }
                    return result;
                };
                TypeaheadUtils.latinMap = latin_map_1.latinMap;
                return TypeaheadUtils;
            }());
            exports_1("TypeaheadUtils", TypeaheadUtils);
        }
    }
});
//# sourceMappingURL=typeahead-utils.js.map