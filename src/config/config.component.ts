import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.scss'],
    imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule, FormsModule],
})
export class ConfigComponent {
    addressLabelText = 'Address';
    placeholderText = 'Please enter the address';
    requiredErrorText = 'The address is required';
    invalidErrorText = 'The address is not valid';

    country;

    readonly appearance = 'outline' as const;
    readonly appearanceOptions: MatFormFieldAppearance[] = ['outline', 'fill'];
}
