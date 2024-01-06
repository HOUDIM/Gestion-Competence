import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { EmployeesComponent } from './employees/employees.component';
import { HrsComponent } from './hrs/hrs.component';
import { SkillsComponent } from './skills/skills.component';
import { FormationsComponent } from './formations/formations.component';
import { EvaluationsComponent } from './evaluations/evaluations.component';
import { ModelsComponent } from './models/models.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { NotFoundScreenComponent } from './not-found-screen/not-found-screen.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: '',
    },
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'employees',
        component: EmployeesComponent,
      },
      {
        path: 'rh',
        component: HrsComponent,
      },
      {
        path: 'skills',
        component: SkillsComponent,
      },
      {
        path: 'formations',
        component: FormationsComponent,
      },
      {
        path: 'evaluations',
        component: EvaluationsComponent,
      },

      {
        path: 'models',
        component: ModelsComponent,
      },
    ],
  },
  {
    path: '404',
    component: NotFoundScreenComponent,
    data: {
      title: 'Page 404',
    },
  },
  {
    path: 'login',
    component: AuthLoginComponent,
    data: {
      title: 'Login Page',
    },
  },
  {
    path: 'register',
    component: AuthRegisterComponent,
    data: {
      title: 'Register Page',
    },
  },
  { path: '**', component: NotFoundScreenComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      // relativeLinkResolution: 'legacy'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
