# BillEzE — Swipe. Pay. Easy.

Public **prototype / simulated demo**. Swipe left to skip, swipe right to review a **simulated** payment. Includes sample bills, manual bill entry, demo Wallet, file picker, and activity history. No money is moved, no bank accounts are linked, and no real card credentials are accepted. Bill photo/PDF text extraction and automatic portal connections are **not implemented**.

This public repository intentionally contains demonstration code only, no sensitive data or credentials. Refreshing the page resets demo data.

## Bill intake (prototype)
- Mobile **Take photo** button uses the phone camera when supported.
- Image OCR: Tesseract.js runs in the browser; first use downloads an OCR library and language data from external CDNs. No image is sent to a BillEzE server.
- Extracted details must be reviewed and corrected before a bill is added.
- CSV import accepts simple comma-separated files with biller/company, amount, and due date columns; no payment is made.
- PDF file selection is supported, but PDF automatic recognition is **not** implemented yet.
- This static public demo has **no authentication or protected storage**. Do not use actual account statements or sensitive personal financial data.
