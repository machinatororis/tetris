/// <reference path="../../base.d.ts" />
/// <reference path="../utils/setTimeout.ts" />
/// <reference path="../utils/setInterval.ts" />
/// <reference path="../utils/getTimer.ts" />
/// <reference path="../utils/clearInterval.ts" />
/// <reference path="../ui/MouseCursor.ts" />
/// <reference path="../ui/Mouse.ts" />
/// <reference path="../ui/Keyboard.ts" />
/// <reference path="../ui/ContextMenu.ts" />
/// <reference path="../system/Capabilities.ts" />
/// <reference path="../net/URLVariables.ts" />
/// <reference path="../net/URLStream.ts" />
/// <reference path="../media/SoundMixer.ts" />
/// <reference path="../media/Sound.ts" />
/// <reference path="../geom/Rectangle.ts" />
/// <reference path="../geom/Point.ts" />
/// <reference path="../geom/Matrix.ts" />
/// <reference path="../external/ExternalInterface.ts" />
/// <reference path="../events/UncaughtErrorEvent.ts" />
/// <reference path="../events/StageOrientationEvent.ts" />
/// <reference path="../events/MouseEvent.ts" />
/// <reference path="../events/KeyboardEvent.ts" />
/// <reference path="../events/FullScreenEvent.ts" />
/// <reference path="../events/Event.ts" />
/// <reference path="../__native/utils/CSSColor.ts" />
/// <reference path="../__native/renderer/webgl/WebGLContext2D.ts" />

namespace flash.display
{
	export import WebGLContext2D = flash.__native.renderer.webgl.WebGLContext2D;
	export import CSSColor = flash.__native.utils.CSSColor;
	export import Event = flash.events.Event;
	export import FullScreenEvent = flash.events.FullScreenEvent;
	export import KeyboardEvent = flash.events.KeyboardEvent;
	export import MouseEvent = flash.events.MouseEvent;
	export import StageOrientationEvent = flash.events.StageOrientationEvent;
	export import UncaughtErrorEvent = flash.events.UncaughtErrorEvent;
	export import ExternalInterface = flash.external.ExternalInterface;
	export import Matrix = flash.geom.Matrix;
	export import Point = flash.geom.Point;
	export import Rectangle = flash.geom.Rectangle;
	export import Sound = flash.media.Sound;
	export import SoundMixer = flash.media.SoundMixer;
	export import URLStream = flash.net.URLStream;
	export import URLVariables = flash.net.URLVariables;
	export import Capabilities = flash.system.Capabilities;
	export import ContextMenu = flash.ui.ContextMenu;
	export import Keyboard = flash.ui.Keyboard;
	export import Mouse = flash.ui.Mouse;
	export import MouseCursor = flash.ui.MouseCursor;
	export import clearInterval = flash.utils.clearInterval;
	export import getTimer = flash.utils.getTimer;
	export import setInterval = flash.utils.setInterval;
	export import setTimeout = flash.utils.setTimeout;
	
	
	/**
	 * The Stage class represents the main drawing area.
	 * For SWF content running in the browser (in Flash® Player), the Stage represents the entire area where Flash content is shown. 
	 * For content running in AIR on desktop operating systems, each NativeWindow object has a corresponding Stage object.
	 * 
	 * The Stage object is not globally accessible. You need to access it through the stage property of a DisplayObject instance.
	 * 
	 * The Stage class has several ancestor classes — DisplayObjectContainer, InteractiveObject, DisplayObject, 
	 * and EventDispatcher — from which it inherits properties and methods. Many of these properties and methods are either inapplicable to 
	 * Stage objects, or require security checks when called on a Stage object. The properties and methods that require security checks 
	 * are documented as part of the Stage class.
	 * 
	 * In addition, the following inherited properties are inapplicable to Stage objects. If you try to set them, an IllegalOperationError is 
	 * thrown. These properties may always be read, but since they cannot be set, they will always contain default values.
	 * 
	 * accessibilityProperties
	 * alpha
	 * blendMode
	 * cacheAsBitmap
	 * contextMenu
	 * filters
	 * focusRect
	 * loaderInfo
	 * mask
	 * mouseEnabled
	 * name
	 * opaqueBackground
	 * rotation
	 * scale9Grid
	 * scaleX
	 * scaleY
	 * scrollRect
	 * tabEnabled
	 * tabIndex
	 * transform
	 * visible
	 * x
	 * y
	 * 
	 * Some events that you might expect to be a part of the Stage class, such as enterFrame, exitFrame, frameConstructed, and render, 
	 * cannot be Stage events because a reference to the Stage object cannot be guaranteed to exist in every situation where these events 
	 * are used. Because these events cannot be dispatched by the Stage object, they are instead dispatched by every DisplayObject instance, 
	 * which means that you can add an event listener to any DisplayObject instance to listen for these events. These events, 
	 * which are part of the DisplayObject class, are called broadcast events to differentiate them from events that target a specific 
	 * DisplayObject instance. Two other broadcast events, activate and deactivate, belong to DisplayObject's superclass, EventDispatcher. 
	 * The activate and deactivate events behave similarly to the DisplayObject broadcast events, except that these two events are dispatched 
	 * not only by all DisplayObject instances, but also by all EventDispatcher instances and instances of other EventDispatcher subclasses. 
	 * For more information on broadcast events, see the DisplayObject class. 
	 * @author pkulikov
	 * 
	 */	
	export  class Stage extends DisplayObjectContainer
	{
		/**
		 * Whether the application supports changes in the stage orientation (and device rotation). 
		 * @return 
		 * 
		 */		
		public static get supportsOrientationChange () : boolean
		{
			return true;
		}
		
		/**
		 * Current Stage instance. 
		 */		
		public static sCurrent : Stage = null;
		
		/**
		 * 2d utils.
		 */
		public static sHelperCanvas2d : HTMLCanvasElement = null;
		public static sHelperCtx2d : CanvasRenderingContext2D = null;
		static __block0 = function () { function $() {
			Stage.sHelperCanvas2d = as(document.createElement("canvas") , HTMLCanvasElement);
			Stage.sHelperCtx2d = as(Stage.sHelperCanvas2d.getContext("2d") , CanvasRenderingContext2D);
		}asc.stb(Stage,$); }();
		
		/**
		 * Constants 
		 */		
		private static EXPANDER_HEIGHT : number = 100;
		private static EXPANDER_DELAY : number = 2000;
		private static CLICK_COUNT_DISTANCE : number = 32;
		private static CLICK_COUNT_INTERVAL : number = 500;
		
		/**
		 * Helpers
		 */
		private static sStageID : number = 0;
		private static sHelperRect : Rectangle = asc.sti(Stage,()=>{ Stage.sHelperRect = new Rectangle; });
		private static sHelperPoint : Point = asc.sti(Stage,()=>{ Stage.sHelperPoint = new Point; });
		private static sHelperMouseEvent : any = {};
		private static sHelperCanvasOffset : any = { x: 0, y: 0 };
		private static sRequestAnimationFrame : Function =
			asc.sti(Stage,()=>{ Stage.sRequestAnimationFrame = window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame.__bind(window) ||
			window.mozRequestAnimationFrame.__bind(window) ||
			window.oRequestAnimationFrame.__bind(window) ||
			window.msRequestAnimationFrame.__bind(window) || 
			Stage.__requestAnimationFrameDefault.__bind(this); });
		
		/**
		 * id
		 */		
		/*[internal]*/ private _id : number;
		
		/**
		 * dom
		 */	
		private mBody : HTMLElement;
		private mBodyInternal : HTMLElement;
		private mBodyStyle : any;
		private mBodyMarginTop : number;
		private mBodyInternalStyle : any;
		private mBodyInternalTransform : Matrix;
		private mParentElement : HTMLElement;
		private mWmode : string;
		private mLastOrientation : string;
		private mAutoSize : number;
		private mNeedAutoSize : boolean;
		private mWindowHidden : boolean;
		private mStageHidden : boolean;
		private mColor : number;
		
		/**
		 * system panel
		 */		
		private mPanel : any;
		
		/**
		 * webgl 
		 */		
		private mCanvas : HTMLCanvasElement;
		private mCtx : WebGLContext2D;
		
		/**
		 * frame rate 
		 */		 
		private mFrameRate : number;
		private mFrameTime : number;
		
		/**
		 * Stage3D 
		 */		 
		private mStage3Ds : Stage3D[];
		
		/**
		 * mouse 
		 */		 
		private mMouseX : number;
		private mMouseY : number;
		private mCanvasMouseIsEnter : boolean;
		private mCanvasMouseIsDown : boolean;
		private mCanvasMouseButton : number;
		private mLastMouseDownObj : DisplayObject;
		private mLastMouseOverObj : DisplayObject;
		private mLastMouseWheelTime : number;
		private mMouseClickCount : number;
		private mMouseClickCountTime : number;
		private mMouseClickCountPos : Point;
		private mTouchMode : boolean;
		
