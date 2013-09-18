$(document).ready(function () {

	//Check login
    var init = function () {
        $.ajax({
            url: "xhr/check_login.php",
            type: "get",
            dataType: "json",
            success: function (response) {
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
    
    function loadLanding(){
	    
	    console.log("The landing page will be loaded here");
	    
	    // creat all the page elements
	    
	    // add the events to the elements
	    
	    $('#someID').click(function(){
		    
	    });
	    
    }
    
    function loadApplication(){
	    
	    console.log("The application will be loaded here");
	    
    }
    
});