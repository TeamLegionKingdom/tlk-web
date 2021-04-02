const BodyParser = require( 'body-parser' );
const Express = require( 'express' );
const path = require("path");
const App = Express();
const {PythonShell} = require('python-shell');
const port = 80

// Parse request of content-type - application/x-www-form-urlencoded

App.use(BodyParser.json());
App.use( BodyParser.urlencoded( { extended: true } ) );
App.use(Express.static(__dirname+'/tlk'))

App.post( '/extrapolar', function( req, res ) {
    console.log(req.body);

    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: __dirname + '/tlk/python',
        args: [String(req.body.cc1),req.body.cc2]
    };

    PythonShell.run('extrapolador.py',options, function(err,results) {
        // if(err) throw err;
        if (results && (results[0]) !== "Error") {
            res.send("<h1>" + results[0] + "\n" + results[1] +  "\n" + results[2] + "</h1>")
            res.end()
        }
        res.end()

    });
} );

App.post( '/ccgen', function( req, res ) {
    console.log(req.body);
});

App.use('/', function(req,res){
    res.sendFile(path.join(__dirname+'/tlk/index.html'))
})

App.listen( port, () => {
    console.log( "Server Run:" + port );
} );



