namespace flash.net
{
	
	/**
	 * Opens or replaces a window in the application that contains the Flash Player container (usually a browser). 
	 * In Adobe AIR, the function opens a URL in the default system web browser
	 * @author avereskun
	 */	
	export  function navigateToURL(request:URLRequest, win:string = null):void
	{
		/**/ request = strict(request, URLRequest); win = as(win, 'String');
		if (!request) {
			
			return;
			
		}
		
		if (!win) {
			
			win = '_blank';
			
		}
		
		var method:string = URLRequestMethod.GET;
		if (request.method) {
			
			switch (request.method.toUpperCase()) {
				
				case URLRequestMethod.GET:
				case URLRequestMethod.POST:
				case URLRequestMethod.PUT:
				case URLRequestMethod.DELETE:
				case URLRequestMethod.HEAD:
				case URLRequestMethod.OPTIONS:
					method = request.method;
					break;
					
			}
			
		}
		
		var params:any = request.data;
		if (!params) {
			
			params = {};
			
		}
		
		if (method == URLRequestMethod.GET) {
			
			var v = new URLVariables(request.url);
			var __for0 = window.asc.in(v);
			for (var f of __for0) {
				
				params[f] = v[f];
				
			}
			
		}
		
		var form = document.createElement('form');
		form.setAttribute('method', method);
		form.setAttribute('action', request.url);
		form.setAttribute('target', win);
		
		var keys = Object.keys(params);
		var len = keys.length;
		for (var i:number = 0; i < len; i++) {
			
			var key = keys[i];
			if (!params.hasOwnProperty(key)) {
				
				continue;
				
			}
			
			var input = document.createElement('input');
			input.type = 'hidden';
			input.name = key;
			input.value = params[key];
			form.appendChild(input);
			
		}
		
		document.body.appendChild(form);
		
		form.submit();
		
		document.body.removeChild(form);
		
	}
}