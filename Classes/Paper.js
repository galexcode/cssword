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

function Paper(name) {
	if (!name) return;
	this.element = document.getElementById(name);

	this.setCSS = function(css) {
		/* Apply changes */
		css = css.replace(/body \{/g, '.paper {');
		css = css.replace(/html \{/g, '.paper-container {');
	
		/* Modify CSS Style */
		document.getElementById('parent-css').innerHTML = css;
	}.bind(this);

	this.setHTML = function(html) {
		this.element.innerHTML = html;	
	}.bind(this);

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
		
		/* Resize paper to aspect-ratio */
		var paper = document.getElementById('paper-frame');
		
		var paperHeight = screenHeight - 36;
		paper.style.height = paperHeight + 'px';
		
		/* width = (width / height) * actual height */
		var paperWidth = (8.5/11)*(screenHeight - 36);
		paper.style.width = paperWidth + 'px';
		
		console.log('8.5" x 11" : Height: ' + paperHeight + 'px, Width: ' + paperWidth + 'px');
	}
	window.addEventListener('resize', this.resize);
	this.resize();
}
