/// <reference path="../../base.d.ts" />
/// <reference path="../system/Capabilities.ts" />
/// <reference path="../geom/Rectangle.ts" />
/// <reference path="../geom/Point.ts" />
/// <reference path="../geom/Matrix.ts" />
/// <reference path="../events/TextEvent.ts" />
/// <reference path="../events/MouseEvent.ts" />
/// <reference path="../events/Event.ts" />
/// <reference path="../display/Stage.ts" />
/// <reference path="../display/InteractiveObject.ts" />
/// <reference path="../display/Graphics.ts" />
/// <reference path="../display/DisplayObject.ts" />
/// <reference path="../__native/renderer/webgl/WebGLContext2D.ts" />
/// <reference path="../../XMLList.ts" />
/// <reference path="../../XML.ts" />

namespace flash.text
{
	export import XML = global.XML;
	export import XMLList = global.XMLList;
	export import WebGLContext2D = flash.__native.renderer.webgl.WebGLContext2D;
	export import DisplayObject = flash.display.DisplayObject;
	export import Graphics = flash.display.Graphics;
	export import InteractiveObject = flash.display.InteractiveObject;
	export import Stage = flash.display.Stage;
	export import Event = flash.events.Event;
	export import MouseEvent = flash.events.MouseEvent;
	export import TextEvent = flash.events.TextEvent;
	export import Matrix = flash.geom.Matrix;
	export import Point = flash.geom.Point;
	export import Rectangle = flash.geom.Rectangle;
	export import Capabilities = flash.system.Capabilities;
	
	
	/**
	 * The TextField class is used to create display objects for text display and input. 
	 * You can give a text field an instance name in the Property inspector and use the methods and properties of the TextField class 
	 * to manipulate it with ActionScript. TextField instance names are displayed in the Movie Explorer and 
	 * in the Insert Target Path dialog box in the Actions panel.
	 * To create a text field dynamically, use the TextField() constructor.
	 * 
	 * The methods of the TextField class let you set, select, 
	 * and manipulate text in a dynamic or input text field that you create during authoring or at runtime.
	 * 
	 * ActionScript provides several ways to format your text at runtime. 
	 * The TextFormat class lets you set character and paragraph formatting for TextField objects. 
	 * You can apply Cascading Style Sheets (CSS) styles to text fields by using the TextField.styleSheet property and the StyleSheet class. 
	 * You can use CSS to style built-in HTML tags, define new formatting tags, or apply styles. 
	 * You can assign HTML formatted text, which optionally uses CSS styles, directly to a text field. 
	 * HTML text that you assign to a text field can contain embedded media (movie clips, SWF files, GIF files, PNG files, and JPEG files). 
	 * The text wraps around the embedded media in the same way that a web browser wraps text around media embedded in an HTML document.
	 * 
	 * Flash Player supports a subset of HTML tags that you can use to format text. 
	 * See the list of supported HTML tags in the description of the htmlText property. 
	 * @author pkulikov
	 * 
	 */	
	export  class TextField extends InteractiveObject
	{
		/*[internal]*/ protected static MEASURE_CACHE:any = {};
		/*[internal]*/ protected static MEASURE_RESULT:any = {};
		
		/*[internal]*/ protected _text:string;
		/*[internal]*/ protected _lines:any[];
		/*[internal]*/ protected _linesWidth:any[];
		/*[internal]*/ protected _numLines:number;
		/*[internal]*/ protected _textFormat:TextFormat;
		/*[internal]*/ protected _width:number;
		/*[internal]*/ protected _height:number;
		/*[internal]*/ protected _autoSize:string;
		/*[internal]*/ protected _background:boolean;
		/*[internal]*/ protected _backgroundColor:number;
		/*[internal]*/ protected _border:boolean;
		/*[internal]*/ protected _borderColor:number;
		/*[internal]*/ protected _rect:Rectangle;
		/*[internal]*/ protected _scrollH:number;
		/*[internal]*/ protected _scrollV:number;
		/*[internal]*/ protected _type:string;
		/*[internal]*/ protected _selectable:boolean;
		/*[internal]*/ protected _multiline:boolean;
		/*[internal]*/ protected _mouseWheelEnabled:boolean;
		/*[internal]*/ protected _wordWrap:boolean;
		/*[internal]*/ protected _restrict:string;
		/*[internal]*/ protected _maxChars:number;
		
		/*[internal]*/ protected _nativeInput:any;
		/*[internal]*/ protected _nativeVisible:boolean;
		/*[internal]*/ protected _nativeDirtyText:boolean;
		/*[internal]*/ protected _nativeDirtyTextFormat:boolean;
		
		/**
		 * Creates a new TextField instance.
		 * 
		 */		
		constructor()
		{
			super(); 
			this._type = 'dynamic';
			this._autoSize = 'none';
			this._wordWrap = true;
			this._selectable = true;
			this._mouseWheelEnabled = true;
			this._textFormat = new TextFormat;
			this._backgroundColor = 0xffffff;
			this._borderColor = 0;
			this._scrollH = 0;
			this._scrollV = 1;
			this._maxChars = 0;
			
			this._width = 100;
			this._height = 100;
			this._rect = new Rectangle;
			this.__updateRect();
			
			this.text = '';
			
			this._cropBounds = true;
			this.__setNeedCache();
			
			this.addEventListener(Event.ADDED_TO_STAGE, this.__onAddedToStage.__bind(this));
			this.addEventListener(Event.REMOVED_FROM_STAGE, this.__onRemovedFromStage.__bind(this));
		}
		
		/**
		 * Returns true if an embedded font is available with the specified fontName and 
		 * fontStyle where Font.fontType is flash.text.FontType.EMBEDDED. 
		 * @param value
		 * @param param2
		 * @return 
		 * 
		 */		
		public static isFontCompatible(value:string, param2:string):boolean
		{
			/**/ value = as(value, 'String'); param2 = as(param2, 'String');
			// not implemented
			return false;
		}
		
