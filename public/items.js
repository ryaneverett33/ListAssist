$(document).ready(function() {
	//get the token cookie
	var cookie = document.cookie.split(";");
	var token = null;
	for(var i = 0; i < cookie.length; i++) {
		var currTokenSplit = cookie[i].split("=");
		if(currTokenSplit[0] == " token") {
			token = currTokenSplit[1];
		}
	}

	//token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImU5YjU2Y2ZjNjQwZDEyYmZmNDU0MDU1MzQwMmM3ZjE1N2Q0ODE4MDYifQ.eyJhenAiOiI1NzM1OTkyMTEyMzEtcWNlOG9saTltNGtqbGI5ZmwwYWgzNWV2ZzRlOHNlanUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NzM1OTkyMTEyMzEtcWNlOG9saTltNGtqbGI5ZmwwYWgzNWV2ZzRlOHNlanUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQ0MjIxNjA4MDAyOTYxODY5NjMiLCJlbWFpbCI6Imt5bGUubi5idXJrZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImhqWkV1TlRoOGEtbXEzc05zVXU4aUEiLCJleHAiOjE1MjI0NDc5NzQsImlzcyI6ImFjY291bnRzLmdvb2dsZS5jb20iLCJqdGkiOiIyNDliYmEzNjJhY2QxYWVhZTRjYzNjZWM1ODNhODE3NTBjYTQxNWMxIiwiaWF0IjoxNTIyNDQ0Mzc0LCJuYW1lIjoiS3lsZSBCdXJrZSIsInBpY3R1cmUiOiJodHRwczovL2xoNC5nb29nbGV1c2VyY29udGVudC5jb20vLUFUNUVoWVZBbDV3L0FBQUFBQUFBQUFJL0FBQUFBQUFBRTgwL2pkTEdjQmRYQ25rL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJLeWxlIiwiZmFtaWx5X25hbWUiOiJCdXJrZSIsImxvY2FsZSI6ImVuIn0.HyQeJweYWkNzMAHmuDOoqRiqLaSmXzH7KD6FCp1PJhB0mjqjVh9XXEadbIJMpj65PwUEusm0MU4Wp2aXVIYcoPXnB-TVdrNOiTo96KwRmTcZcCycC17EctGB5wUJ6aq2DIXx9oPTvKO7vZnef-e3mpVipUyQvel1NDToQtQGoHOSC93_8jpS6D7yCD6bHefcBZs3H-FoDscyk9gFv0CHp15FjbeD8NY__Ab07xt4n7HtPTh-s7K8xncHNarc--ngC7sh7Prb-g8zl5MRIGSptdKBCIccgb2ONxqwXjTDHp8bSaTa58dbOn7fyNTGwTPT4eykOxcqOUk5xvJjj97IAw";

	if(token == null) {
		//no token was found so redirect to the login page
		//window.location.href = "https://listassist.duckdns.org";
		window.location.href = "/";
	}

	//get the id of the list
	var id = window.location.href.split("?")[1];

	var itemsCount = 0;
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
		$("#addItemImageField").val("defaultItem.png");
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
					//addItem(name, image);

					//update backend with new item
					var data = {
						token: token,
						name: name,
						list_id: id,
						picture: image
					};
					data = JSON.stringify(data);
					//accessServer("https://listassist.duckdns.org/list/add", data, function(result) {
						accessServer("/list/add", data, function(result) {
						console.log(result);
						window.location.reload();
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

	var addItem = function(name, image, itemID) {
		var itemHTML = `
			<div class="col-3">
				<div class="card" itemID="` + itemID + `">
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
		var oldName = currentItemCard.find(".card-body .card-title").text();
		var oldImage = currentItemCard.find(".card-img-top").attr("src");
		var newName = $("#editItemNameField").val();
		var newImage = $("#editItemImageField").val();

		//ensure name or image isn't empty
		if(newName == "") {
			$("#editItemNameField").addClass("is-invalid");
			return;
		}

		if(newImage == "") {
			$("#editItemImageField").addClass("is-invalid");
			return;
		}

		if(newName != oldName) {
			//update the backend with the new item information
			var data = {
				token: token,
				id: currentItemCard.attr("itemid"),
				column: "name",
				new_value: newName
			};
			data = JSON.stringify(data);

			//accessServer("https://listassist.duckdns.org/list/item/edit", data, function(result) {
				accessServer("/list/item/edit", data, function(result) {
				console.log(result);
				currentItemCard.find(".card-body .card-title").text(newName);
				$("#editItemModal").modal("toggle");
			},
			function(result) {
				console.log(result);
			});
		}

		if(newImage != oldImage) {
			//ensure the image exists
			imageExists(newImage, null, function(exists, passOut) {
				if(exists) {
					//update the backend with the new item information
					var data = {
						token: token,
						id: currentItemCard.attr("itemid"),
						column: "picture_url",
						new_value: newImage
					};
					data = JSON.stringify(data);
					console.log(data);

					//accessServer("https://listassist.duckdns.org/list/item/edit", data, function(result) {
						accessServer("/list/item/edit", data, function(result) {
						console.log(result);
						currentItemCard.find(".card-img-top").attr("src", newImage);
						$("#editItemModal").modal("toggle");
					},
					function(result) {
						console.log(result);
					});
				}
				else {
					$("#editItemImageField").addClass("is-invalid");
				}
			});
		}
	});

	$("#editItemRemoveButton").click(function() {
		var data = {
			token: token,
			id: currentItemCard.attr("itemid")
		}
		data = JSON.stringify(data);

		//accessServer("https://listassist.duckdns.org/list/item/delete", data, function(result) {
			accessServer("/list/item/delete", data, function(result) {
			console.log(result);
			window.location.reload();
		},
		function(result) {
			console.log(result);
		});

	});

	var assignEditItemButtonFunctionality = function() {
		$(".editItemButton").off();

		//this is the edit item button on each of the item entries
		$(".editItemButton").click(function (event) {
			currentItemCard = $(event.target).parent().parent();;

			var name = currentItemCard.find(".card-body .card-title").text();
			var image = currentItemCard.find(".card-img-top").attr("src");

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

	//set the link on the share list modal
	$("#shareListField").attr("value", "http://listassist.duckdns.org:8080/itemsPublic.html?" + id);
	//$("#shareListField").attr("value", "/itemsPublic.html?" + id);
	
	//initially fill up the page with the items and update the name
	var data = {
		id: id
	};
	data = JSON.stringify(data);

	//accessServer("https://listassist.duckdns.org/list/get", data, function(result) {
		accessServer("/list/get", data, function(result) {
		json = JSON.parse(result);
		var items = null;

		//find the list
		for(var i = 0; i < json.length; i++) {
			if(json[i].info.id == id) {
				items = json[i].items;

				//update the name
				$("#listTitle").html("list1");

				break;
			}
		}

		if(items == null) {
			//the list with this id wasn't found
			alert("this list was not found");
			return;
		}

		for(var i = 0; i < Math.min(10, items.length); i++) {
			var name = items[i].name;
			name = name.slice(0, 25);
			var picURL = items[i].picture_url;
			var itemID = items[i].id;

			if(!picURL.startsWith("http://") && !picURL.startsWith("https://")) {
				picURL = "/defaultItem.png";
			}

			//ensure the image exists
			imageExists(picURL, {name: name, itemID: itemID, picURL: picURL}, function(exists, passOut) {
				if(exists) {
					addItem(passOut.name, passOut.picURL, passOut.itemID);
				}
				else {
					addItem(passOut.name, "/defaultItem.png", passOut.itemID);
				}
			});
		}

	},
	function(result) {
		console.log(result);
		alert("This list was not found");
	});
});