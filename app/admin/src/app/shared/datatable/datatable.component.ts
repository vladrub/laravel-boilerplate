import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

require( 'flatpickr' );
import 'datatables.net';
import { DATATABLE_SETTINGS } from './datatable.settings.ts';
import { NotificationsService } from "angular2-notifications";

@Component({
    selector: 'datatable',
    templateUrl: 'datatable.component.html',
    styleUrls: ['./datatable.scss'],
    encapsulation: ViewEncapsulation.None
})

export class DatatableComponent implements OnInit {
    @Input() settings: any;
    @Input() data: any;

    @Output() onDetails = new EventEmitter();
    @Output() onEdit = new EventEmitter();
    @Output() onDelete = new EventEmitter();
    @Output() onCreate = new EventEmitter();
    @Output() onExport = new EventEmitter()
    @Output() onPublish = new EventEmitter();
    @Output() onReject = new EventEmitter();

    public dataTable: any;
    public dataTableFilterParams: any = {};

    // public baCardButtons: any[];

    @ViewChild('table') public _table: ElementRef;
    @ViewChild('loadingSpinner') public _loadingSpinner: ElementRef;

    constructor(private _notificationsService: NotificationsService) {
    }

    ngOnInit() {
        // Merge settings
        this.settings = $.extend(true, {
            filters: true,
            actions: {
                add: false,
                details: false,
                edit: false,
                delete: false,
                publish: false,
                reject: false,
                export: false
            },
            columns: []
        }, this.settings);

        // Merge columns settings
        for( var _i = 0; _i < this.settings.columns.length; _i++ ) {
            this.settings.columns[_i] = $.extend(true, {
                filter: {
                    type: 'text'
                }
            }, this.settings.columns[_i]);
        }

        for( let columnSettings of this.settings.columns ) {
            if ( columnSettings.filter ) {
                this.dataTableFilterParams[columnSettings.name] = '';
            }
        }

        setInterval(() => {
            // this.dataTableFilterParams.created_at = '2017-05-03';
        }, 1000);

        // if ( this.settings.actions.add ) {
        //     this.baCardButtons.push({
        //         'class': 'btn btn-success',
        //         'text': 'Добавить запись'
        //     });
        // }
    }

    ngAfterViewInit() {
        let them = this;
        let columns = [];
        let order = [0, "asc"];

        // columns
        for( var _i = 0; _i < this.settings.columns.length; _i++ ) {
            let columnSettings = this.settings.columns[_i];
            let column;

            if ( columnSettings.order ) {
                order = [_i, columnSettings.order];
            }
            
            column = {
                name: columnSettings.name,
                className: "column-" + columnSettings.name
            };
            
            if ( ! columnSettings.data ) {
                column.data = function (row) {
                    if ( ! row[columnSettings.name] ) return '-';
                    return row[columnSettings.name];
                }
            } else {
                column.data = columnSettings.data;
            }

            columns.push(column);
        }

        columns.push({
            className: "controls-cell",
            data: function () {
                let actions = '';

                if ( this.settings.actions.details ) {
                    actions += '<button class="btn btn-sm btn-info details"><i class="fa fa-search"></i></button>';
                }

                if ( this.settings.actions.edit ) {
                    actions += '<button class="btn btn-sm btn-default edit"><i class="fa fa-pencil"></i></button>';
                }

                if ( this.settings.actions.delete ) {
                    actions += '<button class="btn btn-sm btn-default delete"><i class="fa fa-remove"></i></button>';
                }

                if ( this.settings.actions.publish ) {
                    actions += '<button class="btn btn-sm btn-success publish"><i class="fa fa-thumbs-o-up"></i></button>';
                }

                if ( this.settings.actions.reject ) {
                    actions += '<button class="btn btn-sm btn-danger reject"><i class="fa fa-thumbs-o-down"></i></button>';
                }
                
                return actions;
            }.bind(this)
        });

        var tableIdentifier = (this._table.nativeElement.id + this._table.nativeElement.className + window.location.pathname).replace(/[- ._/]*/g, '');

        let dataTableSettings = $.extend(true, {
            stateSave: true,

            stateSaveCallback: function(settings,data) {
                localStorage.setItem( tableIdentifier, JSON.stringify(data) )
            },
            stateLoadCallback: function(settings) {
                return JSON.parse( localStorage.getItem( tableIdentifier ) )
            },

            order: [
                order
            ],

            columnDefs: [{
                'orderable': false,
                'targets': [this.settings.columns.length]
            }],

            ajax: {
                url: this.settings.url,
                dataType: 'json',
                type: 'GET',
                data: function (data) {
                    $.each(data.columns, function(key, value) {
                        let searchValue = this.dataTableFilterParams[data.columns[key].name];

                        if ( searchValue ) {
                            data.columns[key].search.value = searchValue;
                        }
                    }.bind(this));

                    $(this._loadingSpinner.nativeElement).fadeIn(100);
                }.bind(this),

                dataSrc: function (result) {
                    $(this._loadingSpinner.nativeElement).fadeOut(100);
                    return result.data;
                }.bind(this),

                error: function () {
                    them._notificationsService.error(
                        'Ошибка!',
                        'Неудалось получить данные с сервера'
                    );

                    $(this._loadingSpinner.nativeElement).fadeOut(100);
                }.bind(this),

                beforeSend: function(xhr){
                    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));
                }
            },

            columns: columns
        }, DATATABLE_SETTINGS);

        $.fn.dataTableExt.oStdClasses.sFilterInput = "form-control input-xs input-sm input-inline";
        $.fn.dataTableExt.oStdClasses.sLengthSelect = "form-control input-xs input-sm input-inline";

        this.dataTable = $(this._table.nativeElement).DataTable(dataTableSettings);

        let dataTableWrapper = $(this._table.nativeElement).parents('.dataTables_wrapper');

        dataTableWrapper.on('click', 'button.details', function (e) {
            var row = them.dataTable.row( $(this).closest('tr') );
            them.onDetails.emit(row);
        });

        dataTableWrapper.on('click', 'button.edit', function (e) {
            var row = them.dataTable.row( $(this).closest('tr') );
            them.onEdit.emit(row);
        });

        dataTableWrapper.on('click', 'button.delete', function (e) {
            var row = them.dataTable.row( $(this).closest('tr') );
            them.onDelete.emit(row);
        });

        dataTableWrapper.on('click', 'button.publish', function (e) {
            var row = them.dataTable.row( $(this).closest('tr') );
            them.onPublish.emit(row);
        });

        dataTableWrapper.on('click', 'button.reject', function (e) {
            var row = them.dataTable.row( $(this).closest('tr') );
            them.onReject.emit(row);
        });
    }

    onCreateEvent() {
        this.onCreate.emit();
    }

    onExportEvent() {
        this.onExport.emit();
    }

    submitFilter() {
        this.reload();
    }

    resetFilter() {
        for(var key in this.dataTableFilterParams) {
            this.dataTableFilterParams[key] = '';
        }
        this.reload();
    }
    
    reload() {
        this.dataTable.ajax.reload(null, false);
    }
}