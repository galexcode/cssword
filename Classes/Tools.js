/**  
 *  Tools.js
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

function Tools(name) {
	if (!name) return;
	this.name = name || 'tools';
	this.element = document.getElementById(name);

	this.saveDocument = function(name) {
		var filename = name || this.filename.value || 'newFile';

		/* Get HTML and CSS data */
		if (filename != 'newFile') {
			var html = window.html_editor.editor.getValue();
			var css = window.css_editor.editor.getValue();
			var payload = new Payload(filename, html, css);
			File.Save(payload);
		} else {
			var error = document.createElement('span');
			error.style.color = 'red';
			error.innerHTML = 'Cannot save to default name.';

			this.output.innerHTML = '';
			this.output.appendChild(error);
		}	
	};

	this.openDocument = function(name, pushState) {
		var filename = name || this.filename.value || 'newFile';
		/* Push the state so we can backtrack */
		if (pushState != false) {
			console.log('pushing', filename);
			window.history.pushState({'file':filename}, '', '?file=' + filename);
		}

		/* Call File.js API */
		File.Open(filename, 
			function(payload) {
				if (payload == null || payload.html == null || payload.css == null) {
					var error = document.createElement('span');
					error.style.color = 'red';
					error.innerHTML = 'Unable to open file.';

					this.output.innerHTML = '';
					this.output.appendChild(error);
					return false;
				} else {
					/* Set HTML and CSS data */
					window.html_editor.editor.setValue(payload.html);
					window.css_editor.editor.setValue(payload.css);

					/* Go to beginning */
					window.html_editor.editor.gotoLine(0, 0);
					window.css_editor.editor.gotoLine(0, 0);

					/* Set titles */
					window.html_editor.setTitle(payload.name + '<span style="color: indianRed">:html</span>');
					window.css_editor.setTitle(payload.name + '<span style="color: dodgerBlue">:css</span>');

					/* Focus HTML Editor */
					window.html_editor.editor.focus();
				}
			}.bind(this)
		);
	};

	/* Constructor */
	this.element.innerHTML = '';

	/* Filename Textfield */
	this.filename = document.createElement('input');
	this.filename.id = 'tools-filename';
	this.filename.className = 'input tools-input';
	this.filename.type = 'text';
	this.filename.placeholder = 'File name';
	this.element.appendChild(this.filename);

	/* Save Button */
	this.save = document.createElement('button');
	this.save.id = 'tools-save';
	this.save.className = 'button';
	this.save.type = 'button';
	this.save.onclick = function () {
		this.saveDocument();
	}.bind(this);
	this.save.innerHTML = 'Save File';
	this.element.appendChild(this.save);

	/* Open Button */
	this.open = document.createElement('button');
	this.open.id = 'tools-open';
	this.open.className = 'button';
	this.open.type = 'button';
	this.open.onclick = function() {
		this.openDocument();
	}.bind(this);
	this.open.innerHTML = 'Open File';
	this.element.appendChild(this.open);

	/* Output */
	this.output = document.createElement('div');
	this.output.id = 'tools-output';
	this.output.className = 'tools-output';
	this.element.appendChild(this.output);
}
