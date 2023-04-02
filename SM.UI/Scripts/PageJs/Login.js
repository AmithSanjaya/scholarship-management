$(document).ready(function () {

    $('#txtUserName').focus();

    $(document).keypress(function (e) {
        if (e.which === 13) {
            $('#btnLogin').click();
        }
    });
});

var Login = function () {
    this.UserName = "";
    this.Password = "";

    this.Fill = function () {
        this.UserName = $("#txtUserName").val();
        this.Password = $("#txtpassword").val();
    }
    this.Clear = function () {
        this.UserName = $("#txtUserName").val();
        this.Password = $("#txtpassword").val();
    }
}

function UserLogin() {

    var model = new Login();
    model.Fill();

    if (model.UserName === "" || model.UserName === null) {
        MsgBox('Error', 'User name Required', '', false);
        return;
    }
    if (model.Password === "" || model.Password === null) {
        MsgBox('Error', 'Password Required', '', false);
        return;
    }
    if (model.UserName !== "" && model.Password !== "") {
        ajaxCallWithoutAsync('Admin/UserLogin', { 'model': model }, function (data) {
            if (data.IsValid) {
                window.location.href += '/SM/Index';
            } else {
                MsgBox('Error', data.ErrorMessage, '', false);
            }
        });
    }
}