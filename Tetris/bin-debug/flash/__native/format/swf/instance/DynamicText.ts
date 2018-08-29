/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../utils/Dictionary.ts" />
/// <reference path="../../../../text/TextFormatAlign.ts" />
/// <reference path="../../../../text/TextFormat.ts" />
/// <reference path="../../../../text/TextFieldType.ts" />
/// <reference path="../../../../text/TextFieldAutoSize.ts" />
/// <reference path="../../../../text/TextField.ts" />
/// <reference path="../../../../text/Font.ts" />
/// <reference path="../../../../geom/Rectangle.ts" />
/// <reference path="../../../../geom/Matrix.ts" />
/// <reference path="../tags/TagDefineFont2.ts" />
/// <reference path="../tags/TagDefineEditText.ts" />
/// <reference path="../SWFTimelineContainer.ts" />

namespace flash.__native.format.swf.instance
{
	export import SWFTimelineContainer = flash.__native.format.swf.SWFTimelineContainer;
	export import TagDefineEditText = flash.__native.format.swf.tags.TagDefineEditText;
	export import TagDefineFont2 = flash.__native.format.swf.tags.TagDefineFont2;
	export import Matrix = flash.geom.Matrix;
	export import Rectangle = flash.geom.Rectangle;
	export import Font = flash.text.Font;
	export import TextField = flash.text.TextField;
	export import TextFieldAutoSize = flash.text.TextFieldAutoSize;
	export import TextFieldType = flash.text.TextFieldType;
	export import TextFormat = flash.text.TextFormat;
	export import TextFormatAlign = flash.text.TextFormatAlign;
	export import Dictionary = flash.utils.Dictionary;
	
	
	export  class DynamicText extends TextField
	{
		private static registeredFonts : Dictionary = asc.sti(DynamicText,()=>{ DynamicText.registeredFonts = new Dictionary; });
		
		/*[internal]*/ public offset : Matrix;
		
		/*[internal]*/ protected tag : TagDefineEditText;
		/*[internal]*/ protected data : SWFTimelineContainer;
		
		/**
		 * Constructor 
		 * @param data
		 * @param tag
		 * 
		 */		
		constructor (tag : TagDefineEditText)
		{
			/**/ tag = strict(tag, TagDefineEditText);
			super(); 
			if (!tag) {
				
				return;
				
			}
			
			this.tag = tag;
			this.data =strict( tag.root, SWFTimelineContainer);
			
			var rect:Rectangle = tag.bounds.rect;
			
			this.offset = new Matrix (1, 0, 0, 1, rect.x, rect.y - 2);
			this.width = rect.width;
			this.height = rect.height;
			
			this.multiline = tag.multiline;
			this.wordWrap = tag.wordWrap;
			this.displayAsPassword = tag.password;
			this.border = tag.border;
			this.selectable = !tag.noSelect;
			this.maxChars =(( tag.maxLength) >> 0);
			
			if (!tag.readOnly) {
				
				this.type = TextFieldType.INPUT;
				this.background = true;
				
			}
			
			var format:TextFormat = new TextFormat ();
			if (tag.hasTextColor) {
				
				format.color = (tag.textColor & 0x00FFFFFF);
				
			}
			
			format.size = Math.round (tag.fontHeight / 20);
			
			if (tag.hasFont) {
				
				var font = this.data.getTag (tag.fontId);
				
				if (is(font , TagDefineFont2)) {
					
						var fontName:string =  (as(font , TagDefineFont2)).fontName;
					
					if (fontName.charCodeAt (fontName.length - 1) == 0) {
						
						fontName = fontName.substr (0, fontName.length - 1).split (" ").join ("");
						
					}
					
					var fonts:any[] = Font.enumerateFonts (false);
					var foundFont:boolean = false;
					
					var __for0 = window.asc.of(fonts);
					for  (font of __for0) {
						
						if (font.fontName == fontName) {
							
							foundFont = true;
							format.font = fontName;
							break;
							
						}
						
					}
					
					if (!foundFont) {
						
						format.font = this.getFont (font);
						
					}
						
					if (!format.font) {
						
						format.font = (as(font , TagDefineFont2)).fontName;
						
					}
					
					this.embedFonts = foundFont;
					
				}
				
			}
			
			if (tag.hasLayout) {
				
				switch (tag.align) {
					
					case 0: format.align = TextFormatAlign.LEFT; break;
					case 1: format.align = TextFormatAlign.RIGHT; break;
					case 2: format.align = TextFormatAlign.CENTER; break;
					case 3: format.align = TextFormatAlign.JUSTIFY; break;
						
				}
				
				format.leftMargin = ((tag.leftMargin / 20) >> 0);
				format.rightMargin = ((tag.rightMargin / 20) >> 0);
				format.indent = ((tag.indent / 20) >> 0);
				format.leading = ((tag.leading / 20) >> 0);
				
				if (this.embedFonts) format.leading += 4; // TODO: Why is this necessary?
				
			}
			
			this.defaultTextFormat = format;
			
			if (tag.hasText) {
				
				if (tag.html) {
					
					this.htmlText = tag.initialText;
					
				} else {
					
					this.text = tag.initialText;
					
				}
				
			}
			
			this.autoSize = (tag.autoSize) ? TextFieldAutoSize.LEFT : TextFieldAutoSize.NONE;
		}
		
