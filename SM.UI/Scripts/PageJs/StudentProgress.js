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
        GetSponser($('#StudentSponserID').val());
    });

    document.getElementById("EffectiveMonth").value = format(new Date(), 'yyyy-MM-dd');

    $("#StudentProgress").on("click", ".editgriditem", function () {
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
            document.getElementById("EffectiveMonth").value = currentRow.closest('tr').children('td:eq(5)').text();
        }, true);
    });

    $('#customFile').change(function (event) {
        //var tmppath = URL.createObjectURL(event.target.files[0]);
        //alert(tmppath);
        //$("img").fadeIn("fast").attr('src', tmppath);
    });
});

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

function ResetFileInput() {
    var $el = $('#customFile');
    $el.wrap('<form>').closest(
        'form').get(0).reset();
    $el.unwrap();
}
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
    $("#StudentProgress").find("tr").remove();
    $ProgressFile = "<a data-toggle='tooltip' data-placement='top' data-original-title='View Attchment' href='#' onclick = 'GetStudentProgressPDF(0)'><img src='../assets/images/page-img/viewpdf.png' height='36'></a>";
    ajaxCall('Form/StudentProgressData', { 'model': model }, function (data) {

        for (var i = 0; i < data.length; i++) {        

            $("#StudentProgress").append(
                '<tr>' +
                '<td hidden>' + data[i].StudentID + '</td>' +
                '<td hidden>' + data[i].StudentProgressID + '</td>' +
                '<td>' + data[i].ProgressTitle + '</td>' +
                '<td>' + $ProgressFile + '</td>' +
                '<td>' + data[i].EmailSendName + '</td>' +
                '<td>' + data[i].EffectiveMonth + '</td>' +                
                '<td hidden>' + data[i].ProgressFileName + '</td>' +
                '<td hidden>' + data[i].FilePath + '</td>' +
                '<td hidden>' + '' + '</td>' +
                '<td>' +
                '<a class="badge bg-success mr-2 editgriditem" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit" href="#"> <i class="ri-pencil-line mr-0"></i></a >' +
                '<a class="badge bg-warning mr-2 red" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" href="#"> <i class="ri-delete-bin-line mr-0"></i></a >' +
                '</td > ' +
                '</tr> ');
        }
    });
}


function FillGridttt() {

    $StudentID = $('#cmbStudent').val();

    var model = {
        StudentID: $StudentID
    }
    $("#StudentAchievementDetail").find("tr").remove();

    $StudentProgressID = 0;
    $ProgressTitle = "Test";
    $ProgressFile = "<a data-toggle='tooltip' data-placement='top' data-original-title='View Attchment' href='#' onclick = 'GetStudentProgressPDF(0)'><img src='../assets/images/page-img/viewpdf.png' height='36'></a>";
    $EmailSendName = "Yes";
    $EffectiveMonth = "2023-Mar";

    $("#StudentProgress").append(
        '<tr>' +
        '<td hidden>' + $StudentID + '</td>' +
        '<td hidden>' + $StudentProgressID + '</td>' +
        '<td>' + $ProgressTitle + '</td>' +
        '<td>' + $ProgressFile + '</td>' +
        '<td>' + $EmailSendName + '</td>' +
        '<td>' + $EffectiveMonth + '</td>' +
        '<td>' +
        '<a class="badge bg-success mr-2 editgriditem" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit" href="#"> <i class="ri-pencil-line mr-0"></i></a >' +
        '<a class="badge bg-warning mr-2 red" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" href="#"> <i class="ri-delete-bin-line mr-0"></i></a >' +
        '</td > ' +
        '</tr> ');

    //ajaxCall('Form/StudentAchievementData', { 'model': model }, function (data) {

    //    for (var i = 0; i < data.length; i++) {
    //        $StudentAchievementID = data[i].StudentAchievementID;
    //        $AchievementTitle = data[i].AchievementTitle;
    //        $AchievementName = data[i].AchievementName;
    //        $EmailSendName = data[i].EmailSendName;
    //        $AddedDate = data[i].EffectiveDateName;

    //        $("#StudentAchievementDetail").append(
    //            '<tr>' +
    //            '<td hidden>' + $StudentID + '</td>' +
    //            '<td hidden>' + $StudentAchievementID + '</td>' +
    //            '<td>' + $AchievementTitle + '</td>' +
    //            '<td>' + $AchievementName + '</td>' +
    //            '<td>' + $EmailSendName + '</td>' +
    //            '<td>' + $AddedDate + '</td>' +
    //            '<td>' +
    //            '<a class="badge bg-success mr-2 editgriditem" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit" href="#"> <i class="ri-pencil-line mr-0"></i></a >' +
    //            '<a class="badge bg-warning mr-2 red" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" href="#"> <i class="ri-delete-bin-line mr-0"></i></a >' +
    //            '</td > ' +
    //            '</tr> ');
    //    }
    //});
}