		/**
		 * When set to true and the text field is not in focus, Flash Player highlights the selection in the text field in gray. 
		 * @return 
		 * 
		 */		
		public get alwaysShowSelection():boolean  { return false; }
		public set alwaysShowSelection(value:boolean)  {/**/ value = Boolean(value);/**/ }
		
		/**
		 * The type of anti-aliasing used for this text field. 
		 * @return 
		 * 
		 */		
		public get antiAliasType():string  { return null; }
		public set antiAliasType(value:string)  {/**/ value = as(value, 'String');/**/ }
		
		/**
		 * Controls automatic sizing and alignment of text fields. 
		 * @return 
		 * 
		 */		
		public get autoSize():string  { return this._autoSize; }
		public set autoSize(value:string)
		{
			/**/ value = as(value, 'String');
			this._autoSize = value;
			
			if (this._graphics) {
				
				this._graphics.dirty = true;
				
			}
			
			this.__setDirty(2);
		}
		
		/**
		 * Specifies whether the text field has a background fill. 
		 * @return 
		 * 
		 */		
		public get background():boolean  { return this._background; }
		public set background(value:boolean)
		{
			/**/ value = Boolean(value);
			if (this._background = value) {
				
				this._graphics =this._graphics || new Graphics;
				
			}
			
			if (this._graphics) {
				
				this._graphics.dirty = true;
				
			}
			
			this.__setDirty(2);
		}
		
		/**
		 * The color of the text field background. 
		 * @return 
		 * 
		 */		
		public get backgroundColor():number  { return this._backgroundColor; }
		public set backgroundColor(value:number)
		{
			/**/ value = ((value) >>> 0);
			this._backgroundColor = value;
			
			if (this._graphics) {
				
				this._graphics.dirty = true;
				
			}
			
			this.__setDirty(2);
		}
		
		/**
		 * Specifies whether the text field has a border. 
		 * @return 
		 * 
		 */		
		public get border():boolean  { return this._border; }
		public set border(value:boolean)
		{
			/**/ value = Boolean(value);
			if (this._border = value) {
				
				this._graphics =this._graphics || new Graphics;
				
			}
			
			if (this._graphics) {
				
				this._graphics.dirty = true;
				
			}
			
			this.__updateRect();
			this.__setDirty(2);
		}
		
		/**
		 * The color of the text field border. 
		 * @return 
		 * 
		 */		
		public get borderColor():number  { return this._borderColor; }
		public set borderColor(value:number)
		{
			/**/ value = ((value) >>> 0);
			this._borderColor = value;
			
			if (this._graphics) {
				
				this._graphics.dirty = true;
				
			}
			
			this.__setDirty(2);
		}
		
		/**
		 * An integer (1-based index) that indicates the bottommost line that is currently visible in the specified text field. 
		 * @return 
		 * 
		 */		
		public get bottomScrollV():number  { return 0; }
		
		/**
		 * The index of the insertion point (caret) position. 
		 * @return 
		 * 
		 */		
		public get caretIndex():number  { return 0; }
		
		/**
		 * A Boolean value that specifies whether extra white space (spaces, line breaks, and so on) in a text field with HTML text is removed. 
		 * @return 
		 * 
		 */		
		public get condenseWhite():boolean  { return false; }
		public set condenseWhite(value:boolean)  {/**/ value = Boolean(value);/**/ }
		
		/**
		 * Specifies the format applied to newly inserted text, 
		 * such as text entered by a user or text inserted with the replaceSelectedText() method. 
		 * @return 
		 * 
		 */		
		public get defaultTextFormat():TextFormat  { return this._textFormat; }
		public set defaultTextFormat(value:TextFormat) { /**/ value = strict(value, TextFormat); this.__setDefaultTextFormat(value); }
		
		/**
		 * Specifies whether to render by using embedded font outlines. 
		 * @return 
		 * 
		 */		
		public get embedFonts():boolean  { return false; }
		public set embedFonts(value:boolean)  {/**/ value = Boolean(value);/**/ }
		
		/**
		 * The type of grid fitting used for this text field. 
		 * @return 
		 * 
		 */		
		public get gridFitType():string  { return null; }
		public set gridFitType(value:string)  {/**/ value = as(value, 'String');/**/ }
		
		/**
		 * Contains the HTML representation of the text field contents. 
		 * @return 
		 * 
		 */		
		public get htmlText():string { return ''; }
		public set htmlText(value:string) {
			/**/ value = as(value, 'String');
			// not implemented
		}
		
		/**
		 * The number of characters in a text field. 
		 * @return 
		 * 
		 */		
		public get length():number  { return this._text.length; }
		
		/**
		 * The interaction mode property, Default value is TextInteractionMode.NORMAL. 
		 * @return 
		 * 
		 */		
		public get textInteractionMode():string  { return null; }
		
		/**
		 * The maximum number of characters that the text field can contain, as entered by a user. 
		 * @return 
		 * 
		 */		
		public get maxChars():number  { return this._maxChars; }
		public set maxChars(value:number) {
			/**/ value = ((value) >> 0);
			this._maxChars = value;
			
			if (this._nativeInput) {
				
				this._nativeInput.setMaxChars(value);
					
			}
		}
		
		/**
		 * The maximum value of scrollH. 
		 * @return 
		 * 
		 */		
		public get maxScrollH():number  { return 0; }
		
		/**
		 * The maximum value of scrollV. 
		 * @return 
		 * 
		 */		
		public get maxScrollV():number
		{
			return Math.max(this.numLines - ((this.height / this.__getLineHeight()) >> 0), 1);
		}
		
