$(document).ready(function () {

    var model = {};

    ajaxCall('Form/Country', { 'model': model }, function (data) {
        BindDropDownWithSelectAll("StudentCounty", "CountryName", "CountryID", data, " All Countries");
    });
    $('#StudentCounty').selectpicker('refresh');

    ajaxCall('Form/District', { 'model': model }, function (data) {
        BindDropDownWithSelectAll("StudentDistrict", "DistrictName", "DistictID", data, " All Districts");
    });
    $('#StudentDistrict').selectpicker('refresh');

});

function Preview() {

    var rpt = "";
    var url = rootUrl;

    const comboBox = document.getElementById('StudentCounty');
    const selectedOption = comboBox.options[comboBox.selectedIndex];
    const selectedCountryText = selectedOption.text;

    const comboBox2 = document.getElementById('StudentDistrict');
    const selectedOption2 = comboBox2.options[comboBox.selectedIndex];
    const selectedDistrictText = selectedOption2.text;

    const subheading = "Country : " + selectedCountryText + " And District : " + selectedDistrictText;

    rpt = "StudentAnnualProgressReport";
    var model = {
        CountryID: $("#StudentCounty").val(),
        DistrictID: $("#StudentDistrict").val(),
        SubHeading: subheading,
    };

    ajaxCall('Report/StudentDetailReportModel', { 'model': model }, function (data) {
        if (data.IsValid) {
            url += "Reports/Report.aspx?&RPT=" + rpt + "&Type=1";
            window.open(url, '_blank');
        }
    });
}