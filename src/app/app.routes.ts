import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'games'
    },
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
    },
    {
        path: 'add-game',
        loadComponent: () => import('./games/pages/add-game/add-game.page').then(m => m.AddGamePage),
        canActivate: [authGuard]
    },
    {
        path: 'games/:id/update-game',
        loadComponent: () => import('./games/pages/update-game/update-game.page').then(m => m.UpdateGamePage),
        canActivate: [authGuard]
    },
    {
        path: 'games/:id',
        loadComponent: () => import('./games/pages/game/game.page').then(m => m.GamePage)
    },
    {
        path: 'games',
        loadComponent: () => import('./games/pages/games/games.page').then(m => m.GamesPage)
    }
];
