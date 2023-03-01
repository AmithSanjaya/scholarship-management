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

    var model = {}
    ajaxCall('Form/StudentExamType', { 'model': model }, function (data) {
        BindDropDown("ExamType", "ExamTypeName", "StudentExamTypeID", data);
    });

    ajaxCall('Form/SubjectGrade', { 'model': model }, function (data) {
        BindDropDown("SubjectGrade", "GradeName", "GradeID", data);
    });

    ajaxCall('Form/Country', { 'model': model }, function (data) {
        BindDropDownDefault("StudentCounty", "CountryName", "CountryID", data);
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

    if (fileInput.files.length > 0) {

        for (i = 0; i < fileInput.files.length; i++) {
            var fileType = fileInput.files[i].name.split('.').pop();
            if (fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png') {
                formdata.append(fileInput.files[i].name, fileInput.files[i]);
                formdata.append('StudentID', StudentID);
                formdata.append('UploadType', "Student");
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
                document.getElementById("photo").value = '';
            }
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
            model.Fill();

            model.Mode = 1;
            model.Photo = Date.now();

            if (ImageUpload(model.Photo)) {

                var rowCount = document.getElementById("tblDetails").rows.length;
                var rowData = document.getElementById("tblDetails");
                var lstSubject = [];

                for (var i = 1; i < rowCount; i++) {
                    var SubjectModel = new StudentSubject();

                    SubjectModel.StudentExamTypeID = rowData.rows[i].cells[0].innerHTML;
                    SubjectModel.Subject = rowData.rows[i].cells[2].innerHTML;
                    SubjectModel.GradeID = rowData.rows[i].cells[3].innerHTML;

                    lstSubject.push(SubjectModel);
                }

                model.lstSubject = lstSubject;

                ajaxCall('Form/UpdateStudent', { 'model': model }, function (data) {

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

var Student = function () {

    this.FirstName = "";
    this.LastName = "";
    this.BirthDate = "";
    this.IsMale = "";
    this.Address = "";
    this.City = "";
    this.CountryID = 0;
    this.ContactNo = "";
    this.Email = "";
    this.NICNo = "";
    this.Photo = "";
    this.Grade = "";
    this.SchoolName = "";
    this.SchoolAddress = "";
    this.HighestGradeInSchool = "";
    this.HighestEduAchievement = "";
    this.AchievementMon = 0;
    this.AchievementYear = 0;
    this.RegisterDate = "";
    this.IsHaveOtherSchol = "";
    this.NameOfFund = "";
    this.FundAmount = 0;
    this.ExamSubjects=[],
    this.FatherName = "",
    this.FatherOccupation = "",
    this.FatherIncomeAmount = 0,
    this.MotherName = "",
    this.MotherOccupation = "",
    this.MotherIncomeAmount = "",
    this.NoOfBrothers = 0,
    this.NoOfSisters = 0,
    this.BrotherIncomeAmount = 0,
    this.SisterIncomeAmount = 0

    Mode = 1;

    this.Fill = function () {
        this.FirstName = $("#StudentFirstName").val();
        this.LastName = $("#StudentLastName").val();
        this.BirthDate = $("#StudentDateOfBirth").val();
        this.IsMale = $("input[name='rbGender']:checked").val();
        this.Address = $("#StudentAddress").val();
        this.City = $("#city").val();
        this.CountryID = $("#StudentCounty").val();
        this.NICNo = $("#StudentNIC").val();
        this.Photo = $("#Photo").val();

        this.ContactNo = $("#StudentContactNo").val() || '-';
        this.Email = $("#StudentEmail").val() || '-';

        this.Grade = $("#CurrentGrade").val() || '-';
        this.SchoolName = $("#SclName").val() || '-';
        this.SchoolAddress = $("#SclAddress").val() || '-';
        this.HighestGradeInSchool = $("#HigestGrade").val() || '-';
        this.HighestEduAchievement = $("#HigestAchievement").val() || '-';
        this.AchievementMon = $("#AchievementMonth").val().split("-",2)[1];
        this.AchievementYear = $("#AchievementMonth").val().split("-", 2)[0];
        this.RegisterDate = $("#RegisterDate").val() || '-';
        this.IsHaveOtherSchol = $("#rbSchol").val() || 0;
        this.NameOfFund = $("#NameOfFund").val() || '-';
        this.FundAmount = $("#FundAmount").val() || 0;

        this.FatherName = $("#FatherName").val() || '-';
        this.FatherOccupation = $("#FartherOccupation").val() || '-';
        this.FatherIncomeAmount = $("#fatherAmount").val() || 0;
        this.MotherName = $("#MotherName").val() || '-';
        this.MotherOccupation = $("#MotherOccupation").val() || '-';
        this.MotherIncomeAmount = $("#MotherAmount").val() || 0;
        this.NoOfBrothers = $("#NoOfBrothers").val() || 0;
        this.NoOfSisters = $("#NoOfSisters").val() || 0;
        this.BrotherIncomeAmount = $("#BrotherIncome").val() || 0;
        this.SisterIncomeAmount = $("#SisterIncome").val() || 0;
    }
}

var StudentSubject = function () {
    this.StudentExamTypeID = 0,
    this.Subject = "",
    this.GradeID = 0

    this.Fill = function (StudentExamTypeID, Subject, GradeID) {
        this.StudentExamTypeID = StudentExamTypeID,
        this.Subject = Subject,
        this.GradeID=GradeID
    }
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


        MsgBox('Error', msg, '', false);
        return false;
    }
}