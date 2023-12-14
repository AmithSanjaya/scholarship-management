$(document).ready(function () {

    $("#SponserNotificationDetialAdd").on("click", ".red", function () {
        $(this).closest("tr").remove();
    });

    FillGrid();

    $("#PreviewApp").on("click", function () {
        $('#CommonModel').modal();

        var model = {
            StudentID: 1,
            ViewTypeID: 2
        }

        $("#CommonModelTableHeader").empty();
        $("#CommonModelTableDetial").empty();

        $("h5.CommonHead").text('Preview Payment Notifications');

        ajaxCall('Form/StudentData', { 'model': model }, function (data) {

            tr = $('<tr class="ligth ligth-data"/>');
            tr.append("<th hidden>StudentID</th>")
            tr.append("<th>Student Name</th>")
            tr.append("<th>Country</th>")
            tr.append("<th>Added Date</th>")
            tr.append("</tr>")

            $('#CommonModelTableHeader').append(tr);

            for (var i = 0; i < data.length; i++) {

                $Img = GetStudentImage(data[i].Photo);

                $StudentName = data[i].FirstName + " " + data[i].LastName;
                $Country = data[i].CountryName;
                $ImgName = "<img src='" + $Img + "' class='img-fluid rounded avatar-50 mr-3' alt='image'>";

                $("#CommonModelTableDetial").append(
                    '<tr>' +
                    '<td><div class="d-flex align-items-center">' + $ImgName + '<div>' + $StudentName + '</div></div></td>' +
                    '<td>' + $Country + '</td>' +
                    '<td>' + data[i].CurrentDate + '</td>' +
                    '</tr> ');

            }

        });
    });
});

function FillGrid() {

    var model = {
        Year: 2023,
        Month:12
    };

    ajaxCall('Form/SponserPaymentNotification', { 'model': model }, function (data) {

        $('#SponserNotificationDetial').DataTable();

        for (var i = 0; i < data.length; i++) {

            var tr;

            $SponserID = data[i].SponserID;
            $SponserName = data[i].SponserName;
            $CountryName = data[i].CountryName;
            $PayScheme = data[i].PaymentSchemeName;
            //onclick="GetSponser(@d.SponserID)"
            $td = "<td><div class='d-flex align-items-center list-action'>" +
                "<a class='badge badge-info mr-2' data-placement='top' title='' data-original-title='View' data-toggle='modal' onclick='GetSponser("+$SponserID+")'>" +
                "<i class='ri-eye-line mr-0'></i></a > " +
                "<button type='button' class='btn btn-primary btn-sm mr-2' onclick='AddToGrid(event)'>Add to Grid</button>" +
                "</div></td>";

            tr = $('<tr>' +
                '<td hidden>' + $SponserID + '</td>' +
                '<td>' + $SponserName + '</td>' +
                '<td>' + $CountryName + '</td>' +
                '<td>' + $PayScheme + '</td>');

            tr.append($td);
            tr.append('</tr> ');

            $('#SponserNotificationDetial').DataTable().row.add(tr).draw();

        }

    });

}

function AddToGrid(event) {

    var isAdded = false;
    var RowCount = document.getElementById("SponserNotificationDetialAdd").rows.length;
    var RowData = document.getElementById("SponserNotificationDetialAdd");

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

        $SponserID = $row.find("td:nth-child(1)").text();
        $SponserName = $row.find("td:nth-child(2)").text();
        $CountryName = $row.find("td:nth-child(3)").text();
        $PayScheme = $row.find("td:nth-child(4)").text();

        $("#SponserNotificationDetialAdd").append(
            '<tr>' +
            '<td hidden>' + $SponserID + '</td>' +
            '<td>' + $SponserName + '</td>' +
            '<td>' + $CountryName + '</td>' +
            '<td>' + $PayScheme + '</td>' +
            '<td><a class="badge bg-warning mr-2 red" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" href="#"> <i class="ri-delete-bin-line mr-0"></i></a ></td>' +
            '</tr> ');
    }
}

var PaymentNotificationModel = function () {

    this.SponserID = 0,
        this.EffectiveMonth = '',
        this.PaidAmount = 0,
        this.Year = 0,
        this.Month = 0,
        this.lstSponserPaymentNotification = []

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

        var rowCount = document.getElementById("SponserNotificationDetialAdd").rows.length;
        var rowData = document.getElementById("SponserNotificationDetialAdd");

        var model = new PaymentNotificationModel();
        model.Fill();

        if (rowCount > 0) {

            var lstNotifyVM = [];

            for (var i = 0; i < rowCount; i++) {

                var DetailModel = new PaymentNotificationModel();

                DetailModel.SponserID = rowData.rows[i].cells[0].innerHTML;
                lstNotifyVM.push(DetailModel);
            }

            model.lstSponserPaymentNotification = lstNotifyVM;

            ajaxCall('Form/SaveSponserPaymentNotification', { 'model': model }, function (data) {

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
