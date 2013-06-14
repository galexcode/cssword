<!DOCTYPE html>
<html>
<head>
<? require_once('Sources/Editor.php'); ?>
<script type="text/javascript">
var editor1;
function onLoad() {
	editor1 = new Editor('editor1');	
}
window.onload=onLoad;
</script>
</head>
<body>
<div id="editor1"></div>
</body>
</html>

