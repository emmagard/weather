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
  })
  .when('/tomorrow', {
    templateUrl: 'views/tomorrow.html',
    controller: 'tomorrowController'
  })
  .when('/fiveday', {
    templateUrl: 'views/fiveday.html',
    controller: 'fiveController'
  });
});

weatherApp.filter('capitalize', function(){
  return  function(input){
    var words = input.split(' ');
    var result = [];
    if (words.length > 1){
      words.forEach(function(word){
        result.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
      });
      return result.join('_');
    } else {
      return result.join(' ');
    }
  };
});

weatherApp.filter('unSnakecase', function(){
  return function(input){
    var result = [];
    if (input.indexOf('_') !== -1){
      var words = input.split('_');
      words.forEach(function(word){
        result.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
      });
    } else {
      var otherwords = input.split(' ');
      otherwords.forEach(function(word){
        result.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
      });
    }
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
    locationService.city = $scope.city;
  });

  $scope.$watch('state', function(){
    locationService.state = $filter('uppercase')($scope.state);
  });

  $scope.unSnakeCity = function(){
    return $filter('unSnakecase')($scope.city);
  };
  $scope.uppercaseState = function(){
    return $filter('uppercase')($scope.state);
  };
}]);

weatherApp.controller('todayController', ['$scope', '$filter', '$http', 'locationService', function($scope, $filter, $http, locationService){
  $scope.city= locationService.city;
  $scope.state= locationService.state;

  $scope.unSnakeCity = function(){
    return $filter('unSnakecase')($scope.city);
  };

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
      $http.get(baseURL + key + '/forecast/q/' + $scope.state + '/' + $scope.city + '.json')
        .success(function(data){
          var forecast = data.forecast.simpleforecast.forecastday[0];
          $scope.hi = forecast.high.fahrenheit;
          $scope.lo = forecast.low.fahrenheit;
          $scope.forecast = data.forecast.txt_forecast.forecastday[0].fcttext;
          $scope.date = forecast.date.monthname +  ' ' + forecast.date.day + ', ' + forecast.date.year;
          $scope.icon = forecast.icon_url;
          console.log(data);
        });
    });


}]);

weatherApp.controller('tomorrowController', ['$scope', '$filter', '$http', 'locationService', function($scope, $filter, $http, locationService){
  $scope.city= locationService.city;
  $scope.state= locationService.state;

  $scope.unSnakeCity = function(){
    return $filter('unSnakecase')($scope.city);
  };

  var baseURL = "http://api.wunderground.com/api/";

  $http.get('data/key.json')
    .success(function(data){
      var key = data.appKey;
      $http.get(baseURL + key + '/forecast/q/' + $scope.state + '/' + $scope.city + '.json')
        .success(function(data){
          var forecast = data.forecast.simpleforecast.forecastday[1];
          $scope.hi = forecast.high.fahrenheit;
          $scope.lo = forecast.low.fahrenheit;
          $scope.forecast = data.forecast.txt_forecast.forecastday[1].fcttext;
          $scope.date = forecast.date.monthname +  ' ' + forecast.date.day + ', ' + forecast.date.year;
          $scope.icon = forecast.icon_url;
        });
    });
}]);

weatherApp.controller('fiveController', ['$scope', '$filter', '$http', 'locationService', function($scope, $filter, $http, locationService){
  $scope.city= locationService.city;
  $scope.state= locationService.state;

  $scope.unSnakeCity = function(){
    return $filter('unSnakecase')($scope.city);
  };

  var baseURL = "http://api.wunderground.com/api/";

  $http.get('data/key.json')
    .success(function(data){
      var key = data.appKey;
      $http.get(baseURL + key + '/forecast10day/q/' + $scope.state + '/' + $scope.city + '.json')
        .success(function(data){
          var forecast = data.forecast.simpleforecast;
          $scope.hi1 = forecast.forecastday[0].high.fahrenheit;
          $scope.hi2 = forecast.forecastday[1].high.fahrenheit;
          $scope.hi3 = forecast.forecastday[2].high.fahrenheit;
          $scope.hi4 = forecast.forecastday[3].high.fahrenheit;
          $scope.hi5 = forecast.forecastday[4].high.fahrenheit;
          $scope.low1 = forecast.forecastday[0].low.fahrenheit;
          $scope.low2 = forecast.forecastday[1].low.fahrenheit;
          $scope.low3 = forecast.forecastday[2].low.fahrenheit;
          $scope.low4 = forecast.forecastday[3].low.fahrenheit;
          $scope.low5 = forecast.forecastday[4].low.fahrenheit;
          $scope.forecast1 = data.forecast.txt_forecast.forecastday[0].fcttext;
          $scope.forecast2 = data.forecast.txt_forecast.forecastday[1].fcttext;
          $scope.forecast3 = data.forecast.txt_forecast.forecastday[2].fcttext;
          $scope.forecast4 = data.forecast.txt_forecast.forecastday[3].fcttext;
          $scope.forecast5 = data.forecast.txt_forecast.forecastday[4].fcttext;
          $scope.icon1 = forecast.forecastday[0].icon_url;
          $scope.icon2 = forecast.forecastday[1].icon_url;
          $scope.icon3 = forecast.forecastday[2].icon_url;
          $scope.icon4 = forecast.forecastday[3].icon_url;
          $scope.icon5 = forecast.forecastday[4].icon_url;
          console.log($scope);
        });
    });


}]);



