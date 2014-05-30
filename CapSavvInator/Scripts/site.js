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
    // Send an AJAX request
    $.post(ApiUrl, { '': localStorage.APIKey }, null, 'json')
        .done(function (data) {
            $('#lblISP').text(data.ISP);
            $('#PeakDownload').text(parseFloat(data.Usage.Peak.Down).toFixed(2));
            $('#PeakDownloadPredicted').text(parseFloat(data.Usage.Peak.DownPredicted).toFixed(2));
            $('#PeakUpload').text(parseFloat(data.Usage.Peak.Up).toFixed(2));
            $('#PeakUploadPredicted').text(parseFloat(data.Usage.Peak.UpPredicted).toFixed(2));
            $('#PeakTotal').text(parseFloat(data.Usage.Peak.Total).toFixed(2));
            $('#PeakTotalPredicted').text(parseFloat(data.Usage.Peak.TotalPredicted).toFixed(2));
            $('#OffPeakDownload').text(parseFloat(data.Usage.OffPeak.Down).toFixed(2));
            $('#OffPeakDownloadPredicted').text(parseFloat(data.Usage.OffPeak.DownPredicted).toFixed(2));
            $('#OffPeakUpload').text(parseFloat(data.Usage.OffPeak.Up).toFixed(2));
            $('#OffPeakUploadPredicted').text(parseFloat(data.Usage.OffPeak.UpPredicted).toFixed(2));
            $('#OffPeakTotal').text(parseFloat(data.Usage.OffPeak.Total).toFixed(2));
            $('#OffPeakTotalPredicted').text(parseFloat(data.Usage.OffPeak.TotalPredicted).toFixed(2));
            $('#AllDownload').text(parseFloat(data.Usage.All.Down).toFixed(2));
            $('#AllDownloadPredicted').text(parseFloat(data.Usage.All.DownPredicted).toFixed(2));
            $('#AllUpload').text(parseFloat(data.Usage.All.Up).toFixed(2));
            $('#AllUploadPredicted').text(parseFloat(data.Usage.All.UpPredicted).toFixed(2));
            $('#AllTotal').text(parseFloat(data.Usage.All.Total).toFixed(2));
            $('#AllTotalPredicted').text(parseFloat(data.Usage.All.TotalPredicted).toFixed(2));

            if (data.Success) {
                $('#pnlUsageData').show('slow');
            } else {
                $('#pnlUsageData').hide('slow');
            }
        })
        .fail(function () {
            $('#lblISP').text('');
            $('#pnlUsageData').hide('slow');
        });
}