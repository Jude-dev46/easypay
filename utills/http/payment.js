import { fetchCustomer } from "./customer";

const api_key = process.env.EXPO_PUBLIC_SECRET_API_KEY;

const payment_url = `https://api.paystack.co/transaction/initialize`;

const NETWORK_CODE = ["mtn", "vod", "tgo"];

export async function fundWallet(email, amount) {
  const _amount = amount * 100;
  try {
    const response = await fetch(payment_url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${api_key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, _amount }),
    });

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.log("Error", error);
  }
}

export async function purchaseAirtime({
  email,
  phone_number,
  network,
  amount,
}) {
  console.log(email, phone_number, network, amount);

  const params = JSON.stringify({
    amount: amount * 100,
    email: email,
    currency: "NGN",
    mobile_money: {
      phone: phone_number,
      provider: network === "MTN" ? "mtn" : network === "AIRTEL" ? "tgo" : "",
    },
  });

  try {
    const response = await fetch("https://api.paystack.co/charge", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${api_key}`,
        "Content-Type": "application/json",
      },
      body: params,
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error!", error);
  }
}

export async function initializeDstvPayment({ amount, email }, recipientCode) {
  const customer = await fetchCustomer(email);

  const params = JSON.stringify({
    email: email,
    amount: amount * 100,
    metadata: {
      custom_fields: [
        {
          display_name: "DSTV Subcription",
          variable_name: "dstv_subcription",
          value: recipientCode,
        },
        { display_name: "DSTV", variable_name: "dstv", value: recipientCode },
      ],
      reference: customer.customer_code,
      channels: ["utility-bill"],
    },
  });

  try {
    const response = await fetch("https://api.paystack.co/charge", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${api_key}`,
        "Content-Type": "application/json",
      },
      body: params,
    });

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log("Error!", error);
  }
}
