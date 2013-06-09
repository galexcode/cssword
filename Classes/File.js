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
function File () {
	
}

File.save = function (elementId) {
	var fileName = document.getElementById(elementId).value;
	
	var ajax = new Ajax(Ajax.Method.GET, 'Sources/File.php?action=save&file=' + fileName, function() {
		console.log("Saved " + fileName + "...");
		console.log("Response was: " + ajax.responseText());
	});
}

File.open = function (elementId) {
	var fileName = document.getElementById(elementId).value;
	
	var ajax = new Ajax(Ajax.Method.GET, 'Sources/File.php?action=open&file=' + fileName, function() {
		console.log("Opened " + fileName + "...");
		console.log("Response was: " + ajax.responseText());
	});
}