export const DATATABLE_SETTINGS =  {
    processing: true,
    serverSide: true,
    searching: false,
    orderCellsTop: true,

    dom:
    "<'table-responsive't>" +
    "<'row'" +
        "<'col-md-6 col-sm-12 text-left'p>" +
        "<'col-md-6 col-sm-12 text-right'li>" +
    ">",

    language: {
        "processing": "Подождите...",
        "search": "Поиск:",
        "lengthMenu": "Показать _MENU_ записей",
        "info": "| Всего _TOTAL_ записей",
        "infoEmpty": "Записи с 0 до 0 из 0 записей",
        "infoFiltered": "(отфильтровано из _MAX_ записей)",
        "infoPostFix": "",
        "loadingRecords": "Загрузка записей...",
        "zeroRecords": "Записи отсутствуют.",
        "emptyTable": "В таблице отсутствуют данные",
        "paginate": {
            "first": "<<",
            "previous": "<",
            "next": ">",
            "last": ">>"
        },
        "aria": {
            "sortAscending": ": активировать для сортировки столбца по возрастанию",
            "sortDescending": ": активировать для сортировки столбца по убыванию"
        }
    }
};