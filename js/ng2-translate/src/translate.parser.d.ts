export declare class Parser {
    templateMatcher: RegExp;
    /**
     * Interpolates a string to replace parameters
     * "This is a {{ key }}" ==> "This is a value", with params = { key: "value" }
     * @param expr
     * @param params
     * @returns {string}
     */
    interpolate(expr: string, params?: any): string;
    /**
     * Flattens an object
     * { key1: { keyA: 'valueI' }} ==> { 'key1.keyA': 'valueI' }
     * @param target
     * @returns {Object}
     */
    flattenObject(target: Object): Object;
}
