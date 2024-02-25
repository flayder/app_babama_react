export const ROUTES = {
  INDEX: '/',
  FAQ: '/faq',
  HISTORY: '/history',
  POPULAR_QUESTIONS: '/popular-questions',

  /** lk * */
  FUND_HISTORY: '/fund-history',
  ACCOUNT: '/account',
  ACCOUNT_PAY: '/account/pay',
  ACCOUNT_TRANSACTIONS: '/account/transactions',
  ACCOUNT_REFERRAL: '/account/referral',
  ACCOUNT_REFERRAL_PAYMENTS: '/account/referral/payments',
  ACCOUNT_REFERRAL_HISTORY: '/account/referral/history',
  ACCOUNT_REFERRAL_WITHDRAWAL: '/account/referral/withdrawal',

  /** payment * */
  PAYMENT_SUCCESS: '/payment-succeed',
  PAYMENT_FAILED: '/payment-failed',

  /** footer links * */
  PRIVACY_POLICY: '/privacy-policy',
  SERVICE_RULES: '/service-rules',
  OFFERS: '/offers',
  REFUND: '/refund',

  /** platforms * */
  GET_PLATFORM_LINK: (slug: string) => `/${slug}`,
  GET_ACTIVITY_LINK: (platform: string, slug: string) => `/${platform}/${slug}`,
} as const;
