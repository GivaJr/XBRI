import { Component, OnInit } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { Router } from '@angular/router';
import { Item } from '../../../shared/interface/item.interface';
import { ItemService } from '../../services/item.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
registerLocaleData(localePt)



@Component({
  selector: 'app-list-item',
  imports: [NzDividerModule,
     NzTableModule,
      NzButtonModule,
       NzTypographyModule,
       NzTagModule,
      CommonModule,
       NzIconModule,
        CurrencyPipe,
     NzBreadCrumbModule,],
  providers: [NzModalService,{provide: LOCALE_ID, useValue: 'pt-BR'}],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css'
})


export class ListItemComponent implements OnInit {

  listOfData: Item[] = [];

  constructor(private router: Router,
    private itemService:ItemService,
    private modal: NzModalService,
    private message: NzMessageService){

  }

  ngOnInit(): void {
    this.loadItens();
  }

  private loadItens() {
    this.listOfData = this.itemService.listar();
  }

  navigateForRegister(){
    this.router.navigate(['/register']);
  }

  deleteItem(id: number) {
    this.itemService.deletar(id);
    this.loadItens();
    this.message.create('success', 'Item excluido com sucesso!');
  }

  confirmDelete(id: number) {
    this.modal.confirm({
      nzTitle: 'Tem certeza que deseja excluir este item?',
      nzContent: 'Esta ação não pode ser desfeita.',
      nzOkText: 'Sim, excluir',
      nzOnOk: () => this.deleteItem(id),
      nzCancelText: 'Cancelar'
    });
  }

  editItem(item:Item){
    this.router.navigate(['/register'], { state: { item } });
  }

}
