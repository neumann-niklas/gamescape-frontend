import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./auth/pages/login/login.page').then(m => m.LoginPage)
    },
    {
        path: 'signup',
        loadComponent: () => import('./auth/pages/signup/signup.page').then(m => m.SignupPage)
    }
];
