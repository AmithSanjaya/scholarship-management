$(document).ready(function () {

    var model = {}
    ajaxCall('Master/Currency', { 'model': model }, function (data) {
        BindDropDown("PayCurrency", "CurrencyName", "CurrencyID", data);
    });
    $('#PayCurrency').selectpicker('refresh');

    model = {}
    ajaxCall('Master/PayType', { 'model': model }, function (data) {
        BindDropDown("PayType", "PayTypeName", "PayTypeID", data);
    });
    $('#PayType').selectpicker('refresh');

    FillSponser();

    $("#SponserPayment").on("click", ".red", function () {

        var row = $(this).closest('tr');
        var id = $(this).closest('tr').children('td:eq(0)').text();

        MsgBox('Confirm', 'Do you want to Remove this Record ?', function () {
            row.remove();            
        }, true);
    });

    $('#cmbSponser').on('change', function () {
        GetStudents();
    });

    $("#PreviewApp").on("click", function () {

        var sponserID = $("#cmbSponser").val();
        if (sponserID > 0) {
            $('#CommonModel').modal();

            var model = {
                SponserID: sponserID
            }
            ajaxCallWithoutAsync('Form/SponserPaidStudentHistoryData', { 'model': model }, function (linkeddata) {

                for (var j = 0; j < linkeddata.length; j++) {

                    var model = {
                        StudentID: linkeddata[j].StudentID,
                        ViewTypeID: 2
                    }

                    $("#CommonModelTableHeader").empty();
                    $("#CommonModelTableDetial").empty();

                    $("h5.CommonHead").text('Sponser Payment History');

                    ajaxCallWithoutAsync('Form/StudentData', { 'model': model }, function (data) {

                        tr = $('<tr class="ligth ligth-data"/>');
                        tr.append("<th hidden>StudentID</th>")
                        tr.append("<th>Student Name</th>")
                        tr.append("<th>Country</th>")
                        tr.append("<th>Paid Amount</th>")
                        tr.append("<th>Paid Date</th>")
                        tr.append("</tr>")

                        $('#CommonModelTableHeader').append(tr);

                        for (var i = 0; i < data.length; i++) {

                            $Img = GetStudentImage(data[0].Photo);

                            $StudentName = data[i].FirstName + " " + data[i].LastName;
                            $Country = data[i].CountryName;
                            $ImgName = "<img src='" + $Img + "' class='img-fluid rounded avatar-50 mr-3' alt='image'>";

                            $("#CommonModelTableDetial").append(
                                '<tr>' +
                                '<td><div class="d-flex align-items-center">' + $ImgName + '<div>' + $StudentName + '</div></div></td>' +
                                '<td>' + $Country + '</td>' +
                                '<td>' + linkeddata[j].PaidAmount + '</td>' +
                                '<td>' + linkeddata[j].PaidDate + '</td>' +                                
                                '</tr> ');
                        }

                    });

                }
            });
        }
        else {
            MsgBox('Error', 'Please select the Sponser', '', false);
        }

    });
});

function FillSponser() {

    var model = {
        SponserID: 0,
        ViewTypeID: 1
    }
    ajaxCall('SM/SponserData', { 'model': model }, function (data) {
        BindDropDown("cmbSponser", "SponserName", "SponserID", data);
    });
    $('#cmbSponser').selectpicker('refresh');
}

