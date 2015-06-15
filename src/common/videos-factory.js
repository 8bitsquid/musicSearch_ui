angular.module('ualib.musicSearch')

/**
 * Transform the JSON response - this allows the transformed values to be cached via Angular's $resource service.
 */
    .factory('videosFactory', ['$resource', '$filter', function($resource, $filter){
        return $resource('https://wwwdev2.lib.ua.edu/musicsearch/api/:videos', {videos: 'showall'}, {
            cache: true
        });
    }]);