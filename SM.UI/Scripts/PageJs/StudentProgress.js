let currentRow = '';
$(document).ready(function () {

    FillStudent();
    $('#PreviewStudent').hide();
    $('#PreviewSponser').hide();

    $('#cmbStudent').on('change', function () {
        if ($('#cmbStudent').val() != -1) {

            $('#PreviewStudent').show();
            $('#PreviewSponser').show();
            FillStudentLinkedSponser();
            FillGrid();

        } else {
            $('#PreviewStudent').hide();
            $('#PreviewSponser').hide();
        }
    });

    $("#PreviewStudent").on("click", function () {
        GetStudent($('#cmbStudent').val());
    });

    $("#PreviewSponser").on("click", function () {
        GetSponser($('#StudentSponserID').val());
    });

});

function FillStudentLinkedSponser() {

    $StudentID = $('#cmbStudent').val();

    var model = {
        StudentID: $StudentID
    }
    $('#StudentSponserID').val(0);

    ajaxCall('Form/StudentDataofSponserLinked', { 'model': model }, function (data) {
        if (data.length <= 0) {
            MsgBox('Warn', 'This Student not Linked to a Sponser', '', false);
        }
        else {
            for (var i = 0; i < data.length; i++) {
                $('#StudentSponserID').val(data[0].SponserID);
            }
        }
    });
}

function FillStudent() {

    var model = {
        StudentID: 0,
        ViewTypeID: 1
    }
    ajaxCall('Form/StudentData', { 'model': model }, function (data) {
        BindDropDown("cmbStudent", "StudentName", "StudentID", data);
    });
    $('#cmbStudent').selectpicker('refresh');
}

function FillGrid() {

    $StudentID = $('#cmbStudent').val();

    var model = {
        StudentID: $StudentID
    }
    $("#StudentProgress").find("tr").remove();

    $ProgressFile = "<a data-toggle='tooltip' data-placement='top' data-original-title='View Attchment' href='#' onclick = 'GetStudentProgressPDF(0)'><img src='../assets/images/page-img/viewpdf.png' height='36'></a>";
    ajaxCall('Form/StudentProgressData', { 'model': model }, function (data) {

        for (var i = 0; i < data.length; i++) {        

            $("#StudentProgress").append(
                '<tr>' +
                '<td hidden>' + data[i].StudentID + '</td>' +
                '<td hidden>' + data[i].StudentProgressID + '</td>' +
                '<td>' + data[i].ProgressTitle + '</td>' +
                '<td><a data-toggle="tooltip" data-placement="top" data-original-title="View Attchment" href="#" onclick = "GetStudentProgressPDF(' + data[i].ProgressFileName+')"><img src="../assets/images/page-img/viewpdf.png" height="36"></a></td>' +
                '<td>' + data[i].EmailSendName + '</td>' +
                '<td>' + data[i].EffectiveMonth + '</td>' +                
                '<td hidden>' + data[i].ProgressFileName + '</td>' +
                '<td hidden>' + data[i].FilePath + '</td>' +
                '<td hidden>' + '' + '</td>' +
                '<td>' +
                '<a class="badge bg-warning mr-2 red" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" href="#"> <i class="ri-delete-bin-line mr-0"></i></a >' +
                '</td > ' +
                '</tr> ');
        }
    });
}

var StudentProgress = function () {

    this.StudentID = 0;
    this.Year = 0;
    this.Month = 0;
    this.ProgressTitle = "";
    this.ProgressFileName = "";
    this.EmailSend = "";

    this.Fill = function () {

        this.StudentID = $("#cmbStudent").val();
        this.Year = $("#EffectiveMonth").val().split("-", 2)[0];
        this.Month = $("#EffectiveMonth").val().split("-", 2)[1];
        this.ProgressTitle = $("#StudentAchievementTitle").val();
        this.ProgressFileName = $("#customFileLabel").val();
        this.EmailSend = $('#rbSchol').prop('checked');

    }
}

function Save() {

    if (Validate()) {
        MsgBox('Confirm', 'Do you want to Save ?', function () {

            var model = new StudentProgress();
            model.Fill();

            if ($('#customFile').val() != "" && $('#customFile').val() != null) {
                model.ProgressFileName = Date.now();
            }  

            if (UploadFile(2,'customFile', model.ProgressFileName,'StudentProgress',true)) {

                ajaxCall('Form/SaveStudentProgress', { 'model': model }, function (data) {

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

function Validate() {

    var msg = "";
    var lstMsg = [];

    var model = {
        MenuID: 16
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