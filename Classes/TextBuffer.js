/**
 *  TextBuffer.js
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

function TextBuffer(buf) {
	Buffer.call("text"); // Calling inherited object
	this.buf = buf || "";
	this.p = this.buf.length;

	/**
	 * Moves the internal counter to the absolute position.
	 * @return The new internal counter position. 
	 */
	this.skip = function(n) { 
		if (n < 0) n = 0;
		else if (n > buf.length) n = buf.length;

		this.p = n;
		return n; 
	};

	/**
	 * Moves the internal counter relative to position.
	 * @return The position changed in the counter.
	 */
	this.seek= function(n) {
		if (this.p + n < 0) n = -this.p;
		else if (this.p + n > buf.length) n = buf.length - this.p;

		this.p += n;
		return n;
	};

	/**
	 * Appends data starting from the internal counter position.
	 * @return Length of data successfully appended.
	 */
	this.append = function(n) {
		this.buf = this.buf.substr(0, this.p) + n + this.buf.substr(this.p);
		this.p += n.length;
		return n.length;
	};

	/**
	 * Insert data at internal counter position.
	 * @return Length of data successfully appended.
	 */
	this.insert = function(i, n) {
		this.buf = this.buf.substr(0, i) + n + this.buf.substr(i);
		return n.length;
	};

	/**
	 * Creates an html-friendly representation of the buffer.
	 * @return HTML string
	 */
	this.htmlValue = function() {
		return this.buf;
	};
}
TextBuffer.prototype = new Buffer;

