/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
/// <reference path="../data/SWFScene.ts" />
/// <reference path="../data/SWFFrameLabel.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import SWFFrameLabel = flash.__native.format.swf.data.SWFFrameLabel;
	export import SWFScene = flash.__native.format.swf.data.SWFScene;
	export import StringUtils = flash.__native.utils.StringUtils;
	
	
	export  class TagDefineSceneAndFrameLabelData implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE:number = 86;
		
		protected _scenes:SWFScene[] = undefined;
		protected _frameLabels:SWFFrameLabel[] = undefined;
		
		constructor() {
			this._scenes = new Array<SWFScene>();
			this._frameLabels = new Array<SWFFrameLabel>();
		}
		
		public get scenes():SWFScene[] { return this._scenes; }
		public get frameLabels():SWFFrameLabel[] { return this._frameLabels; }
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			var i:number = 0;
			var sceneCount:number = data.readEncodedU32();
			for (i = 0; i < sceneCount; i++) {
				var sceneOffset:number = data.readEncodedU32();
				var sceneName:string = data.readString();
				this._scenes.push(new SWFScene(sceneOffset, sceneName));
			}
			var frameLabelCount:number = data.readEncodedU32();
			for (i = 0; i < frameLabelCount; i++) {
				var frameNumber:number = data.readEncodedU32();
				var frameLabel:string = data.readString();
				this._frameLabels.push(new SWFFrameLabel(frameNumber, frameLabel));
			}
		}

		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var i:number = 0;
			var len:number = 0;
			var body:SWFData = new SWFData();
			body.writeEncodedU32(this._scenes.length);
			for (i = 0, len = this._scenes.length; i < len; i++) {
				var scene:SWFScene =  strict(this._scenes[i], SWFScene);
				body.writeEncodedU32(scene.offset);
				body.writeString(scene.name);
			}
			body.writeEncodedU32(this.frameLabels.length);
			for (i = 0, len = this.frameLabels.length; i < len; i++) {
				var label :SWFFrameLabel =  strict(this.frameLabels[i], SWFFrameLabel);
				body.writeEncodedU32(label.frameNumber);
				body.writeString(label.name);
			}
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		public get type():number { return TagDefineSceneAndFrameLabelData.TYPE; }
		public get name():string { return "DefineSceneAndFrameLabelData"; }
		public get version():number { return 9; }
		public get level():number { return 1; }

		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent);
			var i:number = 0;
			var len:number = 0;
			if ((len=((this._scenes.length) >>> 0)) > 0) {
				str += "\n" + StringUtils.repeat(indent + 2) + "Scenes:";
				for (i = 0; i < len; i++) {
					str += "\n" + StringUtils.repeat(indent + 4) + "[" + i + "] " + this._scenes[i].toString();
				}
			}
			if ((len=((this._frameLabels.length) >>> 0)) > 0) {
				str += "\n" + StringUtils.repeat(indent + 2) + "FrameLabels:";
				for (i = 0; i < len; i++) {
					str += "\n" + StringUtils.repeat(indent + 4) + "[" + i + "] " + this._frameLabels[i].toString();
				}
			}
			return str;
		}
	}

}