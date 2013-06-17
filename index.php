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
			var payload = new Payload(fileName, html, css);
			File.Save(payload);
		} else {
			var error = document.createElement('span');
			error.style.color = 'red';
			error.innerHTML = 'Cannot save to default name.';

			var toolsOutput = document.getElementById('tools-output');
			toolsOutput.innerHTML = '';
			toolsOutput.appendChild(error);
		}	
	}

	function openDocument(filename, pushState) {
		var filename = filename || document.getElementById('file-name').value || 'newFile';
		/* Push the state so we can backtrack */
		if (pushState != false) {
			window.history.pushState({'file':filename}, '', '?file=' + filename);
		}

		/* Call File.js API */
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

					/* Go to beginning */
					html_editor.editor.gotoLine(0, 0);
					css_editor.editor.gotoLine(0, 0);

					/* Set titles */
					html_editor.setTitle(payload.name + '<span style="color: indianRed">:html</span>');
					css_editor.setTitle(payload.name + '<span style="color: dodgerBlue">:css</span>');

					/* Focus HTML Editor */
					html_editor.editor.focus();
				}
			}
		);	
	}

	window.onpopstate = function(e) {
		if (e.state && e.state.file) { /* State object exists */
			console.log('State object exists! Loading', e.state.file);
			openDocument(e.state.file, false);
			document.getElementById('file-name').value = e.state.file;
		} else {
			console.log('No state object exists...');

			paper = new Paper('paper');
			html_editor = new Editor('html_editor', 'tomorrow_night_eighties', 'html', 'red', paper.setHTML);
			css_editor = new Editor('css_editor', 'tomorrow_night_eighties', 'css', 'blue', paper.setCSS);
			var defaultName = '<? echo trim($_GET['file']); ?>';
			openDocument(defaultName, false);
		}
	};
</script>
</head>
<body>
<div id="left-pane" class="pane left max-height">
	<div id="tools" class="tools">
        <form id="file-form" name="file-form">
		<input class="input" type="text" name="file-name" id="file-name" value="" />
		<button class="button" type="button" name="save-file" id="save-file" onClick="saveDocument();">Save File</button>
		<button class="button" type="button" name="open-file" id="open-file" onClick="openDocument();">Open File</button>
		<div id="tools-output" class="tools-output"></div>
        </form>
	</div>
	<!-- HTML Input -->
	<div class="editor-frame">
		<div id="html_editor-title" class="editor-bar top">Test HTML File</div>
		<div id="html_editor" class="editor-main"></div>
		<div class="editor-bar bottom status">Opened.</div>
	</div>
	<!-- CSS Input -->
	<div class="editor-frame">
		<div id="css_editor-title" class="editor-bar top">Test CSS File</div>
		<div id="css_editor" class="editor-main"></div>
		<div class="editor-bar bottom status">Opened.</div>
	</div>
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