function AddtoGrid() {

    var isAdded = false;
    var RowCount = document.getElementById("StudentProgress").rows.length;
    var RowData = document.getElementById("StudentProgress");

    $StudentID = $('#cmbStudent').val();
    $StudentProgressID = 0;
    $ProgressTitle = $('#StudentAchievementTitle').val();
    $EffectiveMonth = $('#EffectiveMonth').val();
    $ProgressFile = "<a data-toggle='tooltip' data-placement='top' data-original-title='View Attchment' href='#' onclick = 'GetStudentProgressPDF(0)'><img src='../assets/images/page-img/viewpdf.png' height='36'></a>";
    $EmailSendName = 'Yes';
    if (document.getElementById("rbSchol").checked == false) {
        $EmailSendName = 'No';
    }    

    if ($StudentID == '' || $StudentID <= 0) {
        MsgBox('Error', 'Please Select the Student', '', false);
        return;
    }
    if ($ProgressTitle == '' || $ProgressTitle == undefined) {
        MsgBox('Error', 'Please Enter the Achievement Title', '', false);
        return;
    }
    if ($EffectiveMonth == '' || $EffectiveMonth == undefined) {
        MsgBox('Error', 'Please Enter the Month', '', false);
        return;
    }

    if (currentRow == '' || currentRow == undefined) {
        isAdded = false;
    }
    else {
        isAdded = true;
    }
    if (isAdded === false) {


        $("#StudentProgress").append(
            '<tr>' +
            '<td hidden>' + $StudentID + '</td>' +
            '<td hidden>' + $StudentProgressID + '</td>' +
            '<td>' + $ProgressTitle + '</td>' +
            '<td>' + $ProgressFile + '</td>' +
            '<td>' + $EmailSendName + '</td>' +
            '<td>' + $EffectiveMonth + '</td>' +
            '<td hidden>' + '' + '</td>' +
            '<td hidden>' + '' + '</td>' +
            '<td hidden>' + document.getElementById("customFile").files + '</td>' +
            '<td>' +
            '<a class="badge bg-success mr-2 editgriditem" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit" href="#"> <i class="ri-pencil-line mr-0"></i></a >' +
            '<a class="badge bg-warning mr-2 red" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" href="#"> <i class="ri-delete-bin-line mr-0"></i></a >' +
            '</td > ' +
            '</tr> ');

        $('#StudentAchievementTitle').val('');
        $('#EffectiveMonth').val('');
        document.getElementById("rbSchol").checked = true;
        //document.getElementById("EffectiveDate").value = format(new Date(), 'yyyy-MM-dd');
    }
    else {
        //MsgBox('Error', 'Already Exists', '', false);
        //alert(currentRow);
        currentRow.closest('tr').children('td:eq(2)').text($ProgressTitle);
        currentRow.closest('tr').children('td:eq(3)').text($ProgressFile);
        if (document.getElementById("rbSchol").checked) {
            currentRow.closest('tr').children('td:eq(4)').text('Yes');
        }
        if (!document.getElementById("rbSchol").checked) {
            currentRow.closest('tr').children('td:eq(4)').text('No');
        }
        currentRow.closest('tr').children('td:eq(5)').text(document.getElementById("EffectiveMonth").value);
        var editedRow = currentRow;
        currentRow.remove();
        currentRow = '';

        $("#StudentProgress").append(editedRow);

        $('#StudentAchievementTitle').val('');        
        document.getElementById("rbSchol").checked = true;
        $('#EffectiveMonth').val('');
    }
}

var StudentProgress = function () {
    this.StudentID = 0,
        this.StudentProgressID = 0,
        this.ProgressTitle = '',        
        this.EmailSend = '',
        this.EffectiveMonth = '';
}

function Save() {

    MsgBox('Confirm', 'Do you want to Save ?', function () {

        var rowCount = document.getElementById("StudentProgress").rows.length;
        var rowData = document.getElementById("StudentProgress");

        if (rowCount > 0) {

            var lstStudentProgress = [];

            for (var i = 0; i < rowCount; i++) {

                var StudentProgressModel = new StudentProgress();

                StudentProgressModel.StudentID = rowData.rows[i].cells[0].innerHTML;
                StudentProgressModel.StudentAchievementID = rowData.rows[i].cells[1].innerHTML;
                StudentProgressModel.AchievementTitle = rowData.rows[i].cells[2].innerHTML;
                StudentProgressModel.AchievementName = rowData.rows[i].cells[3].innerHTML;
                if (rowData.rows[i].cells[4].innerHTML == 'Yes') {
                    StudentProgressModel.EmailSend = true;
                }
                if (rowData.rows[i].cells[4].innerHTML == 'No') {
                    StudentProgressModel.EmailSend = false;
                }
                StudentProgressModel.EffectiveMonth = rowData.rows[i].cells[5].innerHTML;
                lstStudentAchievement.push(StudentAchievementModel);
            }

            var model = {
                lstStudentProgress: lstStudentProgress
            }

            ajaxCall('Form/SaveStudentProgress', { 'model': model }, function (data) {

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