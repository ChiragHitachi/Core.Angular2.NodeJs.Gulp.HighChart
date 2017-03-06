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
declare var anno: any;

ImageReader.prototype = {

    tiffReader: function (data, options, callback, overImage) {
        if (options.controls.toolbar) {
            options.controls.image = true;
            options.controls.sound = false;
        }
        this.reader = new FileReader();
        var vm = this;
        vm.rendered = false;
        vm.tiff = null;
        vm.img = null;
        vm.data = null;
        vm.width = -1;
        vm.height = -1;
        vm.options = options;
        vm.images = [];
        vm.currentPage = -1;
        vm.isZoom = true;

        if (options.controls.enableOverlay)
            vm.images.push(overImage);

        this.refresh = function () {
            
            if (vm.reader.result == undefined)
                return;
            if (vm.tiff == null) {
                vm.tiff = new Tiff({ buffer: vm.reader.result });
                vm.options.controls.totalPage = vm.tiff.countDirectory();
                vm.options.controls.numPage = 1;
                vm.options.info = {
                    width: vm.tiff.width(),
                    height: vm.tiff.height(),
                    compression: vm.tiff.getField(Tiff.Tag.COMPRESSION),
                    document: vm.tiff.getField(Tiff.Tag.DOCUMENTNAME),
                    description: vm.tiff.getField(Tiff.Tag.IMAGEDESCRIPTION),
                    orientation: vm.tiff.getField(Tiff.Tag.ORIENTATION),
                    xresolution: vm.tiff.getField(Tiff.Tag.XRESOLUTION),
                    yresolution: vm.tiff.getField(Tiff.Tag.YRESOLUTION)
                };
            }

            // Limit page number if upper
            if (vm.options.controls.numPage > vm.options.controls.totalPage) {
                vm.options.controls.numPage = vm.options.controls.totalPage;
            }
            // Set to correct page
            if (vm.options.controls.filmStrip) {
                vm.images = [];
                for (var p = 0; p < vm.tiff.countDirectory(); p++) {
                    vm.tiff.setDirectory(p);
                    // Set only first page @TODO
                    if (p == 0) {
                        vm.width = vm.tiff.width();
                        vm.height = vm.tiff.height();
                    }
                    vm.images[p] = new Image();
                    vm.images[p].onload = function () {
                        if (vm.images.length == 1) {
                            vm.img = vm.images[0];
                        }
                        callback();
                        vm.rendered = true;
                    }
                    vm.images[p].src = vm.tiff.toDataURL();
                    vm.images[p].pageNum = p;
                    //that.currentPage = that.options.controls.numPage;
                }

            } else {
                if (vm.currentPage != vm.options.controls.numPage) {
                    vm.tiff.setDirectory(vm.options.controls.numPage - 1);
                    vm.width = vm.tiff.width();
                    vm.height = vm.tiff.height();
                    vm.img = new Image();
                    vm.img.onload = function () {
                        callback();
                        vm.rendered = true;
                    }
                    vm.img.src = vm.tiff.toDataURL();
                    options.ctx.drawImage(vm.img, 0, 0);
                    //options.ctx.drawImage(vm.img, 111, 111);

                    vm.currentPage = vm.options.controls.numPage;
                }
            }
        };

        this.reader.onload = function () {
            if (vm.tiff != null) {
                vm.tiff.close();
                vm.tiff = null;
            }
            Tiff.initialize({ TOTAL_MEMORY: 16777216 * 5 });//100000000
            vm.refresh();
        };

        if (typeof (data) == 'string') {
            vm.img = new Image();
            if (data.indexOf('Tiff') >= 0) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", data);
                xhr.responseType = "arraybuffer";
              
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == XMLHttpRequest.DONE) {
                        var tiff = new Tiff({ buffer: xhr.response });
                        vm.tiff = tiff;
                        vm.width = vm.tiff.width();
                        vm.height = vm.tiff.height();
                        vm.img = new Image();
                        vm.img.onload = function () {
                            callback();
                            vm.rendered = true;
                        }
                        vm.img.src = vm.tiff.toDataURL();
                        //anno.makeAnnotatable(vm.img);

                        //var base64 = base64ArrayBuffer(xhr.response);
                        //that.img.src = base64;
                        if (options.controls.enableOverlay) {
                            let img2 = new Image();
                            img2.src = overImage;

                            options.ctx.drawImage(img2, 0,100,111,111,110,1111,111,111);
                        }
                        else
                            options.ctx.drawImage(vm.img, 0, 0);

                    }
                }
                xhr.send();
            }
            else
                vm.img.src = data;
        }
        else
            this.reader.readAsArrayBuffer(data);
        return this;
    },

    imageReader: function (data, options, callback, overImage) {
        if (options.controls.toolbar) {
            options.controls.image = true;
            options.controls.sound = false;
        }
        this.reader = new FileReader();
        var vm = this;
        vm.img = new Image();
        vm.img.onload = function () {
            vm.width = vm.img.width;
            vm.height = vm.img.height;
            callback();
            vm.rendered = true;
        }
        vm.data = null;
        vm.width = -1;
        vm.height = -1;
        options.info = {};
        vm.isZoom = true;
        vm.rendered = false;
        this.reader.onload = function () {
            vm.img.src = vm.reader.result;
            options.ctx.drawImage(vm.img, 0, 0);
        };
        if (typeof (data) === 'string') {
            vm.img.src = data;
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
            case "image/jpg":
            case "image/jpeg": reader = { create: this.imageReader }; break;
        };
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

   
}
