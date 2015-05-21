'use strict';

angular.module('foodAppServices', []).
  factory('menuListService', function($http) {

      return {
        list: function(callback){

          //console.log(location.href + 'food.json');	
          $http.get(location.href + 'food.json').success(callback);
          
        }
      };

  });



