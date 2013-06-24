/**  
 *  CssProperty.js
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

function CssProperty(prop) {
	var Type = {
		SINGLE: 'single',
		TEXT: 'text',
		COLOR: 'color',
		RECT: 'rect',
		DELIMINATED: 'deliminated',
	};

	this.getType = function() {
		switch (this.name) {
			case 'padding':
			case 'margin':
				return Type.RECT;
			case 'color':
			case 'background-color':
				return Type.COLOR;
			case 'font-family':
				return Type.DELIMINATED;
			default:
				return Type.SINGLE;
		}
	}

	if (prop) {
		this.name = prop.name || '';
		this.value = prop.value || '';
	} else {
		this.name = '';
		this.value = '';
	}
	this.type = this.getType();

	/**
	 * getMaps();
	 * @returns an array of key-value-unit maps
	 */
	this.getMaps = function() {
		var array = new Array();
		if (this.type == Type.RECT) {
			var keys = [
				this.name + '-top',
				this.name + '-right',
				this.name + '-bottom',
				this.name + '-left'
				];

			var split = this.value.split(' ');

			if (split.length == 1) {
				var match = split[0].match(/([\d.]+)(.+)/);
				for (var i = 0; i < keys.length; i++) {
					array.push({
						key: keys[i],
						value: match[1],
						unit: match[2]
					});
				}
			}
			else if (split.length == 2) {
				var vMatch = split[0].match(/([\d.]+)(.+)/);
				var hMatch = split[1].match(/([\d.]+)(.+)/);
				for (var i = 0; i < keys.length; i++) {
					var value, unit;
					if (i % 2 == 0) { /* vertical */
						value = vMatch[1];
						unit = vMatch[2];
					} else { /* horizontal */
						value = hMatch[1];
						unit = hMatch[2];
					}
					array.push({
						key: keys[i],
						value: value,
						unit: unit
					});
				}
			}
			else if (split.length == 3) {
				var hMatch = split[1].match(/([\d.]+)(.+)/);
				for (var i = 0; i < keys.length; i++) {
					var value = 0, unit = 0;
					if (i % 2 == 0) { /* vertical */
						var match = split[i].match(/([\d.]+)(.+)/);
						value = match[1];
						unit = match[2];
					} else { /* horizontal */
						value = hMatch[1];
						unit = hMatch[2];
					}
					array.push({
						key: keys[i],
						value: value,
						unit: unit
					});
				}
			}
			else if (split.length == 4) {
				for (var i = 0; i < keys.length; i++) {
					var match = split[i].match(/([\d.]+)(.+)/);
					value = match[1];
					unit = match[2];

					array.push({
						key: keys[i],
						value: value,
						unit: unit
					});
				}
			}
		}
		else if (this.type == Type.SINGLE) {
				
		}
		else
			console.log('Unsupported type to map:', this.type);
		return array;
	};

	/**
	 * getMap();
	 * @returns the first object of getMaps();
	 */
	this.getMap = function() {
		var maps = this.getMaps();
		if (maps.length > 0)
			return this.getMaps[0];
		return null;
	}
}
