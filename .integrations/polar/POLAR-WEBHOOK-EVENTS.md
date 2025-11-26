# Polar.sh Webhook Events for Fabrk

## Recommended Events for One-Time Purchase

For a one-time sale product (ZIP download), subscribe to these events:

### ✅ Essential Events

1. **`checkout.created`** - When customer starts checkout
   - Track conversion funnel
   - Analytics

2. **`checkout.updated`** - When checkout details change
   - Track checkout progress

3. **`order.created`** - When order is created (CRITICAL)
   - Send confirmation email
   - Add customer to CRM
   - Track sale

4. **`order.paid`** - When payment completes (CRITICAL)
   - Grant product access
   - Send download link
   - Send welcome email

5. **`order.refunded`** - When order is refunded
   - Revoke access
   - Update records

### 🔔 Optional Events (Nice to Have)

6. **`customer.created`** - New customer record
   - Add to email list
   - CRM sync

7. **`benefit_grant.created`** - File download access granted
   - Log access
   - Track usage

8. **`refund.created`** - Refund initiated
   - Alert admin
   - Update dashboard

## ❌ NOT Needed (Subscription-Only)

Skip these for one-time purchases:
- `subscription.*` - You're not selling subscriptions
- `customer_seat.*` - You're not using per-seat licensing
- `subscription.active` / `subscription.canceled` - Not applicable

## Webhook Configuration

**URL:** `https://unusurped-lilliana-overluxuriously.ngrok-free.dev/api/webhooks/polar`

**Select These Events:**
```
✅ checkout.created
✅ checkout.updated
✅ order.created
✅ order.paid
✅ order.refunded
✅ customer.created
✅ benefit_grant.created
```

## Current Handler Status

Your webhook handler (`src/app/api/webhooks/polar/route.ts`) currently handles:
- ✅ `order.created` - Line 49-50
- ✅ `checkout.completed` - Line 53-54

**Note:** Polar.sh doesn't have `checkout.completed` - it's `order.paid` instead!

## Next Steps

1. **In Polar.sh dashboard:**
   - Create webhook with URL above
   - Select the 7 events listed
   - Copy webhook secret

2. **Add webhook secret to `.env.local`:**
   ```bash
   POLAR_WEBHOOK_SECRET="whsec_..."
   ```

3. **Update handler** to use `order.paid` instead of `checkout.completed`:
   - See `src/app/api/webhooks/polar/route.ts:53`

## Testing Webhooks

After setup, test with a purchase:
1. Click "Get Fabrk - $199" on localhost:3000
2. Complete checkout on Polar.sh
3. Check terminal logs for webhook events
4. Verify `order.paid` triggers successfully

---

**Pro Tip:** Start with just `order.created` and `order.paid` - these are the critical ones for MVP!
