$(document).ready(function () {
    if (localStorage.getItem('APIKey') !== null) {
        $('#txtAPIKey').val(localStorage.APIKey);
        RefreshUsage();
    }
});

$('#cmdSaveAPIKey').click(function () {
    localStorage.APIKey = $.trim($('#txtAPIKey').val());
    RefreshUsage();
});

function RefreshUsage() {
    // Check which ISP we're requesting usage for -- order counts! If one does't match it falls through to the next, teksavvy is the catchall.
    if (/^[a-z0-9_\-\.]{3,}@(data\.com|ebox\.com|electronicbox\.net|highspeed\.com|internet\.com|ppp\.com|www\.com)$/.test(localStorage.APIKey)) {
        $('#lblISP').text('Electronicbox Residential DSL');
        alert('Sorry, this ISP is not yet supported'); // TODO
    } else if (/^[a-z0-9_\-\.]{3,}@ebox-business\.com$/.test(localStorage.APIKey)) {
        $('#lblISP').text('Electronicbox Business DSL');
        alert('Sorry, this ISP is not yet supported'); // TODO
    } else if (/^vl[a-z]{6}$/.test(localStorage.APIKey)) {
        $('#lblISP').text('Videotron TPIA');
        alert('Sorry, this ISP is not yet supported'); // TODO
    } else if (/^[1-9]\d{4}$/.test(localStorage.APIKey)) {
        // Valid logins are [a-z0-9]{3,20}@caneris (no .com on the end), but usage is retrieved by 5 digit account number.
        $('#lblISP').text('Caneris DSL');
        alert('Sorry, this ISP is not yet supported'); // TODO
    } else if (/^[A-Z0-9]{7}[A-F0-9]{11}D@(start\.ca)$/.test(localStorage.APIKey)) {
        $('#lblISP').text('Start DSL');
        RefreshUsageStart();
    } else if (/^[A-Z0-9]{7}[A-F0-9]{11}C@(start\.ca)$/.test(localStorage.APIKey)) {
        $('#lblISP').text('Start Cable');
        RefreshUsageStart();
    } else if (/^[A-Z0-9]{7}[A-F0-9]{11}W@(start\.ca)$/.test(localStorage.APIKey)) {
        $('#lblISP').text('Start Wireless');
        RefreshUsageStart();
    } else if (/^[A-Z0-9]{7}[A-F0-9]{11}D@(logins\.ca)$/.test(localStorage.APIKey)) {
        $('#lblISP').text('Start Wholesale DSL');
        RefreshUsageStart();
    } else if (/^[A-Z0-9]{7}[A-F0-9]{11}C@(logins\.ca)$/.test(localStorage.APIKey)) {
        $('#lblISP').text('Start Wholesale Cable');
        RefreshUsageStart();
    } else if (/^[A-Z0-9]{7}[A-F0-9]{11}W@(logins\.ca)$/.test(localStorage.APIKey)) {
        $('#lblISP').text('Start Wholesale Wireless');
        RefreshUsageStart();
    } else if (/^([0-9A-F]{32})(|@teksavvy.com)(|\+[0-9]{1,4})$/.test(localStorage.APIKey)) {
        $('#lblISP').text('TekSavvy');
        RefreshUsageTeksavvy();
    } else if (/test/.test(localStorage.APIKey)) {
        $('#lblISP').text('Test');
        RefreshTest();
    } else {
        $('#lblISP').text('Invalid Username / API Key');
    }
}

function RefreshUsageStart() {
    $.ajax({
        type: 'GET',
        url: 'http://www.start.ca/support/capsavvy?code=' + localStorage.APIKey, // TODO https
        success: function (result, status, xhr) {
            alert(result);
        },
        error: function (xhr, status, error) {
            alert('error getting data from the api\n' + xhr.responseText + '\n' + status + '\n' + error);
        }
    });
}

function RefreshTest() {
    var uri = 'api/capsavvy/' + localStorage.APIKey;

    // Send an AJAX request
    $.getJSON(uri)
        .done(function (data) {
            $('#PeakDownload').text(parseFloat(data.Peak.Down).toFixed(2));
            $('#PeakDownloadPredicted').text(parseFloat(data.Peak.DownPredicted).toFixed(2));
            $('#PeakUpload').text(parseFloat(data.Peak.Up).toFixed(2));
            $('#PeakUploadPredicted').text(parseFloat(data.Peak.UpPredicted).toFixed(2));
            $('#PeakTotal').text(parseFloat(data.Peak.Total).toFixed(2));
            $('#PeakTotalPredicted').text(parseFloat(data.Peak.TotalPredicted).toFixed(2));
            $('#OffPeakDownload').text(parseFloat(data.OffPeak.Down).toFixed(2));
            $('#OffPeakDownloadPredicted').text(parseFloat(data.OffPeak.DownPredicted).toFixed(2));
            $('#OffPeakUpload').text(parseFloat(data.OffPeak.Up).toFixed(2));
            $('#OffPeakUploadPredicted').text(parseFloat(data.OffPeak.UpPredicted).toFixed(2));
            $('#OffPeakTotal').text(parseFloat(data.OffPeak.Total).toFixed(2));
            $('#OffPeakTotalPredicted').text(parseFloat(data.OffPeak.TotalPredicted).toFixed(2));
            $('#AllDownload').text(parseFloat(data.All.Down).toFixed(2));
            $('#AllDownloadPredicted').text(parseFloat(data.All.DownPredicted).toFixed(2));
            $('#AllUpload').text(parseFloat(data.All.Up).toFixed(2));
            $('#AllUploadPredicted').text(parseFloat(data.All.UpPredicted).toFixed(2));
            $('#AllTotal').text(parseFloat(data.All.Total).toFixed(2));
            $('#AllTotalPredicted').text(parseFloat(data.All.TotalPredicted).toFixed(2));
        })
        .fail(function () {
            alert("error");
        });

    //$.ajax({
    //    type: 'GET',
    //    url: CapSavvyUrl + '?key=' + localStorage.APIKey, // TODO HTTPS
    //    success: function (result, status, xhr) {
    //        alert(result);
    //    },
    //    error: function (xhr, status, error) {
    //        alert('error getting data from the api\n' + xhr.responseText + '\n' + status + '\n' + error);
    //    }
    //});
}

function RefreshUsageTeksavvy() {
    // Request with custom header
    $.ajax({
        type: 'GET',
        url: 'https://api.teksavvy.com/web/usage/usagesummaryrecords?$filter=iscurrent%20eq%20true',
        headers: { 'teksavvy-apikey': localStorage.APIKey },
        success: function (result, status, xhr) {
            alert(result);
        },
        error: function (xhr, status, error) {
            alert('error getting data from the api\n' + xhr.responseText + '\n' + status + '\n' + error);
        }
    });
}