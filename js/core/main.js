$(document).ready(function() {

	var init = function() {

		// check if the user is logged in
		$.ajax({
			url : "xhr/check_login.php",
			type : "get",
			dataType : "json",
			success : function(response) {

				console.log(response);

				// if the user is logged in
				if (response.user) {
					loadApplication();
				}

				// if the user is not logged in
				else {
					loadLanding();
				}
			}
		});

	};

	init();

	// create the landing page
	function loadLanding() {

		console.log("The landing page will be loaded here");

		// creat all the page elements

		// add the events to the elements

		$('#login_submit').click(function() {

			var username = $('#login_username').val();
			var password = $('#login_password').val();

			// validate the variables

			var valid = true;

			if (username.length == 0) {
				valid = false;
				// show the user an error
			}

			if (password.length < 6) {
				valid = false;
				// show the user an error
			}

			if (!valid) {
				return;
			}

			// log the user in

			$.ajax({
				url : "xhr/login.php",
				type : "post",
				dataType : "json",
				data : {
					'username' : username,
					'password' : password
				},
				success : function(response) {
					console.log(response);
				}
			});

		});

	}

	// create the application page
	function loadApplication() {

		console.log("The application will be loaded here");

		$('#logout_submit').click(function() {
			
			// log the user out

			$.ajax({
				url : "xhr/logout.php",
				type : "get",
				dataType : "json",
				success : function(response) {
					console.log(response);
				}
			});
			
		});

	}

});
