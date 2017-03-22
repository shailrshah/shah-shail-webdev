(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', sortableDir);

    function sortableDir() {
        function linkFunc(scope, element, attributes) {
            element.sortable({
                axis:"y",
                handle: ".handle",
                distance: 5,
                scroll: true
            });
        }
        return {
            link: linkFunc
        };
    }
})();