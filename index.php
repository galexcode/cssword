<!DOCTYPE html>
<html lang="en">
<head>
<title>css:Word</title>
<? require_once('Sources/Ace.php'); ?>
<style type="text/css" media="screen">
	.editor-main {
		height: 350px;
	}
</style>
<style id="super-css" type="text/css">
/* Page */
html {
	height: 100%;
}

body {
	height: 100%;
	margin: 0px;
}

/* Toolbar */
.tools {
	padding-top: 16px;	
}

.tools-output {
	color: black;
	font-family: helvetica, calibri, arial;
	font-size: 12px;
	padding-top: 8px;
	padding-left: 3px;
}

</style>
<style id="parent-css" type="text/css">
</style>
<script type="text/javascript">
	var html_editor = null, css_editor = null;

	function saveDocument() {
		/* Get HTML and CSS data */
		var fileName = document.getElementById('file-name').value;
		if (fileName != 'newFile') {
			var html = html_editor.editor.getValue();
			var css = css_editor.editor.getValue();
			var payload = new Payload(html, css);
			File.Save(fileName, payload);
		} else {
			var error = document.createElement('span');
			error.style.color = 'red';
			error.innerHTML = 'Cannot save to default name.';

			var toolsOutput = document.getElementById('tools-output');
			toolsOutput.innerHTML = '';
			toolsOutput.appendChild(error);
		}	
	}

	function openDocument(filename) {
		var filename = filename || document.getElementById('file-name').value || 'newFile';
		File.Open(filename, 
			function(payload) {
				if (payload == null || payload.html == null || payload.css == null) {
					var error = document.createElement('span');
					error.style.color = 'red';
					error.innerHTML = 'Unable to open file.';

					var toolsOutput = document.getElementById('tools-output');
					toolsOutput.innerHTML = '';
					toolsOutput.appendChild(error);
					return false;
				} else {
					/* Set HTML and CSS data */
					html_editor.editor.setValue(payload.html);
					css_editor.editor.setValue(payload.css);

					html_editor.editor.gotoLine(0, 0);
					css_editor.editor.gotoLine(0, 0);
				}
			}
		);	
	}

	window.onload = function() {
		paper = new Paper('paper');
		html_editor = new Editor('html_editor', 'tomorrow_night_eighties', 'html', 'red', paper.setHTML);
		css_editor = new Editor('css_editor', 'tomorrow_night_eighties', 'css', 'blue', paper.setCSS);
		openDocument();
	};
</script>
</head>
<body>
<div id="left-pane" class="pane left max-height">
	<div id="tools" class="tools">
        <form id="file-form" name="file-form">
		<input class="input" type="text" name="file-name" id="file-name" value="newFile" />
		<button class="button" type="button" name="save-file" id="save-file" onClick="saveDocument();">Save File</button>
		<button class="button" type="button" name="open-file" id="open-file" onClick="openDocument();">Open File</button>
		<div id="tools-output" class="tools-output"></div>
        </form>
	</div>
	<!-- HTML Input -->
	<div class="editor-frame">
		<div class="editor-bar top"><span>Test HTML File</span></div>
		<div id="html_editor" class="editor-main"></div>
		<div class="editor-bar bottom status"><span>Opened.</span></div>
	</div>
	<!-- CSS Input -->
	<div class="editor-frame">
		<div class="editor-bar top"><span>Test CSS File</span></div>
		<div id="css_editor" class="editor-main"></div>
		<div class="editor-bar bottom status"><span>Opened.</span></div>
	</div>
	<div style="height:32px"></div>
</div>
<div id="right-pane" class="pane right max-height">
	<div class="paper-frame">
        <div id="paper-frame" class="paper-container">
            <div id="paper" class="paper"></div>
        </div>
    </div>
</div>
</body>
</html>


