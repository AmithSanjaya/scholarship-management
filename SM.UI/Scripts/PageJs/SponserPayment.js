$(document).ready(function () {

    FillSponser();

    $("#SponserStudentDetial").on("click", ".red", function () {

        var row = $(this).closest('tr');
        var id = $(this).closest('tr').children('td:eq(0)').text();
        MsgBox('Confirm', 'Do you want to Remove this Record ?', function () {

            DeleteStudentFromSponser(id);
            row.remove();
            FillStudentsBySponser();
        }, true);
    });

    $('#cmbSponser').on('change', function () {
        GetStudents();
    });
});

function FillSponser() {

    var model = {
        SponserID: 0,
        ViewTypeID: 2
    }
    ajaxCall('SM/SponserData', { 'model': model }, function (data) {
        BindDropDown("cmbSponser", "SponserName", "SponserID", data);
    });
    $('#cmbSponser').selectpicker('refresh');
}

function PaymentDetails() {

    var model = {
        SponserID: $('#cmbSponser').val(),
        Year: 2023,
        Month:3
    }

    $("#SponserPayment").empty();

    ajaxCallWithoutAsync('Form/SponsersStudentData', { 'model': model }, function (data) {

        for (var i = 0; i < data.length; i++) {

        }

    });
}

function PaymentSaveDetails(StudentID) {

}

function GetStudents() {

    var model = {
        SponserID: $('#cmbSponser').val()
    }

    $("#tableBody").empty();

    ajaxCallWithoutAsync('Form/SponsersStudentData', { 'model': model}, function (data) {

        for (var i = 0; i < data.length; i++) {

            $Img = GetStudentImage(data[i].Photo);

            $StudentName = data[i].StudentName;
            $Country = data[i].CountryName;
            $ImgName = "<img src='" + $Img + "' class='img-fluid rounded avatar-50 mr-3' alt='image'>";

            $("#studentDetails").append(
                '<tr>' +
                '<td hidden>' + data[i].StudentID + '</td>' +
                '<td><div class="d-flex align-items-center">' + $ImgName + '<div>' + $StudentName + '</div></div></td>' +
                '<td>' + data[i].GenderName + '</td>' +
                '<td>' + data[i].CountryName + '</td>' +
                '<td>' + data[i].SchoolName + '</td>' +
                '<td><div class="d-flex align-items-center list-action"><a class= "badge badge-info mr-2" data -placement="top" title = "" data -original -title="View" data -toggle="modal" onclick = "GetStudent(' + data[i].StudentID + ')"><i class="ri-eye-line mr-0"></i></a> ' +
                '<button type = "button" class= "btn btn-primary btn-sm mr-2" onclick = "AddToGrid(event)" > Add Payment</button ></div ></td > ' +
                '</tr> ');
        }
    });
}

function AddToGrid(event) {

    var isAdded = false;

    var RowCount = document.getElementById("SponserPayment").rows.length;
    var RowData = document.getElementById("SponserPayment");

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

        $('#AddGrid').modal();

        $('#SponserStudentID').val($StudentID);
        $('#PaidAmount').focus();
    }
    else {
        MsgBox('Error', 'Already Exists', '', false);
    }
}

function AddToGridFromModel() {

    $StudentID = $('#SponserStudentID').val();

    var model = {
        StudentID: $StudentID,
        ViewTypeID: 2
    }

    ajaxCall('Form/StudentData', { 'model': model }, function (data) {

        GetStudentImage(data[0].Photo);

        $StudentName = data[0].FirstName + " " + data[0].LastName;
        $Country = data[0].CountryName;
        $ImgName = "<img src='" + $Img + "' class='img-fluid rounded avatar-50 mr-3' alt='image'>";

        $PayAmount = $('#PaidAmount').val();

        $("#SponserPayment").append(
            '<tr>' +
            '<td hidden>' + $StudentID + '</td>' +
            '<td><div class="d-flex align-items-center">' + $ImgName + '<div>' + $StudentName + '</div></div></td>' +
            '<td>' + $Country + '</td>' +
            '<td>' + $PayAmount + '</td>' +
            '<td>' + data[0].CurrentDate + '</td>' +
            '<td>' +
            '<a class="badge bg-success mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit" href="#"> <i class="ri-pencil-line mr-0"></i></a >' +
            '<a class="badge bg-warning mr-2 red" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" href="#"> <i class="ri-delete-bin-line mr-0"></i></a >' +
            '</td > ' +
            '</tr> ');
    });

    $('#SponserStudentID').val(0);
    $('#AddGrid').hide();

}