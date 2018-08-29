/// <reference path="../../base.d.ts" />
/// <reference path="../system/Capabilities.ts" />
/// <reference path="../__native/utils/CSSColor.ts" />

namespace flash.text
{
	export import CSSColor = flash.__native.utils.CSSColor;
	export import Capabilities = flash.system.Capabilities;
	
	
	/**
	 * The TextFormat class represents character formatting information. 
	 * Use the TextFormat class to create specific text formatting for text fields. 
	 * You can apply text formatting to both static and dynamic text fields. 
	 * The properties of the TextFormat class apply to device and embedded fonts. However, for embedded fonts, 
	 * bold and italic text actually require specific fonts. If you want to display bold or italic text with an embedded font, 
	 * you need to embed the bold and italic variations of that font.
	 * You must use the constructor new TextFormat() to create a TextFormat object before setting its properties. 
	 * When you apply a TextFormat object to a text field using the TextField.defaultTextFormat property or 
	 * the TextField.setTextFormat() method, only its defined properties are applied. 
	 * Use the TextField.defaultTextFormat property to apply formatting BEFORE you add text to the TextField, 
	 * and the setTextFormat() method to add formatting AFTER you add text to the TextField. 
	 * The TextFormat properties are null by default because if you don't provide values for the properties, 
	 * Flash Player uses its own default formatting.
	 * The default formatting for each property is also described in each property description.
	 * @author pkulikov
	 * 
	 */	
	export  class TextFormat
	{
		private static MEASURE_FONT_SIZE:number = 16;
		private static MEASURE_CHAR:string = 'A';
		
		private _font:string = null;
		private _size:any = null;
		private _italic:any = null;
		private _bold:any = null;
		private _color:any = null;
		private _indent:any = null;
		private _leading:any = null;
		private _align:any = null;
		private _css:string = null;
		private _cssFixedSize:string = null;
		private _cssColor:string = null;
		private _cssHash:string = null;
		private _cssDirty:boolean = false;
		private _cssColorDirty:boolean = false;
		private _cssHashDirty:boolean = false;
		
		/**
		 * Creates a TextFormat object with the specified properties.
		 * @param font
		 * @param size
		 * @param color
		 * @param bold
		 * @param italic
		 * @param underline
		 * @param url
		 * @param target
		 * @param align
		 * @param leftMargin
		 * @param rightMargin
		 * @param indent
		 * @param leading
		 * 
		 */		
		constructor(font:string = null, size:any = null, color:any = null, bold:any = null, italic:any = null, underline:any = null, url:string = null, target:string = null, align:string = null, leftMargin:any = null, rightMargin:any = null, indent:any = null, leading:any = null)
		{
			/**/ font = as(font, 'String'); url = as(url, 'String'); target = as(target, 'String'); align = as(align, 'String');
			this.font = font || Capabilities.systemFontFamily;
			this.size = size || 12;
			this.color = color || 0;
			this.bold = bold || false;
			this.italic = italic || false;
			this.underline = underline || false;
			this.url = url || '';
			this.target = target || '';
			this.align = align || 'left';
			this.leftMargin = leftMargin || 0;
			this.rightMargin = rightMargin || 0;
			this.indent = indent || 0;
			this.leading = leading || 0;
			this.align = align || TextFormatAlign.LEFT;
		}
		
		/**
		 * Indicates the alignment of the paragraph. 
		 * @return 
		 * 
		 */		
		public get align():string  { return this._align; }
		public set align(value:string)  { /**/ value = as(value, 'String'); this._align = value; this._cssDirty = true; }
		
		/**
		 * Indicates the block indentation in pixels. 
		 * @return 
		 * 
		 */		
		public get blockIndent():any  { return null; }
		public set blockIndent(value:any)  {/**/ }
		
		/**
		 * Specifies whether the text is boldface. 
		 * @return 
		 * 
		 */		
		public get bold():any  { return this._bold; }
		public set bold(value:any)  { this._bold = value; this._cssDirty = this._cssHashDirty = true; }
		
		/**
		 * Indicates that the text is part of a bulleted list. 
		 * @return 
		 * 
		 */		
		public get bullet():any  { return null; }
		public set bullet(value:any)  {/**/ }
		
		/**
		 * Indicates the color of the text. 
		 * @return 
		 * 
		 */		
		public get color():any  { return this._color; }
		public set color(value:any)  { this._color = value; this._cssColorDirty = true; }
		