function GetStudents() {

    var model = {
        SponserID: $('#cmbSponser').val()
    }
    $("#studentDetails").find("tr").remove();
    $("#studentDetails").empty();

    ajaxCallWithoutAsync('Form/SponsersStudentData', { 'model': model}, function (data) {

        for (var i = 0; i < data.length; i++) {

            $Img = GetStudentImage(data[i].Photo);

            $StudentName = data[i].StudentName;
            $Country = data[i].CountryName;
            $ImgName = "<img src='" + $Img + "' class='img-fluid rounded avatar-50 mr-3' alt='image'>";

            $("#studentDetails").append(
                '<tr>' +
                '<td hidden>' + data[i].StudentID + '</td>' +
                '<td><div class="d-flex align-items-center">' + $ImgName + '<div>' + $StudentName + '</div></div></td>' +
                '<td>' + data[i].GenderName + '</td>' +
                '<td>' + data[i].CountryName + '</td>' +
                '<td>' + data[i].SchoolName + '</td>' +
                '<td>' + data[i].DueAmount + '</td>' +
                '<td><div class="d-flex align-items-center list-action"><a class= "badge badge-info mr-2" data -placement="top" title = "" data -original -title="View" data -toggle="modal" onclick = "GetStudent(' + data[i].StudentID + ')"><i class="ri-eye-line mr-0"></i></a> ' +
                '<button type = "button" class= "btn btn-primary btn-sm mr-2" onclick = "AddToGrid(event)" > Add Payment</button ></div ></td > ' +
                '</tr> ');
        }
    });
}

function AddToGrid(event) {

    var isAdded = false;

    var RowCount = document.getElementById("SponserPayment").rows.length;
    var RowData = document.getElementById("SponserPayment");

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
        $DueAmount = $row.find("td:nth-child(6)").text();
        $SponserID = $("#cmbSponser").val();

        $('#AddGrid').modal({ backdrop: 'static', keyboard: true });

        $('p.DueAmount').text($DueAmount);
        $('#DueAmount').val($DueAmount);
        $('#SponserStudentID').val($StudentID);
        $('#PaidAmount').focus();
    }
    else {
        MsgBox('Error', 'Already Exists', '', false);
    }
}

function AddToGridFromModel() {

    $PaidAmount = $("#PaidAmount").val() || 0;

    if ($PaidAmount <= 0) {
        MsgBox('Error', 'Paid Amount Required', '', false);
    } else {

        $StudentID = $('#SponserStudentID').val();

        if ($StudentID > 0) {
            var model = {
                StudentID: $StudentID
            }

            ajaxCallWithoutAsync('Form/StudentDataofSponserLinked', { 'model': model }, function (linkeddata) {

                for (var j = 0; j < linkeddata.length; j++) {

                    model = {
                        StudentID: $StudentID,
                        ViewTypeID: 2
                    }

                    ajaxCallWithoutAsync('Form/StudentData', { 'model': model }, function (data) {

                        GetStudentImage(data[0].Photo);

                        $StudentName = data[0].FirstName + " " + data[0].LastName;
                        $Country = data[0].CountryName;
                        $ImgName = "<img src='" + $Img + "' class='img-fluid rounded avatar-50 mr-3' alt='image'>";

                        $PayAmount = $('#PaidAmount').val();
                        $('#PaidAmount').val(0);
                        $DueAmount = $('#DueAmount').val();

                        $("#SponserPayment").append(
                            '<tr>' +
                            '<td hidden>' + $StudentID + '</td>' +
                            '<td><div class="d-flex align-items-center">' + $ImgName + '<div>' + $StudentName + '</div></div></td>' +
                            '<td>' + $Country + '</td>' +
                            '<td>' + $PayAmount + '</td>' +
                            '<td hidden>' + linkeddata[j].PaymentSchemeID + '</td>' +
                            '<td>' + linkeddata[j].PaymentSchemeName + '</td>' +
                            '<td>' + $DueAmount + '</td>' +
                            '<td>' +
                            '<a class="badge bg-warning mr-2 red" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" href="#"> <i class="ri-delete-bin-line mr-0"></i></a >' +
                            '</td > ' +
                            '</tr> ');
                    });
                }
            });

        }

        $('#SponserStudentID').val(0);
        $('p.DueAmount').text(0);
        $('#AddGrid').hide();
    }

}