		/**
		 * size 
		 */		 
		private mStageWidth : number;
		private mStageHeight : number;
		private mNormalRect : Rectangle;
		private mLastStageWidth : number;
		private mLastStageHeight : number;
		private mLastPixelAspectRatio : number;
		private mLastInnerHeight : number;
		
		/**
		 * events
		 */
		private _invalidated : boolean;
		private _broadcastEvent : Event;
		
		/**
		 * пропуск кадров рендерера, если низкая производительность
		 */		
		private mSkipping : boolean;
		private mSkippingLimit : number;
		
		/**
		 * сверх расходы 
		 */		
		private mOverhead : number;
		
		/**
		 * fixed orientation
		 */		
		private mFixedOrientation : string;
		private mForceUpdateBodyTransform : boolean;
		private mDeviceSpin : number;
		private mDeviceSpinInited : boolean;
		private mLastOrientationDeviceSpin : number;
		
		/**
		 * maximize
		 */		
		private mMaximize : boolean;
		private mExpander : HTMLElement;
		private mExpanderHeight : number;
		private mAllowAutoFullscreen : boolean;
		
		/**
		 * параметры поведения для настольного режима 
		 */		
		private mParamsDesktop : any;
		
		/**
		 * параметры поведения для мобильного режима
		 */		
		private mParamsMobile : any;
		
		/**
		 * Constructor 
		 * @param mainClass
		 * @param width
		 * @param height
		 * @param wmode
		 * @param flashvars
		 * @param params
		 * @param attributes
		 * 
		 */			
		constructor (mainClass : {new(...a)}, width : number = 0, height : number = 0, flashvars : string = null, params : any = null, attributes : any = null)
		{
			/**/ width = ((width) >> 0); height = ((height) >> 0); flashvars = as(flashvars, 'String');
			/**/ this.mBody === void 0 && (this.mBody = null);
			/**/ this.mBodyInternal === void 0 && (this.mBodyInternal = null);
			/**/ this.mBodyStyle === void 0 && (this.mBodyStyle = null);
			/**/ this.mBodyMarginTop === void 0 && (this.mBodyMarginTop = NaN);
			/**/ this.mBodyInternalStyle === void 0 && (this.mBodyInternalStyle = null);
			/**/ this.mBodyInternalTransform === void 0 && (this.mBodyInternalTransform = null);
			/**/ this.mParentElement === void 0 && (this.mParentElement = null);
			/**/ this.mWmode === void 0 && (this.mWmode = null);
			/**/ this.mLastOrientation === void 0 && (this.mLastOrientation = null);
			/**/ this.mAutoSize === void 0 && (this.mAutoSize = 0);
			/**/ this.mNeedAutoSize === void 0 && (this.mNeedAutoSize = false);
			/**/ this.mWindowHidden === void 0 && (this.mWindowHidden = false);
			/**/ this.mStageHidden === void 0 && (this.mStageHidden = false);
			/**/ this.mColor === void 0 && (this.mColor = 0);
			/**/ this.mPanel === void 0 && (this.mPanel = null);
			/**/ this.mCanvas === void 0 && (this.mCanvas = null);
			/**/ this.mCtx === void 0 && (this.mCtx = null);
			/**/ this.mFrameRate === void 0 && (this.mFrameRate = 0);
			/**/ this.mFrameTime === void 0 && (this.mFrameTime = 0);
			/**/ this.mStage3Ds === void 0 && (this.mStage3Ds = undefined);
			/**/ this.mMouseX === void 0 && (this.mMouseX = 0);
			/**/ this.mMouseY === void 0 && (this.mMouseY = 0);
			/**/ this.mCanvasMouseIsEnter === void 0 && (this.mCanvasMouseIsEnter = false);
			/**/ this.mCanvasMouseIsDown === void 0 && (this.mCanvasMouseIsDown = false);
			/**/ this.mCanvasMouseButton === void 0 && (this.mCanvasMouseButton = 0);
			/**/ this.mLastMouseDownObj === void 0 && (this.mLastMouseDownObj = null);
			/**/ this.mLastMouseOverObj === void 0 && (this.mLastMouseOverObj = null);
			/**/ this.mLastMouseWheelTime === void 0 && (this.mLastMouseWheelTime = 0);
			/**/ this.mMouseClickCount === void 0 && (this.mMouseClickCount = 1);
			/**/ this.mMouseClickCountTime === void 0 && (this.mMouseClickCountTime = 0);
			/**/ this.mMouseClickCountPos === void 0 && (this.mMouseClickCountPos = new Point);
			/**/ this.mTouchMode === void 0 && (this.mTouchMode = false);
			/**/ this.mStageWidth === void 0 && (this.mStageWidth = NaN);
			/**/ this.mStageHeight === void 0 && (this.mStageHeight = NaN);
			/**/ this.mNormalRect === void 0 && (this.mNormalRect = null);
			/**/ this.mLastStageWidth === void 0 && (this.mLastStageWidth = NaN);
			/**/ this.mLastStageHeight === void 0 && (this.mLastStageHeight = NaN);
			/**/ this.mLastPixelAspectRatio === void 0 && (this.mLastPixelAspectRatio = NaN);
			/**/ this.mLastInnerHeight === void 0 && (this.mLastInnerHeight = 0);
			/**/ this._invalidated === void 0 && (this._invalidated = false);
			/**/ this._broadcastEvent === void 0 && (this._broadcastEvent = new Event);
			/**/ this.mSkipping === void 0 && (this.mSkipping = false);
			/**/ this.mSkippingLimit === void 0 && (this.mSkippingLimit = 3);
			/**/ this.mOverhead === void 0 && (this.mOverhead = 0);
			/**/ this.mFixedOrientation === void 0 && (this.mFixedOrientation = null);
			/**/ this.mForceUpdateBodyTransform === void 0 && (this.mForceUpdateBodyTransform = false);
			/**/ this.mDeviceSpin === void 0 && (this.mDeviceSpin = 0);
			/**/ this.mDeviceSpinInited === void 0 && (this.mDeviceSpinInited = false);
			/**/ this.mLastOrientationDeviceSpin === void 0 && (this.mLastOrientationDeviceSpin = 0);
			/**/ this.mMaximize === void 0 && (this.mMaximize = false);
			/**/ this.mExpander === void 0 && (this.mExpander = null);
			/**/ this.mExpanderHeight === void 0 && (this.mExpanderHeight = 0);
			/**/ this.mAllowAutoFullscreen === void 0 && (this.mAllowAutoFullscreen = false);
			/**/ this.mParamsDesktop === void 0 && (this.mParamsDesktop = null);
			/**/ this.mParamsMobile === void 0 && (this.mParamsMobile = null);
			super(); 
			if (mainClass == null) {
				
				throw new Error('Please specify the main class');
				
			}
			
			// идентификатор
			this._id =(( Stage.sStageID++) >> 0);
			
			// сброс имени
			this._name = null;
			
			// проверка валидности аргументов
			params = params || {};
			attributes = attributes || {};
			attributes.id = attributes.id || 'playerglobal';
			
			// compiler arguments
			var compiler = window.asc.compiler || {}; if (!compiler.arguments) compiler.arguments = {};
			var defaultSize = (compiler.arguments['default-size'] || '800 600').split(' ');
			var defaultBackgroundColor = compiler.arguments['default-background-color'];
			
			// скипать ли кадры для оптимизации ENTER_FRAME
			this.mSkipping =Boolean( params.skipping);
			
			// параметры для платформ
			this.mParamsDesktop = params.desktop || {};
			this.mParamsMobile = params.mobile || {};
			
			// html тело
			this.mBody = document.createElement("div");
			this.mBody.id = 'stage' + this._id;
			
			// html стили
			this.mBodyStyle = this.mBody.style;
			this.mBodyStyle.position = 'absolute';
			this.mBodyStyle.left = this.mBodyStyle.top = '0';
			
			// прячем свойство style, чтобы никто не сломал
			Object.defineProperty(this.mBody, 'style', {
				value: {
					position: 'absolute',
					top: '0',
					left: '0'
				}
			});
			
			// внутренний контейнер
			// NOTE: в Firefox Mobile не работает стиль transform в полном экране (2018.03.23)
			this.mBodyInternal = document.createElement("div");
			this.mBodyInternalStyle = this.mBodyInternal.style;
			this.mBodyInternalStyle.position = 'absolute';
			this.mBodyInternalStyle.margin = this.mBodyInternalStyle.left = this.mBodyInternalStyle.top = '0';
			this.mBody.appendChild(this.mBodyInternal);
			
			// на какой платформе сейчас мы
			var deviceParams = Capabilities.isMobile ? this.mParamsMobile : this.mParamsDesktop;
			
			// зафиксировать ориентацию
			this.mFixedOrientation =as( deviceParams.orientation, 'String');
			
			// 1. пытаться переходить в полный экран автоматически
			// 2. использовать всю доступную площать экрана
			this.mMaximize =Boolean( deviceParams.maximize);
			if (this.mMaximize) {
				
				// пытаться переходить в полный экран автоматически
				this.mAllowAutoFullscreen = this.mMaximize;
				
				// для iOS добавляем дополнительный элемент на экран, для псевдо скроллинга
				if (/(iOS)/.test(Capabilities.os) && this.mFixedOrientation == 'landscape') {
					
					this.mExpander = document.createElement("div");
					
				}
				
			}
			
			// добавляемся в родителя, если указали
			var parentElement = typeof params.parent == 'string' ? document.getElementById(params.parent) : params.parent;
			if (typeof parentElement == 'object' && 'tagName' in parentElement) {
				
				this.setParent(parentElement);
				
				if (params.autoSize > 0) {
					
					width =(( parentElement.clientWidth * Capabilities.__getPixelAspectRatio()) >> 0);
					height =(( parentElement.clientHeight * Capabilities.__getPixelAspectRatio()) >> 0);
					
				}
				
			}
			
			// автоматически определять и изменять размер, операясь на родительский элемент
			this.setAutoSize(params.autoSize);
			
			// матрица трансформации для координат мышки / пальца
			switch (this.mFixedOrientation) {
				
				case 'landscape':
				case 'portrait':
					this.mBodyInternalTransform = new Matrix;
					break;
				
			}
			
			// режим рендера
			this.mWmode = 'direct';
			
			// текущая ориентация экрана
			this.mLastOrientation = this.deviceOrientation;
			
			// размер
			width = width > 0 ? width : parseInt(defaultSize[0]);
			height = height > 0 ? height : parseInt(defaultSize[1]);
			this.mStageWidth = this.mLastStageWidth = this.__getStageWidth(width, height);
			this.mStageHeight = this.mLastStageHeight = this.__getStageHeight(width, height);
			this.mLastPixelAspectRatio = Capabilities.__getPixelAspectRatio();
			
			// helpers
			this.mNormalRect = new Rectangle;
			
			// uncaughtErrorEvents
			window.onerror = function (message, url, lineNo, columnNo, error) {
				
				return this.__handleError(window.asc.e2e(error || message));
				
			}.__bind(this);
			
			// current
			this._stage = Stage.sCurrent = this;
			
			// frame rate
			this.frameRate = 60;
			
			// background color
			var bgcolor = params.bgcolor || defaultBackgroundColor;
			if (bgcolor) {
				
				this.color = CSSColor.stringToHex(bgcolor);
				
			}
			
			// panel
			if (params.panel !== null && typeof params.panel == 'object') {
				
				var ASCPanel;
				if (window.asc.panel && typeof (ASCPanel = window.asc.panel.ASCPanel) == 'function') {
					
					this.mPanel = new ASCPanel(params.panel);
					this.mBodyInternal.appendChild(this.mPanel.body);
					
				}
				
			}
			
			// external
			ExternalInterface.objectID =as( attributes.id, 'String');
			
			// window & stage3D
			this.mStage3Ds = (<Stage3D[]>[new Stage3D(this), new Stage3D(this), new Stage3D(this), new Stage3D(this)]);
			
			// canvas
			this.__updateCanvas(this.mStageWidth, this.mStageHeight);
			
			// loop
			setTimeout(this.__onAnimationFrame.__bind(this), 1);
			
			// resize
			window.addEventListener("resize", this.__onWindowResize.__bind(this), false);
			
			// scroll
			window.addEventListener("scroll", this.__updateBodyMargin.__bind(this), false);
			
			// orientation
			window.addEventListener("deviceorientation", this.__onWindowOrientation.__bind(this), true);
			
			// display state changed
			["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"].forEach(
				function(eventType) { document.addEventListener(eventType, this.__onFullscreenChange.__bind(this)); }.__bind(this)
			);
			
			// visibility
			setInterval(this.__onWindowVisibilityCheck.__bind(this), 200);
			window.addEventListener('blur', this.__onWindowBlur.__bind(this), false);
			window.addEventListener('focus', this.__onWindowFocus.__bind(this), false);
			
			// base
			var base = params.base;
			if (base) {
				
				URLStream.__base =as( base, 'String');
				Sound.__base =as( base, 'String');
				Loader.__base =as( base, 'String');
				
			}
			
			// parameters
			var parameters = {}, s;
			
			// the query string in the URL
			var query = new URLVariables(window.location.search.substr(1));
			var __for0 = window.asc.in(query);
			for (s of __for0) parameters[s] = query[s];
			
			// the value of the FlashVars HTML parameter
			var variables = new URLVariables(flashvars || '');
			var __for1 = window.asc.in(variables);
			for (s of __for1) parameters[s] = variables[s];
			
			// info
			this._loaderInfo = new LoaderInfo;
			this._loaderInfo._contentType = 'application/x-shockwave-flash';
			this._loaderInfo._frameRate = this.frameRate;
			this._loaderInfo._parameters = parameters;
			this._loaderInfo._url = this._loaderInfo.loaderURL;
			
			// root
			window.asc.startTime = Date.now();
			window.asc.createDisplayObject(mainClass, [], this, this._childrenLength, true, this._loaderInfo);
			
			// progress
			this._loaderInfo.__setProgress(0, 1024);
			this._loaderInfo.__contentComplete();
		}
		
