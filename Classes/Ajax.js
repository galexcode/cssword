/*  css:Word
 * 
 *  Ajax.js
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

Ajax.State = {
		UNINITIALIZED : 0,
		CONNECTED : 1,
		RECEIVED : 2,
		PROCESSING : 3,
		READY : 4,
	};
	
Ajax.Method = {
		GET : 'GET',
		POST : 'POST',
	};

/* Ajax Object */
function Ajax(method, url, postParams, _callback) {
	this.request = null;
	
	this.method = method;
	this.url = url;
	this.postParams = postParams;
	this.callback = _callback;
	
	/**
	 * this.send();
	 */
	this.send = function(params) {
		this.request.send(params);
	}
	 
	this.construct = function () {
		//Browser Support Code
		try{
			// Opera 8.0+, Firefox, Safari
			this.request = new XMLHttpRequest();
		} catch (e){
			// Internet Explorer Browsers
			try{
				this.request = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try{
					this.request = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e){
					console.log("Unable to create an Ajax object.");
					return false;
				}
			}
		}
		
		/**
		* Example Callback Function:
		* function() {
		*		switch (ajaxRequest.readyState) {
		*			case State.READY:
		*				var response = ajaxRequest.responseText;
		*				console.log('Ajax Response: ' + response);
		*				break;	
		*		}
		* }
		*/
		var callback = this.callback;
		this.request.onreadystatechange = function() {
			callback(this);	
		};
		
		/* Open the connection */
		this.request.open(this.method, this.url, true);
		
		if (this.method == Ajax.Method.POST)
			this.request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		
		this.send(this.postParams);
	}
	
	this.construct();
}