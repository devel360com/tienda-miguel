import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { CartItem, ShippingOption, Coupon } from '@/types/cart';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, shipping, coupon, success_url, cancel_url }: {
      items: CartItem[];
      shipping: ShippingOption;
      coupon: Coupon | null;
      success_url?: string;
      cancel_url?: string;
    } = body;

    // Create line items for products
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          images: [item.image],
          metadata: {
            id: item.id.toString(),
            type: 'product'
          },
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Add shipping as a line item if present
    if (shipping) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: shipping.name,
            images: ['/images/shipping-icon.png'],
            metadata: {
              id: shipping.id.toString(),
              type: 'shipping'
            },
          },
          unit_amount: Math.round(shipping.price * 100),
        },
        quantity: 1,
      });
    }

    // Create the Stripe coupon if it doesn't exist
    let stripeCouponId: string | undefined;
    if (coupon) {
      try {
        // Try to retrieve existing coupon
        await stripe.coupons.retrieve(coupon.code);
        stripeCouponId = coupon.code;
      } catch {
        // Create new coupon if it doesn't exist
        const newCoupon = await stripe.coupons.create({
          id: coupon.code,
          ...(coupon.type === 'percentage'
            ? { percent_off: coupon.discount }
            : { amount_off: Math.round(coupon.discount * 100) }),
          currency: 'eur',
          duration: 'once',
          ...(coupon.minimumPurchase && {
            minimum_amount: Math.round(coupon.minimumPurchase * 100),
            currency: 'eur',
          }),
        });
        stripeCouponId = newCoupon.id;
      }
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: success_url || `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancel_url || `${process.env.NEXT_PUBLIC_BASE_URL}/carrito`,
      ...(stripeCouponId && {
        discounts: [{
          coupon: stripeCouponId,
        }],
      }),
      shipping_address_collection: {
        allowed_countries: ['ES'],
      },
      custom_fields: [{
        key: 'comments',
        label: {
          type: 'custom',
          custom: 'Comentarios adicionales',
        },
        type: 'text',
        optional: true,
      }],
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error('Error creating checkout session:', err);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}
