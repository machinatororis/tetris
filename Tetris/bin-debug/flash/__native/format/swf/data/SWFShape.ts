/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../utils/Dictionary.ts" />
/// <reference path="../../../../geom/Matrix.ts" />
/// <reference path="../../../../display/LineScaleMode.ts" />
/// <reference path="../../../../display/GradientType.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
/// <reference path="../utils/ColorUtils.ts" />
/// <reference path="../exporters/core/IShapeExporter.ts" />
/// <reference path="../exporters/core/DefaultShapeExporter.ts" />
/// <reference path="etc/StraightEdge.ts" />
/// <reference path="etc/IEdge.ts" />
/// <reference path="etc/CurvedEdge.ts" />
/// <reference path="consts/LineJointStyle.ts" />
/// <reference path="consts/LineCapsStyle.ts" />
/// <reference path="consts/GradientSpreadMode.ts" />
/// <reference path="consts/GradientInterpolationMode.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import GradientInterpolationMode = flash.__native.format.swf.data.consts.GradientInterpolationMode;
	export import GradientSpreadMode = flash.__native.format.swf.data.consts.GradientSpreadMode;
	export import LineCapsStyle = flash.__native.format.swf.data.consts.LineCapsStyle;
	export import LineJointStyle = flash.__native.format.swf.data.consts.LineJointStyle;
	export import CurvedEdge = flash.__native.format.swf.data.etc.CurvedEdge;
	export import IEdge = flash.__native.format.swf.data.etc.IEdge;
	export import StraightEdge = flash.__native.format.swf.data.etc.StraightEdge;
	export import DefaultShapeExporter = flash.__native.format.swf.exporters.core.DefaultShapeExporter;
	export import IShapeExporter = flash.__native.format.swf.exporters.core.IShapeExporter;
	export import ColorUtils = flash.__native.format.swf.utils.ColorUtils;
	export import StringUtils = flash.__native.utils.StringUtils;
	export import GradientType = flash.display.GradientType;
	export import LineScaleMode = flash.display.LineScaleMode;
	export import Matrix = flash.geom.Matrix;
	export import Dictionary = flash.utils.Dictionary;
	
	
	export  class SWFShape
	{
		protected static sHelperRecordEnd : SWFShapeRecordEnd = asc.sti(SWFShape,()=>{ SWFShape.sHelperRecordEnd = new SWFShapeRecordEnd; });
		
		protected _records : SWFShapeRecord[] = undefined;
		protected _fillStyles : SWFFillStyle[] = undefined;
		protected _lineStyles : SWFLineStyle[] = undefined;
		protected _fillPaths : IEdge[] = undefined;
		protected _linePaths : IEdge[] = undefined;
		protected _unitDivisor : number = NaN;
		
		public get records () : SWFShapeRecord[] { return this._records; }
		public get fillStyles () : SWFFillStyle[] { return this._fillStyles; }
		public get lineStyles () : SWFLineStyle[] { return this._lineStyles; }
		
		/**
		 * Constructor 
		 * @param data
		 * @param level
		 * @param unitDivisor
		 * 
		 */		
		constructor (data : SWFData = null, level : number = 1, unitDivisor : number = 20)
		{
			/**/ data = strict(data, SWFData); level = ((level) >>> 0); unitDivisor = (+(unitDivisor));
			this._records = new Array;
			this._fillStyles = new Array;
			this._lineStyles = new Array;
			this._unitDivisor = unitDivisor;
			
			if (data != null) {
				
				this.parse (data, level);
				
			}
		}
		
		/*[internal]*/ public parse (data : SWFData, level : number = 1) : void
		{
			// data = strict(data, SWFData); level = ((level) >>> 0);
			data.resetBitsPending();
			var numFillBits : number = data.readUB(4);
			var numLineBits : number = data.readUB(4);
			this.readShapeRecords (data, numFillBits, numLineBits, level);
		}
		
		/*[internal]*/ protected readShapeRecords (data : SWFData, fillBits : number, lineBits : number, level : number = 1) : void
		{
			// data = strict(data, SWFData); fillBits = ((fillBits) >>> 0); lineBits = ((lineBits) >>> 0); level = ((level) >>> 0);
			var shapeRecord;
			
			while (shapeRecord != SWFShape.sHelperRecordEnd) {
				
				// The SWF10 spec says that shape records are byte aligned.
				// In reality they seem not to be?
				// bitsPending = 0;
				var edgeRecord = data.readUB(1) == 1;
				if (edgeRecord) {
					
					var straightFlag = data.readUB(1) == 1;
					var numBits : number =  ((data.readUB(4) + 2) >>> 0);
					if (straightFlag) {
						
						shapeRecord = data.readSTRAIGHTEDGERECORD (numBits);
						
					} else {
						
						shapeRecord = data.readCURVEDEDGERECORD (numBits);
						
					}
					
				} else {
					
					var states : number = data.readUB(5);
					if (states == 0) {
						
						shapeRecord = SWFShape.sHelperRecordEnd;
						
					} else {
						
						var styleChangeRecord = data.readSTYLECHANGERECORD (states, fillBits, lineBits, level);
						if (styleChangeRecord.stateNewStyles) {
							
							fillBits =(( styleChangeRecord.numFillBits) >>> 0);
							lineBits =(( styleChangeRecord.numLineBits) >>> 0);
							
						}
						
						shapeRecord = styleChangeRecord;
						
					}
					
				}
				
				this._records[this._records.length] = shapeRecord;
				
			}
		}
		
		/*[internal]*/ public exportShape (handler : IShapeExporter = null) : void
		{
			// handler = strict(handler, 'implements_flash___native_format_swf_exporters_core_IShapeExporter');
			if (!this._fillPaths || !this._linePaths) {
				
				// Create edge maps
				var fillEdgeMaps = new Array;
				var lineEdgeMaps = new Array;
				this.createEdgeMaps (this, this._fillStyles, this._lineStyles, fillEdgeMaps, lineEdgeMaps);
				
				this._fillPaths = new Array;
				this._linePaths = new Array;
				var count = lineEdgeMaps.length;
				for (var i = 0; i < count; i++) {
					
					this._fillPaths[this._fillPaths.length] = this.createPathFromEdgeMap (fillEdgeMaps[i]);
					this._linePaths[this._linePaths.length] = this.createPathFromEdgeMap (lineEdgeMaps[i]);
					
				}
				
			}
			
			// If no handler is passed, default to DefaultShapeExporter (does nothing)
			handler =handler || new DefaultShapeExporter (null);
			
			// Let the doc handler know that a shape export starts
			handler.beginShape ();
			
			// Export fills and strokes for each group separately
			for (var i = 0, len = this._linePaths.length; i < len; ++i) {
				
				// Export fills first
				this.exportFillPath (this._fillPaths[i], handler);
				
				// Export strokes last
				this.exportLinePath (this._linePaths[i], handler);
				
			}
			
			// Let the doc handler know that we're done exporting a shape
			handler.endShape ();
		}
		
		/*[internal]*/ protected createEdgeMaps (shape : SWFShape, fillStyles : SWFFillStyle[], lineStyles : SWFLineStyle[],
																								 fillEdgeMaps : Dictionary[], lineEdgeMaps : Dictionary[]) : void
		{
			// shape = strict(shape, SWFShape);
			var xPos = 0;
			var yPos = 0;
			var fillStyleIdxOffset = 0;
			var lineStyleIdxOffset = 0;
			var currentFillStyleIdx0 = 0;
			var currentFillStyleIdx1 = 0;
			var currentLineStyleIdx = 0;
			var subPath = new Array;
			var currentFillEdgeMap : Dictionary = new Dictionary;
			var currentLineEdgeMap : Dictionary = new Dictionary;
			
			for (var i = 0, len = this._records.length; i < len; i++) {
				
				var shapeRecord = this._records[i];
				switch (shapeRecord.type) {
					
					case SWFShapeRecord.TYPE_STYLECHANGE:
						var styleChangeRecord = shapeRecord;
						if (styleChangeRecord.stateLineStyle || styleChangeRecord.stateFillStyle0 || styleChangeRecord.stateFillStyle1) {
							
							this.processSubPath (subPath, currentLineStyleIdx, currentFillStyleIdx0, currentFillStyleIdx1, currentFillEdgeMap, currentLineEdgeMap);
							subPath = new Array;
							
						}
						
						if (styleChangeRecord.stateNewStyles) {
							
							fillStyleIdxOffset = fillStyles.length;
							lineStyleIdxOffset = lineStyles.length;
							this.appendFillStyles (fillStyles, styleChangeRecord.fillStyles);
							this.appendLineStyles (lineStyles, styleChangeRecord.lineStyles);
							
						}
						
						// Check if all styles are reset to 0.
						// This (probably) means that a new group starts with the next record
						if (styleChangeRecord.stateLineStyle && styleChangeRecord.lineStyle == 0 &&
							styleChangeRecord.stateFillStyle0 && styleChangeRecord.fillStyle0 == 0 &&
							styleChangeRecord.stateFillStyle1 && styleChangeRecord.fillStyle1 == 0) {
							
							this.cleanEdgeMap (currentFillEdgeMap);
							this.cleanEdgeMap (currentLineEdgeMap);
							fillEdgeMaps[fillEdgeMaps.length] = currentFillEdgeMap;
							lineEdgeMaps[lineEdgeMaps.length] = currentLineEdgeMap;
							currentFillEdgeMap = new Dictionary;
							currentLineEdgeMap = new Dictionary;
							currentLineStyleIdx = 0;
							currentFillStyleIdx0 = 0;
							currentFillStyleIdx1 = 0;
							
						} else {
							
							if (styleChangeRecord.stateLineStyle) {
								
								currentLineStyleIdx = styleChangeRecord.lineStyle;
								if (currentLineStyleIdx > 0) {
									
									currentLineStyleIdx += lineStyleIdxOffset;
									
								}
								
							}
							
							if (styleChangeRecord.stateFillStyle0) {
								
								currentFillStyleIdx0 = styleChangeRecord.fillStyle0;
								if (currentFillStyleIdx0 > 0) {
									
									currentFillStyleIdx0 += fillStyleIdxOffset;
									
								}
								
							}
							if (styleChangeRecord.stateFillStyle1) {
								
								currentFillStyleIdx1 = styleChangeRecord.fillStyle1;
								if (currentFillStyleIdx1 > 0) {
									
									currentFillStyleIdx1 += fillStyleIdxOffset;
									
								}
								
							}
							
						}
						
						if (styleChangeRecord.stateMoveTo) {
							
							xPos = styleChangeRecord.moveDeltaX;
							yPos = styleChangeRecord.moveDeltaY;
							
						}
						break;
					
					case SWFShapeRecord.TYPE_STRAIGHTEDGE:
						var straightEdgeRecord = shapeRecord;
						var xPosFrom = xPos;
						var yPosFrom = yPos;
						
						if (straightEdgeRecord.generalLineFlag) {
							
							xPos += straightEdgeRecord.deltaX;
							yPos += straightEdgeRecord.deltaY;
							
						} else {
							
							if (straightEdgeRecord.vertLineFlag) {
								
								yPos += straightEdgeRecord.deltaY;
								
							} else {
								
								xPos += straightEdgeRecord.deltaX;
								
							}
							
						}
						
						subPath[subPath.length] = new StraightEdge (xPosFrom, yPosFrom, xPos, yPos, currentLineStyleIdx, currentFillStyleIdx1);
						break;
					
					case SWFShapeRecord.TYPE_CURVEDEDGE:
						var curvedEdgeRecord = shapeRecord;
						var xPosFrom = xPos;
						var yPosFrom = yPos;
						var xPosControl = xPos + curvedEdgeRecord.controlDeltaX;
						var yPosControl = yPos + curvedEdgeRecord.controlDeltaY;
						xPos = xPosControl + curvedEdgeRecord.anchorDeltaX;
						yPos = yPosControl + curvedEdgeRecord.anchorDeltaY;
						subPath[subPath.length] = new CurvedEdge (xPosFrom, yPosFrom, xPosControl, yPosControl, xPos, yPos, currentLineStyleIdx, currentFillStyleIdx1);
						break;
					
					case SWFShapeRecord.TYPE_END:
						// We're done. Process the last subpath, if any
						this.processSubPath (subPath, currentLineStyleIdx, currentFillStyleIdx0, currentFillStyleIdx1, currentFillEdgeMap, currentLineEdgeMap);
						this.cleanEdgeMap (currentFillEdgeMap);
						this.cleanEdgeMap (currentLineEdgeMap);
						fillEdgeMaps[fillEdgeMaps.length] = currentFillEdgeMap;
						lineEdgeMaps[lineEdgeMaps.length] = currentLineEdgeMap;
						break;
					
				}
				
			}
		}
		
		/*[internal]*/ protected processSubPath(subPath : IEdge[], lineStyleIdx : number, fillStyleIdx0 : number, fillStyleIdx1 : number,
																								 currentFillEdgeMap : Dictionary, currentLineEdgeMap : Dictionary) : void
		{
			// lineStyleIdx = ((lineStyleIdx) >>> 0); fillStyleIdx0 = ((fillStyleIdx0) >>> 0); fillStyleIdx1 = ((fillStyleIdx1) >>> 0); currentFillEdgeMap = strict(currentFillEdgeMap, Dictionary); currentLineEdgeMap = strict(currentLineEdgeMap, Dictionary);
			var path;
			if (fillStyleIdx0 != 0) {
				
				path = currentFillEdgeMap.get(fillStyleIdx0);
				if (path == null) {
					
					path = new Array;
					currentFillEdgeMap.set(fillStyleIdx0,  path);
					
				}
				
				for (var j = subPath.length - 1; j >= 0; j--) {
					
					path[path.length] = subPath[j].reverseWithNewFillStyle (fillStyleIdx0);
					
				}
				
			}
			
			if (fillStyleIdx1 != 0) {
				
				path = currentFillEdgeMap.get(fillStyleIdx1);
				if (path == null) {
					
					path = new Array;
					currentFillEdgeMap.set(fillStyleIdx1,  path);
					
				}
				
				this.appendEdges(path, subPath);
				
			}
			
			if (lineStyleIdx != 0) {
				
				path = currentLineEdgeMap.get(lineStyleIdx);
				if (path == null) {
					
					path = new Array;
					currentLineEdgeMap.set(lineStyleIdx,  path);
					
				}
				
				this.appendEdges(path, subPath);
				
			}
		}
		
		/*[internal]*/ protected exportFillPath (path : IEdge[], handler : IShapeExporter) : void
		{
			// handler = strict(handler, 'implements_flash___native_format_swf_exporters_core_IShapeExporter');
			var posX = int.MAX_VALUE;
			var posY = int.MAX_VALUE;
			var fillStyleIdx = int.MAX_VALUE;
			var matrix;
			
			if (path.length > 0) {
				
				handler.beginFills ();
				
				for (var i = 0, len = path.length; i < len; i++) {
					
					var e = path[i];
					if (fillStyleIdx != e.getFillStyleIdx ()) {
						
						if (fillStyleIdx != int.MAX_VALUE) {
							
							handler.endFill ();
							
						}
						
						fillStyleIdx = e.getFillStyleIdx ();
						posX = int.MAX_VALUE;
						posY = int.MAX_VALUE;
						
						if (fillStyleIdx - 1 < this._fillStyles.length) {
							
							var fillStyle = this._fillStyles[fillStyleIdx - 1];
							switch (fillStyle.type) {
								
								case 0x00: // FILLSTYLE.SOLID
									// Solid fill
									handler.beginFill (ColorUtils.rgb (fillStyle.rgb), ColorUtils.alpha (fillStyle.rgb));
									break;
								
								case 0x10: // FILLSTYLE.LINEAR_GRADIENT
								case 0x12: // FILLSTYLE.RADIAL_GRADIENT
								case 0x13: // FILLSTYLE.FOCAL_RADIAL_GRADIENT
									// Gradient fill
									var colors = [];
									var alphas = [];
									var ratios = [];
									var gradientRecord;
									
									matrix = fillStyle.gradientMatrix.matrix.clone();
									
									for (var gri = 0, grilen = fillStyle.gradient.records.length; gri < grilen; gri++) {
										
										gradientRecord = fillStyle.gradient.records[gri];
										colors[colors.length] = ColorUtils.rgb(gradientRecord.color);
										alphas[alphas.length] = ColorUtils.alpha(gradientRecord.color);
										ratios[ratios.length] = gradientRecord.ratio;
										
									}
									
									handler.beginGradientFill(
										fillStyle.type == 0x10 ? GradientType.LINEAR : GradientType.RADIAL,
										colors, alphas, ratios, matrix,
										GradientSpreadMode.toString (fillStyle.gradient.spreadMode),
										GradientInterpolationMode.toString (fillStyle.gradient.interpolationMode),
										fillStyle.gradient.focalPoint
									);
									break;
								
								case 0x40: // FILLSTYLE.REPEATING_BITMAP
								case 0x41: // FILLSTYLE.CLIPPED_BITMAP
								case 0x42: // FILLSTYLE.NON_SMOOTHED_REPEATING_BITMAP
								case 0x43: // FILLSTYLE.NON_SMOOTHED_CLIPPED_BITMAP
									// Bitmap fill
									var m = fillStyle.bitmapMatrix;
									matrix = new Matrix (m.scaleX / this._unitDivisor, m.rotateSkew0 / this._unitDivisor, m.rotateSkew1 / this._unitDivisor, m.scaleY / this._unitDivisor, m.translateX / this._unitDivisor, m.translateY / this._unitDivisor);
									handler.beginBitmapFill(
										fillStyle.bitmapId,
										matrix,
										fillStyle.type == 0x40 || fillStyle.type == 0x42,
										fillStyle.type == 0x40 || fillStyle.type == 0x41
									);
									break;
								
							}
							
						} else {
							
							// Font shapes define no fillstyles per se, but do reference fillstyle index 1,
							// which represents the font color. We just report null in this case.
							handler.beginFill (0);
							
						}
						
					}
					
					if (posX != e.getFromX() || posY != e.getFromY()) {
						
						handler.moveTo (e.getFromX() / this._unitDivisor, e.getFromY() / this._unitDivisor);
						
					}
					
					if (is(e , CurvedEdge)) {
						
						handler.curveTo (e.getControlX() / this._unitDivisor, e.getControlY() / this._unitDivisor, e.getToX() / this._unitDivisor, e.getToY() / this._unitDivisor);
						
					} else {
						
						handler.lineTo (e.getToX() / this._unitDivisor, e.getToY() / this._unitDivisor);
						
					}
					
					posX = e.getToX();
					posY = e.getToY();
					
				}
				
				if (fillStyleIdx != int.MAX_VALUE) {
					
					handler.endFill ();
					
				}
				
				handler.endFills ();
				
			}
		}
		
		/*[internal]*/ protected exportLinePath (path : IEdge[], handler : IShapeExporter) : void
		{
			// handler = strict(handler, 'implements_flash___native_format_swf_exporters_core_IShapeExporter');
			var posX = int.MAX_VALUE;
			var posY = int.MAX_VALUE;
			var lineStyleIdx = int.MAX_VALUE;
			
			if (path.length > 0) {
				
				var autoClose = true;
				handler.beginLines ();
				
				for (var i = 0, len = path.length; i < len; i++) {
					
					var e = path[i];
					if (lineStyleIdx != e.getLineStyleIdx()) {
						
						lineStyleIdx = e.getLineStyleIdx();
						posX = int.MAX_VALUE;
						posY = int.MAX_VALUE;
						var lineStyle = null;
						
						try {
							
							lineStyle = this._lineStyles[lineStyleIdx - 1];
							
						} catch (e  ) {
							
							
							
						e = window.asc.e2e(e);
							
							
							
						}
						
						if (lineStyle != null) {
							
							var scaleMode = LineScaleMode.NORMAL;
							autoClose = true;
							
							if (lineStyle.noClose) {
								
								autoClose = false;
								
							}
							
							if (lineStyle.noHScaleFlag && lineStyle.noVScaleFlag) {
								
								scaleMode = LineScaleMode.NONE;
								
							} else if (lineStyle.noHScaleFlag) {
								
								scaleMode = LineScaleMode.HORIZONTAL;
								
							} else if (lineStyle.noVScaleFlag) {
								
								scaleMode = LineScaleMode.VERTICAL;
								
							}
							
							handler.lineStyle (
								lineStyle.width / this._unitDivisor,
								ColorUtils.rgb (lineStyle.color),
								ColorUtils.alpha (lineStyle.color),
								lineStyle.pixelHintingFlag,
								scaleMode,
								LineCapsStyle.toString (lineStyle.startCapsStyle),
								LineCapsStyle.toString (lineStyle.endCapsStyle),
								LineJointStyle.toString (lineStyle.jointStyle),
								lineStyle.miterLimitFactor);
							
							if (lineStyle.hasFillFlag) {
								
								var fillStyle = lineStyle.fillType;
								switch (fillStyle.type) {
									
									case 0x10: // FILLSTYLE.LINEAR_GRADIENT
									case 0x12: // FILLSTYLE.RADIAL_GRADIENT
									case 0x13: // FILLSTYLE.FOCAL_RADIAL_GRADIENT
										// Gradient fill
										var colors = [];
										var alphas = [];
										var ratios = [];
										var gradientRecord;
										var matrix = fillStyle.gradientMatrix.matrix.clone ();
										
										for (var gri = 0, grilen = fillStyle.gradient.records.length; gri < grilen; gri++) {
											
											gradientRecord = fillStyle.gradient.records[gri];
											colors[colors.length] = ColorUtils.rgb (gradientRecord.color);
											alphas[alphas.length] = ColorUtils.alpha (gradientRecord.color);
											ratios[ratios.length] = gradientRecord.ratio;
											
										}
										
										handler.lineGradientStyle (
											fillStyle.type == 0x10 ? GradientType.LINEAR : GradientType.RADIAL,
											colors, alphas, ratios, matrix,
											GradientSpreadMode.toString (fillStyle.gradient.spreadMode),
											GradientInterpolationMode.toString (fillStyle.gradient.interpolationMode),
											fillStyle.gradient.focalPoint
										);
										break;
									
								}
								
							}
							
						} else {
							
							// We should never get here
							handler.lineStyle (NaN);
							
						}
						
					}
					
					if (posX != e.getFromX() || posY != e.getFromY()) {
						
						handler.moveTo (e.getFromX() / this._unitDivisor, e.getFromY() / this._unitDivisor);
						
					}
					
					if (is(e , CurvedEdge)) {
						
						handler.curveTo (e.getControlX() / this._unitDivisor, e.getControlY() / this._unitDivisor, e.getToX() / this._unitDivisor, e.getToY() / this._unitDivisor);
						
					} else {
						
						handler.lineTo (e.getToX() / this._unitDivisor, e.getToY() / this._unitDivisor);
						
					}
					
					posX = e.getToX();
					posY = e.getToY();
					
				}
				
				var firstEdge = path[0];
				handler.endLines (autoClose && firstEdge.getFromX() == posX && firstEdge.getFromY() == posY);
				
			}
		}
		
		/*[internal]*/ protected createPathFromEdgeMap(edgeMap : Dictionary) : IEdge[]
		{
			// edgeMap = strict(edgeMap, Dictionary);
			var newPath = new Array;
			var styleIdxArray = new Array;
			
			var __for0 = window.asc.in(edgeMap);
			for (var styleIdx of __for0) {
				
				styleIdxArray[styleIdxArray.length] = styleIdx;
				
			}
			
			styleIdxArray.sort (Array.NUMERIC);
			
			for (var i = 0, len = styleIdxArray.length; i < len; i++) {
				
				this.appendEdges (newPath, edgeMap.get(styleIdxArray[i]));
				
			}
			
			return newPath;
		}
		
		/*[internal]*/ protected cleanEdgeMap (edgeMap : Dictionary) : void
		{
			// edgeMap = strict(edgeMap, Dictionary);
			var __for1 = window.asc.in(edgeMap);
			for (var styleIdx of __for1) {
				
				var subPath = edgeMap.get(styleIdx);
				if (subPath && subPath.length > 0) {
					
					var idx = 0;
					var prevEdge = null;
					var tmpPath = new Array;
					var coordMap = this.createCoordMap (subPath);
					
					var length = subPath.length;
					var minIndex = 0;
					var maxIndex = length - 1;
					
					while (length > 0) {
						
						idx = minIndex;
						
						while (length > 0) {
							
							if (prevEdge != null) {
								
								var subPathEdge = subPath[idx];
								if (prevEdge.getToX() != subPathEdge.getFromX() || prevEdge.getToY() != subPathEdge.getFromY()) {
									
									var edge = this.findNextEdgeInCoordMap (coordMap, prevEdge);
									if (edge != null) {
										
										idx = subPath.indexOf (edge);
										
									} else {
										
										idx = minIndex;
										prevEdge = null;
										
									}
									continue;
									
								}
								
							}
							
							var edge = subPath[idx];
							tmpPath[tmpPath.length] = edge;
							this.removeEdgeFromCoordMap (coordMap, edge);
							prevEdge = edge;
							
							subPath[idx] = null;
							length--;
							
							if (idx == maxIndex) {
								
								while (subPath[idx] == null && idx > minIndex) {
									
									idx--;
									
								}
								
								maxIndex = idx;
								break;
								
							} else if (idx == minIndex) {
								
								while (subPath[idx] == null && idx < maxIndex) {
									
									idx++;
									
								}
								
								minIndex = idx;
								
							} else {
								
								while (subPath[idx] == null && idx < maxIndex) {
									
									idx++;
									
								}
								
							}
							
						}
						
					}
					
					edgeMap.set(styleIdx,  tmpPath);
					
				}
			}
		}
		
		/*[internal]*/ protected createCoordMap(path : IEdge[]) : Dictionary
		{
			var coordMap : Dictionary = new Dictionary;
			
			for (var i = 0, len = path.length; i < len; i++) {
				
				var edge = path[i];
				var fromLong = edge.getFromX() * Math.pow(2, 32) + edge.getFromY();
				var coordMapArray = coordMap.get(fromLong);
				
				if (coordMapArray == null) {
					
					coordMap.set(fromLong,  (<IEdge[]>[path[i]]));
					
				} else {
					
					coordMapArray[coordMapArray.length] = path[i];
					
				}
				
			}
			
			return coordMap;
		}
		
		/*[internal]*/ protected removeEdgeFromCoordMap(coordMap : Dictionary, edge : IEdge) : void
		{
			// coordMap = strict(coordMap, Dictionary); edge = strict(edge, 'implements_flash___native_format_swf_data_etc_IEdge');
			var fromLong = edge.getFromX() * Math.pow(2, 32) + edge.getFromY();
			var coordMapArray = coordMap.get(fromLong);
			
			if (coordMapArray != null) {
				
				if (coordMapArray.length == 1) {
					
					 coordMap.delete(fromLong);
					
				} else {
					
					var i = coordMapArray.indexOf (edge);
					
					if (i > -1) {
						
						coordMapArray.splice (i, 1);
						
					}
					
				}
				
			}
		}
		
		/*[internal]*/ protected findNextEdgeInCoordMap(coordMap : Dictionary, edge : IEdge) : IEdge
		{
			// coordMap = strict(coordMap, Dictionary); edge = strict(edge, 'implements_flash___native_format_swf_data_etc_IEdge');
			var toLong = edge.getToX() * Math.pow(2, 32) + edge.getToY();
			var coordMapArray = coordMap.get(toLong);
			
			if (coordMapArray != null && coordMapArray.length > 0) {
				
				return coordMapArray[0];
				
			}
			
			return null;
		}
		
		/*[internal]*/ protected appendFillStyles(v1 : SWFFillStyle[], v2 : SWFFillStyle[]) : void
		{
			for (var i = 0, len = v2.length; i < len; i++) {
				
				v1[v1.length] = v2[i];
				
			}
		}
		
		/*[internal]*/ protected appendLineStyles(v1 : SWFLineStyle[], v2 : SWFLineStyle[]) : void
		{
			for (var i = 0, len = v2.length; i < len; i++) {
				
				v1[v1.length] = v2[i];
				
			}
		}
		
		/*[internal]*/ protected appendEdges(v1 : IEdge[], v2 : IEdge[]) : void
		{
			for (var i = 0, len = v2.length; i < len; i++) {
				
				v1[v1.length] = v2[i];
				
			}
		}
		
		/*[internal]*/ public publish(data:SWFData, level:number = 1):void
		{
			// data = strict(data, SWFData); level = ((level) >>> 0);
			var numFillBits:number = data.calculateMaxBits(false, [this.getMaxFillStyleIndex()]);
			var numLineBits:number = data.calculateMaxBits(false, [this.getMaxLineStyleIndex()]);
			data.resetBitsPending();
			data.writeUB(4, numFillBits);
			data.writeUB(4, numLineBits);
			this.writeShapeRecords(data, numFillBits, numLineBits, level);
		}
		
		/*[internal]*/ public getMaxFillStyleIndex():number
		{
			var ret:number = 0;
			for (var i:number = 0, len:number =  ((this._records.length) >>> 0); i < len; i++) {
				
				var shapeRecord:SWFShapeRecord =  strict(this._records[i], SWFShapeRecord);
				if (shapeRecord.type == SWFShapeRecord.TYPE_STYLECHANGE) {
					
					var shapeRecordStyleChange:SWFShapeRecordStyleChange = as(shapeRecord , SWFShapeRecordStyleChange);
					if (shapeRecordStyleChange.fillStyle0 > ret) {
						
						ret = shapeRecordStyleChange.fillStyle0;
						
					}
					
					if (shapeRecordStyleChange.fillStyle1 > ret) {
						
						ret = shapeRecordStyleChange.fillStyle1;
						
					}
					
					if (shapeRecordStyleChange.stateNewStyles) {
						
						break;
						
					}
					
				} 
				
			}
			
			return ret;
		}
		
		/*[internal]*/ public getMaxLineStyleIndex():number
		{
			var ret:number = 0;
			for (var i:number = 0, len:number =  ((this._records.length) >>> 0); i < len; i++) {
				
				var shapeRecord:SWFShapeRecord =  strict(this._records[i], SWFShapeRecord);
				if (shapeRecord.type == SWFShapeRecord.TYPE_STYLECHANGE) {
					
					var shapeRecordStyleChange:SWFShapeRecordStyleChange = as(shapeRecord , SWFShapeRecordStyleChange);
					if (shapeRecordStyleChange.lineStyle > ret) {
						
						ret = shapeRecordStyleChange.lineStyle;
						
					}
					
					if (shapeRecordStyleChange.stateNewStyles) {
						
						break;
						
					}
					
				} 
				
			}
			
			return ret;
		}
		
		/*[internal]*/ protected writeShapeRecords(data:SWFData, fillBits:number, lineBits:number, level:number = 1):void
		{
			// data = strict(data, SWFData); fillBits = ((fillBits) >>> 0); lineBits = ((lineBits) >>> 0); level = ((level) >>> 0);
			if (this._records.length == 0 || !(is(this._records[this._records.length - 1] , SWFShapeRecordEnd))) {
				
				this._records.push(new SWFShapeRecordEnd());
				
			}
			
			for (var i:number = 0; i < this._records.length; i++) {
				
				var shapeRecord:SWFShapeRecord =  strict(this._records[i], SWFShapeRecord);
				if (shapeRecord.isEdgeRecord) {
					
					// EdgeRecordFlag (set)
					data.writeUB(1, 1);
					if (shapeRecord.type == SWFShapeRecord.TYPE_STRAIGHTEDGE) {
						
						// StraightFlag (set)
						data.writeUB(1, 1);
						data.writeSTRAIGHTEDGERECORD(strict(shapeRecord, SWFShapeRecordStraightEdge));
						
					} else {
						
						// StraightFlag (not set)
						data.writeUB(1, 0);
						data.writeCURVEDEDGERECORD(strict(shapeRecord, SWFShapeRecordCurvedEdge));
						
					}
					
				} else {
					
					// EdgeRecordFlag (not set)
					data.writeUB(1, 0);
					if (shapeRecord.type == SWFShapeRecord.TYPE_END) {
						
						data.writeUB(5, 0);
						
					} else {
						
						var states:number = 0;
						var styleChangeRecord:SWFShapeRecordStyleChange = as(shapeRecord , SWFShapeRecordStyleChange);
						if(styleChangeRecord.stateNewStyles) { states |= 0x10; }
						if(styleChangeRecord.stateLineStyle) { states |= 0x08; }
						if(styleChangeRecord.stateFillStyle1) { states |= 0x04; }
						if(styleChangeRecord.stateFillStyle0) { states |= 0x02; }
						if(styleChangeRecord.stateMoveTo) { states |= 0x01; }
						data.writeUB(5, states);
						data.writeSTYLECHANGERECORD(styleChangeRecord, fillBits, lineBits, level);
						
						if (styleChangeRecord.stateNewStyles) {
							
							fillBits = styleChangeRecord.numFillBits;
							lineBits = styleChangeRecord.numLineBits;
							
						}
						
					}
					
				}
				
			}
		}
		
		/*[internal]*/ public clearPaths () : void
		{
			this._fillPaths = null;
			this._linePaths = null;
		}
		
		/*[internal]*/ public toString(indent:number = 0):string
		{
			// indent = ((indent) >>> 0);
			var str:string = "\n" + StringUtils.repeat(indent) + "ShapeRecords:";
			for (var i:number = 0, len:number =  ((this._records.length) >>> 0); i < len; i++) {
				
				str += "\n" + StringUtils.repeat(indent + 2) + "[" + i + "] " + this._records[i].toString(indent + 2);
				
			}
			
			return str;
		}
	}
}