namespace flash.utils
{
	
	/**
	 * Used to compute relative time. 
	 */	
	export  function getTimer():number
	{
		return Date.now() - window.asc.startTime;
	}

}