<template>
  <div>
    <div>
      <div>
        <h1 class="text-[#4B4B4B] font-normal text-[12px] mb-5 cursor-pointer">
          SUB CARRIER
        </h1>
      </div>
      <div>
        <OptionList
          labelText="Sub Carrier list"
          buttonText="Add Sub Carrier"
          listWidth="88%"
          @add="addSubCarrier"
          :isAddBtn="checkPermission?.add"
        />
      </div>
      <div>
        <SubCarrierTable
          :allData="allSubCarrierData"
          @deleteItem="removeSubCarrier"
          @handleClick="editSubCarrier"
        />
        <DeleteAlertModal
          :isModal="isModal"
          @handleSubmit="handleDelete"
          @close="closeModal"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  layout: "dashboard",
  data() {
    return {
      isModal: false,
    };
  },
  computed: {
    ...mapGetters({
      allSubCarrierData: "sub-carrier/getAllSubCarrierData",
      getSinglePermission: "auth/getSinglePermission",
    }),
    checkPermission() {
      return this.getSinglePermission("Sub Carrier");
    },
  },
  methods: {
    ...mapActions({
      fetchAllSubCarrier: "sub-carrier/fetchAllSubCarrier",
      deleteSubCarrier: "sub-carrier/deleteSubCarrier",
    }),
    async getAllSubCarrier() {
      try {
        await this.fetchAllSubCarrier();
      } catch (error) {
        console.log(error);
      }
    },
    editSubCarrier(item) {
      this.$router.push(`sub-carrier/edit-sub-carrier/${item.accountId}`);
    },
    addSubCarrier() {
      this.$router.push("/sub-carrier/add-sub-carrier");
    },
    async handleDelete() {
      try {
        const response = await this.deleteSubCarrier({
          accountId: this.selectedId,
        });
        this.$toast.open({
          message: response.msg,
        });
        this.isModal = false;
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
    async removeSubCarrier(id) {
      this.isModal = true;
      this.selectedId = id;
    },
  },
  async mounted() {
    await this.getAllSubCarrier();
  },
};
</script>
