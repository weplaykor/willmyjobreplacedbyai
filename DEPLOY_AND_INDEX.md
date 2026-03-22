# Deploy and Index Checklist

This repository is prepared for a static GitHub Pages deployment with the custom domain:

- `www.willmyjobreplacedbyai.com`

The repository already includes:

- `CNAME`
- `.nojekyll`
- `robots.txt`
- `sitemap.xml`
- Open Graph/Twitter metadata
- JSON-LD structured data
- GitHub Pages workflow at `.github/workflows/pages.yml`

## 1. Publish the site

1. Create or connect this folder to a public GitHub repository.
2. Push the `main` branch.
3. In GitHub:
   - Open `Settings -> Pages`
   - Set `Source` to `GitHub Actions`
4. Wait for the workflow to finish successfully.

## 2. Connect the custom domain

In your DNS provider, set:

- `CNAME`
  - Host: `www`
  - Value: `<your-github-username>.github.io`

Recommended:

- Forward apex domain `willmyjobreplacedbyai.com` to `https://www.willmyjobreplacedbyai.com`

In GitHub:

1. Open `Settings -> Pages`
2. Confirm the custom domain is `www.willmyjobreplacedbyai.com`
3. Enable HTTPS after DNS is active

## 3. Verify in Google Search Console

Recommended property type:

- `Domain property`
- Enter: `willmyjobreplacedbyai.com`

Google will give you a DNS TXT verification record. Add that exact TXT record in your DNS provider, then click Verify in Search Console.

## 4. Submit the sitemap

After verification:

1. Open the Search Console property for `willmyjobreplacedbyai.com`
2. Go to `Sitemaps`
3. Submit:

```text
https://www.willmyjobreplacedbyai.com/sitemap.xml
```

## 5. Request indexing

Use Search Console URL Inspection for:

- `https://www.willmyjobreplacedbyai.com/`

Then click `Request indexing`.

## Notes

- Search indexing is not instant. It can take days or weeks.
- Sitemap submission and indexing requests are hints, not guarantees.
- Google Search Console domain verification cannot be completed from this repository alone because Google generates the TXT token per account/property.
