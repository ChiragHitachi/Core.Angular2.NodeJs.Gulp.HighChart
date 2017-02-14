function ImageReader() {
    this.mimetype = [
        "image/png",
        "image/jpeg"
    ];
    // Is Tiff module present
    if (typeof (Tiff) !== "undefined") {
        // Remove it from list
        this.mimetype.push("image/tif");
        this.mimetype.push("image/tiff");
    }
}
function response(e) {
}
ImageReader.prototype = {
    tiffReader: function (data, options, callback) {
        if (options.controls.toolbar) {
            options.controls.image = true;
            options.controls.sound = false;
        }
        this.reader = new FileReader();
        var that = this;
        that.rendered = false;
        that.tiff = null;
        that.img = null;
        that.data = null;
        that.width = -1;
        that.height = -1;
        that.options = options;
        that.images = [];
        that.currentPage = -1;
        that.isZoom = true;
        this.refresh = function () {
            if (that.reader.result == undefined)
                return;
            if (that.tiff == null) {
                that.tiff = new Tiff({ buffer: that.reader.result });
                that.options.controls.totalPage = that.tiff.countDirectory();
                that.options.controls.numPage = 1;
                that.options.info = {
                    width: that.tiff.width(),
                    height: that.tiff.height(),
                    compression: that.tiff.getField(Tiff.Tag.COMPRESSION),
                    document: that.tiff.getField(Tiff.Tag.DOCUMENTNAME),
                    description: that.tiff.getField(Tiff.Tag.IMAGEDESCRIPTION),
                    orientation: that.tiff.getField(Tiff.Tag.ORIENTATION),
                    xresolution: that.tiff.getField(Tiff.Tag.XRESOLUTION),
                    yresolution: that.tiff.getField(Tiff.Tag.YRESOLUTION)
                };
            }
            // Limit page number if upper
            if (that.options.controls.numPage > that.options.controls.totalPage) {
                that.options.controls.numPage = that.options.controls.totalPage;
            }
            // Set to correct page
            if (that.options.controls.filmStrip) {
                that.images = [];
                for (var p = 0; p < that.tiff.countDirectory(); p++) {
                    that.tiff.setDirectory(p);
                    // Set only first page @TODO
                    if (p == 0) {
                        that.width = that.tiff.width();
                        that.height = that.tiff.height();
                    }
                    that.images[p] = new Image();
                    that.images[p].onload = function () {
                        if (that.images.length == 1) {
                            that.img = that.images[0];
                        }
                        callback();
                        that.rendered = true;
                    };
                    that.images[p].src = that.tiff.toDataURL();
                    that.images[p].pageNum = p;
                }
            }
            else {
                if (that.currentPage != that.options.controls.numPage) {
                    that.tiff.setDirectory(that.options.controls.numPage - 1);
                    that.width = that.tiff.width();
                    that.height = that.tiff.height();
                    that.img = new Image();
                    that.img.onload = function () {
                        callback();
                        that.rendered = true;
                    };
                    that.img.src = that.tiff.toDataURL();
                    options.ctx.drawImage(that.img, 0, 0);
                    that.currentPage = that.options.controls.numPage;
                }
            }
        };
        this.reader.onload = function () {
            if (that.tiff != null) {
                that.tiff.close();
                that.tiff = null;
            }
            Tiff.initialize({ TOTAL_MEMORY: 16777216 * 5 }); //100000000
            that.refresh();
        };
        if (typeof (data) == 'string') {
            that.img = new Image();
            if (data.indexOf('Tiff') >= 0) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", data);
                xhr.responseType = "arraybuffer";
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == XMLHttpRequest.DONE) {
                        //alert(xhr.response);
                        var tiff = new Tiff({ buffer: xhr.response });
                        that.tiff = tiff;
                        that.width = that.tiff.width();
                        that.height = that.tiff.height();
                        that.img = new Image();
                        that.img.onload = function () {
                            callback();
                            that.rendered = true;
                        };
                        that.img.src = that.tiff.toDataURL();
                        //var base64 = base64ArrayBuffer(xhr.response);
                        //console.info(base64);
                        //var imageUrl = URL.createObjectURL(xhr.response);
                        //that.img.src = base64;
                        options.ctx.drawImage(that.img, 0, 0);
                    }
                };
                xhr.send();
            }
            else
                that.img.src = data;
        }
        else
            this.reader.readAsArrayBuffer(data);
        return this;
    },
    imageReader: function (data, options, callback) {
        if (options.controls.toolbar) {
            options.controls.image = true;
            options.controls.sound = false;
        }
        this.reader = new FileReader();
        var that = this;
        that.img = new Image();
        that.img.onload = function () {
            that.width = that.img.width;
            that.height = that.img.height;
            callback();
            that.rendered = true;
        };
        that.data = null;
        that.width = -1;
        that.height = -1;
        options.info = {};
        that.isZoom = true;
        that.rendered = false;
        this.reader.onload = function () {
            that.img.src = that.reader.result;
            options.ctx.drawImage(that.img, 0, 0);
        };
        if (typeof (data) === 'string') {
            that.img.src = data;
        }
        else {
            this.reader.readAsDataURL(data);
        }
        // PNG or JPEG are one page only
        options.controls.totalPage = 1;
        options.controls.numPage = 1;
        this.refresh = function () {
            // do nothing	
        };
        return this;
    },
    CreateReader: function (mimeType, obj) {
        var reader = null;
        if (mimeType == "") {
            mimeType = this.GuessMimeType(obj);
        }
        switch (mimeType.toLowerCase()) {
            case "image/tif":
            case "image/tiff":
                reader = { create: this.tiffReader };
                break;
            case "image/png":
            case "image/jpeg":
                reader = { create: this.imageReader };
                break;
        }
        ;
        return reader;
    },
    IsSupported: function (mimeType) {
        return (this.mimetype.indexOf(mimeType) != -1);
    },
    GuessMimeType: function (fileName) {
        // try to guess mime type if not available
        var mimeType = "";
        mimeType = "image/" + fileName.substring(fileName.indexOf('.') + 1);
        return mimeType.toLowerCase();
    },
};
var base64ArrayBuffer = function (arrayBuffer) {
    var base64 = '';
    var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var bytes = new Uint8Array(arrayBuffer);
    var byteLength = bytes.byteLength;
    var byteRemainder = byteLength % 3;
    var mainLength = byteLength - byteRemainder;
    var a, b, c, d;
    var chunk;
    // Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
        // Combine the three bytes into a single integer
        chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        // Use bitmasks to extract 6-bit segments from the triplet
        a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
        b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
        c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
        d = chunk & 63; // 63       = 2^6 - 1
        // Convert the raw binary segments to the appropriate ASCII encoding
        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
    }
    // Deal with the remaining bytes and padding
    if (byteRemainder == 1) {
        chunk = bytes[mainLength];
        a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2
        // Set the 4 least significant bits to zero
        b = (chunk & 3) << 4; // 3   = 2^2 - 1
        base64 += encodings[a] + encodings[b] + '==';
    }
    else if (byteRemainder == 2) {
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
        a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
        b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4
        // Set the 2 least significant bits to zero
        c = (chunk & 15) << 2; // 15    = 2^4 - 1
        base64 += encodings[a] + encodings[b] + encodings[c] + '=';
    }
    return base64;
};

//# sourceMappingURL=imageReader.js.map
