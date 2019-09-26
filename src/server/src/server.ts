import Application from './application'
import container from './dependency/dependency.config'
import SERVICE_IDENTIFIERS from './dependency/serviceIdentifiers'

container
    .get<Application>(SERVICE_IDENTIFIERS.Application)
    .listen(process.env.PORT)