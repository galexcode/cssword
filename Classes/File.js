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

function File(action, name) {	
	this.ajax = null;
	
	this.callback = function(ajax) {
		if (ajax.readyState == Ajax.State.READY) {
			var obj = JSON.parse(ajax.responseText);
			console.log("Response: ", obj);
			
			if (action == File.Action.SAVE)
				console.log("Saved '" + obj.name + "'...");
			else if (action == File.Action.OPEN)
				console.log("Opened '" + obj.name + "'...");
		}
	}
	
	/* Connect */
	this.ajax = new Ajax(Ajax.Method.GET, 'Sources/File.php?action=' + action + '&file=' + name, this.callback);
}

File.save = function (elementId) {
	var fileName = document.getElementById(elementId).value;
	
	var file = new File(File.Action.SAVE, fileName);
}

File.open = function (elementId) {
	var fileName = document.getElementById(elementId).value;
	
	var file = new File(File.Action.OPEN, fileName);
}