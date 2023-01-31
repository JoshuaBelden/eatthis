const authSecret = process.env.AUTH_SECRET || 'local-development-secret';
if (authSecret == 'local-development-secret') {
    console.log('WARNING - Auth secret is insecure. Please specify a valid AUTH_SECRET env variable.', process.env.AUTH_SECRET);
}
module.exports = authSecret;