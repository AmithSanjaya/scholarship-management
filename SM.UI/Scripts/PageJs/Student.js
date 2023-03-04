$(document).ready(function () {

    $("#FundDIV").hide();
    $("#NumberDIV").hide();

    $("#StudentID").val(0);

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
        BindDropDown("StudentCounty", "CountryName", "CountryID", data);
    });

    $('#StudentCounty').selectpicker('refresh');
    $('#ExamType').selectpicker('refresh');
    $('#SubjectGrade').selectpicker('refresh');

    $('#btnAddToGrid').click(function () {
        AddToGrid();
    });
    $("#tblDetails").on("click", ".red", function () {
        $(this).closest("tr").remove();
    });

    $('#photo').change(function () {
        const file = this.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (event) {
                $('#imgPreview').attr('src', event.target.result);
            }
            reader.readAsDataURL(file);
        }
    });

    let searchParams = new URLSearchParams(window.location.search)

    if (searchParams.has('StudentID') == true) {

        let param = searchParams.get('StudentID');
        var model = {
            StudentID: param,
            ViewTypeID: 2
        }

        $("#StudentID").val(model.StudentID);
        $("h4.card-title").text('Edit Student');

        ajaxCall('Form/StudentData', { 'model': model }, function (data) {

            $('#StudentImgID').val(data[0].Photo);

            if (data[0].Photo == "") {
                $('#imgPreview').attr("src", "../assets/images/user/11.png");
            } else {
                $('#imgPreview').attr("src", "../Uploads/Student/" + data[0].ImageName);
            }

            $("#StudentFirstName").val(data[0].FirstName);
            $("#StudentLastName").val(data[0].LastName);
            $("#StudentDateOfBirth").val(data[0].DateOfBirth);
            $('#rbMGender').prop('checked', data[0].IsMale);
            $('#rbFGender').prop('checked', !data[0].IsMale);

            $("#StudentAddress").val(data[0].Address);
            $("#city").val(data[0].City);
            $("#StudentCounty").val(data[0].CountryID);

            $("#StudentNIC").val(data[0].NICNo);

            $("#SclName").val(data[0].SchoolName);
            $("#SclAddress").val(data[0].SchoolAddress);
            $("#CurrentGrade").val(data[0].Grade);
            $("#HigestGrade").val(data[0].HighestGradeInSchool);
            $("#HigestAchievement").val(data[0].HighestEduAchievement);
            $("#AchievementMonth").val(data[0].AchievementYear);
            $("#RegisterDate").val(data[0].RegisterFullDate);

            $('#rbSchol').prop('checked', data[0].IsHaveOtherSchol);
            $("#NameOfFund").val(data[0].NameOfFund);
            $("#FundAmount").val(data[0].FundAmount);

            //Exam Results
            $("#tableBody").empty();

            for (var i = 0; i < data.length; i++) {

                if (data[i].ExamTypeName != null) {
                    tr = $('<tr/>');
                    tr.append("<td hidden>" + data[i].StudentExamTypeID + "</td>")
                    tr.append("<td>" + data[i].ExamTypeName + "</td>")
                    tr.append("<td>" + data[i].Subject + "</td>")
                    tr.append("<td hidden>" + data[i].GradeID + "</td>")
                    tr.append("<td>" + data[i].GradeName + "</td>")
                    tr.append("<td><a class='badge bg-warning mr-2 red' data-toggle='tooltip' data-placement='top' title='' data-original-title='Delete' href='#'> <i class='ri-delete-bin-line mr-0'></i></a ></td>")
                    tr.append("</tr>")

                    $('#tblDetails').append(tr);
                }
            }

            $("#FatherName").val(data[0].FatherName);
            $("#FartherOccupation").val(data[0].FatherOccupation);
            $("#fatherAmount").val(data[0].FatherIncomeAmount);
            $("#MotherName").val(data[0].MotherName);
            $("#MotherOccupation").val(data[0].MotherOccupation);
            $("#MotherAmount").val(data[0].MotherIncomeAmount);
            $("#NoOfBrothers").val(data[0].NoOfBrothers);
            $("#NoOfSisters").val(data[0].NoOfSisters);
            $("#BrotherIncome").val(data[0].BrotherIncomeAmount);
            $("#SisterIncome").val(data[0].SisterIncomeAmount);

            $("#StudentContactNo").val(data[0].ContactNo);
            $("#StudentEmail").val(data[0].Email);
        });
    }

});

function ImageUpload(StudentID) {

    var fileInput = document.getElementById('photo');

    var formdata = new FormData();  

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
            
            if (model.StudentID !=0) {
                model.Mode = 2;
                model.Photo = $('#StudentImgID').val();
            }

            if ($('#photo').val() != "" && $('#photo').val() != null) {
                model.Photo = Date.now();
            }              

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

var FormValidate = function () {
    this.FieldName = "";
    this.FieldValue = "";
}

var Student = function () {

    this.StudentID = 0;
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
    this.ExamSubjects = [],
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
        this.StudentID = $("#StudentID").val() || 0;
        this.FirstName = $("#StudentFirstName").val();
        this.LastName = $("#StudentLastName").val();
        this.BirthDate = $("#StudentDateOfBirth").val();
        this.IsMale = $("input[name='rbGender']:checked").val() == 'M' ? 1 : 0;
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
        this.AchievementMon = $("#AchievementMonth").val().split("-", 2)[1];
        this.AchievementYear = $("#AchievementMonth").val().split("-", 2)[0];
        this.RegisterDate = $("#RegisterDate").val() || '-';
        this.IsHaveOtherSchol = $('#rbSchol').prop('checked');
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
            this.GradeID = GradeID
    }
}

function ValidateSave() {

    var msg = "";
    var lstMsg = [];

    var model = {
        MenuID: 9
    }

    ajaxCallWithoutAsync('Admin/FormValidate', { 'model': model }, function (data) {
        lstMsg = ValidateError(data);
    });

    if (lstMsg["Msg"] != "") {
        msg = lstMsg["Msg"];

        MsgBox('Error', msg, '', false);
        document.getElementById(lstMsg["FieldName"]).focus();

        return false;
    }


    return true;
}