		/**
		 * Calling the invalidate() method signals Flash runtimes to alert display objects on the next opportunity it has to render 
		 * the display list (for example, when the playhead advances to a new frame). 
		 * 
		 */		
		public invalidate():void
		{
			this._invalidated = true;
		}
		
		/**
		 * Root HTMLElement
		 * @return 
		 * 
		 */		
		public get body ():HTMLElement
		{
			return this.mBody;
		}
		
		/**
		 * The physical orientation of the device. 
		 * @return 
		 * 
		 */		
		public get deviceOrientation ():string
		{
			if (window.matchMedia("(orientation: portrait)").matches) {

				return 'portrait';
				
			}
			
			if (window.matchMedia("(orientation: landscape)").matches) {
				
				return 'landscape';
				
			}
			
			return 'portrait';
		}
		
		/**
		 * The current orientation of the stage.
		 * @return 
		 * 
		 */		
		public get orientation ():string
		{
			return this.deviceOrientation;
		}
		
		/**
		 * The orientations supported by the current device. 
		 * @return 
		 * 
		 */		
		public get supportedOrientations () : string[]
		{
			return new Array<string>([StageOrientation.PORTRAIT, StageOrientation.LANDSCAPE]);
		}
		
		/**
		 * Specifies whether the stage automatically changes orientation when the device orientation changes. 
		 * @return 
		 * 
		 */		
		public get autoOrients () : boolean { return true; }
		public set autoOrients (value:boolean) {  /**/ value = Boolean(value);  }
		
		/**
		 * Gets and sets the frame rate of the stage. 
		 * @return 
		 * 
		 */		
		public get frameRate():number { return this.mFrameRate; }
		public set frameRate(value:number)
		{
			/**/ value = (+(value));
			this.mFrameRate =(( value) >> 0);
			this.mFrameTime =(( 1000 / this.mFrameRate) >> 0);
		}
		
		/**
		 * Sets the stage to an orientation with the specified aspect ratio. 
		 * @param newAspectRatio
		 * 
		 */		
		public setAspectRatio(newAspectRatio:string):void
		{
			/**/ newAspectRatio = as(newAspectRatio, 'String');
			// not supported
		}
		
		/**
		 * Sets the stage to the specified orientation. 
		 * @param newOrientation
		 * 
		 */		
		public setOrientation(newOrientation:string):void
		{
			/**/ newOrientation = as(newOrientation, 'String');
			// not supported
		}
		
		/**
		 * Enable auto size.
		 * @param value
		 * 
		 */		
		public setAutoSize (time:number):Stage
		{
			/**/ time = ((time) >> 0);
			clearInterval(this.mAutoSize);
			
			if (time > 0) {
				
				this.mAutoSize = setInterval(requestAutoSize.__bind(this), Math.max(Math.min(time, 1000), 1000 / 60));
				
			} else {
				
				this.mAutoSize = 0;
				
			}
			
			this.mNeedAutoSize = this.mAutoSize > 0;
			return this;
			
			function requestAutoSize ():void {
				
				this.mNeedAutoSize = true;
				
			}
		}
		
		/**
		 * A value from the StageScaleMode class that specifies which scale mode to use. 
		 * @return 
		 * 
		 */		
		public get scaleMode():string  { return null; }
		public set scaleMode(value:string)  { /**/ value = as(value, 'String'); }
		
		/**
		 * A value from the StageAlign class that specifies the alignment of the stage in Flash Player or the browser. 
		 * @return 
		 * 
		 */		
		public get align():string  { return null; }
		public set align(value:string) { /**/ value = as(value, 'String'); }
		
		/**
		 * Specifies the current width, in pixels, of the Stage. 
		 * @return 
		 * 
		 */		
		public get stageWidth():number
		{
			return this.mStageWidth;
		}
		
