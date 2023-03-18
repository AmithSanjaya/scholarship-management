let currentRow = '';
$(document).ready(function () {
    
    FillStudent();
    $('#PreviewStudent').hide();
    $('#PreviewSponser').hide();

    $('#cmbStudent').on('change', function () {
        if ($('#cmbStudent').val() != -1) {
            $('#PreviewStudent').show();
            $('#PreviewSponser').show();
            FillStudentLinkedSponser();
            FillGrid();

        } else {
            $('#PreviewStudent').hide();
            $('#PreviewSponser').hide();
        }
    });

    $("#PreviewStudent").on("click", function () {
        GetStudent($('#cmbStudent').val());
    });

    $("#PreviewSponser").on("click", function () {
        //$('#CommonModel').modal();
        GetSponser($('#StudentSponserID').val());
    });
    var date;
    var d = new Date(date);
    date = [
        d.getFullYear(),
        ('0' + (d.getMonth() + 1)).slice(-2),
        ('0' + d.getDate()).slice(-2)
    ].join('-');
    
    document.getElementById("EffectiveDate").value = format(new Date(), 'yyyy-MM-dd');

    $("#StudentAchievementDetail").on("click", ".red", function () {

        var row = $(this).closest('tr');
        var id = $(this).closest('tr').children('td:eq(0)').text();
        MsgBox('Confirm', 'Do you want to Remove this Record ?', function () {            
            row.remove();            
        }, true);
    });
    $("#StudentAchievementDetail").on("click", ".editgriditem", function () {
        currentRow = '';
        var row = $(this).closest('tr');
        var id = $(this).closest('tr').children('td:eq(0)').text();
        MsgBox('Confirm', 'Do you want to Edit this Record ?', function () {
            
            currentRow = row;
            //alert(row);

            $('#StudentAchievementTitle').val(currentRow.closest('tr').children('td:eq(2)').text());
            $('#StudentAchievementDesc').val(currentRow.closest('tr').children('td:eq(3)').text());
            if (currentRow.closest('tr').children('td:eq(4)').text() == 'Yes') {
                document.getElementById("rbSchol").checked = true;
            }
            if (currentRow.closest('tr').children('td:eq(4)').text() == 'No') {
                document.getElementById("rbSchol").checked = false;
            }
            document.getElementById("EffectiveDate").value = currentRow.closest('tr').children('td:eq(5)').text();
        }, true);
    });
    
});


format = function date2str(x, y) {
    var z = {
        M: x.getMonth() + 1,
        d: x.getDate(),
        h: x.getHours(),
        m: x.getMinutes(),
        s: x.getSeconds()
    };
    y = y.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
        return ((v.length > 1 ? "0" : "") + z[v.slice(-1)]).slice(-2)
    });

    return y.replace(/(y+)/g, function (v) {
        return x.getFullYear().toString().slice(-v.length)
    });
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


function FillStudentLinkedSponser() {
    $StudentID = $('#cmbStudent').val();

    var model = {
        StudentID: $StudentID
    }
    $('#StudentSponserID').val(0);
    ajaxCall('Form/StudentDataofSponserLinked', { 'model': model }, function (data) {
        if (data.length <= 0) {
            alert('This Student not Linked to a Sponser');
        }
        else {
            for (var i = 0; i < data.length; i++) {
                $('#StudentSponserID').val(data[0].SponserID);
            }
        }
    });
}

function FillStudent() {

    var model = {
        StudentID: 0,
        ViewTypeID: 1
    }
    ajaxCall('Form/StudentData', { 'model': model }, function (data) {
        BindDropDown("cmbStudent", "StudentName", "StudentID", data);
    });
    $('#cmbStudent').selectpicker('refresh');
}

function FillGrid() {

    $StudentID = $('#cmbStudent').val();

    var model = {
        StudentID: $StudentID
    }
    $("#StudentAchievementDetail").find("tr").remove();

    ajaxCall('Form/StudentAchievementData', { 'model': model }, function (data) {

        for (var i = 0; i < data.length; i++) {
            $StudentAchievementID = data[i].StudentAchievementID;
            $AchievementTitle = data[i].AchievementTitle;
            $AchievementName = data[i].AchievementName;
            $EmailSendName = data[i].EmailSendName;
            $AddedDate = data[i].EffectiveDateName;

            $("#StudentAchievementDetail").append(
                '<tr>' +
                '<td hidden>' + $StudentID + '</td>' +
                '<td hidden>' + $StudentAchievementID + '</td>' +
                '<td>' + $AchievementTitle + '</td>' +
                '<td>' + $AchievementName + '</td>' +
                '<td>' + $EmailSendName + '</td>' +
                '<td>' + $AddedDate + '</td>' +
                '<td>' +
                '<a class="badge bg-success mr-2 editgriditem" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit" href="#"> <i class="ri-pencil-line mr-0"></i></a >' +
                '<a class="badge bg-warning mr-2 red" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" href="#"> <i class="ri-delete-bin-line mr-0"></i></a >' +
                '</td > ' +
                '</tr> ');
        }
    });
}

