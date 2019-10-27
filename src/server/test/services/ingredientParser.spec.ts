import { expect } from 'chai';
import IngredientParser from '../../src/services/ingredientParser';

describe('Ingredient parser', () => {

    it('should parse a simple ingredient line', () => {
        const parser = new IngredientParser();
        const result = parser.parse('1 cup avocado');
        expect(result.quantity).to.equal(1);
        expect(result.unitOfMeasure).to.equal('cup');
        expect(result.name).to.equal('avocado');
    });

    it('should handle miscellaneous words in the ingredient line', () => {
        const parser = new IngredientParser();
        const result = parser.parse(('2.5 cups of crushed tomatoes'));
        expect(result.quantity).to.equal(2.5);
        expect(result.unitOfMeasure).to.equal('cup');
        expect(result.name).to.equal('crushed tomatoes');
    });

    it('should handle fractions', () => {
        const parser = new IngredientParser();
        const result = parser.parse(('1/4 stick of butter'));
        expect(result.quantity).to.equal(.25);
        expect(result.unitOfMeasure).to.equal('stick');
        expect(result.name).to.equal('butter');
    });

    it('should handle whole numbers and fractions', () => {
        const parser = new IngredientParser();
        const result = parser.parse(('3 1/3 sticks of butter'));
        expect(result.quantity).to.equal(3.33);
        expect(result.unitOfMeasure).to.equal('stick');
        expect(result.name).to.equal('butter');
    });

    it('should handle certain size cans', () => {
        const parser = new IngredientParser();
        const result = parser.parse(('2 10-ounce cans of tomato sauce'));
        expect(result.quantity).to.equal(2);
        expect(result.unitOfMeasure).to.equal('10-ounce can');
        expect(result.name).to.equal('tomato sauce');
    });

    it('should parse food descriptions', () => {
        const parser = new IngredientParser();
        const result = parser.parse(('1 large yellow onion'));
        expect(result.quantity).to.equal(1);
        expect(result.modifier).to.equal('large');
        expect(result.name).to.equal('yellow onion');
    });

    it('should parse food preparations', () => {
        const parser = new IngredientParser();
        const result = parser.parse(('1 medium green onion diced up'));
        expect(result.quantity).to.equal(1);
        expect(result.modifier).to.equal('medium');
        expect(result.preparation).to.equal('diced');
        expect(result.name).to.equal('green onion');
    });
});
