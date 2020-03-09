// Script Version 05.
// This Photoshop Script was authored by Sajeel Khan.
//	Feel free to use, edit, and distribute this Photoshop Script.


var source_folder			=	"~/Desktop/FFOutput";	// Folder that contain full sized images.
var destination_folder		=	source_folder;			// Folder to save thumbnails.
var Convert_to_RGB			=	true;					// Convert Image mode to RGB if set to true.
var Thumbnail_Dimensions	=	300;					// Setting dimensions of Square.
var Thumbnail_Unit			=	"px"					// Setting Unit of Square (in this case "pixel")
var Auto_Contrast			=	true;					// Apply auto contrast if set to true.
var Sharpen					=	true;					// Sharpen image if set to true.
var Save_Quality										// Will Set this variable later.

// Get list of files in source folder as an array.
	var source_folder = Folder(source_folder);
 	if (source_folder != null){
 		var file_list = source_folder.getFiles();
 	}

// Open all the files in Adobe Photoshop.
	var index_number;
	for (index_number = 0; index_number < file_list.length; index_number++) {
		app.open(File(file_list[index_number]));
	}

// While loop makes sure that the script inside it runs as long as there is at least one image open.
// The inside-script ends once all images are closed.
	while (app.documents.length){ 

		doc = app.activeDocument;
		
		// Convert Image mode to RGB if variable Convert_to_RGB is set to true.
			if (Convert_to_RGB == true){
				doc.changeMode(ChangeMode.RGB);
			}

		// crop to a big square, conditionally, based on dimensions
			if (doc.height > doc.width) {
				doc.resizeCanvas(doc.width,doc.width,AnchorPosition.TOPCENTER);
			}
			else {
				doc.resizeCanvas(doc.height,doc.height,AnchorPosition.MIDDLECENTER);
			}

		// Resize image
			doc.resizeImage(UnitValue(Thumbnail_Dimensions,Thumbnail_Unit),null,null,ResampleMethod.BICUBIC);

		// Apply Auto Contrast if variable Auto_Contrast is set to true
			if (Auto_Contrast == true){
				doc.activeLayer.autoContrast();
			}

		// Sharpen image if variable Sharpen is set to true
			if (Sharpen == true){
				doc.activeLayer.applySharpen();
			}

		// our web export options
			var options				=	new ExportOptionsSaveForWeb();
				options.quality		=	70;
				options.format		=	SaveDocumentType.JPEG;
				options.optimized	=	true;


		// Get image name without extension
		// because we will be adding '_t' after image name and before extension name, while saving the thumbnail.
		// I added _t as a reference to the fact that it's a thumbnail.
			var name_with_extension = doc.name;
			var finalDotPosition = name_with_extension.lastIndexOf( "." );
			if ( finalDotPosition > -1 ) {
				var name_without_extension = name_with_extension.substr( 0 , finalDotPosition );
			 }

		// Save Thumbnail
			doc.exportDocument(File(destination_folder+'/'+name_without_extension+'_t.jpg'),ExportType.SAVEFORWEB,options);

		// Close current image without saving and without prompt, so that the original unprocessed image remains intact.
			app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

	}

// Script Version 05.
// This Photoshop Script was authored by Sajeel Khan.
//	Feel free to use, edit, and distribute this Photoshop Script.