import { EventEmitter } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
export declare abstract class MissingTranslationHandler {
    abstract handle(key: string): void;
}
export declare abstract class TranslateLoader {
    abstract getTranslation(lang: string): Observable<any>;
}
export declare class TranslateStaticLoader implements TranslateLoader {
    private http;
    private sfLoaderParams;
    constructor(http: Http, prefix: string, suffix: string);
    /**
     * Defines the prefix & suffix used for getTranslation
     * @param prefix
     * @param suffix
     */
    configure(prefix: string, suffix: string): void;
    /**
     * Gets the translations from the server
     * @param lang
     * @returns {any}
     */
    getTranslation(lang: string): Observable<any>;
}
export declare class TranslateService {
    private http;
    /**
     * The lang currently used
     */
    currentLang: string;
    /**
     * An instance of the loader currently used
     */
    currentLoader: TranslateLoader;
    /**
     * An EventEmitter to listen to lang changes events
     * onLangChange.subscribe((params: {lang: string, translations: any}) => {
     *     // do something
     * });
     * @type {ng.EventEmitter}
     */
    onLangChange: EventEmitter<any>;
    private pending;
    private translations;
    private defaultLang;
    private langs;
    private parser;
    /**
     * Handler for missing translations
     */
    private missingTranslationHandler;
    constructor(http: Http, loader: TranslateLoader);
    /**
     * Use a translations loader
     * @param loader
     */
    useLoader(loader: TranslateLoader): void;
    /**
     * Use a static files loader
     */
    useStaticFilesLoader(prefix?: string, suffix?: string): void;
    /**
     * Sets the default language to use as a fallback
     * @param lang
     */
    setDefaultLang(lang: string): void;
    /**
     * Changes the lang currently used
     * @param lang
     * @returns {Observable<*>}
     */
    use(lang: string): Observable<any>;
    /**
     * Gets an object of translations for a given language with the current loader
     * @param lang
     * @returns {Observable<*>}
     */
    getTranslation(lang: string): Observable<any>;
    /**
     * Manually sets an object of translations for a given language
     * @param lang
     * @param translations
     */
    setTranslation(lang: string, translations: Object): void;
    /**
     * Returns an array of currently available langs
     * @returns {any}
     */
    getLangs(): string[];
    /**
     * Update the list of available langs
     */
    private updateLangs();
    /**
     * Returns the parsed result of the translations
     * @param translations
     * @param key
     * @param interpolateParams
     * @returns {any}
     */
    private getParsedResult(translations, key, interpolateParams?);
    /**
     * Gets the translated value of a key (or an array of keys)
     * @param key
     * @param interpolateParams
     * @returns {any} the translated key, or an object of translated keys
     */
    get(key: string | Array<string>, interpolateParams?: Object): Observable<string | any>;
    /**
     * Returns a translation instantly from the internal state of loaded translation.
     * All rules regarding the current language, the preferred language of even fallback languages will be used except any promise handling.
     * @param key
     * @param interpolateParams
     * @returns {string}
     */
    instant(key: string | Array<string>, interpolateParams?: Object): string | any;
    /**
     * Sets the translated value of a key
     * @param key
     * @param value
     * @param lang
     */
    set(key: string, value: string, lang?: string): void;
    private changeLang(lang);
    setMissingTranslationHandler(handler: MissingTranslationHandler): void;
}
