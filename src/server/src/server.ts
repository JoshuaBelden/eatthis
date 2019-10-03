import Application from './application'
import container from './dependencyContainer'
import dependencyIdentifiers from './dependencyIdentifiers'

container
    .get<Application>(dependencyIdentifiers.Application)
    .listen(process.env.PORT)