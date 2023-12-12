$(document).ready(function () {

    $("#InactiveDIV").hide();

    $("#ReasonForInactive").val("");

    $("#rbInactive").change(function () {
        if (this.checked) {
            $("#InactiveDIV").show();
        } else {
            $("#ReasonForInactive").val("");
            $("#InactiveDIV").hide();
        }
    });
        
    var model = {}
    ajaxCallWithoutAsync('SM/PaymentSchems', { 'model': model }, function (data) {
        BindDropDown("SponserPayScheme", "PaymentSchemeName", "PaymentSchemeID", data);
    });
    $('#SponserPayScheme').selectpicker('refresh');

    ajaxCallWithoutAsync('Form/Country', { 'model': model }, function (data) {
        BindDropDown("SponserCounty", "CountryName", "CountryID", data);
    }); 
    
    $('#SponserCounty').selectpicker('refresh');
    

    FillSponser();
});

function FillSponser() {
    let searchParams = new URLSearchParams(window.location.search)

    if (searchParams.has('SponserID') == true) {

        let param = searchParams.get('SponserID');
        var model = {
            SponserID: param,
            ViewTypeID: 2
        }

        ajaxCall('SM/SponserData', { 'model': model }, function (data) {

            $("h4.FormHead").text('Edit Sponser');

            $("#SponserID").val(data[0].SponserID);
            $("#SponserName").val(data[0].SponserName);
            $("#SponserAddress").val(data[0].SponserAddress);
            $("#SponserEmail").val(data[0].Email);
            $("#SponserPhoneNo").val(data[0].ContactNo);

            $("#SponserCounty").val(data[0].CountryID);
            $('#SponserCounty').selectpicker('refresh');

            $("#SponserPayScheme").val(data[0].PaymentSchemeID);
            $('#SponserPayScheme').selectpicker('refresh');

            $('#rbInactive').prop('checked', !data[0].bIsActive);
            $('#rbInactive').trigger("change");

            $("#ReasonForInactive").val(data[0].InactiveReason);

        });
    }
}

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
    this.bIsActive = "";
    this.InactiveReason = "";
    
    this.Fill = function () {
        this.SponserID = $("#SponserID").val() || 0;
        this.SponserName = $("#SponserName").val();
        this.SponserAddress = $("#SponserAddress").val();
        this.Email = $("#SponserEmail").val();
        this.ContactNo = $("#SponserPhoneNo").val();
        this.PaymentSchemeID = $("#SponserPayScheme").val();
        this.CountryID = $("#SponserCounty").val();

        this.bIsActive = $('#rbInactive').prop('checked');
        this.InactiveReason = $("#ReasonForInactive").val();
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

function GetSponser(SponserPassID) {

    $('#sponsermodel').modal();

    var model = {
        SponserID: SponserPassID,
        ViewTypeID: 2
    }

    ajaxCall('SM/SponserData', { 'model': model }, function (data) {

        $("h4.mb-1").text(data[0].SponserName);

        $('td.SponcerContactNo').text(data[0].ContactNo);
        $('td.SponcerEmail').text(data[0].Email);
        $('td.SponcerAddress').text(data[0].SponserAddress);
        $('td.SponcerCountry').text(data[0].CountryName);
        $('td.SponcerPayTerm').text(data[0].PaymentSchemeName);
        
    });

}

function DeleteSponser(sponserID) {
    MsgBox('Confirm', 'Do you want to Delete Record ?', function () {

        var model = {
            SponserID: sponserID
        }

        ajaxCall('SM/DeleteSponser', { 'model': model }, function (data) {

            if (data.IsValid) {
                MsgBox('Info', data.SucessMessage, '', true);
            } else {
                MsgBox('Error', data.ErrorMessage, '', false);
            }
        });
    }, true);
}

