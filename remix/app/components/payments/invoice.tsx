import { FormEventHandler, useState } from "react";
import { serviceAPIClient } from "../../clients";
import { CheckoutModelInput } from "../../service-api/types.generated";
import {
	InoicevCreateOrderDocument,
	InoicevCreateOrderMutation,
	InoicevCreateOrderMutationVariables,
} from "../../service-api/invoice-create-order.generated";
import { PaymentProps } from "./types";
import { Form, useSubmit } from "remix";
import React from "react";


interface FormProps extends PaymentProps {
	checkoutModel: CheckoutModelInput;
}

export const InvoiceForm = ({
	checkoutModel,
	onError = (error) => console.log(error),
}: FormProps) => {

	const [status, setStatus] = useState<"idle" | "submitting">("idle");

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		go();

		async function go() {
			setStatus("submitting");

			// Show a success message to your customer
			// There's a risk of the customer closing the window before callback
			// execution. Set up a webhook or plugin to listen for the
			// payment_intent.succeeded event that handles any business critical
			// post-payment actions.
			const response = await serviceAPIClient.request<
				InoicevCreateOrderMutation,
				InoicevCreateOrderMutationVariables
			>(InoicevCreateOrderDocument, {
				checkoutModel,
			});

			const { success, orderId } =
				response.paymentProviders.invoice.createInvoice;

			if (success) {
				window.location.replace(`/confirmation/${orderId}`);
			} else {
				setStatus("idle");
				onError(new Error("Unknown"));
			}
		}
	};

	return (
		<Form method="post" onSubmit={handleSubmit}>

			<button
				type="submit"
				disabled={status !== "idle"}
				className="btn btn-block"
			>
				{status === "idle" ? "Оформить заказ" : "Подождите..."}
			</button>
		</Form>
	);
};

export const StripePayment = ({ checkoutModel, onSuccess }: PaymentProps) => {

	return (
		<InvoiceForm
			checkoutModel={checkoutModel}
			onSuccess={onSuccess}
		/>
	);
};

export const Invoice = ({ checkoutModel, onSuccess }: PaymentProps) => {
	return <StripePayment checkoutModel={checkoutModel} onSuccess={onSuccess} />;
};