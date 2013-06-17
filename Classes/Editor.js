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

function Editor(name, theme, mode, color, callback) {
	if (!name) return;
	this.theme = theme || 'tomorrow';
	this.mode = mode || 'html';
	this.color = color || '';
	this.callback = callback || function() { console.log(this, "has no callback"); }.bind(this);

	this.element = document.getElementById(name);
	this.editor = ace.edit(name);
	this.editor.setTheme('ace/theme/' + this.theme);
	this.editor.getSession().setMode('ace/mode/' + this.mode);
	this.editor.getSession().setUseWrapMode(true);
	this.editor.setFontSize(14);

	/* Event Handlers */
	this.editor.getSession().on('change', function(e) {
		this.callback(this.editor.getValue());
	}.bind(this));
	this.editor.on('focus', function(e) {
		this.element.className = 'editor-main focus ' + this.color;
		this.element.className += ' ace_editor';
		this.editor.setTheme('ace/theme/' + this.theme);
	}.bind(this));
	this.editor.on('blur', function(e) {
		this.element.className = 'editor-main';
		this.element.className += ' ace_editor';
		this.editor.setTheme('ace/theme/' + this.theme);
	}.bind(this));
}
