'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3030';

function CheckoutGatewayContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session');
  const amount = searchParams.get('amount');
  const currency = searchParams.get('currency') ?? 'THB';
  const [processing, setProcessing] = useState(false);

  const handlePay = () => {
    if (!sessionId) return;
    setProcessing(true);
    // Redirect to the API complete endpoint — API will mark payment as PAID,
    // confirm bookings, and 302-redirect back to the frontend confirmation page
    window.location.href = `${API_URL}/payments/complete?session=${sessionId}`;
  };

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center max-w-md">
          <p className="text-red-600 font-bold text-lg">Invalid checkout session</p>
          <p className="text-gray-500 text-sm mt-2">This payment link is invalid or has expired.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
        {/* Gateway Header */}
        <div className="bg-[#635BFF] px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white">
                <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M2 10h20" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <p className="text-white/70 text-xs font-medium">Secure Payment</p>
              <h1 className="text-white text-xl font-bold">Oonjai Pay</h1>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="px-8 py-6">
          <div className="mb-6">
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Amount Due</p>
            <p className="text-4xl font-bold text-gray-900">
              {currency === 'THB' ? '฿' : currency} {Number(amount).toLocaleString()}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="border border-gray-200 rounded-xl p-4">
              <label className="block text-xs font-semibold text-gray-600 mb-2">Card Number</label>
              <input
                type="text"
                defaultValue="4242 4242 4242 4242"
                className="w-full text-gray-900 font-mono text-lg outline-none bg-transparent"
                readOnly
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1 border border-gray-200 rounded-xl p-4">
                <label className="block text-xs font-semibold text-gray-600 mb-2">Expiry</label>
                <input
                  type="text"
                  defaultValue="12/28"
                  className="w-full text-gray-900 font-mono outline-none bg-transparent"
                  readOnly
                />
              </div>
              <div className="flex-1 border border-gray-200 rounded-xl p-4">
                <label className="block text-xs font-semibold text-gray-600 mb-2">CVC</label>
                <input
                  type="text"
                  defaultValue="123"
                  className="w-full text-gray-900 font-mono outline-none bg-transparent"
                  readOnly
                />
              </div>
            </div>
          </div>

          <button
            onClick={handlePay}
            disabled={processing}
            className="w-full py-4 bg-[#635BFF] text-white font-bold rounded-xl hover:bg-[#5851DB] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-lg"
          >
            {processing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Pay {currency === 'THB' ? '฿' : currency}{Number(amount).toLocaleString()}
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 mt-4 text-gray-400 text-xs">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Secured by Oonjai Pay (Test Mode)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentCheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#635BFF] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CheckoutGatewayContent />
    </Suspense>
  );
}
