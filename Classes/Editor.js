/**
 *  Editor.js
 *  @author katzenbaer
 *
 *  css:Word
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

function getStyle(oElm, strCssRule){
	var strValue = "";
	if(document.defaultView && document.defaultView.getComputedStyle){
		strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
	}
	else if(oElm.currentStyle){
		strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
			return p1.toUpperCase();
		});
		strValue = oElm.currentStyle[strCssRule];
	}
	return strValue;
}

function Editor(name, height, buffer) {
	this.buffer = buffer || new TextBuffer("");
	this.height = height || 96;

	/* Setup Editor Frame */
	this.editorFrame = document.getElementById(name);
	this.editorFrame.className = 'editor-frame';

	/* Add Toolbar to Editor Frame */
	this.editorTools = document.createElement('div');
	this.editorTools.className = 'editor-bar top';
	this.editorTools.innerHTML = '<span>css:Word Editor</span>';
	this.editorFrame.appendChild(this.editorTools);

	/* Add Main Frame to Editor Frame */
	this.editorMain = document.createElement('div');
	this.editorMain.className = 'editor-main';
	this.editorMain.style.height = this.height + 'px';
	this.editorMain.addEventListener('scroll', function() {
		//this.scrollActive();
	}.bind(this));
	this.editorFrame.appendChild(this.editorMain);

	/* Add Statusbar to Editor Frame */
	var editorStatusbar = document.createElement('div');
	editorStatusbar.className = 'editor-bar bottom status';
	// Status
	this.editorStatus = document.createElement('span');
	this.editorStatus.innerHTML = 'Line: 0';
	editorStatusbar.appendChild(this.editorStatus);
	// Append Statusbar
	this.editorFrame.appendChild(editorStatusbar);

	// Setup Main Frame
	this.editorTray = document.createElement('div');
	this.editorTray.className = 'editor-tray';
	this.editorMain.appendChild(this.editorTray);

	this.editorView = document.createElement('div');
	this.editorView.className = 'editor-view';
	this.editorMain.appendChild(this.editorView);

	/* Some Global Variables */
	var char_width = 7;
	var char_height = 16;

	var trayWidth = this.editorTray.clientWidth + parseFloat(getStyle(this.editorTray, 'margin-right'), 10);
	var max_col = Math.floor((this.editorMain.clientWidth - trayWidth) / char_width);
	var max_row = Math.floor(this.editorMain.clientHeight / char_height);

	/* Create Editor Input */
	this.editorInput = document.createElement('textarea');
	this.editorInput.className = 'editor-input';
	this.editorInput.wrap = 'off';
	this.editorInput.spellcheck = false;
	this.editorInput.style.width = max_col * char_width + 'px';
	this.editorInputListener = function() {
		var i = this.editorInput.selectionStart;
		this.buffer.set(this.editorInput.value);
		this.buffer.skip(i);
		this.display();
	}.bind(this);
	this.editorInput.addEventListener('keyup', this.editorInputListener);
	this.editorInput.addEventListener('keypress', this.editorInputListener);
	this.editorInput.addEventListener('keydown', this.editorInputListener);
	this.editorInput.addEventListener('keydown', function(e) {
	if (e.keyCode == 8 || e.keyCode == 13) /* Backspace or Enter */ {
		this.editorInputListener();
		return false;
	}
}.bind(this));

	this.editorView.onclick = function() {
		console.log("Input focused.");
		this.editorInput.focus();
	}.bind(this);
	this.editorMain.appendChild(this.editorInput);

	/* Create Cursor */
	this.editorCursor = document.createElement('div');
	this.editorCursor.className = 'editor-cursor';
	this.editorMain.appendChild(this.editorCursor);

	/* On Focus Changes */
	this.editorInput.onfocus = function () {
		this.editorMain.className = 'editor-main focused';
	}.bind(this);
	this.editorInput.onblur = function () {
		this.editorMain.className = 'editor-main';
	}.bind(this);

	/* Display */
	this.display = function() {
		var _scrollTop = this.editorMain.scrollTop;

		/* Split lines by linebreak */
		var contents = this.buffer.htmlValue().split('\n'); 

		this.editorTray.innerHTML = "";
		this.editorView.innerHTML = "";

		var offset = 0;
		for (i = 0; i < contents.length; i++) {
			var viewLine = document.createElement('div');
			viewLine.className = 'editor-view-line';
			if (offset <= this.buffer.p &&
			    this.buffer.p <= offset + contents[i].length) {
				viewLine.className += ' active';
			}

			viewLine.innerHTML = contents[i].escape();

			this.editorView.appendChild(viewLine);

			var trayLine = document.createElement('div');
			trayLine.className = 'editor-tray-line';
			if (offset <= this.buffer.p &&
			    this.buffer.p <= offset + contents[i].length) {
				trayLine.className += ' active';
			}
			trayLine.style.height = viewLine.clientHeight + 'px';
			this.editorTray.appendChild(trayLine);

			/* Other Lines */
			offset += contents[i].length + 1;

		}
		this.editorMain.scrollTop = _scrollTop;
		this.scrollActive();
	}

	this.scrollActive = function() {

		/* Split word-wrapped lines into their own line */
		var raw_divs = this.editorView.getElementsByClassName('editor-view-line');
		var raw_html = this.buffer.htmlValue().split('\n');
		var lines = [];
		/* Get position of active line */
		var row = 0, col = 0;
		var offset = 0;
		for (var i = 0; i < raw_divs.length; i++) {
			var line = raw_html[i];
			while (line.length > max_col) {
				if (raw_divs[i].className.indexOf('active') > 0 &&
					this.buffer.p >= offset &&
					this.buffer.p <= offset + max_col) { 
					row = lines.length; 
					col = this.buffer.p - offset;
				}
				offset += max_col;
				lines.push(line.substr(0, max_col));
				line = line.substr(max_col);
			}
			if (raw_divs[i].className.indexOf('active') > 0 &&
				this.buffer.p >= offset &&
				this.buffer.p <= offset + line.length) { 
				row = lines.length;
				col = this.buffer.p - offset;
			}
			offset += line.length + 1;
			lines.push(line);
		}

		/* Scroll to the active line */
		this.editorStatus.innerHTML = 'Line: ' + (row + 1) + ', Col: ' + col;

		/* Find visible minline and maxline */
		var minline = Math.floor(this.editorMain.scrollTop / 16) + 1;
		var maxline = (minline - 1)+ Math.floor(this.editorMain.clientHeight / 16);
		if (row + 1 < minline) {
			var firstRow = row;
			this.editorMain.scrollTop = firstRow * char_height;
		}
		else if (row + 1 > maxline) {
			var firstRow = row - max_row + 1;
			this.editorMain.scrollTop = firstRow * char_height;
		}

		/* Get Cursor Position */
		if (col == max_col) {
			col = 0;
			row++;
		}

		_left = col * char_width;
		_top = row * char_height;

		/* Position Cursor */
		this.editorCursor.style.top = _top + 'px';
		this.editorCursor.style.left = _left + trayWidth + 'px';

		/* Position Input */
		this.editorInput.style.top = _top + 'px';
		this.editorInput.style.left = trayWidth + 'px';
	};
	this.display();
	/* Focus */
	this.editorInput.focus();
}

