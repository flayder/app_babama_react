export const API = {
  /** auth * */
  LOGIN: '/login',
  LOGOUT: '/logout',
  FORGOT_PASSWORD: '/forgot-password',
  SIGNUP: '/signup',

  /** user * */
  USER: '/user',

  /** faq * */
  TOP_QUESTIONS: '/top-questions',
  FEEDBACK_QUESTIONS: '/feedback-questions',
  ADD_QUESTION: '/user/tickets',

  /** referrals * */
  REFERRAL_WITHDRAWALS: '/referral-withdrawals',
  REFERRAL_PAYMENT_INFO: '/referral-payment-info',
  REFERRAL_PAYMENT_SYSTEMS: '/referral-payment-systems',
  REFERRAL_PAGE: (code: string): string => `/r/${code}`,
  REFERRAL_PAYMENT: '/referral-payments',
  REFERRALS: '/referrals',
  REFERRALS_INFO: '/referrals/info',
  UPDATE_REFERRAL: (id: string | number): string => `/referrals/${id}/update`,
  DELETE_REFERRAL: (id: string | number): string => `/referrals/${id}/delete`,

  /** order * */
  CATEGORIES: '/categories',
  GET_ACTIVITIES: (id: string | number): string => `/category/${id}/activities`,
  GET_SERVICES(categoryId: string | number, activityId: string | number): string {
    return `/category/${categoryId}/activity/${activityId}/services`;
  },
  GET_CATEGORY_PAGE: (slugs: string[]) => `/pages${slugs.map((val) => `/${val}`)}`.replace(/,/g, ''),

  PAYMENT_SYSTEMS: '/payment-systems',
  FUND_HISTORY: '/my-fund-history',
  ORDERS_HISTORY: '/my-orders',
  ORDER: '/order',
  ORDER_UNAUTH: '/order-unauthenticated',
  REPEAT_ORDER: (id: string | number): string => `/repeat-order/${id}`,
  REPAY_ORDER: (id: string | number): string => `/repay-order/${id}`,
  LAST_UNPAID_ORDER: '/last-unpaid-order',
  VALIDATE_PROMOCODE: '/promo-code/checkout',
  VALIDATE_LINK: (category: string | number, link: string): string => `/valid-link/${category}?link=${link}`,
  GET_TRANSACTION: (uuId: string): string => `/transactions/${uuId}`,
  CHECK_USER_STATUS: (uuId: string): string => `/transactions/${uuId}/check_user_status`,
  GET_PAYMENT_LINK: (system: string, amount: string, order_id?: string | number): string => {
    const params = new URLSearchParams();

    params.set('amount', String(Math.round(parseFloat(amount.replace(',', '.')) * 100) / 100));
    params.set('system', system);
    params.set('order_id', order_id?.toString() ?? '');

    return `/get-payment-link?${params.toString()}`;
  },
  GET_PAYMENT_LINK_GUEST: (system: string, amount: string, order_id: string | number, email: string): string => {
    const params = new URLSearchParams();

    params.set('amount', String(Math.round(parseFloat(amount) * 100) / 100));
    params.set('system', system);
    params.set('email', email);
    params.set('order_id', order_id?.toString() ?? '');

    return `/get-payment-link-email?${params.toString()}`;
  },

  /** static pages * */
  STATIC_PAGES: '/static-pages',
  PRIVACY_POLICY: '/static-pages/privacy-policy',
  SERVICE_RULES: '/static-pages/service-rules',
  OFFERS: '/static-pages/offers',
  REFUND: '/static-pages/refund',
  // GET_STATIC_PAGE: (slug: string): string => `/static-pages/${slug}`,
} as const;
