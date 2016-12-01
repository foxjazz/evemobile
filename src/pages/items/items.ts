import {NavController,NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import {ibgService} from '../../app/ibg.service';
import { ItemGroup } from '../interfaces/interface';
import {ItemTypes, ItemTypesA,ItemType} from '../interfaces/ItemTypes';
import {PricesPage} from '../prices/prices';

@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
  providers: [ibgService]
})

export class ItemsPage{
  constructor(private nc: NavController,private navParams: NavParams, private itm: ibgService)
  {
    console.log('items 1');
    this.grp = navParams.get('grp');
    this.groupHref = 'https://crest-tq.eveonline.com/market/types/?group=' + this.grp.href;

    console.log(this.groupHref);
    this.navC = nc;
    this.itemService = itm;
    this.fil = "";
    //this.hrefTop = 'https://crest-tq.eveonline.com/market/types/?group=https://crest-tq.eveonline.com/market/groups/4/';

    this.getItems();
  }
  private hrefTop: string;
  private grp: ItemGroup;
  private itemService: ibgService;
  private groupHref;
  private navC: NavController;
  private itmtypes: ItemType[];
  public itmFil: ItemType[];
  private fil: string;

  private getItems()
  {
    console.log('items 2');
    console.log(this.groupHref);
    this.itemService.getUnderData(this.groupHref).subscribe(res3 => {
      this.itmtypes =[];
      this.itmFil = [];
      this.itmtypes = res3.items;
      console.log('items 3');
      for(let o of res3.items)
      {
        this.itmFil.push(o);
      }
    } );

  }

  onSelItem(itm: ItemType)
  {
    //let nop = 0;
    this.navC.push(PricesPage,{item: itm});
  }

  updateFilter(v: any)
  {

    this.fil = v;
    this.filter(this.fil);

  }
  private filter(fil: string)
  {

    this.itmFil = [];
    for(let itm of this.itmtypes)
    {
      let itmlower = itm.type.name.toLocaleLowerCase();
      if(fil.length === 1 && itm.type.name.length > 0 && itmlower[0] === fil[0] )
      {
        this.itmFil.push(itm);
      }
      if(fil.length > 1 && itm.type.name.length > 1 && itmlower[0] === fil[0] && itmlower[1] === fil[1] )
      {
        this.itmFil.push(itm);
      }
    }

  }
}
