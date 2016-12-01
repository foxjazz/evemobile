"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var interface_1 = require('../Interfaces/interface');
var ibg_service_1 = require('../home/ibg.service');
var moneypipe_1 = require('../algs/moneypipe');
var pricesPage = (function () {
    function pricesPage(nc, navParams, iservice) {
        this.nc = nc;
        this.navParams = navParams;
        this.iservice = iservice;
        this.itemService = iservice;
        this.itemType = navParams.get('item');
        this.tradeHubs = new interface_1.TradeHubs();
        this.tradeHubs.Hubs = new Array();
        var hub = new interface_1.Hub();
        hub.name = 'Jita';
        hub.regionId = 10000002;
        hub.stationId = 60003760;
        this.tradeHubs.Hubs.push(hub);
        this.yourHub = hub;
        this.jitaHub = hub;
        this.lastHub = hub;
        hub = new interface_1.Hub();
        hub.name = 'Amarr';
        hub.regionId = 10000043;
        hub.stationId = 60008494;
        this.tradeHubs.Hubs.push(hub);
        hub = new interface_1.Hub();
        hub.name = 'Dodixie';
        hub.regionId = 10000032;
        hub.stationId = 60011866;
        this.tradeHubs.Hubs.push(hub);
        hub = new interface_1.Hub();
        hub.name = 'Rens';
        hub.regionId = 10000030;
        hub.stationId = 60004588;
        this.tradeHubs.Hubs.push(hub);
        hub = new interface_1.Hub();
        hub.name = 'Hek';
        hub.regionId = 10000042;
        hub.stationId = 60005686;
        this.tradeHubs.Hubs.push(hub);
        hub = new interface_1.Hub();
        hub.name = 'Tash-Murkon';
        hub.regionId = 10000020;
        hub.stationId = 60008764;
        this.tradeHubs.Hubs.push(hub);
        hub = new interface_1.Hub();
        hub.name = 'Oursulaert';
        hub.regionId = 10000064;
        hub.stationId = 60011740;
        this.tradeHubs.Hubs.push(hub);
        hub = new interface_1.Hub();
        this.itemType.Jitaprice = 0;
        this.itemType.Rensprice = 0;
        this.getPrices();
    }
    pricesPage.prototype.getHub = function (th, n) {
        for (var _i = 0, _a = th.Hubs; _i < _a.length; _i++) {
            var o = _a[_i];
            if (o.name === n) {
                return o;
            }
        }
    };
    pricesPage.prototype.getRensPrice = function (type) {
        var _this = this;
        this.itemService.getPriceDataUri(type.id, this.getHub(this.tradeHubs, "Rens").regionId).subscribe(function (res) {
            var retval = NaN;
            for (var _i = 0, _a = res.items; _i < _a.length; _i++) {
                var ll = _a[_i];
                if (ll.location.id === _this.getHub(_this.tradeHubs, "Rens").stationId && ll.buy === false) {
                    if (isNaN(retval) || ll.price < retval)
                        retval = ll.price;
                }
            }
            type.Rensprice = retval;
        });
    };
    pricesPage.prototype.getJitaPrice = function (type) {
        var _this = this;
        this.itemService.getPriceDataUri(type.id, this.jitaHub.regionId).subscribe(function (res) {
            var retval = NaN;
            for (var _i = 0, _a = res.items; _i < _a.length; _i++) {
                var ll = _a[_i];
                if (ll.location.id === _this.jitaHub.stationId && ll.buy === false) {
                    if (isNaN(retval) || ll.price < retval)
                        retval = ll.price;
                }
            }
            type.Jitaprice = retval;
        });
    };
    pricesPage.prototype.getPrices = function () {
        this.getJitaPrice(this.itemType);
        this.getRensPrice(this.itemType);
    };
    pricesPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/prices/prices.html',
            providers: [ibg_service_1.ibgService],
            pipes: [moneypipe_1.moneyPipe, moneypipe_1.volPipe]
        })
    ], pricesPage);
    return pricesPage;
}());
exports.pricesPage = pricesPage;
//# sourceMappingURL=prices.js.map