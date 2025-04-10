<template>
  <div>
    <div>
      <h1 class="text-[#4B4B4B] font-normal text-[12px] mb-5 cursor-pointer">
        NOTIFICATIONS
      </h1>
    </div>
    <div class="mt-6">
      <NotificationsTable
        :allData="notificationData"
        :paginationText="paginationText"
        @firstPage="firstPage"
        @prevPage="prevPage"
        @nextPage="nextPage"
        @lastPage="lastPage"
      />
    </div>
    <loading
      :active="isLoader"
      :is-full-page="true"
      color="#007BFF"
      loader="bars"
      :height="70"
      :width="70"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  layout: "dashboard",
  data() {
    return {
      isLoader: false,
    };
  },
  computed: {
    ...mapGetters({
      notificationData: "auth/getNotificationData",
      notificationPaginationData: "auth/getNotificationPaginationData",
    }),
    paginationText() {
      return this.generatePaginationText(this.notificationPaginationData);
    },
  },
  methods: {
    ...mapActions({
      fetchNotifications: "auth/fetchNotifications",
    }),
    generatePaginationText(pagination) {
      const { current_page, limit, total } = pagination;

      const start = (current_page - 1) * limit + 1;
      const end = Math.min(current_page * limit, total);

      return `${start}-${end} of ${total}`;
    },
    async firstPage() {
      try {
        await this.getNotifications({
          page: 1,
          limit: this.notificationPaginationData?.limit,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async lastPage() {
      try {
        await this.getNotifications({
          page: this.notificationPaginationData?.total_page,
          limit: 10,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async prevPage() {
      try {
        await this.getNotifications({
          page: this.notificationPaginationData?.current_page - 1,
          limit: this.notificationPaginationData?.limit,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async nextPage() {
      try {
        await this.getNotifications({
          page: this.notificationPaginationData?.current_page + 1,
          limit: this.notificationPaginationData?.limit,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async getNotifications(payload = { page: 1, limit: 10 }) {
      try {
        this.isLoader = true;
        let { page, limit } = payload;
        await this.fetchNotifications({
          page: page,
          limit: limit,
        });
        this.isLoader = false;
      } catch (error) {
        this.isLoader = false;
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      } finally {
        this.isLoader = false;
      }
    },
  },
  async mounted() {
    this.getNotifications();
  },
};
</script>
