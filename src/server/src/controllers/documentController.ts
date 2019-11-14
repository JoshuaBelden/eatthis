import { inject, injectable } from 'inversify';

import dependencyIdentifiers from '../dependencyIdentifiers';
import DocumentRepository from '../repositories/documentRepository';
import Result from '../models/result';
import IDocument from '../models/document';

@injectable()
export default class DocumentController {

    private documentRepository: DocumentRepository;

    constructor(
        @inject(dependencyIdentifiers.DocumentRepository) documentRepository: DocumentRepository) {
        this.documentRepository = documentRepository;
    }

    public async getAsync(documentType: string): Promise<Result<IDocument>> {
        return new Result<IDocument>(true, await this.documentRepository.getAsync(documentType));
    }

    public async updateAsync(document: IDocument): Promise<Result<IDocument>> {
        return new Result<IDocument>(true, await this.documentRepository.updateAsync(document));
    }
}