		public set stageWidth(value:number)
		{
			/**/ value = ((value) >> 0);
			if (this.displayState != 'normal') {
				
				return;
				
			}
			
			this.mStageWidth = value;
		}
		
		/**
		 * The current height, in pixels, of the Stage. 
		 * @return 
		 * 
		 */		
		public get stageHeight():number
		{
			return this.mStageHeight;
		}
		
		public set stageHeight(value:number)
		{
			/**/ value = ((value) >> 0);
			if (this.displayState != 'normal') {
				
				return;
				
			}
			
			this.mStageHeight = value;
		}
		
		/**
		 * Specifies whether to show or hide the default items in the Flash runtime context menu. 
		 * @return 
		 * 
		 */		
		public get showDefaultContextMenu():boolean  { return false; }
		public set showDefaultContextMenu(value:boolean)  { /**/ value = Boolean(value); }
		
		/**
		 * Controls Flash runtime color correction for displays. 
		 * @return 
		 * 
		 */		
		public get colorCorrection():string  { return null; }
		public set colorCorrection(param1:string)  { /**/ param1 = as(param1, 'String'); }
		
		/**
		 * Specifies whether the Flash runtime is running on an operating system that supports color correction and whether the color 
		 * profile of the main (primary) monitor can be read and understood by the Flash runtime. 
		 * @return 
		 * 
		 */		
		public get colorCorrectionSupport():string  { return null; }
		
		/**
		 * Determines whether the Stage.focus property returns null for security reasons. 
		 * @return 
		 * 
		 */		
		public isFocusInaccessible():boolean  { return false; }
		
		/**
		 * Specifies whether or not objects display a glowing border when they have focus. 
		 * @return 
		 * 
		 */		
		public get stageFocusRect():boolean  { return false; }
		public set stageFocusRect(value:boolean)  { /**/ value = Boolean(value); }
		
		/**
		 * A value from the StageQuality class that specifies which rendering quality is used. 
		 * @return 
		 * 
		 */		
		public get quality():string  { return null; }
		public set quality(value:string)  { /**/ value = as(value, 'String'); }
		
		/**
		 * A value from the StageDisplayState class that specifies which display state to use. 
		 * @return 
		 * 
		 */		
		public get displayState():string
		{
			return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement ? 
				'fullScreen' : 
				'normal';
		}
		
		public set displayState(state:string)
		{
			/**/ state = as(state, 'String');
			if (state == 'normal') {
				
				var cancelFunc:Function = (document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen);
				cancelFunc.call(document);
				
			} else {
				
				var target:any = this.mBody;
				var requestFunc:Function = (target.requestFullscreen || target.webkitRequestFullscreen || target.mozRequestFullScreen || target.msRequestFullscreen);
				
				if (!requestFunc) {
					
					return;
					
				}
				
				this.mAllowAutoFullscreen = false;
				this.mNormalRect.__setTo(this.x, this.y, this.mStageWidth, this.mStageHeight);
				requestFunc.call(target);
			}
		}
		
		/**
		 * Sets the Flash runtime to scale a specific region of the stage to full-screen mode. 
		 * @return 
		 * 
		 */		
		public get fullScreenSourceRect():Rectangle { return null; }
		public set fullScreenSourceRect(value:Rectangle) {  /**/ value = strict(value, Rectangle);  }
		
		/**
		 * The interactive object with keyboard focus; or null if focus is not set or if the focused object belongs to a 
		 * security sandbox to which the calling object does not have access. 
		 */		
		public get focus (): InteractiveObject
		{
			var __for2 = window.asc.of(DisplayObject.sDOMElements);
			for  (var d of __for2) {
				
				if (d.__isFocused()) {
					
					return d;
					
				}
				
			}
			
			return null;
		}
		
		public set focus (value:InteractiveObject)
		{
			/**/ value = strict(value, InteractiveObject);
			var __for3 = window.asc.of(DisplayObject.sDOMElements);
			for  (var d of __for3) {
				
				if (d != value) {
					
					continue;
					
				}
				
				d.__setFocus();
				break;
				
			}
		}
		
		/**
		 * Set to true to enable mouse locking. 
		 * @return 
		 * 
		 */		
		public get mouseLock():boolean  { return false; }
		public set mouseLock(param1:boolean)  { /**/ param1 = Boolean(param1); }
		
		/**
		 * A list of StageVideo objects available for playing external videos. 
		 * @return 
		 * 
		 */		
		// public function get stageVideos() : Vector.<StageVideo>{return null}
		
		/**
		 * A list of Stage3D objects available for displaying 3-dimensional content. 
		 * @return 
		 * 
		 */		
		public get stage3Ds():Stage3D[]  { return this.mStage3Ds; }
		
		/**
		 * The SWF background color. 
		 * @return 
		 * 
		 */		
		public get color():number  { return this.mColor; }
		public set color(value:number)
		{
			/**/ value = ((value) >>> 0);
			this.mColor = value;
			this.mBodyInternalStyle.backgroundColor = CSSColor.hexToString(this.mColor);
		}
		
		/**
		 * Returns the width of the monitor that will be used when going to full screen size, if that state is entered immediately. 
		 * @return 
		 * 
		 */		
		public get fullScreenWidth():number
		{
			return Capabilities.screenResolutionX;
		}
		
		/**
		 * Returns the height of the monitor that will be used when going to full screen size, if that state is entered immediately.
		 * @return 
		 * 
		 */		
		public get fullScreenHeight():number
		{
			return Capabilities.screenResolutionY;
		}
		
		/**
		 * Indicates whether GPU compositing is available and in use. 
		 * @return 
		 * 
		 */		
		public get wmodeGPU():boolean  { return this.mWmode.indexOf('gpu') >= 0; }
		
		/**
		 * A Rectangle specifying the area of the stage that is currently covered by a soft keyboard. 
		 * @return 
		 * 
		 */		
		public get softKeyboardRect():Rectangle  { return null }
		
		/**
		 * Specifies whether this stage allows the use of the full screen mode 
		 * @return 
		 * 
		 */		
		public get allowsFullScreen():boolean  { return true; }
		
		/**
		 * Specifies whether this stage allows the use of the full screen with text input mode 
		 * @return 
		 * 
		 */		
		public get allowsFullScreenInteractive():boolean  { return false; }
		
		/**
		 * Specifies the effective pixel scaling factor of the stage. 
		 * @return 
		 * 
		 */		
		public get contentsScaleFactor():number  { return 1; }
		
		/**
		 * Specifies the browser zoom factor. 
		 * @return 
		 * 
		 */		
		public get browserZoomFactor():number  { return 1; }
		
		/**
		 * redefinition 
		 * @return 
		 * 
		 */		
		/*override*/ public get mouseX():number
		{
			return this.mMouseX;
		}
		
		/*override*/ public get mouseY():number
		{
			return this.mMouseY;
		}
		
		/*override*/ public set x(v:number)
		{
			/**/ v = (+(v));
			throw new Error('The Stage class does not implement this property or method.', 2071);
		}
		/*override*/ public get x():number { return this.super('flash.display.DisplayObject', 'x'); }
		
		/*override*/ public set y(v:number)
		{
			/**/ v = (+(v));
			throw new Error('The Stage class does not implement this property or method.', 2071);
		}
		/*override*/ public get y():number { return this.super('flash.display.DisplayObject', 'y'); }
		
		/*override*/ public set width(v:number)
		{
			/**/ v = (+(v));
			throw new Error('The Stage class does not implement this property or method.', 2071);
		}
		/*override*/ public get width():number { return this.super('flash.display.DisplayObject', 'width'); }
		
		/*override*/ public set height(v:number)
		{
			/**/ v = (+(v));
			throw new Error('The Stage class does not implement this property or method.', 2071);
		}
		/*override*/ public get height():number { return this.super('flash.display.DisplayObject', 'height'); }
		
		/*override*/ public set scaleX(v:number)
		{
			/**/ v = (+(v));
			throw new Error('The Stage class does not implement this property or method.', 2071);
		}
		/*override*/ public get scaleX():number { return this.super('flash.display.DisplayObject', 'scaleX'); }
		
		/*override*/ public set scaleY(v:number)
		{
			/**/ v = (+(v));
			throw new Error('The Stage class does not implement this property or method.', 2071);
		}
		/*override*/ public get scaleY():number { return this.super('flash.display.DisplayObject', 'scaleY'); }
		
		/*override*/ public set filters(value:any[])
		{
			/**/ value = strict(value, Array);
			throw new Error('The Stage class does not implement this property or method.', 2071);
		}
		/*override*/ public get filters():any[] { return this.super('flash.display.DisplayObject', 'filters'); }
		
