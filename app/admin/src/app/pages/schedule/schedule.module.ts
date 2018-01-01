import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule }  from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import { routing } from './schedule.routing';
import { DatatableModule } from "../../shared/datatable/datatable.module";
import { ScheduleService } from "./schedule.service";
import { NgaModule } from "../../theme/nga.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DatatableModule,
        NgaModule,
        routing
    ],
    declarations: [
        ScheduleComponent
    ],
    providers: [
        ScheduleService
    ]
})
export class ScheduleModule {}