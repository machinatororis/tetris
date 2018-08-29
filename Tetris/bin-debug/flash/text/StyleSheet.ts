/// <reference path="../../base.d.ts" />
/// <reference path="../events/EventDispatcher.ts" />

namespace flash.text
{
	export import EventDispatcher = flash.events.EventDispatcher;
	
   
   export  class StyleSheet extends EventDispatcher
   {
       
      private _css:any;
      
      constructor()
      {
				/**/ this._css === void 0 && (this._css = null);
				super();
				this._css = {};
				this._styles = {};
      }
      
      public getStyle(styleName:string) : any
      {
         /**/ styleName = as(styleName, 'String');
         return this._copy(this._css[styleName.toLowerCase()]);
      }
      
      public setStyle(styleName:string, styleObject:any) : void
      {
         /**/ styleName = as(styleName, 'String');
         var lowerStr:string = styleName.toLowerCase();
         this._css[lowerStr] = this._copy(styleObject);
         this.doTransform(lowerStr);
         this._update();
      }
      
      public clear() : void
      {
         this._css = {};
         this._styles = {};
         this._update();
      }
      
      public get styleNames() : any[]
      {
         var n:any = null;
         var a:any[] = [];
         var __for0 = window.asc.in(this._css);for(n of __for0)
         {
            a.push(n);
         }
         return a;
      }
      
      public transform(formatObject:any) : TextFormat
      {
         if(formatObject == null)
         {
            return null;
         }
         var f:TextFormat = new TextFormat();
         var v:any = formatObject.textAlign;
         if(v)
         {
            f.align =as( v, 'String');
         }
         v = formatObject.fontSize;
         if(v)
         {
            v = parseInt(v,10);
            if(v > 0)
            {
               f.size = v;
            }
         }
         v = formatObject.textDecoration;
         if(v == "none")
         {
            f.underline = false;
         }
         else if(v == "underline")
         {
            f.underline = true;
         }
         v = formatObject.marginLeft;
         if(v)
         {
            f.leftMargin = parseInt(v,10);
         }
         v = formatObject.marginRight;
         if(v)
         {
            f.rightMargin = parseInt(v,10);
         }
         v = formatObject.leading;
         if(v)
         {
            f.leading = parseInt(v,10);
         }
         v = formatObject.kerning;
         if(v == "true")
         {
            f.kerning = 1;
         }
         else if(v == "false")
         {
            f.kerning = 0;
         }
         else
         {
            f.kerning = parseInt(v,10);
         }
         v = formatObject.letterSpacing;
         if(v)
         {
            f.letterSpacing = parseFloat(v);
         }
         v = formatObject.fontFamily;
         if(v)
         {
            f.font = this._parseCSSFontFamily(v);
         }
         v = formatObject.display;
         if(v)
         {
            f.display =as( v, 'String');
         }
         v = formatObject.fontWeight;
         if(v == "bold")
         {
            f.bold = true;
         }
         else if(v == "normal")
         {
            f.bold = false;
         }
         v = formatObject.fontStyle;
         if(v == "italic")
         {
            f.italic = true;
         }
         else if(v == "normal")
         {
            f.italic = false;
         }
         v = formatObject.textIndent;
         if(v)
         {
            f.indent = parseInt(v,10);
         }
         v = formatObject.color;
         if(v)
         {
            v = this._parseColor(v);
            if(v != null)
            {
               f.color = v;
            }
         }
         return f;
      }
      
      public parseCSS(CSSText:string) : void
      {
         /**/ CSSText = as(CSSText, 'String');
         var n:string = null;
         var r:any = this._parseCSSInternal(CSSText);
         if(typeof r == "null")
         {
            return;
         }
         var __for1 = window.asc.in(r);for(n of __for1)
         {
            this._css[n] = this._copy(r[n]);
            this.doTransform(n);
         }
         this._update();
      }
      
       private get _styles() : any{return null}
      
       private set _styles(param1:any){/**/}
      
      private doTransform(n:string) : void
      {
         /**/ n = as(n, 'String');
         var f:TextFormat = this.transform(this._css[n]);
         this._css[n] = f;
      }
      
      private _copy(o:any) : any
      {
         var n:any = null;
         if(typeof o != "object")
         {
            return null;
         }
         var r:any = {};
         var __for2 = window.asc.in(o);for(n of __for2)
         {
            r[n] = o[n];
         }
         return r;
      }
      
       private _update() : void{/**/}
      
       private _parseCSSInternal(param1:string) : any{/**/ param1 = as(param1, 'String');return null}
      
       private _parseCSSFontFamily(param1:string) : string{/**/ param1 = as(param1, 'String');return null}
      
       private _parseColor(param1:string) : number{/**/ param1 = as(param1, 'String');return 0;}
   }

}