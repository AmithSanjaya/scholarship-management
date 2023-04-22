$(document).ready(function () {

    ajaxCall("Admin/CheckSession", {}, onLogin);

    Welcome();
    setInterval(function () {

        Welcome();

    }, 7000);
});

function Welcome() {

    $Msg = new Date($.now()).toDateString();

    $('#HomeDisplay').text($Msg);

    $thehours = new Date().getHours();
    $themessage = '';
    $morning = ('Good morning');
    $afternoon = ('Good afternoon');
    $evening = ('Good evening');

    if ($thehours >= 0 && $thehours < 12) {
        $themessage = $morning;
    } else if ($thehours >= 12 && $thehours < 17) {
        $themessage = $afternoon;

    } else if ($thehours >= 17 && $thehours < 24) {
        $themessage = $evening;
    }

    $('#greeting').text($themessage);

}

function onLogin(message) {

    if (message != "Sucess") {
        $('#SessionDiglog').modal({ backdrop: 'static', keyboard: true });
    }
}

function RedirectLogin() {
    $('#SessionDiglog').modal('toggle');
    window.location.href = rootUrl;
}

function getCookie(cname) {

    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    return "";
}