		/**
		 * A Boolean value that indicates whether Flash Player automatically scrolls multiline text fields when 
		 * the user clicks a text field and rolls the mouse wheel. 
		 * @return 
		 * 
		 */		
		public get mouseWheelEnabled():boolean { return this._mouseWheelEnabled; }
		public set mouseWheelEnabled(value:boolean)
		{
			/**/ value = Boolean(value);
			this._mouseWheelEnabled = value;
			
			if (this._nativeInput) {
				
				this._nativeInput.setMouseWheel(value);
				
			}
		}
		
		/**
		 * Indicates whether field is a multiline text field. 
		 * @return 
		 * 
		 */		
		public get multiline():boolean { return this._multiline; }
		public set multiline(value:boolean)
		{
			/**/ value = Boolean(value);
			this._multiline = value;
			
			if (this._nativeInput) {
				
				this._nativeInput.setMultiline(value);
				
			}
		}
		
		/**
		 * Defines the number of text lines in a multiline text field. 
		 * @return 
		 * 
		 */		
		public get numLines():number  { return this._numLines; }
		
		/**
		 * Specifies whether the text field is a password text field. 
		 * @return 
		 * 
		 */		
		public get displayAsPassword():boolean { return false; }
		public set displayAsPassword(value:boolean)
		{
			/**/ value = Boolean(value);
			// not implemented
		}
		
		/**
		 * Indicates the set of characters that a user can enter into the text field. 
		 * @return 
		 * 
		 */		
		public get restrict():string  { return this._restrict; }
		public set restrict(value:string)
		{
			/**/ value = as(value, 'String');
			if (this._restrict == value) {
				
				return;
				
			}
			
			this._restrict = value;
			
			if (this._nativeInput) {
				
				this._nativeInput.setRestrict(value);
				
			}
		}
		
		/**
		 * The current horizontal scrolling position. 
		 * @return 
		 * 
		 */		
		public get scrollH():number { return this._scrollH; }
		public set scrollH(value:number)
		{
			/**/ value = ((value) >> 0);
			// not implemented
		}
		
		/**
		 * The vertical position of text in a text field. 
		 * @return 
		 * 
		 */		
		public get scrollV():number { return this._scrollV; }
		public set scrollV(index:number)
		{
			/**/ index = ((index) >> 0);
			this._scrollV = index;
			if (this._scrollV < 1) this._scrollV = 1;
			if (this._scrollV > this.maxScrollV) this._scrollV = this.maxScrollV;
			
			this.__setDirty(2);
		}
		
		/**
		 * A Boolean value that indicates whether the text field is selectable. 
		 * @return 
		 * 
		 */		
		public get selectable():boolean { return this._selectable; }
		public set selectable(value:boolean)
		{
			/**/ value = Boolean(value);
			this._selectable = value;
			
			if (this._nativeInput) {
				
				this._nativeInput.setSelectable(value);
				
			}
		}
		
		public get selectedText():string
		{
			return this.text.substring(this.selectionBeginIndex, this.selectionEndIndex);
		}
		
		/**
		 * The zero-based character index value of the first character in the current selection. 
		 * @return 
		 * 
		 */		
		public get selectionBeginIndex():number
		{
			if (this._nativeInput) {
				
				return this._nativeInput.getSelectionBegin();
				
			}
			
			// not implemented
			return 0;
		}
		
		/**
		 * The zero-based character index value of the last character in the current selection. 
		 * @return 
		 * 
		 */		
		public get selectionEndIndex():number
		{
			if (this._nativeInput) {
				
				return this._nativeInput.getSelectionEnd();
				
			}
			
			// not implemented
			return 0;
		}
		
		/**
		 * The sharpness of the glyph edges in this text field. 
		 * @return 
		 * 
		 */		
		public get sharpness():number  { return 0; }
		public set sharpness(value:number)  {/**/ value = (+(value));/**/ }
		
		/**
		 * Attaches a style sheet to the text field. 
		 * @return 
		 * 
		 */		
		public get styleSheet():StyleSheet  { return null; }
		public set styleSheet(value:StyleSheet)  {/**/ value = strict(value, StyleSheet);/**/ }
		
		/**
		 * A string that is the current text in the text field. 
		 * @return 
		 * 
		 */		
		public get text():string { return this._text; }
		public set text(value:string)
		{
			/**/ value = as(value, 'String');
			value =value || '';
			if (this._text == value) {
				
				return;
				
			}
			
			this._text = value;
			this._nativeDirtyText = true;
			
			this.__updateLines();
			
			this.scrollV = this.scrollV;
		}
		
		/**
		 * The color of the text in a text field, in hexadecimal format. 
		 * @return 
		 * 
		 */		
		public get textColor():number { return this._textFormat.color; }
		public set textColor(color:number)
		{
			/**/ color = ((color) >>> 0);
			this._textFormat.color = color;
			this._nativeDirtyTextFormat = true;
			
			this.__setDirty(2);
		}
		
		/**
		 * The height of the text in pixels. 
		 * @return 
		 * 
		 */		
		public get textHeight():number
		{
			if (this._numLines) {
				
				return this.__getLineHeight() * this._numLines;
				
			}
			
			return 0;
		}
		
		/**
		 * The width of the text in pixels. 
		 * @return 
		 * 
		 */		
		public get textWidth():number
		{
			if (this._numLines) {
				
				var w = 0;
				for (var i = 0; i < this._numLines; i++) {
					
					var w2 = this._linesWidth[i];
					if (w2 > w) {
						
						w = w2;
						
					}
				}
				
				return w;
			}
			
			return 0; 
		}
		
		/**
		 * The thickness of the glyph edges in this text field. 
		 * @return 
		 * 
		 */		
		public get thickness():number  { return 0; }
		public set thickness(value:number)  {/**/ value = (+(value));/**/ }
		
