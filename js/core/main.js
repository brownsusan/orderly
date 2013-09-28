/* One of my three choices for optional feautres was manage account which the api does not actually support, passwords and usernames can not be edited so I left it implemented and designed but not functioning*/	
	
	var landingTemplate;
	var applicationTemplate;
	var user;
	
	$.ajaxSetup({
	    cache: false
	});
	
	function init() {
	
	    // check if the user is logged in
	    $.ajax({
	        url: "xhr/check_login.php",
	        type: "get",
	        dataType: "json",
	        success: function (response) {
	
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
	    $.get("templates/landing.html", function (template) {
	
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
	            	var errorHtml = '<span class="error-login">Incorrect username or password.</br></span>';
	                $(errorHtml).insertAfter('.header-login');

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
	                        var errorHtml = '<span class="error-login">An error has occured, please try again.</span>';
	                        $(errorHtml).insertAfter('.header-login');
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
	            if (pass.length > 0 && pass.length < 6) {
	                valid = false;
	                // show the user an error
	            }
	            if (confirmPass.length > 0 && confirmPass.length < 6) {
	                valid = false;
	                var errorHtml = '<span class="error-signup">Password must be at least 6 characters long.</br></span>';
	                $(errorHtml).appendTo('.errors');
	                return;
	            }
	
	            if (pass != confirmPass) {
	                valid = false;
	                //Show the user an error
	            }
	
	            if (!valid) {
	            	var errorHtml = '<span class="error-signup">Please fill out the form completely.</br></span>';
	                $(errorHtml).appendTo('.errors');
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
	
	                    }
	
	                    // if the user did not sign up
	                    else {
	                        var errorHtml = '<span class="error-signup">An error has occurred, please try again.</br></span>';
	                        $(errorHtml).appendTo('.errors');
	                    }
	
	                }
	            });
	
	        });
	
	    });
	
	}
	
	// create the application page
	
	function loadApplication() {
	
	    // create all the page elements
	    $.get("templates/app.html", function (template) {
	        applicationTemplate = template;
	
	        var header = $(applicationTemplate).find('#application-header').html();
	
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
	                    if (response.user) {
	                        //
	                    } else {
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
	
	        $(document).on('click', '#application_create_project', function (e) {
	
	            $('.project-create-container').remove();
	
	            //get template
	            var projectCreate = $(applicationTemplate).find('#application-project-create').html();
	
	            //append to the html
	            $('#main').prepend(projectCreate);
	            $('#main').prepend('<br />');
	            //hide the project create button
	            $('#application_create_project').hide();
	
	            setupDatepicker();
	
	            //Add an event listener ot the save button
	            $('.project-create-save').click(function () {
	                console.log('save');
	                //make variables
	                var name = $('.project-create-name').val();
	                var status = $('.project-create-status').val();
	                var description = $('.project-create-description').val();
	                var date = $('.project-create-date').val();
	                var status = $(this).closest('.project-create-container').find('.data-status').val();
	                
	                // validate the variable
	                var valid = true;
	
	                if (name.length == 0) {
	                    valid = false;
	                    //Prepend red text to the project create container
	                    var errorHtml = '<span class="error-title">Please enter a project name.</span>';
	                   $(errorHtml).insertAfter('.project-create-heading');
	                }
	
	                if (!valid) {
	                    return;
	                }
	
	                //ajax request
	                $.ajax({
	                    url: "xhr/new_project.php",
	                    type: "post",
	                    dataType: "json",
	                    data: {
	                        'projectName': name,
	                        'status': status,
	                        'projectDescription': description,
	                        'dueDate': date
	                    },
	                    success: function (response) {
	
	                        console.log(response);
	                        if (response) {
	                            console.log(response);
	                            loadApplication();
	                        } else {
	                            //show an error
	                        }
	
	                    }
	                });
	
	            });
	
	            $('#project_cancel').click(function () {
	                loadApplication();
	            });
	        });
	
	        $(document).on('click', '#application_create_task', function (e) {
	
	            //get template
	            var taskCreate = $(applicationTemplate).find('#application-task-create').html();
	
	            //append to the html
	            $(taskCreate).insertAfter('.task-list-heading');
	            //hide the project create button
	
	            setupDatepicker();
	
	            //Add an event listener ot the save button
	            $('.task-create-save').click(function () {
	                console.log('save');
	                //make variables
	                var projectID = $('.project-detail-container').find('.data-id').val();
	                var name = $('.task-create-name').val();
	                var status = $('.task-create-status').val();
	                var description = $('.task-create-description').val();
	                var date = $('.task-create-date').val();
	                var status = $(this).closest('.task-create-container').find('.data-status').val();
	                //validate variables
	                if (name.length == 0) {
	                    valid = false;
	                    //Prepend red text to the project create container
	                    var errorHtml = '<span class="error-title">Please enter a task name.</span>';
	                   $(errorHtml).insertAfter('.task-create-heading');
	                }
	
	                if (!valid) {
	                    return;
	                }
	
	                //ajax request
	                $.ajax({
	                    url: "xhr/new_task.php",
	                    type: "post",
	                    dataType: "json",
	                    data: {
	                        'projectID': projectID,
	                        'taskName': name,
	                        'status': status,
	                        'taskDescription': description,
	                        'dueDate': date,
	                        'status': status
	                    },
	                    success: function (response) {
	                        if (response) {
	                            console.log(response);
	                            loadProjectDetails(projectID);
	                        } else {
	                            //show an error
	                        }
	
	                    }
	                });
	
	            });
	
	            $('#task_cancel').click(function () {
	                loadApplication();
	            });
	        });
	
	        $(document).on('click', '.project-item', function (e) {
	
	            // stop the delete button from triggering this
	            if ($(e.target).attr('class') == 'project-item-delete') {
	                return;
	            }
	
	            var projectID = $(this).find('.data-id').val();
	
	            loadProjectDetails(projectID);
	
	        });
	
	        $(document).on('click', '.project-item-delete', function (e) {
	
	            var answer = confirm("Are you sure you want to delete this project?");
	
	            if (answer) {
	
	                var projectID = $(this).closest('.project-item').find('.data-id').val();
	
	                $.ajax({
	                    url: "xhr/delete_project.php",
	                    type: "post",
	                    dataType: "json",
	                    data: {
	                        'projectID': projectID
	                    },
	                    success: function (response) {
	
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
	
	        $(document).on('click', '.project-edit', function (e) {
	
	            var projectID = $(this).closest('.project-container').find('.data-id').val();
	
	            console.log(projectID);
	
	            $('.project-detail-container').hide();
	            $('.project-edit-container').show();
	
	        });
	
	        $(document).on('click', '.project-delete', function (e) {
	
	            var answer = confirm("Are you sure you want to delete this project?");
	
	            if (answer) {
	
	                var projectID = $(this).closest('.project-container').find('.data-id').val();
	
	                $.ajax({
	                    url: "xhr/delete_project.php",
	                    type: "post",
	                    dataType: "json",
	                    data: {
	                        'projectID': projectID
	                    },
	                    success: function (response) {
	
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
	
	        $(document).on('click', '.project-edit-save', function (e) {
	
	            var projectContainer = $(this).closest('.project-container');
	            var projectID = projectContainer.find('.data-id').val();
	
	            $('.project-detail-container').show();
	            $('.project-edit-container').hide();
	
	            //make variables
	            var name = projectContainer.find('.project-edit-name').val();
	            var description = projectContainer.find('.project-edit-description').val();
	            var dueDate = projectContainer.find('.project-edit-date').val();
	
	            //validate variables
	            if (name.length == 0) {
	                    valid = false;
	                    //Prepend red text to the project create container
	                    var errorHtml = '<span class="error-title">Please enter a project name.</span>';
	                   $(errorHtml).insertAfter('.project-edit-heading');
	                }
	
	                if (!valid) {
	                    return;
	                }
	
	            //ajax request
	            $.ajax({
	                url: "xhr/update_project.php",
	                type: "post",
	                dataType: "json",
	                data: {
	                    'projectID': projectID,
	                    'projectName': name,
	                    'projectDescription': description,
	                    'dueDate': dueDate
	                },
	                success: function (response) {
	
	                    console.log(response);
	                    if (response.project) {
	                        loadProjectDetails(projectID);
	                    } else {
	                        //show and error
	                    }
	
	                }
	            });
	
	        });
	
	        $(document).on('click', '.task-item', function (e) {
	
	            // stop children elements from triggering this
	            if (e.target !== this) {
	                return;
	            }
	
	            $(this).find('.task-edit').hide();
	            $(this).find('.task-detail').show();
	
	        });
	
	        $(document).on('click', '.task-item-delete', function (e) {
	
	            var _this = this;
	
	            var answer = confirm("Are you sure you want to delete this task?");
	
	            if (answer) {
	
	                var taskID = $(this).closest('.task-item').find('.data-id').val();
	
	                $.ajax({
	                    url: "xhr/delete_task.php",
	                    type: "post",
	                    dataType: "json",
	                    data: {
	                        'taskID': taskID
	                    },
	                    success: function (response) {
	
	                        console.log(response);
	                        if (response.success) {
	                            $(_this).closest('.task-item').slideUp('fast', function () {
	                                $(this).remove();
	                            });
	                        } else {
	                            //show and error
	                        }
	
	                    }
	                });
	
	            }
	
	        });
	
	        $(document).on('click', '.task-item-edit', function (e) {
	
	            $(this).closest('.task-item').find('.task-edit').show();
	            $(this).closest('.task-item').find('.task-detail').hide();
	
	        });
	
	        $(document).on('click', '.task-edit-save', function (e) {
	
	            var taskContainer = $(this).closest('.task-item');
	            var taskID = taskContainer.find('.data-id').val();
	
	            //make variables
	            var name = taskContainer.find('.task-edit-name').val();
	            var description = taskContainer.find('.task-edit-description').val();
	            var dueDate = taskContainer.find('.task-edit-date').val();
	
	            //validate variables
	            if (name.length == 0) {
	                    valid = false;
	                    //Prepend red text to the project create container
	                    var errorHtml = '<span class="error-title">Please enter a task name.</span>';
	                   $(errorHtml).insertAfter('.task-edit-heading');
	                }
	
	                if (!valid) {
	                    return;
	                }
	            //ajax request
	            $.ajax({
	                url: "xhr/update_task.php",
	                type: "post",
	                dataType: "json",
	                data: {
	                    'taskID': taskID,
	                    'taskName': name,
	                    'taskDescription': description,
	                    'dueDate': dueDate
	                },
	                success: function (response) {
	
	                    console.log(response);
	
	                    if (response.task) {
	                        loadProjectDetails(response.task.projectID);
	                    } else {
	                        //show and error
	                    }
	
	                }
	            });
	
	        });
	
	    });
	    //end get template function
	
	    // for tasks create
	    $(document).on('click', '.project-create-container .button-status', function () {
	
	        var status = $(this).find('.status').val();
	
	        $(this).closest('.project-create-container').find('.status:first').removeClass('active urgent delayed done');
	        $(this).closest('.project-create-container').find('.status:first').addClass(status);
	
	        $(this).closest('.project-create-container').find('.data-status').val(status);
	
	    });
	
	    // for projects edits
	    $(document).on('click', '.project-edit-container .button-status, .project-detail-container .button-status', function () {
	
	        var status = $(this).find('.status').val();
	
	        var projectID = $(this).closest('.project-container').find('.data-id').val();
	
	        // for projects
	        $(this).closest('.project-container').find('.status:first').removeClass('active urgent delayed done');
	        $(this).closest('.project-container').find('.status:first').addClass(status);
	
	        console.log(projectID);
	
	        $.ajax({
	            url: "xhr/update_project.php",
	            type: "post",
	            dataType: "json",
	            data: {
	                'projectID': projectID,
	                'status': status
	            },
	            success: function (response) {
	
	            }
	        });
	
	    });
	
	    // for tasks create
	    $(document).on('click', '.task-create-container .button-status', function () {
	
	        var status = $(this).find('.status').val();
	
	        $(this).closest('.task-create-container').find('.status:first').removeClass('active urgent delayed done');
	        $(this).closest('.task-create-container').find('.status:first').addClass(status);
	
	        $(this).closest('.task-create-container').find('.data-status').val(status);
	
	    });
	
	    // for task edits
	    $(document).on('click', '.task-item .button-status', function () {
	
	        var status = $(this).find('.status').val();
	
	        var taskID = $(this).closest('.task-item').find('.data-id').val();
	
	        $(this).closest('.task-item').find('.status:first').removeClass('active urgent delayed done');
	        $(this).closest('.task-item').find('.status:first').addClass(status);
	
	        $.ajax({
	            url: "xhr/update_task.php",
	            type: "post",
	            dataType: "json",
	            data: {
	                'taskID': taskID,
	                'status': status
	            },
	            success: function (response) {
	
	            }
	        });
	
	    });
	
	}
	
	function loadProjects() {
	
	    var projectItem = $(applicationTemplate).find('#application-project-item').html();
	
	    $.template('projectItemTemplate', projectItem);
	
	    // clear the main
	    $('#main').html('<br />');
	
	    var newProjectButton = '<button id="application_create_project">New Project</button>';
	    $(newProjectButton).appendTo('#main');
	
	    $.ajax({
	        url: "xhr/get_projects.php",
	        type: "get",
	        dataType: "json",
	        success: function (response) {
	
	            for (var i = 0, j = response.projects.length; i < j; i++) {
	                var projectItemHtml = $.render(response.projects[i], 'projectItemTemplate');
	                $('#main').append(projectItemHtml);
	            }
	
	        }
	    });
	
	    $('#application_create_project').click(function () {
	        console.log("test");
	    });
	}
	
	function loadProjectDetails(projectID) {
	
	    var projectSubmit = $(applicationTemplate).find('#application-project-edit').html();
	    var projectDetail = $(applicationTemplate).find('#application-project-detail').html();
	
	    var taskItem = $(applicationTemplate).find('#application-task-item').html();
	
	    $.template('projectSubmitTemplate', projectSubmit);
	    $.template('projectDetailTemplate', projectDetail);
	    $.template('taskItemTemplate', taskItem);
	
	    // clear the main
	    $('#main').html('<br />');
	
	    $.ajax({
	        url: "xhr/get_projects.php",
	        type: "get",
	        dataType: "json",
	        data: {
	            'projectID': projectID
	        },
	        success: function (response) {
	            // render the project details view
	            var projectSubmitHtml = $.render(response.projects[0], 'projectSubmitTemplate');
	            $('#main').append(projectSubmitHtml);
	
	            var projectDetailHtml = $.render(response.projects[0], 'projectDetailTemplate');
	            $('#main').append(projectDetailHtml);
	
	            var taskListHeading = '<div class="task-list-heading"><div class="content-spacer"></div><span>Tasks for ' + response.projects[0].projectName + '</span><button id="application_create_task">New Task</button><div class="content-spacer"></div></div>';
	            $(taskListHeading).appendTo('#main');
	
	            $.ajax({
	                url: "xhr/get_tasks.php",
	                type: "get",
	                dataType: "json",
	                data: {
	                    'projectID': projectID
	                },
	                success: function (response) {
	
	                    // render all the tasks
	                    for (var i = 0, j = response.tasks.length; i < j; i++) {
	                        var taskItemHtml = $.render(response.tasks[i], 'taskItemTemplate');
	                        $('#main').append(taskItemHtml);
	                    }
	
	                    setupDatepicker();
	
	                }
	            });
	
	        }
	    });
	
	}
	
	function setupDatepicker() {
	    $('.project-create-date, .project-edit-date, .task-edit-date, .task-create-date').datepicker();
	}