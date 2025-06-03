# API Testing Project

This project contains automated tests for validating data from the FakeStore API (https://fakestoreapi.com/products).

## Test Objectives

1. Verify server response code (expected 200)
2. Validate product attributes:
   - Title (must not be empty)
   - Price (must not be negative)
   - Rating (must not exceed 5)
3. Generate a list of products containing defects

## Setup

1. Install dependencies:

```bash
npm install
```

2. Run tests:

```bash
npm test
```

## Test Structure

- `src/api.js` - API client for making requests
- `src/validator.js` - Product validation logic
- `tests/api.test.js` - Test cases

## Test Output

The tests will provide:

- Individual test results for each validation criteria
- A summary of all products tested
- Detailed error reports for any products with defects
- Lists of products with specific validation failures
