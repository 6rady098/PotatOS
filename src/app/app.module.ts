import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './views/header/header.component';
import { FooterComponent } from './views/footer/footer.component';
import { AngularMaterialModule } from './angular-material.module';
import { UsersComponent } from './views/users/users.component';
import { UserService } from './services/users.service';
import { AuthService } from './auth/auth.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfileComponent } from './views/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionnaireService } from './services/questionnaires.service';
import { DiaryService } from './services/diary.service';
import { ChatService } from './services/chat.service';
import { AvailableStudiesComponent } from './views/studies/available.component';
import { InprogressStudiesComponent } from './views/studies/inprogress.component';
import { CompleteStudiesComponent } from './views/studies/complete.component';
import { ChatLogViewComponent } from './views/studies/chatlogview.component';
import { CodetableService } from './services/codetable.service';
import { FindValuePipe } from './pipes/findValue.pipe';
import { LoginComponent } from './views/login/login.component';
import { ResearcherCompletedStudiesComponent } from './views/studies/researcher-completed-studies.component';
import { ParticipantComponent } from './views/participant/participant.component';
import { ResearcherloginComponent } from './views/researcherlogin/researcherlogin.component';
import { SurveyMakerComponent } from './views/surveys/survey-maker/survey-maker.component';
import { SurveyViewComponent } from './views/surveys/survey-view/survey-view.component';
import { CheckboxFormComponent } from './views/surveys/survey-maker/checkbox-form/checkbox-form.component';
import { StudyCardComponent } from './views/study-card/study-card.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RadiogroupFormComponent } from './views/surveys/survey-maker/radiogroup-form/radiogroup-form.component';
import { BooleanelementFormComponent } from './views/surveys/survey-maker/booleanelement-form/booleanelement-form.component';
import { RatingFormComponent } from './views/surveys/survey-maker/rating-form/rating-form.component';
import { SurveyService } from './services/survey.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UsersComponent,
    ProfileComponent,
    AvailableStudiesComponent,
    InprogressStudiesComponent,
    CompleteStudiesComponent,
    ChatLogViewComponent,
    ResearcherCompletedStudiesComponent,
    FindValuePipe,
    LoginComponent,
    ParticipantComponent,
    ResearcherloginComponent,
    SurveyMakerComponent,
    SurveyViewComponent,
    CheckboxFormComponent,
    StudyCardComponent,
    RadiogroupFormComponent,
    BooleanelementFormComponent,
    RatingFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    // ngx-translate and the loader module
    HttpClientModule,
    MatCheckboxModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    UserService,
    AuthService,
    QuestionnaireService,
    DiaryService,
    ChatService,
    CodetableService,
    SurveyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
