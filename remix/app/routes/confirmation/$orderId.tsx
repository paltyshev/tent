import { serviceAPIClient } from "../../clients";
import {
  GetOrderDocument,
  GetOrderQuery,
  GetOrderQueryVariables,
} from "../../service-api/get-order.generated";
import { LoaderFunction, useLoaderData } from "remix";
import Confirmation from "../../components/confirmation";
import React from "react";

export const loader: LoaderFunction = async ({ params }) => {
  const data = await serviceAPIClient.request<
    GetOrderQuery,
    GetOrderQueryVariables
  >(GetOrderDocument, { id: params.orderId as string });

  return { data };
};

export const ConfirmationInvoice = () => {
  const data = useLoaderData();
  const order = data.data?.orders?.get;

  return (
    <div>
      {order ? (
        <Confirmation order={order} success={true} />
      ) : (
        <div className="w-auth p-20 bg-background3 mx-auto mt-20 text-text">
          <p>Заказ оформляется... Обновите страницу.</p>
        </div>
      )}
    </div>
  );
};

export default ConfirmationInvoice;