<?
/*  css:Word
 * 
 *  Class-File.php
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

class FileAction {
	const Open = 'open';
	const Save = 'save';
}
								   
class FileError {
	const MissingPayload = 'Save action is missing payload.';
	const MissingFile	 = 'The file does not exist.';
	const OpenError 	 = 'Unable to open file.';
	const SaveError		 = 'Unable to save file.';
}
	
class File {
	public $name;
	
	function __construct($name) {
		$this->name = $name;
	}
	
	function getPayloads() {
		return array( 'html_payload', 'css_payload' );
	}
	
	function getPaths() {
		return array( dirname(__FILE__) . "/../temp/{$this->name}.html.part",
					  dirname(__FILE__) . "/../temp/{$this->name}.css.part" 
					  );	
	}
}

?>