function AddtoGrid() {

    var isAdded = false;
    var RowCount = document.getElementById("StudentAchievementDetail").rows.length;
    var RowData = document.getElementById("StudentAchievementDetail");    

    $StudentID = $('#cmbStudent').val();
    $StudentAchievementID = 0;
    $AchievementTitle = $('#StudentAchievementTitle').val();
    $AchievementName = $('#StudentAchievementDesc').val();
    $EmailSendName = 'Yes';
    if (document.getElementById("rbSchol").checked == false) {
        $EmailSendName = 'No';
    }
    $AddedDate = document.getElementById("EffectiveDate").value;

    if ($StudentID == '' || $StudentID <= 0) {
        MsgBox('Error', 'Please Select the Student', '', false);
        return;
    }
    if ($AchievementTitle == '' || $AchievementTitle == undefined) {
        MsgBox('Error', 'Please Enter the Achievement Title', '', false);
        return;
    }
    if ($AchievementName == '' || $AchievementName == undefined) {
        MsgBox('Error', 'Please Enter the Achievement Description', '', false);
        return;
    }

    if (currentRow == '' || currentRow == undefined) {
        isAdded = false;
    }
    else {
        isAdded = true;
    }
    if (isAdded === false) {
        

        $("#StudentAchievementDetail").append(
            '<tr>' +
            '<td hidden>' + $StudentID + '</td>' +
            '<td hidden>' + $StudentAchievementID + '</td>' +
            '<td>' + $AchievementTitle + '</td>' +
            '<td>' + $AchievementName + '</td>' +
            '<td>' + $EmailSendName + '</td>' +
            '<td>' + $AddedDate + '</td>' +
            '<td>' +
            '<a class="badge bg-success mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit" href="#"> <i class="ri-pencil-line mr-0"></i></a >' +
            '<a class="badge bg-warning mr-2 red" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" href="#"> <i class="ri-delete-bin-line mr-0"></i></a >' +
            '</td > ' +
            '</tr> ');

        $('#StudentAchievementTitle').val('');
        $('#StudentAchievementDesc').val('');
        document.getElementById("rbSchol").checked = true;
        document.getElementById("EffectiveDate").value = format(new Date(), 'yyyy-MM-dd');
    }
    else {
        //MsgBox('Error', 'Already Exists', '', false);
        //alert(currentRow);
        currentRow.closest('tr').children('td:eq(2)').text($AchievementTitle);
        currentRow.closest('tr').children('td:eq(3)').text($AchievementName);
        if (document.getElementById("rbSchol").checked) {
            currentRow.closest('tr').children('td:eq(4)').text('Yes');
        }
        if (!document.getElementById("rbSchol").checked) {
            currentRow.closest('tr').children('td:eq(4)').text('No');
        }
        currentRow.closest('tr').children('td:eq(5)').text(document.getElementById("EffectiveDate").value);
        var editedRow = currentRow;
        currentRow.remove();
        currentRow = '';

        $("#StudentAchievementDetail").append(editedRow);

        $('#StudentAchievementTitle').val('');
        $('#StudentAchievementDesc').val('');
        document.getElementById("rbSchol").checked = true;
        document.getElementById("EffectiveDate").value = format(new Date(), 'yyyy-MM-dd');
    }
}

var StudentAchievement = function () {    
    this.StudentID = 0,
        this.StudentAchievementID = 0,
        this.AchievementTitle = '',
        this.AchievementName = '',
        this.EmailSend = '',
        this.strEffectiveDate = '';    
}

function Save() {

    MsgBox('Confirm', 'Do you want to Save ?', function () {

        var rowCount = document.getElementById("StudentAchievementDetail").rows.length;
        var rowData = document.getElementById("StudentAchievementDetail");

        if (rowCount > 0) {

            var lstStudentAchievement = [];

            for (var i = 0; i < rowCount; i++) {

                var StudentAchievementModel = new StudentAchievement();
                
                StudentAchievementModel.StudentID = rowData.rows[i].cells[0].innerHTML;
                StudentAchievementModel.StudentAchievementID = rowData.rows[i].cells[1].innerHTML;
                StudentAchievementModel.AchievementTitle = rowData.rows[i].cells[2].innerHTML;
                StudentAchievementModel.AchievementName = rowData.rows[i].cells[3].innerHTML;
                if (rowData.rows[i].cells[4].innerHTML == 'Yes') {
                    StudentAchievementModel.EmailSend = true;
                }
                if (rowData.rows[i].cells[4].innerHTML == 'No') {
                    StudentAchievementModel.EmailSend = false;
                }
                StudentAchievementModel.strEffectiveDate = rowData.rows[i].cells[5].innerHTML;
                lstStudentAchievement.push(StudentAchievementModel);
            }

            var model = {
                lstStudentAchievements: lstStudentAchievement
            }

            ajaxCall('Form/SaveStudentAchievements', { 'model': model }, function (data) {

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