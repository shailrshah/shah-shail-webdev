module.exports = function (app) {

    var multer = require('multer'); // npm install multer --save
    var storage=multer.diskStorage({
        destination: function (req,file,cb) {
            cb(null,__dirname+"/../../public/uploads")
        },
        filename: function (req, file, cb) {

            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];

            cb(null, 'widget_image_' + Date.now() + '.' + extension)
        }
    });
    var upload = multer({storage : storage});
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.post("/api/page/:pageId/widget_header", createHeaderWidget);
    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/page/:pageId/widget_image", createImageWidget);
    app.post("/api/page/:pageId/widget_html", createHtmlWidget);
    app.post("/api/page/:pageId/widget_youtube", createYoutubeWidget);


    var widgets = [
            {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"
            },
            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            {"_id": "6456", "widgetType": "HEADING", "pageId": "412", "size": 2, "text": "GIZMODO"},
            {"_id": "456456", "widgetType": "HEADING", "pageId": "412", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "7567", "widgetType": "IMAGE", "pageId": "412", "width": "100%",
                "url": "http://lorempixel.com/400/200/"
            },
            {"_id": "87686", "widgetType": "HTML", "pageId": "412", "text": "<p>Lorem ipsum</p>"},
            {"_id": "45456", "widgetType": "HEADING", "pageId": "412", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "567567", "widgetType": "YOUTUBE", "pageId": "412", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            {"_id": "567567", "widgetType": "HTML", "pageId": "412", "text": "<p>Lorem ipsum</p>"}
        ];


    function createHeaderWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = new Object();
        widget._id = getRandomInt(100, 999).toString();
        widget.widgetType = "HEADING";
        widget.pageId = pageId;
        widget.tag = "new"
        widgets.push(widget);
        res.send(widget._id);
    }

    function createHtmlWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = new Object();
        widget._id = getRandomInt(100, 999).toString();
        widget.widgetType = "HTML";
        widget.pageId = pageId;
        widget.tag = "new"
        widgets.push(widget);
        res.send(widget._id);
    }

    function createImageWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = new Object();
        widget._id = (new Date()).getTime().toString();
        widget.widgetType = "IMAGE";
        widget.pageId = pageId;
        widget.tag = "new"
        widgets.push(widget);
        res.send(widget._id);
    }

    function createYoutubeWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = new Object();
        widget._id = getRandomInt(100, 999).toString();
        widget.widgetType = "YOUTUBE";
        widget.pageId = pageId;
        widget.tag = "new"
        widgets.push(widget);
        res.send(widget._id);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                res.json(widgets[w]);
                return;
            }
        }
    }

    function findWidgetsByPageId(req, res) {
        var pageId = req.params.pageId;

        var widgu = [];
        for (var w in widgets) {
            if (widgets[w].pageId === pageId) {
                widgu.push(widgets[w]);
            }
        }
        res.json(widgu);

    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body

        for (var w in widgets) {
            if (widgets[w]._id == widgetId) {
                widgets[w] = widget;
                console.log(widgets[w]);
                res.send(widgets[w]);
            }
        }

    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                widgets.splice(w, 1);
                res.sendStatus(200);
            }
        }
    }

    function uploadImage(req, res) {
        var pageId        = req.body.pageId;
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var myFile        = req.file;
        var destination = myFile.destination; // folder where file is saved to

        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets[i].width = width;
                widgets[i].url = req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename;
                pageId = widgets[i].pageId;
            }
        }
        res.redirect("/Assignments/assignment4/#/user/"+userId+"/websites/"+websiteId+"/pages/"+pageId+"/widgets");
    }
}