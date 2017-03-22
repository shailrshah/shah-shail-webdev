(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", pageService);

    function pageService($http) {
        var api = {
            "createPage": createPage,
            "findPageById": findPageById,
            "deletePage": deletePage,
            "findPageByWebsite": findPageByWebsite,
            "updatePage": updatePage
        };
        return api;

        function findPageById(pageId) {
            return $http.get("/api/page/"+pageId);
        }

        function deletePage(pageId) {
            return $http.delete("/api/page/"+pageId);
        }
        
        function createPage(websiteId, page){
            return $http.post("/api/website/"+websiteId+"/page", page);
        }

        function findPageByWebsite(websiteId) {
            console.log("Getting all pages of website "+websiteId);
            return $http.get("/api/website/"+websiteId+"/page");
        }

        function updatePage(pageId,page){
            return $http.put("/api/page/"+pageId, page);
        }
    }
})();