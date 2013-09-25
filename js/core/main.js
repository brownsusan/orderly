	var landingTemplate;
	var applicationTemplate;
	var user;

	function init() {

	    // check if the user is logged in
	    $.ajax({
	        url: "xhr/check_login.php",
	        type: "get",
	        dataType: "json",
	        success: function (response) {

	            console.log(response);

	            // if the user is logged in
	            if (response.user) {
	                console.log(response.user);
	                user = response.user;
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
	    $.get("templates/landing.html?2", function (template) {

	        landingTemplate = template;

	        var header = $(landingTemplate).find('#landing-header').html();
	        var main = $(landingTemplate).find('#landing-main').html();

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

	        $('#header_login').click(function () {

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
	                url: "xhr/login.php",
	                type: "post",
	                dataType: "json",
	                data: {
	                    'username': username,
	                    'password': password
	                },
	                success: function (response) {

	                    // if the user logged in
	                    if (response.user) {
	                        user = response.user;
	                        loadApplication();
	                    }

	                    // if the user did not log in
	                    else {
	                        // show error
	                    }

	                }
	            });

	        });

	        $('#home_sign_up').click(function () {

	            // make the variables
	            var firstName = $('#home_firstName').val();
	            var lastName = $('#home_lastName').val();
	            var username = $('#home_username').val();
	            var email = $('#home_email').val();
	            var pass = $('#home_pass').val();
	            var confirmPass = $('#home_confirmPass').val();

	            // validate the variable
	            var valid = true;

	            if (firstName.length == 0) {
	                valid = false;
	                // show the user an error
	            }
	            if (lastName.length == 0) {
	                valid = false;
	                // show the user an error
	            }
	            if (username.length == 0) {
	                valid = false;
	                // show the user an error
	            }
	            if (email.length == 0) {
	                valid = false;
	                // show the user an error
	            }
	            if (pass.length < 6) {
	                valid = false;
	                // show the user an error
	            }
	            if (confirmPass.length < 6) {
	                valid = false;
	                // show the user an error
	            }

	            if (pass != confirmPass) {
	                valid = false;
	                //Show the user an error
	            }

	            if (!valid) {
	                return;
	            }

	            // ajax request to send the variables
	            $.ajax({
	                url: "xhr/register.php",
	                type: "post",
	                dataType: "json",
	                data: {
	                    'first_name': firstName,
	                    'last_name': lastName,
	                    'username': username,
	                    'email': email,
	                    'password': pass
	                },
	                success: function (response) {

	                    // if the user signed up
	                    if (response.user) {



	                        //Log the user in
	                        $.ajax({
	                            url: "xhr/login.php",
	                            type: "post",
	                            dataType: "json",
	                            data: {
	                                'username': username,
	                                'password': pass
	                            },
	                            success: function (response) {

	                                // if the user logged in
	                                if (response.user) {
	                                    user = response.user;
	                                    loadApplication();
	                                }

	                                // if the user did not log in
	                                else {
	                                    // show error
	                                }

	                            }
	                        });




	                    }

	                    // if the user did not sign up
	                    else {
	                        // show error
	                    }

	                }
	            });


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
	    $.get("templates/app.html?3", function (template) {
	        applicationTemplate = template;

	        var header = $(applicationTemplate).find('#application-header').html();

	        var taskSubmit = $(applicationTemplate).find('#application-task-submit').html();
	        var taskDetail = $(applicationTemplate).find('#application-task-detail').html();
	        var taskItem = $(applicationTemplate).find('#application-task-item').html();

	        $.template('headerTemplate', header);
	        var headerHtml = $.render(user, 'headerTemplate');

	        //replace the header
	        $('header').html(headerHtml);

	        loadProjects();

	        // add the event listener to the elements
	        $('#header_user').click(function () {
	            $('#header_account').toggle();
	        });

	        $('#account_edit').click(function () {
	            $('#header_account_display').hide();
	            $('#header_account_edit').show();
	        });

	        $('#account_save').click(function () {
	        	
	            $('#header_account_display').show();
	            $('#header_account_edit').hide();

	            // make the variables
	            var firstName = $('#account_edit_firstName').val();
	            var lastName = $('#account_edit_lastName').val();
	            var email = $('#account_edit_email').val();
	            var pass = $('#account_edit_pass').val();
	            var confirmPass = $('#account_edit_confirmPass').val();

	            // validate the variable
	            var valid = true;

	            if (firstName.length == 0) {
	                valid = false;
	                // show the user an error
	            }
	            if (lastName.length == 0) {
	                valid = false;
	                // show the user an error
	            }
	            if (email.length == 0) {
	                valid = false;
	                // show the user an error
	            }
	            if (pass.length < 6) {
	                valid = false;
	                // show the user an error
	            }
	            if (confirmPass.length < 6) {
	                valid = false;
	                // show the user an error
	            }

	            if (pass != confirmPass) {
	                valid = false;
	                //Show the user an error
	            }

	            if (!valid) {
	            	console.log("invalid");
	                return;
	            }

	            $.ajax({
	                url: "xhr/update_user.php",
	                type: "post",
	                dataType: "json",
	                data: {
					   'first_name': firstName,
					   'last_name': lastName,
					   'email': email,
					   'password': pass
	                },
	                success: function (response) {

	                    // if the user logged in
	                    if (response.user) {
	                    	//
	                    }

	                    // if the user did not log in
	                    else {
	                        // show error
	                    }
	                    
	                }
	            });


	        });

	        $('#header_logout').click(function () {

	            // log the user out

	            $.ajax({
	                url: "xhr/logout.php",
	                type: "get",
	                dataType: "json",
	                success: function (response) {

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
	        
	        

	    }); //end get template function

	}

	function loadProjects() {

	    var projectSubmit = $(applicationTemplate).find('#application-project-submit').html();
	    var projectDetail = $(applicationTemplate).find('#application-project-detail').html();
	    var projectItem = $(applicationTemplate).find('#application-project-item').html();

	    $.template('projectItemTemplate', projectItem);

	    // clear the main
	    $('#main').html('<br />');

	    var newProjectButton = '<button id="application_create" class="button-submit">New Project</button>';

	    $(newProjectButton).appendTo('#main');

	    $.ajax({
	        url: "xhr/get_projects.php",
	        type: "get",
	        dataType: "json",
	        success: function (response) {

	            for (var i = 0, j = response.projects.length; i < j; i++) {
	                console.log(response.projects[i].projectName);

	                var projectItemHtml = $.render(response.projects[i], 'projectItemTemplate');

	                $('#main').append(projectItemHtml);
	            }

	        }
	    });
	}


	function loadTasks(projectID) {

	    // clear the main
	    $('#main').html('');

	    $.ajax({
	        url: "xhr/get_tasks.php",
	        type: "get",
	        dataType: "json",
	        data: {
	            'projectID': projectID
	        },
	        success: function (response) {
	            console.log(response);
	        }
	    });
	};