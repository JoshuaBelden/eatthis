import Application from './application'
import { container, serviceIdentity } from './dependency.config'

container
    .get<Application>(serviceIdentity.Application)
    .listen(process.env.PORT)