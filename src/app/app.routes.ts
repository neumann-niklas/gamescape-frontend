import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./auth/pages/login/login').then(m => m.Login)
    },
    {
        path: 'signup',
        loadComponent: () => import('./auth/pages/signup/signup').then(m => m.Signup)
    }
];
