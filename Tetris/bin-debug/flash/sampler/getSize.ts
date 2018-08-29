
namespace flash.sampler
{
	
	/**
	 * Returns the size in memory of a specified object when used with the Flash Player 9.0.115.0 or later debugger version. 
	 */	
	export  function getSize(o:any):number
	{
		var bytes = 0;
		return sizeOf.__bind(this)(o);
		
		function sizeOf(obj:any) {
			if (obj !== null && obj !== undefined) {
				switch(typeof obj) {
					case 'number':
						bytes += 8;
						break;
					case 'string':
						bytes += obj.length * 2;
						break;
					case 'boolean':
						bytes += 4;
						break;
					case 'object':
						var objClass = Object.prototype.toString.call(obj).slice(8, -1);
						if (objClass == 'Object' || objClass == 'Array') {
							var __for0 = window.asc.in(obj);
							for (var key of __for0) {
								if (!obj.hasOwnProperty(key)) continue;
								sizeOf.__bind(this)(obj[key]);
							}
						} else bytes += obj.toString().length * 2;
						break;
				}
			}
			return bytes;
		}
	}
}