		/**
		 * The type of the text field. 
		 * @return 
		 * 
		 */		
		public get type():string  { return this._type; }
		public set type(value:string)
		{
			/**/ value = as(value, 'String');
			this._type = value;
			
			var NativeInput;
			if (!window.asc.text || typeof (NativeInput = window.asc.text.NativeInput) != 'function') {
				
				return;
				
			}
			
			if (this._type == 'input') {
				
				if (!this._nativeInput) {
					
					this._nativeInput = new NativeInput;
					this._nativeInput.setIndex(32);
					this._nativeInput.setSize(this._rect.width, this._rect.height);
					this._nativeInput.setMaxChars(this._maxChars);
					this._nativeInput.setWordWrap(this._wordWrap);
					this._nativeInput.setMouseWheel(this._mouseWheelEnabled);
					this._nativeInput.setMultiline(this._multiline);
					this._nativeInput.setRestrict(this._restrict);
					this._nativeInput.setSelectable(this._selectable);
					
					this._nativeDirtyText = true;
					this._nativeDirtyTextFormat = true;
					
					this.__nativeConnect();
					
				}
				
			} else if (this._nativeInput) {
				
				this.__nativeDisconnect();
				this._nativeInput = null;
				
			}
		}
		
		/**
		 * A Boolean value that indicates whether the text field has word wrap. 
		 * @return 
		 * 
		 */		
		public get wordWrap():boolean  { return this._wordWrap; }
		public set wordWrap(value:boolean)
		{
			/**/ value = Boolean(value);
			if (this._wordWrap == value) {
				
				return;
				
			}
			
			this._wordWrap = value;
			this.__updateLines();
			
			if (this._nativeInput) {
				
				this._nativeInput.setWordWrap(value);
				
			}
		}
		
		/**
		 * Appends the string specified by the newText parameter to the end of the text of the text field. 
		 * @param newText
		 * 
		 */		
		public appendText(newText:string):void
		{
			/**/ newText = as(newText, 'String');
			this.replaceText(this.text.length, this.text.length, newText);
		}
		
		/*override*/ public get width():number 
		{
			return this._autoSize != TextFieldAutoSize.NONE ? this.textWidth + 4 : this._width;
		}
		
		/*override*/ public set width(value:number)
		{
			/**/ value = (+(value));
			this._width = value;
			this.__updateRect();
			this.__setDirty(2);
		}
		
		/*override*/ public get height():number
		{
			return this._autoSize != TextFieldAutoSize.NONE ? this.textHeight + 4 : this._height;
		}
		
		/*override*/ public set height(value:number) 
		{
			/**/ value = (+(value));
			this._height = value;
			this.__updateRect();
			this.__setDirty(2);
		}
		
		/*private function copyRichText() : String
		{
			return this.getXMLText(this.selectionBeginIndex,this.selectionEndIndex);
		}*/
		
		/**
		 * Returns a rectangle that is the bounding box of the character. 
		 * @param charIndex
		 * @return 
		 * 
		 */		
		public getCharBoundaries(charIndex:number):Rectangle
		{
			/**/ charIndex = ((charIndex) >> 0);
			var r:Rectangle = new Rectangle;
			if (this._numLines) {
				
				var lineHeight:number = this.__getLineHeight();
				var j:number = 0;
				while (j < this._numLines) {
					
					var l:number =  ((this._lines[j].length) >> 0);
					if (charIndex > l) {
						
						charIndex -= l+1;
						j++;
						
					} else if (charIndex < l) {
						
						var char:string =  as(this._lines[j].charAt(charIndex), 'String');char
						var ctx:CanvasRenderingContext2D = Stage.sHelperCtx2d;
						ctx.font = this.defaultTextFormat.__getCss();
						var tm:TextMetrics = ctx.measureText(char);
						var lm:TextMetrics = ctx.measureText(this._lines[j].substring(0, charIndex));
						r.__setTo(lm.width, lineHeight * j, tm.width, lineHeight);
						break;
						
					} else if (charIndex == l) {
						
						// TODO
						// just x, y
						
						break; // \n
						
					}
					
				}
				
			}
			
			return r;
		}
		
		/**
		 * Returns the zero-based index value of the character at the point specified by the x and y parameters. 
		 * @param value
		 * @param param2
		 * @return 
		 * 
		 */		
		public getCharIndexAtPoint(value:number, param2:number):number  { /**/ value = (+(value)); param2 = (+(param2)); return 0; }
		
		/**
		 * Given a character index, returns the index of the first character in the same paragraph. 
		 * @param value
		 * @return 
		 * 
		 */		
		public getFirstCharInParagraph(value:number):number  { /**/ value = ((value) >> 0); return 0; }
		
		/**
		 * Returns the zero-based index value of the line at the point specified by the x and y parameters. 
		 * @param value
		 * @param param2
		 * @return 
		 * 
		 */		
		public getLineIndexAtPoint(value:number, param2:number):number  { /**/ value = (+(value)); param2 = (+(param2)); return 0; }
		
		/**
		 * Returns the zero-based index value of the line containing the character specified by the charIndex parameter. 
		 * @param value
		 * @return 
		 * 
		 */		
		public getLineIndexOfChar(value:number):number  { /**/ value = ((value) >> 0); return 0; }
		
		/**
		 * Returns the number of characters in a specific text line. 
		 * @param value
		 * @return 
		 * 
		 */		
		public getLineLength(value:number):number  { /**/ value = ((value) >> 0); return 0; }
		
		/**
		 * Returns metrics information about a given text line. 
		 * @param value
		 * @return 
		 * 
		 */		
		public getLineMetrics(value:number):TextLineMetrics  { /**/ value = ((value) >> 0); return null; }
		
