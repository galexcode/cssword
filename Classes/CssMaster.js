/**  
 *  CssMaster.js
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

function CssMaster(css) {
	this.css = css || '';

	/**
	 * getClassName(var header);
	 */
	this.getClassName = function(header) {
		var temp = header.match(/\s*(\.?[^\s]+)\s*{/i);
		if (temp && temp.length == 2) {
			return temp[1];
		}
		return null;
	};

	/**
	 * getClasses(var filter);
	 */
	this.getClasses = function(_filter) {
		var filter = new RegExp(_filter, 'i');
		var classHeaders = this.css.match(/\s*(\.?[^\s]+)\s*{/gi);
		var array = new Array();
		if (classHeaders) {
			for (var i = 0; i < classHeaders.length; i++) {
				var className = this.getClassName(classHeaders[i]);
				if (_filter == '' || 
				   (className && className.match(filter)))
					array.push(className);
			}
		}
		return array;
	};

	/**
	 * getDeclarations(className);
	 * @returns Array of declaration strings
	 */
	this.getDeclarations = function(className) {
		var decPattern = '\\' + className + '\\s*{([^}]+)}';
		var array = new Array();
		var decs;
		if (decs = this.css.match(new RegExp(decPattern, 'gi'))) {
			for (var i = 0; i < decs.length; i++) {
				array.push(decs[i].match(new RegExp(decPattern, 'i'))[1].trim());
			}
		}
		return array;
	};

	/**
	 * getProperties(className);
	 * @returns Array of property key-vals
	 * 	- name: property name
	 * 	- value: property value
	 */
	this.getProperties = function(className) {
		var decs = this.getDeclarations(className);
		var array = new Array();
		for (var i = 0; i < decs.length; i++) {
			var props = decs[i].match(/([\w-]+):([\w\s.,%-]+);/gi);
			for (var i = 0; i < props.length; i++) {
				var prop = props[i].match(/([\w-]+):([\w\s.,%-]+);/i);	
				array.push({ name: prop[1].trim(), value: prop[2].trim()});
			}
		}
		return array;
	};
}
