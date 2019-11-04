const environment = require(`./environment.${process.env.STAGE || 'local'}`);

export default environment.config;
