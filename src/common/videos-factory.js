angular.module('ualib.musicSearch')

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
    }]);