/**
 * @ngdoc overview
 * @name index
 *
 * @description
 * # The Music Library's Videos search application.
 * ## URL route [/#/videos](http://www.lib.ua.edu/#/videos)
 *
 */

angular.module('ualib.musicSearch', [
    'ngRoute',
    'ngResource',
    'ngAnimate',
    'ngSanitize',
    'angular.filter',
    'ui.bootstrap',
    'duScroll',
    'ualib.ui',
    'ualib.musicSearch.templates'
]);

angular.module('musicSearch', ['ualib.musicSearch']);