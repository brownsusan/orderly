$(document).ready(function() {

	function init() {

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

		console.log("user is not logged in");
		console.log("The landing page will be loaded here");

		// create all the page elements
		$.get("templates/landing.html", function(template){
			var header = $(template).find('#landing-header').html();
			var main = $(template).find('#landing-main').html();
			
			/*
			Do not need clears because .html() replaces the html
			If I were using .append() I would need to clear it first then append the html to the header/main
			// clear the header
			$('header').html('');
			//clear the main
			$('#main').html('');
			*/
			
			//replace the header
			$('header').html(header);
			
			//replace the main
			$('#main').html(main);
			
			// add the event listener to the elements
	
			$('#header_login').click(function() {
	
				var username = $('#header_username').val();
				var password = $('#header_password').val();
	
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
					
						// if the user logged in
						if (response.user) {
							loadApplication();
						}
		
						// if the user did not log in
						else {
							// show error
						}
	
					}
				});
	
			});
			
			$('#home_sign_up').click(function() {
				
				// make the variables
				var firstName = $('#home_firstName').val();
				
				// validate the variable
				
				// ajax request to send the variables
				
				// use login as an example
				
			});
			
		});

	}

	// create the application page
	function loadApplication() {

		console.log("user is logged in");
		console.log("The application will be loaded here");

		// create all the page elements
		//?2 is for forcing it to reload - remove before submitting - clear cache to remove the need to reload
		//HACK
		$.get("templates/app.html?2", function(template){
			
			var header = $(template).find('#application-header').html();
			
			//replace the header
			$('header').html(header);
			
			loadProjects();
			
			// add the event listener to the elements
	
			$('#header_logout').click(function() {
	
				// log the user out
	
				$.ajax({
					url : "xhr/logout.php",
					type : "get",
					dataType : "json",
					success : function(response) {
						
						// if the user logged out
						if (response.success) {
							loadLanding();
						}
		
						// if the user did not log out
						else {
							// show error
						}
						
					}
				});
	
			});
			
		});
		


	}
	
	function loadProjects(){
	
		// clear the main
		$('#main').html('');
	
		$.ajax({
			url : "xhr/get_projects.php",
			type : "get",
			dataType : "json",
			success : function(response) {
				console.log(response);
			}
		});
	}
	
	function loadTasks(projectID){
	
		// clear the main
		$('#main').html('');
	
		$.ajax({
			url : "xhr/get_tasks.php",
			type : "get",
			dataType : "json",
			data: {
				'projectID': projectID
			},
			success : function(response) {
				console.log(response);
			}
		});
	}

});
