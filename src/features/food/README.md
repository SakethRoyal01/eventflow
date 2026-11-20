# Feature: Food (`src/features/food`)

## Responsibilities
- Meal coupon QR pass scanning and redemption (Breakfast, Lunch, Banquet).
- Dietary preference breakdown (Vegetarian, Vegan, Halal, Gluten-Free).
- Caterer consumption reconciliation and wastage mitigation reports.

## Target Supabase Interactions
- Tables: `food_sessions`, `food_redemptions`.
- Edge Function: Single-redemption gate check preventing duplicate meal scans.
