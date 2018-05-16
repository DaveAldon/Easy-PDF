function easyPDF(base64, title) {

    var dialog = '<div id="pdfDialog" title="'+title+'">'+
              			'<label>Page: </label><label id="pageNum"></label>'+
              			'<canvas id="pdfview"></canvas>'+
              		'</div>';
    $(document.body).append(dialog);
    var canvas = document.getElementById('pdfview');

		var w = $(window).width() / 2;
		var page = 1;
		$( "#pdfDialog" ).dialog({
			open: function (event, ui) {
				$(this).before($(this).parent().find('.ui-dialog-buttonpane'));
			},
			width: w,
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
	                	RenderPDF(base64,canvas, -1)
	                },
	                text: 'Back Page',
	            },
	            "Next": {
	                click: function () {
	                	RenderPDF(base64,canvas, 1)
	                },
	                text: 'Next Page',
	            },
	            "Confirm": {
	                click: function () {
	                	$('#pdfDialog').hide()
	                	$('#pdfview').hide()
	                    $(this).dialog("close");
	                },
	                text: 'Close',
	            },
	        }
		});
		$('#pageNum').text("1")
	    RenderPDF(base64,canvas, 0)
	    $('#pdfDialog').show()
	    $('#pdfview').show()

      function RenderPDF(_base64, element, pageNumber) {
        console.log()
	//base64 = //$('#OriginalHL7').html()

	//base64 = base64.split('^PDF^^base64^')[1] + "";
	//console.log(base64)

	var pdfData = atob(_base64);
	pdfjsLib.disableWorker = true;

	// Get current global page number, defaults to 1
	displayNum = parseInt($('#pageNum').html())
	pageNumber = parseInt(pageNumber)
	var loadingTask = pdfjsLib.getDocument({data: pdfData});
	loadingTask.promise.then(function(pdf) {
		// Gets total page length of pdf
		size = pdf.numPages
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
		if(pageNumber > size || pageNumber < 1) {
			throw "bad page number";
		}
		// Changes the cheeky global to our valid new page number
		$('#pageNum').text(pageNumber)
		pdf.getPage(pageNumber).then(function(page) {
			var scale = 2.0;
			var viewport = page.getViewport(scale);
			var canvas = element;
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