		public setParent (parentElement:HTMLElement):Stage
		{
			/**/ parentElement = strict(parentElement, HTMLElement);
			if (this.mParentElement = parentElement) {
				
				if (!parentElement.contains(this.mBody)) {
					
					parentElement.appendChild(this.mBody);
					
				}
				
				if (this.mExpander) {
					
					if (!parentElement.contains(this.mExpander)) {
						
						parentElement.appendChild(this.mExpander);
						
					}
					
				}
				
				if (this.mAutoSize) {
					
					this.mNeedAutoSize = true;
					
				}
				
			}
			
			return this;
		}
		
		/*[internal]*/ /*override*/ protected __getRoot():DisplayObject
		{
			return this;
		}
		
		/**
		 * HTMLElement main container
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected __getBodyInternal ():HTMLElement
		{
			return this.mBodyInternal;
		}
		
		/*[internal]*/ /*override*/ protected __getStageWidth (width:number, height:number):number
		{
			// width = (+(width)); height = (+(height));
			if (this.__isNeedFixedOrientationCalc()) {
				
				return height;
				
			}
			
			return width;
		}
		
		/*[internal]*/ /*override*/ protected __getStageHeight (width:number, height:number):number
		{
			// width = (+(width)); height = (+(height));
			if (this.__isNeedFixedOrientationCalc()) {
				
				return width;
				
			}
			
			return height;
		}
		
		/*[internal]*/ /*override*/ protected __isNeedFixedOrientationCalc ():boolean
		{
			switch (this.mFixedOrientation) {
				
				case 'landscape':
				case 'portrait':
					return this.mFixedOrientation != this.deviceOrientation;
				
			}
			
			return false;
		}
		
		/**
		 * Get/create canvas 
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected __getCanvas():HTMLCanvasElement
		{
			if (!this.mCanvas)
			{
				this.mCanvas = as(this.mBodyInternal.appendChild(window.asc.getCanvas(this._id)) , HTMLCanvasElement);
				
				// mouse or touch
				this.mTouchMode = Capabilities.touchscreenType == 'finger';
				if (this.mTouchMode) {
					
					// touch
					this.mCanvas.addEventListener("touchstart", this.__onCanvasTouchEvent.__bind(this));
					window.addEventListener("touchmove", this.__onCanvasTouchEvent.__bind(this));
					window.addEventListener("touchend", this.__onCanvasTouchEvent.__bind(this));
					window.addEventListener("touchcancel", this.__onCanvasTouchEvent.__bind(this));
					
				} else {
					
					// mouse
					this.mCanvas.addEventListener("mouseleave", this.__onCanvasMouseEvent.__bind(this));
					this.mCanvas.addEventListener("mousedown", this.__onCanvasMouseEvent.__bind(this));
					this.mCanvas.addEventListener("contextmenu", this.__onCanvasMouseEvent.__bind(this));
					window.addEventListener("mousemove", this.__onCanvasMouseEvent.__bind(this));
					window.addEventListener("mouseup", this.__onCanvasMouseEvent.__bind(this));
					
				}
				
				// keyboard
				document.addEventListener("keydown", this.__onCanvasKeyEvent.__bind(this));
				document.addEventListener("keyup", this.__onCanvasKeyEvent.__bind(this));
				
				// wheel
				window.addEventListener('DOMMouseScroll', this.__onCanvasMouseEvent.__bind(this));
				if (window.onmousewheel) window.onmousewheel = this.__onCanvasMouseEvent.__bind(this);
				else this.mCanvas.addEventListener("mousewheel", this.__onCanvasMouseEvent.__bind(this));
				
				// window mouse over
				window.addEventListener("mouseover", this.__onWindowMouseOver.__bind(this));
			}
			
			return this.mCanvas;
		}
		
		/**
		 * CanvasRenderingContext2D 
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected __getCtx():WebGLContext2D
		{
			if (!this.mCtx) {
				
				var canvas = this.__getCanvas();
				this.mCtx =strict( window.asc.getCtx(this._id), WebGLContext2D);
				this.mCtx.context.configureBackBuffer(this.mStageWidth, this.mStageHeight, 0, false);
				
			}
			
			return this.mCtx;
		}
		
		/**
		 * Update canvas size
		 * 
		 */		
		/*[internal]*/ private __updateCanvas(width:number, height:number):void
		{
			// width = ((width) >> 0); height = ((height) >> 0);
			var canvas = this.__getCanvas();
			
			this.mBodyStyle.width = this.mBodyInternalStyle.width = (canvas.width = width) / Capabilities.__getPixelAspectRatio() + 'px';
			this.mBodyStyle.height = this.mBodyInternalStyle.height = (canvas.height = height) / Capabilities.__getPixelAspectRatio() + 'px';
			
			this.__updateBodyTransform();
			
			this.__setDirty(1);
		}
		
		/*[internal]*/ private __updateBodyTransform ():void
		{
			var pixelAspectRatio = Capabilities.__getPixelAspectRatio();
			var width = this.mStageWidth / pixelAspectRatio;
			var height = this.mStageHeight / pixelAspectRatio;
			
			if (this.__isNeedFixedOrientationCalc()) {
				
				var spin = this.mLastOrientationDeviceSpin;
				var x = 0, y = 0, d = 0;
				switch (this.mFixedOrientation) {
					
					case 'landscape':
						
						if (spin <= 0) {
							
							d = 90;
							x = height;
							
						} else {
							
							d = 270;
							y = width;
							
						}
						break;
					
					case 'portrait':
						
						if (spin <= 0) {
							
							d = -90;
							y = width;
							
						} else {
							
							d = -270;
							x = height;
							
						}
						break;
					
				}
				
				this.mBodyInternalStyle.transformOrigin = 'left top';
				this.mBodyInternalStyle.transform = 'translate('+x+'px, '+y+'px) rotate('+d+'deg)';
				
				this.mBodyInternalTransform.identity();
				this.mBodyInternalTransform.rotate(d * Math.PI / 180);
				this.mBodyInternalTransform.translate(x * pixelAspectRatio, y * pixelAspectRatio);
				this.mBodyInternalTransform.invert();
				
			} else {
				
				if (this.mBodyInternalTransform) {
					
					this.mBodyInternalTransform.identity();
					
				}
				
				this.mBodyInternalStyle.transformOrigin = this.mBodyInternalStyle.transform = '';
				
			}
			
			if (this.mPanel) {
				
				var pixelAspectRatio = Capabilities.__getPixelAspectRatio();
				var x = 0, y = 0;
				var width = this.mStageWidth, height = this.mStageHeight;
				if (/(iOS)/.test(Capabilities.os)) {
					
					y = 44;
					
				}
				
				x /= pixelAspectRatio;
				y /= pixelAspectRatio;
				width /= pixelAspectRatio;
				height /= pixelAspectRatio;
				
				this.mPanel.setViewport(x, y, width, height);
				
			}
		}
		
		/*[internal]*/ private __updateBodyMargin ():void
		{
			if (!this.mExpander || !this.mParentElement) {
				
				return;
				
			}
			
			var inverted = this.__isNeedFixedOrientationCalc();
			var displayHeight = this.mStageHeight;
			if (inverted) {
				
				displayHeight = this.mStageWidth;
				
			}
			displayHeight /= Capabilities.__getPixelAspectRatio();
			
			var innerHeight = window.innerHeight;
			var scrollY = window.scrollY || 0;
			if (isNaN(scrollY)) {
				
				scrollY = 0;
				
			}
			
			var increaseExpander = (scrollY > 0 && innerHeight < this.mLastInnerHeight) || inverted;
			if (increaseExpander) {
				
				var expanderHeight = displayHeight + scrollY + Stage.EXPANDER_HEIGHT;
				
				if (inverted) {
					
					expanderHeight = displayHeight;
					
				}
				
				if (expanderHeight != this.mExpanderHeight) {
					
					this.mExpanderHeight =(( expanderHeight) >> 0);
					this.mExpander.style.height = this.mExpanderHeight + 'px';
					
				}
				
			}
			
			var marginTop = (innerHeight + scrollY) - displayHeight;
			
			if (!inverted) {
				
				marginTop -= innerHeight - this.mParentElement.clientHeight;
				
			}
			
			if (this.mBodyMarginTop != marginTop) {
				
				if (isNaN(this.mBodyMarginTop)) {
					
					this.mBodyMarginTop = 0;
					
				}
				
				var topDiff = marginTop - this.mBodyMarginTop;
				
				this.mBodyMarginTop += topDiff / 2;
				if (topDiff <= 1) {
					
					this.mBodyMarginTop =(+( marginTop));
					
				}
				
				this.mBodyStyle.marginTop = this.mBodyMarginTop + 'px';
				
			}
			
			this.mLastInnerHeight =(( innerHeight) >> 0);
		}
		
		/**
		 * Resize event handler
		 * @param e
		 * 
		 */		
		/*[internal]*/ private __onWindowResize():void
		{
			var currentOrientation:string = this.deviceOrientation;
			if (currentOrientation != this.mLastOrientation) {
				
				this.mForceUpdateBodyTransform = true;
				this.dispatchEvent(new StageOrientationEvent(StageOrientationEvent.ORIENTATION_CHANGE, true, false, this.mLastOrientation, this.mLastOrientation = currentOrientation));
				
			}
			
			if (!this.__isNeedFixedOrientationCalc()) {
				
				this.mLastOrientationDeviceSpin = this.mDeviceSpin;
				
			}
			
			if (this.displayState == 'fullScreen') {
				
				this.__updateFullscreenStage();
				
			}
		}
		
