$(document).ready(function () {
    $("#SponserStudentDetial").on("click", ".red", function () {
        $(this).closest("tr").remove();
    });

    $("#PreviewApp").on("click", function () {
        $('#CommonModel').modal();

        var model = {
            StudentID: 1,
            ViewTypeID: 2
        }

        $("#CommonModelTableHeader").empty();
        $("#CommonModelTableDetial").empty();

        $("h5.CommonHead").text('Preview Sponser/Student Details');

        ajaxCall('Form/StudentData', { 'model': model }, function (data) {

            tr = $('<tr class="ligth ligth-data"/>');
            tr.append("<th hidden>StudentID</th>")
            tr.append("<th>Student Name</th>")
            tr.append("<th>Country</th>")
            tr.append("<th>Added Date</th>")
            tr.append("</tr>")

            $('#CommonModelTableHeader').append(tr);

            for (var i = 0; i < data.length; i++) {

                if (data[i].Photo == "" || data[i].Photo == null) {
                    $Img = "../assets/images/user/11.png";
                } else {
                    $Img = "../Uploads/Student/" + data[i].ImageName;
                }

                $StudentName = data[i].FirstName + " " + data[i].LastName;
                $Country = data[i].CountryName;
                $ImgName = "<img src='" + $Img + "' class='img-fluid rounded avatar-50 mr-3' alt='image'>";

                $("#CommonModelTableDetial").append(
                    '<tr>' +
                    '<td><div class="d-flex align-items-center">' + $ImgName + '<div>' + $StudentName + '</div></div></td>' +
                    '<td>' + $Country + '</td>' +
                    '<td>' + data[i].CurrentDate + '</td>' +
                    '</tr> ');

            }

        });
    });    
});

function AddToGrid(event) {

    var isAdded = false;
    var RowCount = document.getElementById("SponserStudentDetial").rows.length;
    var RowData = document.getElementById("SponserStudentDetial");

    var $row = $(event.target).closest("tr");
    for (var i = 0; i < RowCount; i++) {
        if ((RowData.rows[i].cells[0].innerHTML == $row.find("td:nth-child(1)").text())) {
            isAdded = true;
            break;
        } else {
            isAdded = false;
        }
    }

    if (isAdded === false) {

        $StudentID = $row.find("td:nth-child(1)").text();

        var model = {
            StudentID: $StudentID,
            ViewTypeID: 2
        }

        ajaxCall('Form/StudentData', { 'model': model }, function (data) {

            if (data[0].Photo == "" || data[0].Photo == null) {
                $Img = "../assets/images/user/11.png";
            } else {
                $Img = "../Uploads/Student/" + data[0].ImageName;
            }

            $StudentName = data[0].FirstName + " " + data[0].LastName;
            $Country = data[0].CountryName;
            $ImgName = "<img src='" + $Img + "' class='img-fluid rounded avatar-50 mr-3' alt='image'>";

            $("#SponserStudentDetial").append(
                '<tr>' +
                '<td hidden>' + $StudentID + '</td>' +
                '<td><div class="d-flex align-items-center">' + $ImgName + '<div>' + $StudentName + '</div></div></td>' +
                '<td>' + $Country + '</td>' +
                '<td>Payment Scheme</td>' +
                '<td>' + data[0].CurrentDate + '</td>' +
                '<td><a class="badge bg-warning mr-2 red" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" href="#"> <i class="ri-delete-bin-line mr-0"></i></a ></td>' +
                '</tr> ');
        });
    }
    else {
        MsgBox('Error', 'Already Exists', '', false);
    }
}