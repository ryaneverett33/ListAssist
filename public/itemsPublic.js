$(document).ready(function() {
	//get the id of the list
	var id = window.location.href.split("?")[1];
	var currentItemCard;
	var itemsCount = 0;

	//see if we can find a token
	var cookie = document.cookie.split(";");
	var token = null;
	for(var i = 0; i < cookie.length; i++) {
		var currTokenSplit = cookie[i].split("=");
		if(currTokenSplit[0] == " token") {
			token = currTokenSplit[1];
		}
	}

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
        currentItemCard.find(".card-text").append("Bought by " + name);

        //update backend with the puchaseeeeeeeeeeeeeeeeeeeeeeeeeeee
		var data = {};
		
		if(token == null) {
			data.name = name;
		}
		else {
			data.token = token;
		}
		data.id = currentItemCard.attr("itemID");
		data = JSON.stringify(data);
		console.log(data);
    
        accessServer("https://listassist.duckdns.org/list/item/purchase", data, function(result) {
			console.log(result);
        },
        function(result) {
            console.log(result);
        });

        //close the modal
		$("#markAsBoughtModal").modal("toggle");
    });

    function imageExists(url, passIn, callback) {
		var img = new Image();
		img.onload = function() { callback(true, passIn); };
		img.onerror = function() { callback(false, passIn); };
		img.src = url;
	}

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
    
    var addItem = function(name, image, itemID, purchased, buyer) {
		var itemHTML;

		if(purchased) {
			itemHTML = `
				<div class="col-3">
					<div class="card" itemID="` + itemID + `">
						<img class="card-img-top" src="` + 'image1.png' + `" link="` + image + `">
						<div class="card-body text-success">
							<h5 class="card-title">` + name + `</h5>
							<p class="card-text">Bought by ` + buyer + `</p>
						</div>
					</div>
				</div>`;
		}
		else {
			itemHTML = `
				<div class="col-3">
					<div class="card" itemID="` + itemID + `">
						<img class="card-img-top" src="` + 'image1.png' + `" link="` + image + `">
						<div class="card-body">
							<h5 class="card-title">` + name + `</h5>
							<p class="card-text"></p>
							<button type="button" class="btn btn-outline-primary btn-sm markAsBoughtButton">Mark as bought</button>
						</div>
					</div>
				</div>`;
		}

		//if itemsCount is a multiple of 4 we need to add another row
		//else, add the item to the last row
		if(itemsCount % 4 == 0) {
			$("#table").append('<div class="row">' + itemHTML + '</div>');
		}
		else {
			$("#table").children().last().append(itemHTML);
		}

		itemsCount++;

		//reassign the click event listeners on the mark as bought buttons
		assignMarkAsBoughtButtonFunctionality();
	}

	var assignMarkAsBoughtButtonFunctionality = function() {
		$(".markAsBoughtButton").off();

     //Firefox support
		$(".markAsBoughtButton").click(function(event) {
			currentItemCard = $(event.target).parent().parent();

        	//clear the invalid classes
			$("#markAsBoughtNameField").removeClass("is-invalid");
			   
			if(token != null) {
				var data = {
					token: token
				};
				data.id = currentItemCard.attr("itemID");
				data = JSON.stringify(data);
				console.log(data);
			
				accessServer("https://listassist.duckdns.org/list/item/purchase", data, function(result) {
					window.location.reload();
				},
				function(result) {
					console.log(result);
				});
			}
			else {
				$("#markAsBoughtModal").modal("toggle");
			}
		});
	}

    //initially fill up the page with the items and update the name
	var data = {
		id: id
	};
	data = JSON.stringify(data);

	accessServer("https://listassist.duckdns.org/list/get", data, function(result) {
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
			return;
		}

		for(var i = 0; i < items.length; i++) {
			var name = items[i].name;
			var picURL = items[i].picture_url;
			var itemID = items[i].id;
			var purchased = items[i].purchased;
			var buyer = items[i].buyer;

			if(purchased == 1)
				purchased = true;

			if(!picURL.startsWith("http://") && !picURL.startsWith("https://")) {
				picURL = "/defaultItem.png";
			}

			var passIn = {
				name: name,
				itemID: itemID,
				picURL: picURL,
				purchased: purchased,
				buyer: buyer
			}

			//ensure the image exists
			imageExists(picURL, passIn, function(exists, passOut) {
				if(exists) {
					addItem(passOut.name, passOut.picURL, passOut.itemID, passOut.purchased, passOut.buyer);
				}
				else {
					addItem(passOut.name, "/defaultItem.png", passOut.itemID, purchased, buyer);
				}
			});
		}

	},
	function(result) {
		console.log(result);
		alert("This list was not found");
	});
    
});