		/**
		 * Orientation event handler
		 */		
		/*[internal]*/ private __onWindowOrientation(event:any):void
		{
			// fail on desktop
			event = event || { alpha: 0, beta: 0, gamma: 0 };
			
			var alpha = event.alpha;
			var beta = event.beta;
			var gamma = event.gamma;
			
			// JS math works in radians, so convert
			var betaR = beta / 180 * Math.PI;
			var gammaR = gamma / 180 * Math.PI;
			var spinR = Math.atan2(Math.cos(betaR) * Math.sin(gammaR), Math.sin(betaR));
			
			// convert back to degrees
			this.mDeviceSpin =(( spinR * 180 / Math.PI) >> 0);
			
			// first detection
			if (!this.mDeviceSpinInited) {
				
				if (!this.__isNeedFixedOrientationCalc()) {

					this.mLastOrientationDeviceSpin = this.mDeviceSpin;
					
				}
				
				this.mDeviceSpinInited = true;
			}
		}
		
		/**
		 * Blur event handler
		 * @param e
		 * 
		 */		
		/*[internal]*/ private __onWindowBlur():void
		{
			this.__onWindowVisibilityCheck();
		}
		
		/**
		 * Focus event handler
		 * @param e
		 * 
		 */		
		/*[internal]*/ private __onWindowFocus():void
		{
			this.__onWindowVisibilityCheck(true);
		}
		
		/**
		 * Check window hidden state
		 * @param e
		 * 
		 */
		/*[internal]*/ private __onWindowVisibilityCheck(forceVisible:boolean = false):void
		{
			// forceVisible = Boolean(forceVisible);
			if ((this.mWindowHidden = forceVisible || document.hidden) == this.mStageHidden) {
				
				return;
				
			}
			
			this.mStageHidden = this.mWindowHidden;
			this.dispatchEvent(new Event(this.mStageHidden ? Event.DEACTIVATE : Event.ACTIVATE));
			
			if (this.mPanel) {
				
				if (this.mWindowHidden) {
					
					this.mPanel.close(false);
					SoundMixer.__setMute(true);
					
				} else {
					
					SoundMixer.__setMute(this.mPanel.getSavedState('sound') == 1);
					
				}
				
			} else {
				
				SoundMixer.__setMute(this.mWindowHidden);
				
			}
		}
		
		/**
		 * Process frame rate
		 */		
		/*[internal]*/ private __onAnimationFrame():void
		{
			Stage.sRequestAnimationFrame.call(window, this.__onAnimationFrame.__bind(this));
			
			if (this.mStageHidden) {
				
				return;
				
			}
			
			var pixelAspectRatio = Capabilities.__getPixelAspectRatio();
			if (this.mLastPixelAspectRatio != pixelAspectRatio) {
				
				this.mLastPixelAspectRatio =(+( pixelAspectRatio));
				this.__onWindowResize();
				
			}
			
			if (this.mNeedAutoSize && this.displayState == 'normal') {
				
				var parentElement:HTMLElement =  strict(this.mBody.parentElement, HTMLElement);
				if (parentElement) {
					
					var width = parentElement.clientWidth;
					var height = parentElement.clientHeight;
					
					if (this.mExpander) {
						
						width = Math.max(window.innerWidth, width);
						height = Math.max(window.innerHeight, height);
						
					}
					
					width *= pixelAspectRatio;
					height *= pixelAspectRatio;
					
					this.mStageWidth = this.__getStageWidth(width, height);
					this.mStageHeight = this.__getStageHeight(width, height);
					this.mNeedAutoSize = false;
					
				}
				
			}
			
			if (this.mLastStageWidth != this.mStageWidth || this.mLastStageHeight != this.mStageHeight) {
				
				this.__updateCanvas(this.mLastStageWidth = this.mStageWidth, this.mLastStageHeight = this.mStageHeight);
				
				if (this.mCtx) {
					
					var canvas = this.__getCanvas();
					this.mCtx.context.configureBackBuffer(canvas.width, canvas.height, 0, false);
					
				}
				
				this.dispatchEvent(new Event(Event.RESIZE));
				
			} else if (this.mForceUpdateBodyTransform) {
				
				this.__updateBodyTransform();
				this.mForceUpdateBodyTransform = false;
				
			}
			
			this.__updateBodyMargin();
			
			var timestamp = Date.now();
			
			var num = 1;
			if (this.mSkipping) {
				
				while (this.mOverhead >= this.mFrameTime) {
					
					num++;
					this.mOverhead -= this.mFrameTime;
					
				}
				
			}
			
			for (var i = 0; i < num; ++i) {
				
				this.__enterInternal();
				
				this.__broadcastEvent (Event.ENTER_FRAME);
				this.__broadcastEvent (Event.FRAME_CONSTRUCTED);
				this.__broadcastEvent (Event.EXIT_FRAME);
				
				if (this._invalidated) {
					
					this._invalidated = false;
					this.__broadcastEvent (Event.RENDER);
					
				}
				
				this.__exitInternal(1);
				
			}
			
			this.__clearUnused();
			this.__drawEnter();
			
			var c = this.mCtx || this.__getCtx();
			var redraw = this.__predraw(c) || c.dirty();
			if (redraw) {
				
				c.enter();
				c.save();
				c.clear();
				this.__draw(c);
				c.restore();
				c.present();
				
			}
			
			this.__drawExit();
			
			var elapsed = Date.now() - timestamp;
			if (elapsed > this.mFrameTime) {
				
				this.mOverhead += Math.min(elapsed - this.mFrameTime, this.mFrameTime * this.mSkippingLimit);
				
			}
		}
		
		/*[internal]*/ private __broadcastEvent (value:any):void {
			
			var event;
			
			if (is(value , Event)) {
				
				event = value;
				
			} else if (is(value , 'String')) {
				
				event = this._broadcastEvent;
				event._type = value;
				
			} else {
				
				return;
				
			}
			
			var type = event._type;
			var events = DisplayObject.sBroadcastEvents;
			var dispatchers = events[type];
			
			if (dispatchers) {
				
				var __for4 = window.asc.of(dispatchers);
				for  (var dispatcher of __for4) {
					
					if (!dispatcher._offStageEvents && !dispatcher._stage) {
						
						continue;
						
					}
					
					event.target = null;
					dispatcher.dispatchEvent(event);
					
				}
				
			}
			
		}
		
		/*[internal]*/ /*override*/ protected __enterInternal () : void {
			
			var __for5 = window.asc.of(DisplayObject.sTimelineObjects);
			for  (var t of __for5) {
				
				t.__enterInternal ();
				
			}
			
		}
		
		/*[internal]*/ /*override*/ protected __exitInternal (nextFrame : number) : void {
			
			// nextFrame = ((nextFrame) >> 0);
			
			var __for6 = window.asc.of(DisplayObject.sTimelineObjects);
			for  (var t of __for6) {
				
				t.__exitInternal (nextFrame);
				
			}
			
		}
		
		/*[internal]*/ protected __clearUnused ():void {
			
			var len = DisplayObject.sCachedObjects.length;
			for (var i = 0; i < len; ++i) {
				
				var o = DisplayObject.sCachedObjects[i];
				if (!o || (!o._cache && (!o._graphics || !o._graphics._cache))) {
					
					DisplayObject.__removeCachedObject(o);
					
					i--;
					len--;
					continue;
					
				}
				
				if (!o._stage) {
					
					if (DisplayObject.__freeCachedObject(o)) {
						
						i--;
						len--;
						
						continue;
						
					}
					
				}
				
			}
			
		}
		
		/*[internal]*/ /*override*/ protected __drawEnter ():void {
			
			var __for7 = window.asc.of(DisplayObject.sDOMElements);
			for  (var d of __for7) {
				
				d.__drawEnter ();
				
			}
			
		}
		
		/*[internal]*/ /*override*/ protected __drawExit ():void {
			
			var __for8 = window.asc.of(DisplayObject.sDOMElements);
			for  (var d of __for8) {
				
				d.__drawExit ();
				
			}
		}
		
		/*[internal]*/ private __handleError (error : Error) : boolean {
			
			// error = strict(error, Error);
			
			try {
				
				trace(error.getStackTrace());
				
			} catch (e) {
				
				e = window.asc.e2e(e);
				
				trace('An unknown error has occurred');
				
			}
			
			if (!this._loaderInfo) {
				
				return false;
				
			}
			
			if (this.__handleCriticalError(error)) {
				
				return true;
				
			}
			
			var event = new UncaughtErrorEvent (UncaughtErrorEvent.UNCAUGHT_ERROR, true, true, error);
			
			this._loaderInfo.uncaughtErrorEvents.dispatchEvent (event);
			
			if (event.isDefaultPrevented()) {
				
				return true;
				
			}
			
			return false;
			
		}
		
