import Application from './application';
import container from './dependencyContainer';
import dependencyIdentifiers from './dependencyIdentifiers';
import config from './environment/environment';

container
    .get<Application>(dependencyIdentifiers.Application)
    .listen(config.service.port);
