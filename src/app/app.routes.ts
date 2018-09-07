import { Routes } from '@angular/router/router';

import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AddBooksComponent } from './admin/add-books/add-books.component';
import { HomeComponent } from './home-view/home/home.component';
import { LoginComponent } from './home-view/login/login.component';
import { DisplayAllBooksComponent } from './book/display-all-books/display-all-books.component';
import { RegisterComponent } from './home-view/register/register.component';
import { DisplayBookComponent } from './book/display-book/display-book.component';
import { UserProfileComponent } from './home-view/user/user-profile/user-profile.component';
import { UserBooksComponent } from './home-view/user/user-books/user-books.component';
import { SuggestedBooksComponent } from './home-view/user/suggested-books/suggested-books.component';
import { AdminIssuedBooksComponent } from './admin/admin-issued-books/admin-issued-books.component';


export const appRoutes: Routes = [
    {
        path:'',
        component:HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'admin-login',
        component: LoginComponent       
    },
    {
        path: 'admin-home',
        component: AdminHomeComponent
    },
    {
        path: 'get-books',
        component: DisplayAllBooksComponent
    },
    {
        path: 'add-books',
        component: AddBooksComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component:LoginComponent
    },
    {
        path:'book-detail',
        component:DisplayBookComponent
    },
    {
        path:'profile',
        component:UserProfileComponent
    },
    {
        path:'my-books',
        component:UserBooksComponent
    },
    {
        path:'suggestions',
        component:SuggestedBooksComponent
    },
    {
        path:'admin-issued-books',
        component:AdminIssuedBooksComponent
    }
];
