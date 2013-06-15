<?
/**
 *  TextBuffer.php
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

/* initialization */
document.write("<h4>Test 1: Initialization</h4>");
obj = new TextBuffer();
UnitAssert(obj.buf == "", "<b>Initialize to an empty string</b>");

obj = new TextBuffer("foo");
UnitAssert(obj.buf == "foo", "<b>Initialize to 'foo'</b>");
UnitAssert(obj.p == "foo".length, "Set p to length of 'foo' (3)");

document.write("<h4>Test 2: htmlValue</h4>"); // htmlValue
obj = new TextBuffer();
UnitAssert(obj.htmlValue() == "", "<b>Get htmlValue for buffer created with no params</b>");

obj = new TextBuffer("foo");
UnitAssert(obj.htmlValue() == "foo", "<b>Get htmlValue for 'foo'</b>");

/* set data */
document.write("<h4>Test 3: set</h4>"); // set
obj = new TextBuffer("foobar");
UnitAssert(obj.set() == 0, "<b>Set with no params</b>");
UnitAssert(obj.buf == "", "Set buf to empty string");
UnitAssert(obj.p == 0, "Set p to 0");

obj = new TextBuffer("foobar");
UnitAssert(obj.set("") == 0, "<b>Set with empty string and return length</b>"); 

obj = new TextBuffer("foobar");
UnitAssert(obj.set("foo") == 3, "<b>Set to 'foo' and return length</b>");
UnitAssert(obj.buf == "foo", "Set buf 'foo'");
UnitAssert(obj.p == 3, "Set p to 3");

document.write("<h4>Test 4: seek</h4>"); // seek
obj = new TextBuffer("foobar");
UnitAssert(obj.seek(-3) == -3, "<b>Seek between 'foo' and 'bar' in 'foobar' starting at end</b>");
UnitAssert(obj.p == 3, "Set p to 3");

obj = new TextBuffer("foobar");
UnitAssert(obj.seek(1) == 0, "<b>Try to seek past end, but should return 0</b>");
UnitAssert(obj.p == 6, "Keep p the same");

obj = new TextBuffer("foobar");
UnitAssert(obj.seek(-7) == -6, "<b>Try to seek past beginning, but should return -6</b>");
UnitAssert(obj.p == 0, "Set p to 0");

document.write("<h4>Test 5: skip</h4>"); // skip
obj = new TextBuffer("foobar");
UnitAssert(obj.skip(0) == 0, "<b>Return 0 after skipping to 0</b>");
UnitAssert(obj.p == 0, "Set p to 0");

obj = new TextBuffer("foobar");
UnitAssert(obj.skip(4) == 4, "<b>Return 4 after skipping to 4</b>");
UnitAssert(obj.p == 4, "Set p to 4");

obj = new TextBuffer("foobar");
UnitAssert(obj.skip(6) == 6, "<b>Return 6 after skipping to 6</b>");
UnitAssert(obj.p == 6, "Set p to 6");

obj = new TextBuffer("foobar");
UnitAssert(obj.skip(-1) == 0, "<b>Return 0 after skipping to -1</b>");
UnitAssert(obj.p == 0, "Set p to 0");

obj = new TextBuffer("foobar");
UnitAssert(obj.skip(7) == 6, "<b>Return 6 after skipping to 7</b>");
UnitAssert(obj.p == 6, "Set p to 6");

document.write("<h4>Test 6: skipend</h4>"); // skipend
obj = new TextBuffer("foobar");
UnitAssert(obj.skipend() == 6, "<b>Skip to end and return 6</b>");
UnitAssert(obj.p == 6, "Set p to 6");

obj = new TextBuffer("");
UnitAssert(obj.skipend() == 0, "<b>Skip to end on empty string and return 0</b>");
UnitAssert(obj.p == 0, "Set p to 0");

document.write("<h4>Test 7: append</h4>"); // append
obj = new TextBuffer("foobar");
UnitAssert(obj.append("bad") == 3, "<b>Append 'bad' and return 3</b>");
UnitAssert(obj.buf == "foobarbad", "Set buf to 'foobarbad'");
UnitAssert(obj.p == 9, "Set p to 9");

obj = new TextBuffer("");
UnitAssert(obj.append("bad") == 3, "<b>Append 'bad' to empty string and return 3</b>");
UnitAssert(obj.buf == "bad", "Set buf to 'bad'");
UnitAssert(obj.p == 3, "Set p to 3");

obj = new TextBuffer("foobar");
obj.p = 3;
UnitAssert(obj.append("bad") == 3, "<b>Append 'bad' when p = 3 and return 3</b>");
UnitAssert(obj.buf == "foobadbar", "Set buf to 'foobadbar'");
UnitAssert(obj.p == 6, "Set p to 6");

