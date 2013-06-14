/**
 *  UnitTests.js 
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

function UnitAssert(assertion, purpose) {
	if (assertion) { // is true
		var msg = purpose + "... Success<br>";
		document.write(msg);
		console.log(msg);
	} else { // is false
		document.write(purpose + "... <span style=\"font-weight: bold; color: red;\">Failure</span><br>");
		console.assert(assertion, "DID NOT " + purpose.toLowerCase()); 
	}
}

