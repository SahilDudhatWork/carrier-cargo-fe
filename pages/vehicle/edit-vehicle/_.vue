<template>
  <div>
    <div>
      <div class="flex items-center gap-3 mb-5">
        <h1 class="text-[#989898] font-normal text-[12px] cursor-pointer">
          <nuxt-link to="/vehicle">VEHICLE</nuxt-link>
        </h1>
        <img src="@/static/svg/right-arrow.svg" alt="" />
        <p class="text-[#1E1E1E] font-normal text-[12px] cursor-pointer">
          EDIT VEHICLE
        </p>
      </div>
      <form class="space-y-4 md:space-y-6 mt-6" @submit.prevent="EditVehicle">
        <div>
          <div
            class="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-3 gap-3"
          >
            <div>
              <label
                for="Vehicle Name"
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
                placeholder="Vehicle Name"
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
                <VueDatePick
                  v-model="formData.mxPlatesExpirationDate"
                  class="xl:w-[382px] block w-full rounded-lg focus:outline-none text-base px-3"
                  :class="
                    errors.mxPlatesExpirationDate
                      ? 'border border-red-600'
                      : 'border border-gray-300'
                  "
                />
              </div>
              <span class="error-msg" v-if="errors?.mxPlatesExpirationDate">{{
                errors?.mxPlatesExpirationDate
              }}</span>
            </div>

            <div>
              <label
                for="US Plates"
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
                <VueDatePick
                  v-model="formData.usPlatesExpirationDate"
                  class="xl:w-[382px] block w-full rounded-lg focus:outline-none px-3"
                  :class="
                    errors.usPlatesExpirationDate
                      ? 'border border-red-600'
                      : 'border border-gray-300'
                  "
                />
              </div>
              <span class="error-msg" v-if="errors?.usPlatesExpirationDate">{{
                errors?.usPlatesExpirationDate
              }}</span>
            </div>

            <div>
              <label
                for="MX Insurance Policy"
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
                <VueDatePick
                  v-model="formData.mxInsurancePlatesExpirationDate"
                  class="xl:w-[382px] block w-full px-3 rounded-lg focus:outline-none"
                  :class="
                    errors.mxInsurancePlatesExpirationDate
                      ? 'border border-red-600'
                      : 'border border-gray-300'
                  "
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
                for="US Insurance Policy"
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
                <VueDatePick
                  v-model="formData.usInsurancePlatesExpirationDate"
                  class="xl:w-[382px] block w-full px-3 rounded-lg focus:outline-none"
                  :class="
                    errors.usInsurancePlatesExpirationDate
                      ? 'border border-red-600'
                      : 'border border-gray-300'
                  "
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
            <div
              class="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-3 gap-3 mt-3"
            >
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
              <div
                class="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-3 gap-3 mt-3"
              >
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
            <div
              class="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-3 gap-3 mt-3"
            >
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
              class="text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[16px] px-8 py-[15px] text-center mt-8 sm:mr-40"
            >
              Update Vehicle
            </button>
          </div>
        </div>
      </form>
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
      isPassword: false,
      isLoading: false,
      errors: {},
      locations: {},
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
        mxPlatesExpirationDate: new Date().toISOString().slice(0, 10),
        usPlates: "",
        usPlatesExpirationDate: new Date().toISOString().slice(0, 10),
        mxInsurancePlates: "",
        mxInsurancePlatesExpirationDate: new Date().toISOString().slice(0, 10),
        usInsurancePlates: "",
        usInsurancePlatesExpirationDate: new Date().toISOString().slice(0, 10),
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
      this.isLoading = true;
      try {
        const res = await this.fetchCarrierTransitInfo();
        this.locations = res.data;
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

    async EditVehicle() {
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
        this.isLoading = true;
        const response = await this.updateVehicle(this.formData);
        this.$toast.open({
          message: response.msg,
        });
        this.isLoading = false;
        this.$router.push("/vehicle");
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
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    async getSingleVehicle() {
      this.isLoading = true;
      try {
        await this.fetchSingleVehicle({
          accountId: this.accountId,
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
  },
  async mounted() {
    await this.getSingleVehicle();
    await this.CarrierTransiInfo();
    this.formData = await { ...this.getSingleVehicleData };
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

    if (this.formData.mxPlatesExpirationDate) {
      this.formData.mxPlatesExpirationDate = this.formatDate(
        this.formData.mxPlatesExpirationDate
      );
    }
    if (this.formData.usPlatesExpirationDate) {
      this.formData.usPlatesExpirationDate = this.formatDate(
        this.formData.usPlatesExpirationDate
      );
    }
    if (this.formData.mxInsurancePlatesExpirationDate) {
      this.formData.mxInsurancePlatesExpirationDate = this.formatDate(
        this.formData.mxInsurancePlatesExpirationDate
      );
    }
    if (this.formData.usInsurancePlatesExpirationDate) {
      this.formData.usInsurancePlatesExpirationDate = this.formatDate(
        this.formData.usInsurancePlatesExpirationDate
      );
    }
  },
  async asyncData({ params }) {
    return {
      accountId: params.pathMatch,
    };
  },
};
</script>

<style scoped>
::v-deep .vdpComponent input {
  font-size: 16px;
  height: 52px !important;
  padding-right: 0px !important;
}
::v-deep .vdpInnerWrap {
  width: auto !important;
  max-width: fit-content;
}
::v-deep .vdpOuterWrap {
  position: absolute;
  z-index: 999 !important;
}
::v-deep .vdpComponent input:focus-visible {
  border: none !important;
  outline: none !important;
  inset: 0 !important;
}
@media (max-width: 320px) {
  ::v-deep .vdpComponent input {
    width: 270px;
  }
}

@media (min-width: 321px) and (max-width: 375px) {
  ::v-deep .vdpComponent input {
    width: 270px;
  }
}

@media (min-width: 376px) and (max-width: 425px) {
  ::v-deep .vdpComponent input {
    width: 100%;
  }
}

@media (min-width: 426px) and (max-width: 768px) {
  ::v-deep .vdpComponent input {
    width: 100%;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  ::v-deep .vdpComponent input {
    width: 100%;
  }
}

@media (min-width: 1025px) and (max-width: 1440px) {
  ::v-deep .vdpComponent input {
    width: 100%;
  }
}

@media (min-width: 1441px) {
  ::v-deep .vdpComponent input {
    width: 360px;
  }
}
</style>
