/// <reference path="../../base.d.ts" />
/// <reference path="../media/Sound.ts" />
/// <reference path="../display/Stage.ts" />

namespace flash.system
{
	
	export import Stage = flash.display.Stage;
	export import Sound = flash.media.Sound;
	
	
	/**
	 * The Capabilities class provides properties that describe the system and runtime that are hosting the application. 
	 * For example, a mobile phone's screen might be 100 square pixels, black and white, whereas a PC screen might be 1000 square pixels, 
	 * color. By using the Capabilities class to determine what capabilities the client has, you can provide appropriate content to as many 
	 * users as possible. When you know the device's capabilities, you can tell the server to send the appropriate SWF files or tell the 
	 * SWF file to alter its presentation.
	 * 
	 * Do not use Capabilities.os or Capabilities.manufacturer to determine a capability based on the operating system. 
	 * Basing a capability on the operating system is a bad idea, since it can lead to problems if an application does not consider all 
	 * potential target operating systems. Instead, use the property corresponding to the capability for which you are testing.
	 * 
	 * There is also a WD server string that specifies whether windowless mode is disabled. Windowless mode can be disabled in 
	 * Flash Player due to incompatibility with the web browser or to a user setting in the mms.cfg file. 
	 * There is no corresponding Capabilities property.
	 * 
	 * All properties of the Capabilities class are read-only.
	 *   
	 * @author pkulikov
	 * 
	 */	
	export  class Capabilities
	{
		/**
		 * Constructor
		 */		
		constructor()
		{
			throw new Error('Abstract class error');
		}
		
		/**
		 * Specifies whether the Flash runtime is embedded in a PDF file that is open in Acrobat 9.0 or higher (true) or not (false).
		 * @return 
		 * 
		 */		
		public static get isEmbeddedInAcrobat():boolean  { return false; }

		/**
		 * Specifies whether the system supports (true) or does not support (false) embedded video.
		 * @return 
		 * 
		 */		
		public static get hasEmbeddedVideo():boolean  { return false; }

		/**
		 * Specifies whether the system has audio capabilities.
		 * @return 
		 * 
		 */		
		public static get hasAudio():boolean
		{
			return Sound.__getCtx() != null;
		}

		/**
		 * Specifies whether access to the user's camera and microphone has been administratively prohibited (true) or allowed (false).
		 * @return 
		 * 
		 */		
		public static get avHardwareDisable():boolean  { return false; }

		/**
		 * Specifies whether the system supports (true) or does not support (false) communication with accessibility aids.
		 * @return 
		 * 
		 */		
		public static get hasAccessibility():boolean  { return false; }

		/**
		 * Specifies whether the system can (true) or cannot (false) encode an audio stream, such as that coming from a microphone.
		 * @return 
		 * 
		 */		
		public static get hasAudioEncoder():boolean  { return Capabilities.hasMP3; }

		/**
		 * Specifies whether the system does (true) or does not (false) have an MP3 decoder.
		 * @return 
		 * 
		 */		
		public static get hasMP3():boolean  { return Capabilities.hasAudio; }

		/**
		 * Specifies whether the system does (true) or does not (false) support printing.
		 * @return 
		 * 
		 */		
		public static get hasPrinting():boolean
		{
			return 'print' in window;
		}

		/**
		 * Specifies whether the system does (true) or does not (false) support the development of screen broadcast applications to be 
		 * run through Flash Media Server.
		 * @return 
		 * 
		 */		
		public static get hasScreenBroadcast():boolean  { return false; }

		/**
		 * Specifies whether the system does (true) or does not (false) support the playback of screen broadcast applications that are 
		 * being run through Flash Media Server.
		 * @return 
		 * 
		 */		
		public static get hasScreenPlayback():boolean  { return false; }

		/**
		 * Specifies whether the system can (true) or cannot (false) play streaming audio.
		 * @return 
		 * 
		 */		
		public static get hasStreamingAudio():boolean  { return false; }

		/**
		 * Specifies whether the system can (true) or cannot (false) play streaming video.
		 * @return 
		 * 
		 */		
		public static get hasStreamingVideo():boolean  { return false; }

		/**
		 * Specifies whether the system can (true) or cannot (false) encode a video stream, such as that coming from a web camera.
		 * @return 
		 * 
		 */		
		public static get hasVideoEncoder():boolean  { return false; }

