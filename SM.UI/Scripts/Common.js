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

function GetStudent(StudentPassID) {

    $('#smodel').modal();

    var model = {
        StudentID: StudentPassID,
        ViewTypeID: 2
    }

    $('#PhotographPublish').hide();

    ajaxCall('Form/StudentData', { 'model': model }, function (data) {

        $("h4.mb-1").text(data[0].FullName);

        if (data[0].bIsActive == true) {
            $("#StudentStatus").removeClass("btn btn-danger");
            $("#StudentStatus").addClass("btn btn-success");
            $("#StudentStatus").text("Active");
        } else {
            $("#StudentStatus").removeClass("btn btn-success");
            $("#StudentStatus").addClass("btn btn-danger");
            $("#StudentStatus").text("Inactive");
        }

        $Img = GetStudentImage(data[0].Photo);
        $('img.StudentImg').attr("src", $Img);

        $('p.StudentCity').text(data[0].DistrictName + ', ' + data[0].CountryName);
        $('p.StudentBirthDay').text(data[0].DateOfBirth + ' (' + data[0].Age+'y)');
        $('p.StudentContactNo').text(data[0].ContactNo);
        $('p.StudentEmail').text(data[0].Email);
        $('p.StudentRace').text(data[0].RaceName + ', ' + data[0].ReligionName);

        $('p.PollingDivision').text(data[0].PollingDivision);
        $('p.DivisionalSecretariatDivision').text(data[0].DivisionalSecretariatDivision);

        if (data[0].Photographpublished == false) {
            $('#PhotographPublish').show();
        }

        $BankDetails = data[0].AccountName + "<br>A/C : " + data[0].AccountNo + "<br>" + data[0].BankBranchName;    

        $('td.StudentGender').text(data[0].GenderName);
        $('td.StudentNIC').text(data[0].NICNo);
        $('td.StudentAddress').text(data[0].Address);
        $('td.BankAccount').html($BankDetails);

        $('td.StudentSchool').text(data[0].SchoolName);
        $('td.SchoolAddress').text(data[0].SchoolAddress);
        $('td.Distancetoschool').text(data[0].DistancetoSchool+" km");

        $('td.StudentGrade').text(data[0].Grade);
        $('td.StudentHighestGrade').text(data[0].HighestGradeInSchool);
        $('td.StudentHighestAchievement').text(data[0].HighestEduAchievement);
        $('td.StudentAchievementYearMonth').text(data[0].AchievementYear);
        $('td.StudentRegisterDate').text(data[0].RegisterFullDate);

        $('td.StudentHaveScholarship').text(data[0].HaveOtherSchol);
        $('td.StudentFundName').text(data[0].NameOfFund);
        $('td.StudentFundAmount').text(data[0].FundAmount);

        //Exam Results
        $("#tbodyid").empty();

        for (var i = 0; i < data.length; i++) {

            if (data[i].ExamTypeName != null) {
                tr = $('<tr/>');
                tr.append("<td>" + data[i].ExamTypeName + "</td>")
                tr.append("<td>" + data[i].Subject + "</td>")
                tr.append("<td>" + data[i].GradeName + "</td>")
                tr.append("</tr>")

                $('#tblExam').append(tr);
            }
        }

        $('td.StudentFatherName').text(data[0].FatherName);
        $('td.StudentFatherOccupation').text(data[0].FatherOccupation);
        $('td.StudentFatherIncome').text(data[0].FatherIncomeAmount);
        $('td.StudentMotherName').text(data[0].MotherName);
        $('td.StudentMotherOccupation').text(data[0].MotherOccupation);
        $('td.StudentMotherIncome').text(data[0].MotherIncomeAmount);
        $('td.StudentNoBrothers').text(data[0].NoOfBrothers);
        $('td.StudentBrotherIncome').text(data[0].BrotherIncomeAmount);
        $('td.StudentNoSisters').text(data[0].NoOfSisters);
        $('td.StudentBSisterIncome').text(data[0].SisterIncomeAmount);

        $('td.ParentsAlive').text(data[0].ParentsAlive);

        //Achievement Data
        $("#AchievementData").empty();

        var modelAchievement = {
            StudentID: StudentPassID
        }

        ajaxCall('Form/StudentAchievementData', { 'model': modelAchievement }, function (data) {

            if (data.length > 0) {

                $div = "<ul class='list-inline p-0 m-0 w-100'>";

                for (var i = 0; i < data.length; i++) {

                    $div += "<li>";
                    $div += "<div class='row align-items-top'>";
                    if (i == (data.length - 1)) {
                        $div += "<div class='col-3'>";
                    } else {
                        $div += "<div class='col-md-3'>";
                    }
                    $div += "<h6 class='mb-2'>" + data[i].EffectiveDateName + "</h6>";
                    $div += "</div>";
                    if (i == (data.length - 1)) {
                        $div += "<div class='col-9'>";
                        $div += "<div class='media profile-media pb-0 align-items-top'>";
                    } else {
                        $div += "<div class='col-md-9'>";
                        $div += "<div class='media profile-media align-items-top'>";
                    }
                    $div += "<div class='profile-dots border-primary mt-1'></div>";
                    $div += "<div class='ml-4'>";
                    $div += "<h6 class='mb-1'>" + data[i].AchievementTitle + "</h6>";
                    $div += "<p class='mb-0 font-size-14'>" + data[i].AchievementName + "</p>";
                    $div += "</div>";
                    $div += "</div>";
                    $div += "</div>";
                    $div += "</div>";
                    $div += "</li>";

                }

                $div += "</ul>";
                $('#AchievementData').append($div);
            }
        });

    });

}

