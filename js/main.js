$(document).ready( function () {
	$( ".form-horizontal" ).submit(function( event ) {
		var formJSON = $( this ).serializeArray();
  		console.log(formJSON);
  		event.preventDefault();
  		venue = formJSON[0].value;
  		locatilty = formJSON[1].value;
  		region = formJSON[2].value;

  		placeStr = 'near='+locatilty+','+region;
  		queryStr = '&query='+venue;

  		fsBeginningURL = 'https://api.foursquare.com/v2/venues/search?';

  		fsCompleteURL = fsBeginningURL+placeStr+queryStr+fsEndString;
  		foursquareResponse = httpGet(fsCompleteURL);
  		foursquareResponse = JSON.parse(foursquareResponse);
  		var json = JSON.stringify(foursquareResponse, undefined, 2);
  		highlightedJSON = syntaxHighlight(json);
  		$('#codeBlock').html(highlightedJSON);
	});

	$(".dropdown-menu li a").click(function(){
		var searchTypeSelect = $(this).text();
		if(searchTypeSelect == "Menu") {
      		//configure menu
      } else if (searchTypeSelect == "Photo") {
      		//configure photo
      } else {
      		//configure venue
      }
      $(".btn:first-child").html($(this).text() +' <span class="caret"></span>');
      
      console.log('text' + $(".btn:first-child").text());
      $(".btn:first-child").val($(this).text());
      console.log('val' + $(".btn:first-child").val());

   });
});

function httpGet(theUrl) {
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
   // xmlHttp.withCredentials = true;
    xmlHttp.send();
    return xmlHttp.responseText;
}

function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
