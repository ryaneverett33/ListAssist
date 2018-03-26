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
	//token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFjMmI2M2ZhZWZjZjgzNjJmNGM1MjhlN2M3ODQzMzg3OTM4NzAxNmIifQ.eyJhenAiOiI1NzM1OTkyMTEyMzEtcWNlOG9saTltNGtqbGI5ZmwwYWgzNWV2ZzRlOHNlanUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NzM1OTkyMTEyMzEtcWNlOG9saTltNGtqbGI5ZmwwYWgzNWV2ZzRlOHNlanUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQ0MjIxNjA4MDAyOTYxODY5NjMiLCJlbWFpbCI6Imt5bGUubi5idXJrZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImgxTk9MNlF0cUQ4Qzl5dk5mbVNRNnciLCJleHAiOjE1MjA4MDAyOTAsImlzcyI6ImFjY291bnRzLmdvb2dsZS5jb20iLCJqdGkiOiJmNTM1ZDllNjFlOTNiNjBlYTJiZDZmZTAxMWM3YTIyYzlhMmRiNDYwIiwiaWF0IjoxNTIwNzk2NjkwLCJuYW1lIjoiS3lsZSBCdXJrZSIsInBpY3R1cmUiOiJodHRwczovL2xoNC5nb29nbGV1c2VyY29udGVudC5jb20vLUFUNUVoWVZBbDV3L0FBQUFBQUFBQUFJL0FBQUFBQUFBRTgwL2pkTEdjQmRYQ25rL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJLeWxlIiwiZmFtaWx5X25hbWUiOiJCdXJrZSIsImxvY2FsZSI6ImVuIn0.Dg8WpgTk5oiZItxevDsb3PKu2BiAdak8_bQlq7kdq5ga2BO-rViJYGedbMXxo7o0cn35-1P-ZJf_Ab4IDbO3Aqg7kcUl6R7mG24dBhAnrIjktMxkH9H0zamoskcfdlyKcnW2eonCbF7ZkgChNTFcgFv29CKFjXuAdhCRfVelE73-7U_rkeNxYUcSjklArUI9oNBKA_dVUdc7bvGZdwT6QZv56AnspfAs6HHTr_PvetKUIcf-MWhRNAICr9taTJFDoa2USl9a-p1VyHsxB9XLf1s0boeUscd7hF0TnhxUr760DmzA2Ei7ab8wbcoIfZp0uSBRxsp0aQIZwwznhcNI_A";

	if(token == null) {
		//no token was found so redirect to the login page
		window.location.href = "https://listassist.duckdns.org";
	}

	$("#customRadio").click(function() {
		$("#customFields").show();
		$("#byLinkFields").hide();
	});

	$("#byLinkRadio").click(function() {
		$("#byLinkFields").show();
		$("#customFields").hide();
	});

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
		$("#add_list_name_field_link").val("");
		//clear invalid classes
		$("#add_list_name_field").removeClass("is-invalid");
		$("#add_list_name_field_link").removeClass("is-invalid");
	});

	//this is the add list button on the new list modal
	$("#add_list_modal_button").click(function() {
		if($("#byLinkRadio").is(":checked")) {
			var link = $("#add_list_name_field_link").val();
			if(!link.startsWith("https://www.amazon.com")) {
				$("#add_list_name_field_link").addClass("is-invalid");
				return;
			}
			var data = {
				token: token,
				listUrl: link
			};
			data = JSON.stringify(data);
		
			//accessServer("https://listassist.duckdns.org/list/import", data, function(result) {
			accessServer("/list/import", data, function(result) {
				console.log(result);
				window.location.refresh();
			},
			function(result) {
				alert(result);
			});

			$("#add_list_modal").modal('toggle');
			return;
		}

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
		
			//accessServer("https://listassist.duckdns.org/list/new", data, function(result) {
			accessServer("/list/new", data, function(result) {
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
    
    //firefox support
		$(".edit").click(function (event) {
			d = $(event.target).parent();
			var name = d.find(".name").text();
			$("#edit_list_name_field").val(name);
			$("#edit_list_name_field").removeClass("is-invalid");
		})
	}

	function assignListButtonFunctionality() {
		$(".listButton").off();

		$(".listButton").click(function(event) {
			window.location.href = "/items.html?" + $(event.target).parent().attr("listID");
		});
	}

	$("#editListRemoveButton").click(function() {
		var data = {
			token: token,
			id: d.attr("listID")
		};
		data = JSON.stringify(data);
	
		accessServer("/list/delete", data, function(result) {
			console.log(result);
			$("#edit_list_modal").modal("toggle");
			window.location.reload();
		},
		function(result) {
			console.log(result);
		});
	});
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
	
		//accessServer("https://listassist.duckdns.org/list/edit", data, function(result) {
		accessServer("/list/edit", data, function(result) {
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

	//accessServer("https://listassist.duckdns.org/list/all", data, function(result) {
	accessServer("/list/all", data, function(result) {
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
