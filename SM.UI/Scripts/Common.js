$(document).ready(function () {

    $Msg = new Date($.now()).toDateString();
 
    $('#HomeDisplay').text($Msg);

    $(document).keypress(function (e) {
        if (e.which === 13) {
            $('#btnLogin').click();
        }
    });
});

function BindDropDown(id, display, value, data) {
    $("#" + id).html("");
    $("#" + id).append($("<option></option>").val("-1").html("<b>Please Select</b>"));
    for (var i = 0; i < data.length; i++) {
        $("#" + id).append($("<option></option>").val(data[i][value]).html(data[i][display]));
    }
    $('.selectpicker').selectpicker('refresh');
}

function BindDropDownWithSelectAll(id, display, value, data, text) {
    $("#" + id).html("");
    $("#" + id).append($("<option></option>").val("0").html("<b>" + text + "</b>"));
    for (var i = 0; i < data.length; i++) {
        $("#" + id).append($("<option></option>").val(data[i][value]).html(data[i][display]));
    }
    $('.selectpicker').selectpicker('refresh');
}

function BindDropDownDefault(id, display, value, data) {
    $("#" + id).html("");
    for (var i = 0; i < data.length; i++) {
        $("#" + id).append($("<option></option>").val(data[i][value]).html(data[i][display]));
    }
    $('.selectpicker').selectpicker('refresh');
}

function ValidateError(lstValidate) {

    var lstMsg = [];

    /*
     Type ID    Type Name
     1          Text
     2          Date
     3          Select (Dropdown)
     */
    for (var i = 0; i < lstValidate.length; i++) {

        if (lstValidate[i].RequiredTypeID == 1) {
            $is_valid = $("#" + lstValidate[i].FieldName).val();

            if (!$is_valid) {
                lstMsg = {
                        Msg: lstValidate[i].Message,
                        FieldName: lstValidate[i].FieldName
                    }
                return lstMsg;
            }
        }
        else if (lstValidate[i].RequiredTypeID == 2) {
            $d = new Date($("#" + lstValidate[i].FieldName).val());
            $is_valid = $d instanceof Date && !isNaN($d);

            if (!$is_valid) {
                lstMsg = {
                    Msg: lstValidate[i].Message,
                    FieldName: lstValidate[i].FieldName
                }
                return lstMsg;
            }
        }
        else if (lstValidate[i].RequiredTypeID == 3) {
            $is_valid = $("#" + lstValidate[i].FieldName).val();

            if (!$is_valid || $is_valid =="-1") {
                lstMsg = {
                    Msg: lstValidate[i].Message,
                    FieldName: lstValidate[i].FieldName
                }
                return lstMsg;
            }
        }
    }
    return {
        Msg: "",
        FieldName: ""
    }
}

function ajaxCall(url, parameters, successCallback) {

    $.ajax({
        type: 'POST',
        url: rootUrl + url,
        timeout: 0,
        data: JSON.stringify(parameters),
        contentType: 'application/json;',
        dataType: 'json',
        success: successCallback,
        error: function (request, status, error) {
            MsgBox('Error', 'Runtime error occured', '', false);
        }

    });
}

function ajaxCallWithoutAsync(url, parameters, successCallback) {

    $.ajax({
        type: 'POST',
        url: rootUrl + url,
        timeout: 0,
        data: JSON.stringify(parameters),
        contentType: 'application/json;',
        dataType: 'json',
        success: successCallback,
        async: false,
        error: function (request, status, error) {
            MsgBox('Error', 'Runtime error occured', '', false);
        }
    });

}

function MsgBox(Type, Msg, callback, reload) {

    var title_hr = '';
    var Class_hr = '';

    if (Type == 'Error') {
        title_hr = '<h4>Error!</h4>';
        Class_hr = 'btn-danger btn-lg';
    }
    else if (Type == 'Info') {
        title_hr = '<h4>Information!</h4>';
        Class_hr = 'btn-info btn-lg';
    }
    else if (Type == 'Warn') {
        title_hr = '<h4>Warning!</h4>';
        Class_hr = 'btn-warning btn-lg';
    }
    else if (Type == 'Confirm') {
        title_hr = '<h4>Confirmation</h4>';
        Class_hr = 'btn-info btn-lg';
    }

    if (Type == 'Confirm') {
        var dialog = bootbox.dialog({
            title: title_hr,
            message: Msg,
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancel',
                    callback: function () {
                    }
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Confirm',
                    callback: callback
                }
            }
        });
    }
    else {
        var dialog = bootbox.dialog({
            title: title_hr,
            message: Msg,
            buttons: {
                ok: {
                    label: 'OK',
                    className: Class_hr,
                    callback: function () {
                        if (reload) {
                            location.reload();
                        } else {
                            callback
                        }
                    }
                }
            }
        });
    }
}