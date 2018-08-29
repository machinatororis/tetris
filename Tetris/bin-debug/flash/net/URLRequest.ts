/// <reference path="../../base.d.ts" />

namespace flash.net
{
	
	/**
	 * The URLRequest class captures all of the information in a single HTTP request. URLRequest objects are passed to the load() 
	 * methods of the Loader, URLStream, and URLLoader classes, and to other loading operations, to initiate URL downloads. 
	 * They are also passed to the upload() and download() methods of the FileReference class.
	 * A SWF file in the local-with-filesystem sandbox may not load data from, or provide data to, a resource that is in the network sandbox.
	 * 
	 * By default, the calling SWF file and the URL you load must be in the same domain. For example, a SWF file at www.adobe.com 
	 * can load data only from sources that are also at www.adobe.com. To load data from a different domain, 
	 * place a URL policy file on the server hosting the data.
	 * 
	 * However, in Adobe AIR, content in the application security sandbox (content installed with the AIR application) is not restricted by 
	 * these security limitations. For content running in Adobe AIR, files in the application security sandbox can access URLs using 
	 * any of the following URL schemes:
	 * 
	 * http and https
	 * file
	 * app-storage
	 * app
	 * Content running in Adobe AIR that is not in the application security sandbox observes the same restrictions as 
	 * content running in the browser (in Flash Player), and loading is governed by the content's domain and any permissions granted in 
	 * URL policy files.
	 * 
	 * Note: App Transport Security is being introduced from Apple in iOS9, which doesn’t allow unsecure connections 
	 * between App and Web services. Due to this change all the connections which are made to Unsecure web sites via Loader, 
	 * URLLoader will discontinue and not work due to App Transport Security. Please specify exceptions to the default behaviour 
	 * by adding keys to Info.plist in your app. 
	 * @author pkulikov
	 * 
	 */	
	export  class URLRequest
	{
		/**
		 * Helpers 
		 */			
		private _url : string = null;
		private _method : string = null;
		private _data : any = null;
		private _contentType : string = null;
		private _headers : any[] = null;
		
		/**
		 * Creates a URLRequest object. 
		 * @param url
		 * 
		 */			
		constructor (url : string = null)
		{
			/**/ url = as(url, 'String');
			if (url != null)
			{
				this.url = url;
			}
			this.requestHeaders = [];
		}
		
		/**
		 * The URL to be requested. 
		 * @return 
		 * 
		 */		
		public get url() : string { return this._url; }
		public set url(value:string) { /**/ value = as(value, 'String'); this._url = value; }
		
		/**
		 * An object containing data to be transmitted with the URL request. 
		 * @return 
		 * 
		 */		
		public get data() : any { return this._data; }
		public set data(value:any) {
			this._data = value;
		}
		
		/**
		 * Controls the HTTP form submission method. 
		 * @return 
		 * 
		 */		
		public get method() : string { return this._method; }
		public set method(value:string)
		{
			/**/ value = as(value, 'String');
			this._method = value;
		}
		
		/**
		 * The MIME content type of the content in the the data property. 
		 * @return 
		 * 
		 */		
		public get contentType() : string { return this._contentType; }
		public set contentType(value:string) {
			/**/ value = as(value, 'String');
			this._contentType = value;
		}
		
		/**
		 * The array of HTTP request headers to be appended to the HTTP request. 
		 * @return 
		 * 
		 */		
		public get requestHeaders() : any[] { return this._headers; }/*;*/
		public set requestHeaders(value:any[])
		{
			/**/ value = strict(value, Array);
			this._headers = value;
		}
		
		/**
		 * A string that uniquely identifies the signed Adobe platform component to be stored to (or retrieved from) the Flash Player cache. 
		 * @return 
		 * 
		 */		
		public get digest() : string { return null; }
		public set digest(param1:string){/**/ param1 = as(param1, 'String');}
		
		/**
		 * Allows substitution of a redirected URL from a source URLRequest for some portion of the URL in a new URLRequest. 
		 * @param param1
		 * @param param2
		 * @param param3
		 * @param param4
		 * 
		 */		
		public useRedirectedURL(param1:URLRequest, param2:boolean = false, param3:any = null, param4:string = null) : void{/**/ param1 = strict(param1, URLRequest); param2 = Boolean(param2); param4 = as(param4, 'String');}
	}

}