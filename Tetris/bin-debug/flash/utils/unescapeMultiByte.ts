
namespace flash.utils
{
	
	/**
	 * Returns an unescaped copy of the input string, which is decoded from either system code page page or UTF-8 depending on 
	 * the value of System.useCodePage. 
	 */	
	export  function unescapeMultiByte(value:string):string
	{
		/**/ value = as(value, 'String');
		return decodeURIComponent(value);
	}
}