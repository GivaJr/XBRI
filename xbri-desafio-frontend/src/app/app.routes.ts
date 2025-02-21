import { Routes } from '@angular/router';
import { ListItemComponent } from './core/components/list-item/list-item.component';
import { RegisterItemComponent } from './core/components/register-item/register-item.component';
import { Path } from './shared/enums/path.enum';

export const routes: Routes = [{
  path: Path.home,
  component: ListItemComponent ,
},
{
  path: Path.register,
  component: RegisterItemComponent ,
},

];
