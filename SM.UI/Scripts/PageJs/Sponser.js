$(document).ready(function () {
        
    var model = {}
    ajaxCall('SM/PaymentSchems', { 'model': model }, function (data) {
        BindDropDown("SponserPayScheme", "PaymentSchemeName", "PaymentSchemeID", data);
    });

    ajaxCall('Form/Country', { 'model': model }, function (data) {
        BindDropDown("SponserCounty", "CountryName", "CountryID", data);
    }); 
    $('#SponserCounty').selectpicker('refresh');
});

function Save() {

    var model = {};

    if (ValidateSave()) {
        MsgBox('Confirm', 'Do you want to Save ?', function () {

            var model = new Sponsor();
            model.Fill();

            model.Mode = 1;
            
            if (model.SponserID !=0) {
                model.Mode = 2;
            }            

            ajaxCall('SM/UpdateSponser', { 'model': model }, function (data) {

                if (data.IsValid) {
                    MsgBox('Info', data.SucessMessage, '', true);
                } else {
                    MsgBox('Error', data.ErrorMessage, '', false);
                }
            });
        }, true);
    }
}

var FormValidate = function () {
    this.FieldName = "";
    this.FieldValue = "";
}

var Sponsor = function () {
    this.SponserID = 0;
    this.SponserName = "";
    this.SponserAddress = "";
    this.Email = "";
    this.ContactNo = "";
    this.PaymentSchemeID = 0;
    this.CountryID = 0;
    
    this.Fill = function () {
        this.SponserID = $("#SponserID").val() || 0;
        this.SponserName = $("#SponserName").val();
        this.SponserAddress = $("#SponserAddress").val();
        this.Email = $("#SponserEmail").val();
        this.ContactNo = $("#SponserPhoneNo").val();
        this.PaymentSchemeID = $("#SponserPayScheme").val();
        this.CountryID = $("#SponserCounty").val();
    }
}

function ValidateSave() {

    var msg = "";
    var lstMsg = [];

    var model = {
        MenuID: 10
    }

    ajaxCallWithoutAsync('Admin/FormValidate', { 'model': model }, function (data) {
        lstMsg = ValidateError(data);
    });

    if (lstMsg["Msg"] != "") {
        msg = lstMsg["Msg"];

        MsgBox('Error', msg, '', false);
        document.getElementById(lstMsg["FieldName"]).focus();

        return false;
    }


    return true;
}