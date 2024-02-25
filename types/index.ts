export type PageProps = {
  params: {
    slugs?: string[]
    slug: string
  }
  searchParams: Record<string, unknown>
}

export type ReferralProps = {
  params: {
    code: string
  }
  searchParams: Record<string, unknown>
}

export type PaymentPageProps = {
  params: Record<string, unknown>
  searchParams: {
    OutSum: string
    InvId: string
    Shp_user?: string
    m_orderid?: string
    Culture: string
    MERCHANT_ORDER_ID?: string
  }
}