		/**
		 * Returns the character index of the first character in the line that the lineIndex parameter specifies. 
		 * @param value
		 * @return 
		 * 
		 */		
		public getLineOffset(value:number):number  { /**/ value = ((value) >> 0); return 0; }
		
		/**
		 * Returns the text of the line specified by the lineIndex parameter. 
		 * @param value
		 * @return 
		 * 
		 */		
		public getLineText(value:number):string  { /**/ value = ((value) >> 0); return null; }
		
		/**
		 * Given a character index, returns the length of the paragraph containing the given character. 
		 * @param value
		 * @return 
		 * 
		 */		
		public getParagraphLength(value:number):number  { /**/ value = ((value) >> 0); return 0; }
		
		/**
		 * Returns a TextFormat object that contains formatting information for the range of text that the beginIndex and 
		 * endIndex parameters specify. 
		 * @param value
		 * @param param2
		 * @return 
		 * 
		 */		
		public getTextFormat(value:number = -1, param2:number = -1):TextFormat  { /**/ value = ((value) >> 0); param2 = ((param2) >> 0); return this._textFormat; }
		
		public getTextRuns(value:number = 0, param2:number = 2147483647):any[]  { /**/ value = ((value) >> 0); param2 = ((param2) >> 0); return null; }
		
		public getRawText():string  { return null; }
		
		/*
		private static var richTextFields:Array = ["font", "size", "color", "bold", "italic", "underline", "url", "target", "align", "leftMargin", "rightMargin", "indent", "leading", "blockIndent", "kerning", "letterSpacing", "display"];
		public function getXMLText(beginIndex:int = 0, endIndex:int = 2147483647) : String
		   {
		   var run:TextRun = null;
		   var format:TextFormat = null;
		   var text:String = null;
		   var runXML:XML = null;
		   var j:uint = 0;
		   var name:String = null;
		   var value:* = undefined;
		   var runs:Array = this.getTextRuns(beginIndex,endIndex);
		   var entireText:String = this.getRawText();
		   var result:XML = <flashrichtext version="1"/>;
		   for(var i:uint = 0; i < runs.length; i++)
		   {
		   run = runs[i];
		   format = run.textFormat;
		   text = entireText.substring(run.beginIndex,run.endIndex);
		   text = "(" + text + ")";
		   runXML = <textformat>{text}</textformat>;
		   for(j = 0; j < richTextFields.length; j++)
		   {
		   name = richTextFields[j];
		   value = format[name];
		   if(value != null)
		   {
		   runXML["@" + name] = value;
		   }
		   }
		   result.flashrichtext = result.flashrichtext + runXML;
		   }
		   return result.toXMLString();
		   }
		
		   public function insertXMLText(beginIndex:int, endIndex:int, richText:String, pasting:Boolean = false) : void
		   {
		   var run:XML = null;
		   var temp:* = 0;
		   var attributes:XMLList = null;
		   var format:TextFormat = null;
		   var attribute:XML = null;
		   var text:String = null;
		   var name:String = null;
		   var value:String = null;
		   var spaceAvail:* = 0;
		   var richTextXML:XML = XML(richText);
		   if(richTextXML.@version != "1")
		   {
		   Error.throwError(Error,2138);
		   }
		   if(beginIndex > endIndex)
		   {
		   temp = beginIndex;
		   beginIndex = endIndex;
		   endIndex = temp;
		   }
		   var first:Boolean = true;
		   for each(run in richTextXML..textformat)
		   {
		   attributes = run.attributes();
		   format = new TextFormat();
		   for each(attribute in attributes)
		   {
		   name = attribute.name().localName;
		   value = String(attribute);
		   if(name == "bold" || name == "italic" || name == "underline")
		   {
		   format[name] = value == "true";
		   }
		   else
		   {
		   format[name] = value;
		   }
		   }
		   text = String(run.children());
		   text = text.substring(1,text.length - 1);
		   if(this.maxChars > 0 && pasting == true)
		   {
		   spaceAvail = this.maxChars - this.length + (endIndex - beginIndex);
		   if(spaceAvail < text.length)
		   {
		   if(spaceAvail <= 0)
		   {
		   return;
		   }
		   text = text.substring(0,spaceAvail);
		   }
		   }
		   this.replaceText(beginIndex,endIndex,text);
		   this.setTextFormat(format,beginIndex,beginIndex + text.length);
		   beginIndex = beginIndex + text.length;
		   endIndex = beginIndex;
		   if(pasting)
		   {
		   this.setSelection(beginIndex,endIndex);
		   }
		   first = false;
		   }
		   if(first)
		   {
		   this.replaceText(beginIndex,endIndex,"");
		   }
		   }
		
		   private function pasteRichText(richText:String) : Boolean
		   {
		   if(richText == null)
		   {
		   Error.throwError(TypeError,2007,"richText");
		   }
		   try
		   {
		   this.insertXMLText(this.selectionBeginIndex,this.selectionEndIndex,richText,true);
		   }
		   catch(e:Error)
		   {
		   return false;
		   }
		   return true;
		   }*/
		
		/**
		 * Replaces the current selection with the contents of the value parameter. 
		 * @param value
		 * 
		 */		
		public replaceSelectedText(value:string):void  {/**/ value = as(value, 'String');/**/ }
		
		/**
		 * Replaces the range of characters that the beginIndex and endIndex parameters specify with the contents of the newText parameter. 
		 * @param beginIndex
		 * @param endIndex
		 * @param newText
		 * 
		 */		
		public replaceText(beginIndex:number, endIndex:number, newText:string):void
		{
			/**/ beginIndex = ((beginIndex) >> 0); endIndex = ((endIndex) >> 0); newText = as(newText, 'String');
			this.text = this._text.substr(0, beginIndex) + newText + this._text.substr(endIndex);
		}
		
