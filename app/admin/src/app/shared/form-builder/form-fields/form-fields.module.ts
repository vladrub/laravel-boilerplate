import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { FFTextComponent } from './text/ff-text.component';
import { FFTextareaComponent } from './textarea/ff-textarea.component';
import { FFSelectComponent } from './select/ff-select.component';
import { FFRepeaterComponent } from './repeater/ff-repeater.component';
import { FFImageUploadComponent } from './image-upload/ff-image-upload.component';
import { FFDatePickerComponent } from './date-picker/ff-date-picker.component';
import { FFCheckboxComponent } from './checkbox/ff-checkbox.component';
import { FFVideoSelectComponent } from './video-select/ff-video-select.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        FFTextComponent,
        FFTextareaComponent,
        FFImageUploadComponent,
        FFSelectComponent,
        FFRepeaterComponent,
        FFDatePickerComponent,
        FFCheckboxComponent,
        FFVideoSelectComponent
    ],
    exports: [
        FFTextComponent,
        FFTextareaComponent,
        FFImageUploadComponent,
        FFSelectComponent,
        FFRepeaterComponent,
        FFDatePickerComponent,
        FFCheckboxComponent,
        FFVideoSelectComponent
    ]
})
export class FormFieldsModule {}