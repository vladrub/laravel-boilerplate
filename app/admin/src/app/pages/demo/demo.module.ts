import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { DemoComponent } from './demo.component';
import { routing } from './demo.routing';
import { NgaModule } from "../../theme/nga.module";
import { FormBuilderModule } from "../../shared/form-builder/form-builder.module";
import { DatatableModule } from "../../shared/datatable/datatable.module";
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DefaultModal } from './default-modal/default-modal.component';

@NgModule({
    imports: [
        CommonModule,
        NgaModule,
        NgbModalModule,
        FormBuilderModule,
        DatatableModule,
        routing
    ],
    declarations: [
        DefaultModal,
        DemoComponent
    ],
    entryComponents: [
        DefaultModal
    ]
})
export class DemoModule {}