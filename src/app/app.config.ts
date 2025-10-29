import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { AuthStoreService } from './core/services/auth-store.service';
import { ThemeStoreService } from './core/services/theme-store.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAppInitializer(() => {
      const authStoreService: AuthStoreService = inject<AuthStoreService>(AuthStoreService);
      const themeStoreService: ThemeStoreService = inject<ThemeStoreService>(ThemeStoreService);

      themeStoreService.loadTheme();
      return authStoreService.loadAuth();
    })
  ]
};
