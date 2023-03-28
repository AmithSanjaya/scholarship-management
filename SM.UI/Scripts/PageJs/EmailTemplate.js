$(document).ready(function () {
    FillGrid();
});

function FillEdit(EmailTemplateID) {

    $('#EmailTemplateID').val(EmailTemplateID);

    var model = {
        EmailTemplateID: EmailTemplateID
    }

    ajaxCall('Master/EmailTemplateDetail', { 'model': model }, function (data) {

        $('#EmailTemplateTitle').val(data[0].EmailTypeName);
        $('#EmailSubject').val(data[0].EmailSubject);
        $('#EmailBody').val(data[0].EmailBody);

    });

    $('#EmailTemplateTitle').focus();
}

function FillGrid() {

    var model = {}

    $("#EmailTemplateDetail").find("tr").remove();

    ajaxCall('Master/EmailTemplateDetail', { 'model': model }, function (data) {

        for (var i = 0; i < data.length; i++) {

            $EmailTemplateID = data[i].EmailTemplateID;
            $EmailTypeName = data[i].EmailTypeName;
            $EmailSubject = data[i].EmailSubject;
            $EmailBody = data[i].EmailBody;

            $("#EmailTemplateDetail").append(
                '<tr>' +
                '<td hidden>' + $EmailTemplateID + '</td>' +
                '<td>' + $EmailTypeName + '</td>' +
                '<td hidden>' + $EmailSubject + '</td>' +
                '<td hidden>' + $EmailBody + '</td>' +
                '<td>' +
                '<a class="badge bg-success mr-2 editgriditem" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit" onclick = "FillEdit(' + $EmailTemplateID + ')"> <i class="ri-pencil-line mr-0"></i></a >' +
                '<a class="badge bg-warning mr-2 red" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" href="#"> <i class="ri-delete-bin-line mr-0"></i></a >' +
                '</td > ' +
                '</tr> ');
        }
    });
}

function Save() {

    var model = {};

    if (ValidateSave()) {
        MsgBox('Confirm', 'Do you want to Save ?', function () {

            var model = new EmailTemplate();
            model.Fill();

            model.Mode = 1;

            if (model.EmailTemplateID != 0) {
                model.Mode = 2;
            }

            ajaxCall('Master/UpdateEmailTemplate', { 'model': model }, function (data) {

                if (data.IsValid) {
                    MsgBox('Info', data.SucessMessage, '', true);
                } else {
                    MsgBox('Error', data.ErrorMessage, '', false);
                }
            });

        }, true);
    }
}

var EmailTemplate = function () {

    this.EmailTemplateID = 0;
    this.EmailTypeName = "";
    this.EmailSubject = "";
    this.EmailBody = "";

    Mode = 1;

    this.Fill = function () {

        this.EmailTemplateID = $("#EmailTemplateID").val() || 0;
        this.EmailTypeName = $("#EmailTemplateTitle").val();
        this.EmailSubject = $("#EmailSubject").val();
        this.EmailBody = $("#EmailBody").val();
    }
}

function ValidateSave() {

    var msg = "";
    var lstMsg = [];

    var model = {
        MenuID: 23
    }

    ajaxCallWithoutAsync('Admin/FormValidate', { 'model': model }, function (data) {
        lstMsg = ValidateError(data);
    });

    if (lstMsg["Msg"] != "") {
        msg = lstMsg["Msg"];

        MsgBox('Error', msg, '', false);
        document.getElementById(lstMsg["FieldName"]).focus();

        return false;
    }

    return true;
}