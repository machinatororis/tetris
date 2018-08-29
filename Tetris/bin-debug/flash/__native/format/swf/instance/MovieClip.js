var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var format;
        (function (format) {
            var swf;
            (function (swf) {
                var instance;
                (function (instance) {
                    instance.Main = global.Main;
                    instance.SWFTimelineContainer = flash.__native.format.swf.SWFTimelineContainer;
                    instance.FrameObject = flash.__native.format.swf.timeline.FrameObject;
                    instance.DisplayObject = flash.display.DisplayObject;
                    instance.FrameLabel = flash.display.FrameLabel;
                    instance.Scene = flash.display.Scene;
                    instance.Matrix = flash.geom.Matrix;
                    var MovieClip = (function (_super) {
                        __extends(MovieClip, _super);
                        function MovieClip(data) {
                            var _this = this;
                            _this._lastUpdate === void 0 && (_this._lastUpdate = 0);
                            _this._lastEvaluate === void 0 && (_this._lastEvaluate = 0);
                            _this._currentFrame === void 0 && (_this._currentFrame = 0);
                            _this._totalFrames === void 0 && (_this._totalFrames = 0);
                            _this._currentConcatenatedMaxTotalFrames === void 0 && (_this._currentConcatenatedMaxTotalFrames = 0);
                            _this = _super.call(this) || this;
                            if (!data) {
                                return;
                            }
                            _this._data = data;
                            _this._offStageEvents = false;
                            _this._currentFrame = 1;
                            _this._totalFrames = ((data._frames.length) >> 0);
                            _this._currentConcatenatedMaxTotalFrames = _this._totalFrames;
                            _this._currentLabels = new Array;
                            var __for0 = window.asc.in(data.frameLabels);
                            for (var _i = 0, __for0_1 = __for0; _i < __for0_1.length; _i++) {
                                var frame = __for0_1[_i];
                                _this._currentLabels.push(new instance.FrameLabel(data.frameLabels.get(frame), frame + 1));
                            }
                            if (_this._currentLabels.length > 0) {
                                _this._currentLabels.sort(function (a, b) { return a.frame - b.frame; }.__bind(_this));
                            }
                            _this._objectPool = new Array;
                            _this._objectPoolSize = new Array;
                            _this._activeObjects = new Array;
                            _this._activeObjectsSize = 0;
                            _this._newActiveObjects = new Array;
                            _this._newActiveObjectsSize = 0;
                            _this.__update();
                            if (_this._totalFrames > 1) {
                                _this.play();
                            }
                            else {
                                _this.__handle(true);
                            }
                            return _this;
                        }
                        Object.defineProperty(MovieClip.prototype, "currentFrame", {
                            get: function () {
                                return this._currentFrame;
                            },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(MovieClip.prototype, "currentFrameLabel", {
                            get: function () {
                                return null;
                            },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(MovieClip.prototype, "currentLabel", {
                            get: function () {
                                return this._currentLabel;
                            },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(MovieClip.prototype, "currentLabels", {
                            get: function () {
                                return null;
                            },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(MovieClip.prototype, "currentScene", {
                            get: function () {
                                return null;
                            },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(MovieClip.prototype, "framesLoaded", {
                            get: function () {
                                return 0;
                            },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(MovieClip.prototype, "isPlaying", {
                            get: function () {
                                return false;
                            },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(MovieClip.prototype, "scenes", {
                            get: function () {
                                return null;
                            },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(MovieClip.prototype, "totalFrames", {
                            get: function () {
                                return this._totalFrames;
                            },
                            enumerable: true,
                            configurable: true
                        });
                        MovieClip.prototype.gotoAndPlay = function (frame, scene) {
                            if (scene === void 0) { scene = null; }
                            scene = as(scene, 'String');
                            this.play();
                            this._currentFrame = this.__getFrame(frame);
                            this.__update();
                        };
                        MovieClip.prototype.gotoAndStop = function (frame, scene) {
                            if (scene === void 0) { scene = null; }
                            scene = as(scene, 'String');
                            this.stop();
                            this._currentFrame = this.__getFrame(frame);
                            this.__update();
                        };
                        MovieClip.prototype.nextFrame = function () {
                            var next = this._currentFrame + 1;
                            if (next > this._totalFrames) {
                                next = this._totalFrames;
                            }
                            this.gotoAndStop(next);
                        };
                        MovieClip.prototype.nextScene = function () {
                        };
                        MovieClip.prototype.play = function () {
                            if (this._totalFrames < 2) {
                                return;
                            }
                            this._playing = true;
                            if (!this._handling) {
                                this.__handle(true);
                            }
                        };
                        MovieClip.prototype.prevFrame = function () {
                            var previous = this._currentFrame - 1;
                            if (previous < 1) {
                                previous = 1;
                            }
                            this.gotoAndStop(previous);
                        };
                        MovieClip.prototype.prevScene = function () {
                        };
                        MovieClip.prototype.stop = function () {
                            this._playing = false;
                        };
                        MovieClip.prototype.stopAllMovieClips = function (unload) {
                            if (unload === void 0) { unload = false; }
                            unload = Boolean(unload);
                            _super.prototype.stopAllMovieClips.call(this, unload);
                            this.stop();
                        };
                        MovieClip.prototype.addFrameScript = function () {
                            var params = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                params[_i] = arguments[_i];
                            }
                            for (var i = 0, len = params.length; i < len; i += 2) {
                                var index = params[i] | 0;
                                var method = params[i + 1];
                                if (index < 0 || !method) {
                                    continue;
                                }
                                this._frameScripts = this._frameScripts || [];
                                this._frameScripts[index] = this._frameScripts[index] || [];
                                this._frameScripts[index].push(method.__bind(this));
                            }
                        };
                        MovieClip.prototype.__applyTween = function (start, end, ratio) {
                            return start + ((end - start) * ratio);
                        };
                        MovieClip.prototype.__getFrame = function (frame) {
                            var value = 1;
                            if (is(frame, 'int')) {
                                value = frame;
                                if (value < 1)
                                    value = 1;
                                if (value > this._totalFrames)
                                    value = this._totalFrames;
                            }
                            else if (is(frame, 'String')) {
                                if (this._data.frameIndexes.get(frame))
                                    value = this._data.frameIndexes.get(frame);
                                else
                                    value = 1;
                            }
                            return value;
                        };
                        MovieClip.prototype.__update = function () {
                            if (this._lastUpdate == this._currentFrame) {
                                return;
                            }
                            var frameIndex = this._currentFrame - 1;
                            if (frameIndex > -1) {
                                this._currentFrameLabel = as(this._data._frames[frameIndex].label, 'String');
                                if (this._currentFrameLabel != null) {
                                    this._currentLabel = this._currentFrameLabel;
                                }
                                this.__renderFrame(frameIndex);
                            }
                            this._lastUpdate = this._currentFrame;
                        };
                        MovieClip.prototype.__handle = function (value) {
                            if (this._handling = value) {
                                instance.DisplayObject.__addTimelineObject(this);
                            }
                            else {
                                instance.DisplayObject.__removeTimelineObject(this);
                            }
                        };
                        MovieClip.prototype.__evaluate = function () {
                            if (this._lastEvaluate == this._currentFrame) {
                                return;
                            }
                            var frameIndex = this._currentFrame - 1;
                            if (frameIndex > -1) {
                                this.__evaluateFrameScripts(frameIndex);
                            }
                            this._lastEvaluate = this._currentFrame;
                        };
                        MovieClip.prototype.__evaluateFrameScripts = function (frame) {
                            var arr;
                            if (!this._frameScripts || !(arr = this._frameScripts[frame])) {
                                return;
                            }
                            var len = arr.length;
                            for (var i = 0; i < len; ++i) {
                                arr[i]();
                            }
                        };
                        MovieClip.prototype.__exitInternal = function (nextFrame) {
                            var frame = this._currentFrame;
                            this.__evaluate();
                            if (nextFrame == 1) {
                                if (this._playing) {
                                    if (frame == this._currentFrame) {
                                        this._currentFrame++;
                                        if (this._currentFrame > this._totalFrames) {
                                            this._currentFrame = 1;
                                        }
                                        this.__update();
                                    }
                                }
                                else if (this._handling) {
                                    this.__handle(false);
                                }
                            }
                        };
                        MovieClip.prototype.__placeObject = function (displayObject, frameObject) {
                            var index;
                            var tags = this._data._tags;
                            var firstTag = tags[frameObject.placedAtIndex];
                            var lastNameTag;
                            var lastMatrixTag;
                            var lastColorTransformTag;
                            var lastFilterListTag;
                            var lastRatioTag;
                            if ((index = frameObject.lastModifiedNameAtIndex) > -1) {
                                lastNameTag = tags[index];
                            }
                            if ((index = frameObject.lastModifiedMatrixAtIndex) > -1) {
                                lastMatrixTag = tags[index];
                            }
                            if ((index = frameObject.lastModifiedColorTransformAtIndex) > -1) {
                                lastColorTransformTag = tags[index];
                            }
                            if ((index = frameObject.lastModifiedFilterListAtIndex) > -1) {
                                lastFilterListTag = tags[index];
                            }
                            if ((index = frameObject.lastModifiedRatioAtIndex) > -1) {
                                lastRatioTag = tags[index];
                            }
                            if (lastNameTag) {
                                displayObject._name = as(lastNameTag.instanceName, 'String');
                            }
                            else if (firstTag.hasName) {
                                displayObject._name = as(firstTag.instanceName, 'String');
                            }
                            var matrix;
                            if (lastMatrixTag) {
                                matrix = lastMatrixTag.matrix.matrix;
                            }
                            else if (firstTag.hasMatrix) {
                                matrix = firstTag.matrix.matrix;
                            }
                            var tr = displayObject.transform;
                            if (matrix) {
                                var m = tr._matrix;
                                var mt = tr._matrixTmp;
                                if (!mt || m.__equals(mt)) {
                                    if (is(displayObject, instance.DynamicText)) {
                                        var offset = MovieClip.sHelperMatrixOffset;
                                        offset.__copyFrom(displayObject.offset);
                                        offset.__concat(matrix);
                                        matrix = offset;
                                    }
                                    if (!m.__equals(matrix)) {
                                        m.__copyFrom(matrix);
                                        if (!displayObject._dirty) {
                                            displayObject.__setDirty(1);
                                        }
                                    }
                                    if (!mt) {
                                        mt = tr._matrixTmp = new instance.Matrix;
                                    }
                                    mt.__copyFrom(m);
                                }
                            }
                            if (lastColorTransformTag) {
                                tr._colorTransform = lastColorTransformTag.colorTransform.colorTransform;
                            }
                            else if (firstTag.hasColorTransform) {
                                tr._colorTransform = firstTag.colorTransform.colorTransform;
                            }
                            if (lastFilterListTag) {
                                displayObject.__setSWFFilters(lastFilterListTag.surfaceFilterList);
                            }
                            else if (firstTag.hasFilterList) {
                                displayObject.__setSWFFilters(firstTag.surfaceFilterList);
                            }
                            if (is(displayObject, instance.MorphShape)) {
                                if (lastRatioTag) {
                                    displayObject._newRatio = lastRatioTag.ratio / 65536.0;
                                }
                                else if (firstTag.hasRatio) {
                                    displayObject._newRatio = firstTag.ratio / 65536.0;
                                }
                                else {
                                    displayObject._newRatio = 0;
                                }
                            }
                            this[displayObject._name] = displayObject;
                        };
                        MovieClip.prototype.__renderFrame = function (index) {
                            var frame = this._data._frames[index];
                            if (frame) {
                                var frameObject = null;
                                this._newActiveObjectsSize = 0;
                                for (var i = 0; i < this._activeObjectsSize; ++i) {
                                    var activeObject = this._activeObjects[i];
                                    var activeFrameObject = activeObject.frameObject;
                                    frameObject = frame.objects[activeFrameObject.depth];
                                    var activeCharacterId = activeFrameObject.characterId;
                                    if (frameObject == null || frameObject.characterId != activeCharacterId) {
                                        var sameCharIdList = this._objectPool[activeCharacterId];
                                        if (!sameCharIdList) {
                                            sameCharIdList = this._objectPool[activeCharacterId] = [];
                                            this._objectPoolSize[activeCharacterId] = 0;
                                        }
                                        sameCharIdList[this._objectPoolSize[activeCharacterId]++] = activeObject;
                                        this.__removeChildAt(this._children.indexOf(activeObject.object));
                                        var activeName = activeObject.object._name;
                                        if (activeName != null && activeName in this) {
                                            delete this[activeName];
                                        }
                                    }
                                    else {
                                        this._newActiveObjects[this._newActiveObjectsSize++] = activeObject;
                                    }
                                }
                                for (var i = 0; i < this._newActiveObjectsSize; ++i) {
                                    this._activeObjects[i] = this._newActiveObjects[i];
                                }
                                this._activeObjectsSize = this._newActiveObjectsSize;
                                var displayObject;
                                var child;
                                var childMask = null;
                                var activeIdx;
                                var sortedObjects = frame.getObjectsSortedByDepth();
                                var currentIndex = 0;
                                for (var s = 0, sLen = sortedObjects.length; s < sLen; ++s) {
                                    var object = sortedObjects[s];
                                    child = null;
                                    displayObject = null;
                                    activeIdx = this._activeObjectsSize - 1;
                                    if (activeIdx > -1) {
                                        while (activeIdx > -1 && ((activeCharacterId = (activeFrameObject = this._activeObjects[activeIdx].frameObject).characterId) != object.characterId || (activeCharacterId == object.characterId && activeFrameObject.depth != object.depth))) {
                                            activeIdx--;
                                        }
                                    }
                                    if (activeIdx > -1) {
                                        child = this._activeObjects[activeIdx];
                                        child.frameObject = object;
                                        displayObject = child.object;
                                    }
                                    else {
                                        var characterId = object.characterId;
                                        var sameCharIdList = this._objectPool[characterId], sameCharIdListSize;
                                        if (sameCharIdList && (sameCharIdListSize = this._objectPoolSize[characterId])) {
                                            for (var i = 0; i < sameCharIdListSize; ++i) {
                                                var ch = sameCharIdList[i];
                                                if (object.placedAtIndex == ch.frameObject.placedAtIndex) {
                                                    child = ch;
                                                    for (var j = i + 1; j < sameCharIdListSize; ++j) {
                                                        sameCharIdList[j - 1] = sameCharIdList[j];
                                                    }
                                                    this._objectPoolSize[characterId]--;
                                                    break;
                                                }
                                            }
                                            if (!child) {
                                                child = sameCharIdList[--this._objectPoolSize[characterId]];
                                            }
                                            child.frameObject = object;
                                            this._activeObjects[this._activeObjectsSize++] = child;
                                            displayObject = child.object;
                                        }
                                        else {
                                            displayObject = this._data.getDisplayObject(object.characterId, this, this._childrenLength);
                                            if (displayObject != null) {
                                                child = this._activeObjects[this._activeObjectsSize++] = new instance.ChildObject(displayObject, object);
                                            }
                                        }
                                    }
                                    if (displayObject != null) {
                                        this.__placeObject(displayObject, object);
                                        if (childMask != null) {
                                            if (childMask.frameObject.clipDepth < object.depth) {
                                                childMask = null;
                                            }
                                            else if (displayObject._mask != childMask.object) {
                                                displayObject.__setMask(childMask.object);
                                            }
                                        }
                                        else if (displayObject._mask) {
                                            displayObject.__setMask(null);
                                        }
                                        if (object.clipDepth != 0) {
                                            childMask = child;
                                            displayObject.visible = false;
                                        }
                                        this.__addChildAt(displayObject, this._childrenLength);
                                    }
                                }
                            }
                        };
                        MovieClip.sHelperMatrixTag = asc.sti(MovieClip, function () { MovieClip.sHelperMatrixTag = new instance.Matrix; });
                        MovieClip.sHelperMatrixOffset = asc.sti(MovieClip, function () { MovieClip.sHelperMatrixOffset = new instance.Matrix; });
                        return MovieClip;
                    }(flash.display.MovieClip));
                    instance.MovieClip = MovieClip;
                })(instance = swf.instance || (swf.instance = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=MovieClip.js.map