<template>
  <div>
    <div>
      <div class="flex items-center gap-3 mb-5">
        <h1 class="text-[#989898] font-normal text-[12px] cursor-pointer">
          <nuxt-link to="/operator">OPERATOR</nuxt-link>
        </h1>
        <img src="@/static/svg/right-arrow.svg" alt="" />
        <p class="text-[#1E1E1E] font-normal text-[12px] cursor-pointer">
          ADD OPERATOR
        </p>
      </div>
      <form class="space-y-4 md:space-y-6 mt-6" @submit.prevent="addOperator">
        <div>
          <div
            class="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-3 gap-3"
          >
            <div>
              <label
                for="Operator Name"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Operator Name *</label
              >
              <input
                type="text"
                name="OperatorName"
                id="OperatorName"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px] focus:outline-none"
                :class="
                  errors.operatorName
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                placeholder="Operator Name"
                v-model="formData.operatorName"
              />
              <span class="error-msg" v-if="errors.operatorName">{{
                errors.operatorName
              }}</span>
            </div>
            <div>
              <label
                for="Operator Mobile No"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Operator Mobile No. *</label
              >
              <label class="xl:w-[382px] relative flex cursor-pointer flex-col">
                <div class="flex justify-between">
                  <CountryDropdown
                    :items="countries"
                    :selectedLabel="formData?.countryCode"
                    @getValue="getCountry"
                    class="absolute mb-3 mr-4"
                  />
                  <div
                    class="border-r border-gray-400 h-[40%] absolute left-20 top-4"
                  ></div>
                  <input
                    type="text"
                    name="ContactNo"
                    :class="
                      errors.operatorNumber
                        ? 'border border-red-600'
                        : 'border border-gray-300'
                    "
                    id="ContactNo"
                    placeholder="Operator Mobile No."
                    class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[15px] bg-white pl-24 focus:outline-none mb-1"
                    v-model="formData.operatorNumber"
                    @input="validateContactInput"
                  />
                </div>
                <span class="error-msg" v-if="errors.operatorNumber">{{
                  errors.operatorNumber
                }}</span>
              </label>
            </div>
            <div>
              <label
                for="MX ID Badge"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >MX ID Badge *</label
              >
              <input
                type="text"
                name="MXIDBadge"
                id="MXIDBadge"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px] focus:outline-none"
                :class="
                  errors.mxIdBadge
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                placeholder="MX ID Badge Number"
                v-model="formData.mxIdBadge"
              />
              <span class="error-msg" v-if="errors.mxIdBadge">{{
                errors.mxIdBadge
              }}</span>
            </div>
            <div>
              <div class="relative group cursor-pointer">
                <label
                  for="License Expiration Date"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >License Expiration Date *</label
                >
                <VueDatePick
                  v-model="formData.mxIdBadgeExpirationDate"
                  class="xl:w-[382px] block w-full rounded-lg focus:outline-none text-base px-3"
                  :class="
                    errors.mxIdBadgeExpirationDate
                      ? 'border border-red-600'
                      : 'border border-gray-300'
                  "
                />
              </div>
              <span class="error-msg" v-if="errors?.mxIdBadgeExpirationDate">{{
                errors?.mxIdBadgeExpirationDate
              }}</span>
            </div>

            <div>
              <label
                for="FAST ID"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >FAST ID *</label
              >
              <input
                type="text"
                name="FAST ID"
                id="FAST ID"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px] focus:outline-none"
                :class="
                  errors.fastId
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                placeholder="FAST ID Number"
                v-model="formData.fastId"
              />
              <span class="error-msg" v-if="errors.fastId">{{
                errors.fastId
              }}</span>
            </div>
            <div>
              <div class="relative group cursor-pointer">
                <label
                  for="FAST ID Expiration Date"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >FAST ID Expiration Date *</label
                >
                <VueDatePick
                  v-model="formData.fastIdExpirationDate"
                  class="xl:w-[382px] block w-full rounded-lg focus:outline-none text-base px-3"
                  :class="
                    errors.fastIdExpirationDate
                      ? 'border border-red-600'
                      : 'border border-gray-300'
                  "
                />
              </div>
              <span class="error-msg" v-if="errors?.fastIdExpirationDate">{{
                errors?.fastIdExpirationDate
              }}</span>
            </div>

            <div>
              <label
                for="MX Driver's License"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >MX Driver's License *</label
              >
              <input
                type="text"
                name="MXDriver"
                id="MXDriver"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px] focus:outline-none"
                :class="
                  errors.mxDriversLicense
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                placeholder="MX Driver's License Number"
                v-model="formData.mxDriversLicense"
              />
              <span class="error-msg" v-if="errors.mxDriversLicense">{{
                errors.mxDriversLicense
              }}</span>
            </div>
            <div>
              <div class="relative group cursor-pointer">
                <label
                  for="MX Driver's License Expiration Date"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >MX Driver's License Expiration Date *</label
                >
                <VueDatePick
                  v-model="formData.mxDriversLicenseExpirationDate"
                  class="xl:w-[382px] block w-full rounded-lg focus:outline-none text-base px-3"
                  :class="
                    errors.mxDriversLicenseExpirationDate
                      ? 'border border-red-600'
                      : 'border border-gray-300'
                  "
                />
              </div>
              <span
                class="error-msg"
                v-if="errors?.mxDriversLicenseExpirationDate"
                >{{ errors?.mxDriversLicenseExpirationDate }}</span
              >
            </div>
            <div>
              <label
                for="US Driver's License"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >US Driver's License *</label
              >
              <input
                type="text"
                name="US Driver's License"
                id="US Driver's License"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px] focus:outline-none"
                :class="
                  errors.usDriversLicense
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                placeholder="US Driver's License Number"
                v-model="formData.usDriversLicense"
              />
              <span class="error-msg" v-if="errors.usDriversLicense">{{
                errors.usDriversLicense
              }}</span>
            </div>
            <div>
              <div class="relative group cursor-pointer">
                <label
                  for="US Driver's License Expiration Date"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >US Driver's License Expiration Date *</label
                >
                <VueDatePick
                  v-model="formData.usDriversLicenseExpirationDate"
                  class="xl:w-[382px] block w-full rounded-lg focus:outline-none text-base px-3"
                  :class="
                    errors.usDriversLicenseExpirationDate
                      ? 'border border-red-600'
                      : 'border border-gray-300'
                  "
                />
              </div>
              <span
                class="error-msg"
                v-if="errors?.usDriversLicenseExpirationDate"
                >{{ errors?.usDriversLicenseExpirationDate }}</span
              >
            </div>
            <div>
              <div class="relative group cursor-pointer">
                <label
                  for="Visa Expiration Date"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >Visa Expiration Date *</label
                >
                <VueDatePick
                  v-model="formData.visaExpirationDate"
                  class="xl:w-[382px] block w-full rounded-lg focus:outline-none text-base px-3"
                  :class="
                    errors.visaExpirationDate
                      ? 'border border-red-600'
                      : 'border border-gray-300'
                  "
                />
              </div>
              <span class="error-msg" v-if="errors?.visaExpirationDate">{{
                errors?.visaExpirationDate
              }}</span>
            </div>
            <div>
              <div class="relative group cursor-pointer">
                <label
                  for="Customs Badge Expiration Date"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >Customs Badge Expiration Date *</label
                >
                <VueDatePick
                  v-model="formData.customsBadgeExpirationDate"
                  class="xl:w-[382px] block w-full rounded-lg focus:outline-none text-base px-3"
                  :class="
                    errors.customsBadgeExpirationDate
                      ? 'border border-red-600'
                      : 'border border-gray-300'
                  "
                />
              </div>
              <span
                class="error-msg"
                v-if="errors?.customsBadgeExpirationDate"
                >{{ errors?.customsBadgeExpirationDate }}</span
              >
            </div>
          </div>
          <div class="flex justify-center">
            <button
              class="text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[16px] px-8 py-[15px] text-center mt-8 sm:mr-40"
            >
              Add Operator
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
      formData: {
        operatorName: "",
        operatorNumber: "",
        countryCode: 1,
        mxIdBadge: "",
        mxIdBadgeExpirationDate: new Date().toISOString().slice(0, 10),
        fastId: "",
        fastIdExpirationDate: new Date().toISOString().slice(0, 10),
        mxDriversLicense: "",
        mxDriversLicenseExpirationDate: new Date().toISOString().slice(0, 10),
        usDriversLicense: "",
        usDriversLicenseExpirationDate: new Date().toISOString().slice(0, 10),
        visaExpirationDate: new Date().toISOString().slice(0, 10),
        customsBadgeExpirationDate: new Date().toISOString().slice(0, 10),
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      createOperator: "operator/createOperator",
    }),
    async validateContactInput(event) {
      this.formData.operatorNumber = await this.$validateNumber(
        event.target.value
      );
    },
    getCountry(item) {
      this.formData.countryCode = item.value;
    },
    async addOperator() {
      try {
        this.errors = await this.$validateOperatorField({
          form: this.formData,
        });
        if (Object.keys(this.errors).length > 0) {
          this.$toast.open({
            message: "Please fix the errors before submitting.",
            type: "error",
          });
          return;
        }
        this.formData.fastIdExpirationDate = this.$moment(
          this.formData.fastIdExpirationDate
        ).format("YYYY-MM-DD");
        this.formData.mxDriversLicenseExpirationDate = this.$moment(
          this.formData.mxDriversLicenseExpirationDate
        ).format("YYYY-MM-DD");
        this.formData.mxIdBadgeExpirationDate = this.$moment(
          this.formData.mxIdBadgeExpirationDate
        ).format("YYYY-MM-DD");
        this.formData.usDriversLicenseExpirationDate = this.$moment(
          this.formData.usDriversLicenseExpirationDate
        ).format("YYYY-MM-DD");
        this.formData.visaExpirationDate = this.$moment(
          this.formData.visaExpirationDate
        ).format("YYYY-MM-DD");
        this.formData.customsBadgeExpirationDate = this.$moment(
          this.formData.customsBadgeExpirationDate
        ).format("YYYY-MM-DD");
        this.isLoading = true;
        const response = await this.createOperator(this.formData);
        this.$toast.open({
          message: response.msg,
        });
        this.$router.push("/operator");
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

  async mounted() {},
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
