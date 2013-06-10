/*  css:Word
 * 
 *  Input.js
 *  @author katzenbaer
 *  
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

/* Input Object */
function Input (inputs, formatting, callback) {
	if (inputs.length != formatting.length) {
		console.log("A formatting must be specified for every input.");
		return null;
	}
	
	this.names = [];
	for (var i = 0; i < inputs.length; i++) {
		this.names.push(inputs[i]);
	}
	
	this.datas = [];
	this.datasPos = []; /* The offset position in the data. When formatting is allowed, this is the position after performing a clean on the data. */
	this.allowsFormatting = [];
	for (var i = 0; i < inputs.length; i++) {
		this.allowsFormatting.push(formatting[i]);
	}
	
	this.callback = callback;
	
	this.selectedIndex = 0;
	this.lastHealthyIndex = 0;
	
	this.CallbackIntent = {
		SELECTED : 0,
		REFRESHED : 1,
	};
	
	EscapeString = {
		SPACE : '{com.lytenight.css-word.space}',
		LT : '<',
		GT : '>',
		TAB : '\t',
		NEWLINE : '\n', /* Has to be last, so '<br>' doesn't get overwritten by '&lt;' and '&gt;' */
	};
	
	EscapeEquivalent = {
		SPACE : ' ',
		LT : '&lt;',
		GT : '&gt;',
		TAB : '&nbsp;&nbsp;&nbsp;&nbsp;',
		NEWLINE : '<br>',
	};
	
	this._isBlinking = false;
	
	/**
	 * String.safewrap(wrapper);
	 * Wraps a 'wrapper' around the string.
	 * The string is inserted wherever a $0 is present.
	 * Spaces in the wrapper will be replaced with an escaped space.
	 */
	String.prototype.safewrap = function(wrapper) {
		return wrapper.replace(/\s/g, EscapeString.SPACE).replace(/\$0/g, this);
	};
	
	/**
	 * String.equivalent();
	 * Creates and returns a new string made from replacing all escapes with their equivalent.
	 */
	String.prototype.equivalent = function() {
		var str = this;
		for (var key in EscapeString) {
			str = str.replace(new RegExp(EscapeString[key], 'g'), EscapeEquivalent[key]);
		}
		return str;
	};
	
	/**
	 * String.elength();
	 * Returns the length of a string undergone the equivalent transformation.
	 */
	String.prototype.elength = function() {
		return String.prototype.equivalent.call(this).length;
	};
	
	/**
	 * String.ediff();
	 * Returns the increase in length due to an equivalent transformation.
	 */
	String.prototype.ediff = function() {
		return Number(String.prototype.elength.call(this)) - this.length;
	};
	
	/**
	 * String.clean();
	 * Creates and returns a new string made from stripping all HTML tags.
	 */
	String.prototype.clean = function() {
		var str = this;
		//str = str.replace(/(<([^>]+)>)/ig,'');
		//str = str.replace(new RegExp('(<[^>]+>\n*<[^>]+>)', "ig"), ''); /* Add in spaces where text can potentially go. */
		str = str.replace(new RegExp('(<([^>]+)>)', "ig"), ' '); /* Completely remove remaining tags. */
		
		/*var matches = this.match(new RegExp('<[^>]+>', "ig"));
		
		if (matches) {
			var matchCount = matches.length;
			for (var i = 0; i < matchCount; i++)
				str += ' ';
		}*/
		
		return str;
	};
	
	/**
	 * String.clength();
	 * Returns the length of a string undergone the clean transformation.
	 */
	String.prototype.clength = function() {
		return String.prototype.clean.call(this).length;
	};
	
	/**
	 * String.cdiff();
	 * Returns the increase in length due to an clean transformation.
	 */
	String.prototype.cdiff = function() {
		return Number(String.prototype.clength.call(this)) - this.length;
	};
	
	/** Functions **/
	this.count = function() {
		return this.names.length;
	};
	this.pos = function() {
		return this.datasPos[this.selectedIndex];	
	}
	
	/** Changing input **/
	/**
	 * selectInput(inputIndex, shouldNotify = true); 
	 */
	this.select = function(i, shouldNotify) {
		if (shouldNotify == null) shouldNotify = true;
		
		this.selectedIndex = i;
		if (i >= 0)
			this.lastHealthyIndex = i;
		
		/* Callback */
		if (shouldNotify)
			this.invokeCallback(this.CallbackIntent.SELECTED, i);
	};
	
	/**
	 * getHealthy(shouldNotify);
	 */
	 this.getHealthy = function(shouldNotify) {
		if (shouldNotify == null) shouldNotify = true;
		
		this.select(this.lastHealthyIndex, shouldNotify);
	};
	
	/**
	 * selectedInput(); 
	 */
	this.selected = function() {
		if (this.selectedIndex < 0) return null;
		
		return this.names[this.selectedIndex];
	};
	
	this.indexOf = function(name) {
		if (this.selectedIndex < 0) return -1;
		
		return this.names.indexOf(name);
	};
	
	/* Changing data */
	/**
	 * data(); 
	 */
	this.data = function() {
		if (this.selectedIndex < 0) return null;
		
		return this.datas[this.selectedIndex];	
	};
	
	/**
	 * setData(d); 
	 */
	this.setData = function(d) {
		if (this.selectedIndex < 0) return false;
		
		if (this.allowsFormatting[this.selectedIndex]) {
			//d = d.replace(/([^\s])</g, '$1 <')
		}
		this.datas[this.selectedIndex] = d;
		this.datasPos[this.selectedIndex] = (this.allowsFormatting[this.selectedIndex]) ? d.clean().length : d.length;
	};
	
	/**
	 * appendData(d); 
	 */
	this.appendData = function(d) {
		if (this.selectedIndex < 0) return false;
		
		var pos = this.pos() + this.skip(0, this.pos());
		
		this.datas[this.selectedIndex] = this.data().substr(0, pos) + d + this.data().substr(pos);
		
		this.datasPos[this.selectedIndex] += (this.allowsFormatting[this.selectedIndex]) ? d.clean().length : d.length;
		
		return true;
	};
	
	/**
	 * removeData(i); 
	 */
	this.removeData = function(i) {
		if (this.selectedIndex < 0) return false;
		
		if (this.datas[this.selectedIndex].length < i)
			i = this.datas[this.selectedIndex].length;
		
		if (this.pos() == 0)
			return false;
			
		var pos = this.pos() + this.skip(0, this.pos());
			
		this.datas[this.selectedIndex] = this.data().substr(0, pos - i) + this.data().substr(pos);
		this.datasPos[this.selectedIndex] -= i;
		
		return true;
	};
	
	/** Navigating the data **/
	/**
	 * skip(base, offset); 
	 * Returns the number of characters belong to a tag when progressing 'i' characters either forward or backward.
	 */
	this.skip = function(base, offset) {
		if (this.selectedIndex < 0) return 0;
		
		if (!this.allowsFormatting[this.selectedIndex]) return 0;
		if (offset < 0) return 0;
		
		var skip = 0;
		var i = 0;
		while (base + skip < this.data().length && base < offset) {
			if (this.data()[base + skip + i] == '<') {
				i = 1;
				
				while(this.data()[base + skip + i++] != '>'); /* loop until the tag is closed */
				
				skip += i - 1;
				i = 0;
			} else
				base++;
		}
		
		if (this.data()[base + skip] == '>')
			skip--;
		
		/*if (this.data()[base + skip] == '<')
			return this.skip(base, offset + 1);
		else*/
			return skip;
	}
	
	/**
	 * move(i); 
	 */
	this.move = function(i) {
		if (this.selectedIndex < 0) return false;
		
		var data = null;
		
		/* Formatting Allowed */
		if (this.allowsFormatting[this.selectedIndex])
			data = this.data().clean();
		else
			data = this.data();
		
		/* Boundary checking */
		if (this.pos() + i < 0)
			i = 0 - this.pos();
		else if (this.pos() + i > data.length)
			i = data.length - this.pos();
			
		if (i == 0) return false;
		
		/* If there's a tag ahead of us and we're moving one space, let's make some space */
		if (this.allowsFormatting[this.selectedIndex]) {
			if (i == 1 && this.data()[this.pos() + 1] == '<') {
				var data = this.data().substr(0, this.pos() + 1) + ' ' + this.data().substr(this.pos() + 1);
				this.setData(data);
			}
		}
		
		this.datasPos[this.selectedIndex] += i;
		return true;
	};
	
	/**
	 * seek(i); 
	 */
	this.seek = function(i) {
		if (this.selectedIndex < 0) return false;
		
		var diff = i - this.pos();
		
		return this.move(diff);
	};
	
	/** Propagating data changes **/
	/**
	 * refreshSpecificInput(inputIndex, shouldNotify = true); 
	 */
	this.refreshSpecific = function(i, shouldNotify) {
		if (i < 0) return false;
		
		if (shouldNotify == null) shouldNotify = true;
		
		var hiddenSpace = '';
		
		var data = this.datas[i];
		var dataLength = data.length;
		var pos = this.datasPos[i] + data.substr(0, this.datasPos[i]).ediff();
		
		if (this.allowsFormatting[i]) {
			 dataLength = data.clean().length;
			 pos = this.datasPos[i] + this.skip(0, this.datasPos[i]);
		} else
			data = data.equivalent();
		
		/* hiddenSpace inserted at current location */
		if (this.selectedIndex == i) {
			if (this.datasPos[i] >= dataLength || data[pos] == '\n' || data[pos] == '<') {
				hiddenSpace = '&nbsp;';
				data = data.substr(0, pos) + hiddenSpace + data.substr(pos);
			}
		
			var cursorLen = 1;
			
			if (hiddenSpace != '') cursorLen = hiddenSpace.length;
			else if (data[pos]) cursorLen += (this.allowsFormatting[i]) ? this.datas[i].clean()[this.datasPos[i]].cdiff() : this.datas[i][this.datasPos[i]].ediff();
		
			if (!this._isBlinking) {
				var cursorColor = document.getElementById('paper-frame').backgroundColor;
				var cursorBackColor = new Color(cursorColor).invertColor().hex;
				console.log("Cursor: " + cursorColor + ", Bg: " + cursorBackColor);

				data = data.substr(0, pos) + data.substr(pos, cursorLen).safewrap('<span style="margin-left: -2px; margin-right: -2px; padding-left: 2px; padding-right: 2px; color: ' + cursorColor + '; background-color: ' + cursorBackColor + ';">$0</span>') + data.substr(pos + cursorLen);
			} /*else if (hiddenSpace data[pos] == '\n' || data[pos] == '>')
				data = data.substr(0, pos) + ' ' + data.substr(pos);*/
		}
			
		document.getElementById(this.names[i]).innerHTML = data.replace(new RegExp(EscapeString.SPACE, 'g'), ' ');
		
		/* Callback */
		if (shouldNotify) {
			this.invokeCallback(this.CallbackIntent.REFRESHED, i);
		}
	};
	
	/**
	 * refresh(shouldNotify = true); 
	 */
	this.refresh = function(shouldNotify) {
		if (this.selectedIndex < 0) return false;
		
		if (shouldNotify == null) shouldNotify = true;
		
		this.refreshSpecific(this.selectedIndex, shouldNotify);
	};
	
	/**
	 * refreshAll(shouldNotify = true); 
	 */
	this.refreshAll = function(shouldNotify) {
		if (shouldNotify == null) shouldNotify = true;
		
		for (var i = 0; i < this.names.length; i++)
			this.refreshSpecific(i, shouldNotify);	
	};
	
	/** Callbacks **/
	/**
	 * setCallback(func);
	 * Callbacks must conform to callback(Input.CallbackIntent, String inputName);
	 */
	this.setCallback = function(func) {
		this.callback = func;
	};
	
	/**
	 * invokeCallback(intent, i); 
	 */
	this.invokeCallback = function(intent, i) {
		var name = "null";
		if (i >= 0) name = this.names[i];
		
		if (this.callback)
			this.callback(intent, name);
	};
	
	/** Initialize **/
	for (var i = 0; i < this.count(); i++) {
		if (document.getElementById(this.names[i]) == null) {
			alert("Input Object created prematurely. Input elements are null.");
			break;
		}
		
		this.select(i);
		this.setData(String(document.getElementById(this.names[i]).innerHTML.replace('    ', '\t')));
	}
	
	/* Blinker */
	blinker = function (callback) {
		callback._isBlinking = !callback._isBlinking;
		callback.refresh(false);
	}
	setInterval(blinker, 500, this);
}
