(function(){
    'use strict';

    var app = angular.module('appHanngar',[]);
    var count = 0;
    app.controller('login',function($scope){
       
       $scope.submitForm = function () {
            $scope.evento = 'click';
            console.log('testing');
        };
 
    });

    app.controller('FindTracks', function($scope, $sce, $http) {
      var _length=0;
      $scope.i = 0;
      $scope.status='Pause';
      $scope.playing='pause';
      $scope.statusClass='play';
      $scope.tracks = [];
      $http.get('https://api.spotify.com/v1/tracks/?ids=2LxYSBpLM0xGXy9TP9BWRd,0eGsygTp906u18L0Oimnem,2TpxZ7JUBn3uw46aR7qd6V,4PjcfyZZVE10TFd9EKA72r,2tniUNfN0hmqavFuJ2NodO,4JAJ6ujlF593H31kA4UhjR,6UbiYwgZJrwqB5ILDVk1e5').success(
        function (data) {

          $scope.tracks = [];
          $scope.info = data; 
          _length= data.tracks.length; 
          
        for (var i = 0; i < _length; i++) {

            var track = {
              'name' : data.tracks[i].name,
              'album' : data.tracks[i].artists[0].name,
              'images': $sce.trustAsResourceUrl(data.tracks[i].album.images[1].url),
              'audio': $sce.trustAsResourceUrl(data.tracks[i].preview_url)
            };

             $scope.tracks.push(track);

          }
          console.log($scope.tracks);
    });
    
      $scope.getNextSong = function(){
        var next = $('#next').parent().parent().parent().parent();
        $(next).hide().removeClass('in');
        $(next).attr('aria-hidden', true);
        $('.modal-backdrop').remove();
        $('.playSong').click();
        console.log(next);

      };
      $scope.getBackSong = function(){
        console.log('back');
      };

      $scope.getPlaySong = function() {
      if ($('.modal-backdrop').hasClass('in')) {
            var song = $('.modal-backdrop.in+div audio')[0];
            song = $(song).attr('id');
            if (count===0) {
              _play(song);
              count++;
            } else {
              _pause(song)
              count=0;
            }
          }
        }

      $scope.getBackSong = function(){
         console.log('back');
      };
      function _play(song) {
      $scope.status='Pause';
      $scope.statusClass='pause';
      $scope.playing = true;
    
      document.getElementById(song).play();
      }
    function _pause(song) {
      $scope.status='Play';
      $scope.statusClass='play';
      $scope.playing = false;
      document.getElementById(song).pause();
      }

      function _stopSong (song) {
         $('body').not('.modal-dialog').click(function(){
          if ($('.modal-backdrop').hasClass('in')) {
            document.getElementById(song).pause();
          }
        })
      }

      function _nextSong(song) {
        
      }


  });
    // ng-repeat solution for handlebars
    app.config(function($interpolateProvider) {
      $interpolateProvider.startSymbol('{[{');
      $interpolateProvider.endSymbol('}]}');
    });

})();