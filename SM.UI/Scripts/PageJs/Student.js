$(document).ready(function () {

    $("#FundDIV").hide();
    $("#NumberDIV").hide();

    $("#rbSchol").change(function () {
        if (this.checked) {
            $("#FundDIV").show();
            $("#NumberDIV").show();
        } else {
            $("#FundDIV").hide();
            $("#NumberDIV").hide();
        }
    });

    $('#btnAddToGrid').click(function () {
        AddToGrid();
    });
    $("#tblDetails").on("click", ".red", function () {
        $(this).closest("tr").remove();
    });

});

function AddToGrid() {

    var ExamTypeID = $('#ExamType').val();
    var GradeID = $('#SubjectGrade').val();

    var Subject = $('#SubjectName').val();

    $("#tableBody").append(
        '<tr>' +
        '<td hidden> ' + ExamTypeID + '</td>' +
        '<td>' + $('#ExamType option:selected').text() + '</td>' +
        '<td>' + Subject + '</td>' +
        '<td hidden>' + GradeID + '</td>' +
        '<td>' + $('#SubjectGrade option:selected').text() + '</td>' +
        '<td><span class="button red"><i class="glyphicon glyphicon-remove"></i></span></td>' +
        '</tr> ');
}

function Save() {

    var model = {};

    MsgBox('Confirm', 'Do you want to Process ?', function () {
        ajaxCall('HR/CommissionProcessPost', { 'model': model }, function (data) {

            if (data.IsValid) {
                ResetFields();
                ClearAllAlerts();
                MsgBox('Info', data.SucessMessage, '', true);
            } else {
                MsgBox('Error', data.strResult, '', true);
            }
        });
    }, true);
}