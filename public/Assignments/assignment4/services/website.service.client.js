(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", websiteService);

    function websiteService($http) {
        var api = {
            "createWebsite": createWebsite,
            "findWebsiteById": findWebsiteById,
            "deleteWebsite": deleteWebsite,
            "findAllWebsitesForUser": findAllWebsitesForUser,
            "updateWebsite": updateWebsite
        };
        return api;

        function findWebsiteById(wid) {
            return $http.get("/api/website/"+wid);
        }
        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/"+websiteId);
        }

        function createWebsite(userId, website) {
            return $http.post("/api/user/"+userId+"/website", website);
        }

        function findAllWebsitesForUser(userId) {
            return $http.get("/api/user/"+userId+"/website");
        }

        function updateWebsite(websiteId, website){
            return $http.put("/api/website/"+websiteId, website);
        }
    }
})();