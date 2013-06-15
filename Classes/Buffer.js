/**
 *  Buffer.js
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

function Buffer(type) {
	this.type = type || "none";

	/**
	 * Moves p to the absolute position.
	 * @return The new internal counter position. 
	 */
	this.skip = function(i) { return 0; };

	/**
	 * Moves p to the end of the buffer.
	 * @return The new internal counter position. 
	 */
	this.skipend = function() { return 0; };

	/**
	 * Moves p relative to p
	 * @return The position changed in the counter.
	 */
	this.seek = function(i) { return 0; };
	
	/**
	 * Sets the buffer to the input data and sets p to
	 * the end of the buffer.
	 * @return Length of data set.
	 */
	this.set = function(n) { return 0; };

	/**
	 * Appends data starting at p and increments p.
	 * @return Length of data successfully appended.
	 */
	this.append = function(n) { return 0; };

	/**
	 * Insert data at p without changing p.
	 * @return Length of data successfully inserted.
	 */
	this.insert = function(n) { return 0; };

	/**
	 * Remove data before p while changing p.
	 * @return Length of data successfully removed.
	 */
	this.remove = function(i) { return 0; };

	/**
	 * Delete after after p without changing p.
	 * @return Length of data successfully deleted.
	 */
	this.delete = function(i) { return 0; };

	/**
	 * Creates an html-friendly representation of the buffer.
	 * @return HTML string
	 */
	this.htmlValue = function() {
		return "This is a buffer.";
	};
}

