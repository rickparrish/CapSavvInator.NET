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
    // TODO This should be supplied with @Url.Action or something
    var uri = 'api/capsavvy';

    // Send an AJAX request
    $.post(uri, { '': localStorage.APIKey }, null, 'json')
        .done(function (data) {
            $('#lblISP').text(data.ISP);
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
}