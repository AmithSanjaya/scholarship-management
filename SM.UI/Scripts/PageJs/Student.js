$(document).ready(function () {

    $("#FundDIV").hide();
    $("#NumberDIV").hide();
    $("#InactiveDIV").hide();

    $("#ReasonForInactive").val("");

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

    $("#rbInactive").change(function () {
        if (this.checked) {
            $("#InactiveDIV").show();
        } else {
            $("#ReasonForInactive").val("");
            $("#InactiveDIV").hide();
        }
    });

    $("#BIncomeL").hide();
    $("#BrotherIncome").hide();
    $("#BrotherIncome").val(0);

    $("#rbBrotherEmployed").change(function () {
        if (this.checked) {
            $("#BIncomeL").show();
            $("#BrotherIncome").show();
        } else {
            $("#BIncomeL").hide();
            $("#BrotherIncome").hide();
            $("#BrotherIncome").val(0);
        }
    });

    $("#BIncomeS").hide();
    $("#SisterIncome").hide();
    $("#SisterIncome").val(0);

    $("#rbSisterEmployed").change(function () {
        if (this.checked) {
            $("#BIncomeS").show();
            $("#SisterIncome").show();
        } else {
            $("#BIncomeS").hide();
            $("#SisterIncome").hide();
            $("#SisterIncome").val(0);
        }
    });

    var model = {}
    ajaxCall('Form/StudentExamType', { 'model': model }, function (data) {
        BindDropDown("ExamType", "ExamTypeName", "StudentExamTypeID", data);
    });
    $('#ExamType').selectpicker('refresh');

    ajaxCall('Form/SubjectGrade', { 'model': model }, function (data) {
        BindDropDown("SubjectGrade", "GradeName", "GradeID", data);
    });
    $('#SubjectGrade').selectpicker('refresh');

    ajaxCall('Form/Country', { 'model': model }, function (data) {
        BindDropDown("StudentCounty", "CountryName", "CountryID", data);
    });
    $('#StudentCounty').selectpicker('refresh');

    ajaxCall('Form/District', { 'model': model }, function (data) {
        BindDropDown("StudentDistrict", "DistrictName", "DistictID", data);
    });
    $('#StudentDistrict').selectpicker('refresh');

    ajaxCall('Form/Race', { 'model': model }, function (data) {
        BindDropDown("StudentRace", "RaceName", "RaceID", data);
    });
    $('#StudentRace').selectpicker('refresh');

    ajaxCall('Form/Religion', { 'model': model }, function (data) {
        BindDropDown("StudentReligion", "ReligionName", "ReligionID", data);
    });
    $('#StudentReligion').selectpicker('refresh');

    ajaxCall('Form/BankBranch', { 'model': model }, function (data) {
        BindDropDown("StudentBank", "BankBranchName", "BankBranchID", data);
    });
    $('#StudentBank').selectpicker('refresh');

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

    FillStudent();
    FillStudentMode();
});

function FillStudentMode() {

    let searchParams = new URLSearchParams(window.location.search)

    if (searchParams.has('Mode') == true) {

        let param = searchParams.get('Mode');
        if (param == 1) {
            $("h4.ModeHead").text('Student Details (Pending Photo Uploads)');
        }
    }
}

