import { expect } from 'chai';
import IngredientParser from '../../src/services/ingredientParser';
import DocumentRepository from '../../src/repositories/documentRepository';

describe('Ingredient parser', () => {

    // TODO: These units of measure are now coming from the database, which means we have to manage these in two places. Not good.
    //  These probably need to be wrapped in a service and mocked. Which means the parser probably needs to rely on the match to come
    //  from the units of measure service.
    const unitsOfMeasure: Map<string, string[]> = new Map([['$1 can', ['([0-9]+.ounce).*can']], ['$1 slice', ['([0-9]+.ounce).*slice']], ['tsp', ['teaspoons', 'teaspoon', 'tsp']], ['tbs', ['tablespoons', 'tablespoon', 'tbs']], ['cup', ['cups', 'cup']], ['oz', ['ounces', 'ounce', 'oz']], ['pint', ['pints', 'pint']], ['qt', ['quarts', 'quart', 'qt']], ['gallon', ['gallons', 'gallon']], ['lb', ['pounds', 'pound', 'lb']], ['handful', ['handful']], ['dash', ['dash']], ['pinch', ['pinch']], ['stick', ['(stick)[s]*']], ['clove', ['(clove)[s]*']], ['bottle', ['(bottle)[s]*']]]);
    const foodPreparations = [];
    const foodModifiers = [];
    const foodData = [];

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
        const result = await parser.parse('2 10-ounce cans of tomato sauce', unitsOfMeasure, foodPreparations, foodModifiers, foodData);
        expect(result.quantity).to.equal(2);
        expect(result.unitOfMeasure).to.equal('10-ounce can');
        expect(result.name).to.equal('tomato sauce');
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
        const result = await parser.parse('1 medium green onion diced up', unitsOfMeasure, foodPreparations, foodModifiers, foodData);
        expect(result.quantity).to.equal(1);
        expect(result.modifier).to.equal('medium');
        expect(result.preparation).to.equal('diced');
        expect(result.name).to.equal('green onion');
    });
});
