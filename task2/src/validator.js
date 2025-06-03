export function validateProduct(product) {
    const errors = [];

    // Check if title exists and is not empty
    if (!product.title || product.title.trim() === '') {
        errors.push('Title is missing or empty');
    }

    // Check if price exists and is not negative
    if (typeof product.price !== 'number' || product.price < 0) {
        errors.push('Price is invalid or negative');
    }

    // Check if rating exists and rate is not exceeding 5
    if (!product.rating ||
        typeof product.rating.rate !== 'number' ||
        product.rating.rate < 0 ||
        product.rating.rate > 5) {
        errors.push('Rating is invalid or exceeds maximum value of 5');
    }

    return {
        id: product.id,
        title: product.title,
        hasErrors: errors.length > 0,
        errors
    };
}

export function validateProducts(products) {
    if (!Array.isArray(products)) {
        throw new Error('Products must be an array');
    }

    const validationResults = products.map(validateProduct);
    const productsWithErrors = validationResults.filter(result => result.hasErrors);

    return {
        totalProducts: products.length,
        validProducts: products.length - productsWithErrors.length,
        productsWithErrors,
        allValid: productsWithErrors.length === 0
    };
} 