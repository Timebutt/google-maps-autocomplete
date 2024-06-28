import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatGoogleMapsAutocompleteComponent } from './component/mat-google-maps-autocomplete.component';
import { MatValidateAddressDirective } from './directives/address-validator/mat-address-validator.directive';
import { MatGoogleMapsAutocompleteDirective } from './directives/mat-google-maps-autocomplete.directive';
// tslint:disable-next-line:max-line-length
import { MatSearchGoogleMapsAutocompleteComponent } from './component/mat-search-google-maps-autocomplete/mat-search-google-maps-autocomplete.component';
import { GOOGLE_MAPS_AUTOCOMPLETE_API_KEY } from './constants';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatIconModule],
    exports: [
        MatGoogleMapsAutocompleteComponent,
        MatGoogleMapsAutocompleteDirective,
        MatValidateAddressDirective,
        MatSearchGoogleMapsAutocompleteComponent,
    ],
    declarations: [
        MatGoogleMapsAutocompleteComponent,
        MatGoogleMapsAutocompleteDirective,
        MatValidateAddressDirective,
        MatSearchGoogleMapsAutocompleteComponent,
    ],
})
export class MatGoogleMapsAutocompleteModule {
    static forRoot(apiKey: string): ModuleWithProviders<MatGoogleMapsAutocompleteModule> {
        return {
            ngModule: MatGoogleMapsAutocompleteModule,
            providers: [{ provide: GOOGLE_MAPS_AUTOCOMPLETE_API_KEY, useValue: apiKey }],
        };
    }
}
