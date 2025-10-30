import { Routes } from '@angular/router';
import { authenticationGuard } from './core/guards/authentication-guard';

export const routes: Routes = [
    {
        path: 'categories',
        loadComponent: () => import('./features/categories/pages/categories/categories.page').then(m => m.CategoriesPage)
    },
    {
        path: 'games',
        loadComponent: () => import('./features/games/pages/games/games.page').then(m => m.GamesPage)
    },
    {
        path: 'user',
        loadComponent: () => import('./features/auth/pages/user/user.page').then(m => m.UserPage),
        canActivate: [authenticationGuard]
    }
];
