import * as Types from './types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type InoicevCreateOrderMutationVariables = Types.Exact<{
  checkoutModel: Types.CheckoutModelInput;
}>;


export type InoicevCreateOrderMutation = (
  { __typename?: 'Mutation' }
  & { paymentProviders: (
    { __typename?: 'PaymentProvidersMutations' }
    & { invoice: (
      { __typename?: 'InvoiceMutation' }
      & { createInvoice: (
        { __typename?: 'CreateInvoiceMutation' }
        & Pick<Types.CreateInvoiceMutation, 'success' | 'orderId'>
      ) }
    ) }
  ) }
);


export const InoicevCreateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InoicevCreateOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"checkoutModel"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CheckoutModelInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paymentProviders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invoice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createInvoice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"checkoutModel"},"value":{"kind":"Variable","name":{"kind":"Name","value":"checkoutModel"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<InoicevCreateOrderMutation, InoicevCreateOrderMutationVariables>;