$(document).ready(function () {

    CreateAllMenus();

    //Call this function with user click event
    SetUserRights();

});

function CreateAllMenus() {

    ajaxCallWithoutAsync('Admin/GetSystemAllMenus', '', function (data) {

        if (data.length > 0) {

            var innerHTML = "";

            for (var Menu1 = 0; Menu1 < data.length; Menu1++) {

                var menuLevel2 = "";

                for (var Menu2 = 0; Menu2 < data[Menu1].ChildMenus.length; Menu2++) {

                    menuLevel2 += '<div class="custom-control custom-checkbox">';
                    menuLevel2 += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="' + data[Menu1].ChildMenus[Menu2].MenuID + '" class="custom-control-input bg-warning">' +
                        '<label class="custom-control-label mb-0" for="' + data[Menu1].ChildMenus[Menu2].MenuID + '">&nbsp;&nbsp;' + data[Menu1].ChildMenus[Menu2].DisplayName + '</label>' +
                                  '</div>';

                    var menuLevel3 = "";

                    for (var Menu3 = 0; Menu3 < data[Menu1].ChildMenus[Menu2].ChildMenus.length; Menu3++) {

                        menuLevel2 += '<div class="custom-control custom-checkbox">';
                        menuLevel2 += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <input type="checkbox" id="' + data[Menu1].ChildMenus[Menu2].ChildMenus[Menu3].MenuID + '" class="custom-control-input">' +
                            '<label class="custom-control-label mb-0" for="' + data[Menu1].ChildMenus[Menu2].ChildMenus[Menu3].MenuID + '">&nbsp;' + data[Menu1].ChildMenus[Menu2].ChildMenus[Menu3].DisplayName + '</label>' +
                            '</div>';

                        for (var Menu4 = 0; Menu4 < data[Menu1].ChildMenus[Menu2].ChildMenus[Menu3].ChildMenus.length; Menu4++) {

                            menuLevel2 += '<div class="custom-control custom-checkbox">';
                            menuLevel2 += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <input type="checkbox" id="' + data[Menu1].ChildMenus[Menu2].ChildMenus[Menu3].ChildMenus[Menu4].MenuID + '" class="custom-control-input">' +
                                '<label class="custom-control-label mb-0" for="' + data[Menu1].ChildMenus[Menu2].ChildMenus[Menu3].ChildMenus[Menu4].MenuID + '">&nbsp;' + data[Menu1].ChildMenus[Menu2].ChildMenus[Menu3].ChildMenus[Menu4].DisplayName + '</label>' +
                                '</div>';
                        }
                    }
                }
                innerHTML += '<div class="card iq-accordion-block">' +
                    '<div class="active-faq clearfix" id="' + data[Menu1].MenuID + '">' +
                    '<div class="container-fluid">' +
                    '<div class="row">' +
                    '<div class="col-sm-12">' +
                    '<a role="contentinfo" class="accordion-title" data-toggle="collapse" data-target="#collapse' + data[Menu1].MenuID + '" aria-expanded="true" aria-controls="collapse' + data[Menu1].MenuID + '">' +
                    data[Menu1].DisplayName +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div id="collapse' + data[Menu1].MenuID + '" class="accordion-details collapse" aria-labelledby="' + data[Menu1].MenuID + '" data-parent="#faqAccordion">' +
                    menuLevel2 +
                    '</div>' +
                    '</div>'
            }

            $('#accordion').append(innerHTML);
        }
    });
}

function Save() {

    if ($('#accordion input:checked').length > 0) {

        MsgBox('Confirm', 'Do you want to Update User Rights ?', function () {

        }, true);

    } else {

        MsgBox('Confirm', 'Do You Want to Remove All User Rights ?', function () {

        }, true);

    }
}

function SetUserRights() {

    $('#accordion input:checkbox').not(this).prop('checked', false);

    var model = {
        UserID : 1
    }

    ajaxCallWithoutAsync('Admin/GetUserAllowedMenu', { 'model': model }, function (data) {

        if (data.length > 0) {

            for (var i = 0; i < data.length; i++) {
                $('#' + data[i].MenuID).prop('checked', true);

                for (var j = 0; j < data[i].ChildMenus.length; j++) {
                    $('#' + data[i].ChildMenus[j].MenuID).prop('checked', true);

                    for (var k = 0; k < data[i].ChildMenus[j].ChildMenus.length; k++) {
                        $('#' + data[i].ChildMenus[j].ChildMenus[k].MenuID).prop('checked', true);

                        for (var l = 0; l < data[i].ChildMenus[j].ChildMenus[k].ChildMenus.length; l++) {
                            $('#' + data[i].ChildMenus[j].ChildMenus[k].ChildMenus[l].MenuID).prop('checked', true);
                        }
                    }
                }
            }
        }
    });
}