		/**
		 * Specifies whether the system is a special debugging version (true) or an officially released version (false).
		 * @return 
		 * 
		 */		
		public static get isDebugger():boolean
		{
			return !window.asc.release || (window.location || '').search.substr(1).indexOf('debug=true') >= 0;
		}

		/**
		 * Specifies whether read access to the user's hard disk has been administratively prohibited (true) or allowed (false).
		 * @return 
		 * 
		 */		
		public static get localFileReadDisable():boolean  { return false; }

		/**
		 * Specifies the language code of the system on which the content is running.
		 * @return 
		 * 
		 */		
		public static get language():string
		{
			return 'languages' in navigator && navigator.languages.length > 0 ? 
				navigator.languages[0] : 
				navigator.language || 
				navigator.userLanguage || 
				'en';
		}
		
		/**
		 * An array of strings that contain information about the user's preferred user interface languages, 
		 * as set through the operating system.
		 * @return 
		 * 
		 */		
		public static get languages():any[]
		{
			var list:any[] =  strict('languages' in navigator ? navigator['languages'] : [], Array);
			
			if (!list.length && Capabilities.language) {
				
				list.push(Capabilities.language);
				
			}
			
			return list;
		}

		/**
		 * Specifies the manufacturer of the running version of Flash Player or the AIR runtime, in the format "Adobe OSName".
		 * @return 
		 * 
		 */		
		public static get manufacturer():string
		{
			return 'ASCJS';
		}

		/**
		 * Specifies the current operating system.
		 * @return 
		 * 
		 */		
		public static get os():string
		{
			var js = Capabilities.__getJS();
			var v = js.os;
			
			if (js.osVersion != '-') {
				
				v += ' ' + js.osVersion;
				
			}
			
			return v;
		}
		
		/**
		 * Specifies the current browser.
		 * @return 
		 * 
		 */		
		public static get browser():string
		{
			return Capabilities.__getJS().browser;
		}
		
		/**
		 * Specifies the current CPU architecture.
		 * @return 
		 * 
		 */		
		public static get cpuArchitecture():string
		{
			return null;
		}

		/**
		 * Specifies the type of runtime environment.
		 * @return 
		 * 
		 */		
		public static get playerType():string
		{
			return 'PlugIn';
		}

		/**
		 * A URL-encoded string that specifies values for each Capabilities property.
		 * @return 
		 * 
		 */		
		public static get serverString():string  { return null; }

		/**
		 * Specifies the Flash Player or Adobe® AIR® platform and version information.
		 * @return 
		 * 
		 */		
		public static get version():string
		{
			var js = Capabilities.__getJS();
			var v = js.browserVersion;
			var tmp = v.split('.');
			
			if (tmp.length > 2) {
				
				tmp.length = 2;
				
			}
			
			if (tmp.length > 1 && tmp[1].length > 1) {
				
				tmp[1] = tmp[1].substr(0, 1);
				
			}
			
			return tmp.join('.');
		}
		
		/**
		 * Specifies whether the system is a mobile device (true) or an pc device (false).
		 * @return 
		 * 
		 */		
		public static get isMobile():boolean
		{
			return Capabilities.__getJS().mobile;
		}
		
		/**
		 * Default system font family
		 * @return 
		 * 
		 */		
		public static get systemFontFamily():string
		{
			return Capabilities.__getJS().font;
		}
		
		/**
		 * Specifies whether the cookies is available (true) or not (false).
		 * @return 
		 * 
		 */		
		public static get isCookieEnabled():boolean
		{
			return Capabilities.__getJS().cookies;
		}

		/**
		 * Specifies the screen color.
		 * @return 
		 * 
		 */		
		public static get screenColor():string  { return null; }

		/**
		 * Specifies the pixel aspect ratio of the screen.
		 * @return 
		 * 
		 */		
		public static get pixelAspectRatio():number { return 1; }

		/**
		 * Specifies the dots-per-inch (dpi) resolution of the screen, in pixels.
		 * @return 
		 * 
		 */		
		public static get screenDPI():number
		{
			var match = window.matchMedia;
			if (typeof match == 'function' && match('(min-resolution: 10dpi)').matches) {
				
				for (var i = 768; i > 0 && !match('(min-resolution: ' + (i|0) + 'dpi)').matches; i /= 2) {  }
				for (var j = i; j < i * 2 && match('(min-resolution: ' + ((j+1)|0) + 'dpi)').matches; j++) {  }
				
				if (Capabilities.isMobile) {
					
					return j;
					
				} else {
					
					return j / Capabilities.__getPixelAspectRatio();
					
				}
				
			}
			
			return 96;
		}

