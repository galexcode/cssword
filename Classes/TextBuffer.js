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
	 * Returns the string escaped nicely for html output
	 */
	String.prototype.escape = function() {
		return this.replace(/\t/g, '    ').replace(/ /g, '&nbsp;');
	};

	/**
	 * Moves p to the absolute position.
	 * @return The new internal counter position. 
	 */
	this.skip = function(i) {
		if (i < 0) i = 0;
		else if (i > this.buf.length) i = this.buf.length;

		this.p = i;
		return i; 
	};

	/**
	 * Moves p to the end of the buffer.
	 * @return The new internal counter position. 
	 */
	this.skipend = function() {
		this.p = this.buf.length;
		return this.p;
	};

	/**
	 * Moves p relative to p
	 * @return The position changed in the counter.
	 */
	this.seek = function(i) {
		if (this.p + i < 0) i = -this.p;
		else if (this.p + i > buf.length) i = buf.length - this.p;

		this.p += i;
		return i;
	};
	
	/**
	 * Sets the buffer to the input data and sets p to
	 * the end of the buffer.
	 * @return Length of data set.
	 */
	this.set = function(n) {
		this.buf = n || "";
		this.p = this.buf.length;
		return this.p;
	};

	/**
	 * Appends data starting at p and increments p.
	 * @return Length of data successfully appended.
	 */
	this.append = function(n) {
		var n = n || "";
		this.buf = this.buf.substr(0, this.p) + n + this.buf.substr(this.p);
		this.p += n.length;
		return Math.abs(n.length);
	};

	/**
	 * Insert data at p without changing p.
	 * @return Length of data successfully inserted.
	 */
	this.insert = function(n) {
		var n = n || "";
		this.buf = this.buf.substr(0, this.p) + n + this.buf.substr(this.p);
		return Math.abs(n.length);
	};

	/**
	 * Remove data before p while changing p.
	 * @return Length of data successfully removed.
	 */
	this.remove = function(i) {
		var i = i || 0;

		if (this.p - i < 0) i = this.p;
		else if (this.p - i > this.buf.length) i = this.p - this.buf.length;

		if (i < 0) {
			i *= -1;
			this.buf = this.buf.substr(0, this.p) + this.buf.substr(this.p + i);
		} else {
			this.buf = this.buf.substr(0, this.p - i) + this.buf.substr(this.p);
			this.p = this.p - i;
		}
		return i;
	};

	/**
	 * Delete data after p without changing p.
	 * @return Length of data successfully deleted.
	 */
	this.delete = function(i) {
		var i = i || 0;

		if (this.p + i < 0) i = -this.p;
		else if (this.p + i > this.buf.length) i = this.buf.length - this.p;

		if (i > 0) {
			this.buf = this.buf.substr(0, this.p) + this.buf.substr(this.p + i);
		} else {
			i *= -1;
			this.buf = this.buf.substr(0, this.p - i) + this.buf.substr(this.p);
		}
		return i;
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

