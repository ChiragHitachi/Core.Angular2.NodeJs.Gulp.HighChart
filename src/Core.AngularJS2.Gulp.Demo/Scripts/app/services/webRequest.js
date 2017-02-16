System.register(["@angular/core", "@angular/http", "rxjs/Observable"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, http_1, Observable_1, WebRequest;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }
        ],
        execute: function () {
            WebRequest = (function () {
                function WebRequest(http) {
                    var _this = this;
                    this.http = http;
                    var vm = this;
                    vm.get = function (url, data, params, header, goToErrorState) {
                        return _this.http.get(url)
                            .map(function (response) { return response.json(); })
                            .catch(_this.handleError);
                    };
                    vm.getImage = function (url, data, params, header, goToErrorState) {
                        //let headers = new Headers({ responseType: 'arraybuffer'  });
                        //var headers = new Headers();
                        // headers.append("Content-Type", 'application/json');
                        //headers.append("Authorization", 'Bearer ' + localStorage.getItem('id_token'))
                        var options = new http_1.RequestOptions({ method: http_1.RequestMethod.Get, url: url, responseType: http_1.ResponseContentType.ArrayBuffer });
                        //return this.http.get(url, options);
                        return _this.http.request(new http_1.Request(options));
                        //.map(response =>  response)
                        //.catch(this.handleError);
                    };
                    vm.post = function (url, data, params, header, goToErrorState) {
                        return _this.http.post(url, data)
                            .map(function (response) { return response.json(); })
                            .catch(_this.handleError);
                    };
                    function getRequest(method, url, data, params, header, timeout) {
                        var request = {
                            method: method,
                            url: url,
                            data: null,
                            params: null,
                            headers: null,
                        };
                        if (data)
                            request.data = data;
                        if (params)
                            request.params = params;
                        if (header)
                            request.headers = header;
                        if (timeout)
                            request.timeout = timeout;
                        return request;
                    }
                }
                WebRequest.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || "Server error");
                };
                return WebRequest;
            }());
            WebRequest = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http])
            ], WebRequest);
            exports_1("WebRequest", WebRequest);
        }
    };
});
