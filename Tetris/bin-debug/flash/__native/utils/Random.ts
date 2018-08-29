/// <reference path="../../../base.d.ts" />
/// <reference path="../../utils/getTimer.ts" />

namespace flash.__native.utils
{
		
	export import getTimer = flash.utils.getTimer;
	

	export  class Random
	{
		/** Helper */    
		private static stamp:number = asc.sti(Random,()=>{ Random.stamp = getTimer(); });
		
		/**
		 * Random base.
		 * Attention: seed == 0 will set arbitrary (time)
		 * */
		public static seed(value:number = 0):void
		{
			/**/ value = ((value) >> 0);
			if (value == 0) Random.stamp = getTimer();
			else Random.stamp = value;
		}
		
		/**
		 * from 0 to 32767.
		 * @return 
		 * 
		 */		
		public static short():number
		{
			Random.stamp =(( Random.stamp * 1103515245 + 12345) >> 0);
			return (Random.stamp >> 16) & 0x7fff;
		}
		
		/**
		 * Aka Math.random.
		 * @return 
		 * 
		 */		
		public static random():number
		{
			return Random.short() / 0x7fff;
		}
		
		/**
		 * From min to max
		 * @param min
		 * @param max
		 * @return 
		 * 
		 */		
		public static range(min:number = 0, max:number = 1):number
		{
			/**/ min = (+(min)); max = (+(max));
			return (min + Random.short() % (1 + max - min));
		}
    
		/**
		 * From 0 to max
		 * @param max
		 * @return 
		 * 
		 */		
		public static value(max:number):number
		{
			/**/ max = ((max) >> 0);
			return Random.short() % max;
		}
	}
}