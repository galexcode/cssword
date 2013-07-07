/**  
 *  Scale.js
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

function Scale(obj) {
	this.obj = obj;
	this.container = new Object();
	this.frame = new Object();

	this.pointToPixel = function(p) {
		return (p / 72) * (obj.renderWidth / obj.paperWidth);
	};

	this.inchToPixel = function(i) {
		return i * (obj.renderWidth / obj.paperWidth);
	};

	/**
	 * TODO Complete Implementation
	 */
	this.frame.toInch = function(val, unit) {
		console.log('converting',val,unit,'to inch');
		return val;
	};
	/**
	 * Container is independent of margins
	 */
	this.container.toInch = function(val, unit) {
		return val;
	};

	/**
	 * TODO Make toPixel function for pt to px
	 */
	this.frame.toPixel = function(val, unit) {
		return val;
	};
	/**
	 * Container is independent of margins
	 */
	this.container.toPixel = function(val, unit) {
		return val;
	};
}

