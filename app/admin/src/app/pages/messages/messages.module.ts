import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule }  from '@angular/common';
import { MessagesListComponent } from './list/messages-list.component';
import { MessageEditComponent } from './edit/message-edit.component';
import { MessagesListAnsweredComponent } from './listAnswered/messages-list-answered.component';
import { routing } from './messages.routing';
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
        MessagesListComponent,
        MessagesListAnsweredComponent,
        MessageEditComponent
    ],
    providers: [
    ]
})
export class MessagesModule {}