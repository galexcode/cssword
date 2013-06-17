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
	var paper = null;
	var tools = null, html_editor = null, css_editor = null;

	window.onload = function() {
		paper = new Paper('paper');

		tools = new Tools('tools');
		html_editor = new Editor('html_editor', 'tomorrow_night_eighties', 'html', 'red', paper.setHTML);
		css_editor = new Editor('css_editor', 'tomorrow_night_eighties', 'css', 'blue', paper.setCSS);
	};

	window.onpopstate = function(e) {
		if (e.state && e.state.file) { /* State object exists */
			console.log('State object exists! Loading', e.state.file);
			tools.openDocument(e.state.file, false);
			tools.setFilename(e.state.file);
		} else {
			console.log('No state object exists...');

			var defaultName = '<? echo trim($_GET['file']); ?>';
			tools.openDocument(defaultName, false);
		}
	};
</script>
</head>
<body>
<div id="left-pane" class="pane left max-height">
	<div id="tools" class="tools">
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


