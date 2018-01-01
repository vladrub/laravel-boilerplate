import { Component, AfterViewInit, Input, Output, forwardRef, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { DateTimePickerSettings } from './date-time-picker-settings.interface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'date-time-picker',
    template: `
        <div>
            <input type="text" class="form-control" #flatpickr>
        </div>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef( () => DateTimePickerComponent ),
            multi: true
        }
    ]
})

export class DateTimePickerComponent implements AfterViewInit {
    @Input() settings: DateTimePickerSettings;
    @Output() dataUpdated = new EventEmitter();

    private defaultSettings: DateTimePickerSettings = {
        // wrap: true,
        clickOpens: true,
        time_24hr: true,
        onChange: ( selectedDates: any ) => { console.log(selectedDates); this.writeValue( this._flatpickrElement.nativeElement.value ); }
    };

    private flatpickr: any;
    @ViewChild('flatpickr') _flatpickrElement: any;

    constructor() {
    }

    ngAfterViewInit() {
        if( this.settings ) {
            Object.assign( this.defaultSettings, this.settings );
        }
        
        this.flatpickr = this._flatpickrElement.nativeElement.flatpickr( this.defaultSettings );
    }

    setDateFromInput( date: any ) {
        this._flatpickrElement.nativeElement._flatpickr.setDate( date, true );
    }

    writeValue( value:any ) {
        this.propagateChange( value );
    }

    registerOnChange( fn: any ) {
        this.propagateChange = fn;
    }

    registerOnTouched() {}

    propagateChange = ( _: any ) => {};
}