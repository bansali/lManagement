import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angular5-social-login';
import {MatInputModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { AppComponent } from './app.component';
import { AddBooksComponent } from './admin/add-books/add-books.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppstoreService } from './shared/services/appstore.service';
import { HttpClientModule } from '@angular/common/http';
import { DisplayAllBooksComponent } from './book/display-all-books/display-all-books.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import { appRoutes } from './app.routes';
import { HomeComponent } from './home-view/home/home.component';
import { HeaderComponent } from './home-view/header/header.component';
import { FooterComponent } from './home-view/footer/footer.component';
import { LoginComponent } from './home-view/login/login.component';
import { RegisterComponent } from './home-view/register/register.component';
import { BookDetailsModalComponent } from './book/book-details-modal/book-details-modal.component';
import { DisplayBookComponent } from './book/display-book/display-book.component';
import { FacebookModule } from 'ngx-facebook';
import { UserProfileComponent } from './home-view/user/user-profile/user-profile.component';
import { UserBooksComponent } from './home-view/user/user-books/user-books.component';
import { SuggestedBooksComponent } from './home-view/user/suggested-books/suggested-books.component';
import { AdminIssuedBooksComponent } from './admin/admin-issued-books/admin-issued-books.component';
// import { BookuploadComponent } from './admin/bookupload/bookupload.component';
// import { FileUpload } from 'ng2-fileupload';

// import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
// Configs
import {Config } from '../../config/config'
export function getAuthServiceConfigs() {
  const appConfig = new Config()
  const config = new AuthServiceConfig(
        [{
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider(appConfig.facebookProviderId)
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(appConfig.googleProviderId)
        }]

  );
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    AddBooksComponent,
    DisplayAllBooksComponent,
    AdminHomeComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    BookDetailsModalComponent,
    DisplayBookComponent,
    UserProfileComponent,
    UserBooksComponent,
    SuggestedBooksComponent,
    AdminIssuedBooksComponent
    // BookuploadComponent
    // FileUpload
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule,
    MatTabsModule,
    MatMenuModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    // MatButtonModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
    ReactiveFormsModule,
    FacebookModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AppstoreService, {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }
],
  bootstrap: [AppComponent],
  entryComponents:[BookDetailsModalComponent]
})
export class AppModule { }
