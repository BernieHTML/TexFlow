import Stripe from 'stripe';

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
});

export default stripe;

// Platform fee percentage (5%)
export const PLATFORM_FEE_PERCENTAGE = 5;

/**
 * Create a Stripe Connect account for a merchant
 */
export async function createConnectAccount(merchantEmail: string, merchantName: string): Promise<string> {
  const account = await stripe.accounts.create({
    type: 'express',
    email: merchantEmail,
    business_profile: {
      name: merchantName,
    },
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });

  return account.id;
}

/**
 * Generate onboarding link for merchant
 */
export async function createOnboardingLink(accountId: string, returnUrl: string, refreshUrl: string): Promise<string> {
  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: refreshUrl,
    return_url: returnUrl,
    type: 'account_onboarding',
  });

  return accountLink.url;
}

/**
 * Create a payment intent with platform fee
 */
export async function createPaymentIntent(
  amount: number,
  currency: string,
  sellerStripeAccountId: string,
  metadata: Record<string, string>
): Promise<{ clientSecret: string; paymentIntentId: string }> {
  // Calculate platform fee (5%)
  const platformFee = Math.round(amount * (PLATFORM_FEE_PERCENTAGE / 100));

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: currency.toLowerCase(),
    application_fee_amount: platformFee,
    transfer_data: {
      destination: sellerStripeAccountId,
    },
    metadata,
  });

  return {
    clientSecret: paymentIntent.client_secret || '',
    paymentIntentId: paymentIntent.id,
  };
}

/**
 * Process a direct charge (for testing without Connect)
 */
export async function processDirectCharge(
  amount: number,
  currency: string,
  paymentMethodId: string,
  metadata: Record<string, string>
): Promise<{ success: boolean; paymentId: string }> {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: currency.toLowerCase(),
    payment_method: paymentMethodId,
    confirm: true,
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: 'never',
    },
    metadata,
  });

  return {
    success: paymentIntent.status === 'succeeded',
    paymentId: paymentIntent.id,
  };
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string,
  webhookSecret: string
): Stripe.Event {
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}

/**
 * Get payment intent status
 */
export async function getPaymentStatus(paymentIntentId: string): Promise<string> {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  return paymentIntent.status;
}

/**
 * Create a refund
 */
export async function createRefund(
  paymentIntentId: string,
  amount?: number
): Promise<{ success: boolean; refundId: string }> {
  const refund = await stripe.refunds.create({
    payment_intent: paymentIntentId,
    amount,
  });

  return {
    success: refund.status === 'succeeded',
    refundId: refund.id,
  };
}
