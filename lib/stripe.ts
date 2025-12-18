/**
 * Stripe Payment Integration
 * Processamento de pagamentos, assinaturas SaaS, webhooks
 */

import Stripe from "stripe"

const isConfigured = process.env.STRIPE_SECRET_KEY

if (!isConfigured) {
  console.warn("⚠️  Stripe não configurado. Pagamentos desabilitados.")
}

export const stripe = isConfigured
  ? new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2024-12-18.acacia",
      typescript: true,
    })
  : null

/**
 * Criar Payment Intent para pagamento único
 */
export async function createPaymentIntent(
  amount: number,
  currency: string = "brl",
  customerId?: string,
  metadata?: Record<string, string>
): Promise<Stripe.PaymentIntent | null> {
  if (!stripe) {
    console.log(`[MOCK PAYMENT] Amount: ${amount} ${currency}`)
    return null
  }

  return await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Centavos
    currency,
    customer: customerId,
    metadata,
    payment_method_types: ["card"],
    automatic_payment_methods: {
      enabled: true,
    },
  })
}

/**
 * Criar ou recuperar Customer
 */
export async function createOrGetCustomer(
  email: string,
  name: string,
  metadata?: Record<string, string>
): Promise<Stripe.Customer | null> {
  if (!stripe) return null

  // Buscar customer existente
  const existingCustomers = await stripe.customers.list({
    email,
    limit: 1,
  })

  if (existingCustomers.data.length > 0) {
    return existingCustomers.data[0]
  }

  // Criar novo customer
  return await stripe.customers.create({
    email,
    name,
    metadata,
  })
}

/**
 * Criar assinatura (planos SaaS)
 */
export async function createSubscription(
  customerId: string,
  priceId: string,
  metadata?: Record<string, string>
): Promise<Stripe.Subscription | null> {
  if (!stripe) return null

  return await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: "default_incomplete",
    payment_settings: { save_default_payment_method: "on_subscription" },
    expand: ["latest_invoice.payment_intent"],
    metadata,
  })
}

/**
 * Cancelar assinatura
 */
export async function cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription | null> {
  if (!stripe) return null

  return await stripe.subscriptions.cancel(subscriptionId)
}

/**
 * Atualizar assinatura (upgrade/downgrade)
 */
export async function updateSubscription(
  subscriptionId: string,
  newPriceId: string
): Promise<Stripe.Subscription | null> {
  if (!stripe) return null

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  return await stripe.subscriptions.update(subscriptionId, {
    items: [
      {
        id: subscription.items.data[0].id,
        price: newPriceId,
      },
    ],
    proration_behavior: "always_invoice",
  })
}

/**
 * Processar webhook do Stripe
 */
export async function handleStripeWebhook(
  body: string | Buffer,
  signature: string
): Promise<Stripe.Event | null> {
  if (!stripe) return null

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    throw new Error("STRIPE_WEBHOOK_SECRET não configurado")
  }

  try {
    return stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error("Erro ao verificar webhook Stripe:", error)
    throw error
  }
}

/**
 * Price IDs dos planos (configurar no Stripe Dashboard)
 */
export const STRIPE_PLANS = {
  FREE: process.env.STRIPE_PRICE_FREE || "price_free",
  STARTER: process.env.STRIPE_PRICE_STARTER || "price_starter",
  PROFESSIONAL: process.env.STRIPE_PRICE_PROFESSIONAL || "price_professional",
  ENTERPRISE: process.env.STRIPE_PRICE_ENTERPRISE || "price_enterprise",
}

/**
 * Valores dos planos (em BRL)
 */
export const PLAN_PRICES = {
  FREE: 0,
  STARTER: 97, // R$ 97/mês
  PROFESSIONAL: 297, // R$ 297/mês
  ENTERPRISE: 997, // R$ 997/mês
}

/**
 * Features dos planos
 */
export const PLAN_FEATURES = {
  FREE: {
    max_users: 1,
    max_patients: 100,
    max_storage_gb: 1,
    features: ["MOD-ANM", "MOD-RCB"],
  },
  STARTER: {
    max_users: 3,
    max_patients: 500,
    max_storage_gb: 10,
    features: ["MOD-ANM", "MOD-RCB", "MOD-FAT", "MOD-TIS", "MOD-ASS"],
  },
  PROFESSIONAL: {
    max_users: 10,
    max_patients: 2000,
    max_storage_gb: 50,
    features: [
      "MOD-ANM",
      "MOD-RCB",
      "MOD-FAT",
      "MOD-TIS",
      "MOD-ASS",
      "MOD-TEL",
      "MOD-EST",
      "MOD-AIA",
      "MOD-SMS",
      "MOD-WPP",
      "MOD-GCL",
    ],
  },
  ENTERPRISE: {
    max_users: 999,
    max_patients: 99999,
    max_storage_gb: 500,
    features: [
      "MOD-ANM",
      "MOD-RCB",
      "MOD-FAT",
      "MOD-TIS",
      "MOD-ASS",
      "MOD-TEL",
      "MOD-EST",
      "MOD-AIA",
      "MOD-SMS",
      "MOD-WPP",
      "MOD-GCL",
      "MOD-ODO",
      "MOD-GES",
      "MOD-CRV",
      "MOD-OFT",
      "MOD-HOS",
      "MOD-SES",
      "MOD-TRT",
      "MOD-ORC",
      "MOD-NPS",
    ],
  },
}

/**
 * Helpers para checkout
 */
export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
): Promise<Stripe.Checkout.Session | null> {
  if (!stripe) return null

  return await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
  })
}

/**
 * Criar portal de billing (gerenciar assinatura)
 */
export async function createBillingPortalSession(
  customerId: string,
  returnUrl: string
): Promise<Stripe.BillingPortal.Session | null> {
  if (!stripe) return null

  return await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
}
