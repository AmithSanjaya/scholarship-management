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

    $("#PreviewApp").on("click", function () {       

        var sponserID = $("#cmbSponser").val();
        if (sponserID > 0) {
            $('#CommonModel').modal();       
            //GetAllStudents();
            var model = {
                SponserID: sponserID
            }
            ajaxCallWithoutAsync('Form/SponsersLinkedStudentData', { 'model': model }, function (linkeddata) {

                for (var j = 0; j < linkeddata.length; j++) {

                    var model = {
                        StudentID: linkeddata[j].StudentID,
                        ViewTypeID: 2
                    }

                    $("#CommonModelTableHeader").empty();
                    $("#CommonModelTableDetial").empty();

                    $("h5.CommonHead").text('Preview Sponser/Student Details');

                    ajaxCallWithoutAsync('Form/StudentData', { 'model': model }, function (data) {

                        tr = $('<tr class="ligth ligth-data"/>');
                        tr.append("<th hidden>StudentID</th>")
                        tr.append("<th>Student Name</th>")
                        tr.append("<th>Country</th>")
                        tr.append("<th>Added Date</th>")
                        tr.append("</tr>")

                        $('#CommonModelTableHeader').append(tr);

                        for (var i = 0; i < data.length; i++) {

                            $Img = GetStudentImage(data[0].Photo);

                            $StudentName = data[i].FirstName + " " + data[i].LastName;
                            $Country = data[i].CountryName;
                            $ImgName = "<img src='" + $Img + "' class='img-fluid rounded avatar-50 mr-3' alt='image'>";

                            $("#CommonModelTableDetial").append(
                                '<tr>' +
                                '<td><div class="d-flex align-items-center">' + $ImgName + '<div>' + $StudentName + '</div></div></td>' +
                                '<td>' + $Country + '</td>' +
                                '<td>' + linkeddata[j].LinkedOn + '</td>' +
                                '</tr> ');
                        }

                    });

                }
            });
        }
        else {
            MsgBox('Error', 'Please select the Sponser', '', false);
        }

    });

});


function FillSponser() {

    var model = {
        SponserID: 0,
        ViewTypeID: 1
    }
    ajaxCall('SM/SponserData', { 'model': model }, function (data) {
        BindDropDown("cmbSponser", "SponserName", "SponserID", data);
    });
    $('#cmbSponser').selectpicker('refresh');

    model = {}
    ajaxCall('SM/PaymentSchems', { 'model': model }, function (data) {
        BindDropDown("cmbPayScheme", "PaymentSchemeName", "PaymentSchemeID", data);
    });
    

    $('#cmbPayScheme').selectpicker('refresh');
}

function AddToGridFromModel() {

    $StudentID = $('#SponserStudentID').val();

    var model = {
        StudentID: $StudentID,
        ViewTypeID: 2
    }

    ajaxCall('Form/StudentData', { 'model': model }, function (data) {

        $Img = GetStudentImage(data[0].Photo);

        $StudentName = data[0].FirstName + " " + data[0].LastName;
        $Country = data[0].CountryName;
        $ImgName = "<img src='" + $Img + "' class='img-fluid rounded avatar-50 mr-3' alt='image'>";

        $PaymentSchemeID = $("#cmbPayScheme").val();
        $PaymentScheme = $('#cmbPayScheme option:selected').text();

        $("#SponserStudentDetial").append(
            '<tr>' +
            '<td hidden>' + $StudentID + '</td>' +
            '<td><div class="d-flex align-items-center">' + $ImgName + '<div>' + $StudentName + '</div></div></td>' +
            '<td>' + $Country + '</td>' +
            '<td hidden>' + $PaymentSchemeID + '</td>' +
            '<td>' + $PaymentScheme + '</td>' +
            '<td>' + data[0].CurrentDate + '</td>' +
            '<td><a class="badge bg-warning mr-2 red" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" href="#"> <i class="ri-delete-bin-line mr-0"></i></a ></td>' +
            '</tr> ');
    });

    $('#SponserStudentID').val(0);
    $('#AddGrid').hide();

}

function AddToGrid(event) {

    var isAdded = false;

    var RowCount = document.getElementById("SponserStudentDetial").rows.length;
    var RowData = document.getElementById("SponserStudentDetial");

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
    }
    else {
        MsgBox('Error', 'Already Exists', '', false);
    }
}

var StudentSponser = function () {
    this.SponserID = 0,
        this.StudentID = 0,
        this.PaymentSchemeID = 0

    this.Fill = function (SponserID, StudentID) {
        this.SponserID = SponserID,
            this.StudentID = StudentID
    }
}

