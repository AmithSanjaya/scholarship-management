$(document).ready(function () {
    var model = {};
    ajaxCall('Form/Country', { 'model': model }, function (data) {
        BindDropDown("Country", "CountryName", "CountryID", data);
    });

    $('#Country').selectpicker('refresh');

    ajaxCall('Admin/UserRoles', { 'model': model }, function (data) {
        BindDropDown("UserRoleID", "UserRoleName", "UserRoleID", data);
    });

    $('#UserRole').selectpicker('refresh');

    FillUser();
});

function FillUser() {
    $("#UserID").val(0);
    $("#UserRoleID").val(0);
    $('#UserRoleID').selectpicker('refresh');

    $("#FacebookUrl").val('');
    $("#FirstName").val('');
    $("#LastName").val('');
    $("#UserAddress").val('');
    $("#Country").val(0);
    $('#Country').selectpicker('refresh');

    $("#MobileNo").val('');
    $("#Email").val('');
    $("#UserName").val('');
    $("#Password").val('');
    $("#RePassword").val('');

    let searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has('UserID') == true) {

        let param = searchParams.get('UserID');
        var model = {
            UserID: param,
            ViewTypeID: 2
        }

        ajaxCall('Admin/UsersData', { 'model': model }, function (data) {
            $("#UserID").val(data[0].UserID);
            $("h4.FormHead").text('Edit User');
            $("#UserRoleID").val(data[0].UserRoleID);
            $('#UserRoleID').selectpicker('refresh');

            $("#FacebookUrl").val(data[0].FacebookUrl);
            $("#FirstName").val(data[0].FirstName);
            $("#LastName").val(data[0].LastName);
            $("#UserAddress").val(data[0].Address);
            $("#Country").val(data[0].CountryID);
            $('#Country').selectpicker('refresh');

            $("#MobileNo").val(data[0].MobileNo);
            $("#Email").val(data[0].Email);
            $("#UserName").val(data[0].UserName);
            $("#Password").val(data[0].Password);
            $("#RePassword").val(data[0].Password);

        });
    }
}

var User = function () {
    this.UserID = 0;
    this.UserName = "";
    this.UserRoleID = 0;
    this.FirstName = "";
    this.LastName = "";
    this.FacebookUrl = "";
    this.CountryID = 0;
    this.Password = "";
    this.Address = "";
    this.MobileNo = "";
    this.Email = "";

    this.Fill = function () {

        this.UserID = $("#UserID").val() || 0;;
        this.UserName = $("#UserName").val();
        this.UserRoleID = $("#UserRoleID").val();
        this.FirstName = $("#FirstName").val();
        this.LastName = $("#LastName").val();
        this.FacebookUrl = $("#FacebookUrl").val();
        this.CountryID = $("#Country").val();
        this.Password = $("#Password").val();
        this.Address = $("#UserAddress").val();
        this.MobileNo = $("#MobileNo").val();
        this.Email = $("#Email").val();
    }
}

function Save() {

    var model = {};

    //if (ValidateSave()) {
        MsgBox('Confirm', 'Do you want to Save ?', function () {

            var model = new User();
            model.Fill();

            model.Mode = 1;

            if (model.UserID != 0) {
                model.Mode = 2;
            }

            ajaxCall('Admin/UpdateUser', { 'model': model }, function (data) {

                if (data.IsValid) {
                    $("#UserID").val(0);
                    $("#UserRoleID").val(0);
                    $('#UserRoleID').selectpicker('refresh');

                    $("#FacebookUrl").val('');
                    $("#FirstName").val('');
                    $("#LastName").val('');
                    $("#UserAddress").val('');
                    $("#Country").val(0);
                    $('#Country').selectpicker('refresh');

                    $("#MobileNo").val('');
                    $("#Email").val('');
                    $("#UserName").val('');
                    $("#Password").val('');
                    $("#RePassword").val('');
                    MsgBox('Info', data.SucessMessage, '', true);
                } else {
                    MsgBox('Error', data.ErrorMessage, '', false);
                }
            });
        }, true);
    //}
}

var FormValidate = function () {
    this.FieldName = "";
    this.FieldValue = "";
}