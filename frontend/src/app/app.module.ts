import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register";
import { AlertComponent } from "./_components";
import { HTTP_INTERCEPTORS, HttpHeaders } from "@angular/common/http";
import { jwt, error, ErrorInterceptor, fakeBackendProvider } from "./_helpers";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EstatisticaComponent } from "./estatistica/estatistica.component";
import { ConfiguracaoComponent } from "./configuracao/configuracao.component";
import { EstatisticaService } from "./estatistica/estatistica.service";
import { ConfiguracaoService } from "./configuracao/configuracao.service";

import { MainComponentComponent } from "./maincomponent/maincomponent.component";
import { MenuComponent } from "./menu/menu.component";
import { HttpClientModule } from "@angular/common/http";
import { SliderModule } from "primeng/slider";
import { FullCalendarModule } from "primeng/fullcalendar";
import { ChartModule } from "primeng/chart";
import { InputMaskModule } from "primeng/inputmask";
import { InputTextModule } from "primeng/inputtext";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DropdownModule } from "primeng/dropdown";
import { NgChartjsModule } from "ng-chartjs";
import { SpinnerModule } from "primeng/spinner";
import { KeyFilterModule } from "primeng/keyfilter";

import * as ChartAnnotation from "chartjs-plugin-annotation";
import { CarouselModule } from "primeng/carousel";

const chartAnnotation = ChartAnnotation;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    MainComponentComponent,
    MenuComponent,
    EstatisticaComponent,
    ConfiguracaoComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SliderModule,
    FullCalendarModule,
    ChartModule,
    InputMaskModule,
    InputTextModule,
    BrowserAnimationsModule,
    DropdownModule,
    SpinnerModule,
    NgChartjsModule,
    KeyFilterModule,
    CarouselModule,
    NgChartjsModule.registerPlugin([chartAnnotation]),
  ],
  providers: [
    // provider used to create fake backend
    EstatisticaService,
    ConfiguracaoService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
