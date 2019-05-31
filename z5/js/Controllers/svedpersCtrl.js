var myApp=angular.module('myApp');

myApp.controller('svedpersCtrl', function($scope,$rootScope,$http) {    
             


            $http({method: 'GET', url: '/GetUsers'}).then(function success(response) {
              $scope.resu = response.data;
              console.log('resu=',$scope.resu)
          




//-------------------------------------------------------------------------------------

      
});
          })

