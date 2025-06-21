import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import {
    Appearance,
    GermanAddress,
    Location,
    MatGoogleMapsAutocompleteComponent,
    MatGoogleMapsAutocompleteDirective,
    MatSearchGoogleMapsAutocompleteComponent,
} from '@timebutt/google-maps-autocomplete';
import { MarkdownComponent } from 'ngx-markdown';
import { ConfigComponent } from 'src/config/config.component';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
        CommonModule,
        ConfigComponent,
        MarkdownComponent,
        MatButtonToggleModule,
        MatCardModule,
        MatFormFieldModule,
        MatExpansionModule,
        MatInputModule,
        MatGoogleMapsAutocompleteComponent,
        MatGoogleMapsAutocompleteDirective,
        MatSearchGoogleMapsAutocompleteComponent,
        MatTabsModule,
        ReactiveFormsModule,
    ],
})
export class AppComponent implements OnInit {
    title = 'google-maps-autocomplete';

    addressFormGroup: UntypedFormGroup;

    directiveFormControl = new UntypedFormControl();

    public appearance = Appearance;
    public zoom: number;
    public latitude: number;
    public longitude: number;
    public showAsDirective = false;
    public showAsComponent = true;

    addressValue: GermanAddress = {
        streetNumber: '100',
        streetName: 'Your StreetName',
        vicinity: 'Your vicinity',
        postalCode: 37084,
        locality: {
            long: 'your locality',
        },
    };

    private setCurrentPosition() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 12;
            });
        }
    }

    onAutocompleteSelected(result: PlaceResult) {
        console.log('onAddressSelected: ', result);
    }

    onLocationSelected(location: Location) {
        console.log('onLocationSelected: ', location);
        this.latitude = location.latitude;
        this.longitude = location.longitude;
    }

    flip() {
        this.showAsDirective = !this.showAsDirective;
        this.showAsComponent = !this.showAsDirective;
    }

    onGermanAddressMapped($event: GermanAddress) {
        console.log('onGermanAddressMapped', $event);
    }

    ngOnInit(): void {
        this.addressFormGroup = new UntypedFormGroup({
            // address: new FormControl(this.addressValue),
            address: new UntypedFormControl(),
        });

        this.addressFormGroup.get('address').valueChanges.subscribe((value) => console.log('value changed', value));
    }
}
