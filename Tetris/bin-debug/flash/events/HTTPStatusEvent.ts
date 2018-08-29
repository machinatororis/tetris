/// <reference path="../../base.d.ts" />

namespace flash.events
{
	
	 /**
	  * The application dispatches HTTPStatusEvent objects when a network request returns an HTTP status code.
	  * HTTPStatusEvent objects are always sent before error or completion events. An HTTPStatusEvent object does not necessarily 
		 * indicate an error condition; it simply reflects the HTTP status code (if any) that is provided by the networking stack. 
		 * Some Flash Player environments may be unable to detect HTTP status codes; a status code of 0 is always reported in these cases.
	  * 
	  * In Flash Player, there is only one type of HTTPStatus event: httpStatus. 
		 * In the AIR runtime, a FileReference, URLLoader, or URLStream can register to listen for an httpResponseStatus, 
		 * which includes responseURL and responseHeaders properties. These properties are undefined in a httpStatus event. 
	  * @author pkulikov
	  * 
	  */	
   export  class HTTPStatusEvent extends Event
   {
			/**
			 * The HTTPStatusEvent.HTTP_STATUS constant defines the value of the type property of a httpStatus event object. 
			 */		 
      public static HTTP_STATUS:string = "httpStatus";
      
			/**
			 * Unlike the httpStatus event, the httpResponseStatus event is delivered before any response data. 
			 */			
      public static HTTP_RESPONSE_STATUS:string = "httpResponseStatus";
      
			/**
			 * Helpers 
			 */			
      private _status:number;
      private _responseHeaders:any[];
      private _responseUrl:string;
      private _redirected:boolean;
      
			/**
			 * Creates an Event object that contains specific information about HTTP status events. 
			 * @param type
			 * @param bubbles
			 * @param cancelable
			 * @param status
			 * @param redirected
			 * 
			 */			
      constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, status:number = 0, redirected:boolean = false)
      {
         /**/ type = as(type, 'String'); bubbles = Boolean(bubbles); cancelable = Boolean(cancelable); status = ((status) >> 0); redirected = Boolean(redirected);
         /**/ this._status === void 0 && (this._status = 0);
         /**/ this._responseHeaders === void 0 && (this._responseHeaders = null);
         /**/ this._responseUrl === void 0 && (this._responseUrl = null);
         /**/ this._redirected === void 0 && (this._redirected = false);
         super(type,bubbles,cancelable);
         this._status = status;
         this._redirected = redirected;
         this._responseHeaders = [];
      }
      
			/**
			 * Creates a copy of the HTTPStatusEvent object and sets the value of each property to match that of the original. 
			 * @return 
			 * 
			 */			
      /*override*/ public clone() : Event
      {
         var result:HTTPStatusEvent = new HTTPStatusEvent(this.type, this.bubbles, this.cancelable, this._status, this._redirected);
         result.responseURL = this.responseURL;
         result.responseHeaders = this.responseHeaders;
         return result;
      }
      
			/**
			 * Returns a string that contains all the properties of the HTTPStatusEvent object. 
			 * @return 
			 * 
			 */			
      /*override*/ public toString() : string
      {
         return this.formatToString("HTTPStatusEvent","type","bubbles","cancelable","eventPhase","status","redirected","responseURL");
      }
      
			/**
			 * The HTTP status code returned by the server. 
			 * @return 
			 * 
			 */			
      public get status() : number
      {
         return this._status;
      }
      
			/**
			 * The URL that the response was returned from. 
			 * @return 
			 * 
			 */			
      public get responseURL() : string { return this._responseUrl; }
      public set responseURL(value:string) { /**/ value = as(value, 'String'); this._responseUrl = value; }
      
			/**
			 * The response headers that the response returned, as an array of URLRequestHeader objects. 
			 * @return 
			 * 
			 */			
      public get responseHeaders() : any[] { return this._responseHeaders; }
      public set responseHeaders(value:any[]) { /**/ value = strict(value, Array); this._responseHeaders = value; }
      
			/**
			 * Indicates whether the request was redirected. 
			 * @return 
			 * 
			 */			
      public get redirected() : boolean { return this._redirected; }
      public set redirected(value:boolean) { /**/ value = Boolean(value); this._redirected = value; }
   }

}