$(document).ready(function() {

    $("img").click(function() {
        var link = $(event.target).attr("link");
        var win = window.open(link);
    });
});