		/**
		 * Specifies the maximum horizontal resolution of the screen.
		 * @return 
		 * 
		 */		
		public static get screenResolutionX():number
		{
			var s = Stage.sCurrent;
			if (s && s.__isNeedFixedOrientationCalc()) {
				
				return Capabilities.__getScreenResolutionY();
				
			}
			
			return Capabilities.__getScreenResolutionX();
		}

		/**
		 * Specifies the maximum vertical resolution of the screen.
		 * @return 
		 * 
		 */		
		public static get screenResolutionY():number
		{
			var s = Stage.sCurrent;
			if (s && s.__isNeedFixedOrientationCalc()) {
				
				return Capabilities.__getScreenResolutionX();
				
			}
			
			return Capabilities.__getScreenResolutionY();
		}
		
		/**
		 * Specifies the type of touchscreen supported, if any.
		 * @return 
		 * 
		 */		
		public static get touchscreenType():string
		{
			return ('ontouchstart' in window || ('msMaxTouchPoints' in navigator && navigator['msMaxTouchPoints'] > 0)) ?
				'finger' : 'none';
		}

		/**
		 * Specifies whether the system does (true) or does not (false) have an input method editor (IME) installed.
		 * @return 
		 * 
		 */		
		public static get hasIME():boolean  { return false; }

		/**
		 * Specifies whether the system supports native SSL sockets through NetConnection (true) or does not (false).
		 * @return 
		 * 
		 */		
		public static get hasTLS():boolean  { return false; }

		/**
		 * Retrieves the highest H.264 Level IDC that the client hardware supports.
		 * @return 
		 * 
		 */		
		public static get maxLevelIDC():string  { return null; }

		/**
		 * Specifies whether the system supports running 32-bit processes.
		 * @return 
		 * 
		 */		
		public static get supports32BitProcesses():boolean  { return false; }

		/**
		 * Specifies whether the system supports running 64-bit processes.
		 * @return 
		 * 
		 */		
		public static get supports64BitProcesses():boolean  { return false; }

		/**
		 * 
		 * @param param1
		 * @return 
		 * 
		 */		
		public static hasMultiChannelAudio(param1:string):boolean  { /**/ param1 = as(param1, 'String'); return false; }
		
		/**
		 * Specifies the maximum horizontal resolution of the screen.
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected static __getScreenResolutionX():number
		{
			var sw = window.screen.width, sh = window.screen.height;
			var ow = window.outerWidth, oh = window.outerHeight;
			
			// screen width / height bug
			var sp = sw / sh, ip = ow / oh;
			var isValid = (sp > 1 && ip > 1) || (sp < 1 && ip < 1);
			if (!isValid) {
				
				// swap
				var tmp = sw;
				sw = sh;
				sh = tmp;
				
			}
			
			// Firefox bug
			// https://bugzilla.mozilla.org/show_bug.cgi?id=1120452
			if (ow > sw) {
				
				sw = ow;
				
			}
			
			if (Capabilities.isMobile) {
				
				return sw * Capabilities.__getPixelAspectRatio();
				
			}
			
			return sw;
		}
		
		/**
		 * Specifies the maximum vertical resolution of the screen.
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected static __getScreenResolutionY():number
		{
			var sw = window.screen.width, sh = window.screen.height;
			var ow = window.outerWidth, oh = window.outerHeight;
			
			// screen width / height bug
			var sp = sw / sh, ip = ow / oh;
			var isValid = (sp > 1 && ip > 1) || (sp < 1 && ip < 1);
			if (!isValid) {
				
				// swap
				var tmp = sw;
				sw = sh;
				sh = tmp;
				
			}
			
			// Firefox bug
			// https://bugzilla.mozilla.org/show_bug.cgi?id=1120452
			if (oh > sh) {
				
				sh = oh;
				
			}
			
			if (Capabilities.isMobile) {
				
				return sh * Capabilities.__getPixelAspectRatio();
				
			}
			
			return sh;
		}
		
		/**
		 * Specifies the pixel aspect ratio of the screen.
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected static __getPixelAspectRatio():number
		{
			if (window.devicePixelRatio > 0) {
				
				return window.devicePixelRatio;
				
			}
			
			return 1.0;
		}
		
		/**
		 * Helpers 
		 */		
		/*[internal]*/ protected static __getJS ():any
		{
			return window.asc.system.Capabilities;
		}
	}
}