obj = new TextBuffer("foobar");
UnitAssert(obj.append("") == 0, "<b>Append empty string</b>");
UnitAssert(obj.buf == "foobar", "Keep buf the same");
UnitAssert(obj.p == 6, "Keep p the same");

obj = new TextBuffer("foobar");
UnitAssert(obj.append() == 0, "<b>Append with no params</b>");
UnitAssert(obj.buf == "foobar", "Keep buf the same");
UnitAssert(obj.p == 6, "Keep p the same");

document.write("<h4>Test 8: remove</h4>"); // remove
obj = new TextBuffer("foobar");
UnitAssert(obj.remove(3) == 3, "<b>Remove 3 from the end</b>");
UnitAssert(obj.buf == "foo", "Set buf to 'foo'");
UnitAssert(obj.p == 3, "Set p to 3");

obj = new TextBuffer("foobar");
UnitAssert(obj.remove(7) == 6, "<b>Remove 7 from the end and return 6</b>");
UnitAssert(obj.buf == "", "Set buf to empty string");
UnitAssert(obj.p == 0, "Set p to 0");

obj = new TextBuffer("foobar");
UnitAssert(obj.remove(0) == 0, "<b>Remove 0</b>");
UnitAssert(obj.buf == "foobar", "Keep buf the same");
UnitAssert(obj.p == 6, "Keep p the same");

obj = new TextBuffer("foobar");
obj.p = 0;
UnitAssert(obj.remove(-2) == 2, "<b>Remove -2 at index 0</b>");
UnitAssert(obj.buf == "obar", "Set buf to 'obar'");
UnitAssert(obj.p == 0, "Keep p the same");

obj = new TextBuffer("foobar");
UnitAssert(obj.remove(-1) == 0, "<b>Remove -1 at end</b>");
UnitAssert(obj.buf == "foobar", "Keep buf the same");
UnitAssert(obj.p == 6, "Keep p the same");

document.write("<h4>Test 9: delete</h4>"); // delete
obj = new TextBuffer("foobar");
UnitAssert(obj.delete(1) == 0, "<b>Delete 1 from the end</b>");
UnitAssert(obj.buf == "foobar", "Keep buf the same");
UnitAssert(obj.p == 6, "Keep p the same");

obj = new TextBuffer("foobar");
obj.p = 0;
UnitAssert(obj.delete(1) == 1, "<b>Delete 1 from the beginning</b>");
UnitAssert(obj.buf == "oobar", "Set buf to 'oobar'");
UnitAssert(obj.p == 0, "Keep p the same");

obj = new TextBuffer("foobar");
obj.p = 3;
UnitAssert(obj.delete(3) == 3, "<b>Delete 3 after 'foo'</b>");
UnitAssert(obj.buf == "foo", "Set buf to 'foo'");
UnitAssert(obj.p == 3, "Keep p the same");

obj = new TextBuffer("foobar");
obj.p = 3;
UnitAssert(obj.delete(4) == 3, "<b>Delete 4 after 'foo', but return 3</b>");
UnitAssert(obj.buf == "foo", "Set buf to 'foo'");
UnitAssert(obj.p == 3, "Keep p the same");

obj = new TextBuffer("foobar");
obj.p = 3;
UnitAssert(obj.delete(-3) == 3, "<b>Delete 3 before 'bar'</b>");
UnitAssert(obj.buf == "bar", "Set buf to 'bar'");
UnitAssert(obj.p == 3, "Keep p the same");

document.write("<h4>Test 10: insert</h4>"); // insert
obj = new TextBuffer("foobar");
obj.p = 3;
UnitAssert(obj.insert('bad') == 3, "<b>Insert 'bad' after 'foo'</b>");
UnitAssert(obj.buf == "foobadbar", "Set buf to 'foobadbar'");
UnitAssert(obj.p == 3, "Keep p the same");

obj = new TextBuffer("foobar");
UnitAssert(obj.insert('bad') == 3, "<b>Insert 'bad' at the end</b>");
UnitAssert(obj.buf == "foobarbad", "Set buf to 'foobarbad'");
UnitAssert(obj.p == 6, "Keep p the same");

obj = new TextBuffer("foobar");
UnitAssert(obj.insert('') == 0, "<b>Insert empty string at the end</b>");
UnitAssert(obj.buf == "foobar", "Keep buf the same");
UnitAssert(obj.p == 6, "Keep p the same");

obj = new TextBuffer("foobar");
UnitAssert(obj.insert() == 0, "<b>Insert with no params at the end</b>");
UnitAssert(obj.buf == "foobar", "Keep buf the same");
UnitAssert(obj.p == 6, "Keep p the same");
</script></p>
</body>
</html>
