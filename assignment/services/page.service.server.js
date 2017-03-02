module.exports = function (app) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
        { "_id": "412", "name": "Post 4", "websiteId": "567", "description": "Lor" }
    ];

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page_info = req.body
        var page = {_id: (new Date()).getTime().toString(),
                    name: page_info.name,
                    websiteId: websiteId,
                    description: page_info.description};
        pages.push(page);
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var pagesg = [];
        for(var p in pages) {
            if(pages[p].websiteId === websiteId)
                pagesg.push(pages[p]);
        }
        res.json(pagesg);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for(var p in pages) {
            if(pages[p]._id === pageId)
                res.json(pages[p]);
        }
        return;
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId
        var page = req.body;
        for(var p in pages) {
            if(pages[p]._id==pageId) {
                pages[p].name = page.name;
                pages[p].description = page.description;
                res.sendStatus(200);
            }
        }
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for(var p in pages) {
            if (pages[p]._id === pageId) {
                pages.splice(p, 1);
                res.sendStatus(200);
            }
        }
    }
}