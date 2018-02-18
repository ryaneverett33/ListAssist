$(document).ready(function() {
	var itemsCount = 8;

	$("#customRadio").click(function() {
		$("#customFields").show();
		$("#byLinkFields").hide();
	});

	$("#byLinkRadio").click(function() {
		$("#byLinkFields").show();
		$("#customFields").hide();
	});

	$("#addItemButton").click(function() {
		//clear inputs
		$("#addItemNameField").val("");
		$("#addItemDescriptionField").val("");
		$("#addItemImageField").val("");
		$("#addItemLinkField").val("");
	});

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
						<button type="button" class="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#editItemModal">Edit</button>
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
	}
});