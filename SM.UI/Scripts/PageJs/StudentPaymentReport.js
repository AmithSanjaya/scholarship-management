
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

    const comboBox = document.getElementById('SponsorID');
    const selectedOption = comboBox.options[comboBox.selectedIndex];
    const selectedCountryText = selectedOption.text;
    
    const selectedDistrictText = $("#EffectiveMonth").val();

    const subheading = "Sponser : " + selectedCountryText + " in : " + selectedDistrictText;

    rpt = "StudentPaymentReport";
    var model = {
        SponserID: $("#SponsorID").val(),
        Year: $("#EffectiveMonth").val().split('-')[0],
        Month: $("#EffectiveMonth").val().split('-')[1],
        SubHeading: subheading,
    };

    ajaxCall('Report/StudentPaymentReportModel', { 'model': model }, function (data) {
        if (data.IsValid) {
            url += "Reports/Report.aspx?&RPT=" + rpt + "&Type=1";
            window.open(url, '_blank');
        }
    });
}