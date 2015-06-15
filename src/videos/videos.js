angular.module('ualib.musicSearch')

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
                                            return d.value != 0;
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
            })
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
        })

        $scope.$on('$locationChangeSuccess', function(){
            paramsToScope();
        });

        var filterWatcher = $scope.$watch('vid', function(newVal, oldVal){
            var filtered = videos;

            filtered = $filter('filter')(filtered, newVal.genre);
            filtered = $filter('filter')(filtered, newVal.language);
            filtered = $filter('filter')(filtered, newVal.format);

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
            $document.duScrollTo(0, 30, 500, function (t) { return (--t)*t*t+1 });
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

            if (params['page']){
                $scope.pager.page = params['page'];
            }

            angular.forEach(scopeFacets, function(val, key){

                if (angular.isDefined(params[key])){

                    if (key == 'genres' || key == 'languages'){
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


