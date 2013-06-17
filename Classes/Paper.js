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
	this.zoom = 0.65;
	this.margin = 16;
	this.width = width || 8.5;
	this.height = height || 11;

	this.paper = document.getElementById('paper-frame');
	this.element = document.getElementById(name);

	this.css = '';
	this.setCSS = function(css) {
		this.css = css;

		/* Apply transformations */
		css = css.replace(/body \{/g, '.paper {');
		css = css.replace(/html \{/g, '.paper-container {');

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
	this.setPaperHeight = function(h) {
		this.paper.style.height = h + 'px';	
		this.paperHeight = h;
	};

	this.paperWidth = 0;
	this.setPaperWidth = function(w) {
		this.paper.style.width = w + 'px';	
		this.paperWidth = w;
	};

	this.resize = function(e) {
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
		
		var screenWidth = document.getElementById('right-pane').clientWidth;
		
		/* Resize paper to aspect-ratio */
		this.setPaperWidth(screenWidth * this.zoom);

		/* screen width = (paper width / paper height) * screen height */
		/* screen height = screen width * (paper height / paper width) */
		this.setPaperHeight(screenWidth * (this.height / this.width) * this.zoom);
		
		console.log('8.5" x 11" : Width: ' + this.paperWidth + 'px, Height: ' + this.paperHeight + 'px');
		console.log('Refreshing css...');
		this.setCSS(this.css);
	}
	window.addEventListener('resize', this.resize.bind(this));
	this.resize();
}
