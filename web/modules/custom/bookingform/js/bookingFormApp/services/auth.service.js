bookingformJS.run(['GAuth', 'GApi', 'GData', '$state', '$rootScope',
  function (GAuth, GApi, GData, $state, $rootScope) {

    $rootScope.gdata = GData;

    var CLIENT = '6909749829553-9jnkhamam7f3rnrrts3gm8pk5jkachma.apps.googleusercontent.com';
    var BASE = 'https://myGoogleAppEngine.appspot.com/_ah/api';

    GApi.load('drive', 'v3'); // for google api (https://developers.google.com/apis-explorer/)

    GAuth.setClient(CLIENT)
    // default scope is only https://www.googleapis.com/auth/userinfo.email
    GAuth.setScope('https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly');

    // load the auth api so that it doesn't have to be loaded asynchronously
    // when the user clicks the 'login' button.
    // That would lead to popup blockers blocking the auth window
    GAuth.load();

    // or just call checkAuth, which in turn does load the oauth api.
    // if you do that, GAuth.load(); is unnecessary
    GAuth.checkAuth().then(
      function (user) {
        console.log(user.name + ' is logged in');
        $state.go('webapp.home'); // an example of action if it's possible to
        // authenticate user at startup of the application
      },
      function () {
        $state.go('login'); // an example of action if it's impossible to
        // authenticate user at startup of the application
      }
    );
  }
]);