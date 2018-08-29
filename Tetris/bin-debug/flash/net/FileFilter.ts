/// <reference path="../../base.d.ts" />

namespace flash.net
{
	
	/**
	 * The FileFilter class is used to indicate what files on the user's system are shown in the file-browsing dialog box that is 
	 * displayed when the FileReference.browse() method, the FileReferenceList.browse() method is called or a browse method of a File, 
	 * FileReference, or FileReferenceList object is called. FileFilter instances are passed as a value for the optional 
	 * typeFilter parameter to the method. If you use a FileFilter instance, extensions and file types that aren't specified in the 
	 * FileFilter instance are filtered out; that is, they are not available to the user for selection. 
	 * If no FileFilter object is passed to the method, all files are shown in the dialog box.
	 * 
	 * @author pkulikov
	 */
	export  class FileFilter
	{
		/**
		 * The description string for the filter. 
		 */		
		public description : string = null;
			
		/**
		 * A list of file extensions. 
		 */		
		public extension : string = null;
			
		/**
		 * A list of Macintosh file types. 
		 */		
		public macType : string = null;
		
		/**
		 * Creates a new FileFilter instance. 
		 * @param description
		 * @param extension
		 * @param macType
		 * 
		 */			
		constructor(description:string, extension:string, macType:string = null)
		{
			/**/ description = as(description, 'String'); extension = as(extension, 'String'); macType = as(macType, 'String');
			this.description = description;
			this.extension = extension;
			this.macType = macType;
		}
	}	
}