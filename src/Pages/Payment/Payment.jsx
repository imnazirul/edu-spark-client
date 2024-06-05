import { useParams } from "react-router-dom";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PAYMENT_PK);

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: classItem = [],
    isPending,
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

  return (
    <div>
      <h1 className="text-2xl md:text-3xl text-center font-semibold font-poppins">
        Payment For {classItem?.title}
      </h1>
      <div className="flex gap-5">
        <div className="flex-1">
          <Elements className="bg-white" stripe={stripePromise}>
            <CheckoutForm price={classItem?.price} id={id} />
          </Elements>
        </div>
        <div className="flex-1">
          <div>
            <img src={classItem?.image} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
