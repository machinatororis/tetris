/// <reference path="../../../base.d.ts" />
/// <reference path="../../geom/ColorTransform.ts" />

namespace flash.__native.utils
{
	
	export import ColorTransform = flash.geom.ColorTransform;
	

	export  class CSSColor
	{
		/* Active window border.*/
		public static ActiveBorder:string = 'ActiveBorder';
		
		/* Active window caption. Should be used with CaptionText as foreground color.*/
		public static ActiveCaption:string = 'ActiveCaption';
		
		/* Background color of multiple document interface.*/
		public static AppWorkspace:string = 'AppWorkspace';
		
		/* Desktop background.*/
		public static Background:string = 'Background';
		
		/* Face background color for 3-D elements that appear 3-D due to one layer of surrounding border. Should be used with the ButtonText foreground color.*/
		public static ButtonFace:string = 'ButtonFace';
		
		/* The color of the border facing the light source for 3-D elements that appear 3-D due to that layer of surrounding border.*/
		public static ButtonHighlight:string = 'ButtonHighlight';
		
		/* The color of the border away from the light source for 3-D elements that appear 3-D due to that layer of surrounding border.*/
		public static ButtonShadow:string = 'ButtonShadow';
		
		/* Text on push buttons. Should be used with the ButtonFace or ThreeDFace background color.*/
		public static ButtonText:string = 'ButtonText';
		
		/* Text in caption, size box, and scrollbar arrow box. Should be used with the ActiveCaption background color.*/
		public static CaptionText:string = 'CaptionText';
		
		/* Grayed (disabled) text.*/
		public static GrayText:string = 'GrayText';
		
		/* Item(s) selected in a control. Should be used with the HighlightText foreground color.*/
		public static Highlight:string = 'Highlight';
		
		/* Text of item(s) selected in a control. Should be used with the Highlight background color.*/
		public static HighlightText:string = 'HighlightText';
		
		/* Inactive window border.*/
		public static InactiveBorder:string = 'InactiveBorder';
		
		/* Inactive window caption. Should be used with the InactiveCaptionText foreground color.*/
		public static InactiveCaption:string = 'InactiveCaption';
		
		/* Color of text in an inactive caption. Should be used with the InactiveCaption background color.*/
		public static InactiveCaptionText:string = 'InactiveCaptionText';
		
		/* Background color for tooltip controls. Should be used with the InfoText foreground color.*/
		public static InfoBackground:string = 'InfoBackground';
		
		/* Text color for tooltip controls. Should be used with the InfoBackground background color.*/
		public static InfoText:string = 'InfoText';
		
		/* Menu background. Should be used with the MenuText or -moz-MenuBarText foreground color.*/
		public static Menu:string = 'Menu';
		
		/* Text in menus. Should be used with the Menu background color.*/
		public static MenuText:string = 'MenuText';
		
		/* Background color of scroll bars.*/
		public static Scrollbar:string = 'Scrollbar';
		
		/* The color of the darker (generally outer) of the two borders away from the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.*/
		public static ThreeDDarkShadow:string = 'ThreeDDarkShadow';
		
		/* The face background color for 3-D elements that appear 3-D due to two concentric layers of surrounding border. Should be used with the ButtonText foreground color.*/
		public static ThreeDFace:string = 'ThreeDFace';
		
		/* The color of the lighter (generally outer) of the two borders facing the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.*/
		public static ThreeDHighlight:string = 'ThreeDHighlight';
		
		/* The color of the darker (generally inner) of the two borders facing the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.*/
		public static ThreeDLightShadow:string = 'ThreeDLightShadow';
		
		/* The color of the lighter (generally inner) of the two borders away from the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.*/
		public static ThreeDShadow:string = 'ThreeDShadow';
		
		/* Window background. Should be used with the WindowText foreground color.*/
		public static Window:string = 'Window';
		
		/* Window frame.*/
		public static WindowFrame:string = 'WindowFrame';
		
		/* Text in windows. Should be used with the Window background color.*/
		public static WindowText:string = 'WindowText';
		
		/**
		 * Helpers 
		 */		
		private static sDiv:HTMLElement = null;
		
		/**
		 * Converts predefined color name to 0x value
		 * @param value
		 * @return 
		 * 
		 */
		public static keywordToHex (predefinedColor:string):number
		{
			/**/ predefinedColor = as(predefinedColor, 'String');
			if (!CSSColor.sDiv) {
				
				CSSColor.sDiv = document.createElement('div');
				document.body.appendChild(CSSColor.sDiv);
				
			}
			
			CSSColor.sDiv.style.backgroundColor = predefinedColor;
			return CSSColor.rgbToHex(window.getComputedStyle(CSSColor.sDiv).backgroundColor);
		}
		
		/**
		 * Convert "rgb(255, 255, 255)" to 0xffffff
		 * @param rgb
		 * @return 
		 * 
		 */		
		public static rgbToHex (rgb:string):number
		{
			/**/ rgb = as(rgb, 'String');
			var regex = /rgb *\( *([0-9]{1,3}) *, *([0-9]{1,3}) *, *([0-9]{1,3}) *\)/;
			var values = regex.exec(rgb) || '';
			
			if (values.length != 4) {
				
				return 0x0; // fall back to what was given.
				
			}
			
			var r = parseFloat(values[1]) | 0;
			var g = parseFloat(values[2]) | 0;
			var b = parseFloat(values[3]) | 0;
			return r << 16 | g << 8 | b;
		}
		
		/**
		 * Convert "#000000" to 0x000000
		 * @param color
		 * @return 
		 * 
		 */		
		public static stringToHex (color:string):number
		{
			/**/ color = as(color, 'String');
			return parseInt('0x' + ((color || '').replace('#', '').replace('0x', '')));
		}
		
		/**
		 * Convert 0x000000 + alpha to "rgba()" 
		 * @param color
		 * @param alpha
		 * @param ct
		 * @return 
		 * 
		 */		
		public static hexToString (color:number, alpha:number = 1.0, ct:ColorTransform = null):number
		{
			/**/ color = ((color) >>> 0); alpha = (+(alpha)); ct = strict(ct, ColorTransform);
			var r :number =  ((color >> 16 & 0xff) >>> 0);
			var g :number =  ((color >> 8 & 0xff) >>> 0);
			var b :number =  ((color & 0xff) >>> 0);
			
			if (ct) {
				
				r =(( r * ct.redMultiplier + ct.redOffset) >>> 0);
				g =(( g * ct.greenMultiplier + ct.greenOffset) >>> 0);
				b =(( b * ct.blueMultiplier + ct.blueOffset) >>> 0);
				alpha = alpha * ct.alphaMultiplier + ct.alphaOffset;
				
			}
			
			if (alpha == 1.0) {
				
				return "rgb(" + r + "," + g + "," + b + ")";
				
			}
			
			return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
		}
	}
}