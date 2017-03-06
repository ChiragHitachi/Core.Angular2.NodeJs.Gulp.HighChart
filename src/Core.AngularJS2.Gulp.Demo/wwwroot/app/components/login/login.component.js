System.register(["@angular/core", "@angular/router"], function (exports_1, context_1) {
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
    var core_1, router_1, LoginComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }
        ],
        execute: function () {
            LoginComponent = (function () {
                function LoginComponent(loginService, router) {
                    var _this = this;
                    this.loginService = loginService;
                    this.router = router;
                    var vm = this;
                    this.loginService.LoginDetail.isLoggedIn = false;
                    vm.login = function () {
                        _this.loginService.login(_this.userName, _this.password).subscribe(function (result) {
                            _this.loginDetail = result;
                            _this.loginDetail.isLoggedIn = true;
                            _this.loginService.LoginDetail = _this.loginDetail;
                            _this.router.navigateByUrl('/landing');
                        });
                    };
                }
                return LoginComponent;
            }());
            LoginComponent = __decorate([
                core_1.Component({
                    selector: "login",
                    templateUrl: "/view/components/login/login.component.html"
                }),
                __param(0, core_1.Inject('ILoginService')),
                __metadata("design:paramtypes", [Object, router_1.Router])
            ], LoginComponent);
            exports_1("LoginComponent", LoginComponent);
        }
    };
});

//# sourceMappingURL=login.component.js.map
