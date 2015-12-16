angular.module('ualib.musicSearch')

    /**
     * @ngdoc service
     * @name videos.videosFactory
     *
     * @requires ng.$resource
     *
     * @param {object} params Params object to pass to videos API
     * @param {string} params.videos videos to show
     *
     * @description
     * Angular Service to call musicSearch API
     *
     * @returns {$promise} A $resource promise
     *
     * @example
     * videosFactory
     *      .get({videos: 'showall'})
     *      .$promise.then(function(data){
     *          return data;
     *      });
     */

    .factory('videosFactory', ['$resource', function($resource){

        return $resource('//wwwdev2.lib.ua.edu/musicsearch/api/:videos', {videos: 'showall'}, {
            get: {
                method: 'GET',
                cache: true
            }
        });
    }]);