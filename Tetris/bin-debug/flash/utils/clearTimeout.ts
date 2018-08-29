
namespace flash.utils
{
	
	/**
	 * Cancels a specified setTimeout() call. 
	 */	
	export  function clearTimeout(id:number):void
	{
		/**/ id = ((id) >>> 0);
		window.clearTimeout(id);
	}
}