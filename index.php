<!DOCTYPE html>
<html lang="en">
<head>
<title>Ace in Action</title>
<? require_once('Sources/Ace.php'); ?>
<style type="text/css" media="screen">
	#editor1 {
		width: 100%;
		height: 100%;
	}
	#editor2 {
		width: 100%;
		height: 100%;
	}
	.editor-frame {
		width: 750px;
	}
	.editor-main {
		height: 164px;
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

/* Inputs/TextFields */
textarea, input {
	height: 28px;
	border: thin solid #ddd;
    border-radius: 2px;
    background-color: #fff;
    color: #444;
    font: normal 16px auto Verdana, Arial, Helvetica, sans-serif;
	padding-left: 8px;
}

textarea:disabled, input:disabled, textarea[readonly="readonly"], input[readonly="readonly"] {
    background-color:#eee;
}

textarea:hover, input:hover {
	border: thin solid #ccc;
}

textarea:focus , input:focus {
	outline: none;
	border: thin solid #9ecaed;
	box-shadow: 0px 0px 10px #9ecaed;
}

/* .button */
button {
	cursor: pointer;
border:1px solid #7d99ca; -webkit-border-radius: 3px; -moz-border-radius: 3px;border-radius: 3px;font-size:12px;font-family:arial, helvetica, sans-serif; padding: 10px 10px 10px 10px; text-decoration:none; display:inline-block;text-shadow: -1px -1px 0 rgba(0,0,0,0.3);font-weight:bold; color: #FFFFFF;
 background-color: #a5b8da; background-image: -webkit-gradient(linear, left top, left bottom, from(#a5b8da), to(#7089b3));
 background-image: -webkit-linear-gradient(top, #a5b8da, #7089b3);
 background-image: -moz-linear-gradient(top, #a5b8da, #7089b3);
 background-image: -ms-linear-gradient(top, #a5b8da, #7089b3);
 background-image: -o-linear-gradient(top, #a5b8da, #7089b3);
 background-image: linear-gradient(to bottom, #a5b8da, #7089b3);filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#a5b8da, endColorstr=#7089b3);
}

button:hover{
 border:1px solid #5d7fbc;
 background-color: #819bcb; background-image: -webkit-gradient(linear, left top, left bottom, from(#819bcb), to(#536f9d));
 background-image: -webkit-linear-gradient(top, #819bcb, #536f9d);
 background-image: -moz-linear-gradient(top, #819bcb, #536f9d);
 background-image: -ms-linear-gradient(top, #819bcb, #536f9d);
 background-image: -o-linear-gradient(top, #819bcb, #536f9d);
 background-image: linear-gradient(to bottom, #819bcb, #536f9d);filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#819bcb, endColorstr=#536f9d);
}

/* Window Class */
.max-height {
}

/* Input Boxes */
.input-header {
	margin-top: 18px;
	margin-bottom: -54px;
	
	text-align: right;
	font: Arial, Helvetica, sans-serif;
	font-size: 48px;
	font-weight: bold;
	color: gainsboro;
	opacity:0.4;
}

.input-header.active {
	
}

.input-header.active.indianRed {
	color: indianRed;
}

.input-header.active.dodgerBlue {
	color: dodgerBlue;
}

/* Panes */
.pane {
	/*width: 50%;	
	display: inline;*/
	padding-left: 12px;
	padding-right: 12px;
}

.pane.left {
	width: 40%;
	float: left;
	
	padding: 0px 24px 0 24px 0;
	
	overflow-y: scroll;
	
	/* Style */
	/*background-color: darkGray;*/
	background-color: white;
}

.pane.right {
	overflow: hidden;
	height: 100%;
	
	/* Style */
	background-color: #222;
}

.pane.right.active {
	background-color: #333;	
}

/* Paper (WYSIWYG) */
.paper-frame {
	width: 100%;
	height: 100%;
	
	text-align: center;
}

.paper-container {
	background-color: #fff;
	margin: 0 auto;
	
	margin-top: 16px;
	box-shadow: 0 4px 4px #000;
	
	cursor: pointer;
}

.paper-container.active {
	box-shadow: 0 4px 4px #555;
}

.paper {
	/* Style */
	text-align: left;
	padding: 8px;
}

/* Toolbar */
.tools {
	padding-top: 32px;	
}

</style>
<style id="parent-css" type="text/css">
</style>
</head>
<body>
<div id="left-pane" class="pane left max-height">
	<div id="tools" class="tools">
        <form id="file-form" name="file-form">
          	<label for="file-name"></label>
          	<input type="text" name="file-name" id="file-name" onFocus="input.select(-1);" onBlur="input.getHealthy();" value="newFile" />
          	<button type="button" name="save-file" id="save-file" onClick="saveDocument();">Save File</button>
        	<button type="button" name="open-file" id="open-file" onClick="openDocument();">Open File</button>
            <span id="tools-output"></span>
        </form>
	</div>
	<!-- HTML Input -->
	<div class="editor-frame">
		<div class="editor-bar top"><span>Test HTML File</span></div>
		<div class="editor-main">
			<div id="editor1">&lt;div class="center"&gt;&lt;h1&gt;Page Title&lt;/h1&gt;&lt;/div&gt;
	&lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus erat diam, molestie ut euismod ut, convallis vitae augue. Duis nulla dolor, gravida ac luctus in, malesuada sed diam.&lt;/p&gt;
	&lt;p&gt;Proin porta iaculis dui, in fermentum lectus laoreet vel. Fusce a tincidunt justo. Vestibulum imperdiet sapien magna. Duis porttitor velit nec mauris convallis convallis. Sed blandit lectus in turpis molestie, ac ultricies enim mollis. Donec quis urna scelerisque, adipiscing sapien in, consequat leo. Suspendisse faucibus augue quam, eget tempus augue interdum non. Donec dignissim urna neque, malesuada suscipit lectus gravida in.&lt;/p&gt;
			</div>
			<script>
				var editor1 = ace.edit("editor1");
				editor1.setTheme("ace/theme/tomorrow");
				editor1.getSession().setMode("ace/mode/html");
				editor1.getSession().on('change', function(e) {
					console.log(editor1.getValue());
				});
			</script>
		</div>
		<div class="editor-bar bottom status"><span>Opened.</span></div>
	</div>
	<!-- CSS Input -->
	<div class="editor-frame">
		<div class="editor-bar top"><span>Test CSS File</span></div>
		<div class="editor-main">
			<div id="editor2">html {
	background-color: white;    
}
    
body {
    font-family: Arial, Helvetica, sans-serif;
	margin: 16px;  
	font-size: 14px;
}

p:first-line {
	margin-left: 4px;
}

.center {
	text-align: center;
}
			</div>
			<script>
				var editor2 = ace.edit("editor2");
				editor2.setTheme("ace/theme/tomorrow");
				editor2.getSession().setMode("ace/mode/css");
				editor2.getSession().on('change', function(e) {
					console.log(editor2.getValue());
				});
			</script>
		</div>
		<div class="editor-bar bottom status"><span>Opened.</span></div>
	</div>
	<div style="height:32px"></div>
</div>
<div id="right-pane" class="pane right max-height">
	<div class="paper-frame">
        <div id="paper-frame" class="paper-container">
            <div id="paper-input" class="paper"></div>
        </div>
    </div>
</div>
</body>
</html>


