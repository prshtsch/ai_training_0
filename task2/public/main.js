const API_URL = 'https://fakestoreapi.com/products';

// UI Elements
const elements = {
    runTestsButton: document.getElementById('runTests'),
    apiStatus: document.getElementById('apiStatus'),
    totalProducts: document.getElementById('totalProducts'),
    validProducts: document.getElementById('validProducts'),
    errorProducts: document.getElementById('errorProducts'),
    titleValidation: document.getElementById('titleValidation'),
    priceValidation: document.getElementById('priceValidation'),
    ratingValidation: document.getElementById('ratingValidation'),
    errorDetails: document.getElementById('errorDetails')
};

// Validation Functions
function validateProduct(product) {
    const errors = [];

    // Title validation
    if (!product.title || product.title.trim() === '') {
        errors.push('Title is missing or empty');
    }

    // Price validation
    if (typeof product.price !== 'number' || product.price < 0) {
        errors.push('Price is invalid or negative');
    }

    // Rating validation
    if (!product.rating ||
        typeof product.rating.rate !== 'number' ||
        product.rating.rate < 0 ||
        product.rating.rate > 5) {
        errors.push('Rating is invalid or exceeds maximum value of 5');
    }

    return {
        id: product.id,
        title: product.title,
        price: product.price,
        rating: product.rating,
        hasErrors: errors.length > 0,
        errors
    };
}

function updateStatus(element, isValid, message) {
    element.innerHTML = `
        <div class="status ${isValid ? 'success' : 'error'}">
            ${message}
        </div>
    `;
}

function displayErrorDetails(productsWithErrors) {
    if (productsWithErrors.length === 0) {
        elements.errorDetails.innerHTML = '<p>No errors found</p>';
        return;
    }

    const errorHTML = productsWithErrors.map(product => `
        <div class="error-item">
            <h4>Product ID: ${product.id}</h4>
            <p>Title: ${product.title || 'N/A'}</p>
            <p>Price: $${product.price || 'N/A'}</p>
            <p>Rating: ${product.rating?.rate || 'N/A'}</p>
            <ul class="error-messages">
                ${product.errors.map(error => `<li>${error}</li>`).join('')}
            </ul>
        </div>
    `).join('');

    elements.errorDetails.innerHTML = errorHTML;
}

async function runTests() {
    // Reset UI
    elements.runTestsButton.disabled = true;
    elements.apiStatus.className = 'status pending';
    elements.apiStatus.textContent = 'Testing...';

    try {
        // Fetch products
        const response = await fetch(API_URL);
        const products = await response.json();

        // Update API status
        updateStatus(elements.apiStatus, response.ok,
            response.ok ? 'API Available (200)' : `Error (${response.status})`
        );

        // Validate products
        const validationResults = products.map(validateProduct);
        const productsWithErrors = validationResults.filter(result => result.hasErrors);

        // Update summary stats
        elements.totalProducts.textContent = products.length;
        elements.validProducts.textContent = products.length - productsWithErrors.length;
        elements.errorProducts.textContent = productsWithErrors.length;

        // Update validation results
        const titleErrors = productsWithErrors.filter(p => p.errors.some(e => e.includes('Title')));
        const priceErrors = productsWithErrors.filter(p => p.errors.some(e => e.includes('Price')));
        const ratingErrors = productsWithErrors.filter(p => p.errors.some(e => e.includes('Rating')));

        updateStatus(elements.titleValidation, titleErrors.length === 0,
            titleErrors.length === 0 ? 'All titles valid' : `${titleErrors.length} invalid titles`);

        updateStatus(elements.priceValidation, priceErrors.length === 0,
            priceErrors.length === 0 ? 'All prices valid' : `${priceErrors.length} invalid prices`);

        updateStatus(elements.ratingValidation, ratingErrors.length === 0,
            ratingErrors.length === 0 ? 'All ratings valid' : `${ratingErrors.length} invalid ratings`);

        // Display error details
        displayErrorDetails(productsWithErrors);

    } catch (error) {
        console.error('Test error:', error);
        updateStatus(elements.apiStatus, false, 'API Error');
        elements.errorDetails.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }

    // Re-enable run button
    elements.runTestsButton.disabled = false;
}

// Event Listeners
elements.runTestsButton.addEventListener('click', runTests);

// Run tests on page load
runTests(); 