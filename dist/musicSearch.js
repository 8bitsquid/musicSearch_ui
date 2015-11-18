angular.module('ualib.musicSearch.templates', ['videos/videos-list.tpl.html']);

angular.module("videos/videos-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("videos/videos-list.tpl.html",
    "<div class=\"jumbotron bg-transparent\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-7\">\n" +
    "            <h1>Video Database</h1>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-5\">\n" +
    "            <div class=\"well\">\n" +
    "                <p class=\"lead\"> Videos are available through the Music Library</p>\n" +
    "                <a href=\"https://wwwdev2.lib.ua.edu/libraries-and-collections/music-library/\" class=\"btn btn-primary\" title=\"Music Library\">Get more info <span class=\"fa fa-fw fa-info-circle\"></span></a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-md-3 col-md-push-9\">\n" +
    "        <form class=\"facets-form\">\n" +
    "            <div class=\"form-group\">\n" +
    "                <span class=\"page-header\">\n" +
    "                    <h4>Filter Videos By</h4>\n" +
    "                </span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"vid.search\" placeholder=\"Keyword search\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group hidden-xs\">\n" +
    "                <h5>Format</h5>\n" +
    "                <div class=\"facet-group\">\n" +
    "                    <div class=\"btn-group btn-group-justified\">\n" +
    "                        <label class=\"btn btn-default\" ng-model=\"vid.format\" btn-radio=\"''\">All</label>\n" +
    "                        <label class=\"btn btn-default\" ng-model=\"vid.format\" btn-radio=\"'dvd'\">DVD</label>\n" +
    "                        <label class=\"btn btn-default\" ng-model=\"vid.format\" btn-radio=\"'vcr'\">VHS</label>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group hidden-xs\">\n" +
    "                <h5>Genre</h5>\n" +
    "                <div class=\"facet-group\">\n" +
    "                    <div class=\"radio\">\n" +
    "                        <label>\n" +
    "                            <input type=\"radio\" ng-model=\"vid.genre\" value=\"\">\n" +
    "                            All Genres\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                    <div class=\"radio\" ng-repeat=\"genre in genres\">\n" +
    "                        <label>\n" +
    "                            <input type=\"radio\" ng-model=\"vid.genre\" ng-value=\"genre.label\">\n" +
    "                            {{genre.label}}\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group hidden-xs\">\n" +
    "                <h5>Language</h5>\n" +
    "                <div class=\"facet-group\">\n" +
    "                    <div class=\"radio\">\n" +
    "                        <label>\n" +
    "                            <input type=\"radio\" ng-model=\"vid.language\" value=\"\">\n" +
    "                            All Languages\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                    <div class=\"radio\" ng-repeat=\"lang in languages\">\n" +
    "                        <label>\n" +
    "                            <input type=\"radio\" ng-model=\"vid.language\" ng-value=\"lang.label\">\n" +
    "                            {{lang.label}}\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <button type=\"button\" class=\"btn btn-block btn-primary\" ng-click=\"resetFilters()\"><span class=\"fa fa-fw fa-refresh\"></span> Reset filters</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-9 col-md-pull-3 videos-list-container\">\n" +
    "        <p>\n" +
    "        <h4 class=\"text-right\">Showing {{pager.totalItems}} results</h4>\n" +
    "        <div ng-if=\"activeFilters.format || activeFilters.genre || activeFilters.language\">\n" +
    "\n" +
    "            <ol class=\"breadcrumb facetcrumb\">\n" +
    "                <li ng-if=\"activeFilters.format\"><strong>Format:</strong> <button type=\"button\" class=\"btn btn-default\" ng-click=\"vid.format = ''\">{{vid.format}} <span class=\"text-muted\" aria-hidden=\"true\">&times;</span></button></li>\n" +
    "                <li ng-if=\"activeFilters.genre\"><strong>Genre:</strong> <button type=\"button\" class=\"btn btn-default\" ng-click=\"vid.genre = ''\">{{vid.genre}} <span class=\"text-muted\" aria-hidden=\"true\">&times;</span></button></li>\n" +
    "                <li ng-if=\"activeFilters.language\"><strong>Language:</strong> <button type=\"button\" class=\"btn btn-default\" ng-click=\"vid.language = ''\">{{vid.language}} <span class=\"text-muted\" aria-hidden=\"true\">&times;</span></button></li>\n" +
    "                <li class=\"pull-right\"><button type=\"button\" class=\"btn btn-primary btn-small reset-btn\" title=\"Reset filters\" ng-click=\"resetFilters()\"><i class=\"fa fa-refresh\"></i></button></li>\n" +
    "            </ol>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "        </p>\n" +
    "\n" +
    "        <div class=\"media animate-repeat\" ng-repeat=\"item in filteredvidoes | after:(pager.page-1)*pager.perPage | limitTo:20\">\n" +
    "            <div class=\"media-body\">\n" +
    "\n" +
    "                <h4 class=\"media-heading\">\n" +
    "                    <span ng-bind-html=\"item.title | highlight:vid.search\"></span>\n" +
    "\n" +
    "                    <small>\n" +
    "                        <span ng-bind-html=\"item.series_title | highlight:vid.search\"></span>\n" +
    "                    </small>\n" +
    "                </h4>\n" +
    "\n" +
    "                <div class=\"details-context\">\n" +
    "                    <span ng-bind-html=\"item.call_number | highlight:vid.search\"></span>\n" +
    "                    <span ng-bind-html=\"item.genre | highlight:vid.genre\" ng-if=\"item.genre\"></span>\n" +
    "                    <span ng-bind-html=\"item.language | highlight:vid.language\" ng-if=\"item.language\"></span>\n" +
    "                </div>\n" +
    "\n" +
    "                <p class=\"text-justify\" ng-bind-html=\"item.notes | highlight:vid.search\"></p>\n" +
    "            </div>\n" +
    "            <div class=\"details-context\">\n" +
    "                <span ng-bind-html=\"item.keywords | highlight:vid.search\"></span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "        <div class=\"text-center\">\n" +
    "            <pagination class=\"pagination-sm\" ng-model=\"pager.page\" total-items=\"pager.totalItems\" max-size=\"pager.maxSize\" boundary-links=\"true\" rotate=\"false\" items-per-page=\"pager.perPage\" ng-change=\"pageChange()\" ng-if=\"pager.totalItems > pager.perPage\"></pagination>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"alert alert-warning text-center\" role=\"alert\" ng-show=\"pager.totalItems < 1\">\n" +
    "            <h2>No results found <span ng-if=\"vid.search\"> for \"{{vid.search}}\"</span></h2>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
;angular.module('ualib.musicSearch', [
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

angular.module('musicSearch', ['ualib.musicSearch']);;angular.module('ualib.musicSearch')

/**
 * Transform the JSON response - this allows the transformed values to be cached via Angular's $resource service.
 */
    .factory('videosFactory', ['$resource', function($resource){
        return $resource('//wwwdev2.lib.ua.edu/musicsearch/api/:videos', {videos: 'showall'}, {
            get: {
                method: 'GET',
                cache: true
            }
        });
    }]);;angular.module('ualib.musicSearch')

    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/videos', {
                reloadOnSearch: false,
                resolve: {
                    filters: function(videosFactory){
                        return videosFactory.get({videos: 'genres'})
                            .$promise.then(function(data){
                                var newData = data;
                                for (var f in data){
                                    if (f === 'genres' || f === 'languages'){
                                        newData[f] = data[f].filter(function(d){
                                            return d.value !== 0;
                                        });
                                    }
                                }
                                return newData;
                            }, function(data, status, headers, config) {
                                console.log('ERROR: videos');
                                console.log({
                                    data: data,
                                    status: status,
                                    headers: headers,
                                    config: config
                                });
                            });
                    },
                    videos: function(videosFactory){
                        return videosFactory.get()
                            .$promise.then(function(data){
                                return data;
                            }, function(data, status, headers, config) {
                                console.log('ERROR: videos');
                                console.log({
                                    data: data,
                                    status: status,
                                    headers: headers,
                                    config: config
                                });
                            });
                    }
                },
                templateUrl: 'videos/videos-list.tpl.html',
                controller: 'VideosListCtrl'
            });
    }])

    .controller('VideosListCtrl', ['$scope', 'videos', 'filters', '$filter' ,'$location' ,'$document', function($scope, vid, filters, $filter, $location, $document){
        var videos = [];


        filters.$promise.then(function(filterData){
            $scope.genres = filterData.genres;
            $scope.languages = filterData.languages;
            
            vid.$promise.then(function(data){
                videos = data.results;

                $scope.resetFilters();
                paramsToScope();

                $scope.totalItems = data.processedResults;

                //processFacets(videos);
            });
        });

        $scope.$on('$locationChangeSuccess', function(){
            paramsToScope();
        });

        var filterWatcher = $scope.$watch('vid', function(newVal, oldVal){
            var filtered = videos;

            filtered = $filter('filter')(filtered, {genre: newVal.genre});
            filtered = $filter('filter')(filtered, {language: newVal.language});
            filtered = $filter('filter')(filtered, {call_number: newVal.format});

            //if (newVal.search && newVal.search.length > 2){
            filtered = $filter('filter')(filtered, newVal.search);
            //}


            $scope.filteredvidoes = filtered;
            $scope.pager.totalItems = $scope.filteredvidoes.length;
            $scope.pager.firstItem = (($scope.pager.page-1)*$scope.pager.perPage)+1;
            $scope.pager.lastItem = $scope.pager.page*($scope.pager.totalItems < $scope.pager.maxSize ? $scope.pager.totalItems : $scope.pager.perPage);
            var numPages =  Math.floor($scope.pager.totalItems / $scope.pager.maxSize);
            if (numPages < $scope.pager.page){
                $scope.pager.page = numPages || 1;
            }

            var newParams = angular.extend({}, newVal, {page: $scope.pager.page});


            scopeToParams(newParams);
        }, true);


        $scope.resetFilters = function(){
            $scope.vid = {
                genre: '',
                language: '',
                format: '',
                search: ''
            };
            $scope.pager = {
                page: 1,
                perPage: 20,
                maxSize: 10,
                totalItems: 0
            };
        };

        $scope.pageChange = function(){

            scopeToParams({page: $scope.pager.page});
            $document.duScrollTo(0, 30, 500, function (t) { return (--t)*t*t+1; });
        };

        $scope.$on('$destroy', function(){
            filterWatcher();
        });

        function scopeToParams(scopeVals){
            angular.forEach(scopeVals, function(val, key){
                var newParam = {};

                if (angular.isDefined(val) && val !== ''){
                    if (angular.isObject(val)){
                        val = Object.keys(val).filter(function(f){
                            return val[f];
                        }).join(",");
                        if (val.length > 0){
                            $location.search(key, val);
                        }
                        else{
                            $location.search(key, null);
                        }
                    }
                    else {
                        $location.search(key, val);
                    }
                }
                else{
                    $location.search(key, null);
                }
            });
        }

        function paramsToScope(){
            var params = $location.search();
            var scopeFacets = {};
            angular.copy($scope.vid, scopeFacets);

            $scope.activeFilters = params;

            if (params.page){
                $scope.pager.page = params.page;
            }

            angular.forEach(scopeFacets, function(val, key){

                if (angular.isDefined(params[key])){

                    if (key === 'genres' || key === 'languages'){
                        var filters = {};
                        params[key].split(',').forEach(function(filter){
                            filters[filter] = true;
                        });
                        scopeFacets[key] = filters;
                    }
                    else{
                        scopeFacets[key] = params[key];
                    }
                }
                else{
                    scopeFacets[key] = angular.isObject(val) ? {} : '';
                }
            });
            $scope.vid = scopeFacets;
           
        }

    }]);