function GetStudentImage(Img) {

    if (Img == "" || Img == null) {
        $Img = "../assets/images/user/11.png";
    } else {
        $Img = "../Uploads/Student/" + Img +".jpg";
    }

    return $Img;

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

function GetSponser(SponserPassID) {

    $('#sponsermodel').modal();

    var model = {
        SponserID: SponserPassID,
        ViewTypeID: 2
    }

    ajaxCall('SM/SponserData', { 'model': model }, function (data) {

        $("h4.mb-1").text(data[0].SponserName);

        $('td.SponcerContactNo').text(data[0].ContactNo);
        $('td.SponcerEmail').text(data[0].Email);
        $('td.SponcerAddress').text(data[0].SponserAddress);
        $('td.SponcerCountry').text(data[0].CountryName);
        $('td.SponcerPayTerm').text(data[0].PaymentSchemeName);

    });

}

function GetUserProfile(userID) {

    $('#usermodel').modal();

    var model = {
        UserID: userID,
        ViewTypeID: 2
    }

    ajaxCall('Admin/UsersData', { 'model': model }, function (data) {

        $("h4.mb-1").text(data[0].UserName);
        document.getElementById("userRole").innerHTML = 'User Role: ' + data[0].UserRoleName;
        document.getElementById("fbURL").innerHTML = 'Facebook Url: ' + data[0].FacebookUrl;
        $('td.UserFullName').text(data[0].FirstName + ' ' + data[0].LastName);
        $('td.UserContactNo').text(data[0].MobileNo);
        $('td.UserEmail').text(data[0].Email);
        $('td.UserCountry').text(data[0].CountryName);
        $('td.UserCreatedOn').text(data[0].EnteredDate);

    });

}

function GetStudentProgressPDF(FileID) {

    var site = rootUrl + 'Uploads/StudentProgress/' + FileID+'.pdf';
    document.getElementById('IframID').src = site;

    $('#PDFModel').modal({ backdrop: 'static', keyboard: true });

}

function UploadFile(UploadFileType, FileName, FileID, UploadType, Required = false) {

    //UploadFileType
    //1 - Images
    //2 - Pdf

    var fileInput = document.getElementById(FileName);

    var formdata = new FormData();

    if (Required) {
        if ((fileInput.files.length > 0)) {

            for (i = 0; i < fileInput.files.length; i++) {

                var fileType = fileInput.files[i].name.split('.').pop();

                if (((UploadFileType == 2) & (fileType === 'pdf')) ||
                    ((UploadFileType == 1) & (fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png'))) {

                    formdata.append(fileInput.files[i].name, fileInput.files[i]);
                    formdata.append('FileID', FileID);
                    formdata.append('UploadType', UploadType);
                }
                else {
                    MsgBox('Error', 'File Type Not Supported..!', '', false);
                    return false;
                }
            }

            var xhr = new XMLHttpRequest();
            var url = rootUrl + '/Admin/Upload';
            xhr.open('POST', url);
            xhr.send(formdata);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    document.getElementById(FileName).value = '';
                }
            }

            return true;
        }
        else {
            MsgBox('Error', 'File Type Not Uploaded..!', '', false);
            return false;
        }
    }
    return true;
}