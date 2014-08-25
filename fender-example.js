var reg = require('protob').Compiler.compile('./proto-bundle.json'),
    spotifyScope = reg.scope('spotify.v1'),
    AlbumService = spotifyScope.lookup('AlbumMetadata'),
    ArtistService = spotifyScope.lookup('ArtistMetadata'),
    TrackService = spotifyScope.lookup('TrackMetadata'),
    FenderClient = require('fender/client'),
    fenderClient = new FenderClient(),
    inspect = function(thing) { return require('util').inspect(thing, {depth: null}); };

fenderClient.prepareClientServiceHandlers(spotifyScope.services());

new TrackService().Search({q: "Hot"})
.then(function(resp) { console.log(inspect(resp.asJSON())); })
.catch(function(err) { 
  console.error(err);
  if(err.fenderValidationErrors) {
    console.error("ERROR", inspect(err.fenderValidationErrors.asJSON()));
  }
})
