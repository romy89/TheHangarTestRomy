$(window).load(function() {

		function _localStorageRememberData(state) {
             
              if (state == 'true') {
                $('#mailUser').val(localStorage.getItem("mailUser"));
                $('#passUser').val(localStorage.getItem("passUser"));
                $('#remember').attr('disabled',false);
				$('#send').attr('disabled',false);
				$('#emailContent').addClass('valid');
				$('#passContent').addClass('valid');
                
            } 
          }
		if(window.localStorage) {
              _localStorageRememberData(localStorage.getItem("flag"));
            }
		

	

});
