$(document).ready(function () {

    $("#FundDIV").hide();
    $("#NumberDIV").hide();

    $("#rbSchol").change(function () {
        if (this.checked) {
            $("#FundDIV").show();
            $("#NumberDIV").show();
        } else {
            $("#FundDIV").hide();
            $("#NumberDIV").hide();
        }
    });

});

function Save() {

    var model = {};

    MsgBox('Confirm', 'Do you want to Process ?', function () {
        ajaxCall('HR/CommissionProcessPost', { 'model': model }, function (data) {

            if (data.IsValid) {
                ResetFields();
                ClearAllAlerts();
                MsgBox('Info', data.SucessMessage, '', true);
            } else {
                MsgBox('Error', data.strResult, '', true);
            }
        });
    }, true);
}