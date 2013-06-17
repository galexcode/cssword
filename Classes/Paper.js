/**  
 *  Paper.js
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

function Paper(name, width, height) {
	if (!name) return;
	this.scale = new Scale(this);
	this.margin = 16;
	this.width = width || 8.5;
	this.height = height || 11;
	this.renderHeight = 1280;
	this.renderWidth = this.renderHeight * (this.width / this.height);

	this.container = document.getElementById('paper-container');
	this.paper = document.getElementById('paper-frame');
	this.element = document.getElementById(name);

	this.zoom = 0.65;
	this.setZoom = function(zoom) {
		this.zoom = zoom;
		this.resize();
	};

	this.css = '';
	this.setCSS = function(css) {
		this.css = css;

		/* Apply transformations */
		css = css.replace(/body \{/g, '.paper {');
		css = css.replace(/html \{/g, '.paper-frame {');

		/* Convert all points to pixels */
		var points = css.match(/[\d\.]+\s*(pt|in)/gi);
		if (points) {
			for (var i = 0; i < points.length; i++) {
				var match = points[i].match(/([\d\.]+)(\s*)(pt|in)/i);
				var n = match[1]; 
				var space = match[2]; 
				var unit = match[3]; 
				var pixel = 0;
				if (unit == 'pt')
					pixel = this.scale.pointToPixel(n);
				else if (unit == 'in')
					pixel = this.scale.inchToPixel(n);
				/*pixel = Math.floor(pixel);*/

				css = css.replace(new RegExp(n + space + unit, 'g'), pixel + 'px');
				console.log('Converted', n + space + unit, 'to', pixel + 'px');
			}
		}
	
		/* Modify CSS Style */
		document.getElementById('parent-css').innerHTML = css;
	}.bind(this);

	this.setHTML = function(html) {
		this.element.innerHTML = html.replace(/\n/g, '');	
	}.bind(this);

	this.paperHeight = 0;
	this.paperWidth = 0;
	this.setPaperSize = function(w, h) {
		this.paperWidth = w;
		this.paperHeight = h;

		this.container.style.height = h + 'px';
		this.container.style.width = w + 'px';

		this.paper.style.height = this.renderHeight + 'px';
		this.paper.style.width = this.renderWidth + 'px';

		var scale = 'scale(' + h / this.renderHeight + ')';
		if (this.paper.style.webkitTransform != null) {
			this.paper.style.webkitTransform = scale;
			this.paper.style.webkitTransformOrigin = 'top left';
		} else if (this.paper.style.MozTransform != null) {
			this.paper.style.MozTransform = scale;
			this.paper.style.MozTransformOrigin = 'top left';
		} else if (this.paper.style.msTransform != null) {
			this.paper.style.msTransform = scale;
			this.paper.style.msTransformOrigin = 'top left';
		} else if (this.paper.style.OTransform != null) {
			this.paper.style.OTransform = scale;
			this.paper.style.OTransformOrigin = 'top left';
		} else if (this.paper.style.transform != null) {
			this.paper.style.transform = scale;
			this.paper.style.transformOrigin = 'top left';
		}

	};

	this.resize = function() {
		var rules = null;
		/* Resize page to screen window */
		if (document.styleSheets[0].cssRules)
			rules = document.styleSheets[0].cssRules;
		else if (document.styleSheets[0].rules)
			rules = document.styleSheets[0].rules;
		
		var screenHeight = document.body.clientHeight;
		for (var key in rules) {
			if (rules[key].selectorText == '.max-height') {
				rules[key].style.height = screenHeight + 'px';
			}
		}
		
		/* Resize paper-container to aspect-ratio */
		var screenWidth = document.getElementById('right-pane').clientWidth * this.zoom;
		/* screen height = screen width * (paper height / paper width) */
		var screenHeight = screenWidth * (this.height / this.width);
		
		this.setPaperSize(screenWidth, screenHeight);
		
		console.log('8.5" x 11" : Width: ' + this.paperWidth + 'px, Height: ' + this.paperHeight + 'px');
	}
	window.addEventListener('resize', this.resize.bind(this));
	this.resize();
}
