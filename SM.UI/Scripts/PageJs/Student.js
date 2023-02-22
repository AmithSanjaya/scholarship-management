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

    $('#photo').change(function () {
        const file = this.files[0];
        console.log(file);
        if (file) {
            let reader = new FileReader();
            reader.onload = function (event) {
                console.log(event.target.result);
                $('#imgPreview').attr('src', event.target.result);
            }
            reader.readAsDataURL(file);
        }
    });

});

function ImageUpload(StudentID) {

    var formdata = new FormData();
    var fileInput = document.getElementById('photo');

    if (fileInput.files.length <= 0) {
        MsgBox('Error', 'Please upload the Image!', '', false);
        return false;
    }

    for (i = 0; i < fileInput.files.length; i++) {
        var fileType = fileInput.files[i].name.split('.').pop();
        if (fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png') {
            formdata.append(fileInput.files[i].name, fileInput.files[i]);
            formdata.append('StudentID', StudentID);
        }
        else {
            MsgBox('Error', 'File Type Not Supported..!', '', false);
            return false;
        }
    }

    var xhr = new XMLHttpRequest();
    var url = rootUrl + '/SM/Uploads/Student';
    xhr.open('POST', url);
    xhr.send(formdata);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("photo").value = '';
        }
    }
    return true;
}

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
        '<td><a class="badge bg-warning mr-2 red" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" href = "#" > <i class="ri-delete-bin-line mr-0"></i></a ></td>' +
        '</tr> ');
}

function Save() {

    var model = {};

    if (ValidateSave()) {
        MsgBox('Confirm', 'Do you want to Save ?', function () {

            var model = new Student();

            model.FirstName = $("#StudentFirstName").val();
            model.LastName = $("#StudentLastName").val();
            model.BirthDate = $("#StudentDateOfBirth").val();
            model.IsMale = $("#rbMGender").val();
            model.Address = $("#StudentAddress").val();
            model.City = $("#city").val();
            model.CountryID = $("#StudentCounty").val();
            model.ContactNo = $("#StudentContactNo").val();
            model.Email = $("#StudentEmail").val();
            model.NICNo = $("#StudentNIC").val();
            model.Photo = $("#").val();
            model.Grade = $("#CurrentGrade").val();
            model.SchoolName = $("#SclName").val();
            model.SchoolAddress = $("#SclAddress").val();
            model.HighestGradeInSchool = $("#HigestGrade").val();
            model.HighestEduAchievement = $("#HigestAchievement").val();
            model.AchievementMon = $("#AchievementMonth").val();
            model.AchievementYear = $("#AchievementMonth").val();
            model.RegisterDate = $("#RegisterDate").val();
            model.IsHaveOtherSchol = $("#rbSchol").val();
            model.NameOfFund = $("#NameOfFund").val();
            model.FundAmount = $("#FundAmount").val();
            model.Mode = 1;

            ajaxCall('Form/UpdateStudent', { 'model': model }, function (data) {

                if (data.IsValid) {
                    MsgBox('Info', data.SucessMessage, '', true);
                } else {
                    MsgBox('Error', data.ErrorMessage, '', false);
                }
            });
        }, true);
    }
}

var Student = function () {
    FirstName = "";
    LastName = "";
    BirthDate = "";
    IsMale = "";
    Address = "";
    City = "";
    CountryID = 0;
    ContactNo = "";
    Email = "";
    NICNo = "";
    Photo = "";
    Grade = "";
    SchoolName = "";
    SchoolAddress = "";
    HighestGradeInSchool = "";
    HighestEduAchievement = "";
    AchievementMon = 0;
    AchievementYear = 0;
    RegisterDate = "";
    IsHaveOtherSchol = "";
    NameOfFund = "";
    FundAmount = 0;
    Mode = 1;
}

function ValidateSave() {

    var msg = "";

    if ($('#StudentFirstName').val() == "") {
        msg = 'Please Select The Student First Name!';
    }
    else if ($('#StudentLastName').val() == "") {
        msg = 'Please Select The Student Last Name';
    }
    else if ($('#StudentCounty option:selected').index() < 0) {
        msg = 'Please Select The Student Country!';
    }
    else {
        msg = "";
    }

    if (msg === "") {
        return true;
    } else {
        MsgBox('Error', msg, '', false);
        return false;
    }
}