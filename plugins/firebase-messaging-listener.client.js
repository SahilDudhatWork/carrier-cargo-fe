export default ({ store }) => {
  if (process.client && "BroadcastChannel" in window) {
    const channel = new BroadcastChannel("firebase-notification");

    channel.onmessage = async (event) => {
      if (event.data.type === "NEW_NOTIFICATION") {
        const page = event.data.page || 1;
        const limit = event.data.limit || 10;

        try {
          await store.dispatch("auth/fetchNotifications", { page, limit });
        } catch (err) {
          console.error("Failed to fetch notifications:", err);
        }
      }
    };
  }
};
