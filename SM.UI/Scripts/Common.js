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

    ajaxCall('Form/StudentData', { 'model': model }, function (data) {

        $("h4.mb-1").text(data[0].StudentName);

        $Img = GetStudentImage(data[0].Photo);
        $('img.StudentImg').attr("src", $Img);

        $('p.StudentCity').text(data[0].City + ', ' + data[0].CountryName);
        $('p.StudentBirthDay').text(data[0].DateOfBirth);
        $('p.StudentContactNo').text(data[0].ContactNo);
        $('p.StudentEmail').text(data[0].Email);

        $('td.StudentGender').text(data[0].GenderName);
        $('td.StudentNIC').text(data[0].NICNo);
        $('td.StudentAddress').text(data[0].Address);

        $('td.StudentSchool').text(data[0].SchoolName);
        $('td.SchoolAddress').text(data[0].SchoolAddress);
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