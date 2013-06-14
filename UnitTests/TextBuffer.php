<?
/**
 *  index.php
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
?>
<!DOCTYPE html>
<html>
<head>
<title>Unit Tests: TextBuffer</title>
</head>
<body>
<script type="text/javascript" src="UnitTests.js"></script>
<script type="text/javascript" src="../Classes/Buffer.js"></script>
<script type="text/javascript" src="../Classes/TextBuffer.js"></script>
<h3>TextBuffer.js</h3>
<p><script type="text/javascript">
<!-- Javascript Unit Tests -->
var obj = null;

obj = new TextBuffer();
UnitAssert(obj.htmlValue() == "", "Initialize to an empty string");

/* initialization */
obj = new TextBuffer("foo");
UnitAssert(obj.htmlValue() == "foo", "Initialize to 'foo'");
UnitAssert(obj.p == "foo".length, "Initialize p to length of 'foo' (3)");

/* modifying data */
UnitAssert(obj.append("bar") == "bar".length, "Return length of 'bar'"); // append bar
UnitAssert(obj.htmlValue() == "foobar", "Append 'bar' to 'foo'");
UnitAssert(obj.p == "foobar".length, "Increment p when appending.");

UnitAssert(obj.seek(-"bar".length) == -"bar".length, "Return -'bar'.length"); // seek between foo and bar
UnitAssert(obj.p == ("foobar".length - "bar".length), "Seek -'bar'.length");

UnitAssert(obj.append("foo") == "foo".length, "Return 'foo'.length"); // append bar again
UnitAssert(obj.htmlValue() == "foofoobar", "Append 'foo' between 'foo' and 'bar'");

UnitAssert(obj.skip(2) == 2, "Return 2"); // set p to 0
UnitAssert(obj.p == 2, "Set p to 2");

UnitAssert(obj.skip(0) == 0, "Return 0"); // set p to 0
UnitAssert(obj.p == 0, "Set p to 0");

UnitAssert(obj.append("doe") == "doe".length, "Return 'doe'.length"); // insert doe at index 0
UnitAssert(obj.htmlValue() == "doefoofoobar", "Append 'doe' when p = 0");
UnitAssert(obj.p = 'doe'.length, "Increment p when appending");

UnitAssert(obj.insert(5, "fi") == "fi".length, "Return 'fi'.length"); // insert fi at index 5
UnitAssert(obj.htmlValue() == "doefofiofoobar", "Insert fi at index 5");
</script></p>
</body>
</html>
