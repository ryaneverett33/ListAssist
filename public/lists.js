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
		//window.location.href = "/";
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
		} else {
			addList(name);
			$("#add_list_modal").modal('toggle');
			return;
		}
	});

	var addList = function(name) {
		var itemHTML = '<div class="pair">\
          <button type="button" class="btn btn-primary btn-lg name">' + name + '</button>\
          <button type="button" class="btn btn-success edit" data-toggle="modal" data-target="#edit_list_modal">Edit</button>\
        </div>'

		$("#list").append(itemHTML);
		list_count++;
		//reassign the click event listeners on the edit list buttons
		assignEditButtonFunctionality();

		//update the backend with the new item...
		






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





		$("#edit_list_modal").modal("toggle");
	})
});