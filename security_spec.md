# Security Specification

## Data Invariants
1. `inquiry`: Must have `name`, `email`, `message`, `createdAt`. `email` must be valid format. `name` must be string.
2. `subscription`: Must have `email`, `createdAt`. `email` must be valid format.

## The Dirty Dozen Payloads (Rejections)
1. Inquiry without `name`.
2. Inquiry with `message` larger than 5000 chars.
3. Inquiry with `ownerId` (should not be set by user).
4. Subscription with invalid email.
5. Subscription with extra fields.
6. Reading `/inquiries` as unauthenticated user.
7. Reading `/inquiries` as authenticated non-admin user.
8. Deleting an inquiry as non-admin.
9. Updating an inquiry `createdAt` timestamp.
10. Creating an inquiry with a fake server timestamp.
11. Reading `/subscriptions` as unauthenticated user.
12. Listing all collections.

## Test Runner (Conceptual)
Tests will verify that PUBLIC can only CREATE to `inquiries` and `subscriptions`, and ADMIN can READ all.
