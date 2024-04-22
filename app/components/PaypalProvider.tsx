'use client';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { NEXT_PUBLIC_PAYPAL_CLIENT_ID } from '../lib/constants';

function PaypalProvider({
  children
}: {
  children: React.ReactNode;
  locale: string;
}) {
  if (NEXT_PUBLIC_PAYPAL_CLIENT_ID) {
    return (
      <PayPalScriptProvider
        options={{ clientId: NEXT_PUBLIC_PAYPAL_CLIENT_ID, currency: 'USD' }}
      >
        {children}
      </PayPalScriptProvider>
    );
  } else {
    return <>{children}</>;
  }
}

export default PaypalProvider;
