/*  css:Word
 * 
 *  File.js
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

/* File Object */
File.Action = {
	SAVE : 'save',
	OPEN : 'open',
};

function File(obj, callback) {	
	this.ajax = null;
	
	var action = obj.action;
	
	/**
	 * callback(jsonObject);
	 */
	this.callback = callback;
	
	/* Choose an HTTP Request method */
	var requestMethod = (action == File.Action.SAVE) ? requestMethod = Ajax.Method.POST : Ajax.Method.GET;
	
	/* Compile params */
	var getParams = [];
	var postParams = [];
	
	/* Action is always sent through GET */
	getParams.push('action=' + obj.action);
	
	for (var key in obj) {
		if (key == 'action') continue;
		
		if (action == File.Action.SAVE)
			postParams.push(key + '=' + obj[key]);
		else
			getParams.push(key + '=' + obj[key]);
	}
	
	/* Connect */
	var self = this;
	this.ajax = new Ajax(requestMethod, 'Sources/File.php?' + getParams.join('&'), (postParams.length > 0) ? postParams.join('&') : null, function(ajax) {
		if (ajax.readyState == Ajax.State.READY) {
			var obj = JSON.parse(ajax.responseText);
			
			self.callback(obj);
		}
	});
}

/**
 * File.Save(elementId, payload);
 */
File.Save = function (name, payload) {
	if (payload == null) return;
	
	var fileObj = { "action"  		: File.Action.SAVE,
					"file"	  		: name,
					"html_payload"  : payload.html,
					"css_payload"   : payload.css };
					
	console.log("HTML Payload: " + payload.html);
	
	new File(fileObj, function(obj) {
		console.log("Object: ", obj);
		document.getElementById('tools-output').innerHTML = obj.message;
	});
}

/**
 * File.Open(elementId, callback);
 *  --> callback(payload);
 */
File.Open = function (name, callback) {
	if (callback == null) return;
	
	var fileObj = { "action"  : File.Action.OPEN,
					"file"	  : name };
	
	new File(fileObj, function(obj) {
		if (obj.html_payload != null) obj.html_payload = obj.html_payload;
		if (obj.css_payload != null) obj.css_payload = obj.css_payload;
		
		callback(new Payload(obj.html_payload, obj.css_payload));
	});
}