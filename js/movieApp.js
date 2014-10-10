  // the app module
  var movieApp = angular.module('movieApp',['ui.router','ngResource']);

  movieApp.config(function($stateProvider,$httpProvider){
    $stateProvider

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
    });

  })

  .run(function($state){
    $state.go('movies');
  });

  movieApp.controller('MovieListController',function($scope,$state,popupService,$window,Movie){
    $scope.movies=Movie.query();
    $scope.deleteMovie=function(movie){
        if(popupService.showPopup('Really delete this?')){
            movie.$delete(function(){
                $window.location.href='';
            });
        }
    }
  });

  movieApp.controller('MovieViewController',function($scope,$stateParams,Movie){
    $scope.movie=Movie.get({id:$stateParams.id});
  });

  movieApp.controller('MovieCreateController',function($scope,$state,$stateParams,Movie){
    $scope.movie=new Movie();
    $scope.addMovie=function(){
        $scope.movie.$save(function(){
            $state.go('movies');
        });
    }
  });

  movieApp.controller('MovieEditController',function($scope,$state,$stateParams,Movie){
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

  movieApp.factory('Movie',function($resource){
    return $resource('http://localhost:8000/api/movies/:id',{id:'@_id'},{
        update: {
            method: 'PUT'
        }
    });
  });

  movieApp.service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
  });