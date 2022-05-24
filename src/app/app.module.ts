import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
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
import { Angulartics2Module } from 'angulartics2';
import { MarkdownModule } from 'ngx-markdown';
import { ConfigComponent } from '../config/config.component';
import { AppComponent } from './app.component';

const googleMapsParams = {
    apiKey: 'apiKey',
    libraries: ['places'],
    language: 'en',
    // region: 'DE'
};

@NgModule({
    declarations: [AppComponent, ConfigComponent],
    imports: [
        CommonModule,
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        BrowserAnimationsModule,
        RouterModule.forRoot([], {
            initialNavigation: 'enabled',
            relativeLinkResolution: 'legacy',
        }),
        Angulartics2Module.forRoot(),
        MarkdownModule.forRoot(),
        AgmCoreModule.forRoot(googleMapsParams),
        MatGoogleMapsAutocompleteModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatButtonToggleModule,
        MatCardModule,
        MatInputModule,
        MatExpansionModule,
        MatTabsModule,
        MatRadioModule,
    ],
    providers: [],
    schemas: [NO_ERRORS_SCHEMA],
    bootstrap: [AppComponent],
})
export class AppModule {}
