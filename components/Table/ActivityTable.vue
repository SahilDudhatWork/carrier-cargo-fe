<template>
  <div>
    <div class="mt-6">
      <div class="relative overflow-x-auto">
        <table class="w-full text-left rtl:text-right">
          <thead class="bg-[#F4F4F4]">
            <tr>
              <th
                scope="col"
                class="pl-3 py-3 rounded-tl-lg text-[#000000] font-normal text-[12px]"
              >
                Sr. no
              </th>
              <th
                scope="col"
                class="sm:pr-4 px-4 py-3 text-[#000000] font-normal text-[12px]"
              >
                Movement ID
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                Status
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                Port & Bridge
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                User Info
              </th>
              <template v-if="sortBy === 'Requests'">
                <th
                  scope="col"
                  class="ml-6 pr-6 py-3 text-[#000000] font-normal text-[12px]"
                >
                  Actions
                </th>
              </template>
              <template v-if="sortBy !== 'Requests'">
                <th
                  scope="col"
                  class="ml-6 pr-6 py-3 text-[#000000] font-normal text-[12px]"
                >
                  Operator Info
                </th>
                <th
                  scope="col"
                  class="ml-6 pr-6 py-3 text-[#000000] font-normal text-[12px]"
                >
                  Vehicle Info
                </th>
              </template>
              <template v-if="sortBy === 'InProgress'">
                <th
                  scope="col"
                  class="ml-6 pr-6 py-3 text-[#000000] font-normal text-[12px]"
                >
                  Actions
                </th>
              </template>
              <th
                scope="col"
                class="px-3 py-3 rounded-tr-lg text-[#000000] font-normal text-[12px]"
              >
                Data Links
              </th>
            </tr>
          </thead>
          <tbody v-if="allData?.length > 0">
            <tr
              class="bg-white border-b cursor-pointer"
              v-for="(item, index) in allData"
              :key="index"
            >
              <td class="pl-3">#</td>
              <th
                scope="row"
                class="sm:pr-4 px-4 text-[#000000] font-normal text-[12px]"
              >
                <span class="border-b border-black">{{
                  item?.movementId
                }}</span>
              </th>

              <td class="px-6 py-6">
                <span
                  v-if="formatStatus"
                  class="text-[#FEFEFE] font-medium text-[10px] py-0.5 px-3.5 rounded"
                  :style="{ backgroundColor: buttonColor(item.status) }"
                  >{{ formatStatus(item) }}</span
                >
              </td>
              <td class="px-6 py-6">
                <div class="flex flex-col">
                  <span class="text-[#000000] font-normal text-xs pt-1">{{
                    item?.port_BridgeOfCrossing
                  }}</span>
                </div>
              </td>
              <td class="px-6 py-6">
                <div class="flex flex-col" v-if="item?.userData">
                  <span class="text-[#000000] font-normal text-xs pt-1">{{
                    item?.userData?.contactName
                  }}</span>
                  <span class="text-[#989898] font-normal text-[10px] pt-1"
                    >+{{ item?.userData?.countryCode }}
                    {{ item?.userData?.contactNumber }}</span
                  >
                </div>
              </td>

              <template v-if="item?.status === 'NewAssignments'">
                <td class="py-6">
                  <span
                    class="text-[#2AA1EB] font-normal text-xs border-b border-[#2AA1EB]"
                    @click="acceptRequest(item?.movementId)"
                    >Accept Request</span
                  >
                </td>
              </template>
              <template v-if="$checkQr(item?.status)">
                <td>
                  <div class="flex flex-col" v-if="item?.operatorData">
                    <span class="text-[#000000] font-normal text-xs pt-1">{{
                      item?.operatorData?.operatorName
                    }}</span>
                    <span class="text-[#989898] font-normal text-[10px] pt-1"
                      >+{{ item?.operatorData?.countryCode }}
                      {{ item?.operatorData?.operatorNumber }}</span
                    >
                  </div>
                </td>
                <td>
                  <div class="flex flex-col">
                    <span class="text-[#000000] font-normal text-xs pt-1">{{
                      item?.vehicleData?.vehicleName
                    }}</span>
                    <span class="text-[#989898] font-normal text-[10px] pt-1">{{
                      item?.vehicleData?.mxPlates
                    }}</span>
                  </div>
                </td>
              </template>
              <template
                v-if="
                  item?.status === 'InProgress' || item?.status === 'Pending'
                "
              >
                <td class="py-6">
                  <span
                    class="text-[#2AA1EB] font-normal text-xs border-b border-[#2AA1EB]"
                    @click="reAssignRequest(item?.movementId)"
                    >Reassign</span
                  >
                </td>
              </template>
              <td class="px-6 py-6">
                <button
                  @click="$emit('handleSeeMoreClick', item?.movementId)"
                  class="text-[#2AA1EB] font-light text-xs border-b border-[#2AA1EB]"
                >
                  see more
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td
                colspan="8"
                class="text-xl font-medium text-gray-400 text-center py-10"
              >
                No records available
              </td>
            </tr>
          </tbody>
        </table>
        <div
          v-if="allData?.length > 0"
          class="mt-4 flex justify-end gap-5 items-center mb-10"
        >
          <span>{{ paginationText }}</span>
          <button
            class="p-1 rounded-lg"
            @click="$emit('firstPage')"
            :disabled="activityPaginationData.pre_page_url === null"
            :class="
              activityPaginationData.pre_page_url === null
                ? 'bg-[#89abcf]'
                : 'bg-[#3683D5]'
            "
          >
            <svg
              class="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
              fill="#ffffff"
            >
              <path
                d="M18.41,16.59L13.82,12L18.41,7.41L17,6L11,12L17,18L18.41,16.59M6,6H8V18H6V6Z"
              ></path>
            </svg>
          </button>
          <button
            @click="$emit('prevPage')"
            class="p-[9px] rounded-lg"
            :disabled="activityPaginationData.pre_page_url === null"
            :class="
              activityPaginationData.pre_page_url === null
                ? 'bg-[#89abcf]'
                : 'bg-[#3683D5]'
            "
          >
            <svg
              class="w-3.5 h-3.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
              stroke="#ffffff"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>

          <button
            @click="$emit('nextPage')"
            class="p-[9px] rounded-lg"
            :disabled="activityPaginationData.next_page_url === null"
            :class="
              activityPaginationData.next_page_url === null
                ? 'bg-[#89abcf]'
                : 'bg-[#3683D5]'
            "
          >
            <svg
              class="w-3.5 h-3.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
              stroke="#ffffff"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>

          <button
            @click="$emit('lastPage')"
            class="p-1 rounded-lg"
            :disabled="activityPaginationData.next_page_url === null"
            :class="
              activityPaginationData.next_page_url === null
                ? 'bg-[#89abcf]'
                : 'bg-[#3683D5]'
            "
          >
            <svg
              class="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
              fill="#ffffff"
            >
              <path
                d="M5.59,7.41L10.18,12L5.59,16.59L7,18L13,12L7,6L5.59,7.41M16,6H18V18H16V6Z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div>
      <OperatorAssignModal
        v-if="isAssignOperatorModal"
        :isAssignOperatorModal="isAssignOperatorModal"
        :errors="errors"
        :requestReassign="requestReassign"
        @handleAssignOperator="handleAssignOperator"
        @closeAssignOperatorModal="closeAssignOperatorModal"
      />
      <VehicleAssignModal
        v-if="isAssignVehicleModal"
        :isAssignVehicleModal="isAssignVehicleModal"
        :requestReassign="requestReassign"
        @handleAssignVehicle="handleAssignVehicle"
        @closeAssignVehicleModal="closeAssignVehicleModal"
        @backAssignVehicle="backAssign"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    allData: {
      type: Array,
      required: true,
    },
    activityPaginationData: {
      type: Object,
      required: true,
    },
    paginationText: {
      type: String,
      default: "",
    },
    sortBy: {
      type: String,
      default: "Requests",
    },
  },
  data() {
    return {
      isAssignOperatorModal: false,
      isAssignVehicleModal: false,
      selectedOperator: null,
      selectedVehicle: null,
      carrierReference: null,
      errors: {},
      requestReassign: false,
    };
  },
  computed: {
    ...mapGetters({
      allOperatorData: "operator/getAllOperatorData",
      allVehicleData: "vehicle/getAllVehicleData",
      profileData: "auth/getUserProfile",
    }),
    formatRef() {
      return this.profileData?.commercialReference?.map((user) => {
        return {
          key: user._id,
          label: user?.contactName,
        };
      });
    },
    formatStatus() {
      return (item) => {
        if (!item) return "";
        if (item?.status === "NewAssignments") {
          return "NEW-ASSIGNMENTS";
        } else if (item?.status === "Pending") {
          return "PENDING";
        } else if (item?.status === "InProgress") {
          return "IN-PROGRESS";
        } else if (item?.status === "Completed") {
          return "COMPLETED";
        } else {
          return item?.status;
        }
      };
    },
  },
  watch: {
    isAssignOperatorModal(value) {
      if (value) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    },
    isAssignVehicleModal(value) {
      if (value) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    },
  },
  methods: {
    ...mapActions({
      updateActivity: "activity/updateActivity",
      fetchSingleActivity: "activity/fetchSingleActivity",
      updateSelectedOperator: "activity/updateSelectedOperator",
      updateCarrierReference: "activity/updateCarrierReference",
      updateSelectedVehicle: "activity/updateSelectedVehicle",
      fetchAllActivities: "activity/fetchAllActivities",
      validateCarrierReference: "activity/validateCarrierReference",
    }),
    buttonColor(status) {
      if (status === "NewAssignments") {
        return "#023770";
      } else if (status === "Pending") {
        return "#989898";
      } else if (status === "InProgress") {
        return "#FFAA00";
      } else if (status === "Completed") {
        return "#3ECC48";
      } else {
        return "#000000";
      }
    },
    selectVehicle(vehicle) {
      this.selectedVehicle = vehicle;
    },
    closeAssignOperatorModal() {
      this.isAssignOperatorModal = false;
    },
    closeAssignVehicleModal() {
      this.isAssignVehicleModal = false;
      this.isAssignOperatorModal = false;
    },
    async acceptRequest(id) {
      this.movementId = id;
      this.requestReassign = false;
      this.isAssignOperatorModal = true;
      this.updateSelectedOperator(null);
      this.updateCarrierReference(null);
      this.updateSelectedVehicle(null);
    },
    async reAssignRequest(id) {
      this.movementId = id;
      await this.getSingleTransitInfo();
      this.requestReassign = true;
      this.isAssignOperatorModal = true;
    },

    async backAssign() {
      this.requestReassign = false;
      this.isAssignOperatorModal = true;
      this.isAssignVehicleModal = false;
    },
    async handleAssignOperator(selectedOperator, carrierReference) {
      this.carrierReference = carrierReference;
      this.selectedOperator = selectedOperator;
      const form = {
        carrierReference: this.carrierReference,
        selectedOperator: this.selectedOperator,
      };
      this.errors = await this.$validateActivityModal({
        form: form,
        fieldsToValidate: ["carrierReference", "selectedOperator"],
      });
      if (this.errors) {
        this.errors.forEach((item) => {
          this.errors.carrierReference = item.carrierReference;
        });
      }
      if (Object.keys(this.errors).length > 0) {
        this.$toast.open({
          message: "Please fix the errors before submitting.",
          type: "error",
        });
        return;
      }
      try {
        await this.validateCarrierReference({
          carrierReference: this.carrierReference,
        });
        this.isAssignVehicleModal = true;
        this.isAssignOperatorModal = false;
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async handleAssignVehicle(selectedVehicle) {
      try {
        this.selectedVehicle = selectedVehicle;
        const form = {
          selectedVehicle: this.selectedVehicle,
        };
        this.errors = await this.$validateActivityModal({
          form: form,
          fieldsToValidate: ["selectedVehicle"],
        });
        if (this.errors) {
          this.errors.forEach((item) => {
            this.errors.carrierReference = item.carrierReference;
          });
        }
        if (Object.keys(this.errors).length > 0) {
          this.$toast.open({
            message: "Please fix the errors before submitting.",
            type: "error",
          });
          return;
        }
        const formData = {
          operatorId: this.selectedOperator?._id,
          vehicleId: this.selectedVehicle?._id,
          carrierReference: this.carrierReference,
        };
        const res = await this.updateActivity({
          formData: formData,
          id: this.movementId,
        });
        this.$toast.open({
          message: res.msg,
        });
        this.isAssignVehicleModal = false;
        this.isAssignOperatorModal = false;
        this.$emit("activityUpdated");
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async getSingleTransitInfo() {
      try {
        await this.fetchSingleActivity({
          id: this.movementId,
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
};
</script>
