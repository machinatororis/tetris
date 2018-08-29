/// <reference path="../../base.d.ts" />

namespace flash.events
{
	
	/**
	 * An UncaughtErrorEvent object is dispatched by an instance of the UncaughtErrorEvents class when an uncaught error occurs. 
	 * An uncaught error happens when an error is thrown outside of any try..catch blocks or when an ErrorEvent object is dispatched with 
	 * no registered listeners. The uncaught error event functionality is often described as a "global error handler."
	 * The UncaughtErrorEvents object that dispatches the event is associated with either a LoaderInfo object or a Loader object. 
	 * Use the following properties to access an UncaughtErrorEvents instance:
	 * 
	 * LoaderInfo.uncaughtErrorEvents: to detect uncaught errors in code defined in the same SWF.
	 * Loader.uncaughtErrorEvents: to detect uncaught errors in code defined in the SWF loaded by a Loader object.
	 * When an uncaughtError event happens, even if the event is handled, execution does not continue in the call stack that caused the error.
	 * If the error is a synchronous error, any code remaining in the function where the error happened is not executed. Consequently, 
	 * it is likely that when an uncaught error event happens, your application is in an unstable state. Since there can be many causes 
	 * for an uncaught error, it is impossible to predict what functionality is available. For example, your application may be able 
	 * to execute network operations or file operations. However, those operations aren't necessarily available.
	 * 
	 * When one SWF loads another, uncaughtError events bubble down and up again through the LoaderInfo heirarchy. 
	 * For example, suppose A.swf loads B.swf using a Loader instance. If an uncaught error occurs in B.swf, an uncaughtError event is 
	 * dispatched to LoaderInfo and Loader objects in the following sequence:
	 * 
	 * (Capture phase) A.swf's LoaderInfo
	 * (Capture phase) Loader in A.swf
	 * (Target phase) B.swf's LoaderInfo
	 * (Bubble phase) Loader in A.swf
	 * (Bubble phase) A.swf's LoaderInfo
	 * A Loader object's uncaughtErrorEvents property never dispatches an uncaughtErrorEvent in the target phase. 
	 * It only dispatches the event in the capture and bubbling phases.
	 * 
	 * As with other event bubbling, calling stopPropagation() or stopImmediatePropagation() stops the event from being dispatched 
	 * to any other listeners, with one important difference. A Loader object's UncaughtErrorEvents object is treated as a pair with 
	 * the loaded SWF's LoaderInfo.uncaughtErrorEvents object for event propagation purposes. If a listener registered with one of 
	 * those objects calls the stopPropagation() method, events are still dispatched to other listeners registered with that 
	 * UncaughtErrorEvents object and to listeners registered with its partner UncaughtErrorEvents object before event propagation ends. 
	 * The stopImmediatePropagation() method still prevents events from being dispatched to all additional listeners.
	 * 
	 * When content is running in a debugger version of the runtime, such as the debugger version of Flash Player or the 
	 * AIR Debug Launcher (ADL), an uncaught error dialog appears when an uncaught error happens. For those runtime versions, 
	 * the error dialog appears even when a listener is registered for the uncaughtError event. To prevent the dialog from appearing in 
	 * that situation, call the UncaughtErrorEvent object's preventDefault() method.
	 * 
	 * If the content loaded by a Loader object is an AVM1 (ActionScript 2) SWF file, uncaught errors in the AVM1 SWF file do not result in 
	 * an uncaughtError event. In addition, JavaScript errors in HTML content loaded in an HTMLLoader object (including a Flex HTML control) 
	 * do not result in an uncaughtError event.
	 * @author pkulikov
	 */
	export  class UncaughtErrorEvent extends ErrorEvent
	{
		/**
		 * Defines the value of the type property of an uncaughtError event object. 
		 */		
		public static UNCAUGHT_ERROR : string = "uncaughtError";
		
		/**
		 * Helpers
		 */		
		private _error:any; // Error || ErrorEvent
		
		/**
		 * Creates an UncaughtErrorEvent object that contains information about an uncaughtError event. 
		 * @param type
		 * @param bubbles
		 * @param cancelable
		 * @param error_in
		 * 
		 */		
		constructor(type:string, bubbles:boolean = true, cancelable:boolean = true, error_in:any = null)
		{
			/**/ type = as(type, 'String'); bubbles = Boolean(bubbles); cancelable = Boolean(cancelable);
			/**/ this._error === void 0 && (this._error = undefined);
			super(type, bubbles, cancelable, error_in.message || error_in.text);
			this._error = error_in;
		}
		
		/**
		 * The error object associated with the uncaught error. 
		 * @return 
		 * 
		 */		
		public get error () : any
		{
			return this._error;
		}
	}	
}