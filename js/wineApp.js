  // the app module
  var wineApp = angular.module('wineApp',['ui.router','ngResource']);

  wineApp.config(function($stateProvider,$httpProvider){
    $stateProvider

    .state('wines',{
        url:'/wines',
        templateUrl:'views/wines.html',
        controller:'WineListController'
    })

    .state('viewWine',{
       url:'/wines/:id/view',
       templateUrl:'views/wine-view.html',
       controller:'WineViewController'
    })

    .state('newWine',{
        url:'/wines/new',
        templateUrl:'views/wine-add.html',
        controller:'WineCreateController'
    })

    .state('editWine',{
        url:'/wines/:id/edit',
        templateUrl:'views/wine-edit.html',
        controller:'WineEditController'
    });

  })

  .run(function($state){
    $state.go('wines');
  });

  wineApp.controller('WineListController',function($scope,$state,popupService,$window,Wine){
    $scope.wines=Wine.query();
    $scope.deleteWine=function(wine){
        if(popupService.showPopup('Really delete this?')){
            wine.$delete(function(){
                $window.location.href='';
            });
        }
    }
  });

  wineApp.controller('WineViewController',function($scope,$stateParams,Wine){
    $scope.wine=Wine.get({id:$stateParams.id});
  });

  wineApp.controller('WineCreateController',function($scope,$state,$stateParams,Wine){
    $scope.wine=new Wine();
    $scope.addWine=function(){
        $scope.wine.$save(function(){
            $state.go('wines');
        });
    }
  });

  wineApp.controller('WineEditController',function($scope,$state,$stateParams,Wine){
    $scope.updateWine=function(){
        $scope.wine.$update(function(){
            $state.go('wines');
        });
    };
    $scope.loadWine=function(){
        $scope.wine=Wine.get({id:$stateParams.id});
    };
    $scope.loadWine();
  });

  wineApp.factory('Wine',function($resource){
    return $resource('http://localhost:8888/resting-template/api/php/wines/:id',{id:'@id'},{
        update: {
            method: 'PUT'
        }
    });
  });

  wineApp.service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
  });