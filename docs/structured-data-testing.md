# Testing Your Site's Structured Data

This guide explains how to test and validate the structured data (JSON-LD) implementation on your Habbi Web Design website.

## What is Structured Data?

Structured data is a standardized format for providing information about a page and classifying its content. Search engines use this data to understand the content of your page and potentially show it as a rich result in search listings.

Your site uses JSON-LD (JavaScript Object Notation for Linked Data) for structured data, which is Google's recommended format.

## Tools for Testing Structured Data

### 1. Google's Rich Results Test (Primary Tool)

The Rich Results Test is Google's current tool for validating structured data:

1. Visit [Google's Rich Results Test](https://search.google.com/test/rich-results)
2. Enter your URL or paste the HTML code containing your JSON-LD snippet
3. Click "TEST URL" or "TEST CODE"
4. Review the results for:
   - Valid structured data
   - Warnings or errors
   - Preview of how your content might appear in search results

### 2. Schema Markup Validator

An alternative tool from schema.org:

1. Visit [Schema Markup Validator](https://validator.schema.org/)
2. Enter your URL or paste your code
3. Click "Validate"
4. Review the validation results

## Testing Process for Habbi Web Design

### Step 1: Testing Individual Pages

Test each key page of your site separately to ensure they have the appropriate schema for their content type:

1. **Homepage**: Should use `WebSite` or `Organization` schema
2. **Services Page**: Should use `Service` or `ProfessionalService` schema
3. **About Page**: Should use `AboutPage` or additional `Organization` schema
4. **Contact Page**: Should use `ContactPage` schema
5. **Work/Portfolio Page**: Could use `CollectionPage` or individual `CreativeWork` schema items

### Step 2: Validating Organization Data

Focus on validating the business information in your structured data:

1. Ensure the business name is consistent ("Habbi Web Design")
2. Verify contact information is correct (phone, email, address)
3. Check that social media profiles are correctly listed
4. Confirm the logo URL is valid and the image loads properly

### Step 3: Reviewing Rich Result Eligibility

Check if your content can appear as rich results:

1. Look for "Eligible for Rich Results" status in the test
2. Review which specific rich result types your content qualifies for
3. Note any additional properties you could add to enhance rich results

### Step 4: Fixing Common Issues

Watch for these common structured data issues:

- **Missing required properties**: Add any required properties flagged in testing
- **Invalid property values**: Fix any values that don't match expected formats
- **Duplicate declarations**: Remove redundant structured data
- **Incorrect nesting**: Fix any improperly nested items
- **Non-accessible content**: Ensure structured data matches visible content

### Step 5: Re-testing After Deployment

After making any changes and deploying them:

1. Re-test all pages with the Rich Results Test
2. Verify that all errors have been resolved
3. Submit your sitemap to Google Search Console to encourage recrawling

## Example of Testing Your JSON-LD Implementation

Here's how to test the JSON-LD from your homepage:

1. Open your site in a browser
2. Right-click and select "View Page Source"
3. Find the JSON-LD script (search for `<script type="application/ld+json">`)
4. Copy the entire JSON-LD block (including the script tags)
5. Paste it into the Rich Results Test code input
6. Click "TEST CODE"
7. Review the results

## Going Beyond Testing: Monitoring Rich Results

After deployment and validation:

1. Set up Google Search Console for your site
2. Monitor the "Enhancements" section for rich result performance
3. Address any new issues that Google identifies
4. Track how your rich results perform compared to regular search listings

## Additional Resources

- [Google's Introduction to Structured Data](https://developers.google.com/search/docs/fundamentals/structured-data/intro-structured-data)
- [Google's Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Schema.org Full Hierarchy](https://schema.org/docs/full.html) for reference when expanding your structured data