const secret_key = process.env.EXPO_PUBLIC_SECRET_API_KEY;

const url = `https://api.paystack.co/transaction?`;

export async function fetchTransaction(customerId) {
  try {
    const response = await fetch(url + `customer=${customerId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${secret_key}`,
      },
    });

    const transaction = await response.json();

    return transaction.data;
  } catch (error) {
    console.log("Error!", error);
  }
}
