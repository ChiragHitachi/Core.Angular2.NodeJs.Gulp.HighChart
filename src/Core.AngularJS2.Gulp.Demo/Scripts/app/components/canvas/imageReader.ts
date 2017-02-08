//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//import { NgModule, Component, Inject, forwardRef, Injector, OpaqueToken } from "@angular/core";

//import { BrowserModule } from '@angular/platform-browser';
//import { Tiff } from 'tiff';


function ImageReader() {
    this.mimetype = [
        "image/png",
        "image/jpeg"
    ];

    // Is Tiff module present
    if (typeof (Tiff) !== "undefined") 
    {
        // Remove it from list
        this.mimetype.push("image/tif");
        this.mimetype.push("image/tiff");
    }

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
                    }
                    that.images[p].src = that.tiff.toDataURL();
                    that.images[p].pageNum = p;
                    //that.currentPage = that.options.controls.numPage;
                }

            } else {
                if (that.currentPage != that.options.controls.numPage) {
                    that.tiff.setDirectory(that.options.controls.numPage - 1);
                    that.width = that.tiff.width();
                    that.height = that.tiff.height();
                    that.img = new Image();
                    that.img.onload = function () {
                        callback();
                        that.rendered = true;
                    }
                    that.img.src = that.tiff.toDataURL();
                    that.currentPage = that.options.controls.numPage;
                }
            }
        };

        this.reader.onload = function () {
            if (that.tiff != null) {
                that.tiff.close();
                that.tiff = null;
            }
            Tiff.initialize({ TOTAL_MEMORY: 16777216 * 5 });
            that.refresh();
        };
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
        }
        that.data = null;
        that.width = -1;
        that.height = -1;
        options.info = {};
        that.isZoom = true;
        that.rendered = false;
        this.reader.onload = function () {
            that.img.src = that.reader.result;
        };
        if (typeof (data) === 'string') {
            that.img.src = data;
        } else {
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
            case "image/tiff": reader = { create: this.tiffReader }; break;
            case "image/png":
            case "image/jpeg": reader = { create: this.imageReader }; break;

        };
        return reader;
    },
    IsSupported: function (mimeType) {
        return (this.mimetype.indexOf(mimeType) != -1);
    },
    GuessMimeType: function (obj) {
        // try to guess mime type if not available
        var mimeType = "";
        if (obj.type == "") {
            var fileName = obj.name;
            mimeType = "image/" + fileName.substring(fileName.indexOf('.') + 1);
        }
        return mimeType.toLowerCase();
    }
}
