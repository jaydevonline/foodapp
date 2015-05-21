'use strict';


var foodAppDirectives = angular.module('foodAppDirectives', ['ngRoute']);


foodAppDirectives.directive('getMenu',  function(){

          return {
            restrict: 'A',
            scope: true,            
            link: function($scope, $element){

              $scope.filterByCategoryType = function(categoryType,event){

                  var caregoryTypeNonVeg = angular.element('[data-type="non-veg"]');
                  var caregoryTypeVeg = angular.element('[data-type="veg"]');                    
                  
                  angular.element('.btn-category').removeClass('active');
                  $(event.target).addClass('active');

                  if(categoryType === 'veg')
                  {                 
                      caregoryTypeNonVeg.fadeOut(function() {
                      caregoryTypeVeg.fadeIn();
                    });
                  }
                  else if(categoryType === 'non-veg')
                  {
                    caregoryTypeVeg.fadeOut(function() {
                      caregoryTypeNonVeg.fadeIn();
                    });                    
                  }
                  else{
                    caregoryTypeVeg.show();
                    caregoryTypeNonVeg.show();
                  }
              }

            }
        }
})

