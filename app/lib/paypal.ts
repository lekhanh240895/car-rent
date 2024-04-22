import {
  NEXT_PUBLIC_PAYPAL_BASE_URL,
  NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET
} from './constants';

const generateAccessToken = async () => {
  try {
    if (!NEXT_PUBLIC_PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error('MISSING_API_CREDENTIALS');
    }
    const auth = Buffer.from(
      NEXT_PUBLIC_PAYPAL_CLIENT_ID + ':' + PAYPAL_CLIENT_SECRET
    ).toString('base64');
    const response = await fetch(
      `${NEXT_PUBLIC_PAYPAL_BASE_URL}/v1/oauth2/token`,
      {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
          Authorization: `Basic ${auth}`
        }
      }
    );

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Failed to generate Access Token:', error);
  }
};

const createOrder = async (data: any) => {
  const {
    subtotal,
    tax,
    discount,
    total,
    billing_info: { name, phone_number, address, city }
  } = data;
  const accessToken = await generateAccessToken();
  const url = `${NEXT_PUBLIC_PAYPAL_BASE_URL}/v2/checkout/orders`;
  const payload = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: total,
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: subtotal
            },
            discount: {
              currency_code: 'USD',
              value: discount
            },
            tax_total: {
              currency_code: 'USD',
              value: tax
            }
          }
        },
        shipping: {
          name: {
            full_name: name
          },
          address: {
            address_line_1: address,
            admin_area_2: city,
            admin_area_1: 'VN',
            country_code: 'VN'
          },
          phone: phone_number
        }
      }
    ]
  };

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
    method: 'POST',
    body: JSON.stringify(payload)
  });

  return handleResponse(response);
};

/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
const captureOrder = async (orderID: string) => {
  const accessToken = await generateAccessToken();
  const url = `${NEXT_PUBLIC_PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });

  return handleResponse(response);
};

async function handleResponse(response: Response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

export { generateAccessToken, captureOrder, createOrder };
