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
        <div class="w-[65%]">
          <div class="grid grid-cols-2 gap-y-3">
            <div>
              <label
                for="Company name"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Operator Name *</label
              >
              <input
                type="text"
                name="CompanyName"
                id="CompanyName"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px] focus:outline-none"
                :class="
                  errors.operatorName
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                placeholder="Name"
                v-model="formData.operatorName"
              />
              <span class="error-msg" v-if="errors.operatorName">{{
                errors.operatorName
              }}</span>
            </div>
            <div>
              <label
                for="ContactNo"
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
                    placeholder="Operator No."
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
                for="Company name"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >MX ID Badge *</label
              >
              <input
                type="text"
                name="CompanyName"
                id="CompanyName"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px] focus:outline-none"
                :class="
                  errors.mxIdBadge
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                placeholder="MX ID Badge"
                v-model="formData.mxIdBadge"
              />
              <span class="error-msg" v-if="errors.mxIdBadge">{{
                errors.mxIdBadge
              }}</span>
            </div>
            <div>
              <div class="relative group cursor-pointer">
                <label
                  for="Company name"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >MX Plates Expiration Date *</label
                >
                <div class="relative">
                  <img
                    src="@/static/svg/calendar.svg"
                    alt=""
                    class="absolute z-50 top-4 right-[10.5rem]"
                  />
                </div>
                <DatePicker
                  v-model="formData.mxIdBadgeExpirationDate"
                  placeholder="MX Plates Expiration Date"
                  :lang="lang"
                  :format="customFormat"
                  :clearable="false"
                />
              </div>
              <span class="error-msg" v-if="errors?.mxIdBadgeExpirationDate">{{
                errors?.mxIdBadgeExpirationDate
              }}</span>
            </div>

            <div>
              <label
                for="Company name"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >FAST ID *</label
              >
              <input
                type="text"
                name="CompanyName"
                id="CompanyName"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px] focus:outline-none"
                :class="
                  errors.fastId
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                placeholder="FAST ID"
                v-model="formData.fastId"
              />
              <span class="error-msg" v-if="errors.fastId">{{
                errors.fastId
              }}</span>
            </div>
            <div>
              <div class="relative group cursor-pointer">
                <label
                  for="Company name"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >FAST ID Expiration Date *</label
                >
                <div class="relative">
                  <img
                    src="@/static/svg/calendar.svg"
                    alt=""
                    class="absolute z-50 top-4 right-[10.5rem]"
                  />
                </div>
                <DatePicker
                  v-model="formData.fastIdExpirationDate"
                  placeholder="FAST ID Expiration Date"
                  :lang="lang"
                  :clearable="false"
                  :format="customFormat"
                />
              </div>
              <span class="error-msg" v-if="errors?.fastIdExpirationDate">{{
                errors?.fastIdExpirationDate
              }}</span>
            </div>

            <div>
              <label
                for="Company name"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >MX Driver's License *</label
              >
              <input
                type="text"
                name="CompanyName"
                id="CompanyName"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px] focus:outline-none"
                :class="
                  errors.mxDriversLicense
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                placeholder="MX Driver's License"
                v-model="formData.mxDriversLicense"
              />
              <span class="error-msg" v-if="errors.mxDriversLicense">{{
                errors.mxDriversLicense
              }}</span>
            </div>
            <div>
              <div class="relative group cursor-pointer">
                <label
                  for="Company name"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >MX Driver's License Expiration Date *</label
                >
                <div class="relative">
                  <img
                    src="@/static/svg/calendar.svg"
                    alt=""
                    class="absolute z-50 top-4 right-[10.5rem]"
                  />
                </div>
                <DatePicker
                  v-model="formData.mxDriversLicenseExpirationDate"
                  placeholder="MX Driver's License Expiration Date"
                  :lang="lang"
                  :clearable="false"
                  :format="customFormat"
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
                for="Company name"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >US Driver's License *</label
              >
              <input
                type="text"
                name="CompanyName"
                id="CompanyName"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px] focus:outline-none"
                :class="
                  errors.usDriversLicense
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                placeholder="US Driver's License"
                v-model="formData.usDriversLicense"
              />
              <span class="error-msg" v-if="errors.usDriversLicense">{{
                errors.usDriversLicense
              }}</span>
            </div>
            <div>
              <div class="relative group cursor-pointer">
                <label
                  for="Company name"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >US Driver's License Expiration Date *</label
                >
                <div class="relative">
                  <img
                    src="@/static/svg/calendar.svg"
                    alt=""
                    class="absolute z-50 top-4 right-[10.5rem]"
                  />
                </div>
                <DatePicker
                  v-model="formData.usDriversLicenseExpirationDate"
                  placeholder="US Driver's License Expiration Date"
                  :lang="lang"
                  :clearable="false"
                  :format="customFormat"
                />
              </div>
              <span
                class="error-msg"
                v-if="errors?.usDriversLicenseExpirationDate"
                >{{ errors?.usDriversLicenseExpirationDate }}</span
              >
            </div>
          </div>
          <div class="flex justify-center">
            <button
              class="text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[16px] px-8 py-[15px] text-center mt-8 mr-40"
            >
              Add Operator
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
      customFormat: "DD-MM-YYYY",
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
      formData: {
        operatorName: "",
        operatorNumber: "",
        countryCode: 1,
        mxIdBadge: "",
        mxIdBadgeExpirationDate: "",
        fastId: "",
        fastIdExpirationDate: "",
        mxDriversLicense: "",
        mxDriversLicenseExpirationDate: "",
        usDriversLicense: "",
        usDriversLicenseExpirationDate: "",
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
        const response = await this.createOperator(this.formData);
        this.$toast.open({
          message: response.msg,
        });
        this.$router.push("/operator");
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
  },

  async mounted() {},
};
</script>

<style scoped>
.error-msg {
  font-size: 14px;
  font-weight: 400;
  color: red;
}
</style>
