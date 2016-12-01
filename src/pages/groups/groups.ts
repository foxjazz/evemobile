import {NavController,NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import {ibgService} from '../../app/ibg.service';
import { ItemGroup } from '../interfaces/interface';
import {ItemTypes, ItemTypesA,ItemType} from '../interfaces/ItemTypes';
//import {PricesPage} from '../prices/prices';
import { ItemsPage } from '../items/items';

@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
  providers: [ibgService]
})

export class GroupsPage{
  constructor(private nc: NavController, private itm: ibgService)
  {
    console.log('items 1');

    this.navC = nc;
    this.itgs = itm;

    this.fil = "";
    this.getGroups();
  }

  private itgs: ibgService;
  private groupHref;
  private navC: NavController;
  private itmtypes: ItemType[];
  public itmFil: ItemType[];
  private fil: string;
  private itemGroups: Array<ItemGroup>;
  private itemTopGroups : Array<ItemGroup>;
  private subgrps : Array<ItemGroup>;


  private getGroups()
  {
    this.itgs.getGroupHref().subscribe(res => {
      this.itemGroups = res.items;
      this.itemTopGroups = new Array<ItemGroup>();
      this.subgrps = new Array<ItemGroup>();
      for (let grp of this.itemGroups) {
        if (grp.parentGroup === undefined)
          this.itemTopGroups.push(grp);
        else
          this.subgrps.push(grp);
      }

    });
  }
  onSelItem(itg: ItemGroup)
  {
    let nop = 0;
    this.navC.push(ItemsPage,{grp: itg});
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
