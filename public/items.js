$(document).ready(function() {
	//get the token cookie
	//var token = document.cookie.split(";")[1].split("=")[1];
	var token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFjMmI2M2ZhZWZjZjgzNjJmNGM1MjhlN2M3ODQzMzg3OTM4NzAxNmIifQ.eyJhenAiOiI1NzM1OTkyMTEyMzEtcWNlOG9saTltNGtqbGI5ZmwwYWgzNWV2ZzRlOHNlanUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NzM1OTkyMTEyMzEtcWNlOG9saTltNGtqbGI5ZmwwYWgzNWV2ZzRlOHNlanUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQ0MjIxNjA4MDAyOTYxODY5NjMiLCJlbWFpbCI6Imt5bGUubi5idXJrZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IlNZamliTmg4aGNrbUpvcDNQOG5XZVEiLCJleHAiOjE1MjA1NjAyNDQsImlzcyI6ImFjY291bnRzLmdvb2dsZS5jb20iLCJqdGkiOiI4NTY3ODQxMzYyNTVlM2JlMWY2MTI0MWM0ZmQ5M2JhZDM2NmY3YmQzIiwiaWF0IjoxNTIwNTU2NjQ0LCJuYW1lIjoiS3lsZSBCdXJrZSIsInBpY3R1cmUiOiJodHRwczovL2xoNC5nb29nbGV1c2VyY29udGVudC5jb20vLUFUNUVoWVZBbDV3L0FBQUFBQUFBQUFJL0FBQUFBQUFBRTgwL2pkTEdjQmRYQ25rL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJLeWxlIiwiZmFtaWx5X25hbWUiOiJCdXJrZSIsImxvY2FsZSI6ImVuIn0.CYoNUd1D1eFlYc6WNXsMuHKhult8uWDCBGjoNwuchoO18q7aRUXLsBS5RUZ2r_kL3XOMITclOCW-OBQ5xmA9aji5g_NZKZyMYrBtxctWMOJKpufCWNFLmv8Qhlox1O2fxwH9uk1kmLpPIRDPudfU_8eHVryiXyr9X1P1iOLJ50zLjUWEge8OVe8bkJOQwmrPb7ko1xU2Q-FsyUv96dBBoOK47nPOevFGZgoFOJjW5l2DDMg-H5QhUatLpQwXTRK5dJmI5Ammu52z_kndEQPh-W0u71bsKEoPbWvZiJY8WR0RZkWuMa83FletO4xNmxujWe_jBCqae5MErjU0eBWbTg";

	//get the id of the list
	var id = window.location.href.split("?")[1];

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
		$("#addItemImageField").val("");
		$("#addItemLinkField").val("");

		//clear invalid classes
		$("#addItemNameField").removeClass("is-invalid");
		$("#addItemImageField").removeClass("is-invalid");
	});

	//this is the add item button on the new item modal
	$("#addItemModalButton").click(function() {
		var name;
		var image;

		if($("#customRadio").is(":checked")) {
			name = $("#addItemNameField").val();
			image = $("#addItemImageField").val();

			//ensure name isn't empty
			if(name == "") {
				$("#addItemNameField").addClass("is-invalid");
				return;
			}

			//ensure the image exists
			imageExists(image, null, function(exists) {
				if(exists) {
					addItem(name, image);

					//update backend with new item
					var data = {
						token: token,
						name: name,
						list_id: id,
						picture: image
					};
					data = JSON.stringify(data);

					accessServer("http://listassist.duckdns.org/list/add", data, function(result) {
						console.log(result);
					},
					function(result) {
						console.log(result);
					});

					//close the modal
					$("#addItemModal").modal("toggle");
				}
				else {
					$("#addItemImageField").addClass("is-invalid");
				}
			});
		}
		else {
			//run amazon web scraper to find name, description and image
			var link = $("#addItemLinkField").val();
		}
	});

	var addItem = function(name, image) {
		var itemHTML = `
			<div class="col-3">
				<div class="card">
					<img class="card-img-top" src="` + image + `">
					<div class="card-body">
						<h5 class="card-title">` + name + `</h5>
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
	}

	//this is the save changes button on the edit item modal
	$("#editItemSaveChangesButton").click(function() {
		var name = $("#editItemNameField").val();
		var image = $("#editItemImageField").val();

		//ensure name isn't empty
		if(name == "") {
			$("#editItemNameField").addClass("is-invalid");
			return;
		}

		//ensure the image exists
		imageExists(image, null, function(exists, passOut) {
			if(exists) {
				currentItemCard.find(".card-body .card-title").text(name);
				currentItemCard.find(".card-img-top").attr("src", image);

				//update the backend with the new item information...

				$("#editItemModal").modal("toggle");
			}
			else {
				$("#editItemImageField").addClass("is-invalid");
			}
		});
	});

	var assignEditItemButtonFunctionality = function() {
		$(".editItemButton").off();

		//this is the edit item button on each of the item entries
		$(".editItemButton").click(function () {
			var card = $(event.target).parent().parent();
			currentItemCard = card;

			var name = card.find(".card-body .card-title").text();
			var image = card.find(".card-img-top").attr("src");

			$("#editItemNameField").val(name);
			$("#editItemImageField").val(image);

			//clear the invalid classes
			$("#editItemNameField").removeClass("is-invalid");
			$("#editItemImageField").removeClass("is-invalid");
		});
	}
	assignEditItemButtonFunctionality();

	var accessServer = function(url, data, onSuccess, onFail) {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url);
		xhr.onload = function () {
			if(xhr.status === 200) {
				onSuccess(xhr.response);
			}
			else {
				console.log("FAILED TO ACCESS SERVER");
				console.log("DATA: " + data);
				console.log("RESULT: " + xhr.response);
				onFail(xhr.response);
			}
		};

		xhr.send(data);
	}

	function imageExists(url, passIn, callback) {
		var img = new Image();
		img.onload = function() { callback(true, passIn); };
		img.onerror = function() { callback(false, passIn); };
		img.src = url;
	  }

	//initially fill up the page with the items and update the name
	var data = {
		token: token
	};
	data = JSON.stringify(data);

	accessServer("http://listassist.duckdns.org/list/get", data, function(result) {
		json = JSON.parse(result);

		var items = null;

		//find the list
		for(var i = 0; i < json.length; i++) {
			if(json[i].info.id == id) {
				items = json[i].items;

				//update the name
				$("#listTitle").html(json[i].info.name);

				break;
			}
		}

		if(items == null) {
			//the list with this id wasn't found
			alert("this list was not found");
		}

		for(var i = 0; i < items.length; i++) {
			var name = items[i].name;
			var picURL = items[i].picture_url;

			if(!picURL.startsWith("http://") || !picURL.startsWith("https://")) {
				picURL = "/defaultItem.png";
			}

			//ensure the image exists
			imageExists(picURL, name, function(exists, name) {
				if(exists) {
					addItem(name, picURL);
				}
				else {
					addItem(name, "/defaultItem.png");
				}
			});
		}

	},
	function(result) {
		console.log(result);
	});
});