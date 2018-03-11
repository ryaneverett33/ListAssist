$(document).ready(function() {
	var itemsCount = 0;
	var currList;

  var assignRenameListButtonFunctionality = function() {
		$(".renameListButton").off();

		//this is the edit item button on each of the item entries
		$(".renameListButton").click(function () {
			var list = $(event.target).parent();
			currList = list;

		  var name = list.find(".list-group-item").text();

			$("#renameListNameField").val(name);
		});
	}

	//this is the add list button on the page
	$("#addListButton").click(function() {
		//clear inputs
		$("#addListNameField").val("");
	});

  //this is the add list button on the new item modal
	$("#addListModalButton").click(function() {
		var name;

		name = $("#addListNameField").val();


		addList(name);

		//close the modal
		$("#addListModal").modal("toggle");
	});

  var addList = function(name) {

    var itemHTML = `<div class="list-body">
                    <a href="#" class="list-group-item">` + name +
                    `</a>
                    <button type="button" class="btn btn-outline-primary btn-sm renameListButton" data-toggle="modal" data-target="#renameListModal">Rename</button>
                    <button type="button" class="btn btn-outline-primary btn-sm shareListButton" data-toggle="modal" data-target="#shareListModal">Share</button>
                    <button type="button" class="btn btn-outline-primary btn-sm removeListButton" data-toggle="modal" data-target="#removeListModal">Remove</button>
                    </div>`;
    $("#list").append(itemHTML);

		itemsCount++;

		//reassign the click event listeners on the edit item buttons
		assignRenameListButtonFunctionality();

		//update the backend with the new list...
	}

  //this is the saves changes button on the list item modal
	$("#renameListSaveChangesButton").click(function() {
    console.log("hello");
    var name = $("#renameListNameField").val();
    currList.find(".list-group-item").text(name);

		//update the backend with the new item information...


		//close the modal
		$("#renameListModal").modal("toggle");
	});

  $("#removeListButton").click(function() {
    currList.remove();

    $("#removeListModal").modal("toggle");
  });

  assignRenameListButtonFunctionality();

});
