import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './views/users/users.component';
import { ProfileComponent } from './views/profile/profile.component';
import { AvailableStudiesComponent } from './views/studies/available.component';
import { InprogressStudiesComponent } from './views/studies/inprogress.component';
import { CompleteStudiesComponent } from './views/studies/complete.component';
import { ChatLogViewComponent } from './views/studies/chatlogview.component';
import { LoginComponent } from './views/login/login.component';
import { ParticipantComponent } from './views/participant/participant.component';
import { ResearcherloginComponent } from './views/researcherlogin/researcherlogin.component';
import { AuthGuard } from './auth/auth.guard';
import { ResearcherCompletedStudiesComponent } from './views/studies/researcher-completed-studies.component';
import { SurveyMakerComponent } from './views/surveys/survey-maker/survey-maker.component';
import { AgeGateComponent } from './views/age-gate/age-gate.component';
import { StudyPageComponent } from './views/study-page/study-page.component'


const routes: Routes = [
  { path: '' , component: AgeGateComponent,  },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'available-studies', component: AvailableStudiesComponent, canActivate: [AuthGuard] },
  { path: 'inprogress-studies', component: InprogressStudiesComponent, canActivate: [AuthGuard] },
  { path: 'complete-studies', component: CompleteStudiesComponent, canActivate: [AuthGuard] },
  { path: 'chatlog-view', component: ChatLogViewComponent, canActivate: [AuthGuard] },
  { path: 'researcher-completed-studies', component: ResearcherCompletedStudiesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'participant-login', component: ParticipantComponent },//constant path for participant login buttonrr
  { path: 'researcher-login', component: ResearcherloginComponent },
  { path: 'survey-maker', component: SurveyMakerComponent },
  { path: 'study-page', component: StudyPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
