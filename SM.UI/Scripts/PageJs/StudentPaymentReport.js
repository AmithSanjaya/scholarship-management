
$(document).ready(function () {

    FillSponser();
    
    });
    function FillSponser() {

    var model = {
        SponserID: 0,
        ViewTypeID: 1
    }
    ajaxCall('SM/SponserData', { 'model': model }, function (data) {
        
        BindDropDownWithSelectAll("SponsorID", "SponserName", "SponserID", data, "All Sponsers");
    });
    $('#cmbSponser').selectpicker('refresh');
}

function Preview() {

    var rpt = "";
    var url = rootUrl;

    if ($('#EffectiveMonth').val() == 0) {
        MsgBox('Error', 'Please Select the Month', '', false);
        return;
    }

    rpt = "StudentPaymentReport";
    var model = {
        SponserID: $("#SponsorID").val(),
        Year: $("#EffectiveMonth").val().split('-')[0],
        Month: $("#EffectiveMonth").val().split('-')[1],
    };

    ajaxCall('Report/StudentPaymentReportModel', { 'model': model }, function (data) {
        if (data.IsValid) {
            url += "Reports/Report.aspx?&RPT=" + rpt + "&Type=1";
            window.open(url, '_blank');
        }
    });
}