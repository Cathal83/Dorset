bookingformJS.controller("docsCtrl", function($scope, $http, $filter, $q) {
  $scope.user.docs = [];
  /**
   * Document upload to DropBox controller
   */
  $scope.user.doc = [];
  $scope.docsUp = function docsUp() {

    return $q(function (resolve, reject) {
      var docs = $scope.user.docs;
      var numFiles = $scope.user.docs.length;
      var folderId = new Date();
      var folderId = $filter('date')(folderId, 'yyMMddhhmmss');
      $scope.user.docs.folderId = folderId; // Pass the folder name to the post Service.
      var dropboxToken = 'vcu7acvjByAAAAAAAAAAB1QOCMj1X0M3UhGGJB5sQzePNwi1oMfv5ot1mPTlorJf';
      var i = 0;
      $scope.status = 0;

      console.log(docs);
      // Multi file upload process
      for (i == 0; i < docs.length; i++) {

        var xhr = new XMLHttpRequest();
        var filesNumber = docs.length;
        var returnTrigger = docs.length - 1;

        // Upload Progress
        xhr.upload.onprogress = function (evt) {
          var percentComplete = parseInt(100.0 * evt.loaded / evt.total);
          console.log(percentComplete);
        };

        // Upload Status
        xhr.onload = function () {
          if (xhr.status === 200) {
            var fileInfo = JSON.parse(xhr.response);
          }
          else {
            var errorMessage = xhr.response || 'Unable to upload file';
            // Upload failed. Do something here with the error.
          }
        };

        //Upload Request
        xhr.open('POST', 'https://content.dropboxapi.com/2/files/upload', false);
        xhr.setRequestHeader('Authorization', 'Bearer ' + dropboxToken);
        xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
          path: '/' + folderId + '/' + docs[i].name,
          mode: 'add',
          autorename: true,
          mute: false
        }));

        xhr.send(docs[i]);
        console.log(i);
        console.log(returnTrigger);
        if (i == filesNumber - returnTrigger) {
          console.log('files uploaded');

        }
      }
      resolve('200');
      reject('100');
    });
  }
  /**
   * Upload documents settings and errors
   * Give error in case the document is too big
  **/
  $scope.docSize = function (doc, n) {

    if (doc != null) {

      var size = doc.size / 1000000;

      if (size > 5) {
        $scope.user.docs[n] = null;
        $scope.maxSize[n] = "error"; // send error
      }
      else {
        $scope.maxSize[n] = null;
      }

    } else { }

  }
});