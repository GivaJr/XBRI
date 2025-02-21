import { Category } from "../enums/category.enum";

export interface Item {
  id: number;
  nome: string;
  categoria : Category;
  quantidade: number;
  preco: string;
  ativo: boolean;
 }
