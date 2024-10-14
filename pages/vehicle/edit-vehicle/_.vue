<template>
  <div>
    <div>
      <div class="flex items-center gap-3 mb-5">
        <h1 class="text-[#989898] font-normal text-[12px] cursor-pointer">
          <nuxt-link to="/Vehicle">VEHICLE</nuxt-link>
        </h1>
        <img src="@/static/svg/right-arrow.svg" alt="" />
        <p class="text-[#1E1E1E] font-normal text-[12px] cursor-pointer">
          EDIT VEHICLE
        </p>
      </div>
      <form class="space-y-4 md:space-y-6 mt-6" @submit.prevent="EditOperator">
        <div>
          <div class="grid grid-cols-3 gap-y-3">
            <div>
              <label
                for="VehicleName"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Vehicle Name *</label
              >
              <input
                type="text"
                name="VehicleName"
                id="VehicleName"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px] focus:outline-none"
                :class="
                  errors.vehicleName
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                placeholder="Name"
                v-model="formData.vehicleName"
              />
              <span class="error-msg" v-if="errors.vehicleName">{{
                errors.vehicleName
              }}</span>
            </div>
            <div>
              <label
                for="MX Plates"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >MX Plates *</label
              >
              <input
                type="text"
                name="MXPlates"
                id="MXPlates"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px] focus:outline-none"
                :class="
                  errors.mxPlates
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                placeholder="MX Plates"
                v-model="formData.mxPlates"
              />
              <span class="error-msg" v-if="errors.mxPlates">{{
                errors.mxPlates
              }}</span>
            </div>
            <div>
              <div class="relative group cursor-pointer">
                <label
                  for="MX Plates Expiration Date"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >MX Plates Expiration Date *</label
                >
                <div class="relative">
                  <img
                    src="@/static/svg/calendar.svg"
                    alt=""
                    class="absolute z-50 top-4 right-[11rem]"
                  />
                </div>
                <DatePicker
                  v-model="formData.mxPlatesExpirationDate"
                  placeholder="MX Plates Expiration Date"
                  :lang="lang"
                  :clearable="false"
                  :format="customFormat"
                />
              </div>
              <span class="error-msg" v-if="errors?.mxPlatesExpirationDate">{{
                errors?.mxPlatesExpirationDate
              }}</span>
            </div>

            <div>
              <label
                for="Company name"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >US Plates *</label
              >
              <input
                type="text"
                name="USPlates"
                id="USPlates"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px] focus:outline-none"
                :class="
                  errors.usPlates
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                placeholder="US Plates"
                v-model="formData.usPlates"
              />
              <span class="error-msg" v-if="errors.usPlates">{{
                errors.usPlates
              }}</span>
            </div>
            <div>
              <div class="relative group cursor-pointer">
                <label
                  for="Company name"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >US Plates Expiration Date *</label
                >
                <div class="relative">
                  <img
                    src="@/static/svg/calendar.svg"
                    alt=""
                    class="absolute z-50 top-4 right-[11rem]"
                  />
                </div>
                <DatePicker
                  v-model="formData.usPlatesExpirationDate"
                  placeholder="FAST ID Expiration Date"
                  :lang="lang"
                  :clearable="false"
                  :format="customFormat"
                />
              </div>
              <span class="error-msg" v-if="errors?.usPlatesExpirationDate">{{
                errors?.usPlatesExpirationDate
              }}</span>
            </div>

            <div>
              <label
                for="Company name"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >MX Insurance Policy *</label
              >
              <input
                type="text"
                name="MXInsurancePolicy"
                id="MXInsurancePolicy"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px] focus:outline-none"
                :class="
                  errors.mxInsurancePlates
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                placeholder="MX Insurance Policy"
                v-model="formData.mxInsurancePlates"
              />
              <span class="error-msg" v-if="errors.mxInsurancePlates">{{
                errors.mxInsurancePlates
              }}</span>
            </div>
            <div>
              <div class="relative group cursor-pointer">
                <label
                  for="MX Insurance Policy Expiration Date"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >MX Insurance Policy Expiration Date *</label
                >
                <div class="relative">
                  <img
                    src="@/static/svg/calendar.svg"
                    alt=""
                    class="absolute z-50 top-4 right-[11rem]"
                  />
                </div>
                <DatePicker
                  v-model="formData.mxInsurancePlatesExpirationDate"
                  placeholder="MX Insurance Policy Expiration Date"
                  :lang="lang"
                  :clearable="false"
                  :format="customFormat"
                />
              </div>
              <span
                class="error-msg"
                v-if="errors?.mxInsurancePlatesExpirationDate"
                >{{ errors?.mxInsurancePlatesExpirationDate }}</span
              >
            </div>
            <div>
              <label
                for="Company name"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >US Insurance Policy *</label
              >
              <input
                type="text"
                name="USInsurancePolicy"
                id="USInsurancePolicy"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px] focus:outline-none"
                :class="
                  errors.usInsurancePlates
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                placeholder="US Insurance Policy"
                v-model="formData.usInsurancePlates"
              />
              <span class="error-msg" v-if="errors.usInsurancePlates">{{
                errors.usInsurancePlates
              }}</span>
            </div>
            <div>
              <div class="relative group cursor-pointer">
                <label
                  for="US Insurance Policy Expiration Date"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >US Insurance Policy Expiration Date *</label
                >
                <div class="relative">
                  <img
                    src="@/static/svg/calendar.svg"
                    alt=""
                    class="absolute z-50 top-4 right-[11rem]"
                  />
                </div>
                <DatePicker
                  v-model="formData.usInsurancePlatesExpirationDate"
                  placeholder="US Insurance Policy Expiration Date"
                  :lang="lang"
                  :clearable="false"
                  :format="customFormat"
                />
              </div>
              <span
                class="error-msg"
                v-if="errors?.usInsurancePlatesExpirationDate"
                >{{ errors?.usInsurancePlatesExpirationDate }}</span
              >
            </div>
          </div>
          <div class="mt-3">
            <h1 class="font-normal text-[#1E1E1E] text-sm">Types Of Service</h1>
            <div class="grid grid-cols-3 gap-y-1 mt-3 gap-4">
              <Transportation
                v-for="(item, index) of locations?.typeOfService"
                :key="`service-${index}`"
                :item="item"
                :isSelected="selectTypeOfService(item._id)"
                @select="selectTypeOfServiceItem(item._id)"
              />
            </div>
            <div v-if="selectedTypeOfServiceLength > 0">
              <h1 class="font-normal text-[#1E1E1E] text-sm">
                Type of Transportation
              </h1>
              <div class="grid grid-cols-3 gap-y-1 mt-3 gap-4">
                <Transportation
                  v-for="(item, index) of locations?.typeOfTransportation"
                  :key="`transportation-${index}`"
                  :item="item"
                  :isSelected="selectTypeOfTransportation(item._id)"
                  @select="selectTypeOfTransportationItem(item._id)"
                />
              </div>
            </div>
            <h1
              class="font-normal text-[#1E1E1E] text-sm"
              v-if="
                selectedTypeOfTransportation.includes('FTL') ||
                selectedTypeOfTransportation.includes('LTL')
              "
            >
              Mode of Transportation
            </h1>
            <div class="grid grid-cols-3 gap-y-1 mt-3 gap-4">
              <Transportation
                v-for="(item, index) in locations?.modeOfTransportation?.FTL"
                :key="`mode-FTL-${index}`"
                :item="item"
                :isSelected="selectModeOfTransportation(item._id)"
                @select="selectModeOfTransportationItem(item._id)"
                v-if="selectedTypeOfTransportation.includes('FTL')"
              />
              <Transportation
                v-for="(item, index) in locations?.modeOfTransportation?.LTL"
                :key="`mode-LTL-${index}`"
                :item="item"
                :isSelected="selectModeOfTransportation(item._id)"
                @select="selectModeOfTransportationItem(item._id)"
                v-if="selectedTypeOfTransportation.includes('LTL')"
              />
            </div>
          </div>
          <div class="flex justify-center">
            <button
              class="text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[16px] px-8 py-[15px] text-center mt-8 mr-40"
            >
              Update Vehicle
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  layout: "dashboard",
  data() {
    return {
      isPassword: false,
      errors: {},
      locations: {},
      customFormat: "YYYY-MM-DD",
      lang: {
        days: ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"],
        months: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      countries: [
        {
          key: 1,
          value: 1,
        },
        {
          key: 52,
          value: 52,
        },
      ],
      countriesList: [
        {
          label: "USA",
        },
        {
          label: "MEXICO",
        },
      ],
      selectedTypeOfServiceItem: [],
      selectedTypeOfTransportationItem: [],
      selectedModeOfTransportationItem: [],
      errorMessage: "",
      formData: {
        vehicleName: "",
        countryCode: 1,
        mxPlates: "",
        mxPlatesExpirationDate: "",
        usPlates: "",
        usPlatesExpirationDate: "",
        mxInsurancePlates: "",
        mxInsurancePlatesExpirationDate: "",
        usInsurancePlates: "",
        usInsurancePlatesExpirationDate: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      getSingleVehicleData: "vehicle/getSingleVehicleData",
    }),
    selectedTypeOfServiceLength() {
      return this.selectedTypeOfServiceItem.filter((id) =>
        this.locations?.typeOfService.some((service) => service._id === id)
      ).length;
    },
    selectedTypeOfTransportation() {
      if (!this.locations || !this.locations?.typeOfTransportation) {
        return [];
      }

      return this.locations.typeOfTransportation
        .filter((item) =>
          this.selectedTypeOfTransportationItem.includes(item._id)
        )
        .map((item) => item.title);
    },
  },
  methods: {
    ...mapActions({
      fetchSingleVehicle: "vehicle/fetchSingleVehicle",
      updateVehicle: "vehicle/updateVehicle",
      fetchCarrierTransitInfo: "vehicle/fetchCarrierTransitInfo",
    }),
    async validateContactInput(event) {
      this.formData.contactNumber = await this.$validateNumber(
        event.target.value
      );
    },
    getCountry(item) {
      this.formData.countryCode = item.value;
    },
    async CarrierTransiInfo() {
      try {
        const res = await this.fetchCarrierTransitInfo();
        this.locations = res.data;
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },

    async EditOperator() {
      try {
        this.errors = await this.$validateVehicleField({ form: this.formData });
        if (Object.keys(this.errors).length > 0) {
          this.$toast.open({
            message: "Please fix the errors before submitting.",
            type: "error",
          });
          return;
        }
        if (
          this.selectedTypeOfServiceItem &&
          this.selectedTypeOfServiceItem.length > 0
        ) {
          this.formData.typeOfService = this.selectedTypeOfServiceItem;
        }
        if (
          this.selectedTypeOfTransportationItem &&
          this.selectedTypeOfTransportationItem.length > 0
        ) {
          this.formData.typeOfTransportation =
            this.selectedTypeOfTransportationItem;
        }
        if (
          this.selectedModeOfTransportationItem &&
          this.selectedModeOfTransportationItem.length > 0
        ) {
          this.formData.modeOfTransportation =
            this.selectedModeOfTransportationItem;
        }

        const response = await this.updateVehicle(this.formData);
        this.$toast.open({
          message: response.msg,
        });
        this.$router.push("/vehicle");
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    selectTypeOfService(serviceId) {
      return this.selectedTypeOfServiceItem.includes(serviceId);
    },

    selectTypeOfTransportation(id) {
      return this.selectedTypeOfTransportationItem?.includes(id);
    },
    selectModeOfTransportation(id) {
      return this.selectedModeOfTransportationItem?.includes(id);
    },
    selectTypeOfServiceItem(serviceId) {
      if (this.selectedTypeOfServiceItem.includes(serviceId)) {
        this.selectedTypeOfServiceItem = this.selectedTypeOfServiceItem.filter(
          (id) => id !== serviceId
        );
      } else {
        this.selectedTypeOfServiceItem.push(serviceId);
      }
    },
    selectTypeOfTransportationItem(id) {
      if (this.selectedTypeOfTransportationItem.includes(id)) {
        this.selectedTypeOfTransportationItem =
          this.selectedTypeOfTransportationItem.filter(
            (selectedId) => selectedId !== id
          );
      } else {
        this.selectedTypeOfTransportationItem.push(id);
      }
    },
    selectModeOfTransportationItem(id) {
      if (this.selectedModeOfTransportationItem.includes(id)) {
        this.selectedModeOfTransportationItem =
          this.selectedModeOfTransportationItem.filter(
            (selectedId) => selectedId !== id
          );
      } else {
        this.selectedModeOfTransportationItem.push(id);
      }
    },
  },
  async asyncData({ params, store, redirect }) {
    const id = params.pathMatch;
    try {
      await store.dispatch("vehicle/fetchSingleVehicle", { accountId: id });
    } catch (error) {
      return redirect("/vehicle");
    }
  },
  async beforeMount() {
    await this.CarrierTransiInfo();
    if (this.getSingleVehicleData) {
      this.formData = this.$lodash.cloneDeep(this.getSingleVehicleData);
      this.selectedTypeOfServiceItem = [
        ...this.getSingleVehicleData.typeOfService,
      ];
      this.selectedTypeOfTransportationItem = [
        ...this.getSingleVehicleData.typeOfTransportation,
      ];

      this.selectedModeOfTransportationItem = [
        ...this.getSingleVehicleData.modeOfTransportation,
        ...this.getSingleVehicleData.modeOfTransportation,
      ];
      this.formData.usPlatesExpirationDate = new Date(
        this.getSingleVehicleData.usPlatesExpirationDate
      );
      this.formData.mxInsurancePlatesExpirationDate = new Date(
        this.getSingleVehicleData.mxInsurancePlatesExpirationDate
      );
      this.formData.mxPlatesExpirationDate = new Date(
        this.getSingleVehicleData.mxPlatesExpirationDate
      );
      this.formData.usInsurancePlatesExpirationDate = new Date(
        this.getSingleVehicleData.usInsurancePlatesExpirationDate
      );
    }
  },
};
</script>

<style scoped>
.error-msg {
  font-size: 14px;
  font-weight: 400;
  color: red;
}
</style>
