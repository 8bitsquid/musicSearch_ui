angular.module('ualib.musicSearch.templates', ['musicSearch.tpl.html']);

angular.module("musicSearch.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("musicSearch.tpl.html",
    "<h2>Music Video Database Search</h2>\n" +
    "\n" +
    "<form ng-submit=\"search()\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-6\">\n" +
    "            <input type=\"text\" class=\"form-control\" placeholder=\"Search music and video database\" ng-model=\"searchText\">\n" +
    "        </div>\n" +
    "        <div class=\"col-md-6\">\n" +
    "            <button type=\"submit\" class=\"btn btn-primary\">\n" +
    "                Search\n" +
    "                <span class=\"fa fa-fw fa-search\"></span>\n" +
    "            </button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</form>\n" +
    "\n" +
    "<div class=\"col-md-12 form-group form-inline\">\n" +
    "    <label for=\"filterBy\">Filter <strong>{{ms.results.length}}</strong> results by</label>\n" +
    "    <div id=\"filterBy\">\n" +
    "        <input type=\"text\" class=\"form-control\" placeholder=\"Title\" ng-model=\"titleFilter\">\n" +
    "        <input type=\"text\" class=\"form-control\" placeholder=\"Description\" ng-model=\"descrFilter\">\n" +
    "        <input type=\"text\" class=\"form-control\" placeholder=\"Genre\" ng-model=\"genreFilter\">\n" +
    "        <input type=\"text\" class=\"form-control\" placeholder=\"Language\" ng-model=\"languageFilter\">\n" +
    "        <input type=\"text\" class=\"form-control\" placeholder=\"Keywords\" ng-model=\"keywordsFilter\">\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"text-center\">\n" +
    "    <pagination total-items=\"filteredResults.length\" ng-model=\"currentPage\" max-size=\"maxPageSize\" class=\"pagination-sm\"\n" +
    "                boundary-links=\"true\" rotate=\"false\" items-per-page=\"perPage\"></pagination>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-md-12\" ng-repeat=\"item in filteredResults = (ms.results\n" +
    "                                                         | filter:{title:titleFilter}:compare\n" +
    "                                                         | filter:{notes:descrFilter}:compare\n" +
    "                                                         | filter:{genre:genreFilter}:compare\n" +
    "                                                         | filter:{language:languageFilter}:compare\n" +
    "                                                         | filter:{title:keywordsFilter}:compare\n" +
    "                                                         | orderBy:'title')\n" +
    "                                                     | startFrom:(currentPage-1)*perPage | limitTo:perPage\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "            <div class=\"col-md-10\">\n" +
    "                <h4>\n" +
    "                    {{item.title}}\n" +
    "                    <small>{{item.genre}}</small>\n" +
    "                    <small ng-show=\"item.genre && item.series_title\"><span class=\"fa fa-fw fa-ellipsis-v\"></span></small>\n" +
    "                    <small>{{item.series_title}}</small>\n" +
    "                </h4>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-2\">\n" +
    "                <span>\n" +
    "                    <h4><small>{{item.call_number}}</small></h4>\n" +
    "                </span>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-12\">\n" +
    "                <div class=\"col-md-1\">\n" +
    "                </div>\n" +
    "                <div class=\"col-md-8\">\n" +
    "                    <p style=\"text-align: justify;\">{{item.notes}}</p>\n" +
    "                    <p ng-show=\"item.keywords\"><small>Keywords: </small> {{item.keywords}}</p>\n" +
    "                </div>\n" +
    "                <div class=\"col-md-1\">\n" +
    "                    {{item.language}}\n" +
    "                </div>\n" +
    "                <div class=\"col-md-2\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <br>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"text-center\">\n" +
    "    <pagination total-items=\"filteredResults.length\" ng-model=\"currentPage\" max-size=\"maxPageSize\" class=\"pagination-sm\"\n" +
    "                boundary-links=\"true\" rotate=\"false\" items-per-page=\"perPage\"></pagination>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);
