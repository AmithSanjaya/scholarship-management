function Preview(TypeID) {

    var rpt = "";
    var url = rootUrl;

    rpt = "StudentBankReport";

    if (TypeID == 2) {
        rpt = "StudentBankReportDownload";
    }

    var model = {
        Year: $("#EffectiveMonth").val().split("-", 2)[0],
        Month: $("#EffectiveMonth").val().split("-", 2)[1]
    };

    ajaxCall('Report/StudentBankReportModel', { 'model': model }, function (data) {
        if (data.IsValid) {
            url += "Reports/Report.aspx?&RPT=" + rpt + "&Type=" + TypeID;
            window.open(url, '_blank');
        }
    });
}