import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth-guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./auth/pages/login/login.page').then(m => m.LoginPage)
    },
    {
        path: 'signup',
        loadComponent: () => import('./auth/pages/signup/signup.page').then(m => m.SignupPage)
    },
    {
        path: 'user',
        loadComponent: () => import('./auth/pages/user/user.page').then(m => m.UserPage),
        canActivate: [authGuard]
    }
];
