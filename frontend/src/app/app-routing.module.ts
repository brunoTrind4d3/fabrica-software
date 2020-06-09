import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "./register";
import { AuthGuard } from "./_helpers";
import { LoginComponent } from "./login/login.component";
import { MainComponentComponent } from "./maincomponent/maincomponent.component";
import { EstatisticaComponent } from "./estatistica/estatistica.component";
import { ConfiguracaoComponent } from "./configuracao/configuracao.component";

const routes: Routes = [
  {
    path: "",
    component: MainComponentComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "estatistica",
        component: EstatisticaComponent,
      },
      { path: "configuracao", component: ConfiguracaoComponent },
    ],
  },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },

  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
