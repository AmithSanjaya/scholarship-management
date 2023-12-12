$(document).ready(function () {

    var model = {};

    ajaxCall('Form/Country', { 'model': model }, function (data) {
        BindDropDownWithSelectAll("SponserCounty", "CountryName", "CountryID", data, " All Countries");
    });
    $('#SponserCounty').selectpicker('refresh');

});

function Preview() {

    var rpt = "";
    var url = rootUrl;

    const comboBox = document.getElementById('SponserCounty');
    const selectedOption = comboBox.options[comboBox.selectedIndex];
    const selectedCountryText = selectedOption.text;

    const subheading = "Country : " + selectedCountryText;

    rpt = "PaymentDueSponserListReport";
    var model = {
        CountryID: $("#SponserCounty").val(),
        SubHeading: subheading,
    };

    ajaxCall('Report/StudentDetailReportModel', { 'model': model }, function (data) {
        if (data.IsValid) {
            url += "Reports/Report.aspx?&RPT=" + rpt + "&Type=1";
            window.open(url, '_blank');
        }
    });
}