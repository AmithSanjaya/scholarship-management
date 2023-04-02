$(document).ready(function () {
    //FillGrid();
});

function GetInvoice(SponserPaymentHeaderID) {

    $("#ModelBody").empty();
    //tst

    var model = {
        SponserPaymentHeaderID: SponserPaymentHeaderID
    }

    ajaxCall('Form/SponserPaymentInvoicesData', { 'model': model }, function (data) {
        $("#ModelBody").append(data[0].InvoiceEmail);
    });

    $('#CommonModel').modal({ backdrop: 'static', keyboard: true });
}

function FillGrid() {

    $("#SponserPaymentInvoices").find("tr").remove();

    var model = {}

    ajaxCall('Form/SponserPaymentInvoicesData', { 'model': model }, function (data) {

        for (var i = 0; i < data.length; i++) {

            $("#SponserPaymentInvoices").append(
                '<tr>' +
                '<td hidden>' + data[i].SponserPaymentHeaderID + '</td>' +
                '<td>' + data[i].InvoiceDateName + '</td>' +
                '<td>' + data[i].InvoiceNo + '</td>' +
                '<td hidden>' + data[i].SponserID + '</td>' +
                '<td>' + data[i].SponserName + '</td>' +
                '<td>' + data[i].PaidAmountName + '</td>' +
                '<td hidden><a data-toggle="tooltip" data-placement="top" data-original-title="View Attchment" href="#" onclick = "GetStudentProgressPDF(' + data[i].ProgressFileName + ')"><img src="../assets/images/page-img/viewpdf.png" height="36"></a></td>' +
                '<td>' +
                '<a class="badge bg-warning mr-2 red" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" href="#"> <i class="ri-delete-bin-line mr-0"></i></a >' +
                '</td > ' +
                '</tr> ');
        }
    });
}