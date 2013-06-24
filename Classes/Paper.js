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

String.prototype.startsWith = function(prefix) {
	    return this.indexOf(prefix) === 0;
}

String.prototype.endsWith = function(suffix) {
	    return this.match(suffix+"$") == suffix;
};

function Paper(name, page, width, height) {
	if (!name) return;
	this.scale = new Scale(this);
	this.margin = 16;
	this.width = width || 8.5;
	this.height = height || 11;
	this.renderWidth = 1000;
	this.renderHeight = this.renderWidth * (this.height / this.width);
	this.page = page || 0;

	this.canvas = document.getElementById(name + '-canvas');
	this.container = document.getElementById(name + '-container'); /* User editable */
	this.render = document.getElementById(name + '-render');
	this.frame = document.getElementById(name + '-frame'); /* User editable */
	this.element = document.getElementById(name); /* User editable */

	this.zoom = 0.9;
	this.setZoom = function(zoom) {
		this.zoom = zoom;
		this.resize();
		this.container.scrollLeft = this.page * this.renderWidth;
	};

	this.marginVertical = 0;
	this.marginHorizontal = 0;
	this.setMargin = function(map) {
		this.marginVertical = 0;
		this.marginHorizontal = 0;

		console.log('start margin');
		for (var i = 0; i < map.length; i++) {
			if (map[i].key.endsWith('-top') ||
			    map[i].key.endsWith('-bottom')) {
				console.log('vertical');
				this.marginVertical += this.scale.toInch(map[i].value, map[i].unit);
			} else {
				console.log('horizontal');
				this.marginHorizontal += this.scale.toInch(map[i].value, map[i].unit);
			}
		}
		console.log('end margin');
	};

	this.fontSize = 12;
	this.setCSS = function(css) {
		/* Apply transformations */
		css = css.replace(/html \{/g, '.paper-container {');
		css = css.replace(/body \{/g, '.paper-frame {');

		/* Isolate .paper-container and .paper-frame */
		var master = new CssMaster(css);
		var classes = master.getClasses('');

		var classMap = new Array();
		for (var i = 0; i < classes.length; i++) {
			var className = classes[i];
			var props = master.getProperties(className);

			if (className == '.paper-container') {

			}

			var classObj = {
				name: className,
				props: props
			};
			classMap.push(classObj);
		}

		/** TODO 
		 * Convert margins to padding in html (container)
		 * Remove padding & margins in body (frame)
		 *
		 * Set marginHorizontal/Vertical to inch values of margins
		 * 	in container.
		 * Then parse all other classes except container to 
		 * convert pt to px. em should automatically scale to 
		 * new px.
		 */

		/* Compile new CSS */
		var css = '';
		for (var i = 0; i < classMap.length; i++) {
			var classObj = classMap[i];
			css += classObj.name + ' {\n';
			for (var j = 0; j < classObj.props.length; j++) {
				css += '    ' + classObj.props[j].name + ': ' + classObj.props[j].value + ';\n';
			}
			css += '}\n';
		}

		/*
		var classes = css.match(/.(paper-container|paper-frame)\s*{[^}]+}/gi);
		if (classes) {
			for (var _i = 0; _i < classes.length; _i++) {
				var _class = classes[_i];
				console.log("Matching class:", _class);
				var temp = _class.match(/^.(paper-container|paper-frame)\s*{/i);
				if (temp && temp.length == 2) {
					var className = temp[1];
					console.log("Class Name:", className);
					switch (className) {
						var margins = css.match(/(padding|margin):\s*([\d\.]+)([^\W\d]+);/i);
						if (margins) {
							console.log("Margins:", margins);
						}
					}
				}
			}
		}
		*/

		/* Convert all points to pixels */
		/*var points = css.match(/[\d\.]+\s*(pt|in)/gi);
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
		}*/

		/* Modify CSS Style */
		document.getElementById('parent-css').innerHTML = css;

		this.renderPaper();
	}.bind(this);

	this.setHTML = function(html) {
		this.element.innerHTML = '<div>' + html.replace(/\n/g, '') + '</div>';
	}.bind(this);

	this.paperHeight = 0;
	this.paperWidth = 0;
	this.renderPaper = function() {
		this.canvas.style.height = this.paperHeight + 'px';
		this.canvas.style.width = this.paperWidth + 'px';
		this.container.style.height = this.paperHeight + 'px';
		this.container.style.height = this.paperHeight + 'px';
		this.render.style.width = this.renderWidth + 'px';
		this.render.style.height = this.renderHeight + 'px';

		var scale = 'scale(' + (this.frame.getBoundingClientRect().width) / (this.renderWidth) + ')';
		var origin = 'left top';
		if (this.render.style.webkitTransform != null) {
			this.render.style.webkitColumnWidth = this.renderWidth + 'px';
			this.render.style.webkitColumnGap = '0px';
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

		this.frame.scrollLeft = this.page * this.frame.getBoundingClientRect().width;
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
		var screenWidth = document.getElementById('right-pane').getBoundingClientRect().width * this.zoom;
		/* screen height = screen width * (paper height / paper width) */
		var screenHeight = screenWidth * (this.height / this.width);
		
		this.setPaperSize(screenWidth, screenHeight);
		
		console.log('8.5" x 11" : Width: ' + this.paperWidth + 'px, Height: ' + this.paperHeight + 'px');
	}
	window.addEventListener('resize', this.resize.bind(this));
	this.resize();
}