		/**
		 * Sets as selected the text designated by the index values of the first and last characters, 
		 * which are specified with the beginIndex and endIndex parameters. 
		 * @param value
		 * @param param2
		 * 
		 */		
		public setSelection(begin:number, end:number):void
		{
			/**/ begin = ((begin) >> 0); end = ((end) >> 0);
			if (this._nativeInput) {
				
				this._nativeInput.setSelection(begin, end);
				
			}
			
			// not implemented
		}
		
		/**
		 * Applies the text formatting that the format parameter specifies to the specified text in a text field. 
		 * @param value
		 * @param param2
		 * @param param3
		 * 
		 */		
		public setTextFormat(value:TextFormat, begin:number = -1, end:number = -1):void
		{
			/**/ value = strict(value, TextFormat); begin = ((begin) >> 0); end = ((end) >> 0);
			this.__setDefaultTextFormat(value);
		}
		
		/**
		 * Returns a DisplayObject reference for the given id, for an image or SWF file that has been added to an HTML-formatted text field by using an <img> tag. 
		 * @param value
		 * @return 
		 * 
		 */		
		public getImageReference(value:string):DisplayObject  { /**/ value = as(value, 'String'); return null; }
		
		/**
		 * Specifies whether to copy and paste the text formatting along with the text. 
		 * @return 
		 * 
		 */		
		public get useRichTextClipboard():boolean  { return false; }
		public set useRichTextClipboard(value:boolean)  {/**/ value = Boolean(value);/**/ }
		
		/*[internal]*/ protected __onAddedToStage (event:Event):void
		{
			// event = strict(event, Event);
			this.addEventListener(MouseEvent.MOUSE_WHEEL, this.__onMouseWheel.__bind(this));
			
			if (this._nativeInput) {
				
				this.__nativeConnect();
				
			}
		}
		
		/*[internal]*/ protected __onRemovedFromStage (event:Event):void
		{
			// event = strict(event, Event);
			this.removeEventListener(MouseEvent.MOUSE_WHEEL, this.__onMouseWheel.__bind(this));
			
			if (this._nativeInput) {
				
				this.__nativeDisconnect();
				
			}
		}
		
		/*[internal]*/ protected __onMouseWheel (e:MouseEvent):void
		{
			// e = strict(e, MouseEvent);
			if (!this._mouseWheelEnabled || e.isDefaultPrevented()) {
				
				return;
				
			}
			
			if (this._nativeInput) {
				
				this.scrollV =(( this._nativeInput.getScrollV()) >> 0);
				e.preventDefault();
				
			} else {
				
				var delta:number = e.delta;
				if ((delta < 0 && this.scrollV < this.maxScrollV) || (delta > 0 && this.scrollV > 0)) {
					
					this.scrollV -= delta;
					e.preventDefault();
					
				}
				
			}
			
			this.dispatchEvent(new Event(Event.SCROLL));
		}
		
		/*[internal]*/ /*override*/ protected __predraw(ctx:WebGLContext2D, skipCache:any):boolean
		{
			// ctx = strict(ctx, WebGLContext2D);
			if (this._nativeInput) {
				
				this._nativeVisible = this._visible;
				
			}
			
			return this.__predrawDisplayObject(ctx, skipCache);
		}
		
		/*[internal]*/ /*override*/ protected __draw(ctx:WebGLContext2D, dirtyFlag:number = 0):boolean
		{
			// ctx = strict(ctx, WebGLContext2D); dirtyFlag = ((dirtyFlag) >> 0);
			if (this.__drawCache(ctx)) return false;
			
			if (this._border || this._background) {
				
				if (this._graphics.dirty) {
					
					this._graphics.clear();
					
					if (this._border) {
						
						this._graphics.lineStyle(0, this._borderColor);
						
					}
					
					if (this._background) {
						
						this._graphics.beginFill(this._backgroundColor);
						
					}
					
					this._graphics.drawRect(0, 0, this.width, this.height);
					
				}
				
				ctx.drawGraphics(this, this._graphics);
				
			}
			
			if (this._nativeInput) {
				
				if (this._nativeDirtyText) {
					
					this._nativeInput.setText(this._text);
					this._nativeDirtyText = false;
					
				}
				
				if (this._nativeDirtyTextFormat) {
					
					var f = this._textFormat;
					this._nativeInput.setTextFormat(f.font, f.size, f.color, f.bold, f.italic, f.underline, f.align, f.indent, f.leading, 0, 0);
					this._nativeDirtyTextFormat = false;
					
				}
				
				var c = ctx.mColorTransform;
				this._nativeInput.setAlpha(c.alphaMultiplier);
				
				return true;
				
			}
			
			var x, y;
			var lineWidth;
			var lineHeight = this.__getLineHeight(), indent = this._textFormat.indent, align = this._textFormat.align;
			var num = this._scrollV-1;
			for (var i = num; i < this._numLines; i++) {
				
				y = (i-num) * lineHeight;
				if (y + lineHeight > this._height) {
					
					break;
					
				}
				
				lineWidth = this._linesWidth[i];
				switch (align) {
					
					case 'center': // TextFormatAlign.CENTER
						x = (this._width - indent) - lineWidth >> 1;
						break;
					
					case 'right': // TextFormatAlign.RIGHT
						x = (this._width - indent) - lineWidth;
						break;
					
					default:
						x = indent;
						
				}
				
				ctx.drawText(this, this._lines[i], this._textFormat, x + 1, y + 2, lineWidth, lineHeight);
				
			}
			
			return true;
		}
		
