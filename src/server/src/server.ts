import Application from './application'
import container from './dependencies/dependency.config'
import SERVICE_IDENTIFIERS from './dependencies/serviceIdentifiers'

container
    .get<Application>(SERVICE_IDENTIFIERS.Application)
    .listen(process.env.PORT)