import { NgModule }    from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { DatatableComponent } from './datatable.component';
import { NgaModule } from "../../theme/nga.module";
import { DateTimePickerComponent } from './filter-fields/date-time-picker.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        NgaModule,
        // FormFieldsModule,
        // ReactiveFormsModule
    ],
    declarations: [
        DatatableComponent,
        DateTimePickerComponent
    ],
    exports: [
        DatatableComponent
    ]
})
export class DatatableModule {}