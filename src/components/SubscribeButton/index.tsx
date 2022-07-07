import { useSession, signIn } from "next-auth/client";
import { api } from "../../services/api";
import { useRouter } from "next/router";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession();
  const router = useRouter()

  async function handleSubscribe(){
    if(!session){
      signIn('github')
      return
    }

    if(session.activeSubscription){
      router.push('/posts')
      return;
    }

    try {
      const response = await api.post('/subscribe')

      const { sessionId } = response.data

      const stripe = await getStripeJs()

      await stripe.redirectToCheckout({sessionId: sessionId.id})

    } catch (error) {
      alert(error.message)
    }


  }

  return (
    <button onClick={handleSubscribe} className={styles.subscribeButton} type="button">
      Subscribe now
    </button>
  );
}