		/*[internal]*/ /*override*/ protected __doMouse(stageX:number, stageY:number, isHitArea:boolean = false):DisplayObject 
		{
			// stageX = (+(stageX)); stageY = (+(stageY)); isHitArea = Boolean(isHitArea);
			if (!isHitArea && (!this._visible || this._maskParent)) {
				
				return null;
				
			}
			
			var target;
			if (this._width > 0 && this._height > 0) {
				
				var globalPoint = Point.__pool.get();
				var localPoint = Point.__pool.get();
				
				globalPoint.__setTo(stageX, stageY);
				this.__globalToLocal(globalPoint, localPoint);
				
				if (this._rect.__containsPoint(localPoint)) {
					
					target = this;
					
				}
				
			}
			
			Point.__pool.release(globalPoint);
			Point.__pool.release(localPoint);
			
			return target;
		}
		
		/*[internal]*/ protected __setDefaultTextFormat(value:TextFormat):void
		{
			// value = strict(value, TextFormat);
			this._textFormat = value;
			this._nativeDirtyTextFormat = true;
			
			this.__updateLines();
			
			this.scrollV = this.scrollV;
		}
		
		/*[internal]*/ protected __getFontHeight ():number
		{
			return TextField.__measureText(TextFormat.MEASURE_CHAR, this.defaultTextFormat).height;
		}
		
		/*[internal]*/ protected __getLineHeight ():number
		{
			return this.__getFontHeight() + this.defaultTextFormat.leading;
		}
		
		/*[internal]*/ /*override*/ protected __getBounds (rect:Rectangle, matrix:Matrix = null):void
		{
			// rect = strict(rect, Rectangle); matrix = strict(matrix, Matrix);
			var bounds = Rectangle.__pool.get ();
			bounds.__copyFrom (this._rect);
			
			if (matrix) {
				
				bounds.__transform (bounds, matrix);
				
			}
			
			rect.__expand (bounds.x, bounds.y, bounds.width, bounds.height);
			
			Rectangle.__pool.release (bounds);
		}
		
		/*internal*//*]*/ protected __updateLines ():void
		{
			if (!this._lines) {
				
				this._lines = [];
				this._linesWidth = [];
				
			} else {
				
				this._lines.length = this._linesWidth.length = 0;
				
			}
			
			var elastic = this._autoSize != 'none';
			var format = this.defaultTextFormat;
			var systemLetterSpacing = this.__getSystemLetterSpacing(format);
			
			var numLines = 0;
			var whiteSpaceIndex = -1;
			var widthFromWhiteSpace = 0;
			var currentLineText = '';
			var currentLineWidth = 0;
			for (var i = 0, len = this._text.length; i < len; ++i) {
				
				// current character
				var ch = this._text[i];
				if (ch == '\n' || ch == '\r') {
					
					// just ignore
					if (ch == '\r' && currentLineWidth == 0) {
						
						continue;
						
					}
					
					// finish current line
					this._lines[numLines] = currentLineText;
					this._linesWidth[numLines] = currentLineWidth;
					
					// next line
					numLines++;
					whiteSpaceIndex = -1;
					widthFromWhiteSpace = 0;
					currentLineText = '';
					currentLineWidth = 0;
					continue;
					
				}
				
				// character width
				var chWidth = TextField.__measureText(ch, format).width + systemLetterSpacing;
				
				// word wrap
				if (this._wordWrap && !elastic && currentLineWidth >= this._width && whiteSpaceIndex >= 0) {
					
					// whole line
					var wholeLine = currentLineText;
					
					// cut current line text
					currentLineText = wholeLine.substr(0, whiteSpaceIndex + 1); // after white space character
					
					// decrease current line width
					currentLineWidth -= widthFromWhiteSpace;
					
					// finish current line
					this._lines[numLines] = currentLineText;
					this._linesWidth[numLines] = currentLineWidth;
					
					// next line
					numLines++;
					currentLineText = wholeLine.substr(whiteSpaceIndex + 1) + ch;
					currentLineWidth = widthFromWhiteSpace + chWidth;
					
					var matches = currentLineText.match(/\s/);
					if (matches && matches.length) {
						
						whiteSpaceIndex = currentLineText.lastIndexOf(matches[matches.length - 1]);
						widthFromWhiteSpace = 0;
						
						for (var j = whiteSpaceIndex + 1, jLen = currentLineText.length; j < jLen; ++j) {
							
							widthFromWhiteSpace += TextField.__measureText(currentLineText[j], format).width + systemLetterSpacing;
							
						}
						
					} else {
						
						whiteSpaceIndex = 0;
						widthFromWhiteSpace = 0;
						
					}
					continue;
					
				} else {
					
					// update current line
					currentLineText += ch;
					currentLineWidth += chWidth;
					
				}
				
				if (/\s/.test(ch)) {
					
					whiteSpaceIndex = currentLineText.length - 1;
					widthFromWhiteSpace = 0;
					
				} else {
					
					widthFromWhiteSpace += chWidth;
					
				}
				
			}
			
			// finish last line
			this._lines[numLines] = currentLineText;
			this._linesWidth[numLines] = currentLineWidth;
			
			// num lines
			this._numLines =(( this._lines.length) >> 0);
			
			// auto size
			if (elastic) {
				
				this._width = this.textWidth + 4;
				this._height = this.textHeight + 2;
				this.__updateRect();
				
			}
			
			// dirty
			this.__setDirty(2);
		}
		
		/*[internal]*/ /*override*/ protected __getSystemLetterSpacing(format:TextFormat):number
		{
			// format = strict(format, TextFormat);
			var char = TextFormat.MEASURE_CHAR;
			var width = TextField.__measureText(char, format).width;
			var doubleWidth = TextField.__measureText(char + char, format).width;
			return doubleWidth - width * 2;
		}
		
		/*[internal]*/ /*override*/ protected __updateRect():void
		{
			this._rect.__setTo(0, 0, this._width, this._height);
			
			if (this._border) {
				
				this._rect.__expand(-1, -1, 1, 1);
				
			}
			
			if (this._nativeInput) {
				
				this._nativeInput.setSize(this._rect.width, this._rect.height);
				
			}
		}
		
