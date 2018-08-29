
namespace flash.utils
{
	
	/**
	 * Cancels a specified setInterval() call. 
	 */	
	export  function clearInterval(id:number):void
	{
		/**/ id = ((id) >>> 0);
		window.clearInterval(id);
	}
}