function Save() {

    MsgBox('Confirm', 'Do you want to Save ?', function () {

        var rowCount = document.getElementById("SponserStudentDetial").rows.length;
        var rowData = document.getElementById("SponserStudentDetial");

        if (rowCount > 0) {

            var lstStudentSponser = [];

            for (var i = 0; i < rowCount; i++) {

                var StudentSponserModel = new StudentSponser();

                StudentSponserModel.SponserID = $("#cmbSponser").val();
                StudentSponserModel.StudentID = rowData.rows[i].cells[0].innerHTML;
                StudentSponserModel.PaymentSchemeID = rowData.rows[i].cells[3].innerHTML;
                lstStudentSponser.push(StudentSponserModel);
            }

            var model = {
                lstStudents: lstStudentSponser
            }

            ajaxCall('Form/SaveSponserLinkedStudents', { 'model': model }, function (data) {

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

function FillStudentsBySponser() {

    var sponserID = $("#cmbSponser").val();
    if (sponserID > 0) {

        GetAllStudents();
        var model = {
            SponserID: sponserID
        }

        var rowData = document.getElementById("SponserStudentDetial");

        var table = document.getElementById("studentDetails");

        $("#SponserStudentDetial").find("tr").remove();

        ajaxCallWithoutAsync('Form/SponsersLinkedStudentData', { 'model': model }, function (data) {

            for (var j = 0; j < data.length; j++) {

                AddSavedStudentsToGrid(data[j].StudentID, data[j].LinkedOn, data[j].PaymentSchemeID, data[j].PaymentSchemeName);

            }
        });
    }
}

function AddSavedStudentsToGrid(studentid, linkedOn, paymentSchemeID, paymentSchemeName ) {

    var model = {
        StudentID: studentid,
        ViewTypeID: 2
    }

    ajaxCallWithoutAsync('Form/StudentData', { 'model': model }, function (data) {

        $Img = GetStudentImage(data[0].Photo);

        $StudentName = data[0].FirstName + " " + data[0].LastName;
        $Country = data[0].CountryName;
        $ImgName = "<img src='" + $Img + "' class='img-fluid rounded avatar-50 mr-3' alt='image'>";

        $("#SponserStudentDetial").append(
            '<tr>' +
            '<td hidden>' + studentid + '</td>' +
            '<td><div class="d-flex align-items-center">' + $ImgName + '<div>' + $StudentName + '</div></div></td>' +
            '<td>' + $Country + '</td>' +
            '<td hidden>' + paymentSchemeID + '</td>' +
            '<td>' + paymentSchemeName + '</td>' +
            '<td>' + linkedOn + '</td>' +
            '<td><a class="badge bg-warning mr-2 red" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" href="#"> <i class="ri-delete-bin-line mr-0"></i></a ></td>' +
            '</tr> ');
    });
}

function DeleteStudentFromSponser(studentid) {

    var sponserID = $("#cmbSponser").val();
    if (sponserID > 0) {

        var model = {
            SponserID: sponserID,
            StudentID: studentid
        }
        ajaxCall('Form/DeleteStudentFromSponser', { 'model': model }, function (data) {

            if (data.IsValid) {

            } else {

            }
        });

    }
}

function GetAllStudents() {

    $("#studentDetails").find("tr").remove();

    ajaxCallWithoutAsync('Form/GetSponserNotLinkedStudents', {}, function (data) {

        for (var i = 0; i < data.length; i++) {

            var model = {
                StudentID: data[i].StudentID,
                ViewTypeID: 2
            }
            ajaxCallWithoutAsync('Form/StudentData', { 'model': model }, function (data) {
                $Img = GetStudentImage(data[0].Photo);

                $StudentName = data[0].FirstName + " " + data[0].LastName;
                $Country = data[0].CountryName;
                $ImgName = "<img src='" + $Img + "' class='img-fluid rounded avatar-50 mr-3' alt='image'>";

                $("#studentDetails").append(
                    '<tr>' +
                    '<td hidden>' + data[0].StudentID + '</td>' +
                    '<td><div class="d-flex align-items-center">' + $ImgName + '<div>' + $StudentName + '</div></div></td>' +
                    '<td>' + data[0].GenderName + '</td>' +
                    '<td>' + data[0].CountryName + '</td>' +
                    '<td>' + data[0].SchoolName + '</td>' +
                    '<td><div class="d-flex align-items-center list-action"><a class= "badge badge-info mr-2" data -placement="top" title = "" data -original -title="View" data -toggle="modal" onclick = "GetStudent(' + data[0].StudentID + ')"><i class="ri-eye-line mr-0"></i></a> ' +
                    '<button type = "button" class= "btn btn-primary btn-sm mr-2" onclick = "AddToGrid(event)" > Add to Grid</button ></div ></td > ' +
                    '</tr> ');

            });
        }
    });
}
