/// <reference path="../../base.d.ts" />

namespace flash.net
{
	
	/**
	 * The URLRequestMethod class provides values that specify whether the URLRequest object should use the POST method or 
	 * the GET method when sending data to a server. 
	 * @author pkulikov
	 * 
	 */	
	export  class URLRequestMethod
	{
		/**
		 * Specifies that the URLRequest object is a POST. 
		 */		
		public static POST:string = "POST";
		
		/**
		 * Specifies that the URLRequest object is a GET. 
		 */		
		public static GET:string = "GET";
		
		/**
		 * Specifies that the URLRequest object is a PUT. 
		 */		
		public static PUT:string = "PUT";
		
		/**
		 * Specifies that the URLRequest object is a DELETE. 
		 */		
		public static DELETE:string = "DELETE";
		
		/**
		 * Specifies that the URLRequest object is a HEAD. 
		 */		
		public static HEAD:string = "HEAD";
		
		/**
		 * Specifies that the URLRequest object is OPTIONS. 
		 */		
		public static OPTIONS:string = "OPTIONS";
	}

}