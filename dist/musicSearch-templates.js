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
    "                    <small class=\"pull-right\">\n" +
    "                        <span class=\"label label-success\" ng-if=\"item.hasFullText == 'A'\">All Full Text</span>\n" +
    "                        <span class=\"label label-info\" ng-if=\"item.hasFullText == 'P'\">Primarily Full Text</span>\n" +
    "                        <span class=\"label label-warning\" ng-if=\"item.hasFullText == 'S'\">Some Full Text</span>\n" +
    "                        <span class=\"label label-danger\" ng-if=\"item.hasFullText == 'N'\">No Full Text</span>\n" +
    "                    </small>\n" +
    "                </h4>\n" +
    "\n" +
    "                <div class=\"details-context\">\n" +
    "                    <span ng-bind-html=\"item.call_number | highlight:vid.search\"></span>\n" +
    "                    <span ng-bind-html=\"item.series_title | highlight:vid.search\" ng-if=\"item.series_title\"></span>\n" +
    "                </div>\n" +
    "\n" +
    "                <p class=\"text-justify\" ng-bind-html=\"item.notes | highlight:vid.search\"></p>\n" +
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
