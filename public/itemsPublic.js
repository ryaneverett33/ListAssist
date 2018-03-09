$(document).ready(function() {
	//get the id of the list
	var id = window.location.href.split("?")[1];
    var currentItemCard;

    $("img").click(function() {
        var link = $(event.target).attr("link");
        var win = window.open(link);
    });

    $(".markAsBoughtButton").click(function() {
        currentItemCard = $(event.target).parent().parent();

        //clear the invalid classes
        $("#markAsBoughtNameField").removeClass("is-invalid");
    });

    $("#markAsBoughtSaveButton").click(function() {
        var name = $("#markAsBoughtNameField").val();

        //ensure the name isn't empty
        if(name == "") {
            $("#markAsBoughtNameField").addClass("is-invalid");
			return;
        }

        //make text in card green
        currentItemCard.find(".card-body").addClass("text-success");

        //remove the mark as bought button
        currentItemCard.find("button").remove();

        //add in text that says who bought it
        currentItemCard.find(".card-text").append("<br/>Bought by " + name);

        //update backend...
        var data = {
            
        };
        data = JSON.stringify(data);
    
        accessServer("https://listassist.duckdns.org/...", data, function(result) {
            json = JSON.parse(result);

        },
        function(result) {
            console.log(result);
        });

        //close the modal
		$("#markAsBoughtModal").modal("toggle");
    });

    //initially fill up the page with the items and update the name
	
    
});