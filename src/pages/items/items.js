"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ibg_service_1 = require('../home/ibg.service');
var prices_1 = require('../prices/prices');
var ItemsPage = (function () {
    function ItemsPage(nc, navParams, itm) {
        this.nc = nc;
        this.navParams = navParams;
        this.itm = itm;
        this.groupHref = navParams.get('group');
        this.navC = nc;
        this.itemService = itm;
        this.getItems();
        this.fil = "";
    }
    ItemsPage.prototype.getItems = function () {
        var _this = this;
        this.itemService.getUnderData(this.groupHref).subscribe(function (res3) {
            _this.itmtypes = [];
            _this.itmFil = [];
            _this.itmtypes = res3.items;
            for (var _i = 0, _a = res3.items; _i < _a.length; _i++) {
                var o = _a[_i];
                _this.itmFil.push(o);
            }
        });
    };
    ItemsPage.prototype.onSelItem = function (itm) {
        this.navC.push(prices_1.pricesPage, { item: itm });
    };
    ItemsPage.prototype.updateFilter = function (v) {
        this.fil = v;
        this.filter(this.fil);
    };
    ItemsPage.prototype.filter = function (fil) {
        this.itmFil = [];
        for (var _i = 0, _a = this.itmtypes; _i < _a.length; _i++) {
            var itm = _a[_i];
            var itmlower = itm.type.name.toLocaleLowerCase();
            if (fil.length === 1 && itm.type.name.length > 0 && itmlower[0] === fil[0]) {
                this.itmFil.push(itm);
            }
            if (fil.length > 1 && itm.type.name.length > 1 && itmlower[0] === fil[0] && itmlower[1] === fil[1]) {
                this.itmFil.push(itm);
            }
        }
    };
    ItemsPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/items/items.html',
            providers: [ibg_service_1.ibgService]
        })
    ], ItemsPage);
    return ItemsPage;
}());
exports.ItemsPage = ItemsPage;
//# sourceMappingURL=items.js.map