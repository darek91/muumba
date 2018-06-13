"use strict";
var Parser = (function () {
    function Parser() {
        this.templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
    }
    /**
     * Interpolates a string to replace parameters
     * "This is a {{ key }}" ==> "This is a value", with params = { key: "value" }
     * @param expr
     * @param params
     * @returns {string}
     */
    Parser.prototype.interpolate = function (expr, params) {
        if (!params) {
            return expr;
        }
        else {
            params = this.flattenObject(params);
        }
        return expr.replace(this.templateMatcher, function (substring, b) {
            var r = params[b];
            return typeof r !== 'undefined' ? r : substring;
        });
    };
    /**
     * Flattens an object
     * { key1: { keyA: 'valueI' }} ==> { 'key1.keyA': 'valueI' }
     * @param target
     * @returns {Object}
     */
    Parser.prototype.flattenObject = function (target) {
        var delimiter = '.';
        var maxDepth;
        var currentDepth = 1;
        var output = {};
        function step(object, prev) {
            Object.keys(object).forEach(function (key) {
                var value = object[key];
                var newKey = prev ? prev + delimiter + key : key;
                maxDepth = currentDepth + 1;
                if (!Array.isArray(value) && typeof value === 'object' && Object.keys(value).length && currentDepth < maxDepth) {
                    ++currentDepth;
                    return step(value, newKey);
                }
                output[newKey] = value;
            });
        }
        step(target);
        return output;
    };
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLnBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRyYW5zbGF0ZS5wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0lBQUE7UUFDSSxvQkFBZSxHQUFXLHVCQUF1QixDQUFDO0lBd0R0RCxDQUFDO0lBckRHOzs7Ozs7T0FNRztJQUNJLDRCQUFXLEdBQWxCLFVBQW1CLElBQVksRUFBRSxNQUFZO1FBQ3pDLEVBQUUsQ0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNULE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsVUFBVSxTQUFpQixFQUFFLENBQVM7WUFDNUUsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxXQUFXLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQztRQUNwRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLDhCQUFhLEdBQXBCLFVBQXFCLE1BQWM7UUFDL0IsSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLElBQUksUUFBZ0IsQ0FBQztRQUNyQixJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxNQUFNLEdBQVEsRUFBRSxDQUFDO1FBRXJCLGNBQWMsTUFBVyxFQUFFLElBQWE7WUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHO2dCQUNyQyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksTUFBTSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsU0FBUyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7Z0JBRWpELFFBQVEsR0FBRyxZQUFZLEdBQUcsQ0FBQyxDQUFDO2dCQUU1QixFQUFFLENBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxJQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUM1RyxFQUFFLFlBQVksQ0FBQztvQkFDZixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDL0IsQ0FBQztnQkFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUViLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVMLGFBQUM7QUFBRCxDQUFDLEFBekRELElBeURDO0FBekRZLGNBQU0sU0F5RGxCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgUGFyc2VyIHtcbiAgICB0ZW1wbGF0ZU1hdGNoZXI6IFJlZ0V4cCA9IC97e1xccz8oW157fVxcc10qKVxccz99fS9nO1xuXG5cbiAgICAvKipcbiAgICAgKiBJbnRlcnBvbGF0ZXMgYSBzdHJpbmcgdG8gcmVwbGFjZSBwYXJhbWV0ZXJzXG4gICAgICogXCJUaGlzIGlzIGEge3sga2V5IH19XCIgPT0+IFwiVGhpcyBpcyBhIHZhbHVlXCIsIHdpdGggcGFyYW1zID0geyBrZXk6IFwidmFsdWVcIiB9XG4gICAgICogQHBhcmFtIGV4cHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBwdWJsaWMgaW50ZXJwb2xhdGUoZXhwcjogc3RyaW5nLCBwYXJhbXM/OiBhbnkpOiBzdHJpbmcge1xuICAgICAgICBpZighcGFyYW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gZXhwcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcmFtcyA9IHRoaXMuZmxhdHRlbk9iamVjdChwYXJhbXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGV4cHIucmVwbGFjZSh0aGlzLnRlbXBsYXRlTWF0Y2hlciwgZnVuY3Rpb24gKHN1YnN0cmluZzogc3RyaW5nLCBiOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICAgICAgdmFyIHIgPSBwYXJhbXNbYl07XG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHIgIT09ICd1bmRlZmluZWQnID8gciA6IHN1YnN0cmluZztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmxhdHRlbnMgYW4gb2JqZWN0XG4gICAgICogeyBrZXkxOiB7IGtleUE6ICd2YWx1ZUknIH19ID09PiB7ICdrZXkxLmtleUEnOiAndmFsdWVJJyB9XG4gICAgICogQHBhcmFtIHRhcmdldFxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgcHVibGljIGZsYXR0ZW5PYmplY3QodGFyZ2V0OiBPYmplY3QpOiBPYmplY3Qge1xuICAgICAgICB2YXIgZGVsaW1pdGVyID0gJy4nO1xuICAgICAgICB2YXIgbWF4RGVwdGg6IG51bWJlcjtcbiAgICAgICAgdmFyIGN1cnJlbnREZXB0aCA9IDE7XG4gICAgICAgIHZhciBvdXRwdXQ6IGFueSA9IHt9O1xuXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAob2JqZWN0OiBhbnksIHByZXY/OiBzdHJpbmcpIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKG9iamVjdCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gb2JqZWN0W2tleV07XG4gICAgICAgICAgICAgICAgdmFyIG5ld0tleSA9IHByZXYgPyBwcmV2ICsgZGVsaW1pdGVyICsga2V5IDoga2V5O1xuXG4gICAgICAgICAgICAgICAgbWF4RGVwdGggPSBjdXJyZW50RGVwdGggKyAxO1xuXG4gICAgICAgICAgICAgICAgaWYoIUFycmF5LmlzQXJyYXkodmFsdWUpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aCAmJiBjdXJyZW50RGVwdGggPCBtYXhEZXB0aCkge1xuICAgICAgICAgICAgICAgICAgICArK2N1cnJlbnREZXB0aDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0ZXAodmFsdWUsIG5ld0tleSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgb3V0cHV0W25ld0tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RlcCh0YXJnZXQpO1xuXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxuXG59XG4iXX0=