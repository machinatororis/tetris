/// <reference path="../../../../../base.d.ts" />
/// <reference path="../tags/etc/TagSWFEncryptSignature.ts" />
/// <reference path="../tags/etc/TagSWFEncryptActions.ts" />
/// <reference path="../tags/TagVideoFrame.ts" />
/// <reference path="../tags/TagUnknown.ts" />
/// <reference path="../tags/TagSymbolClass.ts" />
/// <reference path="../tags/TagStartSound2.ts" />
/// <reference path="../tags/TagStartSound.ts" />
/// <reference path="../tags/TagSoundStreamHead2.ts" />
/// <reference path="../tags/TagSoundStreamHead.ts" />
/// <reference path="../tags/TagSoundStreamBlock.ts" />
/// <reference path="../tags/TagShowFrame.ts" />
/// <reference path="../tags/TagSetTabIndex.ts" />
/// <reference path="../tags/TagSetBackgroundColor.ts" />
/// <reference path="../tags/TagScriptLimits.ts" />
/// <reference path="../tags/TagRemoveObject2.ts" />
/// <reference path="../tags/TagRemoveObject.ts" />
/// <reference path="../tags/TagProtect.ts" />
/// <reference path="../tags/TagProductInfo.ts" />
/// <reference path="../tags/TagPlaceObject4.ts" />
/// <reference path="../tags/TagPlaceObject3.ts" />
/// <reference path="../tags/TagPlaceObject2.ts" />
/// <reference path="../tags/TagPlaceObject.ts" />
/// <reference path="../tags/TagNameCharacter.ts" />
/// <reference path="../tags/TagMetadata.ts" />
/// <reference path="../tags/TagJPEGTables.ts" />
/// <reference path="../tags/TagImportAssets2.ts" />
/// <reference path="../tags/TagImportAssets.ts" />
/// <reference path="../tags/TagFrameLabel.ts" />
/// <reference path="../tags/TagFileAttributes.ts" />
/// <reference path="../tags/TagExportAssets.ts" />
/// <reference path="../tags/TagEnd.ts" />
/// <reference path="../tags/TagEnableTelemetry.ts" />
/// <reference path="../tags/TagEnableDebugger2.ts" />
/// <reference path="../tags/TagEnableDebugger.ts" />
/// <reference path="../tags/TagDoInitAction.ts" />
/// <reference path="../tags/TagDoAction.ts" />
/// <reference path="../tags/TagDoABCDeprecated.ts" />
/// <reference path="../tags/TagDoABC.ts" />
/// <reference path="../tags/TagDefineVideoStream.ts" />
/// <reference path="../tags/TagDefineText2.ts" />
/// <reference path="../tags/TagDefineText.ts" />
/// <reference path="../tags/TagDefineSprite.ts" />
/// <reference path="../tags/TagDefineSound.ts" />
/// <reference path="../tags/TagDefineShape4.ts" />
/// <reference path="../tags/TagDefineShape3.ts" />
/// <reference path="../tags/TagDefineShape2.ts" />
/// <reference path="../tags/TagDefineShape.ts" />
/// <reference path="../tags/TagDefineSceneAndFrameLabelData.ts" />
/// <reference path="../tags/TagDefineScalingGrid.ts" />
/// <reference path="../tags/TagDefineMorphShape2.ts" />
/// <reference path="../tags/TagDefineMorphShape.ts" />
/// <reference path="../tags/TagDefineFontName.ts" />
/// <reference path="../tags/TagDefineFontInfo2.ts" />
/// <reference path="../tags/TagDefineFontInfo.ts" />
/// <reference path="../tags/TagDefineFontAlignZones.ts" />
/// <reference path="../tags/TagDefineFont4.ts" />
/// <reference path="../tags/TagDefineFont3.ts" />
/// <reference path="../tags/TagDefineFont2.ts" />
/// <reference path="../tags/TagDefineFont.ts" />
/// <reference path="../tags/TagDefineEditText.ts" />
/// <reference path="../tags/TagDefineButtonSound.ts" />
/// <reference path="../tags/TagDefineButtonCxform.ts" />
/// <reference path="../tags/TagDefineButton2.ts" />
/// <reference path="../tags/TagDefineButton.ts" />
/// <reference path="../tags/TagDefineBitsLossless2.ts" />
/// <reference path="../tags/TagDefineBitsLossless.ts" />
/// <reference path="../tags/TagDefineBitsJPEG4.ts" />
/// <reference path="../tags/TagDefineBitsJPEG3.ts" />
/// <reference path="../tags/TagDefineBitsJPEG2.ts" />
/// <reference path="../tags/TagDefineBits.ts" />
/// <reference path="../tags/TagDefineBinaryData.ts" />
/// <reference path="../tags/TagDebugID.ts" />
/// <reference path="../tags/TagCSMTextSettings.ts" />
/// <reference path="../tags/ITag.ts" />
﻿
namespace flash.__native.format.swf.factories
{
	export import ITag = flash.__native.format.swf.tags.ITag;
	export import TagCSMTextSettings = flash.__native.format.swf.tags.TagCSMTextSettings;
	export import TagDebugID = flash.__native.format.swf.tags.TagDebugID;
	export import TagDefineBinaryData = flash.__native.format.swf.tags.TagDefineBinaryData;
	export import TagDefineBits = flash.__native.format.swf.tags.TagDefineBits;
	export import TagDefineBitsJPEG2 = flash.__native.format.swf.tags.TagDefineBitsJPEG2;
	export import TagDefineBitsJPEG3 = flash.__native.format.swf.tags.TagDefineBitsJPEG3;
	export import TagDefineBitsJPEG4 = flash.__native.format.swf.tags.TagDefineBitsJPEG4;
	export import TagDefineBitsLossless = flash.__native.format.swf.tags.TagDefineBitsLossless;
	export import TagDefineBitsLossless2 = flash.__native.format.swf.tags.TagDefineBitsLossless2;
	export import TagDefineButton = flash.__native.format.swf.tags.TagDefineButton;
	export import TagDefineButton2 = flash.__native.format.swf.tags.TagDefineButton2;
	export import TagDefineButtonCxform = flash.__native.format.swf.tags.TagDefineButtonCxform;
	export import TagDefineButtonSound = flash.__native.format.swf.tags.TagDefineButtonSound;
	export import TagDefineEditText = flash.__native.format.swf.tags.TagDefineEditText;
	export import TagDefineFont = flash.__native.format.swf.tags.TagDefineFont;
	export import TagDefineFont2 = flash.__native.format.swf.tags.TagDefineFont2;
	export import TagDefineFont3 = flash.__native.format.swf.tags.TagDefineFont3;
	export import TagDefineFont4 = flash.__native.format.swf.tags.TagDefineFont4;
	export import TagDefineFontAlignZones = flash.__native.format.swf.tags.TagDefineFontAlignZones;
	export import TagDefineFontInfo = flash.__native.format.swf.tags.TagDefineFontInfo;
	export import TagDefineFontInfo2 = flash.__native.format.swf.tags.TagDefineFontInfo2;
	export import TagDefineFontName = flash.__native.format.swf.tags.TagDefineFontName;
	export import TagDefineMorphShape = flash.__native.format.swf.tags.TagDefineMorphShape;
	export import TagDefineMorphShape2 = flash.__native.format.swf.tags.TagDefineMorphShape2;
	export import TagDefineScalingGrid = flash.__native.format.swf.tags.TagDefineScalingGrid;
	export import TagDefineSceneAndFrameLabelData = flash.__native.format.swf.tags.TagDefineSceneAndFrameLabelData;
	export import TagDefineShape = flash.__native.format.swf.tags.TagDefineShape;
	export import TagDefineShape2 = flash.__native.format.swf.tags.TagDefineShape2;
	export import TagDefineShape3 = flash.__native.format.swf.tags.TagDefineShape3;
	export import TagDefineShape4 = flash.__native.format.swf.tags.TagDefineShape4;
	export import TagDefineSound = flash.__native.format.swf.tags.TagDefineSound;
	export import TagDefineSprite = flash.__native.format.swf.tags.TagDefineSprite;
	export import TagDefineText = flash.__native.format.swf.tags.TagDefineText;
	export import TagDefineText2 = flash.__native.format.swf.tags.TagDefineText2;
	export import TagDefineVideoStream = flash.__native.format.swf.tags.TagDefineVideoStream;
	export import TagDoABC = flash.__native.format.swf.tags.TagDoABC;
	export import TagDoABCDeprecated = flash.__native.format.swf.tags.TagDoABCDeprecated;
	export import TagDoAction = flash.__native.format.swf.tags.TagDoAction;
	export import TagDoInitAction = flash.__native.format.swf.tags.TagDoInitAction;
	export import TagEnableDebugger = flash.__native.format.swf.tags.TagEnableDebugger;
	export import TagEnableDebugger2 = flash.__native.format.swf.tags.TagEnableDebugger2;
	export import TagEnableTelemetry = flash.__native.format.swf.tags.TagEnableTelemetry;
	export import TagEnd = flash.__native.format.swf.tags.TagEnd;
	export import TagExportAssets = flash.__native.format.swf.tags.TagExportAssets;
	export import TagFileAttributes = flash.__native.format.swf.tags.TagFileAttributes;
	export import TagFrameLabel = flash.__native.format.swf.tags.TagFrameLabel;
	export import TagImportAssets = flash.__native.format.swf.tags.TagImportAssets;
	export import TagImportAssets2 = flash.__native.format.swf.tags.TagImportAssets2;
	export import TagJPEGTables = flash.__native.format.swf.tags.TagJPEGTables;
	export import TagMetadata = flash.__native.format.swf.tags.TagMetadata;
	export import TagNameCharacter = flash.__native.format.swf.tags.TagNameCharacter;
	export import TagPlaceObject = flash.__native.format.swf.tags.TagPlaceObject;
	export import TagPlaceObject2 = flash.__native.format.swf.tags.TagPlaceObject2;
	export import TagPlaceObject3 = flash.__native.format.swf.tags.TagPlaceObject3;
	export import TagPlaceObject4 = flash.__native.format.swf.tags.TagPlaceObject4;
	export import TagProductInfo = flash.__native.format.swf.tags.TagProductInfo;
	export import TagProtect = flash.__native.format.swf.tags.TagProtect;
	export import TagRemoveObject = flash.__native.format.swf.tags.TagRemoveObject;
	export import TagRemoveObject2 = flash.__native.format.swf.tags.TagRemoveObject2;
	export import TagScriptLimits = flash.__native.format.swf.tags.TagScriptLimits;
	export import TagSetBackgroundColor = flash.__native.format.swf.tags.TagSetBackgroundColor;
	export import TagSetTabIndex = flash.__native.format.swf.tags.TagSetTabIndex;
	export import TagShowFrame = flash.__native.format.swf.tags.TagShowFrame;
	export import TagSoundStreamBlock = flash.__native.format.swf.tags.TagSoundStreamBlock;
	export import TagSoundStreamHead = flash.__native.format.swf.tags.TagSoundStreamHead;
	export import TagSoundStreamHead2 = flash.__native.format.swf.tags.TagSoundStreamHead2;
	export import TagStartSound = flash.__native.format.swf.tags.TagStartSound;
	export import TagStartSound2 = flash.__native.format.swf.tags.TagStartSound2;
	export import TagSymbolClass = flash.__native.format.swf.tags.TagSymbolClass;
	export import TagUnknown = flash.__native.format.swf.tags.TagUnknown;
	export import TagVideoFrame = flash.__native.format.swf.tags.TagVideoFrame;
	export import TagSWFEncryptActions = flash.__native.format.swf.tags.etc.TagSWFEncryptActions;
	export import TagSWFEncryptSignature = flash.__native.format.swf.tags.etc.TagSWFEncryptSignature;
	
	
	export  class SWFTagFactory implements ISWFTagFactory
	{
		implements_flash___native_format_swf_factories_ISWFTagFactory = null;
		protected static sTypeToClass : any[] = [];
		static __block0 = function () { function $() {
			SWFTagFactory.sTypeToClass[TagEnd.TYPE] = TagEnd;
			SWFTagFactory.sTypeToClass[TagShowFrame.TYPE] = TagShowFrame;
			SWFTagFactory.sTypeToClass[TagDefineShape.TYPE] = TagDefineShape;
			SWFTagFactory.sTypeToClass[TagPlaceObject.TYPE] = TagPlaceObject;
			SWFTagFactory.sTypeToClass[TagRemoveObject.TYPE] = TagRemoveObject;
			SWFTagFactory.sTypeToClass[TagDefineBits.TYPE] = TagDefineBits;
			SWFTagFactory.sTypeToClass[TagDefineButton.TYPE] = TagDefineButton;
			SWFTagFactory.sTypeToClass[TagJPEGTables.TYPE] = TagJPEGTables;
			SWFTagFactory.sTypeToClass[TagSetBackgroundColor.TYPE] = TagSetBackgroundColor;
			SWFTagFactory.sTypeToClass[TagDefineFont.TYPE] = TagDefineFont;
			SWFTagFactory.sTypeToClass[TagDefineText.TYPE] = TagDefineText;
			SWFTagFactory.sTypeToClass[TagDoAction.TYPE] = TagDoAction;
			SWFTagFactory.sTypeToClass[TagDefineFontInfo.TYPE] = TagDefineFontInfo;
			SWFTagFactory.sTypeToClass[TagDefineSound.TYPE] = TagDefineSound;
			SWFTagFactory.sTypeToClass[TagStartSound.TYPE] = TagStartSound;
			SWFTagFactory.sTypeToClass[TagDefineButtonSound.TYPE] = TagDefineButtonSound;
			SWFTagFactory.sTypeToClass[TagSoundStreamHead.TYPE] = TagSoundStreamHead;
			SWFTagFactory.sTypeToClass[TagSoundStreamBlock.TYPE] = TagSoundStreamBlock;
			SWFTagFactory.sTypeToClass[TagDefineBitsLossless.TYPE] = TagDefineBitsLossless;
			SWFTagFactory.sTypeToClass[TagDefineBitsJPEG2.TYPE] = TagDefineBitsJPEG2;
			SWFTagFactory.sTypeToClass[TagDefineShape2.TYPE] = TagDefineShape2;
			SWFTagFactory.sTypeToClass[TagDefineButtonCxform.TYPE] = TagDefineButtonCxform;
			SWFTagFactory.sTypeToClass[TagProtect.TYPE] = TagProtect;
			SWFTagFactory.sTypeToClass[TagPlaceObject2.TYPE] = TagPlaceObject2;
			SWFTagFactory.sTypeToClass[TagRemoveObject2.TYPE] = TagRemoveObject2;
			SWFTagFactory.sTypeToClass[TagDefineShape3.TYPE] = TagDefineShape3;
			SWFTagFactory.sTypeToClass[TagDefineText2.TYPE] = TagDefineText2;
			SWFTagFactory.sTypeToClass[TagDefineButton2.TYPE] = TagDefineButton2;
			SWFTagFactory.sTypeToClass[TagDefineBitsJPEG3.TYPE] = TagDefineBitsJPEG3;
			SWFTagFactory.sTypeToClass[TagDefineBitsLossless2.TYPE] = TagDefineBitsLossless2;
			SWFTagFactory.sTypeToClass[TagDefineEditText.TYPE] = TagDefineEditText;
			SWFTagFactory.sTypeToClass[TagDefineSprite.TYPE] = TagDefineSprite;
			SWFTagFactory.sTypeToClass[TagNameCharacter.TYPE] = TagNameCharacter;
			SWFTagFactory.sTypeToClass[TagProductInfo.TYPE] = TagProductInfo;
			SWFTagFactory.sTypeToClass[TagFrameLabel.TYPE] = TagFrameLabel;
			SWFTagFactory.sTypeToClass[TagSoundStreamHead2.TYPE] = TagSoundStreamHead2;
			SWFTagFactory.sTypeToClass[TagDefineMorphShape.TYPE] = TagDefineMorphShape;
			SWFTagFactory.sTypeToClass[TagDefineFont2.TYPE] = TagDefineFont2;
			SWFTagFactory.sTypeToClass[TagExportAssets.TYPE] = TagExportAssets;
			SWFTagFactory.sTypeToClass[TagImportAssets.TYPE] = TagImportAssets;
			SWFTagFactory.sTypeToClass[TagEnableDebugger.TYPE] = TagEnableDebugger;
			SWFTagFactory.sTypeToClass[TagDoInitAction.TYPE] = TagDoInitAction;
			SWFTagFactory.sTypeToClass[TagDefineVideoStream.TYPE] = TagDefineVideoStream;
			SWFTagFactory.sTypeToClass[TagVideoFrame.TYPE] = TagVideoFrame;
			SWFTagFactory.sTypeToClass[TagDefineFontInfo2.TYPE] = TagDefineFontInfo2;
			SWFTagFactory.sTypeToClass[TagDebugID.TYPE] = TagDebugID;
			SWFTagFactory.sTypeToClass[TagEnableDebugger2.TYPE] = TagEnableDebugger2;
			SWFTagFactory.sTypeToClass[TagScriptLimits.TYPE] = TagScriptLimits;
			SWFTagFactory.sTypeToClass[TagSetTabIndex.TYPE] = TagSetTabIndex;
			SWFTagFactory.sTypeToClass[TagFileAttributes.TYPE] = TagFileAttributes;
			SWFTagFactory.sTypeToClass[TagPlaceObject3.TYPE] = TagPlaceObject3;
			SWFTagFactory.sTypeToClass[TagImportAssets2.TYPE] = TagImportAssets2;
			//sTypeToClass[TagDoABCDeprecated.TYPE] = TagDoABCDeprecated; // not needed, offline decompiled
			SWFTagFactory.sTypeToClass[TagDefineFontAlignZones.TYPE] = TagDefineFontAlignZones;
			SWFTagFactory.sTypeToClass[TagCSMTextSettings.TYPE] = TagCSMTextSettings;
			SWFTagFactory.sTypeToClass[TagDefineFont3.TYPE] = TagDefineFont3;
			SWFTagFactory.sTypeToClass[TagSymbolClass.TYPE] = TagSymbolClass;
			SWFTagFactory.sTypeToClass[TagMetadata.TYPE] = TagMetadata;
			SWFTagFactory.sTypeToClass[TagDefineScalingGrid.TYPE] = TagDefineScalingGrid;
			//sTypeToClass[TagDoABC.TYPE] = TagDoABC; // not needed, offline decompiled
			SWFTagFactory.sTypeToClass[TagDefineShape4.TYPE] = TagDefineShape4;
			SWFTagFactory.sTypeToClass[TagDefineMorphShape2.TYPE] = TagDefineMorphShape2;
			SWFTagFactory.sTypeToClass[TagDefineSceneAndFrameLabelData.TYPE] = TagDefineSceneAndFrameLabelData;
			SWFTagFactory.sTypeToClass[TagDefineBinaryData.TYPE] = TagDefineBinaryData;
			SWFTagFactory.sTypeToClass[TagDefineFontName.TYPE] = TagDefineFontName;
			SWFTagFactory.sTypeToClass[TagStartSound2.TYPE] = TagStartSound2;
			SWFTagFactory.sTypeToClass[TagDefineBitsJPEG4.TYPE] = TagDefineBitsJPEG4;
			SWFTagFactory.sTypeToClass[TagDefineFont4.TYPE] = TagDefineFont4;
			SWFTagFactory.sTypeToClass[TagEnableTelemetry.TYPE] = TagEnableTelemetry;
			SWFTagFactory.sTypeToClass[TagPlaceObject4.TYPE] = TagPlaceObject4;
			SWFTagFactory.sTypeToClass[TagSWFEncryptActions.TYPE] = TagSWFEncryptActions;
			SWFTagFactory.sTypeToClass[TagSWFEncryptSignature.TYPE] = TagSWFEncryptSignature;
		}asc.stb(SWFTagFactory,$); }();
		
		public create (type : number) : ITag
		{
			/**/ type = ((type) >>> 0);
			var cl = SWFTagFactory.sTypeToClass[type];
			if (cl) {
				
				return new cl ();
				
			}
			
			return new TagUnknown (type);
		}
	}

}