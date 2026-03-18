export interface PaymentDTO {
  paymentId: string
  amount: number
  currency: string
  status: string
  transactionRef: string
  paidAt: string
  createdAt: string
  bookingId: string
}

export type PaymentDetailDTO = PaymentDTO
