bookingformJS.config(function($mdDateLocaleProvider) {
    // Change date format
    $mdDateLocaleProvider.formatDate = function(date) {
        return date ? moment(date).format('DD/MM/YYYY') : '';
    };
    // In on typing date parse date format
    $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, 'DD/MM/YYYY', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };
    // Set Monday as the first week day
    $mdDateLocaleProvider.firstDayOfWeek = 1;
});
