/// <reference path="../events/SecurityErrorEvent.ts" />
/// <reference path="../events/IOErrorEvent.ts" />
/// <reference path="../events/Event.ts" />
﻿
namespace flash.net
{
	export import Event = flash.events.Event;
	export import IOErrorEvent = flash.events.IOErrorEvent;
	export import SecurityErrorEvent = flash.events.SecurityErrorEvent;
	

	/**
	 * Sends a URL request to a server, but ignores any response.
	 * 
	 * To examine the server response, use the URLLoader.load() method instead.
	 * 
	 * You cannot connect to commonly reserved ports. For a complete list of blocked ports, 
	 * see "Restricting Networking APIs" in the ActionScript 3.0 Developer's Guide.
	 * 
	 * You can prevent a SWF file from using this method by setting the allowNetworking parameter of the the object and 
	 * embed tags in the HTML page that contains the SWF content.
	 * 
	 * In Flash Player 10 and later, if you use a multipart Content-Type (for example "multipart/form-data") 
	 * that contains an upload (indicated by a "filename" parameter in a "content-disposition" header within the POST body), 
	 * the POST operation is subject to the security rules applied to uploads:
	 * 
	 * The POST operation must be performed in response to a user-initiated action, such as a mouse click or key press.
	 * If the POST operation is cross-domain (the POST target is not on the same server as the SWF file that is sending the POST request),
	 *  the target server must provide a URL policy file that permits cross-domain access.
	 * Also, for any multipart Content-Type, the syntax must be valid (according to the RFC2046 standards). 
	 * If the syntax appears to be invalid, the POST operation is subject to the security rules applied to uploads.
	 * 
	 * For more information related to security, see the Flash Player Developer Center Topic: Security. 
	 */	
	export  function sendToURL(request:URLRequest):void
	{
		/**/ request = strict(request, URLRequest);
		var loader:URLLoader = new URLLoader;
		loader.addEventListener(Event.COMPLETE, finish.__bind(this));
		loader.addEventListener(IOErrorEvent.IO_ERROR, finish.__bind(this));
		loader.addEventListener(SecurityErrorEvent.SECURITY_ERROR, finish.__bind(this));
		try {
			loader.load(request);
		} catch (e) {
			e = window.asc.e2e(e);
			finish.__bind(this)();
		}
		
		function finish (e:Event):void {
			/**/ e = strict(e, Event);
			loader.removeEventListener(Event.COMPLETE, finish.__bind(this));
			loader.removeEventListener(IOErrorEvent.IO_ERROR, finish.__bind(this));
			loader.removeEventListener(SecurityErrorEvent.SECURITY_ERROR, finish.__bind(this));
		}
	}
}