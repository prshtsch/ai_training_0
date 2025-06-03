import { getProducts } from '../src/api.js';
import { validateProducts } from '../src/validator.js';

describe('FakeStore API Tests', () => {
    let apiResponse;
    let validationResults;

    beforeAll(async () => {
        apiResponse = await getProducts();
        if (apiResponse.data) {
            validationResults = validateProducts(apiResponse.data);
        }
    });

    test('API should return status code 200', () => {
        expect(apiResponse.statusCode).toBe(200);
    });

    test('API should return an array of products', () => {
        expect(Array.isArray(apiResponse.data)).toBe(true);
        expect(apiResponse.data.length).toBeGreaterThan(0);
    });

    test('All products should have valid titles', () => {
        const productsWithInvalidTitles = validationResults.productsWithErrors
            .filter(product => product.errors.some(error => error.includes('Title')));

        if (productsWithInvalidTitles.length > 0) {
            console.log('\nProducts with invalid titles:');
            productsWithInvalidTitles.forEach(product => {
                console.log(`- ID: ${product.id}, Title: "${product.title}"`);
            });
        }

        expect(productsWithInvalidTitles.length).toBe(0);
    });

    test('All products should have valid prices', () => {
        const productsWithInvalidPrices = validationResults.productsWithErrors
            .filter(product => product.errors.some(error => error.includes('Price')));

        if (productsWithInvalidPrices.length > 0) {
            console.log('\nProducts with invalid prices:');
            productsWithInvalidPrices.forEach(product => {
                console.log(`- ID: ${product.id}, Title: "${product.title}"`);
            });
        }

        expect(productsWithInvalidPrices.length).toBe(0);
    });

    test('All products should have valid ratings (0-5)', () => {
        const productsWithInvalidRatings = validationResults.productsWithErrors
            .filter(product => product.errors.some(error => error.includes('Rating')));

        if (productsWithInvalidRatings.length > 0) {
            console.log('\nProducts with invalid ratings:');
            productsWithInvalidRatings.forEach(product => {
                console.log(`- ID: ${product.id}, Title: "${product.title}"`);
            });
        }

        expect(productsWithInvalidRatings.length).toBe(0);
    });

    test('Summary of validation results', () => {
        console.log('\nValidation Summary:');
        console.log(`Total Products: ${validationResults.totalProducts}`);
        console.log(`Valid Products: ${validationResults.validProducts}`);
        console.log(`Products with Errors: ${validationResults.productsWithErrors.length}`);

        if (validationResults.productsWithErrors.length > 0) {
            console.log('\nDetailed Error Report:');
            validationResults.productsWithErrors.forEach(product => {
                console.log(`\nProduct ID: ${product.id}`);
                console.log(`Title: "${product.title}"`);
                console.log('Errors:');
                product.errors.forEach(error => console.log(`- ${error}`));
            });
        }
    });
}); 