		public get display():string  { return null; }
		public set display(value:string)  {/**/ value = as(value, 'String');/**/ }
		
		/**
		 * The name of the font for text in this text format, as a string. 
		 * @return 
		 * 
		 */		
		public get font():string  { return this._font; }
		public set font(value:string)  { /**/ value = as(value, 'String'); this._font = value; this._cssDirty = this._cssHashDirty = true; }
		
		/**
		 * Indicates the indentation from the left margin to the first character in the paragraph. 
		 * @return 
		 * 
		 */		
		public get indent():any  { return this._indent; }
		public set indent(value:any)  { this._indent = value; this._cssDirty = true; }
		
		/**
		 * Indicates whether text in this text format is italicized. 
		 * @return 
		 * 
		 */		
		public get italic():any  { return this._italic; }
		public set italic(value:any)  { this._italic = value; this._cssDirty = this._cssHashDirty = true; }
		
		/**
		 * A Boolean value that indicates whether kerning is enabled (true) or disabled (false). 
		 * @return 
		 * 
		 */		
		public get kerning():any  { return null; }
		public set kerning(value:any)  {/**/ }
		
		/**
		 * An integer representing the amount of vertical space (called leading) between lines. 
		 * @return 
		 * 
		 */		
		public get leading():any  { return this._leading; }
		public set leading(value:any)  { this._leading = value; this._cssDirty = true; }
		
		/**
		 * The left margin of the paragraph, in pixels. 
		 * @return 
		 * 
		 */		
		public get leftMargin():any  { return null; }
		public set leftMargin(value:any)  {/**/ }
		
		/**
		 * A number representing the amount of space that is uniformly distributed between all characters. 
		 * @return 
		 * 
		 */		
		public get letterSpacing():any  { return null; }
		public set letterSpacing(value:any)  {/**/ }
		
		/**
		 * The right margin of the paragraph, in pixels. 
		 * @return 
		 * 
		 */		
		public get rightMargin():any  { return null; }
		public set rightMargin(value:any)  {/**/ }
		
		/**
		 * The size in pixels of text in this text format. 
		 * @return 
		 * 
		 */		
		public get size():any  { return this._size; }
		public set size(value:any)  { this._size = value > 1 ? value : 2; this._cssDirty = this._cssHashDirty = true; }
		
		/**
		 * Specifies custom tab stops as an array of non-negative integers. 
		 * @return 
		 * 
		 */		
		public get tabStops():any[]  { return null; }
		public set tabStops(value:any[])  {/**/ value = strict(value, Array);/**/ }
		
		/**
		 * Indicates the target window where the hyperlink is displayed. 
		 * @return 
		 * 
		 */		
		public get target():string  { return null; }
		public set target(value:string)  {/**/ value = as(value, 'String');/**/ }
		
		/**
		 * Indicates whether the text that uses this text format is underlined (true) or not (false). 
		 * @return 
		 * 
		 */		
		public get underline():any  { return null; }
		public set underline(value:any)  {/**/ }
		
		/**
		 * Indicates the target URL for the text in this text format. 
		 * @return 
		 * 
		 */		
		public get url():string  { return null; }
		public set url(value:string)  {/**/ value = as(value, 'String');/**/ }
		
		/**
		 * Helpers 
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected __getCss(fixedSize:boolean = false):string
		{
			// fixedSize = Boolean(fixedSize);
			if (this._cssDirty) {
				
				this._css = '';
				this._cssFixedSize = '';
				
				if (this._bold) {
					
					this._css += 'bold ';
					this._cssFixedSize += 'bold ';
					
				}
				
				if (this._italic) {
					
					this._css += 'italic ';
					this._cssFixedSize += 'italic ';
					
				}
				
				this._css += this.size + 'px ' + this.font;
				this._cssFixedSize += TextFormat.MEASURE_FONT_SIZE + 'px ' + this.font;
				this._cssDirty = false;
				
			}
			
			return fixedSize ? this._cssFixedSize : this._css;
		}
		
		/*[internal]*/ protected __getCssColor():string
		{
			if (this._cssColorDirty) {
				
				this._cssColor =as( CSSColor.hexToString(this.color), 'String');
				this._cssColorDirty = false;
				
			}
			
			return this._cssColor;
		}
		
		/*[internal]*/ protected __getHash():string
		{
			if (this._cssHashDirty) {
				
				this._cssHash = this.__getCss() + this.__getCssColor();
				this._cssHashDirty = false;
				
			}
			
			return this._cssHash;
		}
	}
}