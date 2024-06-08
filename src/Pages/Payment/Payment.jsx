import { useParams } from "react-router-dom";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PAYMENT_PK);

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: classItem = [],
    isPending,
    isError,
    // refetch,
  } = useQuery({
    queryKey: ["SingleClassItem", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/single_class/${id}`);
      return res.data;
    },
    refetchOnWindowFocus: "always",
  });

  if (isPending) {
    return <h1 className="text-5xl text-center mt-10">Loading...</h1>;
  }

  if (isError) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <h1 className="text-5xl text-center">Data Not Found!</h1>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Payment | EduSpark</title>
      </Helmet>
      <h1 className="text-2xl mb-5 md:text-3xl text-center font-semibold font-poppins">
        Payment For {classItem?.title}
      </h1>
      <div className="flex gap-5">
        <div className="flex-1  p-5 bg-base-300 rounded-xl border">
          <h1 className="text-3xl font-semibold mb-5">
            {" "}
            PAYMENT AMOUNT: ${classItem?.price}
          </h1>
          <Elements className="bg-white" stripe={stripePromise}>
            <CheckoutForm price={classItem?.price} id={id} />
          </Elements>
        </div>
        <div className="flex-1">
          <div>
            <img className="h-96" src={classItem?.image} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
