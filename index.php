<!DOCTYPE html>
<html lang="en">
<head>
<title>Ace in Action</title>
<? require_once('Sources/Ace.php'); ?>
<style type="text/css" media="screen">
	body {
		padding: 8px;
	}

	#editor1 {
		/*position: absolute;*/
		/*top: 0;
		right: 0;
		bottom: 0;
		left: 0;*/
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
</head>
<body>
<h1>Editor</h1>
<div class="editor-frame">
	<div class="editor-bar top"><span>Test File</span></div>
	<div class="editor-main">
		<div id="editor1">int main() {
	printf("Sup");
}</div>
	</div>
	<div class="editor-bar bottom status"><span>Opened.</span></div>
</div>
<script>
	var editor1 = ace.edit("editor1");
	editor1.setTheme("ace/theme/tomorrow");
	editor1.getSession().setMode("ace/mode/c_cpp");
	editor1.getSession().on('change', function(e) {
		console.log(editor1.getValue());
	});
</script>
</body>
</html>


