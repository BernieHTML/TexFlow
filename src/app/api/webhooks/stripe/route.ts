import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import stripe, { verifyWebhookSignature } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET not configured');
    return NextResponse.json(
      { error: 'Webhook not configured' },
      { status: 500 }
    );
  }

  let event;
  try {
    event = verifyWebhookSignature(payload, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        const transactionId = paymentIntent.metadata.transactionId;

        if (transactionId) {
          await prisma.transaction.update({
            where: { id: transactionId },
            data: {
              stripeStatus: 'succeeded',
              status: 'completed',
              completedAt: new Date(),
            },
          });
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        const transactionId = paymentIntent.metadata.transactionId;

        if (transactionId) {
          await prisma.transaction.update({
            where: { id: transactionId },
            data: {
              stripeStatus: 'failed',
              status: 'failed',
            },
          });
        }
        break;
      }

      case 'account.updated': {
        const account = event.data.object;
        // Handle Connect account updates if needed
        console.log('Connect account updated:', account.id);
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object;
        const transactionId = charge.metadata?.transactionId;

        if (transactionId) {
          await prisma.transaction.update({
            where: { id: transactionId },
            data: {
              status: 'refunded',
            },
          });
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