		/*[internal]*/ /*override*/ protected __getWorldTransform ():Matrix
		{
			var m = super.__getWorldTransform();
			
			if (this._nativeInput) {
				
				this._nativeInput.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
				
			}
			
			return m;
		}
		
		/*[internal]*/ /*override*/ protected __drawEnter ():void
		{
			this._nativeVisible = false;
		}
		
		/*[internal]*/ /*override*/ protected __drawExit ():void
		{
			this._nativeInput.setVisible(this._nativeVisible);
		}
		
		/*[internal]*/ /*override*/ protected __isFocused ():boolean
		{
			if (this._nativeInput) {
				
				if (this._nativeInput.isFocused()) {
					
					return true;
					
				}
				
			}
			
			return false
		}
		
		/*[internal]*/ /*override*/ protected __setFocus ():void
		{
			if (this._nativeInput) {
				
				if (Capabilities.isMobile) {
					
					return;
					
				}
				
				this._nativeInput.setFocus();
				
			}
		}
		
		/*[internal]*/ protected __nativeConnect():void
		{
			if (!this._nativeInput) {
				
				return;
				
			}
			
			var b = this._nativeInput.body;
			var s = this.stage, container;
			if (!s || (container = s.__getBodyInternal()).contains(b)) {
				
				return;
				
			}
			
			container.appendChild(b);
			
			this._nativeInput.setMouseHandler(this.__onNativeMouse.__bind(this));
			this._nativeInput.setKeyboardHandler(this.__onNativeKeyboard.__bind(this));
			this._nativeInput.setChangeHandler(this.__onNativeChange.__bind(this));
			
			DisplayObject.__addDOMElement(this);
			
		}
		
		/*[internal]*/ protected __nativeDisconnect():void
		{
			if (!this._nativeInput) {
				
				return;
				
			}
			
			var b = this._nativeInput.body;
			var s = Stage.sCurrent, container; // WARNING: в этот момент уже нет stage, так что пока так
			if (!s || !(container = s.__getBodyInternal()).contains(b)) {
				
				return;
				
			}
			
			container.removeChild(b);
			
			this._nativeInput.setMouseHandler(null);
			this._nativeInput.setKeyboardHandler(null);
			this._nativeInput.setChangeHandler(null);
			
			DisplayObject.__removeDOMElement(this);
			
		}
		
		/*[internal]*/ protected __onNativeMouse(e:any):void
		{
			var s = this.stage;
			if (!s) {
				
				return;
				
			}
			
			e.preventDefault = null;
			s.__onCanvasMouseEvent(e);
		}
		
		/*[internal]*/ protected __onNativeKeyboard(e:any):void
		{
			if (e.type == 'keydown') {
				
				this.dispatchEvent(new Event(Event.CHANGE));
				
			}
		}
		
		/*[internal]*/ protected __onNativeChange(e:any):void
		{
			if (this._nativeInput) {
				
				this.text =as( this._nativeInput.getText(), 'String');
				this._nativeDirtyText = false;
				
			}
			
			this.dispatchEvent(new TextEvent(TextEvent.TEXT_INPUT));
		}
		
		/**
		 * Выдает размеры текста. 
		 * @param text
		 * @param font
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected static __measureText(text:string, format:TextFormat):Rectangle
		{
			// text = as(text, 'String'); format = strict(format, TextFormat);
			var font = format.font;
			var size = format.size;
			var bold = format.bold;
			var italic = format.italic;
			var mask = 1 | (bold ? 2 : 0) | (italic ? 2 : 0);
			
			var measureSize = TextFormat.MEASURE_FONT_SIZE;
			var db = TextField.MEASURE_CACHE;
			var cache = TextField.MEASURE_RESULT;
			
			cache.width = 0;
			cache.height = 0;
			
			if (!font || font == '' || size < 1) {
				
				return cache;
				
			}
			
			var dbFont = db[font];
			if (!dbFont) {
				
				dbFont = db[font] = {};
				
			}
			
			var dbText = dbFont[text];
			if (!dbText) {
				
				dbText = dbFont[text] = {};
				
			}
			
			var dbStyle = dbText[mask];
			if (!dbStyle) {
				
				dbStyle = dbText[mask] = {
					
					width: -1,
					height: -1
					
				};
				
			}
			
			var width = dbStyle.width;
			var height = dbStyle.height;
			if (width == -1 || height == -1) {
				
				var ctx:CanvasRenderingContext2D = Stage.sHelperCtx2d;
				ctx.font = format.__getCss(true);
				
				/////////////////////////////////////////////////////////////////////////////////
				//   ВАЖНО                                                                     //
				/////////////////////////////////////////////////////////////////////////////////
				//                                                                             //
				// - В данный момент, текст рендерится с параметром textBaseline="alphabetic"  //
				//   Это необходимо, что бы во всех браузерах верхний отступ был одинаковый    //
				//   (02.02.2018)                                                              //
				//                                                                             //
				// - Из-за этого мы не берем clientHeight (который тоже работает по-разному),  //
				//   а значит пытаемся угадать высоту своими силами                            //
				//                                                                             //
				// - По понятным причинам, точно определить мы не сможем,                      // 
				//   но у нас есть отправная точка - это size                                  //
				//                                                                             //
				// - P.S. Некий коэффициент N (float), был подобран экспериментально           //
				//                                                                             //
				/////////////////////////////////////////////////////////////////////////////////
				
				dbStyle.width = width = ctx.measureText(text).width;
				dbStyle.height = height = measureSize * 1.185;
				
			}
			
			var p = size / measureSize;
			cache.width = width * p;
			cache.height = height * p;
			return cache;
		}
		
		public /*override*/ toString ():string
		{
			return '[object TextField]';
		}
	}
}