$(document).ready(function () {
    $("#SponserStudentDetial").on("click", ".red", function () {
        $(this).closest("tr").remove();
    });

    FillSponser();
});

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

        var model = {
            StudentID: $StudentID,
            ViewTypeID: 2
        }

        ajaxCall('Form/StudentData', { 'model': model }, function (data) {

            if (data[0].Photo == "" || data[0].Photo == null) {
                $Img = "../assets/images/user/11.png";
            } else {
                $Img = "../Uploads/Student/" + data[0].ImageName;
            }

            $StudentName = data[0].FirstName + " " + data[0].LastName;
            $Country = data[0].CountryName;
            $ImgName = "<img src='" + $Img + "' class='img-fluid rounded avatar-50 mr-3' alt='image'>";

            $("#SponserStudentDetial").append(
                '<tr>' +
                '<td hidden>' + $StudentID + '</td>' +
                '<td><div class="d-flex align-items-center">' + $ImgName + '<div>' + $StudentName + '</div></div></td>' +
                '<td>' + $Country + '</td>' +
                '<td>' + data[0].CurrentDate + '</td>' +
                '<td><a class="badge bg-warning mr-2 red" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" href="#"> <i class="ri-delete-bin-line mr-0"></i></a ></td>' +
                '</tr> ');
        });
    }
    else {
        MsgBox('Error', 'Already Exists', '', false);
    }
}


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

function SaveSponserApplication() {

    MsgBox('Confirm', 'Do you want to Save ?', function () {

        var rowCount = document.getElementById("SponserStudentDetial").rows.length;
        var rowData = document.getElementById("SponserStudentDetial");

        if (rowCount > 0) {

            var lstStudentSponser = [];

            for (var i = 0; i < rowCount; i++) {
                debugger;
                var StudentSponserModel = new StudentSponser();

                StudentSponserModel.SponserID = $("#cmbSponser").val();
                StudentSponserModel.StudentID = rowData.rows[i].cells[0].innerHTML;
                //alert(StudentSponserModel.SponserID);
                lstStudentSponser.push(StudentSponserModel);
            }

            var model = {
                lstStudents: lstStudentSponser
            }

            ajaxCall('Form/SaveSponserApplication', { 'model': model }, function (data) {

                if (data.IsValid) {
                    MsgBox('Info', data.SucessMessage, '', true);
                    location.reload();
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

var StudentSponser = function () {
    this.SponserID = 0,
        this.StudentID = 0

    this.Fill = function (SponserID, StudentID) {
        this.SponserID = SponserID,
            this.StudentID = StudentID
    }
}


function FillStudentsBySponser() {

    var sponserID = $("#cmbSponser").val();
    if (sponserID > 0) {

        var model = {
            SponserID: sponserID
        }
        ///debugger;
        //var rowCount = document.getElementById("SponserStudentDetial").rows.length;
        var rowData = document.getElementById("SponserStudentDetial");

        var table = document.getElementById("studentDetails");        

        $("#SponserStudentDetial").find("tr").remove();

        ajaxCallWithoutAsync('Form/SponsersApplicationStudentData', { 'model': model }, function (data) {

            for (var j = 0; j < data.length; j++) {
                debugger;
                var rowCount = document.getElementById("studentDetails").rows.length;
                for (var i = 0; i < rowCount; i++) {
                    if (table.rows[i].cells[0].innerHTML == data[j].StudentID) {
                        //alert(data[j].StudentID);
                        AddSavedStudentsToGrid(data[j].StudentID);                        
                        table.deleteRow(i);
                        break;
                    }                    
                }
            }
        });        
    }
}


function AddSavedStudentsToGrid(studentid) {
    //debugger;
    var model = {
        StudentID: studentid,
        ViewTypeID: 2
    }

    ajaxCallWithoutAsync('Form/StudentData', { 'model': model }, function (data) {
        //debugger;
        if (data[0].Photo == "" || data[0].Photo == null) {
            $Img = "../assets/images/user/11.png";
        } else {
            $Img = "../Uploads/Student/" + data[0].ImageName;
        }

        $StudentName = data[0].FirstName + " " + data[0].LastName;
        $Country = data[0].CountryName;
        $ImgName = "<img src='" + $Img + "' class='img-fluid rounded avatar-50 mr-3' alt='image'>";

        $("#SponserStudentDetial").append(
            '<tr>' +
            '<td hidden>' + studentid + '</td>' +
            '<td><div class="d-flex align-items-center">' + $ImgName + '<div>' + $StudentName + '</div></div></td>' +
            '<td>' + $Country + '</td>' +
            '<td>' + data[0].CurrentDate + '</td>' +
            '<td><a class="badge bg-warning mr-2 red" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" href="#"> <i class="ri-delete-bin-line mr-0"></i></a ></td>' +
            '</tr> ');
    });
}