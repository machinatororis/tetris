var flash;
(function (flash) {
    var media;
    (function (media) {
        var ID3Info = (function () {
            function ID3Info() {
                this.songName = null;
                this.artist = null;
                this.album = null;
                this.year = null;
                this.comment = null;
                this.genre = null;
                this.track = null;
            }
            return ID3Info;
        }());
        media.ID3Info = ID3Info;
    })(media = flash.media || (flash.media = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ID3Info.js.map