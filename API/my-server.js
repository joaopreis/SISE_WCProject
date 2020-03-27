const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

var fs = require('fs');
let brands = {}

fs.readFile('brands.json', 'utf-8', (err, data) => {
    if (err) throw err;
    brands = JSON.parse(data).brands;
})
var fs = require('fs');
let models = {}

fs.readFile('models.json', 'utf-8', (err, data) => {
    if (err) throw err;
    models = JSON.parse(data).models;
})

var fs = require('fs');
let products = {}

fs.readFile('car_products.json', 'utf-8', (err, data) => {
    if (err) throw err;
    products = JSON.parse(data).products;
})

const server = Hapi.Server({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

const init = async () => {
    try {
        await server.register(Inert);

        server.route({
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: '../APP/.',
                    redirectToSlash: true,
                    index: true,
                }
            }
        });

        await server.start();
        console.log(`Server running at: ${server.info.uri}`);
    } catch (err) {
        console.log(err);
    }
};

init();

server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, h) => {
        console.log(request);
        return `Hello ${request.params.name}`;
    }
});


server.route({
    method: 'GET',
    path: '/brands',
    handler: (request, h) => {
        return (JSON.stringify(brands));

    }
});

server.route({
    method: 'GET',
    path: '/insurance/models',
    handler: (request, h) => {
        return (JSON.stringify(models.filter(m=>m.brand_id==request.query.id)));
    }
});

server.route({
    method: 'GET',
    path: '/products',
    handler: (request, h) => {
        return (JSON.stringify(products));
    }
});
