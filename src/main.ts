import { HttpClient, provideHttpClient } from '@angular/common/http';
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { GOOGLE_MAPS_AUTOCOMPLETE_API_KEY } from '@timebutt/google-maps-autocomplete/src/lib/constants';
import { provideMarkdown } from 'ngx-markdown';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        provideAnimations(),
        provideHttpClient(),
        provideMarkdown({ loader: HttpClient }),
        { provide: GOOGLE_MAPS_AUTOCOMPLETE_API_KEY, useValue: 'AIzaSyD7aI7elBUMplf9aOmT-wMhiojOxBj5Jxg' },
    ],
}).catch((err) => console.error(err));
