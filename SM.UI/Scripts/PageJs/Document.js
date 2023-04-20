function Save() {

    var model = {};

    if (ValidateSave()) {

        MsgBox('Confirm', 'Do you want to Save ?', function () {

            var model = new Document();
            model.Fill();

            model.Mode = 1;

            if ($('#customFile').val() != "" && $('#customFile').val() != null) {
                model.Attachment = Date.now();
            }

            if (UploadFile(3, 'customFile', model.Attachment, 'Document', true)) {

                var fileInput = document.getElementById('customFile');
                var fileType = fileInput.files[0].name.split('.').pop();

                model.Attachment = model.Attachment + '.' + fileType;

                ajaxCall('Master/UpdateDocument', { 'model': model }, function (data) {

                    if (data.IsValid) {
                        MsgBox('Info', data.SucessMessage, '', true);
                    } else {
                        MsgBox('Error', data.ErrorMessage, '', false);
                    }
                });
            }

        }, true);
    }
}

var Document = function () {

    this.DocumentID = 0;
    this.DocumentTitle = "";
    this.DocumentDescription = "";
    this.Attachment = "";

    Mode = 1;

    this.Fill = function () {

        this.DocumentTitle = $("#DocumentTitle").val();
        this.DocumentDescription = $("#DocumentDescription").val();
        this.Attachment = $("#customFile").val();
    }
}

function ValidateSave() {

    var msg = "";
    var lstMsg = [];

    var model = {
        MenuID: 30
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