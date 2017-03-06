System.register(["@angular/core"], function (exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, LoginService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            LoginService = (function () {
                function LoginService(webRequest) {
                    this.webRequest = webRequest;
                    this.loginDetail = { accessToken: "", isLoggedIn: false, userName: "", expires: new Date(), loggedinDate: new Date(), userId: 'cgupta' };
                    var vm = this;
                    vm.login = function (userName, password) {
                        return webRequest.get("http://localhost:53920/api/login", { userName: userName, password: password });
                    };
                }
                Object.defineProperty(LoginService.prototype, "LoginDetail", {
                    get: function () {
                        return this.loginDetail;
                    },
                    set: function (value) {
                        this.loginDetail = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return LoginService;
            }());
            LoginService = __decorate([
                core_1.Injectable(),
                __param(0, core_1.Inject('IWebRequest')),
                __metadata("design:paramtypes", [Object])
            ], LoginService);
            exports_1("LoginService", LoginService);
        }
    };
});

//# sourceMappingURL=loginService.js.map
