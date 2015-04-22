angular.module('ualib.musicSearch', [
    'ngRoute',
    'ngResource',
    'ngAnimate',
    'ui.bootstrap',
    'ualib.musicSearch.templates'
])

    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/musicSearch/:tk?/show/:show', {
            templateUrl: 'musicSearch.tpl.html',
            controller: 'musicSearchCtrl',
            resolve: {
                mSearch: ['$resource', function($resource){
                    return $resource('https://wwwdev2.lib.ua.edu/musicsearch/api/search/:tk',{tk:'@sText'});
                }],
                mShowAll: ['$resource', function($resource){
                    return $resource('https://wwwdev2.lib.ua.edu/musicsearch/api/showall');
                }]
            }
        });
    }])

    .controller('musicSearchCtrl', ['$scope', '$location', 'mSearch', 'mShowAll', function($scope, $location, mSearch, mShowAll){
        $scope.ms = {};
        $scope.searchText = '';
        $scope.currentPage = 1;
        $scope.maxPageSize = 10;
        $scope.perPage = 10;
        $scope.titleFilter = '';
        $scope.descrFilter = '';
        $scope.keywordsFilter = '';
        $scope.genreFilter = '';
        $scope.languageFilter = '';

        $scope.search = function(){
            var newPath = '/musicSearch/';
            if ($scope.searchText)
                newPath = newPath + $scope.searchText + '/';

            newPath = newPath + 'show/' + $scope.perPage;

            $location.path(newPath);
        }

        $scope.$on('$routeChangeSuccess', function(event, currentRoute){
            if (typeof currentRoute.params.tk !== 'undefined')
                $scope.searchText = currentRoute.params.tk;
            else
                $scope.searchText = '';
            if (typeof currentRoute.params.s !== 'undefined')
                $scope.perPage = currentRoute.params.s;
            else
                $scope.perPage = 10;

            if ($scope.searchText)
                mSearch.get({tk:$scope.searchText})
                    .$promise.then(function(data){
                        $scope.ms = data;
                        console.dir($scope.ms);
                    }, function(){
                        console.log('musicSearch Error 1 -- Come on, put in proper error handling already');
                    });
            else
                mShowAll.get()
                    .$promise.then(function(data){
                        $scope.ms = data;
                        console.dir($scope.ms);
                    }, function(){
                        console.log('musicSearch Error 2 -- Come on, put in proper error handling already');
                    });
        });

        $scope.compare = function(actual, expected){
            if (!expected)
                return true;
            if (actual.toLowerCase().indexOf(expected.toLowerCase()) > -1)
                return true;
            return false;
        };
    }])
    .filter('startFrom', function() {
        return function(input, start) {
            if (typeof input === 'undefined')
                return null;
            start = +start; //parse to int
            return input.slice(start);
        }
    });

angular.module('musicSearch', ['ualib.musicSearch']);