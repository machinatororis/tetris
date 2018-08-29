
namespace flash.utils
{
	
	/**
	 * Returns an escaped copy of the input string encoded as either UTF-8 or system code page, depending on the value of System.useCodePage. 
	 */	
	export  function escapeMultiByte(value:string):string
	{
		/**/ value = as(value, 'String');
		return encodeURIComponent(value);
	}
}