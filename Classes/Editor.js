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

function Editor(name, buffer) {
	this.buffer = buffer || new TextBuffer("");

	/* Create Editor Input */
	this.editorInput = document.createElement('textarea');
	this.editorInput.className = 'editor-input';
	var editor = this;
	this.editorInput.onkeyup = function() {
		editor.buffer.set(this.value);
		editor.buffer.skip(editor.editorInput.selectionStart);
		editor.display();
	};
	this.editorInput.onkeypress = this.editorInput.onkeyup;

	/* Setup Editor Frame */
	this.editorFrame = document.getElementById(name);
	this.editorFrame.className = 'editor-frame';

	/* Add Toolbar to Editor Frame */
	this.editorTools = document.createElement('div');
	this.editorTools.className = 'editor-bar top';
	this.editorFrame.appendChild(this.editorTools);

	/* Add Main Frame to Editor Frame */
	this.editorMain = document.createElement('div');
	this.editorMain.className = 'editor-main';
	this.editorFrame.appendChild(this.editorMain);

	// Setup Main Frame
	this.editorTray = document.createElement('div');
	this.editorTray.className = 'editor-tray';
	this.editorMain.appendChild(this.editorTray);

	this.editorView = document.createElement('div');
	this.editorView.className = 'editor-view';
	this.editorView.onclick = function() {
		console.log("Input focused.");
		editor.editorInput.focus();
	}
	this.editorMain.appendChild(this.editorView);
	this.editorMain.appendChild(this.editorInput);

	/* On Focus Changes */
	this.editorInput.onfocus = function () {
		editor.editorMain.className = 'editor-main focused';
	}
	this.editorInput.onblur = function () {
		editor.editorMain.className = 'editor-main';
	}

	/* Display */
	this.display = function() {
		var contents = this.buffer.htmlValue().split('\n'); 

		this.editorTray.innerHTML = "";
		this.editorView.innerHTML = "";

		var offset = 0;
		for (i = 0; i < contents.length; i++) {
			var trayLine = document.createElement('div');
			trayLine.className = 'editor-tray-line';
			this.editorTray.appendChild(trayLine);

			var viewLine = document.createElement('div');
			viewLine.className = 'editor-view-line';
			var content = "";
			if (offset <= this.buffer.p &&
			    this.buffer.p <= offset + contents[i].length) {
				/* This is our current line */
				viewLine.className += ' active';
				var line_offset = this.buffer.p - offset;

				var cursor = null;
				if (line_offset == contents[i].length)
					cursor = "<span style=\"border-left: 2px solid gray;\">&nbsp;</span>";
				else
					cursor = "<span style=\"border-left: 2px solid gray;\">" + contents[i].substr(line_offset, 1).escape() + "</span>" + contents[i].substr(line_offset + 1).escape();
				content = contents[i].substr(0, line_offset).escape() + cursor;
			} else {
				/* Other Lines */
				offset += contents[i].length + 1;
				if (contents[i].length == 0) contents[i] = ' ';
				content = contents[i].escape();
			}
				viewLine.innerHTML = content; 

			this.editorView.appendChild(viewLine);
		}

		/* Scroll to the active line */
		var activeLine = this.editorView.getElementsByClassName('editor-view-line active')[0];
		if (activeLine) {
			console.log("top:", activeLine.offsetTop);
			this.editorMain.scrollTop = activeLine.offsetTop;
			this.editorInput.style.top = activeLine.offsetTop + "px";
		}
	}
	this.display();
}

