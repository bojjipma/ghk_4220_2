declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (e: 'event', v: string, data?: Record<string, string>) => void;
  }
}

type Payload = {
  subscription: 'month' | 'year';
};

export const sendDataToGA = async (payload: Payload) => {
  try {
    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

      await fetch(
          'https://script.google.com/macros/s/AKfycbw6o0CYq_qIyuJRMDovhn6M7qJBw7FvVq8zjEIYTdhznS-p97gNeqw2Y3AwAdQAqqoGXw/exec',
          {
              redirect: 'follow',
              method: 'POST',
              body: JSON.stringify({ date, ...payload, variant: '2' }),
              headers: {
                  'Content-Type': 'text/plain;charset=utf-8',
              },
          },
      );
  } catch (error) {
      console.error('Error!', error);
  }
};
