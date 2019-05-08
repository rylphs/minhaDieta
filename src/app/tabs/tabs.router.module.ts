import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {path: '', loadChildren: '../diario/diario.module#DiarioPageModule'}
        ]
      },
      {
        path: 'tab2',
        children: [{path: '', loadChildren: '../alimentos/alimentos.module#AlimentosPageModule'}]
      },
      {
        path: 'tab3',
        children: [{path: '', loadChildren: '../refeicoes/refeicoes.module#RefeicoesPageModule'}]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
