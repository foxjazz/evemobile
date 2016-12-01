import {NavController, NavParams, Nav} from 'ionic-angular';
import {Component} from '@angular/core';
import {TradeHubs, Hub} from '../Interfaces/interface';
import {ItemTypes, ItemTypesA,ItemType} from '../interfaces/ItemTypes';
import {ibgService} from '../../app/ibg.service';


@Component({
  selector: 'page-prices',
  templateUrl: 'prices.html',
  providers: [ibgService]

})

export class PricesPage{
  constructor(private nc: NavController, private navParams: NavParams, private iservice: ibgService)
  {
    this.itemService = iservice;
    this.itemType = navParams.get('item');
    this.tradeHubs = new TradeHubs();
    this.tradeHubs.Hubs = new Array<Hub>();
    let hub = new Hub();
    hub.name = 'Jita'; hub.regionId = 10000002; hub.stationId = 60003760;
    this.tradeHubs.Hubs.push(hub);
    this.yourHub = hub;
    this.jitaHub = hub;
    this.lastHub = hub;
    hub = new Hub();
    hub.name = 'Amarr'; hub.regionId = 10000043; hub.stationId = 60008494;
    this.tradeHubs.Hubs.push(hub);
    hub = new Hub();
    hub.name = 'Dodixie'; hub.regionId = 10000032; hub.stationId = 60011866;
    this.tradeHubs.Hubs.push(hub);
    hub = new Hub();
    hub.name = 'Rens'; hub.regionId = 10000030; hub.stationId = 60004588;
    this.tradeHubs.Hubs.push(hub);
    hub = new Hub();
    hub.name = 'Hek'; hub.regionId = 10000042; hub.stationId = 60005686;
    this.tradeHubs.Hubs.push(hub);
    hub = new Hub();
    hub.name = 'Tash-Murkon'; hub.regionId = 10000020; hub.stationId = 60008764;
    this.tradeHubs.Hubs.push(hub);
    hub = new Hub();
    hub.name = 'Oursulaert'; hub.regionId = 10000064; hub.stationId = 60011740;
    this.tradeHubs.Hubs.push(hub);
    hub = new Hub();
    this.itemType.Jitaprice = 0;
    this.itemType.Rensprice = 0;

    this.getPrices();
  }
  public itemType: ItemType;
  private jitaHub: Hub;
  public yourHub: Hub;
  public priceBands: Array<number>;
  public lastHub: Hub;
  public tradeHubs: TradeHubs;
  private itemid: string;
  private itemService: ibgService;
  private getHub(th: TradeHubs, n: string) :Hub
  {
    for (let o of th.Hubs)
    {
      if(o.name === n)
      {
        return o;
      }
    }
  }
  private getRensPrice(type: ItemType)
  {

    this.itemService.getPriceDataUri(type.id,this.getHub(this.tradeHubs,"Rens").regionId).subscribe(res => {
        let retval  = NaN;
        for (let ll of res.items) {
          if (ll.location.id === this.getHub(this.tradeHubs,"Rens").stationId && ll.buy === false) {
            if (isNaN(retval) || ll.price < retval)
              retval = ll.price;
          }
        }
        type.Rensprice = retval;
      }

    );
  }
  private getJitaPrice(type: ItemType)
  {

    this.itemService.getPriceDataUri(type.id,this.jitaHub.regionId).subscribe(res => {
        let retval  = NaN;
        for (let ll of res.items) {
          if (ll.location.id === this.jitaHub.stationId && ll.buy === false) {
            if (isNaN(retval) || ll.price < retval)
              retval = ll.price;
          }
        }
        type.Jitaprice = retval;
      }

    );
  }
  private getPrices(){

      this.getJitaPrice(this.itemType);
      this.getRensPrice(this.itemType);


  }
}