function FillStudent() {

    let searchParams = new URLSearchParams(window.location.search)

    if (searchParams.has('StudentID') == true) {

        let param = searchParams.get('StudentID');
        var model = {
            StudentID: param,
            ViewTypeID: 2
        }

        $("#StudentID").val(model.StudentID);
        $("h4.FormHead").text('Edit Student');

        ajaxCall('Form/StudentData', { 'model': model }, function (data) {

            $Img = GetStudentImage(data[0].Photo);
            $('#imgPreview').attr("src", $Img);

            if ((data[0].Photo != "") && (data[0].Photo != null)) {
                $('#StudentImgID').val(data[0].Photo);
            }

            $("#StudentFirstName").val(data[0].FirstName);
            $("#StudentLastName").val(data[0].LastName);
            $("#StudentFullName").val(data[0].FullName);
            $("#StudentDateOfBirth").val(data[0].DateOfBirth);

            $('#rbMGender').prop('checked', data[0].IsMale);
            $('#rbFGender').prop('checked', !data[0].IsMale);

            $('#Photographpublished').prop('checked', data[0].Photographpublished);

            $("#StudentAddress").val(data[0].Address);

            $("#StudentCounty").val(data[0].CountryID);
            $('#StudentCounty').selectpicker('refresh');

            $("#StudentDistrict").val(data[0].DistictID);
            $('#StudentDistrict').selectpicker('refresh');

            $("#StudentRace").val(data[0].RaceID);
            $('#StudentRace').selectpicker('refresh');

            $("#StudentReligion").val(data[0].ReligionID);
            $('#StudentReligion').selectpicker('refresh');

            $("#StudentPollingDivision").val(data[0].PollingDivision);
            $("#StudentSecretariaDivision").val(data[0].DivisionalSecretariatDivision);

            $("#StudentNIC").val(data[0].NICNo);
            $('#rbInactive').prop('checked', !data[0].bIsActive);
            $('#rbInactive').trigger("change");

            $("#ReasonForInactive").val(data[0].InactiveReason);

            $("#SclName").val(data[0].SchoolName);
            $("#SclAddress").val(data[0].SchoolAddress);
            $("#DistancetoSchool").val(data[0].DistancetoSchool);

            $("#CurrentGrade").val(data[0].Grade);
            $("#HigestGrade").val(data[0].HighestGradeInSchool);
            $("#HigestAchievement").val(data[0].HighestEduAchievement);
            $("#AchievementMonth").val(data[0].AchievementYearMonth);
            $("#RegisterDate").val(data[0].RegisterFullDate);

            $('#rbSchol').prop('checked', data[0].IsHaveOtherSchol);
            $('#rbSchol').trigger("change");

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
            $("#StudentParents").val(data[0].ParentsAlive);

            $("#NoOfBrothers").val(data[0].NoOfBrothers);
            $("#NoOfSisters").val(data[0].NoOfSisters);
            $("#NoOfBrothersStudy").val(data[0].NoOfBrothersStudying);
            $("#NoOfSistersStudy").val(data[0].NoOfSistersStudying);
            $("#BrotherIncome").val(data[0].BrotherIncomeAmount);
            $("#SisterIncome").val(data[0].SisterIncomeAmount);

            $('#rbBrotherEmployed').prop('checked', data[0].AreAnyBrotherEmployed);
            $('#rbBrotherEmployed').trigger("change");

            $('#rbSisterEmployed').prop('checked', data[0].AreAnySisterEmployed);
            $('#rbSisterEmployed').trigger("change");

            $("#StudentContactNo").val(data[0].ContactNo);
            $("#StudentEmail").val(data[0].Email);
            $("#AccountName").val(data[0].AccountName);
            $("#AccountNo").val(data[0].AccountNo);

            $("#StudentBank").val(data[0].BankBranchID);
            $('#StudentBank').selectpicker('refresh');

            $("#DescribeWhyScholarship").val(data[0].DescribeWhyScholarship);
            $("#DescribeScholarshipFund").val(data[0].DescribeScholarshipFund);
            $("#DescribeFutureIntend").val(data[0].DescribeFutureIntend);

        });
    }
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

            if (UploadFile(1, 'photo', model.Photo, 'Student', false)) {

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
    this.FullName = "";
    this.BirthDate = "";
    this.IsMale = "";
    this.Address = "";
    this.DistictID = 0;
    this.CountryID = 0;
    this.RaceID = 0;
    this.ReligionID = 0;
    this.ContactNo = "";
    this.PollingDivision = "";
    this.DivisionalSecretariatDivision = "";
    this.Email = "";
    this.NICNo = "";
    this.bIsActive = "";
    this.InactiveReason = "";
    this.Photo = "";
    this.Grade = "";
    this.SchoolName = "";
    this.SchoolAddress = "";
    this.HighestGradeInSchool = "";
    this.HighestEduAchievement = "";
    this.DistancetoSchool = 0;
    this.AchievementMon = 0;
    this.AchievementYear = 0;
    this.RegisterDate = "";
    this.IsHaveOtherSchol = "";
    this.NameOfFund = "";
    this.FundAmount = 0;
    this.ExamSubjects = [];
    this.FatherName = "";
    this.FatherOccupation = "";
    this.FatherIncomeAmount = 0;
    this.MotherName = "";
    this.MotherOccupation = "";
    this.MotherIncomeAmount = "";
    this.ParentsAlive = "";
    this.NoOfBrothers = 0;
    this.NoOfSisters = 0;
    this.NoOfBrothersStudying = 0;
    this.NoOfSistersStudying = 0;
    this.AreAnyBrotherEmployed = "";
    this.AreAnySisterEmployed = "";
    this.BrotherIncomeAmount = 0;
    this.SisterIncomeAmount = 0;
    this.Photographpublished = "";
    this.AccountName = "";
    this.BankBranchID = 0;
    this.AccountNo = "";
    this.DescribeWhyScholarship = "";
    this.DescribeScholarshipFund = "";
    this.DescribeFutureIntend = "";

    Mode = 1;

    this.Fill = function () {

        this.StudentID = $("#StudentID").val() || 0;
        this.FirstName = $("#StudentFirstName").val();
        this.LastName = $("#StudentLastName").val();
        this.FullName = $("#StudentFullName").val();
        this.BirthDate = $("#StudentDateOfBirth").val();
        this.IsMale = $("input[name='rbGender']:checked").val() == 'M' ? 1 : 0;
        this.Address = $("#StudentAddress").val();
        this.DistictID = $("#StudentDistrict").val();
        this.CountryID = $("#StudentCounty").val();
        this.NICNo = $("#StudentNIC").val();
        this.Photo = $("#Photo").val();

        this.Photographpublished = $('#Photographpublished').prop('checked');

        this.PollingDivision = $("#StudentPollingDivision").val() || '-';
        this.DivisionalSecretariatDivision = $("#StudentSecretariaDivision").val() || '-';
        this.RaceID = $("#StudentRace").val();
        this.ReligionID = $("#StudentReligion").val();

        this.bIsActive = $('#rbInactive').prop('checked');

        this.bIsActive = $('#rbInactive').prop('checked');
        this.InactiveReason = $("#ReasonForInactive").val();

        this.ContactNo = $("#StudentContactNo").val() || '-';
        this.Email = $("#StudentEmail").val() || '-';

        this.Grade = $("#CurrentGrade").val() || '-';
        this.SchoolName = $("#SclName").val() || '-';
        this.SchoolAddress = $("#SclAddress").val() || '-';
        this.DistancetoSchool = $("#DistancetoSchool").val() || 0;
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
        this.NoOfBrothersStudying = $("#NoOfBrothersStudy").val() || 0;
        this.NoOfSistersStudying = $("#NoOfSistersStudy").val() || 0;

        this.BrotherIncomeAmount = $("#BrotherIncome").val() || 0;
        this.SisterIncomeAmount = $("#SisterIncome").val() || 0;

        this.AreAnyBrotherEmployed = $('#rbBrotherEmployed').prop('checked');
        this.AreAnySisterEmployed = $('#rbSisterEmployed').prop('checked');

        this.ParentsAlive = $("#StudentParents").val() || '-';

        this.AccountName = $("#AccountName").val();
        this.BankBranchID = $("#StudentBank").val();
        this.AccountNo = $("#AccountNo").val();

        this.DescribeWhyScholarship = $("#DescribeWhyScholarship").val() || '-';
        this.DescribeScholarshipFund = $("#DescribeScholarshipFund").val() || '-';
        this.DescribeFutureIntend = $("#DescribeFutureIntend").val() || '-';
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


        MsgBox('Error', msg, '', false);
        document.getElementById(lstMsg["FieldName"]).focus();

        return false;
    }
    else {
        var model = new Student();
        model.Fill();
        msg = "";

        model.Mode = 1;

        if (model.StudentID != 0) {
            model.Mode = 2;
        }

        ajaxCallWithoutAsync('Form/ValidateStudent', { 'model': model }, function (dataV) {
            if (dataV.length > 0) {
                msg = dataV[0].Message;
            }
        });

        if (msg != "") {
            MsgBox('Error', msg, '', false);

            return false;
        }
    }

    return true;
}