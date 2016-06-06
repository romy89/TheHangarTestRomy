(function(){
    'use strict';

    var app = angular.module('appHanngar',[]);
    var count = 0;
    app.controller('login',function($scope, $window){
      var mail;
      var pass;
       $scope.rememberMe = function(){
            localStorage.setItem("flag", true);
            mail = $('#mailUser').val();
            pass = $('#passUser').val();
            localStorage.setItem("mailUser", mail);
            localStorage.setItem("passUser", pass);
          }

      $scope.validateInputs =function() {
        mail = $('#mailUser').val();
        pass = $('#passUser').val();
        var emailRegex = /^(([a-zA-Z]|[0-9])|([-]|[_]|[.]))+[@](([a-zA-Z0-9])|([-])){2,63}[.](([a-zA-Z0-9]){2,63})+$/;
        var passRegex = /^.*(?=.{8,24})(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\-\_\#\.\+\=\*\%\$\@]).*$/;

        if (emailRegex.test(mail) && passRegex.test(pass)) {
          $window.location.href = 'songs.html';
        } else {
            if (emailRegex.test(mail)==false) {
              $('#emailContent').removeClass('valid').addClass('has-error');
            } 
            if (passRegex.test(pass)==false) {
              $('#passContent').removeClass('valid').addClass('has-error');
            }
        }
      }    
    });

    app.controller('FindTracks', function($scope, $sce, $http) {
      var _length=0;
      $scope.i = 0;
      $scope.status='Pause';
      $scope.playing='pause';
      $scope.statusClass='play';
      $scope.tracks = [];
      $http.get('https://api.spotify.com/v1/tracks/?ids=2LxYSBpLM0xGXy9TP9BWRd,2tniUNfN0hmqavFuJ2NodO,7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B,2TpxZ7JUBn3uw46aR7qd6V,4PjcfyZZVE10TFd9EKA72r').success(
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
    });
    
      $scope.getNextSong = function(index){
            var itemSong = _length -1;
            var songdId; 
            var pauseSong = 'song-'+index;;
            var playSong;
            if (index === itemSong) {
              songdId = (index - itemSong); 
              $('.modal-backdrop').click();
              $('button.song-'+songdId).click();
              playSong = 'song-'+songdId;
              document.getElementById('song-'+songdId).load();
            }else{
              songdId = (index + 1); 
              $('.modal-backdrop').click();
              $('button.song-'+songdId).click();
              playSong = 'song-'+songdId;
              document.getElementById('song-'+songdId).load();
            }  
            _pause(pauseSong);
            $('.timeBar').stop().css({'width':'0'});
            _play(playSong);
            _progressBar();
            
      };

      $scope.getBackSong = function(index){
           
            var itemSong = _length -1;
            var songdId;
            var pauseSong = 'song-'+index;
            var playSong;
            if (index === 0) {
              songdId = itemSong; 
              $('.modal-backdrop').click();
              $('button.song-'+songdId).click();
              playSong = 'song-'+songdId;
              document.getElementById('song-'+songdId).load();
            }else{
              songdId = (index - 1); 
              $('.modal-backdrop').click();
              $('button.song-'+songdId).click();
              playSong = 'song-'+songdId;
              document.getElementById('song-'+songdId).load();
            }           
            _pause(pauseSong);
            $('.timeBar').stop().css({'width':'0'});
            _play(playSong);
            _progressBar();
            
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

      function _play(song) {
      $scope.status='Pause';
      $scope.statusClass='pause';
      $scope.playing = true;
      _progressBar();
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


      function _progressBar() {
        $('.timeBar').animate({'width':'100%'},30000);
      }


  });
    // ng-repeat solution for handlebars
    app.config(function($interpolateProvider) {
      $interpolateProvider.startSymbol('{[{');
      $interpolateProvider.endSymbol('}]}');
    });

})();