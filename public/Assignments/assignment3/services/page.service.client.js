(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", pageService);

    function pageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ]
        var api = {
            "createPage": createPage,
            "findPageById": findPageById,
            "deletePage": deletePage,
            "findPageByWebsite": findPageByWebsite,
            "updatePage": updatePage
        };
        return api;

        function findPageById(pid) {
            for(var p in pages) {
                var page = pages[p];
                if(page._id === pid) {
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }

        function deletePage(pageId) {
            for(var p in pages) {
                var page = pages[p];
                if(pages._id === pageId) {
                    pages.splice(p, 1);
                    return true;
                }
            }
            return false;
        }
        
        function createPage(userId, page){
            page.developerId = userId;
            page._id = (new Date()).getTime().toString();
            pages.push(page);
            return page_.id;
        }

        function findPageByWebsite(wid) {
            var ps = [];
            for(var p in pages) {
                var pages = pages[p];
                if(page.websiteId === wid) {
                    ps.push(pages[p]);
                }
            }
            return ps;
        }

        function updatePage(id,page1){
            for(var p in pages){
                var page = pages[p];
                if(page._id === id) {
                    page.name= page1.name;
                    page.description=page1.description;
                    return true;
                }
            }
            return false;
        }
    }
})();