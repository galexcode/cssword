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

function getStyleBySelector( selector )
{
	var sheetList = document.styleSheets;
	var ruleList;
	var i, j;

	/* look through stylesheets in reverse order that
	  they appear in the document */
	for (i=sheetList.length-1; i >= 0; i--)
	{
		ruleList = sheetList[i].cssRules;
		for (j=0; j<ruleList.length; j++)
		{
			if (ruleList[j].type == CSSRule.STYLE_RULE && ruleList[j].selectorText == selector)
				return ruleList[j].style;
		}
	}
	return null;
}

function Paper(name, page, width, height) {
	if (!name) return;
	this.scale = new Scale(this);
	this.margin = 16;
	this.width = width || 8.5;
	this.height = height || 11;
	this.renderWidth = 1000;
	this.renderHeight = this.renderWidth * (this.height / this.width);
	this.page = page || 0;

	this.container = document.getElementById(name + '-container');
	this.render = document.getElementById(name + '-render');
	this.frame = document.getElementById(name + '-frame');
	this.element = document.getElementById(name);

	this.zoom = 0.9;
	this.setZoom = function(zoom) {
		this.zoom = zoom;
		this.resize();
		this.container.scrollLeft = this.page * this.renderWidth;
	};

	this.marginVertical = 0;
	this.marginHorizontal = 0;
	this.setCSS = function(css) {
		/* Apply transformations */
		css = css.replace(/html \{/g, '.paper-container {');
		css = css.replace(/body \{/g, '.paper-frame {');

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

		var cssFrame = getStyleBySelector('.paper-frame');
		this.marginVertical = this.marginHorizontal = 0;
		for (var i = 0; i < cssFrame.length; i++) {
			switch (cssFrame[i]) {
				case 'margin-top':
					this.marginVertical += parseFloat(cssFrame.marginTop);
					break;
				case 'margin-bottom':
					this.marginVertical += parseFloat(cssFrame.marginBottom);
					break;
				case 'margin-left':
					this.marginHorizontal += parseFloat(cssFrame.marginLeft);
					break;
				case 'margin-right':
					this.marginHorizontal += parseFloat(cssFrame.marginRight);
					break;
			}
		}

		this.renderPaper();
	}.bind(this);

	this.setHTML = function(html) {
		this.element.innerHTML = '<div>' + html.replace(/\n/g, '') + '</div>';
	}.bind(this);

	this.paperHeight = 0;
	this.paperWidth = 0;
	this.renderPaper = function() {
		this.container.style.height = this.paperHeight + 'px';
		this.container.style.width = this.paperWidth + 'px';
		this.render.style.width = this.renderWidth + 'px';
		this.render.style.height = this.renderHeight + 'px';

		var scale = 'scale(' + this.frame.getBoundingClientRect().width / this.renderWidth + ')';
		var origin = 'left top';
		if (this.render.style.webkitTransform != null) {
			this.render.style.webkitColumnWidth = this.renderWidth + 'px';
			this.render.style.webkitColumnGap = '0px';
			//this.element.style.webkitColumnGap = this.paddingHorizontal + 'px';
			this.render.style.webkitTransform = scale;
			this.render.style.webkitTransformOrigin = origin;
		} else if (this.render.style.MozTransform != null) {
			this.render.style.MozTransform = scale;
			this.render.style.MozTransformOrigin = origin;
		} else if (this.render.style.msTransform != null) {
			this.render.style.msTransform = scale;
			this.render.style.msTransformOrigin = origin;
		} else if (this.render.style.OTransform != null) {
			this.render.style.OTransform = scale;
			this.render.style.OTransformOrigin = origin;
		} else if (this.render.style.transform != null) {
			this.render.style.transform = scale;
			this.render.style.transformOrigin = origin;
		}

		this.frame.scrollLeft = this.page * this.render.clientWidth;
		console.log("paper width, page width", this.render.scrollWidth, this.renderWidth);
	}

	this.setPaperSize = function(w, h) {
		this.paperWidth = w;
		this.paperHeight = h;

		this.renderPaper();
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
		var screenWidth = (document.getElementById('right-pane').clientWidth - 24) * this.zoom;
		/* screen height = screen width * (paper height / paper width) */
		var screenHeight = screenWidth * (this.height / this.width);
		
		this.setPaperSize(screenWidth, screenHeight);
		
		console.log('8.5" x 11" : Width: ' + this.paperWidth + 'px, Height: ' + this.paperHeight + 'px');
	}
	window.addEventListener('resize', this.resize.bind(this));
	this.resize();
}
