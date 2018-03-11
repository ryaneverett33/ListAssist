$(document).ready(function() {
	var token = null;
	var cookie = document.cookie.split(";");

	var list_count = 0;
	var d;

	for(var i = 0; i < cookie.length; i++) {
		var currTokenSplit = cookie[i].split("=");
		if(currTokenSplit[0] == " token") {
			token = currTokenSplit[1];
			//$("#googs").attr("content", token);
			//console.log(token)
		}
	}

	//token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFjMmI2M2ZhZWZjZjgzNjJmNGM1MjhlN2M3ODQzMzg3OTM4NzAxNmIifQ.eyJhenAiOiI1NzM1OTkyMTEyMzEtcWNlOG9saTltNGtqbGI5ZmwwYWgzNWV2ZzRlOHNlanUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NzM1OTkyMTEyMzEtcWNlOG9saTltNGtqbGI5ZmwwYWgzNWV2ZzRlOHNlanUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQ0MjIxNjA4MDAyOTYxODY5NjMiLCJlbWFpbCI6Imt5bGUubi5idXJrZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjBuX1NrdHhRZ1VrZi13OWN4NUJlTlEiLCJleHAiOjE1MjA3NDc3NzIsImlzcyI6ImFjY291bnRzLmdvb2dsZS5jb20iLCJqdGkiOiJhYmRlZDM1NDFjMDFiODcxNDBjNDUwNWUyNzBmNTdkNzFkNzQ2MzhmIiwiaWF0IjoxNTIwNzQ0MTcyLCJuYW1lIjoiS3lsZSBCdXJrZSIsInBpY3R1cmUiOiJodHRwczovL2xoNC5nb29nbGV1c2VyY29udGVudC5jb20vLUFUNUVoWVZBbDV3L0FBQUFBQUFBQUFJL0FBQUFBQUFBRTgwL2pkTEdjQmRYQ25rL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJLeWxlIiwiZmFtaWx5X25hbWUiOiJCdXJrZSIsImxvY2FsZSI6ImVuIn0.m4B7-ceo-20LeKh7WpBzMX7b216SDRT08PRCSreH4hFAN2ompVl-HBAn8XmxsGC-V6S4nMagNjTJFLXKQ4X_3-aQ8bJfERgMGPZ3hdhs7nDBlHuCIKe-mWTlQFTElYxc_T0mg8iJZLrnqofmfJq-4PSjx18Uudb4TfnDbFe0DiJc9KlAYPa6P5TU4d1C2qemmA2idJcUCleEmrCgG0wcpABxFpAmLWUd9LcniBkldRnFYN6Z36PcHxNYVzKBp1HRC3hZ7DEgkgyj03z5DiTrEsFH-t37rBYHB7tua0ceRhD5SccKrW2WHIvxD2slEHAkuC1CPVrCkBttwHkJRKkC3w";

	if(token == null) {
		//no token was found so redirect to the login page
		window.location.href = "https://listassist.duckdns.org";
	}

	function onLoad(signout) {
			console.log("called.")
      gapi.load('auth2', function() {
        gapi.auth2.init().then(() => { 
		  		console.log("no");
		  		var auth2 = gapi.auth2.getAuthInstance();
					auth2.signOut().then(function () {
						console.log('User signed out.');
					});
				})
      });
  }

  function signOut() {
			console.log("called.")
      gapi.load('auth2', function() {
        gapi.auth2.init().then(() => { 
		  		console.log("no");
		  		var auth2 = gapi.auth2.getAuthInstance();
					auth2.signOut().then(function () {
						console.log('User signed out.');
					});
				})
      });
  }

  function eraseCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}

	$("#logout").click(function() {

		//for (var i = 0; i < cookie.length; i++)
		//	eraseCookie(cookie[i].split("=")[0]);
		//signOut();
		window.location.href = "/";
	});

	//this is the add list button on the page
	$("#add_list").click(function() {
		//clear inputs
		$("#add_list_name_field").val("");
		//clear invalid classes
		$("#add_list_name_field").removeClass("is-invalid");
	});

	//this is the add list button on the new list modal
	$("#add_list_modal_button").click(function() {
		var name;
		name = $("#add_list_name_field").val();
		//ensure name isn't empty

		if(name.replace(/\s+/, "")  == "") {
			$("#add_list_name_field").addClass("is-invalid");
			return;
		}else {
			addList(name);

			//update the backend with the new item
			var data = {
				token: token,
				name: name
			};
			data = JSON.stringify(data);
		
			accessServer("https://listassist.duckdns.org/list/new", data, function(result) {
				console.log(result);
			},
			function(result) {
				console.log(result);
			});

			$("#add_list_modal").modal('toggle');
			return;
		}
	});

	var addList = function(name, listID) {
		var itemHTML = `<div class="pair" listID="` + listID + `">
          <button type="button" class="btn btn-primary btn-lg name listButton">` + name + `</button>
          <button type="button" class="btn btn-success edit" data-toggle="modal" data-target="#edit_list_modal">Edit</button>
        </div>`;

		$("#list").append(itemHTML);
		list_count++;
		//reassign the click event listeners on the buttons
		assignListButtonFunctionality();
		assignEditButtonFunctionality();
	}

	function assignEditButtonFunctionality() {
		$(".edit").off();

		$(".edit").click(function () {
			d = $(event.target).parent();
			var name = d.find(".name").text();
			$("#edit_list_name_field").val(name);
			$("#edit_list_name_field").removeClass("is-invalid");
		})
	}

	function assignListButtonFunctionality() {
		$(".listButton").off();

		$(".listButton").click(function() {
			window.location.href = "/items.html?" + $(event.target).parent().attr("listID");
		});
	}

	$("#edit_list_modal_save").click(function() {
		var name = $("#edit_list_name_field").val();
		console.log(name);
		//ensure name isn't empty
		if(name.replace(/\s+/) == "") {
			$("#edit_list_name_field").addClass("is-invalid");
			return;
		}
		d.find(".name").text(name);

		//update the backend with the new item information...
		var data = {
			token: token,
			id: d.attr("listID"),
			name: name
		};
		data = JSON.stringify(data);
		console.log(data);
	
		accessServer("https://listassist.duckdns.org/list/edit", data, function(result) {
			console.log(result);
		},
		function(result) {
			console.log(result);
		});

		$("#edit_list_modal").modal("toggle");
	})

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

	//initially fill up the page with the list buttons
	var data = {
		token: token
	};
	data = JSON.stringify(data);

	accessServer("https://listassist.duckdns.org/list/all", data, function(result) {
		json = JSON.parse(result);

		for(var i = 0; i < json.length; i++) {
			var name = json[i].info.name;
			var listID = json[i].info.id;

			addList(name, listID);
		}
	},
	function(result) {
		console.log(result);
	});
});