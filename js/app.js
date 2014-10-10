  // the app module
  var mainApp = angular.module('mainApp',['ui.router','ngResource']);

  mainApp.config(function($stateProvider,$httpProvider){
    $stateProvider

    .state('home',{
        url:'/',
        templateUrl:'views/home.html',
        controller:'MainController'
    })

    .state('movies',{
        url:'/movies',
        templateUrl:'views/movies.html',
        controller:'MovieListController'
    })

    .state('viewMovie',{
       url:'/movies/:id/view',
       templateUrl:'views/movie-view.html',
       controller:'MovieViewController'
    })

    .state('newMovie',{
        url:'/movies/new',
        templateUrl:'views/movie-add.html',
        controller:'MovieCreateController'
    })

    .state('editMovie',{
        url:'/movies/:id/edit',
        templateUrl:'views/movie-edit.html',
        controller:'MovieEditController'
    })

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
    $state.go('movies');
    $state.go('home');
  });

  mainApp.controller('MainController',function($scope){
  	$scope.title = "The Sleepy API Framework";
  	$scope.message = "Welcome to the RESTing Template";
  });

  mainApp.controller('MovieListController',function($scope,$state,popupService,$window,Movie){
    $scope.movies=Movie.query();
    $scope.deleteMovie=function(movie){
        if(popupService.showPopup('Really delete this?')){
            movie.$delete(function(){
                $window.location.href='';
            });
        }
    }
  });

  mainApp.controller('MovieViewController',function($scope,$stateParams,Movie){
    $scope.movie=Movie.get({id:$stateParams.id});
  });

  mainApp.controller('MovieCreateController',function($scope,$state,$stateParams,Movie){
    $scope.movie=new Movie();
    $scope.addMovie=function(){
        $scope.movie.$save(function(){
            $state.go('movies');
        });
    }
  });

  mainApp.controller('MovieEditController',function($scope,$state,$stateParams,Movie){
    $scope.updateMovie=function(){
        $scope.movie.$update(function(){
            $state.go('movies');
        });
    };
    $scope.loadMovie=function(){
        $scope.movie=Movie.get({id:$stateParams.id});
    };
    $scope.loadMovie();
  });

  mainApp.controller('WineListController',function($scope,$state,popupService,$window,Wine){
    $scope.wines=Wine.query();
    $scope.deleteWine=function(wine){
        if(popupService.showPopup('Really delete this?')){
            wine.$delete(function(){
                $window.location.href='';
            });
        }
    }
  });

  mainApp.controller('WineViewController',function($scope,$stateParams,Wine){
    $scope.wine=Wine.get({id:$stateParams.id});
  });

  mainApp.controller('WineCreateController',function($scope,$state,$stateParams,Wine){
    $scope.wine=new Wine();
    $scope.addWine=function(){
        $scope.wine.$save(function(){
            $state.go('wines');
        });
    }
  });

  mainApp.controller('WineEditController',function($scope,$state,$stateParams,Wine){
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

  mainApp.factory('Movie',function($resource){
    return $resource('http://localhost:8000/api/movies/:id',{id:'@_id'},{
        update: {
            method: 'PUT'
        }
    });
  });

  mainApp.service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
  });

  mainApp.factory('Wine',function($resource){
    return $resource('http://localhost:8888/resting-template/api/php/wines/:id',{id:'@id'},{
        update: {
            method: 'PUT'
        }
    });
  });

  mainApp.service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
  });