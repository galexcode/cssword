<?
/*  css:Word
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
<title>css-word</title>
<style id="super-css" type="text/css">
/* Page */
html {
	height: 100%;
}

body {
	height: 100%;
	margin: 0px;
}

/* Scroll bars */
::-webkit-scrollbar {
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
.input {
	/* Some styles are changed dynamically */
	padding: 8px;
	padding-top: 54px;
	
	cursor: pointer;
	font-weight: bold;
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
	
	padding-right: 24px;
	
	overflow-y: scroll;
	
	/* Style */
	background-color: darkGray;
}

.pane.right {
	overflow: hidden;
	
	/* Style */
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

.paper {
	/* Style */
	text-align: left;
	padding: 8px;
}

</style>
<style id="parent-css" type="text/css">
</style>
<script type="text/javascript">
/* Input Object */
function Input (inputs, formatting, callback) {
	if (inputs.length != formatting.length) {
		console.log("A formatting must be specified for every input.");
		return null;
	}
	
	this.names = [];
	for (var i = 0; i < inputs.length; i++) {
		this.names.push(inputs[i]);
	}
	
	this.datas = [];
	this.datasPos = []; /* The offset position in the data. When formatting is allowed, this is the position after performing a clean on the data. */
	this.allowsFormatting = [];
	for (var i = 0; i < inputs.length; i++) {
		this.allowsFormatting.push(formatting[i]);
	}
	
	this.callback = callback;
	
	this.selectedIndex = 0;
	
	this.CallbackIntent = {
		SELECTED : 0,
		REFRESHED : 1,
	};
	
	EscapeString = {
		SPACE : '{com.lytenight.css-word.space}',
		LT : '<',
		GT : '>',
		TAB : '\t',
		NEWLINE : '\n', /* Has to be last, so '<br>' doesn't get overwritten by '&lt;' and '&gt;' */
	};
	
	EscapeEquivalent = {
		SPACE : ' ',
		LT : '&lt;',
		GT : '&gt;',
		TAB : '&nbsp;&nbsp;&nbsp;&nbsp;',
		NEWLINE : '<br>',
	};
	
	this._isBlinking = false;
	
	/* String.safewrap(wrapper);
	 * Wraps a 'wrapper' around the string.
	 * The string is inserted wherever a $0 is present.
	 * Spaces in the wrapper will be replaced with an escaped space.
	 */
	String.prototype.safewrap = function(wrapper) {
		return wrapper.replace(/\s/g, EscapeString.SPACE).replace(/\$0/g, this);
	};
	
	/* String.equivalent();
	 * Creates and returns a new string made from replacing all escapes with their equivalent.
	 */
	String.prototype.equivalent = function() {
		var str = this;
		for (var key in EscapeString) {
			str = str.replace(new RegExp(EscapeString[key], 'g'), EscapeEquivalent[key]);
		}
		return str;
	};
	
	/* String.elength();
	 * Returns the length of a string undergone the equivalent transformation.
	 */
	String.prototype.elength = function() {
		return String.prototype.equivalent.call(this).length;
	};
	
	/* String.ediff();
	 * Returns the increase in length due to an equivalent transformation.
	 */
	String.prototype.ediff = function() {
		return Number(String.prototype.elength.call(this)) - this.length;
	};
	
	/* String.clean();
	 * Creates and returns a new string made from stripping all HTML tags.
	 */
	String.prototype.clean = function() {
		var str = this;
		//str = str.replace(/(<([^>]+)>)/ig,'');
		//str = str.replace(new RegExp('(<[^>]+>\n*<[^>]+>)', "ig"), ''); /* Add in spaces where text can potentially go. */
		str = str.replace(new RegExp('(<([^>]+)>)', "ig"), ' '); /* Completely remove remaining tags. */
		
		/*var matches = this.match(new RegExp('<[^>]+>', "ig"));
		
		if (matches) {
			var matchCount = matches.length;
			for (var i = 0; i < matchCount; i++)
				str += ' ';
		}*/
		
		return str;
	};
	
	/* String.clength();
	 * Returns the length of a string undergone the clean transformation.
	 */
	String.prototype.clength = function() {
		return String.prototype.clean.call(this).length;
	};
	
	/* String.cdiff();
	 * Returns the increase in length due to an clean transformation.
	 */
	String.prototype.cdiff = function() {
		return Number(String.prototype.clength.call(this)) - this.length;
	};
	
	/** Functions **/
	this.count = function() {
		return this.names.length;
	};
	this.pos = function() {
		return this.datasPos[this.selectedIndex];	
	}
	
	/** Changing input **/
	/* selectInput(inputIndex, shouldNotify = true); */
	this.select = function(i, shouldNotify) {
		if (shouldNotify == null) shouldNotify = true;
		
		this.selectedIndex = i;
		
		/* Callback */
		if (shouldNotify)
			this.invokeCallback(this.CallbackIntent.SELECTED, i);
	};
	
	/* selectedInput(); */
	this.selected = function() {
		return this.names[this.selectedIndex];
	};
	
	this.indexOf = function(name) {
		return this.names.indexOf(name);
	};
	
	/* Changing data */
	/* data(); */
	this.data = function() {
		return this.datas[this.selectedIndex];	
	};
	
	/* setData(d); */
	this.setData = function(d) {
		if (this.allowsFormatting[this.selectedIndex]) {
			//d = d.replace(/([^\s])</g, '$1 <')
		}
		this.datas[this.selectedIndex] = d;
		this.datasPos[this.selectedIndex] = (this.allowsFormatting[this.selectedIndex]) ? d.clean().length : d.length;
	};
	
	/* appendData(d); */
	this.appendData = function(d) {
		var pos = this.pos() + this.skip(0, this.pos());
		
		this.datas[this.selectedIndex] = this.data().substr(0, pos) + d + this.data().substr(pos);
		
		this.datasPos[this.selectedIndex] += (this.allowsFormatting[this.selectedIndex]) ? d.clean().length : d.length;
		
		return true;
	};
	
	/* removeData(i); */
	this.removeData = function(i) {
		if (this.datas[this.selectedIndex].length < i)
			i = this.datas[this.selectedIndex].length;
		
		if (this.pos() == 0)
			return false;
			
		var pos = this.pos() + this.skip(0, this.pos());
			
		this.datas[this.selectedIndex] = this.data().substr(0, pos - i) + this.data().substr(pos);
		this.datasPos[this.selectedIndex] -= i;
		
		return true;
	};
	
	/** Navigating the data **/
	/* skip(base, offset); 
	 * Returns the number of characters belong to a tag when progressing 'i' characters either forward or backward.
	 */
	this.skip = function(base, offset) {
			if (!this.allowsFormatting[this.selectedIndex]) return 0;
			if (offset < 0) return 0;
			
			var skip = 0;
			var i = 0;
			while (base + skip < this.data().length && base < offset) {
				if (this.data()[base + skip + i] == '<') {
					i = 1;
					
					while(this.data()[base + skip + i++] != '>'); /* loop until the tag is closed */
					
					skip += i - 1;
					i = 0;
				} else
					base++;
			}
			
			if (this.data()[base + skip] == '>')
				skip--;
			
			/*if (this.data()[base + skip] == '<')
				return this.skip(base, offset + 1);
			else*/
				return skip;
	}
	
	/* move(i); */
	this.move = function(i) {
		var data = null;
		
		/* Formatting Allowed */
		if (this.allowsFormatting[this.selectedIndex])
			data = this.data().clean();
		else
			data = this.data();
		
		/* Boundary checking */
		if (this.pos() + i < 0)
			i = 0 - this.pos();
		else if (this.pos() + i > data.length)
			i = data.length - this.pos();
			
		if (i == 0) return false;
		
		/* If there's a tag ahead of us and we're moving one space, let's make some space */
		if (this.allowsFormatting[this.selectedIndex]) {
			if (i == 1 && this.data()[this.pos() + 1] == '<') {
				var data = this.data().substr(0, this.pos() + 1) + ' ' + this.data().substr(this.pos() + 1);
				this.setData(data);
			}
		}
		
		this.datasPos[this.selectedIndex] += i;
		return true;
	};
	
	/* seek(i); */
	this.seek = function(i) {
		var diff = i - this.pos();
		
		return this.move(diff);
	};
	
	/** Propagating data changes **/
	/* refreshSpecificInput(inputIndex, shouldNotify = true); */
	this.refreshSpecific = function(i, shouldNotify) {
		if (shouldNotify == null) shouldNotify = true;
		
		var hiddenSpace = '';
		
		var data = this.datas[i];
		var dataLength = data.length;
		var pos = this.datasPos[i] + data.substr(0, this.datasPos[i]).ediff();
		
		if (this.allowsFormatting[i]) {
			 dataLength = data.clean().length;
			 pos = this.datasPos[i] + this.skip(0, this.datasPos[i]);
		} else
			data = data.equivalent();
		
		/* hiddenSpace inserted at current location */
		if (this.selectedIndex == i) {
			if (this.datasPos[i] >= dataLength || data[pos] == '\n' || data[pos] == '<') {
				hiddenSpace = '&nbsp;';
				data = data.substr(0, pos) + hiddenSpace + data.substr(pos);
			}
		
			var cursorLen = 1;
			
			if (hiddenSpace != '') cursorLen = hiddenSpace.length;
			else if (data[pos]) cursorLen += (this.allowsFormatting[i]) ? this.datas[i].clean()[this.datasPos[i]].cdiff() : this.datas[i][this.datasPos[i]].ediff();
		
			if (!this._isBlinking)
				data = data.substr(0, pos) + data.substr(pos, cursorLen).safewrap('<span style="margin-left: -2px; margin-right: -2px; padding-left: 2px; padding-right: 2px; background-color: lightBlue;">$0</span>') + data.substr(pos + cursorLen);
			/*else if (hiddenSpace data[pos] == '\n' || data[pos] == '>')
				data = data.substr(0, pos) + ' ' + data.substr(pos);*/
		}
			
		document.getElementById(this.names[i]).innerHTML = data.replace(new RegExp(EscapeString.SPACE, 'g'), ' ');
		
		/* Callback */
		if (shouldNotify) {
			this.invokeCallback(this.CallbackIntent.REFRESHED, i);
		}
	};
	
	/* refresh(shouldNotify = true); */
	this.refresh = function(shouldNotify) {
		if (shouldNotify == null) shouldNotify = true;
		
		this.refreshSpecific(this.selectedIndex, shouldNotify);
	};
	
	/* refreshAllInputs(shouldNotify = true); */
	this.refreshAll = function(shouldNotify) {
		if (shouldNotify == null) shouldNotify = true;
		
		for (var i = 0; i < this.names.length; i++)
			this.refreshSpecific(i, shouldNotify);	
	};
	
	/** Callbacks **/
	/* setCallback(func);
	 * Callbacks must conform to callback(Input.CallbackIntent, String inputName);
	 */
	this.setCallback = function(func) {
		this.callback = func;
	};
	
	/* invokeCallback(intent, i); */
	this.invokeCallback = function(intent, i) {
		if (this.callback)
			this.callback(intent, this.names[i]);
	};
	
	/** Initialize **/
	for (var i = 0; i < this.count(); i++) {
		if (document.getElementById(this.names[i]) == null) {
			alert("Input Object created prematurely. Input elements are null.");
			break;
		}
		
		this.select(i);
		this.setData(String(document.getElementById(this.names[i]).innerHTML.replace('    ', '\t')));
	}
	
	/* Blinker */
	blinker = function (callback) {
		callback._isBlinking = !callback._isBlinking;
		callback.refresh(false);
	}
	setInterval(blinker, 500, this);
}

$ = document; // shortcut
input = null;

function parse() {
	if (input) {
		var oIndex = input.selectedIndex;
		input.select(input.indexOf('css-input'));
		
		/* Apply changes */
		var cssStyle = input.data();
		
		cssStyle = cssStyle.replace(/body \{/g, '.paper {');
	
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
		for (var key in input.names) {
			if (input.selected == input.names[key]) continue;
			
			if (input.names[key] == 'paper-input') {
				$.getElementById(input.names[key]).style.opacity = 0.6;
			} else {
				/* Input Box */
				$.getElementById(input.names[key]).style.color = 'dimGray';
				$.getElementById(input.names[key]).style.backgroundColor = 'floralWhite';
				$.getElementById(input.names[key]).style.borderLeft = '8px solid gainsboro';
				
				/* Input Box Header */
				$.getElementById(input.names[key] + '-header').style.color = 'gainsboro';
			}
			
			/* Remove blinking cursor */
			input.refreshSpecific(key, false);
		}
		
		if (inputName == 'paper-input') {
			$.getElementById(inputName).style.opacity = 1.0;
		} else {
			var themeColor = ['indianRed', 'dodgerBlue'];
			
			$.getElementById(inputName).style.color = 'black';
			$.getElementById(inputName).style.borderLeft = '8px solid ' + themeColor[input.selectedIndex];
			
			/* Input Box Header */
			$.getElementById(inputName + '-header').style.color = themeColor[input.selectedIndex];
		}
	}
}

function onKeyDown(e) {
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

function onLoad() {
	input = new Input(['html-input', 'css-input', 'paper-input'], [false, false, true], callback);
	
	/* Set paper-input to html-input */
	input.setData(input.datas[input.names.indexOf('html-input')]);
	input.select(2);
	
	input.refreshAll();
	
	/* Select html-input */
	input.select(0);
	
	onResize();
	
	$.getElementById('paper-frame').onmousedown = function(event)
	{
		event.preventDefault();
		return false;
	}
}

window.onload = onLoad;
window.onkeypress = onKeyPress;
window.onkeydown = onKeyDown;
window.onresize = onResize;
</script>
</head>
<body>
<div id="left-pane" class="pane left max-height">
    <div id="html-input-header" class="input-header">&lt;/html&gt;</div>
    <div id="html-input" class="input" style="min-height: 120px; background-color: #ccc; font-family:monospace;" onClick="input.select(0)"><div class="center"><h1>Page Title</h1></div>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus erat diam, molestie ut euismod ut, convallis vitae augue. Duis nulla dolor, gravida ac luctus in, malesuada sed diam.</p>
<p>Proin porta iaculis dui, in fermentum lectus laoreet vel. Fusce a tincidunt justo. Vestibulum imperdiet sapien magna. Duis porttitor velit nec mauris convallis convallis. Sed blandit lectus in turpis molestie, ac ultricies enim mollis. Donec quis urna scelerisque, adipiscing sapien in, consequat leo. Suspendisse faucibus augue quam, eget tempus augue interdum non. Donec dignissim urna neque, malesuada suscipit lectus gravida in.</p></div>
	<p></p>
    <div id="css-input-header" class="input-header">&lt;/css&gt;</div>
    <div id="css-input" class="input" style="min-height:120px; background-color: #ccc; font-family:monospace;" onClick="input.select(1)">body {
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