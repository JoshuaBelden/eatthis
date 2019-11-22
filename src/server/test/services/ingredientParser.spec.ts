import { expect } from 'chai';
import IngredientParser from '../../src/services/ingredientParser';
import DocumentRepository from '../../src/repositories/documentRepository';
import FoodItem from '../../src/models/foodItem';

describe('Ingredient parser', () => {

    const unitsOfMeasure: Map<string, string[]> = new Map([['$1 can', ['([0-9]+.ounce).*can']], ['$1 slice', ['([0-9]+.ounce).*slice']], ['tsp', ['teaspoons', 'teaspoon', 'tsp']], ['tbs', ['tablespoons', 'tablespoon', 'tbs']], ['cup', ['cups', 'cup']], ['oz', ['ounces', 'ounce', 'oz']], ['pint', ['pints', 'pint']], ['qt', ['quarts', 'quart', 'qt']], ['gallon', ['gallons', 'gallon']], ['lb', ['pounds', 'pound', 'lb']], ['handful', ['handful']], ['dash', ['dash']], ['pinch', ['pinch']], ['stick', ['(stick)[s]*']], ['clove', ['(clove)[s]*']], ['bottle', ['(bottle)[s]*']]]);
    const foodPreparations = ['diced'];
    const foodModifiers = ['small', 'medium', 'large'];
    const foodData = [
        new FoodItem('avocado'),
        new FoodItem('crushed tomatoes'),
        new FoodItem('butter'),
        new FoodItem('yellow onion')
    ];

    it('should parse a simple ingredient line', async () => {
        const parser = new IngredientParser();
        const result = await parser.parse('1 cup avocado', unitsOfMeasure, foodPreparations, foodModifiers, foodData);
        expect(result.quantity).to.equal(1);
        expect(result.unitOfMeasure).to.equal('cup');
        expect(result.name).to.equal('avocado');
    });

    it('should handle miscellaneous words in the ingredient line', async () => {
        const parser = new IngredientParser();
        const result = await parser.parse('2.5 cups of crushed tomatoes', unitsOfMeasure, foodPreparations, foodModifiers, foodData);
        expect(result.quantity).to.equal(2.5);
        expect(result.unitOfMeasure).to.equal('cup');
        expect(result.name).to.equal('crushed tomatoes');
    });

    it('should handle fractions', async () => {
        const parser = new IngredientParser();
        const result = await parser.parse('1/4 stick of butter', unitsOfMeasure, foodPreparations, foodModifiers, foodData);
        expect(result.quantity).to.equal(.25);
        expect(result.unitOfMeasure).to.equal('stick');
        expect(result.name).to.equal('butter');
    });

    it('should handle whole numbers and fractions', async () => {
        const parser = new IngredientParser();
        const result = await parser.parse('3 1/3 sticks of butter', unitsOfMeasure, foodPreparations, foodModifiers, foodData);
        expect(result.quantity).to.equal(3.33);
        expect(result.unitOfMeasure).to.equal('stick');
        expect(result.name).to.equal('butter');
    });

    it('should handle certain size cans', async () => {
        const parser = new IngredientParser();
        const result = await parser.parse('2 10-ounce cans of crushed tomatoes', unitsOfMeasure, foodPreparations, foodModifiers, foodData);
        expect(result.quantity).to.equal(2);
        expect(result.unitOfMeasure).to.equal('10-ounce can');
        expect(result.name).to.equal('crushed tomatoes');
    });

    it('should parse food descriptions', async () => {
        const parser = new IngredientParser();
        const result = await parser.parse('1 large yellow onion', unitsOfMeasure, foodPreparations, foodModifiers, foodData);
        expect(result.quantity).to.equal(1);
        expect(result.modifier).to.equal('large');
        expect(result.name).to.equal('yellow onion');
    });

    it('should parse food preparations', async () => {
        const parser = new IngredientParser();
        const result = await parser.parse('1 medium yellow onion diced up', unitsOfMeasure, foodPreparations, foodModifiers, foodData);
        expect(result.quantity).to.equal(1);
        expect(result.modifier).to.equal('medium');
        expect(result.preparation).to.equal('diced');
        expect(result.name).to.equal('yellow onion');
    });
});
