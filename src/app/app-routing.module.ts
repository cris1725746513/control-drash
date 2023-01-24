import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './component/home/home.component';



const routes: Routes = [//home
{path: "", redirectTo: "home", pathMatch: 'full'},
{path: "home", component: HomeComponent},

//inventaro
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
