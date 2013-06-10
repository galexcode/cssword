<?
/*  css:Word
 * 
 *  index.php
 *  @author katzenbaer
 *  
 *  Copyright (C) 2013  Terrence J. Katzenbaer (tkatzenbaer@lytenight.com)
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>css:Word</title>
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

/*button {
	height: 32px;
    border: thin solid #ddd;
    background-color: #fff;
    color: #666;
    font: bold 14px auto Verdana, Arial, Helvetica, sans-serif;
    border-radius: 4px;
}

button:hover {
    border: thin solid #ccc;
}

button:active {
    border: thin solid #bbb;
    box-shadow: 0px 0px 10px #bbb;
}*/

/* Scroll bars */
/*::-webkit-scrollbar {
    width: 16px;
}
 
::-webkit-scrollbar-track {
	background-color: #ccc;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    border-radius: 4px;
}
 
::-webkit-scrollbar-thumb {
	background-color: #fff;
	opacity: 0.5;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
}*/

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

.input {
	/* Some styles are changed dynamically */
	padding: 8px;
	padding-top: 54px;
	
	cursor: pointer;
	font-weight: bold;

	background-color: floralWhite;
	border-left: 8px solid dimGray; 
	color: dimGray;

	min-height: 120px;
	font-family: monospace;

	webkit-touch-callout: none;
	webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.input.active {
	color: black;
}

.input.active.indianRed {
	border-left: 8px solid indianRed; 
}

.input.active.dodgerBlue {
	border-left: 8px solid dodgerBlue;
}

.gist-highlight {
    border-left: 3ex solid #eee;
    position: relative;
}

.gist-highlight pre {
    counter-reset: linenumbers;
}

.gist-highlight pre div:before {
    color: #aaa;
    content: counter(linenumbers);
    counter-increment: linenumbers;
    left: -3ex;
    position: absolute;
    text-align: right;
    width: 2.5ex;
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
<script type="text/javascript" src="Classes/Payload.js"></script>
<script type="text/javascript" src="Classes/Ajax.js"></script>
<script type="text/javascript" src="Classes/Input.js"></script>
<script type="text/javascript" src="Classes/File.js"></script>
<script type="text/javascript">
$ = document; // shortcut
input = null;

function parse() {
	if (input) {
		var oIndex = input.selectedIndex;
		input.select(input.indexOf('css-input'));
		
		/* Apply changes */
		var cssStyle = input.data();
		
		cssStyle = cssStyle.replace(/body \{/g, '.paper {');
		cssStyle = cssStyle.replace(/html \{/g, '.paper-container {');
	
		/* Modify CSS Style */
		$.getElementById('parent-css').innerHTML = cssStyle;
		
		input.select(oIndex);
	}
}

function setPaperData() {
	input.select(input.indexOf('paper-input'));
	
	input.setData($.getElementById('paper-input').innerHTML);	
}

callback = function(intent, inputName) {
	
	if (!input || !inputName) return;
	
	if (intent == input.CallbackIntent.REFRESHED) {
		if (inputName == 'html-input') {
			var htmlData = input.data();
			input.select(input.indexOf('paper-input'), false);
			input.setData(htmlData);
			input.select(input.indexOf('html-input'), false);
			input.refreshAll(false);
		} else if (inputName == 'css-input')
			parse();
		else if (inputName == 'paper-input') {
			var paperData = input.data();
			input.select(input.indexOf('html-input'), false);
			input.setData(paperData);
			input.select(input.indexOf('paper-input'), false);
			input.refreshAll(false);
		}
	} 
	else if (intent == input.CallbackIntent.SELECTED) {
		for (var key = 0; key < input.names.length; key++) {
			if (input.selected == input.names[key]) continue;
			
			if (input.names[key] == 'paper-input') {
				$.getElementById('paper-frame').className = 'paper-container';
				$.getElementById('right-pane').className= 'pane right';
			} else {
				/* Input Box */
				$.getElementById(input.names[key]).className = 'input';

				/* Input Box Header */
				$.getElementById(input.names[key] + '-header').className = 'input-header';
			}
			
			/* Remove blinking cursor */
			input.refreshSpecific(key, false);
		}
		
		if (inputName == 'paper-input') {
			$.getElementById('paper-frame').className = 'paper-container active';
			$.getElementById('right-pane').className = 'pane right active';
		} else if ($.getElementById(inputName)) {
			var themeColor = ['indianRed', 'dodgerBlue'];
			/* Input Box */
			$.getElementById(inputName).className = 'input active ' + themeColor[input.selectedIndex];

			/* Input Box Header */
			$.getElementById(inputName + '-header').className = 'input-header active ' + themeColor[input.selectedIndex];
		}
	}
}

function onKeyDown(e) {
	if (input.selectedIndex == -1) return true;
	
	/* Control Keys */
	switch (e.keyCode) {
		case 8: { /* Backspace */
				if (input.selected() == 'paper-input') {
					if (input.data().substr(input.pos() + input.skip(0, input.pos()) - '<p>'.length, '<p>'.length) == '<p>') { /* If we're in an p tag */
						if (input.data().substr(input.pos() + input.skip(0, input.pos()), '</p>'.length) == '</p>') {
							if (input.move(1))
								if (input.removeData('<p></p>'.length))
									input.refresh();
						}
					} else if (input.data()[input.pos() + input.skip(0, input.pos()) - 1] == '>') { /* We're bumping against a tag */
						/* Do nothing */
					} else /* else just delete the last character. */
						if (input.removeData(1)) input.refresh();
				} else /* Not paper-input */
					if (input.removeData(1)) input.refresh();
			}
			return false;
		case 9: /* Tab */
			if (input.appendData('\t')) input.refresh();
			return false;
		case 13: { /* Enter */
				if (input.selected() == 'paper-input') {
					if (input.data()[input.pos() + input.skip(0, input.pos())] == '\n' ||
						input.data()[input.pos() + input.skip(0, input.pos()) - 1] == '\n') {
						if (input.appendData('\n<p></p>\n')) /* add new p tag */
							if (input.move(-2)) /* enter new p tag */
								input.refresh();
					} else if (input.data().clean().length == input.pos()) {
						if (input.appendData('\n<p></p>')) /* add new p tag */
							if (input.move(-1)) /* enter new p tag */
								input.refresh();
					} else
						if (input.appendData('\n')) input.refresh();
				} else /* Not paper-input */
					if (input.appendData('\n')) input.refresh();
			}
			return false;
		case 32: /* Space */
			if (input.appendData(' ')) input.refresh();
			return false;
		case 33: /* Page Up */
			if (input.seek(0)) input.refresh();
			return false;
		case 34: /* Page Down */
			if (input.seek(input.data().length)) input.refresh();
			return false;
		case 35: { /* End */
				var data = (input.allowsFormatting[input.selectedIndex]) ? input.data().clean() : input.data();
				
				/* Find next line break */
				var nextLineBreak = data.indexOf('\n', input.pos());
				if (nextLineBreak != -1) {
					if (input.move(nextLineBreak - input.pos())) input.refresh();
				} else { /* No more lines */
					if (input.seek(data.length)) input.refresh();
				}
			}
			return false;
		case 36: { /* Home */
				var data = (input.allowsFormatting[input.selectedIndex]) ? input.data().clean() : input.data();
				var reversedPrev = data.substr(0, input.pos()).split("").reverse().join("");
				
				var posFromLeft = reversedPrev.indexOf('\n');
				if  (posFromLeft != -1) { /* Previous line exists */
					if (input.move(-posFromLeft)) input.refresh();
				} else { /* this is the first line */
					if (input.seek(0)) input.refresh();
				}
			}
			return false;
		case 37: /* Left arrow */
			if (input.move(-1)) input.refresh();
			return false;
		case 38: /* Up Arrow */
			var data = (input.allowsFormatting[input.selectedIndex]) ? input.data().clean() : input.data();
			var reversedPrev = data.substr(0, input.pos()).split("").reverse().join("");
			var posFromLeft = reversedPrev.indexOf('\n');
			if  (posFromLeft != -1) { /* Previous line exists */
				var nextLineBreak = reversedPrev.indexOf('\n', posFromLeft);
				if (nextLineBreak == -1) {
					console.log("How did I get here?: '" + reversedPrev.substr(posFromLeft) + "'");
				} else {
					/* Don't position off the line */
					var nextNextLineBreak = reversedPrev.indexOf('\n', nextLineBreak + 1);
					var lineLength = 0;
					if (nextNextLineBreak != -1)
						lineLength = nextNextLineBreak - (nextLineBreak + 1);
					else
						lineLength = reversedPrev.length - (nextLineBreak + 1);
					
					if (lineLength < posFromLeft) posFromLeft = lineLength;
					
					/* Reposition */
					if (input.seek(reversedPrev.length - nextLineBreak - lineLength + posFromLeft - 1)) input.refresh();
				}
			} else { /* else this is the first line */
				console.log('This is the first line.');
				if (input.seek(0)) input.refresh();
			}
			return false;
		case 39: /* Right arrow */
			if (input.move(1)) input.refresh();
			return false;
		case 40: { /* Down Arrow */
				var data = (input.allowsFormatting[input.selectedIndex]) ? input.data().clean() : input.data();
				var reversedPrev = data.substr(0, input.pos()).split("").reverse().join("");
				var posFromLeft = reversedPrev.indexOf('\n');
				if  (posFromLeft == -1) /* this is the first line */
					posFromLeft = input.pos();
				
				/* Find next line break */
				var nextLineBreak = data.indexOf('\n', input.pos());
				if (nextLineBreak != -1) {
					/* Don't jump more than 1 line */
					var nextNextLineBreak = data.indexOf('\n', nextLineBreak + 1);
					var lineLength = 0;
					if (nextNextLineBreak != -1)
						lineLength = nextNextLineBreak - (nextLineBreak + 1);
					else
						lineLength = input.data().length - (nextLineBreak + 1);
					
					if (lineLength < posFromLeft) posFromLeft = lineLength;
					
					/* Reposition */
					if (input.seek(nextLineBreak + 1 + posFromLeft)) input.refresh();
				} else { /* No more lines */
					if (input.seek(data.length)) input.refresh();
				}
			}
			return false;
		case 46: { /* Delete */
				var data = (input.allowsFormatting[input.selectedIndex]) ? input.data().clean() : input.data();
				if (input.pos() < data.length) {
					if (input.move(1))
						if (input.removeData(1)) input.refresh();
				}
			}
			return false;
		/** Paste **/
		case 118: /* v key */
		case 86: /* V key */
			{
				if (e.ctrlKey) {
					console.log('pasting...');
					/* Hack to get clipboard */
					$.getElementById('paste-box').innerHTML = '<textarea id="com.lytenight.css-word.temp.paste-box" style="margin-left: -1000px;"></textarea>';
					$.getElementById('com.lytenight.css-word.temp.paste-box').focus();
					setTimeout(function() {
						var data = $.getElementById('com.lytenight.css-word.temp.paste-box').value;
						$.getElementById('paste-box').innerHTML = '';
						console.log(data);
						
						/* Append text */
						if (input.appendData(data)) input.refresh();
					}, 1);
					break;	
				}
			}
		/** Regular Keys **/
		default: {
				if (input.selected() == 'paper-input') {
					if (input.data()[input.pos() + input.skip(0, input.pos())] == '\n' ||
						input.data()[input.pos() + input.skip(0, input.pos()) - 1] == '\n') { /* if we're on a newline */
						if (input.appendData('\n<p></p>\n')) /* add new p tag */
							if (input.move(-2)) /* enter new p tag */
								input.refresh();
					} else if (input.data().clean().length == input.pos()) {
						if (input.appendData('\n<p></p>')) /* add new p tag */
							if (input.move(-1)) /* enter new p tag */
								input.refresh();
					}
				}
		}
	}
	
	return true;
};

function onKeyPress(e) {
	if (input.selectedIndex == -1) return true;
	
	/* Textual Keys */
	var char;
	
	switch (e.keyCode) {
		default: char = String.fromCharCode(window.event.keyCode);
	}
	
	/* Add if not null */
	if (char) {
		input.appendData(char);
		input.refresh();
	}
};

onResize = function(e) {
	var rules = null;
	/* Resize page to screen window */
	if (document.styleSheets[0].cssRules)
		rules = document.styleSheets[0].cssRules;
	else if (document.styleSheets[0].rules)
		rules = document.styleSheets[0].rules;
	
	var screenHeight = document.body.clientHeight;
	for (var key in rules) {
		if (rules[key].selectorText == '.max-height') {
			rules[key].style.height = screenHeight + 'px';
		}
	}
	
	/* Resize paper to aspect-ratio */
	var paper = $.getElementById('paper-frame');
	
	var paperHeight = screenHeight - 36;
	paper.style.height = paperHeight + 'px';
	
	/* width = (width / height) * actual height */
	var paperWidth = (8.5/11)*(screenHeight - 36);
	paper.style.width = paperWidth + 'px';
	
	console.log('8.5" x 11" : Height: ' + paperHeight + 'px, Width: ' + paperWidth + 'px');
}

function saveDocument() {
	var temp = input.selectedIndex;
	
	/* Get HTML and CSS data */
	input.select(input.indexOf('html-input'), false);
	var html = input.data();
	
	input.select(input.indexOf('css-input'), false);
	var css = input.data();
	
	input.select(temp, false);
	
	var payload = new Payload(html, css);
	File.Save(document.getElementById('file-name').value, payload);
}

function openDocument() {
	File.Open(document.getElementById('file-name').value, 
		function(payload) {
			if (payload == null || payload.html == null || payload.css == null) alert("An error occured while opening the document.");
			
			var temp = input.selectedIndex;
	
			/* Set HTML and CSS data */
			input.select(input.indexOf('html-input'), false);
			var html = input.setData(payload.html);
			
			input.select(input.indexOf('css-input'), false);
			var css = input.setData(payload.css);
			
			input.select(temp, false);
			
			input.refreshAll();
		}
	);	
}

function onLoad() {
	input = new Input(['html-input', 'css-input', 'paper-input'], [false, false, true], callback);
	
	/* Set paper-input to html-input */
	input.setData(input.datas[input.names.indexOf('html-input')]);
	input.select(2, false);
	
	onResize();
	
	var disabledMouseDownDivs = ['paper-frame', 'html-input', 'css-input'];
	for (var i = 0; i < disabledMouseDownDivs; i++) {
		$.getElementById(disabledMouseDownDivs[i]).onmousedown = function(event) {
			event.preventDefault();
			return false;
		}
	}
	
	/* Select html-input */
	input.select(0, true);
	
	input.refreshAll(true);
}

window.onload = onLoad;
window.onkeypress = onKeyPress;
window.onkeydown = onKeyDown;
window.onresize = onResize;
</script>
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
    <div id="html-input-header" class="input-header">&lt;/html&gt;</div>
    <div id="html-input" class="input" onClick="input.select(0)"><div class="center"><h1>Page Title</h1></div>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus erat diam, molestie ut euismod ut, convallis vitae augue. Duis nulla dolor, gravida ac luctus in, malesuada sed diam.</p>
<p>Proin porta iaculis dui, in fermentum lectus laoreet vel. Fusce a tincidunt justo. Vestibulum imperdiet sapien magna. Duis porttitor velit nec mauris convallis convallis. Sed blandit lectus in turpis molestie, ac ultricies enim mollis. Donec quis urna scelerisque, adipiscing sapien in, consequat leo. Suspendisse faucibus augue quam, eget tempus augue interdum non. Donec dignissim urna neque, malesuada suscipit lectus gravida in.</p></div>
	<p></p>
    <div id="css-input-header" class="input-header">&lt;/css&gt;</div>
    <div id="css-input" class="input" onClick="input.select(1)">html {
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
}</div>
	<div style="height:32px"></div>
    <div id="paste-box"></div>
</div>
<div id="right-pane" class="pane right max-height">
	<div class="paper-frame">
        <div id="paper-frame" class="paper-container" onClick="input.select(2);">
            <div id="paper-input" class="paper"></div>
        </div>
    </div>
</div>
</body>
</html>