		/*[internal]*/ private __handleCriticalError (details : any) : boolean {
			
			if (!this.mParentElement || !details || !('errorID' in details)) {
				
				return false;
				
			}
			
			switch (details.errorID) {
				
				case 3710: // Aka: Requested Stage3D Operation failed to complete.
					
					this.mParentElement.innerHTML = window.asc.getErrorHTMLText(details);
					return true;
					
			}
			
			return false;
		}
		
		/**
		 * Helpers 
		 * @param e
		 * 
		 */		
		/*[internal]*/ private __onFullscreenChange (e:any):void
		{
			if (this.displayState == 'normal') {
				
				this.mStageWidth = this.mNormalRect.width;
				this.mStageHeight = this.mNormalRect.height;
				
			} else {
				
				this.__updateFullscreenStage();
				
			}
			
			this.dispatchEvent(new FullScreenEvent(FullScreenEvent.FULL_SCREEN, false, false, this.displayState != 'normal'));
		}
		
		/**
		 * Handle mouse events 
		 * @param e
		 * 
		 */		
		/*[internal]*/ private __onCanvasMouseEvent(e:any):void
		{
			var jsType:string =  as(e.type, 'String');
			var wheelDelta:number = 0, button:number =  ((e.button || 0) >> 0);
			var mouseType:any[] = [];
			var mx:number = this.__getMouseXFromEvent(e);
			var my:number = this.__getMouseYFromEvent(e);
			
			var m = this.mBodyInternalTransform;
			if (m) {
				
				var p:Point = Stage.sHelperPoint;
				p.__setTo(mx, my);
				m.__transformPointInPlace(p);
				mx = p.x;
				my = p.y;
				
			}
			
			if (!isNaN(mx) && !isNaN(my)) {
				
				this.mMouseX = mx;
				this.mMouseY = my;
				
			}
			
			switch(jsType) {
				
				case "mouseleave":
					if (this.mCanvasMouseIsEnter) {
						
						this.mCanvasMouseIsEnter = false;
						this.dispatchEvent(new Event(Event.MOUSE_LEAVE));
						mouseType.push(MouseEvent.MOUSE_OUT);
						
					}
					break;
				
				case "mousedown":
					
					this.__preventDocumentScroll(e);
					
					var activeElement = document.activeElement;
					if (activeElement && activeElement != document.body) {
						
						if (!e.target || (e.target.nodeName != 'TEXTAREA' && e.target.nodeName != 'INPUT')) {
							
							activeElement.blur();
							
						}
						
					}
					
					this.mCanvasMouseIsDown = this.mCanvasMouseIsEnter = true;
					mouseType.push((this.mCanvasMouseButton = button) == 0 ? MouseEvent.MOUSE_DOWN : MouseEvent.RIGHT_MOUSE_DOWN);
					break;
				
				case "mousemove":
					
					this.__preventDocumentScroll(e);
					
					if (!isNaN(mx) && !isNaN(my)) {
						
						var isEnter:boolean = this.mMouseX >= 0 && this.mMouseX <= this.mStageWidth && this.mMouseY >= 0 && this.mMouseY <= this.mStageHeight;
						if (isEnter && !this.mCanvasMouseIsEnter) {
							
							// вместо mouseenter
							this.mCanvasMouseIsEnter = true;
							mouseType.push(MouseEvent.MOUSE_OVER);
							
						} else if(!isEnter && this.mCanvasMouseIsEnter) {
							
							// в дополнение к mouseleave
							this.mCanvasMouseIsEnter = false;
							this.dispatchEvent(new Event(Event.MOUSE_LEAVE));
							mouseType.push(MouseEvent.MOUSE_OUT);
							
						}
						
						if (this.mCanvasMouseIsEnter = isEnter) {
							
							mouseType.push(MouseEvent.MOUSE_MOVE);
							
						}
						
					}
					break;
				
				case "mouseup":
					if (this.mCanvasMouseIsDown) {
						
						this.mCanvasMouseIsDown = false;
						mouseType.push(button == 0 ? MouseEvent.MOUSE_UP : MouseEvent.RIGHT_MOUSE_UP);
						
					}
					if (this.mAllowAutoFullscreen) {
						
						if (this.displayState != 'fullScreen') {
							
							this.displayState = 'fullScreen';
							
						}
						
					}
					break;
				
				case "contextmenu":
					mouseType.push(MouseEvent.CONTEXT_MENU);
					break;
				
				case "mousewheel":
				case "DOMMouseScroll":
					
					this.__preventDocumentScroll(e);
					
					var diff = ((getTimer() - this.mLastMouseWheelTime) >> 0);
					if (diff <= 1) {
						
						break; // ignore
						
					} else {
						
						this.mLastMouseWheelTime = getTimer();
						
					}
					
					mouseType.push(MouseEvent.MOUSE_WHEEL);
					e = e || window.event;
					
					wheelDelta =(( -e.deltaY) >> 0);
					if (e.wheelDelta) {
						
						wheelDelta =(( e.wheelDelta / 120) >> 0); //In Chrome this always equal 120
						
					} else if (e.detail) {
						
						wheelDelta =((- e.detail) >> 0); // In other browsers this always equal real setting value
						
					}
					break;
				
			}
			
			var len = mouseType.length;
			for (var i = 0; i < len; ++i) {
				
				var event:MouseEvent = new MouseEvent(mouseType[i], true, false, this.mMouseX, this.mMouseY, null, e.ctrlKey, e.altKey, e.shiftKey, this.mCanvasMouseIsDown && this.mCanvasMouseButton == 0, wheelDelta);
				
				event.movementX =(+( e.movementX || 0));
				event.movementY =(+( e.movementY || 0));
				event.base = e;
				
				this.__processMouseEvent(event);
				
			}
		}
		
		/**
		 * Handle touch events
		 * @param e
		 * 
		 */		
		/*[internal]*/private __onCanvasTouchEvent(e:any):void
		{
			// TouchEvent
			// ...
			
			// MouseEvent
			switch (e.type) {
				
				case "touchstart":	Stage.sHelperMouseEvent.type = 'mousedown';	break;
				case "touchmove": 	Stage.sHelperMouseEvent.type = 'mousemove';	break;
				case "touchend": 		Stage.sHelperMouseEvent.type = 'mouseup';		break;
				case "touchcancel":	Stage.sHelperMouseEvent.type = 'mouseup';		break;
				default: 
					return;
					
			}
			
			Stage.sHelperMouseEvent.target = e.target;
			Stage.sHelperMouseEvent.ctrlKey = e.ctrlKey;
			Stage.sHelperMouseEvent.altKey = e.altKey;
			Stage.sHelperMouseEvent.shiftKey = e.shiftKey;
			
			if (e.targetTouches && e.targetTouches.length) {
				
				Stage.sHelperMouseEvent.pageX = e.targetTouches[0].pageX;
				Stage.sHelperMouseEvent.pageY = e.targetTouches[0].pageY;
				
			}
			
			if (is(e.preventDefault , 'Function')) {
				
				Stage.sHelperMouseEvent.preventDefault = e.preventDefault.__bind(e);
				
			}
			
			this.__onCanvasMouseEvent(Stage.sHelperMouseEvent);
		}
		
		/**
		 * Process mouse events 
		 * @param e
		 * 
		 */		
		/*[internal]*/ private __processMouseEvent(e:MouseEvent):void
		{
			// e = strict(e, MouseEvent);
			// helpers
			var localX = e.localX, localY = e.localY, ctrlKey = e.ctrlKey, altKey = e.altKey, shiftKey = e.shiftKey, buttonDown = e.buttonDown;
			
			// find target
			var obj = this.__doMouse(localX, localY);
			if (obj) {
				
				var p = Point.__pool.get();
				
				p.__setTo(e.localX, e.localY);
				obj.__globalToLocal(p, p);
				e.localX =(+( p.x)); e.localY =(+( p.y));
				
				Point.__pool.release(p);
				
			}
			
			// over / out
			if (e.type == MouseEvent.MOUSE_MOVE) {
				
				this.__processMouseHovering(this.mLastMouseOverObj, this.mLastMouseOverObj =strict( obj, DisplayObject), e);
				
			}
			
			// rest
			if (obj) {

				// down
				if (e.type == MouseEvent.MOUSE_DOWN) {
					
					var p = Point.__pool.get();
					p.__setTo(this.mMouseX, this.mMouseY);
					
					if (this.mLastMouseDownObj == obj && getTimer() - this.mMouseClickCountTime < Stage.CLICK_COUNT_INTERVAL && Point.distance(p, this.mMouseClickCountPos) < Stage.CLICK_COUNT_DISTANCE) {

						this.mMouseClickCount++;
						
					} else {
						
						this.mMouseClickCount = 1;
						
					}
					
					this.mLastMouseDownObj =strict( obj, DisplayObject);
					this.mMouseClickCountTime = getTimer();
					
					if (this.mMouseClickCount == 1) {
						
						this.mMouseClickCountPos.__setTo(this.mMouseX, this.mMouseY);
						
					}
					
					Point.__pool.release(p);
					
				}
				
				// click count
				var clickCount = 0;
				switch (e.type) {
					
					case MouseEvent.MOUSE_DOWN:
					case MouseEvent.MOUSE_UP:
					case MouseEvent.MIDDLE_MOUSE_DOWN:
					case MouseEvent.MIDDLE_MOUSE_UP:
					case MouseEvent.RIGHT_MOUSE_DOWN:
					case MouseEvent.RIGHT_MOUSE_UP:
						e._clickCount = clickCount = this.mMouseClickCount;
						break;
					
				}
				
				// dispatch
				obj.dispatchEvent(e);
				
				// force up
				var isUp = e.type == MouseEvent.MOUSE_UP;
				if (e.type == MouseEvent.MOUSE_OUT && this.mCanvasMouseIsDown) {
					
					isUp = true;
					this.mCanvasMouseIsDown = false;
					obj.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_UP, true, false, localX, localY, null, ctrlKey, altKey, shiftKey, buttonDown, 0, false, false, clickCount));
					
				}
				
