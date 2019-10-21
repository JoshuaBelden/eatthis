import { Guid } from 'guid-typescript';
import { injectable } from 'inversify';

@injectable()
export default class RandomNumberGenerator {
    public generateGuid(): string {
        return Guid.create().toString();
    }
}
