import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule }  from '@angular/common';
import { UsersListComponent } from './list/users-list.component';
import { UserCreateComponent } from './create/user-create.component';
import { UserDetailsComponent } from './details/user-details.component';
import { UserEditComponent } from './edit/user-edit.component';
import { routing } from './users.routing';
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
        UsersListComponent,
        UserCreateComponent,
        UserDetailsComponent,
        UserEditComponent
    ],
    providers: [
    ]
})
export class UsersModule {}