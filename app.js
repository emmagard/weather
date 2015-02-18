var weatherApp = angular.module('weatherApp', ['ngRoute']);

weatherApp.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'views/home.html',
    controller: 'homeController'
  })
  .when('/today', {
    templateUrl: 'views/today.html',
    controller: 'todayController'
  });
});

weatherApp.filter('capitalize', function(){
  return  function(input){
    var words = input.split(' ');
    var result = [];
    words.forEach(function(word){
      result.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    });
    return result.join(' ');
  };
});

weatherApp.service('locationService', function(){
   this.city = '';
   this.state ='';
});

weatherApp.controller('homeController', ['$scope', '$filter', '$http', 'locationService', function($scope, $filter, $http, locationService){
  $scope.city = locationService.city;
  $scope.state = locationService.state;

  $scope.$watch('city', function(){
    locationService.city = $filter('capitalize')($scope.city);
  });

  $scope.$watch('state', function(){
    locationService.state = $filter('uppercase')($scope.state);
  });

  $scope.capitalizeCity = function(){
    return $filter('capitalize')($scope.city);
  };
  $scope.uppercaseState = function(){
    return $filter('uppercase')($scope.state);
  };
}]);

weatherApp.controller('todayController', ['$scope', '$filter', '$http', 'locationService', function($scope, $filter, $http, locationService){
  $scope.city= locationService.city;
  $scope.state= locationService.state;

  var baseURL = "http://api.wunderground.com/api/";

  $http.get('data/key.json')
    .success(function(data){
      var key = data.appKey;
      $http.get(baseURL + key + '/conditions/q/' + $scope.state + '/' + $scope.city +'.json')
        .success(function(data){
          $scope.weather = data.current_observation.weather;
          $scope.temperature = data.current_observation.temp_f;
          $scope.wind = data.current_observation.wind_string;
          console.log(data);
        });
    });

}]);
