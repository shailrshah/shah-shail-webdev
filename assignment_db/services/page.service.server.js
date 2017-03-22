module.exports = function (app, pageModel){
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);


    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var newPage = req.body;

        pageModel
            .createPageForWebsite(websiteId, newPage)
            .then(
                function(newPage) {
                    res.send(newPage);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function(pages) {
                    res.json(pages);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findPageById(req, res) {

        var pageId = req.params.pageId;

        pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    res.json(page);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;

        pageModel
            .updatePage(pageId, page)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deletePage(req, res) {

        var pageId = req.params.pageId;

        pageModel
            .deletePage(pageId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }
}