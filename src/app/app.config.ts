import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthStoreService } from './core/services/auth-store.service';
import { ThemeStoreService } from './core/services/theme-store.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAppInitializer(() => {
      inject<AuthStoreService>(AuthStoreService).loadAuth();
      inject<ThemeStoreService>(ThemeStoreService).loadTheme();
    })
  ]
};
