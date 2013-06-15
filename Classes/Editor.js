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

	this.frame = document.getElementById(name);
	this.frame.className = 'editor-frame';

	/* Toolbar */
	this.bar = document.createElement('div');
	this.bar.className = 'editor-bar top';
	this.frame.appendChild(this.bar);

	/* Main */
	this.main = document.createElement('div');
	this.main.className = 'editor-main';
	this.frame.appendChild(this.main);

	// Setup frame
	var frame = "<div class=\"editor-side\"></div><div class=\"editor-content\"></div>";
	this.main.innerHTML = frame;

	this.contents = ["<span style=\"color:blue\">&lt;Sup&gt;</span> content", "How are you?", "Nm u?"];

	this.display = function() {
		var gutters = this.main.getElementsByClassName("editor-side");
		for (var i = 0; i < gutters.length; i++) {
			for (j = 0; j < this.contents.length; j++)
				gutters[i].innerHTML += "<div class=\"editor-side-line\"></div>";
		}

		var contents = this.main.getElementsByClassName("editor-content");
		for (var i = 0; i < contents.length; i++) {
			for (j = 0; j < this.contents.length; j++)
				contents[i].innerHTML += "<div class=\"editor-content-line\">" + this.contents[j] + "</div>";
		}
	}
	this.display();
}

