'use strict';



var foodAppControllers = angular.module('foodAppControllers', ['ngRoute']);

foodAppControllers.controller('menuListingController', ['$scope', 'menuListService', function($scope,menuListService) {

    menuListService.list(function(data) {
      $scope.menuList = data;
    });

    $scope.item_count = 0;
    $scope.cart_total = 0;
    $scope.cart_items = [];

    if (localStorage.getItem("cart") !== null) {
        $scope.cart_items = JSON.parse(localStorage.getItem("cart"));
    }
        

    $scope.get_selected_item = function (item) {

      $scope.selected_item = angular.copy(item);
      $scope.selected_item.total_price = $scope.selected_item.price;
      $scope.selected_item.customization = [];

      $scope.add_to_cart($scope.selected_item);
    }


    $scope.add_to_cart = function (selectedItem) {

        var duplicate = false;
        var isvalid = true;


        if (isvalid) {

              for (var i = 0; i < $scope.cart_items.length; i++) {

                  var qty = $scope.cart_items[i].quantity;

                  $scope.cart_items[i].quantity = selectedItem.quantity;
                  $scope.cart_items[i].total_price = $scope.cart_items[i].quantity * $scope.cart_items[i].price;

                  if (JSON.stringify(angular.copy(selectedItem)) === JSON.stringify(angular.copy($scope.cart_items[i]))) {
                      duplicate = true;

                      $scope.cart_items[i].quantity = qty + selectedItem.quantity;
                      $scope.cart_items[i].total_price = $scope.cart_items[i].quantity * $scope.cart_items[i].price;
                      break;
                  } else {
                      $scope.cart_items[i].quantity = qty;
                      $scope.cart_items[i].total_price = $scope.cart_items[i].quantity * $scope.cart_items[i].price;
                  }
              }
              
              if (!duplicate) {
                  $scope.cart_items.push(angular.copy(selectedItem));
              }

          } 
    }

      $scope.remove_cart_item = function(index) {
            $scope.cart_items.splice(index, 1);
        };

        $scope.edit_quantity = function(count, item) {
            if (count === -1 && item.quantity > 1) {
                item.quantity--;
            } else if (count === 1) {
                item.quantity++;
            }
            item.total_price = item.quantity * item.price;
        };

      $scope.$watch("cart_items", function() {
          $scope.item_count = 0;
          $scope.cart_total = 0;
          angular.forEach($scope.cart_items, function(item) {
              $scope.cart_total += item.total_price;
              $scope.item_count += item.quantity;
          });
          localStorage.setItem("cart", JSON.stringify($scope.cart_items));

          if ($scope.cart_items.length === 0) {
              localStorage.removeItem("cart");
          } 
      }, true);
    
}])
