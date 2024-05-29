import * as yup from 'yup';
import { INVALID_COUPON, INVALID_TOKEN, NOTFOUND_CAR } from './error-code';
export class FetchException extends Error {
  constructor(
    message = 'Server Error: There is an issue retrieving the data.'
  ) {
    super(message);
    this.name = 'FetchException';
  }
}

export class ApiError extends Error {
  constructor(
    public error_id: string,
    public title: string,
    public message: string,
    public errors: {
      error_id: string;
      title: string;
      message: string;
      field?: string;
    }[] = []
  ) {
    super(message);
  }

  static fromYupError(
    yupError: yup.ValidationError,
    error_id: string
  ): ApiError {
    const errors = yupError.inner.map((err) => ({
      error_id: error_id,
      title: 'Validation error',
      message: err.errors[0],
      field: err.path
    }));

    return new ApiError(
      'CFO-0001',
      'Validation error',
      'One or more field input values are invalid. Please check again.',
      errors
    );
  }

  static fromInvalidEmailPassword() {
    return new ApiError(
      'LO-0001',
      'Login error',
      'Invalid username or password.'
    );
  }

  static fromNotFoundCar() {
    return new ApiError(NOTFOUND_CAR, 'Validation error', 'Not found car.');
  }

  static fromUnauthorized() {
    return new ApiError(INVALID_TOKEN, 'Unauthorized', 'Invalid token.');
  }

  static fromUnverified() {
    return new ApiError(
      'LO-0003',
      'Unverified user',
      'Unverified user. Please check your email.'
    );
  }

  static fromInvalidToken() {
    return new ApiError(INVALID_TOKEN, 'Auth error', 'Invalid token.');
  }

  static fromInvalidRegisterToken() {
    return new ApiError('RE-0003', 'Unauthorized', 'Invalid token.');
  }

  static fromEmailExists() {
    return new ApiError('RE-0001', 'Register error', 'Email already exists.', [
      {
        error_id: 'RE-0001',
        title: 'Register error',
        message: 'Email already exists.',
        field: 'email'
      }
    ]);
  }

  static fromInvalidRentalPlace() {
    return new ApiError(
      'CFO-0001',
      'Validation error',
      'One or more field input values are invalid. Please check again.',
      [
        {
          error_id: 'CR-0001',
          title: 'Validation error',
          message:
            'The pick-up or drop-off place is invalid. Please choose another place.',
          field: 'rental_info.pick_up_location'
        },
        {
          error_id: 'CR-0001',
          title: 'Validation error',
          message:
            'The pick-up or drop-off place is invalid. Please choose another place.',
          field: 'rental_info.drop_off_location'
        }
      ]
    );
  }
  static fromInvalidRentalTime() {
    return new ApiError(
      'CFO-0001',
      'Validation error',
      'One or more field input values are invalid. Please check again.',
      [
        {
          error_id: 'CR-0002',
          title: 'Validation error',
          message:
            'The pick-up or drop-off date is invalid. Please choose another date.',
          field: 'rental_info.pick_up_time'
        },
        {
          error_id: 'CR-0002',
          title: 'Validation error',
          message:
            'The pick-up or drop-off date is invalid. Please choose another date.',
          field: 'rental_info.drop_off_time'
        }
      ]
    );
  }

  static fromInvalidRentalPrice() {
    return new ApiError('CR-0004', 'Invalid price', 'Price has changed.');
  }

  static fromNotFoundOrder() {
    return new ApiError('PA-0005', 'Validation error', 'Order not found.');
  }

  static fromInvalidSummaryData() {
    return new ApiError(
      'RS-0001',
      'Missing Fields',
      'Pick up time and drop off time are required.'
    );
  }

  static fromInvalidCoupon() {
    return new ApiError(INVALID_COUPON, 'Invalid promo', 'Invalid promo code.');
  }

  static fromPaypalOrder() {
    return new ApiError('PA-0002', 'Payment error', 'Transaction failed.');
  }

  static fromSentEmail() {
    return new ApiError(
      'RE-0002',
      'Sending email error',
      'Failed to send email.'
    );
  }

  static fromUnexpected(): ApiError {
    return new ApiError(
      'US-0500',
      'Internal Server Error',
      'An unexpected error occurred. Please try again later.'
    );
  }

  toJSON(): Record<string, unknown> {
    return {
      error: {
        error_id: this.error_id,
        title: this.title,
        message: this.message,
        errors: this.errors
      }
    };
  }
}

export function handleError(error: ApiError, status: number) {
  return Response.json(error.toJSON(), {
    status
  });
}
