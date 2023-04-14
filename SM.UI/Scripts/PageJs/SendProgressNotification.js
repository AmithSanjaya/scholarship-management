$(document).ready(function () {

    var table = $('#datable_1').DataTable();

    var model = {}

    ajaxCall('Master/EffectiveYears', { 'model': model }, function (data) {
        BindDropDown("EffectiveYear", "Year", "Year", data);
    });
    $('#EffectiveYear').selectpicker('refresh');

    $("#ProgresNotification").on("click", ".red", function () {
        $(this).closest("tr").remove();
    });

    //FillGrid();

    $('#EffectiveYear').on('change', function () {
        FillGrid();
    });

    $('#datable_1').DataTable();

});

function FillGrid() {

    var model = {
        StudentID: 0,
        ViewTypeID: 10,
        ProgressYear: $("#EffectiveYear").val()
    }

    $("#FillProgresNotification").find("tr").remove();
    $("#FillProgresNotification").empty();

    ajaxCall('Form/StudentData', { 'model': model }, function (data) {

        for (var i = 0; i < data.length; i++) {

            $Img = GetStudentImage(data[i].Photo);
            $StudentID = data[i].StudentID;
            $StudentName = data[i].StudentName;
            $GenderName = data[i].GenderName;
            $DistrictName = data[i].DistrictName;
            $SchoolName = data[i].SchoolName;
            $ProgressSend = data[i].ProgressSend;
            $ProgressNotification = data[i].ProgressNotification;

            $ImgName = "<img src='" + $Img + "' class='img-fluid rounded avatar-50 mr-3' alt='image'>";

            $("#FillProgresNotification").append(
                '<tr>' +
                '<td hidden>' + $StudentID + '</td>' +
                '<td><div class="d-flex align-items-center">' + $ImgName + '<div>' + $StudentName + '</div></div></td>' +
                '<td>' + $GenderName + '</td>' +
                '<td>' + $DistrictName + '</td>' +
                '<td>' + $SchoolName + '</td>' +
                '<td>' + $ProgressSend + '</td>' +
                '<td>' + $ProgressNotification + '</td>' +
                '<td><div class="d-flex align-items-center list-action">' +
                '<a class="badge badge-info mr-2" data-placement="top" title="" data-original-title="View"' +
                'data-toggle="tooltip" onclick="GetStudent(@d.StudentID)"><i class="ri-eye-line mr-0"></i></a>' +
                '<button type="button" class="btn btn-primary btn-sm mr-2" onclick="AddToGrid(event)">Add</button>' +
                '</div></td>' +
                '</tr> ');

        }

    });
}

function AddToGrid(event) {

    var isAdded = false;
    var RowCount = document.getElementById("ProgresNotification").rows.length;
    var RowData = document.getElementById("ProgresNotification");

    var $row = $(event.target).closest("tr");
    for (var i = 0; i < RowCount; i++) {
        if ((RowData.rows[i].cells[0].innerHTML == $row.find("td:nth-child(1)").text())) {
            isAdded = true;
            break;
        } else {
            isAdded = false;
        }
    }

    if (isAdded === false) {

        $StudentID = $row.find("td:nth-child(1)").text();

        var model = {
            StudentID: $StudentID,
            ViewTypeID: 10
        }

        ajaxCall('Form/StudentData', { 'model': model }, function (data) {

            $Img = GetStudentImage(data[0].Photo);
            $StudentName = data[0].StudentName;
            $GenderName = data[0].GenderName;
            $DistrictName = data[0].DistrictName;
            $SchoolName = data[0].SchoolName;
            $ProgressSend = data[0].ProgressSend;
            $ProgressNotification = data[0].ProgressNotification;

            $ImgName = "<img src='" + $Img + "' class='img-fluid rounded avatar-50 mr-3' alt='image'>";

            $("#ProgresNotification").append(
                '<tr>' +
                '<td hidden>' + $StudentID + '</td>' +
                '<td><div class="d-flex align-items-center">' + $ImgName + '<div>' + $StudentName + '</div></div></td>' +
                '<td>' + $GenderName + '</td>' +
                '<td>' + $DistrictName + '</td>' +
                '<td>' + $SchoolName + '</td>' +
                '<td hidden>' + $ProgressSend + '</td>' +
                '<td hidden>' + $ProgressNotification + '</td>' +
                '<td><a class="badge bg-warning mr-2 red" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" href="#"> <i class="ri-delete-bin-line mr-0"></i></a ></td>' +
                '</tr> ');
        });
    }
}

var StudentProgressNotification = function () {

    this.StudentID = 0,
    this.EffectiveYear = 0,
    this.ProgressSend = 0,
    this.ProgressNotification = 0

    this.Fill = function () {
        this.EffectiveYear = $("#EffectiveYear").val()
    }
}

function Save() {

    MsgBox('Confirm', 'Do you want to Save ?', function () {

        var rowCount = document.getElementById("ProgresNotification").rows.length;
        var rowData = document.getElementById("ProgresNotification");

        if (rowCount > 0) {

            var lstStudentProgressNotificationModel = [];

            for (var i = 0; i < rowCount; i++) {

                var Model = new StudentProgressNotification();
                Model.Fill();

                Model.StudentID = rowData.rows[i].cells[0].innerHTML;
                Model.ProgressSend = rowData.rows[i].cells[5].innerHTML;
                Model.ProgressNotification = rowData.rows[i].cells[6].innerHTML;

                lstStudentProgressNotificationModel.push(Model);
            }

            var model = {
                lstStudentProgressNotification: lstStudentProgressNotificationModel
            }

            ajaxCall('Form/SaveStudentProgressNotification', { 'model': model }, function (data) {

                if (data.IsValid) {
                    MsgBox('Info', data.SucessMessage, '', true);
                } else {
                    MsgBox('Error', data.ErrorMessage, '', false);
                }
            });
        }
        else {
            MsgBox('Error', 'No Record(s) to Save', '', false);
        }

    }, true);
}