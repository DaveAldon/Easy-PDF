function easyPDF(_base64, _title) {
	// HTML definition of dialog elements
	var dialog = '<div id="pdfDialog" title="'+_title+'">'+
            			'<label>Page: </label><label id="pageNum"></label><label> of </label><label id="pageLength"></label>'+
            			'<canvas id="pdfview"></canvas>'+
            		'</div>';
	$("div[id=pdfDialog]").remove();
	$(document.body).append(dialog);

  // We need the javascript object of the canvas, not the jQuery reference
  var canvas = document.getElementById('pdfview');
  // Init page count
	var page = 1;
  // Dialog definition
	$( "#pdfDialog" ).dialog({
    // Moves controls to top of dialog
		open: function (event, ui) {
			$(this).before($(this).parent().find('.ui-dialog-buttonpane'));
		},
		width: ($(window).width() / 2),
    modal: true,
    position: {
  		my: "top",
    	at: "top",
    	of: window,
    	collision: "none"
    },
    buttons: {
    	"Back": {
        click: function () {
        	RenderPDF(-1)
        },
        text: 'Previous',
      },
      "Next": {
        click: function () {
        	RenderPDF(1)
        },
        text: 'Next',
      },
      "Confirm": {
        click: function () {
          $(this).dialog("close");
          $("#pdfDialog").remove()
        },
        text: 'Close',
      }
    }
	});

  // Init page number and the document
	$('#pageNum').text(page);
  RenderPDF(0);

  // PDF.js control
  function RenderPDF(pageNumber) {
  	var pdfData = atob(_base64);
  	pdfjsLib.disableWorker = true;

  	// Get current global page number, defaults to 1
  	displayNum = parseInt($('#pageNum').html())
  	pageNumber = parseInt(pageNumber)

  	var loadingTask = pdfjsLib.getDocument({data: pdfData});
  	loadingTask.promise.then(function(pdf) {
  		// Gets total page length of pdf
  		size = pdf.numPages;
  		$('#pageLength').text(size);
  		// Handling for changing pages
  		if(pageNumber == 1) {
  			pageNumber = displayNum + 1;
  		}
  		if(pageNumber == -1) {
  			pageNumber = displayNum - 1;
  		}
  		if(pageNumber == 0) {
  			pageNumber = 1;
  		}
      // If the requested page is outside the document bounds
  		if(pageNumber > size || pageNumber < 1) {
  			throw "bad page number";
  		}
  		// Changes the cheeky global to our valid new page number
  		$('#pageNum').text(pageNumber)
  		pdf.getPage(pageNumber).then(function(page) {
  			var scale = 2.0;
  			var viewport = page.getViewport(scale);
  			var context = canvas.getContext('2d');
  			canvas.height = viewport.height;
  			canvas.width = viewport.width;
  			var renderContext = {
  			  canvasContext: context,
  			  viewport: viewport
  			};
  			page.render(renderContext);
  		});
  	}).catch(e => {});
  }
}
