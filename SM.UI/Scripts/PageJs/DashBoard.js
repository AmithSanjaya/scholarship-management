$(document).ready(function () {

    var model = {};

    $TopWidgetInterval = 0;
    $MiddleWidgetInterval = 0;
    $Right1WidgetInterval = 0;
    $Right2WidgetInterval = 0;

    ajaxCallWithoutAsync('Admin/GetWidgetInterval', { 'model': model }, function (data) {

        $TopWidgetInterval = data[0].TopWidget;
        $MiddleWidgetInterval = data[0].MiddleWidget;
        $Right1WidgetInterval = data[0].Right1Widget;
        $Right2WidgetInterval = data[0].Right2Widget;

    });

    //Top Widget
    setInterval(function () {

        ajaxCall('Admin/GetTopWidget', { 'model': model }, function (data) {

            $("h4.TotalStudent").text(data[0].StudentCount);
            $("h4.TotalSponser").text(data[0].SponsorsCount);
            $("h4.BirthDays").text(data[0].BirthDayCount);

        });
    }, $TopWidgetInterval);

    //Middle Widget

    $ImgName = "<img src='../assets/images/loader.gif' class='img-fluid rounded avatar-50 mr-3' alt='image'>";
    $("span.Middle").html($ImgName);

    setInterval(function () {

    $("#layout1-chart-5").html("");
    if (jQuery("#layout1-chart-5").length) {

        var lstSponser = [];
        var lstStudent = [];
        var lstMonth = [];

            ajaxCallWithoutAsync('Admin/GetMiddleWidget', { 'model': model }, function (data) {

                $("span.Middle").text("");
                $("span.MiddleProgressLeft1").html("<span class='progress-bar'></span>");
                $("span.MiddleProgressRight1").html("<span class='progress-bar'></span>");

                $("span.MiddleProgressLeft2").html("<span class='progress-bar'></span>");
                $("span.MiddleProgressRight2").html("<span class='progress-bar'></span>");

                $('#SponserPercentage').text(data[0].SponserPercentage+'%');
                $('#StudentPercentage').text(data[0].StudentPercentage+'%');

                $("h5.StudentCount").text(data[0].TotalStudentCount);
                $("h5.SponserCount").text(data[0].TotalSponserCount);

                for (var i = 0; i < data.length; i++) {

                    lstMonth.push(data[i].MonthName);
                    lstSponser.push(data[i].SponserCount);
                    lstStudent.push(data[i].StudentCount);
                }

            });

        options = {
            series: [{
                name: 'Sponsers',
                data: lstSponser
            }, {
                name: 'Students',
                data: lstStudent
            }],
            chart: {
                type: 'bar',
                height: 300
            },
            colors: ['#32BDEA', '#FF7E41'],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '30%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 3,
                colors: ['transparent']
            },
            xaxis: {
                categories: lstMonth,
                labels: {
                    minWidth: 0,
                    maxWidth: 0
                }
            },
            yaxis: {
                show: true,
                labels: {
                    minWidth: 20,
                    maxWidth: 20
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val
                    }
                }
            }
        };


        const chart = new ApexCharts(document.querySelector("#layout1-chart-5"), options);
        chart.render();
        const body = document.querySelector('body')
        if (body.classList.contains('dark')) {
            apexChartUpdate(chart, {
                dark: true
            })
        }

        document.addEventListener('ChangeColorMode', function (e) {
            apexChartUpdate(chart, e.detail)
        })
        }

    }, $MiddleWidgetInterval);

    //Right 1 Widget
    $ImgName = "<img src='../assets/images/loader.gif' class='img-fluid rounded avatar-50 mr-3' alt='image'>";
    $("span.Right1").html($ImgName);

    setInterval(function () {

        ajaxCall('Admin/GetRight1Widget', { 'model': model }, function (data) {

            $("span.Right1").text("");

            $("span.R1p1").text(data[0].SponserStudentNotLinkCount);
            $("span.R1p2").text(data[0].SponserDueCount);
            $("span.R1p3").text(data[0].EmailtobeSendSponserCount);
            $("span.R1p4").text(data[0].StudentPhotoCount);
            $("span.R1p5").text(data[0].StudentAnnualProgressCount);

            if (data[0].SponserStudentNotLinkCount == 0)
                $('#a1').attr("href", "javascript:void(0);");

            if (data[0].SponserDueCount == 0)
                $('#a2').attr("href", "javascript:void(0);");

            if (data[0].EmailtobeSendSponserCount == 0)
                $('#a3').attr("href", "javascript:void(0);");

            if (data[0].StudentPhotoCount == 0)
                $('#a4').attr("href", "javascript:void(0);");

            if (data[0].StudentAnnualProgressCount == 0)
                $('#a5').attr("href", "javascript:void(0);");

        });

    }, $Right1WidgetInterval);

    //Right 2 Widget
    $ImgNameWidget = "<img src='../assets/images/loader.gif' class='img-fluid rounded avatar-50 mr-3' alt='image'>";
    $("span.Right2").html($ImgNameWidget);

    setInterval(function () {

        $("span.Right2").html($ImgNameWidget);

        ajaxCall('Admin/GetRight2Widget', { 'model': model }, function (data) {

            $("#Right2Widget").html("");

            for (var i = 0; i < data.length; i++) {

                $Img = GetStudentImage(data[i].Photo);

                $StudentName = data[i].FullName;
                $Distict = data[i].DistrictName;
                $Country = data[i].CountryName;
                $ImgName = "<img src='" + $Img + "' class='img-fluid rounded avatar-50 mr-3' alt='image'>";
                $BeforeDays = data[i].BeforeDays;

                $("#Right2Widget").append(
                    '<a href="#" class="list-group-item list-group-item-action" onclick = "GetStudent(' + data[i].StudentID + ')">' +
                    '<div class="d-flex w-100 justify-content-between">' +
                    '<div class="d-flex align-items-center">' + $ImgName +
                    '<div>' + $StudentName +
                    '<p class="mb-0"><small>' + $Distict + ', ' + $Country+'</small></p>'+
                    '</div>' +
                    '</div>' +
                    '<small class="text-muted">' + $BeforeDays + ' days ago</small>' +
                    '</div>' +
                    '</a>');
            }
            $("span.Right2").text("");
        });
        $("span.Right2").text("");
    }, $Right2WidgetInterval);

});