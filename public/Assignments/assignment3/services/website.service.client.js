(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", websiteService);

    function websiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", created: new Date() },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", created: new Date() },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem", created: new Date() },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date() },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", created: new Date() },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", created: new Date() }
        ];
        var api = {
            "createWebsite": createWebsite,
            "findWebsiteById": findWebsiteById,
            "deleteWebsite": deleteWebsite,
            "findAllWebsitesForUser": findAllWebsitesForUser,
            "updateWebsite": updateWebsite
        };
        return api;

        function findWebsiteById(wid) {
            for(var w in websites) {
                var website = websites[w];
                if(website._id === wid) {
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }
        function deleteWebsite(websiteId) {
            for(var w in websites) {
                var website = websites[w];
                if(website._id === websiteId) {
                    websites.splice(w, 1);
                    return true;
                }
            }
            return false;
        }

        function createWebsite(userId, website) {
            website.developerId = userId;
            website._id = (new Date()).getTime().toString();
            websites.push(website);
            return websites;
        }

        function findAllWebsitesForUser(userId) {
            var sites = [];
            for(var w in websites) {
                var website = websites[w];
                if(website.developerId === userId) {
                    sites.push(websites[w]);
                }
            }
            return sites;
        }

        function updateWebsite(id, website1){
            for(var w in websites){
                var website = websites[w];
                if(website._id === id) {
                    website.name = website1.name;
                    website.description = website1.description;
                }
            }
        }
    }
})();