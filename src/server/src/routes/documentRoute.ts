import { inject, injectable } from 'inversify';
import * as express from 'express';

import BaseRoute from './baseRoute';
import dependencyIdentifiers from '../dependencyIdentifiers';
import DocumentController from '../controllers/documentController';
import IDocument from '../models/document';
import ModelBinder from '../services/modelBinder';

@injectable()
export default class DocumentRoute extends BaseRoute {

  private documentController: DocumentController;
  private modelBinder: ModelBinder;
  
  constructor(
    @inject(dependencyIdentifiers.DocumentController) documentController: DocumentController,
    @inject(dependencyIdentifiers.ModelBinder) modelBinder: ModelBinder) {
    super();
    this.documentController = documentController;
    this.modelBinder = modelBinder;
  }

  public configure(app: express.Application): void {

    app
      .route('/api/document/:contentType')
      .get(async (request, response) => {
        return super.tryAction<IDocument>(async () => {
          const user = super.getAuthenticatedUser(request);
          return super.buildResponse(response,
            await this.documentController.getAsync(request.params.documentType));
        });
      });

    app
      .route('/api/document')
      .post(async (request, response) => {
        return super.tryAction<IDocument>(async () => {
          const user = super.getAuthenticatedUser(request);
          const document = this.modelBinder.getDocument(request.body);
          return super.buildResponse(response,
            await this.documentController.updateAsync(document));
        });
      });
  }
}
