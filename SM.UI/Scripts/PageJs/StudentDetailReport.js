$(document).ready(function () {

    var model = {};

    ajaxCall('Form/Country', { 'model': model }, function (data) {
        BindDropDownWithSelectAll("StudentCounty", "CountryName", "CountryID", data," All Countries");
    });
    $('#StudentCounty').selectpicker('refresh');

    ajaxCall('Form/District', { 'model': model }, function (data) {
        BindDropDownWithSelectAll("StudentDistrict", "DistrictName", "DistictID", data," All Districts");
    });
    $('#StudentDistrict').selectpicker('refresh');

});

function Preview() {

    var rpt = "";
    var url = rootUrl;

    rpt = "StudentDetailReport";
    var model = {
        CountryID: $("#StudentCounty").val(),
        DistrictID: $("#StudentDistrict").val()
    };

    ajaxCall('Report/StudentDetailReportModel', { 'model': model }, function (data) {
        if (data.IsValid) {
            url += "Reports/Report.aspx?&RPT=" + rpt;
            window.open(url, '_blank');
        }
    });
}