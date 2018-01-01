import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule }  from '@angular/common';
import { PhotoContestDetailsComponent } from './details/photo-contest-details.component';
import { routing } from './photo-contest.routing';
import { NgaModule } from "../../theme/nga.module";
import { FormBuilderModule } from "../../shared/form-builder/form-builder.module";
import { DatatableModule } from "../../shared/datatable/datatable.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DatatableModule,
        NgaModule,
        FormBuilderModule,
        routing
    ],
    declarations: [
        PhotoContestDetailsComponent
    ],
    providers: [
    ]
})
export class PhotoContestModule {}