var StudentSponser = function () {

    this.SponserID = 0,
        this.StudentID = 0,
        this.PaymentSchemeID = 0,
        this.EffectiveMonth = '',
        this.PaidAmount = 0,
        this.Year = 0,
        this.Month = 0,
        this.CurrencyID = 0,
        this.DueAmount = 0,
        this.InvoiceNo = "",
        this.InvoiceDate = "",
        this.EffectivePeriod = "",
        this.lstStudentSponser = []

    this.Fill = function () {
        this.SponserID = $("#cmbSponser").val(),
        this.CurrencyID = $("#PayCurrency").val(),
        this.ReferenceNo = $("#InvoiceNo").val(),
        this.InvoiceDate = $("#InvoiceDate").val()
    }
}

function Save() {

    if ($('#cmbSponser').val() == 0) {
        MsgBox('Error', 'Please Select the Sponser', '', false);
        return;
    }
    if ($('#EffectiveMonth').val() == '') {
        MsgBox('Error', 'Please Select the Effective Month', '', false);
        return;
    }

    MsgBox('Confirm', 'Do you want to Save ?', function () {

        var rowCount = document.getElementById("SponserPayment").rows.length;
        var rowData = document.getElementById("SponserPayment");

        var StudentSponserModel = new StudentSponser();
        StudentSponserModel.Fill();

        if (rowCount > 0) {

            var lstStudentSponserVM = [];

            for (var i = 0; i < rowCount; i++) {

                var DetailModel = new StudentSponser();

                DetailModel.StudentID = rowData.rows[i].cells[0].innerHTML;
                DetailModel.PaidAmount = rowData.rows[i].cells[3].innerHTML;
                DetailModel.PaymentSchemeID = rowData.rows[i].cells[4].innerHTML;
                DetailModel.DueAmount = rowData.rows[i].cells[6].innerHTML;
                lstStudentSponserVM.push(DetailModel);
            }

            StudentSponserModel.lstStudentSponser = lstStudentSponserVM;

            ajaxCall('Form/SaveSponserPaymentDetails', { 'model': StudentSponserModel }, function (data) {

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


function AddSponserPaidStudentByYearandMonth() {

    if ($('#cmbSponser').val() == 0) {        
        return;
    }

    if ($('#EffectiveMonth').val() == '') {
        return;
    }

    $SponserID = $("#cmbSponser").val();
    if ($SponserID > 0) {
        var model = {
            SponserID: $SponserID,
            EffectiveMonth : $('#EffectiveMonth').val()
        }

        ajaxCallWithoutAsync('Form/SponserPaidStudentByYearandMonth', { 'model': model }, function (linkeddata) {
            $("#studentDetails").empty();
            for (var j = 0; j < linkeddata.length; j++) {

                model = {
                    StudentID: linkeddata[j].StudentID,
                    ViewTypeID: 2
                }

                ajaxCallWithoutAsync('Form/StudentData', { 'model': model }, function (data) {
                    debugger;
                    GetStudentImage(data[0].Photo);

                    $StudentName = data[0].FirstName + " " + data[0].LastName;
                    $Country = data[0].CountryName;
                    $ImgName = "<img src='" + $Img + "' class='img-fluid rounded avatar-50 mr-3' alt='image'>";
                    
                    $("#SponserPayment").append(
                        '<tr>' +
                        '<td hidden>' + linkeddata[j].StudentID + '</td>' +
                        '<td><div class="d-flex align-items-center">' + $ImgName + '<div>' + $StudentName + '</div></div></td>' +
                        '<td>' + $Country + '</td>' +
                        '<td>' + linkeddata[j].PaidAmount + '</td>' +
                        '<td hidden>' + linkeddata[j].PaymentSchemeID + '</td>' +
                        '<td>' + linkeddata[j].PaymentSchemeName + '</td>' +
                        '<td>' + linkeddata[j].LinkedOn + '</td>' +
                        '<td>' +
                        '<a class="badge bg-success mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit" onclick = "EditPaymentInGrid(event)"> <i class="ri-pencil-line mr-0"></i></a >' +
                        //'<a class="badge bg-warning mr-2 red" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" href="#" visibility: hidden;> <i class="ri-delete-bin-line mr-0"></i></a >' +
                        '</td > ' +
                        '</tr> ');
                });
            }
        });

    }

    $('#SponserStudentID').val(0);
    $('#AddGrid').hide();

}
