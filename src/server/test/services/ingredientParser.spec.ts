import { expect } from 'chai';
import IngredientParser from '../../src/services/ingredientParser';

describe('Ingredient parser', () => {

    it('should parse a simple ingredient line', () => {
        const parser = new IngredientParser();
        const result = parser.parse('1 cup butter');
        expect(result.quantity).to.equal(1);
        expect(result.unit).to.equal('cup');
        expect(result.ingredient).to.equal('butter');
    });

    it('should handle miscellaneous words in the ingredient line', () => {
        const parser = new IngredientParser();
        const result = parser.parse(('1 cup of butter'));
        expect(result.quantity).to.equal(1);
        expect(result.unit).to.equal('cup');
        expect(result.ingredient).to.equal('butter');
    });

    it('should handle fractions', () => {
        const parser = new IngredientParser();
        const result = parser.parse(('1/4 stick of butter'));
        expect(result.quantity).to.equal(.25);
        expect(result.unit).to.equal('stick');
        expect(result.ingredient).to.equal('butter');
    });

    it('should handle whole numbers and fractions', () => {
        const parser = new IngredientParser();
        const result = parser.parse(('3 1/3 stick of butter'));
        expect(result.quantity).to.equal(3.33);
        expect(result.unit).to.equal('stick');
        expect(result.ingredient).to.equal('butter');
    });

    it('should handle certain size cans', () => {
        const parser = new IngredientParser();
        const result = parser.parse(('2 10-ounce cans of tomato sauce'));
        expect(result.quantity).to.equal(2);
        expect(result.unit).to.equal('10-ounce can');
        expect(result.ingredient).to.equal('tomato sauce');
    });
});
