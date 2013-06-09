/*  css:Word
 * 
 *  File.js
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

/* File Object */
File.Action = {
	SAVE : 'save',
	OPEN : 'open',
};

function File(action, name, callback) {	
	this.ajax = null;
	
	/**
	 * callback(jsonObject);
	 */
	this.callback = callback;
	
	/* Connect */
	var self = this;
	this.ajax = new Ajax(Ajax.Method.GET, 'Sources/File.php?action=' + action + '&file=' + name, function(ajax) {
		if (ajax.readyState == Ajax.State.READY) {
			var obj = JSON.parse(ajax.responseText);
			
			console.log(self);
			console.log("Obj", obj);
			console.log(self.callback);
			self.callback(obj);
		}
	});
}

File.save = function (elementId) {
	var fileName = document.getElementById(elementId).value;
	
	new File(File.Action.SAVE, fileName, function(obj) {
		document.getElementById('tools-output').innerHTML = "Saved '" + obj.file + "'...";
	});
}

File.open = function (elementId) {
	var fileName = document.getElementById(elementId).value;
	
	new File(File.Action.OPEN, fileName, function(obj) {
		document.getElementById('tools-output').innerHTML = "Opened '" + obj.file + "'...";
	});
}