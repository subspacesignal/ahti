var app = angular.module('app', []);

app.controller('mainController', ['$scope', '$http', function ($scope, $http) {
  $http.get('/api').then(function successCallback(response) {
    $scope.hrefs = response.data.hrefs;
  }, function errorCallback(response) {
    console.log(response);
  });
}]);