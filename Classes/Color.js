/**
 *  Color.js
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

/* Color Object */
function Color(hex) {
	/* Validate hex */
	if (hex == null)
		hex = "000000";
	else if (hex[0] == '#')
		hex = hex.substr(1);

	if (hex.length == 3) {
		hex += hex;
	} else if (hex.length != 6);
		hex = "000000";

	this.hex = '#' + hex;

	this.invertColor = function() {
		var color = this.hex;
		color = color.substring(1);           // remove #
		color = parseInt(color, 16);          // convert to integer
		color = 0xFFFFFF ^ color;             // invert three bytes
		color = color.toString(16);           // convert to hex
		color = ("000000" + color).slice(-6); // pad with leading zeros
		color = "#" + color;                  // prepend #
		return new Color(color);    
	}
}
