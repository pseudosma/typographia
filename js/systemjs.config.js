(function (global) {
    System.config({
      map: {
        app: '/js/build'
      },
      packages: {
        app: {
          main: './game.js',
          defaultExtension: 'js'
        }
      }
    });
  })(this);