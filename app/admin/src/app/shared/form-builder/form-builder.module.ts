import { NgModule }    from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { FormBuilderComponent } from './form-builder.component';
import { FormFieldsModule } from './form-fields/form-fields.module';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        FormFieldsModule,
        ReactiveFormsModule
    ],
    declarations: [
        FormBuilderComponent
    ],
    exports: [
        FormBuilderComponent
    ]
})
export class FormBuilderModule {}