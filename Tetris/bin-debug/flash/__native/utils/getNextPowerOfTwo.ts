namespace flash.__native.utils
{
	
    /** Returns the next power of two that is equal to or bigger than the specified number. */
		export  function getNextPowerOfTwo(value:number):number
    {
				/**/ value = (+(value));
				if (is(value , 'int') && value > 0 && (value & (value - 1)) == 0) { // see: http://goo.gl/D9kPj
					
            return value;
						
				}
				
				var result:number = 1;
				value -= 0.000000001; // avoid floating point rounding errors
				
				while (result < value) {
					
					result <<= 1;
					
				}
				
				return result;
    }
}