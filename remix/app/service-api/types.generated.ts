export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
  Upload: any;
};

export type AddressInput = {
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  middleName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  postalCode?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
  street2?: InputMaybe<Scalars['String']>;
  streetNumber?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type Attribute = {
  __typename?: 'Attribute';
  attribute: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type Basket = {
  __typename?: 'Basket';
  cart: Array<CartItem>;
  total: Price;
  voucher?: Maybe<Voucher>;
};

export type BasketModelInput = {
  cart: Array<SimpleCartItem>;
  crystallizeOrderId?: InputMaybe<Scalars['String']>;
  klarnaOrderId?: InputMaybe<Scalars['String']>;
  locale: LocaleInput;
  voucherCode?: InputMaybe<Scalars['String']>;
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type CartItem = {
  __typename?: 'CartItem';
  attributes?: Maybe<Array<Attribute>>;
  images?: Maybe<Array<Image>>;
  name?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  price?: Maybe<Price>;
  priceVariants?: Maybe<Array<PriceVariant>>;
  quantity: Scalars['Int'];
  sku: Scalars['String'];
  stock?: Maybe<Scalars['Int']>;
  vatType?: Maybe<VatType>;
};

export type CheckoutModelInput = {
  basketModel: BasketModelInput;
  checkoutURL: Scalars['String'];
  confirmationURL: Scalars['String'];
  customer?: InputMaybe<OrderCustomerInput>;
  termsURL: Scalars['String'];
};

export type CreateInvoiceMutation = {
  __typename?: 'CreateInvoiceMutation';
  orderId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Image = {
  __typename?: 'Image';
  url: Scalars['String'];
  variants?: Maybe<Array<ImageVariant>>;
};

export type ImageVariant = {
  __typename?: 'ImageVariant';
  height?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type InvoiceMutation = {
  __typename?: 'InvoiceMutation';
  createInvoice: CreateInvoiceMutation;
};


export type InvoiceMutationCreateInvoiceArgs = {
  checkoutModel: CheckoutModelInput;
};

export type KeyValuePair = {
  __typename?: 'KeyValuePair';
  key: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type KeyValuePairInput = {
  key: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type KlarnaMutations = {
  __typename?: 'KlarnaMutations';
  renderCheckout: KlarnaRenderCheckoutReponse;
};


export type KlarnaMutationsRenderCheckoutArgs = {
  checkoutModel: CheckoutModelInput;
};

export type KlarnaRenderCheckoutReponse = {
  __typename?: 'KlarnaRenderCheckoutReponse';
  crystallizeOrderId: Scalars['String'];
  html: Scalars['String'];
  klarnaOrderId: Scalars['String'];
};

export type LocaleInput = {
  appLanguage: Scalars['String'];
  crystallizeCatalogueLanguage?: InputMaybe<Scalars['String']>;
  crystallizePriceVariant?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  locale: Scalars['String'];
};

export type MollieCreatePaymentResponse = {
  __typename?: 'MollieCreatePaymentResponse';
  checkoutLink?: Maybe<Scalars['String']>;
  crystallizeOrderId: Scalars['String'];
  success: Scalars['Boolean'];
};

export type MollieMutations = {
  __typename?: 'MollieMutations';
  createPayment: MollieCreatePaymentResponse;
};


export type MollieMutationsCreatePaymentArgs = {
  checkoutModel: CheckoutModelInput;
};

export type Mutation = {
  __typename?: 'Mutation';
  paymentProviders: PaymentProvidersMutations;
  user?: Maybe<UserMutations>;
};

export type MyCustomBusinnessQueries = {
  __typename?: 'MyCustomBusinnessQueries';
  dynamicRandomInt: Scalars['Int'];
  whatIsThis: Scalars['String'];
};

export type OrderCustomerInput = {
  addresses?: InputMaybe<Array<AddressInput>>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type OrderQueries = {
  __typename?: 'OrderQueries';
  get?: Maybe<Scalars['JSON']>;
};


export type OrderQueriesGetArgs = {
  id: Scalars['String'];
};

export type PaymentProvider = {
  __typename?: 'PaymentProvider';
  config?: Maybe<Scalars['JSON']>;
  enabled: Scalars['Boolean'];
};

export type PaymentProvidersMutations = {
  __typename?: 'PaymentProvidersMutations';
  invoice: InvoiceMutation;
  klarna: KlarnaMutations;
  mollie: MollieMutations;
  paypal: PaypalMutation;
  stripe: StripeMutations;
  vipps: VippsMutations;
};

export type PaymentProvidersQueries = {
  __typename?: 'PaymentProvidersQueries';
  invoice: PaymentProvider;
  klarna: PaymentProvider;
  mollie: PaymentProvider;
  paypal: PaymentProvider;
  stripe: PaymentProvider;
  vipps: PaymentProvider;
};

export type PaypalMutation = {
  __typename?: 'PaypalMutation';
  confirmPayment: PaypalPaymentResponse;
  createPayment: PaypalPaymentResponse;
};


export type PaypalMutationConfirmPaymentArgs = {
  checkoutModel: CheckoutModelInput;
  orderId?: InputMaybe<Scalars['String']>;
};


export type PaypalMutationCreatePaymentArgs = {
  checkoutModel: CheckoutModelInput;
};

export type PaypalPaymentResponse = {
  __typename?: 'PaypalPaymentResponse';
  orderId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Price = {
  __typename?: 'Price';
  currency?: Maybe<Scalars['String']>;
  discount: Scalars['Float'];
  gross: Scalars['Float'];
  net: Scalars['Float'];
  tax?: Maybe<Tax>;
  taxAmount?: Maybe<Scalars['Float']>;
};

export type PriceVariant = {
  __typename?: 'PriceVariant';
  currency: Scalars['String'];
  identifier: Scalars['String'];
  price?: Maybe<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  basket: Basket;
  myCustomBusinessThing: MyCustomBusinnessQueries;
  orders: OrderQueries;
  paymentProviders: PaymentProvidersQueries;
  user: User;
  voucher: VoucherResponse;
};


export type QueryBasketArgs = {
  basketModel: BasketModelInput;
};


export type QueryVoucherArgs = {
  code: Scalars['String'];
};

export type SendMagicLinkResponse = {
  __typename?: 'SendMagicLinkResponse';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type SimpleCartItem = {
  id?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
  priceVariantIdentifier: Scalars['String'];
  quantity?: InputMaybe<Scalars['Int']>;
  sku: Scalars['String'];
  stock?: InputMaybe<Scalars['Int']>;
};

export type StripeConfirmOrderResponse = {
  __typename?: 'StripeConfirmOrderResponse';
  orderId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type StripeMutations = {
  __typename?: 'StripeMutations';
  confirmOrder: StripeConfirmOrderResponse;
  createPaymentIntent?: Maybe<Scalars['JSON']>;
};


export type StripeMutationsConfirmOrderArgs = {
  checkoutModel: CheckoutModelInput;
  paymentIntentId: Scalars['String'];
};


export type StripeMutationsCreatePaymentIntentArgs = {
  checkoutModel: CheckoutModelInput;
  confirm?: InputMaybe<Scalars['Boolean']>;
  paymentMethodId?: InputMaybe<Scalars['String']>;
};

export type Tax = {
  __typename?: 'Tax';
  name?: Maybe<Scalars['String']>;
  percent?: Maybe<Scalars['Float']>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  isLoggedIn: Scalars['Boolean'];
  lastName?: Maybe<Scalars['String']>;
  logoutLink: Scalars['String'];
  meta?: Maybe<Array<KeyValuePair>>;
  middleName?: Maybe<Scalars['String']>;
};

export type UserMutations = {
  __typename?: 'UserMutations';
  sendMagicLink: SendMagicLinkResponse;
  update: User;
};


export type UserMutationsSendMagicLinkArgs = {
  email: Scalars['String'];
  redirectURLAfterLogin: Scalars['String'];
};


export type UserMutationsUpdateArgs = {
  input: UserUpdateInput;
};

export type UserUpdateInput = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  meta?: InputMaybe<Array<KeyValuePairInput>>;
  middleName?: InputMaybe<Scalars['String']>;
};

export type VatType = {
  __typename?: 'VatType';
  name: Scalars['String'];
  percent: Scalars['Int'];
};

export type VippsInitiatePaymentResponse = {
  __typename?: 'VippsInitiatePaymentResponse';
  checkoutLink?: Maybe<Scalars['String']>;
  crystallizeOrderId: Scalars['String'];
  success: Scalars['Boolean'];
};

export type VippsMutations = {
  __typename?: 'VippsMutations';
  initiatePayment: VippsInitiatePaymentResponse;
};


export type VippsMutationsInitiatePaymentArgs = {
  checkoutModel: CheckoutModelInput;
};

export type Voucher = {
  __typename?: 'Voucher';
  code: Scalars['String'];
  discountAmount?: Maybe<Scalars['Int']>;
  discountPercent?: Maybe<Scalars['Float']>;
};

export type VoucherResponse = {
  __typename?: 'VoucherResponse';
  isValid: Scalars['Boolean'];
  voucher?: Maybe<Voucher>;
};
