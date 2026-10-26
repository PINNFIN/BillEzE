# BillEzE — Payment security implementation status

## Implemented in this repository
- **Local cryptographic utilities**: AES-256-GCM encryption/decryption of *payment-provider token references* with fresh 96-bit random nonces, authentication tags and associated data.
- **Input checking**: payment amounts in integer US cents, approved token-reference formatting, bill ID and user confirmation ID.
- **Idempotency fingerprint primitive**: SHA-256 digest scoped to the authenticated user and unique confirmation ID. This is **not yet a persistent idempotency service**.
- **Local-only development gateway**: binds 127.0.0.1:8787, exposes /health, and returns HTTP 501 for both payment authorization and wallet registration. **No transaction can be initiated**.
- **Automated unit tests** for round-trip encryption, IV uniqueness, integrity verification, input validation, and payment fingerprint scoping.

## Not implemented — required before taking real money
1. Choose a licensed/compliant payment provider supporting vaulted payment methods (e.g. provider-hosted card fields and bank-link flow). A card processor alone may not pay arbitrary household billers; secure biller disbursement/aggregator partnership must be confirmed.
2. Dedicated **private** backend hosting with TLS, identity verification, short-lived signed sessions, MFA/passkeys, authorization on every API operation, rate limiting, CSRF defenses where cookies are used, audit trails, and strong tenant separation.
3. Managed key storage (KMS/HSM), key rotation and access controls. **Never store card PAN, CVV, routing/account numbers, or banking login passwords on the GitHub Pages app or in its storage**.
4. Persistent transactional database, server-side authorization and tamper-proof idempotency records with unique constraints; independently verify live bill amounts and biller account before submitting payment.
5. Provider-hosted onboarding; signed, replay-protected webhook verification; payment status state machine; receipt and reconciliation; refunds/disputes and error handling.
6. Risk controls: per-payment explicit approval, step-up authentication, anomaly detection, maximum payment limits, fraud/AML evaluation and monitoring.
7. PCI DSS scope assessment, applicable money transmission/bill-payment compliance review, privacy and data retention policy, SOC 2/ISO 27001 **alignment** audit and penetration testing. **No certification or production readiness is claimed**.

## Safety boundary
GitHub Pages remains a *public demo*: transactions are simulated, bank/card details are not collected, and the local gateway intentionally rejects real-money actions. Payment token references are examples only, **not live processor credentials**.

## Local tests
Run `node --test payment-security.test.mjs`. For the local disabled gateway run `node payment-gateway.mjs`.
