$(document).ready(function () {

    FillStudent();
    $('#PreviewStudent').hide();
    $('#PreviewSponser').hide();

    $('#cmbStudent').on('change', function () {
        if ($('#cmbStudent').val() != -1) {
            $('#PreviewStudent').show();
            $('#PreviewSponser').show();

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
        $('#CommonModel').modal();
    });
});

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

    ajaxCall('Form/StudentAchievementData', { 'model': model }, function (data) {

        for (var i = 0; i < data.length; i++) {

            $AchievementTitle = data[i].AchievementTitle;
            $AchievementName = data[i].AchievementName;
            $EmailSendName = data[i].EmailSendName;
            $AddedDate = data[i].AddedDate;

            $("#StudentAchievementDetail").append(
                '<tr>' +
                '<td hidden>' + $StudentID + '</td>' +
                '<td>' + $AchievementTitle + '</td>' +
                '<td>' + $AchievementName + '</td>' +
                '<td>' + $EmailSendName + '</td>' +
                '<td>' + $AddedDate + '</td>' +
                '<td>' +
                '<a class="badge bg-success mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit" href="#"> <i class="ri-pencil-line mr-0"></i></a >' +
                '<a class="badge bg-warning mr-2 red" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" href="#"> <i class="ri-delete-bin-line mr-0"></i></a >' +
                '</td > ' +
                '</tr> ');
        }
    });
}