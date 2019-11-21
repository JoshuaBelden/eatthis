import { expect } from 'chai';
import GroceryListBuilder from '../../src/services/groceryListBuilder';
import DepartmentRepository from '../../src/repositories/departmentRepository';
import Ingredient from '../../src/models/ingredient';

describe('Grocery list builder', () => {
    const departmentRepository = new DepartmentRepository();
    const foodData = [];

    it('should combine equal ingredients', async () => {
        const groceryListBuilder = new GroceryListBuilder(departmentRepository);
        const ingredients: Ingredient[] = [
            {
                input: '',
                quantity: 1,
                unitOfMeasure: 'cup',
                name: 'butter',
                modifier: '',
                preparation: ''

            },
            {
                input: '',
                quantity: 1,
                unitOfMeasure: 'cup',
                name: 'butter',
                modifier: '',
                preparation: ''

            },
        ];

        const result = await groceryListBuilder.combineIngredients('user-id', ingredients, foodData);
        expect(result.length).to.equal(1);
        expect(result[0].ingredient).to.equal('butter');
        expect(result[0].quantity).to.equal(2);
        expect(result[0].unit).to.equal('cup');
    });
});
