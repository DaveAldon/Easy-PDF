# Easy-PDF

## Instructions
Requires the following dependencies:
```HTML
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.489/pdf.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.489/pdf.worker.js"></script>

<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
```

Then just call:
```Javascript
easyPDF(base64, "Header Title of Dialog");
  ```
to get your PDF shown with some simple controls.

## Development

Currently in order to get it to look a certain way you'll just have to fiddle with it directly with styling or changing the code itself

## Demo
Check it out in action here: https://davealdon.github.io/Easy-PDF/.

## Troubleshooting
Make sure your base64 is properly formatted. If you're not sure, you can dump it into Notepad++ and convert it to a file, or download it by putting it in the decode window here: https://www.base64decode.org/ and if it doesn't have any issues then it will show.
