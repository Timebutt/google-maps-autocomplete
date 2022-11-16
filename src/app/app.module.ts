import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
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
import { MatGoogleMapsAutocompleteModule } from '@timebutt/google-maps-autocomplete';
import { Angulartics2Module } from 'angulartics2';
import { MarkdownModule } from 'ngx-markdown';
import { ConfigComponent } from '../config/config.component';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent, ConfigComponent],
    imports: [
        CommonModule,
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        Angulartics2Module.forRoot(),
        MarkdownModule.forRoot(),
        MatGoogleMapsAutocompleteModule.forRoot('AIzaSyD7aI7elBUMplf9aOmT-wMhiojOxBj5Jxg'),
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
    bootstrap: [AppComponent],
})
export class AppModule {}