				// click
				if (isUp) {
					
					if (obj === this.mLastMouseDownObj) {
						
						obj.dispatchEvent(new MouseEvent(MouseEvent.CLICK, true, false, localX, localY, null, ctrlKey, altKey, shiftKey));
						
						if (obj.doubleClickEnabled && clickCount % 2 == 0) {
							
							obj.dispatchEvent(new MouseEvent(MouseEvent.DOUBLE_CLICK, true, false, localX, localY, null, ctrlKey, altKey, shiftKey));
							
						}
						
					}
					
					// force out (mobile only)
					if (this.mTouchMode) {
						
						this.__processMouseHovering(this.mLastMouseDownObj, this.mLastMouseOverObj = null, e);
						
					}
				}
				
				// context menu
				if (e.type == MouseEvent.CONTEXT_MENU) {
					
					// right click
					this.dispatchEvent(new MouseEvent(MouseEvent.RIGHT_CLICK, true, false, localX, localY, null, ctrlKey, altKey, shiftKey));
					
					// find menu
					this.contextMenu =this.contextMenu || new ContextMenu;
					var target:DisplayObject =  strict(obj, DisplayObject);
					while (target) {
						
						var interative:InteractiveObject = as(target , InteractiveObject);
						if (interative) {
							
							if (interative.contextMenu) {
								
								interative.contextMenu.show(e);
								break;
								
							}
							
						}
						
						target = target.parent;
					}
					
				}
				
			}
			
			// drag
			if (e.type == MouseEvent.MOUSE_MOVE) {
				
				Sprite.__updateDragObject();
				
			}
		}
		
		/*[internal]*/ private __processMouseHovering(last:DisplayObject, obj, e:MouseEvent):void
		{
			// last = strict(last, DisplayObject); e = strict(e, MouseEvent);
			// helpers
			var localX = e.localX, localY = e.localY, ctrlKey = e.ctrlKey, altKey = e.altKey, shiftKey = e.shiftKey, buttonDown = e.buttonDown;
			var t:DisplayObject = last;
			
			// MOUSE_OUT / ROLL_OUT
			while (t) {
				
				if (t == obj) {
					
					break;
					
				} else {
					
					t.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_OUT, true, false, localX, localY, null, ctrlKey, altKey, shiftKey, buttonDown));
					t.dispatchEvent(new MouseEvent(MouseEvent.ROLL_OUT, true, false, localX, localY, null, ctrlKey, altKey, shiftKey, buttonDown));
					
				}
				
				t = t.parent;
				
			}
			
			// MOUSE_OVER / ROLL_OVER
			if (obj && obj != t) {
				
				obj.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_OVER, true, false, localX, localY, null, ctrlKey, altKey, shiftKey, buttonDown));
				obj.dispatchEvent(new MouseEvent(MouseEvent.ROLL_OVER, true, false, localX, localY, null, ctrlKey, altKey, shiftKey, buttonDown));
				
			}
			
			// buttonMode -> button cursor
			var systemCursor:string;
			t =strict( obj, DisplayObject);
			while (t) {
				
				if (is(t , Sprite)) {
					
					var sp:Sprite = as(t , Sprite);
					if (sp.buttonMode && sp.useHandCursor) {
						
						systemCursor = MouseCursor.BUTTON;
						break;
						
					}
					
				}
				
				if (is(t , SimpleButton)) {
					
					if ((as(t , SimpleButton)).useHandCursor) {
						
						systemCursor = MouseCursor.BUTTON;
						break;
						
					}
					
				}
				
				t = t.parent;
				
			}
			
			if (Mouse.systemCursor != systemCursor) {
				
				Mouse.systemCursor = systemCursor;
				
			}
		}
		
		/**
		 * Handle mouse events 
		 * @param e
		 * 
		 */		
		/*[internal]*/ private __onWindowMouseOver (e : any):void
		{
			var activeElement = document.activeElement;
			if (activeElement && activeElement.nodeType == 1) {
				
				var nodeName = activeElement.nodeName;
				if (nodeName == 'TEXTAREA' || nodeName == 'INPUT' || activeElement.getAttribute('contentEditable') == 'true') {
					
					return;
					
				}
				
			}
			
			window.focus();
		}
		
		/*[internal]*/ private __preventDocumentScroll(e:any):void
		{
			if (!e || !(is(e.preventDefault , 'Function'))) {
				
				return;
				
			}
			
			if (Sound.__isSuspended()) {
				
				return;
				
			}
			
			if (this.mExpander) {
				
				var inverted = this.__isNeedFixedOrientationCalc();
				if (!inverted) {
					
					if (this.mParentElement) {
						
						if (window.innerHeight < this.mParentElement.clientHeight) {
							
							return;
							
						}
						
					}
					
				}
				
			}
			
			try {
				
				e.preventDefault();
				
			} catch (e  ) {
				
				e = window.asc.e2e(e);
				
				// nothing to do
				
			}
		}
		
		/**
		 * Handle keyboard events
		 * @param e
		 * 
		 */		
		/*[internal]*/ private __onCanvasKeyEvent (e : any) : void
		{
			var jsType = e.type;
			var flashType;
			
			switch (jsType) {
				
				case "keydown":
					
					flashType = KeyboardEvent.KEY_DOWN;
					break;
				
				case "keyup":
					
					flashType = KeyboardEvent.KEY_UP;
					break;
				
			}
			
			var event = new KeyboardEvent(flashType, true, false, Keyboard[(e.key||'').toUpperCase()] || 0, e.keyCode, e.location, e.ctrlKey, e.altKey, e.shiftKey);
			event.base = e;
			
			switch (event.keyCode) {
				
				case Keyboard.LEFT:
				case Keyboard.RIGHT:
				case Keyboard.UP:
				case Keyboard.DOWN:
					
					this.__preventDocumentScroll(e);
					break;
				
			}
			
			this.__broadcastEvent(event);
		}
		
		/*[internal]*/ private __getMouseXFromEvent (event:any):number
		{
			return (event.pageX - Stage.__getCanvasOffset(this.mBody).x) * (this.mStageWidth / this.mBody.clientWidth);
		}
		
		/*[internal]*/ private __getMouseYFromEvent (event:any):number
		{
			return (event.pageY - Stage.__getCanvasOffset(this.mBody).y) * (this.mStageHeight / this.mBody.clientHeight);
		}
		
		/*[internal]*/ private static __getCanvasOffset(obj:any):any
		{
			var left = 0, top = 0;
			if (obj.offsetParent) {
				
				do {
					left += obj.offsetLeft;
					top += obj.offsetTop;
				} while (obj = obj.offsetParent);
				
				Stage.sHelperCanvasOffset.x = left;
				Stage.sHelperCanvasOffset.y = top;
				
				return Stage.sHelperCanvasOffset;
				
			}
			
			Stage.sHelperCanvasOffset.x = Stage.sHelperCanvasOffset.y = 0;
			return Stage.sHelperCanvasOffset;
		}
		
		/*[internal]*/ private __updateFullscreenStage():void
		{
			var screenResolutionX = Capabilities.__getScreenResolutionX();
			var screenResolutionY = Capabilities.__getScreenResolutionY();
			
			this.mStageWidth = this.__getStageWidth(screenResolutionX, screenResolutionY);
			this.mStageHeight = this.__getStageHeight(screenResolutionX, screenResolutionY);
		}
		
		/*[internal]*/ private static __requestAnimationFrameDefault (callback:Function):void
		{
			setTimeout(callback, 1000 / 60);
		}
		
		/*override*/ public toString ():string
		{
			return '[object Stage]';
		}
	}
}