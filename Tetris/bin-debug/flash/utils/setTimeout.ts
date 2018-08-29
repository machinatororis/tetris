
namespace flash.utils
{
	
	/**
	 * Runs a specified function after a specified delay (in milliseconds). 
	 */	
	export  function setTimeout(closure:Function, delay:number, ...args):number
	{
		/**/ delay = (+(delay));
		return window.setTimeout.apply(null, arguments);
	}
}