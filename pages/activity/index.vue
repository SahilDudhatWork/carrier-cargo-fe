<template>
  <div>
    <div>
      <h1 class="text-[#4B4B4B] font-normal text-[12px] mb-5 cursor-pointer">
        ACTIVITY
      </h1>
    </div>
    <div class="relative">
      <img
        src="@/static/svg/search.svg"
        alt=""
        class="absolute right-3 top-[18px] cursor-pointer"
      />
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search by request ID"
        class="border border-gray-300 text-gray-900 rounded-lg block px-3 py-[14px] focus:outline-none mb-4 w-full"
        v-model="search"
        @keyup="searchText"
      />
    </div>
    <div class="mt-6">
      <ActivityActionButton @add="allActionButtons" />
    </div>
    <div class="mt-6">
      <ActivityTable
        :allData="allActivityData"
        :paginationText="paginationText"
        @firstPage="firstPage"
        @prevPage="prevPage"
        @nextPage="nextPage"
        @lastPage="lastPage"
        :sortBy="sortBy"
        @handleSeeMoreClick="handleSeeMoreClick"
        :activityPaginationData="activityPaginationData"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  layout: "dashboard",
  data() {
    return {
      search: "",
      sortBy: "Requests",
      allActivityData: [],
      activityPaginationData: {},
    };
  },
  computed: {
    ...mapGetters({}),
    paginationText() {
      return this.generatePaginationText(this.activityPaginationData);
    },
  },
  methods: {
    ...mapActions({
      fetchAllActivities: "activity/fetchAllActivities",
    }),
    handleSeeMoreClick(id) {
      this.$router.push(`/activity/${id}`);
    },
    generatePaginationText(pagination) {
      const { current_page, limit, total } = pagination;

      const start = (current_page - 1) * limit + 1;
      const end = Math.min(current_page * limit, total);

      return `${start}-${end} of ${total}`;
    },
    async firstPage() {
      try {
        await this.getAllActivity({
          sortBy: this.sortBy,
          keyWord: this.search,
          page: 1,
          limit: this.activityPaginationData.limit,
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
        await this.getAllActivity({
          sortBy: this.sortBy,
          keyWord: this.search,
          page: this.activityPaginationData?.total_page,
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
        await this.getAllActivity({
          sortBy: this.sortBy,
          keyWord: this.search,
          page: this.activityPaginationData?.current_page - 1,
          limit: this.activityPaginationData?.limit,
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
        await this.getAllActivity({
          sortBy: this.sortBy,
          keyWord: this.search,
          page: this.activityPaginationData?.current_page + 1,
          limit: this.activityPaginationData?.limit,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    closeModal() {
      this.isModal = false;
    },
    async getAllActivity(payload) {
      let { sortBy, page, limit, keyWord } = payload;
      sortBy = sortBy || "";
      page = page || 1;
      limit = limit || 10;
      keyWord = keyWord || "";
      const res = await this.fetchAllActivities({
        sortBy: sortBy,
        page: page,
        limit: limit,
        keyWord: keyWord,
      });
      this.allActivityData = res?.data?.response;
      this.activityPaginationData = res?.data?.pagination;
    },
    async allActionButtons(type) {
      try {
        this.sortBy = type;
        await this.getAllActivity({
          keyWord: this.search,
          sortBy: this.sortBy,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
  },
  async mounted() {
    try {
      await this.getAllActivity({
        keyWord: this.search,
        sortBy: this.sortBy,
      });
    } catch (error) {
      console.log(error);
      this.$toast.open({
        message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
        type: "error",
      });
    }
  },
  async created() {
    this.searchText = this.$lodash.debounce(async (payload) => {
      await this.getAllActivity({ keyWord: this.search, sortBy: this.sortBy });
    }, 1000);
  },
};
</script>
