<?
/*  css:Word
 * 
 *  File.php
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
 *
 **
 *  This REST endpoitn returns a JSON object of the following:
 *
 *  { 	// Classes/File.php
 *   	action: [open/save],
 *		file: [file name],
 *		success: [true/false],
 *		message: (optional message),
 *		error: (optional error message),
 *		payload: (optional payload)
 *	}
*/

require_once(dirname(__FILE__) . '/../Classes/File.php');

$action 	 		= $_GET['action'];

if ($action == FileAction::Open) { /* GET request */
	$file 	 		= $_GET['file'];
}
else if ($action == FileAction::Save) { /* POST request */
	$file	 		= $_POST['file'];
	// html_payload
	// css_payload
}

$json = array( 'action' => $action,
				   'file'   => $file,
				   'success' => false
				  );

if (isset($file) && isset($action)) {
	$file = new File($file);
	
	$paths = $file->getPaths();
	$payloads = $file->getPayloads();
	
	switch ($action) {
		case FileAction::Open: {
				for ($i = 0; $i < count($paths); $i++)) {
					$path = $paths[$i];
					$payload = $payloads[$i];
					
					/* Can't open if it doesn't exist */
					if (!file_exists($path)) {
						$json['error'] = FileError::MissingFile;
						goto print_json;
					}
				
					/* Open the file for reading */
					$fh = fopen($path, 'r');
					if ($fh == FALSE) {
						$json['error'] = FileError::OpenError;
						goto print_json;
					}
					
					/* Get the payload */
					$json[$payload] = base64_encode(fread($fh, filesize($path)));
					fclose($fh);
				}
				
				$json['message'] = "Opened <b>{$file->name}</b>";
			}
			break;
		case FileAction::Save: {
				for ($i = 0; $i < count($paths); $i++)) {
					$path = $paths[$i];
					$payload = $payloads[$i];
					
					/* Can't save if there's nothing to save */
					if (!isset($_POST[$payload])) {
						$json['error'] = FileError::MissingPayload;
						goto print_json;
					}
					
					/* Open the file for writing */
					$fh = fopen($path, 'w');
					if ($fh == FALSE) {
						$json['error'] = FileError::SaveError;
						goto print_json;
					}
					
					/* Write the payload */
					fwrite($fh, base64_decode($_POST[$payload]));
					fclose($fh);
				}
				
				$json['message'] = "Saved <b>{$file->name}</b>";
			}
			break;
		default: {
			$json['error'] = 'Unknown action type.';
			goto print_json;
		}
	}
	
	$json['success'] = true;
}

print_json:
echo json_encode($json);	

?>