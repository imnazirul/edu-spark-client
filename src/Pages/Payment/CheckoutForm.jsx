/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../CustomHooks/useAuth";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price, id }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    const classPrice = { price: price };

    axiosSecure.post("/create-payment-intent", classPrice).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        email: user?.email || "anonymous",
        name: user?.displayName || "anonymous",
      },
    });

    if (error) {
      console.log("paymentmethoderr", error);
    } else {
      //   console.log("paymentMethod", paymentMethod);
    }
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (intentError) {
      //   console.log(intentError);
      Swal.fire({
        title: "PAYMENT FAILED",
        text: `PLEASE RELOAD THE PAGE OR TRY AGAIN LATER`,
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    } else {
      //   console.log("payment intents", paymentIntent);
      const enrolledClassDetails = {
        enrolledClassId: id,
        enrolledEmail: user?.email,
        transactionId: paymentIntent?.id,
        price: price,
      };
      console.log(enrolledClassDetails);
      Swal.fire({
        title: "PAYMENT SUCCESSFUL",
        text: `YOUR TRANSACTION ID: ${paymentIntent.id}`,
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard/my_enroll_class");
        }
      });
    }
  };

  return (
    <>
      <form
        className="bg-base-300 p-5 rounded-xl border"
        onSubmit={handleSubmit}
      >
        <CardElement
          options={{
            style: {
              base: {
                backgroundColor: "white",
                fontSize: "20px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <button
          className="btn mt-5 bg-green-500 text-white hover:bg-transparent hover:text-green-500 hover:border-green-500"
          disabled={!stripe}
        >
          PAY
        </button>
      </form>
    </>
  );
};

export default CheckoutForm;
