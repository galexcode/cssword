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
	 * Moves the internal counter to the absolute position.
	 * @return The new internal counter position. 
	 */
	this.skip = function(n) { return 0; };

	/**
	 * Moves the internal counter to the end of the buffer.
	 * @return The new internal counter position. 
	 */
	this.skipend = function(n) { return 0; };

	/**
	 * Moves the internal counter relative to position
	 * @return The position changed in the counter.
	 */
	this.seek= function(n) { return 0; };

	/**
	 * Appends data starting from the internal counter position;
	 * @return Length of data successfully appended.
	 */
	this.append = function(n) { return 0; };

	/**
	 * Insert data at position.
	 * @return Length of data successfully inserted.
	 */
	this.insert = function(i, n) { return 0; };

	/**
	 * Remove n-size data before internal counter position.
	 * @return Length of data successfully removed.
	 */
	this.remove = function(i, n) { return 0; };

	/**
	 * Delete n-size data at position.
	 * @return Length of data successfully deleted.
	 */
	this.delete = function(i, n) { return 0; };

	/**
	 * Creates an html-friendly representation of the buffer.
	 * @return HTML string
	 */
	this.htmlValue = function() {
		return "This is a buffer.";
	};
}

