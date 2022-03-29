import { query as q } from "faunadb";
import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
  subcriptionId: string,
  customerId: string
){
  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(
        q.Match(
          q.Index('user_by_stripe_id'),
          customerId
        )
      )
    )
  )

  const subscription = await stripe.subscriptions.retrieve(subcriptionId)

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id
  }

  await fauna.query(
    q.Create(
      q.Collection('subscriptions'),
      { data: subscriptionData }
    )
  )
}
