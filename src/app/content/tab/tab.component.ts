import { Component, ViewChild, OnInit } from '@angular/core';
import { NgbTabset, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { LangService } from '../../menu/lang/lang.service';
import { MenuService } from '../../menu/menu.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
  @ViewChild('ngbTabset') ngbTabset: NgbTabset;

  constructor(private menuService: MenuService,
              private langService: LangService) {
    window.onclick = event => {
      var modal = document.getElementById('myModal');
      if (event.target == modal) {
          modal.style.display = "none";
      }
    }
  }

  ngOnInit() {
    this.menuService.tabComponent = this;
  }

  private oldWidth;
  ngDoCheck() {
    let ul:any = document.querySelector('ngb-tabset > ul');
    let lis = document.querySelectorAll('ngb-tabset > ul > li > a');
    if(!lis || lis.length == 0) return;
    let ulWidth = ul.offsetWidth;
    let liWidth = Array.prototype.reduce
      .call(lis, (w, e) => w + e.offsetWidth, 0);
    Array.prototype.forEach.call(lis, e => {
      let mItem = this.menuService.menuOrder
        .filter(it => it.name === e.id);
      if(mItem.length > 0) mItem[0].width = e.offsetWidth;
    });

    let bbWidth: any = document
        .querySelector('ngb-tabset > ul > li > a[id="barsButton"]');
    if(bbWidth)
      liWidth += bbWidth.offsetHeight - bbWidth.offsetWidth;

    if(ulWidth < liWidth) {
      let ind = 1;
      while(!this.menuService.menuOrder[ind].isVisible) ind++;
      this.menuService.menuOrder[ind].isVisible = false;
    }

    if(this.oldWidth == ulWidth - liWidth) return;
    this.oldWidth = ulWidth - liWidth;
    if(this.oldWidth > 0) {
      let ind = this.menuService.menuOrder.length - 1;
      while(ind > 0 && this.menuService.menuOrder[ind].isVisible)
        ind--;
      if(ind == this.menuService.menuOrder.length) return;
      if(this.menuService.menuOrder[ind].width < this.oldWidth)
        this.menuService.menuOrder[ind].isVisible = true;
    }
    let hideTabs = this.menuService.menuOrder
        .filter(e => e.name !== 'barsButton' && !e.isVisible);
    this.menuService.menuOrder
        .filter(it => it.name === 'barsButton')
        [0].isVisible = hideTabs.length > 0;
  }

  onTabClose(menuItem:any, e:MouseEvent) {
    this.menuService.removeItemFromMenuOrder(menuItem);
    e.preventDefault();
  }

  public beforeChange($event: NgbTabChangeEvent) {
    if ($event.nextId === 'barsButton') {
      let btn = document.getElementById('myModal');
      let ul = btn.children[0].children[0];
      while (ul.firstChild) ul.removeChild(ul.firstChild);

      this.menuService.menuOrder
      .filter(e => !e.isVisible)
      .forEach(e => {
        let li = document.createElement("LI");
        li.innerHTML = this.langService.values[e.name];
        li.id = e.name;
        li.onmouseup = (args) => {
          let id = (args.target as any).id;
          let item = this.menuService.menuOrder
            .filter(it => it.name === id)[0];
          this.menuService.removeItemFromMenuOrder(item);
          btn.style.display = "none";
          this.menuService.barsButton(item);
        };
        li.onmouseover = () => li.style.cursor = 'pointer';
        ul.appendChild(li);
      });
      btn.style.display = "block";
      $event.preventDefault();
      return;
    }

    let item = this.menuService.menuOrder
      .filter(e => e.name === $event.nextId)[0];
    this.menuService.removeItemFromMenuOrder(item);
    this.menuService.menuOrder.push(item);
  };
}
