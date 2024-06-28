import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatGoogleMapsAutocompleteModule } from '@timebutt/google-maps-autocomplete';
import { MarkdownModule } from 'ngx-markdown';
import { ConfigComponent } from '../config/config.component';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent, ConfigComponent],
    bootstrap: [AppComponent],
    imports: [
        CommonModule,
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        MarkdownModule.forRoot(),
        MatGoogleMapsAutocompleteModule.forRoot('AIzaSyD7aI7elBUMplf9aOmT-wMhiojOxBj5Jxg'),
        FormsModule,
        ReactiveFormsModule,
        MatButtonToggleModule,
        MatCardModule,
        MatInputModule,
        MatExpansionModule,
        MatTabsModule,
        MatRadioModule,
    ],
    providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
