'use strict';

/* App Module */


var foodApp = angular.module('foodApp', [
  'ngRoute',
  'foodAppServices',
  'foodAppControllers',
  'foodAppDirectives'
]);


foodApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider , $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/menulisting.html'
        //controller: 'menuListingController'
      });

     if(window.history && window.history.pushState){
        $locationProvider.html5Mode(true);
      }

  }]);
