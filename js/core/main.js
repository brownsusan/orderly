var landingTemplate;
var applicationTemplate;
var user;

function init() {

	// check if the user is logged in
	$.ajax({
		url : "xhr/check_login.php",
		type : "get",
		dataType : "json",
		success : function(response) {

			// if the user is logged in
			if (response.user) {
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

	// create all the page elements
	$.get("templates/landing.html?2", function(template) {

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

		$('#home_sign_up').click(function() {

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
			if (pass.length > 0 && pass.length < 6) {
				valid = false;
				// show the user an error
			}
			if (confirmPass.length > 0 && confirmPass.length < 6) {
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
				url : "xhr/register.php",
				type : "post",
				dataType : "json",
				data : {
					'first_name' : firstName,
					'last_name' : lastName,
					'username' : username,
					'email' : email,
					'password' : pass
				},
				success : function(response) {

					// if the user signed up
					if (response.user) {

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

	// create all the page elements
	//?2 is for forcing it to reload - remove before submitting - clear cache to remove the need to reload
	//HACK
	$.get("templates/app.html?6", function(template) {
		applicationTemplate = template;

		var header = $(applicationTemplate).find('#application-header').html();

		$.template('headerTemplate', header);
		var headerHtml = $.render(user, 'headerTemplate');

		//replace the header
		$('header').html(headerHtml);

		loadProjects();

		// add the event listener to the elements
		$('#header_user').click(function() {
			$('#header_account').toggle();
		});

		$('#account_edit').click(function() {
			$('#header_account_display').hide();
			$('#header_account_edit').show();
		});

		$('#account_save').click(function() {

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
				return;
			}

			$.ajax({
				url : "xhr/update_user.php",
				type : "post",
				dataType : "json",
				data : {
					'first_name' : firstName,
					'last_name' : lastName,
					'email' : email,
					'password' : pass
				},
				success : function(response) {
					if (response.user) {
						//
					} else {
						// show error
					}

				}
			});

		});

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

		$(document).on('click', '.project-item', function(e) {

			// stop the delete button from triggering this
			if ($(e.target).attr('class') == 'project-item-delete') {
				return;
			}

			var projectID = $(this).find('.data-id').val();

			loadProjectDetails(projectID);

		});
		
		$(document).on('click', '.project-item-delete', function(e) {

			var answer = confirm("Are you sure you want to delete this project?");

			if (answer) {

				var projectID = $(this).closest('.project-item').find('.data-id').val();

				$.ajax({
					url : "xhr/delete_project.php",
					type : "post",
					dataType : "json",
					data : {
						'projectID' : projectID
					},
					success : function(response) {

						console.log(response);
						if (response.success) {
							loadProjects();
						} else {
							//show and error
						}

					}
				});

			}

		});

		$(document).on('click', '.project-edit', function(e) {

			var projectID = $(this).closest('.project-container').find('.data-id').val();

			console.log(projectID);

			$('.project-detail-container').hide();
			$('.project-submit-container').show();

		});
		

		$(document).on('click', '.project-delete', function(e) {

			var answer = confirm("Are you sure you want to delete this project?");

			if (answer) {

				var projectID = $(this).closest('.project-container').find('.data-id').val();

				$.ajax({
					url : "xhr/delete_project.php",
					type : "post",
					dataType : "json",
					data : {
						'projectID' : projectID
					},
					success : function(response) {

						console.log(response);
						if (response.success) {
							loadProjects();
						} else {
							//show and error
						}

					}
				});

			}

		});

		$(document).on('click', '.project-submit-save', function(e) {

			var projectContainer = $(this).closest('.project-container');
			var projectID = projectContainer.find('.data-id').val();

			console.log(projectID);

			$('.project-detail-container').show();
			$('.project-submit-container').hide();

			//make variables
			var name = projectContainer.find('.project-submit-name').val();
			var description = projectContainer.find('.project-submit-description').val();
			var dueDate = projectContainer.find('.project-submit-date').val();

			//validate variables

			//ajax request
			$.ajax({
				url : "xhr/update_project.php",
				type : "post",
				dataType : "json",
				data : {
					'projectID' : projectID,
					'projectName' : name,
					'projectDescription' : description
				},
				success : function(response) {

					console.log(response);
					if (response.project) {
						loadProjectDetails(projectID);
					} else {
						//show and error
					}

				}
			});

		});

		$(document).on('click', '.task-item', function(e) {

			// stop children elements from triggering this
			if (e.target !== this) {
				return;
			}

			$(this).find('.task-detail').slideToggle('fast');

		});

	});
	//end get template function

}

function loadProjects() {

	var projectItem = $(applicationTemplate).find('#application-project-item').html();

	$.template('projectItemTemplate', projectItem);

	// clear the main
	$('#main').html('<br />');

	var newProjectButton = '<button id="application_create" class="button-submit">New Project</button>';

	$(newProjectButton).appendTo('#main');

	$.ajax({
		url : "xhr/get_projects.php",
		type : "get",
		dataType : "json",
		success : function(response) {

			for (var i = 0, j = response.projects.length; i < j; i++) {
				var projectItemHtml = $.render(response.projects[i], 'projectItemTemplate');
				$('#main').append(projectItemHtml);
			}

		}
	});
}

function loadProjectDetails(projectID) {

	var projectSubmit = $(applicationTemplate).find('#application-project-submit').html();
	var projectDetail = $(applicationTemplate).find('#application-project-detail').html();

	var taskItem = $(applicationTemplate).find('#application-task-item').html();

	$.template('projectSubmitTemplate', projectSubmit);
	$.template('projectDetailTemplate', projectDetail);
	$.template('taskItemTemplate', taskItem);

	// clear the main
	$('#main').html('<br />');

	$.ajax({
		url : "xhr/get_projects.php",
		type : "get",
		dataType : "json",
		data : {
			'projectID' : projectID
		},
		success : function(response) {
			// render the project details view
			var projectSubmitHtml = $.render(response.projects[0], 'projectSubmitTemplate');
			$('#main').append(projectSubmitHtml);

			var projectDetailHtml = $.render(response.projects[0], 'projectDetailTemplate');
			$('#main').append(projectDetailHtml);

			$.ajax({
				url : "xhr/get_tasks.php",
				type : "get",
				dataType : "json",
				data : {
					'projectID' : projectID
				},
				success : function(response) {

					// render all the tasks
					for (var i = 0, j = response.tasks.length; i < j; i++) {
						var taskItemHtml = $.render(response.tasks[i], 'taskItemTemplate');
						$('#main').append(taskItemHtml);
					}

				}
			});

		}
	});

}
