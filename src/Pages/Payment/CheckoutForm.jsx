/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../CustomHooks/useAuth";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useEnrolledClassIds from "../../CustomHooks/useEnrolledClassIds";

const CheckoutForm = ({ price, id }) => {
  const { refetch: idsRefetch } = useEnrolledClassIds();
  const { mutate: addEnrolledClass, isSuccess } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/enrolled_classes", data);
      return res.data;
    },
    onSuccess: (response) => {
      idsRefetch();
      setBtnText("PAY");
      console.log(response);
    },
    onError: () => {},
  });

  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [btnText, setBtnText] = useState("PAY");
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    const classPrice = { price: price };

    axiosSecure.post("/create-payment-intent", classPrice).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnText(
      <>
        {" "}
        <div className="border-green-400 h-7 w-7 animate-spin rounded-full border-[3px] border-t-white" />{" "}
        PROCESSING...
      </>
    );

    if (!stripe || !elements) {
      setBtnText("PAY");
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      setBtnText("PAY");
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
      setBtnText("PAY");
      setPaymentError(error.message);
      console.log("paymentMethodErr", error);
    } else {
      //   console.log("paymentMethod", paymentMethod);
      setPaymentError("");
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
      setBtnText("PAY");
      //   console.log(intentError);
      Swal.fire({
        title: "PAYMENT FAILED",
        text: `${intentError.message}`,
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
      //   console.log(enrolledClassDetails);
      addEnrolledClass(enrolledClassDetails);
      navigate("/dashboard/my_enroll_class");
      Swal.fire({
        title: "PAYMENT SUCCESSFUL",
        text: `YOUR TRANSACTION ID: ${paymentIntent.id}`,
        icon: "success",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-3 rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
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
        </div>

        <button
          className="btn mt-5 bg-green-500 text-white hover:bg-green-500 px-8"
          disabled={!stripe || !clientSecret}
        >
          {btnText}
        </button>
      </form>

      {paymentError && (
        <p className="text-red-600 mt-2 px-2 bg-white bg-opacity-50 max-w-80">
          {paymentError}
        </p>
      )}
    </>
  );
};

export default CheckoutForm;
