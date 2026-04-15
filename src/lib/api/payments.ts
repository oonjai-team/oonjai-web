import { getConnector } from "./index"

export interface InitiatePaymentPayload {
  method: "qr_promptpay" | "credit_card"
  amount: number
  currency: string
}

export interface PaymentResponse {
  paymentId: string
  amount: number
  currency: string
  status: string
  transactionRef: string
  paidAt: string | null
  createdAt: string
  bookingId: string
}

export type InitiatePaymentResult =
  | { ok: true; data: PaymentResponse }
  | { ok: false; message: string }

export async function initiatePayment(bookingId: string, payload: InitiatePaymentPayload): Promise<InitiatePaymentResult> {
  const connector = getConnector()
  const res = await connector.POST<PaymentResponse>(
    `bookings/${bookingId}/payment`,
    payload as unknown as Record<string, unknown>,
  )

  if (res.isSuccess() && res.payload) {
    return { ok: true, data: res.payload }
  }
  return { ok: false, message: res.message || "Payment initiation failed." }
}

export async function getPaymentStatus(bookingId: string): Promise<PaymentResponse | null> {
  const connector = getConnector()
  const res = await connector.GET<PaymentResponse>(`bookings/${bookingId}/payment`, undefined, {}, true)

  if (res.isSuccess() && res.payload) {
    return res.payload
  }
  return null
}

export interface CreateCheckoutSessionPayload {
  bookingId: string
  amount: number
  currency: string
  method: "qr_promptpay" | "credit_card"
}

export interface CheckoutSessionResponse {
  paymentId: string
  checkoutSessionId: string
  checkoutUrl: string
  amount: number
  currency: string
  method: string
  status: string
}

export async function createCheckoutSession(payload: CreateCheckoutSessionPayload): Promise<CheckoutSessionResponse | null> {
  const connector = getConnector()
  const res = await connector.POST<CheckoutSessionResponse>(
    "payments/checkout-session",
    payload as unknown as Record<string, unknown>,
  )
  if (res.isSuccess() && res.payload) {
    return res.payload
  }
  return null
}