		private getFont (font:TagDefineFont2):string {
			
			/**/ font = strict(font, TagDefineFont2);
			
			if (!DynamicText.registeredFonts.get(font.characterId)) {
				
				// TODO
				//AbstractFont.registerFont (font.fontName, function (definition) { return new SWFFont (font, definition); });
				DynamicText.registeredFonts.set(font.characterId,  true);
				
			}
			
			return font.fontName;
			
		}
	}

/*import flash.__native.format.swf.exporters.AS3GraphicsDataShapeExporter;
import flash.__native.format.swf.tags.TagDefineFont2;
import flash.display.BitmapData;
import flash.utils.Dictionary;

class SWFFont extends AbstractFont {
	
	
	private var bitmapData:Dictionary;
	private var font:TagDefineFont2;
	private var glyphInfo:Dictionary;
	
	
	public function SWFFont (font:TagDefineFont2, definition:FontDefinition) {
		
		this.font = font;
		
		bitmapData = new Dictionary ();
		glyphInfo = new Dictionary ();
		
		var ascent = Math.round (font.ascent / (font.ascent + font.descent));
		var descent = Math.round (font.descent / (font.ascent + font.descent));
		
		super (definition.height, ascent, descent, false);
		
	}
	
	
	public override function getGlyphInfo (charCode:int):GlyphInfo {
		
		if (!glyphInfo.exists (charCode)) {
			
			var index = -1;
			
			for (var i:int = 0, len:int = font.codeTable.length; i < len; ++i) {
				
				if (font.codeTable[i] == charCode) {
					
					index = i;
					
				}
				
			}
			
			if (index > -1) {
				
				var scale = (height / 1024);
				var advance = Math.round (scale * font.fontAdvanceTable[index] * 0.05);
				
				glyphInfo.set (charCode, { width: height, height: height, advance: advance, offsetX: 0, offsetY: 2 });
				
			} else {
				
				glyphInfo.set (charCode, { width: 0, height: 0, advance: 0, offsetX: 0, offsetY: 0 });
				
			}
			
		}
		
		return glyphInfo.get (charCode);
		
	}
	
	
	public override function renderGlyph (charCode:int):BitmapData {
		
		if (!bitmapData[charCode]) {
			
			var index = -1;
			
			for (var i:int = 0, len:int = font.codeTable.length; i < len; ++i) {
				
				if (font.codeTable[i] == charCode) {
					
					index = i;
					
				}
				
			}
			
			if (index > -1) {
				
				var shape = new flash.display.Shape ();
				var handler = new AS3GraphicsDataShapeExporter (null);
				font.export (handler, index);
				
				var scale = (height / 1024);
				var offsetX = 0;
				var offsetY = font.ascent * scale * 0.05;
				
				var graphics = shape.graphics;
				
				for (var command in handler.commands) {
					
					switch (command) {
						
						case BeginFill (color, alpha): graphics.beginFill (color, alpha);
						case EndFill: shape.graphics.endFill ();
						case LineStyle (thickness, color, alpha, pixelHinting, scaleMode, caps, joints, miterLimit):
							
							if (thickness != null) {
								
								graphics.lineStyle (thickness, color, alpha, pixelHinting, scaleMode, caps, joints, miterLimit);
								
							} else {
								
								graphics.lineStyle ();
								
							}
							
						case MoveTo (x, y): graphics.moveTo (x * scale + offsetX, y * scale + offsetY);
						case LineTo (x, y): graphics.lineTo (x * scale + offsetX, y * scale + offsetY);
						case CurveTo (controlX, controlY, anchorX, anchorY):
							
							//cacheAsBitmap = true;
							graphics.curveTo (controlX * scale + offsetX, controlY * scale + offsetY, anchorX * scale + offsetX, anchorY * scale + offsetY);
							
						default:
							
					}
					
					
				}
				
				//var bounds = shape.getBounds (shape);
				//var data = new BitmapData (Math.ceil (bounds.width + bounds.x), Math.ceil (bounds.height + bounds.y), true, 0x00000000);
				var data = new BitmapData (height, height, true, 0x00000000);
				data.draw (shape);
				
				var advance = Math.round (scale * font.fontAdvanceTable[index] * 0.05);
				
				bitmapData[charCode] = data;
				
			} else {
				
				bitmapData[charCode] = null;
				
			}
			
		}
		
		return bitmapData[charCode];
		
	}
	
	
}*/}