function saveThisLink(){

if(isEmpty(document.getElementById('linkBox').value)){
	$.pnotify({
            title: 'Link Cloner',
            text: 'No Link found to clone.',
            type: 'info'
        });
	return;
}

$('.progressContainer').show();
var urlToDownload= document.getElementById('linkBox').value;
var filenameToDownload=urlToDownload.split('/');
filenameToDownload = filenameToDownload[filenameToDownload.length - 1];

var options = {
    files: [
        {'url': urlToDownload, 'filename':filenameToDownload}
    ],

    // Success is called once all files have been successfully added to the user's
    // Dropbox, although they may not have synced to the user's devices yet.
    success: function () {
    	window.location.reload(true); 
    },

    // Progress is called periodically to update the application on the progress
    // of the user's downloads. The value passed to this callback is a float
    // between 0 and 1. The progress callback is guaranteed to be called at least
    // once with the value 1.
    progress: function (progress) {
    	$('.dial').val(Math.round(progress * 100)).trigger('change');
    },

    // Cancel is called if the user presses the Cancel button or closes the Saver.
    cancel: function () {
    	$('.progressContainer').hide();
    },

    // Error is called in the event of an unexpected response from the server
    // hosting the files, such as not being able to find a file. This callback is
    // also called if there is an error on Dropbox or if the user is over quota.
    error: function (errorMessage) {
        $.pnotify({
            title: 'Link Cloner',
            text: errorMessage,
            type: 'error'
        });
    	//alert(errorMessage);
    	$('.progressContainer').hide();
    }
};

	Dropbox.save(options);
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}