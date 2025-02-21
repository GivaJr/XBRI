import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Category } from '../../../shared/enums/category.enum';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../../shared/interface/item.interface';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { CurrencyMaskModule } from "ng2-currency-mask"


@Component({
  selector: 'app-register-item',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NzButtonModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzSwitchModule,
    NzInputNumberModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzSelectModule,
    NzTypographyModule,
    NzCheckboxModule,
    CurrencyMaskModule ],
  templateUrl: './register-item.component.html',
  styleUrl: './register-item.component.css'
})
export class RegisterItemComponent implements OnInit {

  productForm: FormGroup;
  category = Object.values(Category);
  itemEditandoId: number | null = null;
  preco: string = '';

  currencyOptions = {
    prefix: '',
    thousands: '.',
    decimal: ',',
    allowNegative: false,
    precision: 2,
    align:'left'
  }

  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private itemService:ItemService) {

    this.productForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(70)]],
      categoria: ['', Validators.required],
      quantidade: [null],
      preco: [null],
      ativo: [false, [Validators.required]]
    });

    this.watchAtivoChanges()
  }

  ngOnInit() {
    const item = history.state.item

    if(item){
      this.itemEditandoId = item.id;
      this.productForm.setValue({
        nome: item.nome,
        categoria: item.categoria,
        quantidade: item.quantidade,
        preco: item.preco,
        ativo: item.ativo
      });
    }

  }


  submitForm() {
    if (this.productForm.valid) {
      const formData: Item = { id: this.itemEditandoId || 0, ...this.productForm.value };

      if (this.itemEditandoId) {
        this.itemService.atualizar(this.itemEditandoId, formData);
      } else {
        this.itemService.salvar(formData);
      }
      this.resetForm();
      this.backToMain();

    } else {
      console.log('Formulário inválido!');
    }
  }

  backToMain(){
    this.router.navigate(['']);
  }

  resetForm() {
    this.productForm.reset({
      nome: '',
      categoria: '',
      quantidade: null,
      preco: null,
      ativo: true
    });

    this.itemEditandoId = null;
  }

  watchAtivoChanges() {
    this.productForm.get('ativo')?.valueChanges.subscribe((isAtivo: boolean) => {
      const quantidadeCtrl = this.productForm.get('quantidade');
      const precoCtrl = this.productForm.get('preco');

      if (isAtivo) {
        quantidadeCtrl?.setValidators([Validators.required, Validators.min(1)]);
        precoCtrl?.setValidators([Validators.required, Validators.min(0.01)]);
      } else {
        quantidadeCtrl?.clearValidators();
        precoCtrl?.clearValidators();
      }

      quantidadeCtrl?.updateValueAndValidity();
      precoCtrl?.updateValueAndValidity();
    });
  }

}
