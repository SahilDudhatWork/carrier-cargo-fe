<template>
  <div>
    <div>
      <h1 class="text-[#4B4B4B] font-normal text-[12px] mb-5 cursor-pointer">
        VEHICLE
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
        placeholder="Search by vehicle name/ID"
        class="border border-gray-300 text-gray-900 rounded-lg block px-3 py-[14px] focus:outline-none mb-4 w-full"
        v-model="search"
        @keyup="searchText"
      />
    </div>
    <div>
      <OptionList
        labelText="Vehicle list"
        buttonText="Add Vehicle"
        listWidth="90%"
        @add="addVehicle"
        :isAddBtn="checkPermission?.add"
      />
    </div>
    <div class="mt-6">
      <VehicleActionButton @add="allActionButtons" />
    </div>
    <div>
      <VehicleTable
        :allData="allVehicleData"
        :paginationText="paginationText"
        @handleVerify="handleVerify"
        @deleteItem="removeVehicle"
        @handleClick="editVehicle"
        @firstPage="firstPage"
        @prevPage="prevPage"
        @nextPage="nextPage"
        @lastPage="lastPage"
        :isEditBtn="checkPermission?.edit"
        :isDeleteBtn="checkPermission?.delete"
      />
      <DeleteAlertModal
        :isModal="isModal"
        @handleSubmit="handleDelete"
        @close="closeModal"
      />
    </div>
    <loading
      :active="isLoading"
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
      isModal: false,
      search: "",
      sortBy: "all",
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      allVehicleData: "vehicle/getAllVehicleData",
      vehiclePaginationData: "vehicle/getVehiclePaginationData",
      getSinglePermission: "auth/getSinglePermission",
    }),
    paginationText() {
      return this.generatePaginationText(this.vehiclePaginationData);
    },
    checkPermission() {
      return this.getSinglePermission("Vehicle");
    },
  },
  methods: {
    ...mapActions({
      fetchAllVehicle: "vehicle/fetchAllVehicle",
      deleteVehicle: "vehicle/deleteVehicle",
      updateVehicleStatus: "vehicle/updateVehicleStatus",
    }),
    generatePaginationText(pagination) {
      const { current_page, limit, total } = pagination;

      const start = (current_page - 1) * limit + 1;
      const end = Math.min(current_page * limit, total);

      return `${start}-${end} of ${total}`;
    },
    async firstPage() {
      try {
        await this.getAllVehicle({
          sortBy: this.sortBy,
          keyWord: this.search,
          page: 1,
          limit: this.vehiclePaginationData.limit,
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
        await this.getAllVehicle({
          sortBy: this.sortBy,
          keyWord: this.search,
          page: this.vehiclePaginationData?.total_page,
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
        await this.getAllVehicle({
          sortBy: this.sortBy,
          keyWord: this.search,
          page: this.vehiclePaginationData.current_page - 1,
          limit: this.vehiclePaginationData.limit,
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
        await this.getAllVehicle({
          sortBy: this.sortBy,
          keyWord: this.search,
          page: this.vehiclePaginationData.current_page + 1,
          limit: this.vehiclePaginationData.limit,
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
    addVehicle() {
      this.$router.push("/vehicle/add-vehicle");
    },
    async getAllVehicle(payload) {
      this.isLoading = true;
      try {
        let { sortBy, page, limit, keyWord } = payload;
        sortBy = sortBy || "";
        page = page || 1;
        limit = limit || 10;
        keyWord = keyWord || "";
        await this.fetchAllVehicle({
          sortBy: sortBy,
          page: page,
          limit: limit,
          keyWord: keyWord,
        });
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      } finally {
        this.isLoading = false;
      }
    },
    async removeVehicle(id) {
      this.isModal = true;
      this.selectedId = id;
    },
    editVehicle(item) {
      this.$router.push(`vehicle/edit-vehicle/${item._id}`);
    },
    async handleVerify(item) {
      this.isLoading = true;
      try {
        const res = await this.updateVehicleStatus({
          _id: item._id,
          status: item.status == "Active" ? "Deactive" : "Active",
        });
        this.$toast.open({
          message: res.msg,
        });
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      } finally {
        this.isLoading = false;
      }
    },
    async handleDelete() {
      this.isLoading = true;
      try {
        const response = await this.deleteVehicle({
          _id: this.selectedId,
        });
        this.$toast.open({
          message: response.msg,
        });
        this.isModal = false;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      } finally {
        this.isLoading = false;
      }
    },
    async allActionButtons(type) {
      try {
        this.sortBy = type;
        await this.getAllVehicle({
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
      await this.getAllVehicle({
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
      await this.getAllVehicle({ keyWord: this.search, sortBy: this.sortBy });
    }, 1000);
  },
};
</script>
