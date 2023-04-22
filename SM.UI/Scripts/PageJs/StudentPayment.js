$(document).ready(function () {

    $("#StudentPaymentGrid").on("click", ".red", function () {

        var row = $(this).closest('tr');
        var id = $(this).closest('tr').children('td:eq(0)').text();

        MsgBox('Confirm', 'Do you want to Remove this Record ?', function () {
            row.remove();
        }, true);
    });

    $('#EffectiveMonth').on('change', function () {
        GetStudentPayments();
    });
});

function AddToGrid(event) {

    var isAdded = false;

    if ($('#EffectiveMonth').val() == '') {
        MsgBox('Error', 'Please Select the Effective Month', '', false);
        return;
    }

    var RowCount = document.getElementById("StudentPaymentGrid").rows.length;
    var RowData = document.getElementById("StudentPaymentGrid");

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

        $('#StudentID').val($StudentID);
        $('#AddGrid').modal({ backdrop: 'static', keyboard: true });
        $('#PayAmount').focus();
    }
    else {
        MsgBox('Error', 'Already Exists', '', false);
    }
}

function GetStudentPayments() {

    model = {
        Year: $("#EffectiveMonth").val().split("-", 2)[0],
        Month: $("#EffectiveMonth").val().split("-", 2)[1]
    }

    $("#StudentPaymentGrid").empty();

    ajaxCallWithoutAsync('Form/StudentPaymentData', { 'model': model }, function (data) {

        for (var j = 0; j < data.length; j++) {

            $StudentID = data[j].StudentID;
            $PayAmount = data[j].PaidAmount;

            model = {
                StudentID: $StudentID,
                ViewTypeID: 2
            }

            ajaxCallWithoutAsync('Form/StudentData', { 'model': model }, function (sdata) {

                GetStudentImage(sdata[0].Photo);

                $StudentID = sdata[0].StudentID;
                $StudentName = sdata[0].FirstName + " " + sdata[0].LastName;
                $Country = sdata[0].CountryName;
                $ImgName = "<img src='" + $Img + "' class='img-fluid rounded avatar-50 mr-3' alt='image'>";

                $("#StudentPaymentGrid").append(
                    '<tr>' +
                    '<td hidden>' + $StudentID + '</td>' +
                    '<td><div class="d-flex align-items-center">' + $ImgName + '<div>' + $StudentName + '</div></div></td>' +
                    '<td>' + $Country + '</td>' +
                    '<td>' + $PayAmount + '</td>' +
                    '<td>' +
                    '<a class="badge badge-info mr-2" data-placement="top" title="" data-original-title="View" data-toggle="tooltip" onclick = "GetStudent(' + $StudentID + ')" > <i class="ri-eye-line mr-0"></i></a >' +
                    '<a class="badge bg-warning mr-2 red" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" href="#"> <i class="ri-delete-bin-line mr-0"></i></a >' +
                    '</td > ' +
                    '</tr> ');
            });
        }

    });
}

function AddToGridFromModel() {

    $PaidAmount = $("#PayAmount").val() || 0;

    if ($PaidAmount <= 0) {
        MsgBox('Error', 'Paid Amount Required', '', false);
    } else {

        $StudentID = $('#StudentID').val();

        if ($StudentID > 0) {

            model = {
                StudentID: $StudentID,
                ViewTypeID: 2
            }

            ajaxCallWithoutAsync('Form/StudentData', { 'model': model }, function (data) {

                GetStudentImage(data[0].Photo);

                $StudentName = data[0].FirstName + " " + data[0].LastName;
                $Country = data[0].CountryName;
                $ImgName = "<img src='" + $Img + "' class='img-fluid rounded avatar-50 mr-3' alt='image'>";

                $PayAmount = $('#PayAmount').val();
                $('#PayAmount').val(0);

                $("#StudentPaymentGrid").append(
                    '<tr>' +
                    '<td hidden>' + $StudentID + '</td>' +
                    '<td><div class="d-flex align-items-center">' + $ImgName + '<div>' + $StudentName + '</div></div></td>' +
                    '<td>' + $Country + '</td>' +
                    '<td>' + $PayAmount + '</td>' +
                    '<td>' +
                    '<a class="badge badge-info mr-2" data-placement="top" title="" data-original-title="View" data-toggle="tooltip" onclick = "GetStudent(' + $StudentID + ')" > <i class="ri-eye-line mr-0"></i></a >' +
                    '<a class="badge bg-warning mr-2 red" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" href="#"> <i class="ri-delete-bin-line mr-0"></i></a >' +
                    '</td > ' +
                    '</tr> ');
            });
        }

        $('#StudentID').val(0);
        $('#AddGrid').hide();
    }
}

var StudentPaymentModel = function () {

    this.StudentID = 0,
    this.EffectiveMonth = '',
    this.PaidAmount = 0,
    this.Year = 0,
    this.Month = 0,
    this.lstStudentPay = []

    this.Fill = function () {
        this.Year = $("#EffectiveMonth").val().split("-", 2)[0];
        this.Month = $("#EffectiveMonth").val().split("-", 2)[1];
    }
}

function Save() {

    if ($('#EffectiveMonth').val() == '') {
        MsgBox('Error', 'Please Select the Effective Month', '', false);
        return;
    }

    MsgBox('Confirm', 'Do you want to Save ?', function () {

        var rowCount = document.getElementById("StudentPaymentGrid").rows.length;
        var rowData = document.getElementById("StudentPaymentGrid");

        var model = new StudentPaymentModel();
        model.Fill();

        if (rowCount > 0) {

            var lstStudentPayVM = [];

            for (var i = 0; i < rowCount; i++) {

                var DetailModel = new StudentPaymentModel();

                DetailModel.StudentID = rowData.rows[i].cells[0].innerHTML;
                DetailModel.PaidAmount = rowData.rows[i].cells[3].innerHTML;
                lstStudentPayVM.push(DetailModel);
            }

            model.lstStudentPay = lstStudentPayVM;

            ajaxCall('Form/SaveStudentPaymentDetails', { 'model': model }, function (data) {

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