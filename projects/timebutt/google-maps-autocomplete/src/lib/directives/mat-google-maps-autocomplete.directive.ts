import { isPlatformBrowser } from '@angular/common';
import {
    Directive,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostListener,
    Inject,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    PLATFORM_ID,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, UntypedFormControl, Validators } from '@angular/forms';
import { Loader } from '@googlemaps/js-api-loader';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { GOOGLE_MAPS_AUTOCOMPLETE_API_KEY } from '../constants';
import { Location } from '../interfaces/location.interface';
import { MatValidateAddressDirective } from './address-validator/mat-address-validator.directive';

import PlaceResult = google.maps.places.PlaceResult;
import AutocompleteOptions = google.maps.places.AutocompleteOptions;

@Directive({
    selector: '[matGoogleMapsAutocomplete]',
    exportAs: 'matGoogleMapsAutocomplete',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MatGoogleMapsAutocompleteDirective),
            multi: true,
        },
    ],
})
export class MatGoogleMapsAutocompleteDirective implements OnInit, OnDestroy, ControlValueAccessor {
    @Input()
    address: PlaceResult | string;

    @Input()
    country: string | string[];

    @Input()
    placeIdOnly?: boolean;

    @Input()
    strictBounds?: boolean;

    @Input()
    types?: string[];

    @Input()
    type?: string;

    @Input()
    autoCompleteOptions: AutocompleteOptions = {};

    @Output()
    onChange: EventEmitter<PlaceResult | string | null> = new EventEmitter<PlaceResult | string | null>();

    @Output()
    onAutocompleteSelected: EventEmitter<PlaceResult> = new EventEmitter<PlaceResult>();

    @Output()
    onLocationSelected: EventEmitter<Location> = new EventEmitter<Location>();

    value: PlaceResult;

    private readonly FIELDS = ['name', 'place_id', 'formatted_address', 'geometry'];
    private onNewPlaceResult: EventEmitter<any> = new EventEmitter();
    private addressValidator: MatValidateAddressDirective = new MatValidateAddressDirective();

    public addressSearchControl: UntypedFormControl = new UntypedFormControl(
        { value: null },
        Validators.compose([Validators.required, this.addressValidator.validate()]),
    );

    propagateChange = (_: any) => {};

    inputEvent$ = new Subject<void>();
    private destroy$ = new Subject<void>();

    constructor(
        @Inject(PLATFORM_ID) public platformId: string,
        @Inject(GOOGLE_MAPS_AUTOCOMPLETE_API_KEY) private apiKey: string,
        public elemRef: ElementRef,
        private ngZone: NgZone,
    ) {}

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.addressValidator.subscribe(this.onNewPlaceResult);
            const options: AutocompleteOptions = {
                fields: this.FIELDS,
                placeIdOnly: this.placeIdOnly,
                strictBounds: this.strictBounds,
                ...(this.type ? { types: [this.type] } : {}),
            };

            this.country ? (options.componentRestrictions = { country: this.country }) : null;

            this.autoCompleteOptions = Object.assign(this.autoCompleteOptions, options);
            this.initGoogleMapsAutocomplete();
        }

        this.inputEvent$.pipe(debounceTime(300), takeUntil(this.destroy$)).subscribe(() => {
            const value = this.elemRef.nativeElement.value;
            this.value = { name: null, formatted_address: value };
            this.propagateChange(this.value);
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

    public initGoogleMapsAutocomplete() {
        new Loader({
            apiKey: this.apiKey,
            version: 'weekly',
            libraries: ['places'],
        })
            .load()
            .then(() => {
                const autocomplete = new google.maps.places.Autocomplete(this.elemRef.nativeElement, this.autoCompleteOptions);
                autocomplete.addListener('place_changed', () => {
                    this.ngZone.run(() => {
                        // get the place result
                        const place: PlaceResult = autocomplete.getPlace();

                        if (!place.place_id || place.geometry === undefined || place.geometry === null) {
                            // place result is not valid
                            return;
                        } else {
                            // show dialog to select a address from the input
                            // emit failed event
                            this.value = place;
                            this.propagateChange(this.value);
                        }
                        this.address = place.formatted_address;
                        this.onAutocompleteSelected.emit(place);
                        this.onLocationSelected.emit({
                            latitude: place.geometry.location.lat(),
                            longitude: place.geometry.location.lng(),
                        });
                    });
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any) {}

    setDisabledState(isDisabled: boolean) {}

    writeValue(obj: any) {
        if (obj && obj.name && obj.place_id) {
            this.elemRef.nativeElement.value = obj.name;

            // When offline, PlacesService does not exist!
            if (!Boolean(google.maps.places.PlacesService)) {
                return;
            }

            // Get the first result and get its details using the PlacesService
            const placesService = new google.maps.places.PlacesService(document.createElement('div'));

            placesService.getDetails(
                {
                    placeId: obj.place_id,
                    fields: this.FIELDS,
                },
                (place) => {
                    // Here's the first result in the AutoComplete with the exact
                    // same data format as you get from the AutoComplete.
                    this.value = place;
                    this.propagateChange(this.value);
                },
            );
        } else if (obj && obj.name) {
            this.elemRef.nativeElement.value = obj.name;
            this.value = { name: obj.name, formatted_address: obj.name };
            this.propagateChange(this.value);
        }
    }

    @HostListener('input')
    inputChanged() {
        this.inputEvent$.next();
    }
}
