bookingformJS.controller("docsCtrl", function($scope, $http, $filter) {
  $scope.user.docs = [];
  /**
   * Document upload to DropBox controller
   */
  $scope.user.doc = [];
  $scope.docsUp = function docsUp() {

    var docs = $scope.user.docs;
    var numFiles = $scope.user.docs.length;
    var folderId = new Date();
    var text = 'test';
    var folderId = $filter('date')(folderId, 'yyMMddhhmmss');
    $scope.user.docs.folderId = folderId; // Pass the folder name to the post Service.
    var dropboxToken = 'DVM0SFXgDugAAAAAAAASuqKrBV3NKj78SvEYngK-of8SmPyOosGQvECnzMlh28oY';
    var i = 0;
    $scope.status = 0;

    // Multi file upload process
    for (i == 0; i < docs.length; i++) {

      var xhr = new XMLHttpRequest();
      var counter = 0;

      // Upload Progress
      xhr.upload.onprogress = function (evt) {
        var percentComplete = parseInt(100.0 * evt.loaded / evt.total);
        console.log(percentComplete);
        console.log(docs.length);
        console.log(counter);
        if (percentComplete == 100) {
          $scope.status = '200'
          console.log(counter);
          counter++;
          console.log('uploaded');
        }
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
      
      return xhr.send(docs[i]);
      
    }
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
})