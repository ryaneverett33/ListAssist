$(document).ready(function() {
	var itemsCount = 8;
	var currentItemCard;

	$("#customRadio").click(function() {
		$("#customFields").show();
		$("#byLinkFields").hide();
	});

	$("#byLinkRadio").click(function() {
		$("#byLinkFields").show();
		$("#customFields").hide();
	});

	//this is the add item button on the page
	$("#addItemButton").click(function() {
		//clear inputs
		$("#addItemNameField").val("");
		$("#addItemDescriptionField").val("");
		$("#addItemImageField").val("");
		$("#addItemLinkField").val("");
	});

	//this is the add item button on the new item modal
	$("#addItemModalButton").click(function() {
		var name;
		var description;
		var image;

		if($("#customRadio").is(":checked")) {
			name = $("#addItemNameField").val();
			description = $("#addItemDescriptionField").val();
			image = $("#addItemImageField").val();
		}
		else {
			//run amazon web scraper to find name, description and image
			var link = $("#addItemLinkField").val();
		}

		addItem(name, description, image);

		//close the modal
		$("#addItemModal").modal("toggle");
	});

	var addItem = function(name, description, image) {
		var itemHTML = `
			<div class="col-3">
				<div class="card">
					<img class="card-img-top" src="` + image + `">
					<div class="card-body">
						<h5 class="card-title">` + name + `</h5>
						<p class="card-text">` + description + `</p>
						<button type="button" class="btn btn-outline-primary btn-sm editItemButton" data-toggle="modal" data-target="#editItemModal">Edit</button>
					</div>
				</div>
			</div>`;

		//if itemsCount is a multiple of 4 we need to add another row
		//else, add the item to the last row
		if(itemsCount % 4 == 0) {
			$("#table").append('<div class="row">' + itemHTML + '</div>');
		}
		else {
			$("#table").children().last().append(itemHTML);
		}

		itemsCount++;

		//reassign the click event listeners on the edit item buttons
		assignEditItemButtonFunctionality();

		//update the backend with the new item...
		
	}

	//this is the saves changes button on the edit item modal
	$("#editItemSaveChangesButton").click(function() {
		var name = $("#editItemNameField").val();
		var description = $("#editItemDescriptionField").val();
		var image = $("#editItemImageField").val();

		currentItemCard.find(".card-body .card-title").text(name);
		currentItemCard.find(".card-body .card-text").text(description);
		currentItemCard.find(".card-img-top").attr("src", image);

		//update the backend with the new item information...


		//close the modal
		$("#editItemModal").modal("toggle");
	});

	var assignEditItemButtonFunctionality = function() {
		$(".editItemButton").off();

		//this is the edit item button on each of the item entries
		$(".editItemButton").click(function () {
			var card = $(event.target).parent().parent();
			currentItemCard = card;

			var name = card.find(".card-body .card-title").text();
			var description = card.find(".card-body .card-text").text();
			var image = card.find(".card-img-top").attr("src");

			$("#editItemNameField").val(name);
			$("#editItemDescriptionField").val(description);
			$("#editItemImageField").val(image);
		});
	}
	assignEditItemButtonFunctionality();


});