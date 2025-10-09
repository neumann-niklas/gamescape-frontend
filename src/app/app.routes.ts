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
        path: 'update-email',
        loadComponent: () => import('./auth/pages/update-email/update-email.page').then(m => m.UpdateEmailPage),
        canActivate: [authGuard]
    },
    {
        path: 'update-password',
        loadComponent: () => import('./auth/pages/update-password/update-password.page').then(m => m.UpdatePasswordPage),
        canActivate: [authGuard]
    },
    {
        path: 'update-user',
        loadComponent: () => import('./auth/pages/update-user/update-user.page').then(m => m.UpdateUserPage),
        canActivate: [authGuard]
    },
    {
        path: 'user',
        loadComponent: () => import('./auth/pages/user/user.page').then(m => m.UserPage),
        canActivate: [authGuard]
    }
];
