const mongoose = require( 'mongoose' );

// Do the MongoDb connection
mongoose.Promise = global.Promise;

before( done => {
    mongoose.connect( 'mongodb://127.0.0.1/muber_test',
                      { useMongoClient: true } )
            .once( 'open', () => done() )
            .on( 'error', error => {
                console.warn( 'Warning', error );
            } );
} );

beforeEach( done => {
    const { drivers } = mongoose.connection.collections;
    drivers.drop().then( () => done() ).catch( () => done() );
} );

