import { injectable, inject } from 'inversify';

import dependencyIdentifiers from '../dependencyIdentifiers';
import DocumentRepository from '../repositories/documentRepository';

@injectable()
export default class UnitsOfMeasureRepository {

    private documentRepository: DocumentRepository;
    private unitsOfMeasure: Map<string, Array<string>>;

    constructor(
        @inject(dependencyIdentifiers.DocumentRepository) documentRepository: DocumentRepository
    ) {
        this.documentRepository = documentRepository;
    }

    public async getUnitsOfMeasure(): Promise<Map<string, string[]>> {
        if (this.unitsOfMeasure) {
            return this.unitsOfMeasure;
        }

        this.unitsOfMeasure = new Map<string, Array<string>>();
        const document = await this.documentRepository.getAsync('units-of-measure');
        for (const item of document.content) {
            const key = item[0];
            const value: string[] = item[1];
            this.unitsOfMeasure.set(key, value);
        }

        return this.unitsOfMeasure;
    }
}
