import { NgModule } from '@angular/core';
import {
  HashLocationStrategy,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgScrollbarModule } from 'ngx-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
} from '@coreui/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { RequestInterceptorInterceptor } from './interceptors/request-interceptor.interceptor';
import { ModelsComponent } from './models/models.component';
import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';
import { HrsComponent } from './hrs/hrs.component';
import { FormationsComponent } from './formations/formations.component';
import { SkillsComponent } from './skills/skills.component';
import { EvaluationsComponent } from './evaluations/evaluations.component';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { NotFoundScreenComponent } from './not-found-screen/not-found-screen.component';
import { UpdateEmployeeComponent } from './employees/update-employee/update-employee.component';
import { UpdateHrComponent } from './hrs/update-hr/update-hr.component';
import { AddSkillComponent } from './skills/add-skill/add-skill.component';
import { UpdateSkillComponent } from './skills/update-skill/update-skill.component';
import { AddEvaluationComponent } from './evaluations/add-evaluation/add-evaluation.component';
import { ModifierEvaluationComponent } from './evaluations/modifier-evaluation/modifier-evaluation.component';
import { EvaluationComponent } from './services/evaluation/evaluation.component';
import { UpdateFormationComponent } from './formations/update-formation/update-formation.component';
import { CreateFormationComponent } from './formations/create-formation/create-formation.component';

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ModelsComponent,
    HomeComponent,
    EmployeesComponent,
    HrsComponent,
    FormationsComponent,
    SkillsComponent,
    EvaluationsComponent,
    AuthRegisterComponent,
    AuthLoginComponent,
    NotFoundScreenComponent,
    UpdateEmployeeComponent,
    UpdateHrComponent,
    AddSkillComponent,
    UpdateSkillComponent,
    AddEvaluationComponent,
    ModifierEvaluationComponent,
    EvaluationComponent,
    UpdateFormationComponent,
    CreateFormationComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    NgScrollbarModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgbModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorInterceptor,
      multi: true,
    },
    IconSetService,
    Title,
  ],
  bootstrap: [AppComponent],
  exports: [HttpClientModule, FormsModule, ReactiveFormsModule],
})
export class AppModule {}
