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
    // Display loading animation
    $('#pnlNoData').hide('fast');
    $('#pnlUsageData').hide('fast');
    $('#pnlLoadingData').show('fast');

    // Send an AJAX request
    $.post(ApiUrl, { '': localStorage.APIKey }, null, 'json')
        .done(function (data) {
            $('#lblISP').text(data.ISP);

            if (data.Success) {
                $('#PeakDownload').text(parseFloat(data.Usage.Peak.Down).toFixed(1) + ' GB');
                $('#PeakDownloadAverage').text(parseFloat(data.Usage.Peak.DownAverage).toFixed(1) + ' GB');
                $('#PeakDownloadPredicted').text(parseFloat(data.Usage.Peak.DownPredicted).toFixed(1) + ' GB');
                $('#PeakUpload').text(parseFloat(data.Usage.Peak.Up).toFixed(1) + ' GB');
                $('#PeakUploadAverage').text(parseFloat(data.Usage.Peak.UpAverage).toFixed(1) + ' GB');
                $('#PeakUploadPredicted').text(parseFloat(data.Usage.Peak.UpPredicted).toFixed(1) + ' GB');
                $('#PeakTotal').text(parseFloat(data.Usage.Peak.Total).toFixed(1) + ' GB');
                $('#PeakTotalAverage').text(parseFloat(data.Usage.Peak.TotalAverage).toFixed(1) + ' GB');
                $('#PeakTotalPredicted').text(parseFloat(data.Usage.Peak.TotalPredicted).toFixed(1) + ' GB');
                $('#OffPeakDownload').text(parseFloat(data.Usage.OffPeak.Down).toFixed(1) + ' GB');
                $('#OffPeakDownloadAverage').text(parseFloat(data.Usage.OffPeak.DownAverage).toFixed(1) + ' GB');
                $('#OffPeakDownloadPredicted').text(parseFloat(data.Usage.OffPeak.DownPredicted).toFixed(1) + ' GB');
                $('#OffPeakUpload').text(parseFloat(data.Usage.OffPeak.Up).toFixed(1) + ' GB');
                $('#OffPeakUploadAverage').text(parseFloat(data.Usage.OffPeak.UpAverage).toFixed(1) + ' GB');
                $('#OffPeakUploadPredicted').text(parseFloat(data.Usage.OffPeak.UpPredicted).toFixed(1) + ' GB');
                $('#OffPeakTotal').text(parseFloat(data.Usage.OffPeak.Total).toFixed(1) + ' GB');
                $('#OffPeakTotalAverage').text(parseFloat(data.Usage.OffPeak.TotalAverage).toFixed(1) + ' GB');
                $('#OffPeakTotalPredicted').text(parseFloat(data.Usage.OffPeak.TotalPredicted).toFixed(1) + ' GB');
                $('#AllDownload').text(parseFloat(data.Usage.All.Down).toFixed(1) + ' GB');
                $('#AllDownloadAverage').text(parseFloat(data.Usage.All.DownAverage).toFixed(1) + ' GB');
                $('#AllDownloadPredicted').text(parseFloat(data.Usage.All.DownPredicted).toFixed(1) + ' GB');
                $('#AllUpload').text(parseFloat(data.Usage.All.Up).toFixed(1) + ' GB');
                $('#AllUploadAverage').text(parseFloat(data.Usage.All.UpAverage).toFixed(1) + ' GB');
                $('#AllUploadPredicted').text(parseFloat(data.Usage.All.UpPredicted).toFixed(1) + ' GB');
                $('#AllTotal').text(parseFloat(data.Usage.All.Total).toFixed(1) + ' GB');
                $('#AllTotalAverage').text(parseFloat(data.Usage.All.TotalAverage).toFixed(1) + ' GB');
                $('#AllTotalPredicted').text(parseFloat(data.Usage.All.TotalPredicted).toFixed(1) + ' GB');

                if (!data.TracksUploads) {
                    $('tr.Upload').hide();
                    $('tr.Total').hide();
                }

                if (!data.TracksOffPeak) {
                    $('#FreeUsage').hide();
                    $('#AllUsage').hide();
                }

                $('#pnlLoadingData').hide('slow');
                $('#pnlUsageData').show('slow');
            } else {
                $('#pnlLoadingData').hide('slow');
                $('#pnlNoData').show('slow');
            }
        })
        .fail(function () {
            $('#lblISP').text('');
            $('#pnlLoadingData').hide('slow');
            $('#pnlNoData').show('slow');
        });
}