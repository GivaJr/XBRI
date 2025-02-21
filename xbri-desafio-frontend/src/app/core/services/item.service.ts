import { Injectable } from '@angular/core';
import { Item } from '../../shared/interface/item.interface';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private localStorageKey = 'itens';

  // servico fake para salvar no localstorage
  constructor() { }

 listar(): Item[] {
  const data = localStorage.getItem(this.localStorageKey);
  return data ? JSON.parse(data) : [];
}

salvar(item: Item): void {
  const itens = this.listar();
  item.id = new Date().getTime();
  itens.push(item);
  this.saveToLocalStorage(itens);
}

atualizar(id: number, itemAtualizado: Partial<Item>): void {
  let itens = this.listar();
  itens = itens.map(item => (item.id === id ? { ...item, ...itemAtualizado } : item));
  this.saveToLocalStorage(itens);
}

deletar(id: number): void {
  let itens = this.listar();
  itens = itens.filter(item => item.id !== id);
  this.saveToLocalStorage(itens);
}

private saveToLocalStorage(itens: Item[]): void {
  localStorage.setItem(this.localStorageKey, JSON.stringify(itens));
}

}
