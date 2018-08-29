
namespace flash.utils
{
	
	/**
	 * Runs a function at a specified interval (in milliseconds). 
	 */	
	export  function setInterval(closure:Function, delay:number, ...args):number
	{
		/**/ delay = (+(delay));
		return window.setInterval.apply(null, arguments);
	}
}