const fs = require('fs');

exports.gatherControllers = (app, dir) => {
    const controllerDir = `${dir}/lib/controllers`;
    const _this = this;

    try {
        let stats = fs.lstatSync(controllerDir);
        stats.isDirectory();
    } catch (e) {
        throw new Error(`The controller directory does not exist. (${controllerDir})`);
    }

    fs.readdirSync(controllerDir).forEach(file => {
        const route = require(`${controllerDir}/${file}`);

        if (typeof route.controller !== 'function') {
            throw new Error(`No controller method defined on the exposed object for: ${controllerDir}/${route}`);
        }
        console.log(`Loaded controller ${controllerDir}/${file}`);
        route.controller(app);
    });
};