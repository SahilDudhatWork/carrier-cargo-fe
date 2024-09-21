<template>
  <div>
    <div>
      <div class="mt-5">
        <div class="relative">
          <img
            src="@/static/Images/edit-profile-truck-imag.webp"
            alt=""
            class="w-full h-[400px]"
          />
        </div>
        <div class="mx-16 relative">
          <img
            v-if="profileURL"
            :src="profileURL"
            alt=""
            class="rounded-full absolute w-[300px] -top-36 h-[300px] object-cover border-[17px] border-white"
          />
          <img
            v-else
            src="@/static/Images/edit-profile-circle-imag.webp"
            alt=""
            class="rounded-full absolute w-[300px] -top-36 h-[300px] object-cover border-[17px] border-white"
          />
          <label class="cursor-pointer">
            <p
              class="text-[#3683D5] font-normal text-sm absolute top-44 left-20 cursor-pointer"
            >
              Change profile picture
            </p>
            <input
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileChange"
            />
          </label>
        </div>
      </div>
      <div class="mt-56 mx-10">
        <form
          class="space-y-4 md:space-y-6 mt-6"
          @submit.prevent="upateUserProfile"
        >
          <div class="">
            <div class="grid grid-cols-3 gap-y-2">
              <div>
                <label
                  for="Company name"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >Company name *</label
                >
                <input
                  type="text"
                  name="CompanyName"
                  id="CompanyName"
                  class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                  placeholder="Your company name"
                  v-model="formData.companyName"
                  :class="
                    errors?.companyName
                      ? 'border border-red-600'
                      : 'border border-gray-300'
                  "
                />
                <span class="error-msg" v-if="errors?.companyName">{{
                  errors?.companyName
                }}</span>
              </div>
              <div>
                <label
                  for="ContactName"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >Contact name *</label
                >
                <input
                  type="text"
                  name="ContactName"
                  :class="
                    errors?.contactName
                      ? 'border border-red-600'
                      : 'border border-gray-300'
                  "
                  id="ContactName"
                  placeholder="Your contact name"
                  class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                  v-model="formData.contactName"
                />
                <span class="error-msg" v-if="errors?.contactName">{{
                  errors?.contactName
                }}</span>
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >Email Address *</label
                >
                <input
                  disabled
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email Address"
                  class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                  v-model="formData.email"
                  :class="
                    errors?.email
                      ? 'border border-red-600'
                      : 'border border-gray-300'
                  "
                />
                <span class="error-msg" v-if="errors?.email">{{
                  errors?.email
                }}</span>
              </div>
              <div>
                <label
                  for="ContactNo"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >Contact *</label
                >
                <label
                  class="xl:w-[382px] relative flex cursor-pointer flex-col"
                >
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
                      id="ContactNo"
                      placeholder="Your Contact No."
                      class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[15px] bg-white pl-24 focus:outline-none mb-3"
                      v-model="formData.contactNumber"
                      @input="validateContactInput"
                      :class="
                        errors?.contactNumber
                          ? 'border border-red-600'
                          : 'border border-gray-300'
                      "
                    />
                  </div>
                  <span class="error-msg" v-if="errors?.contactNumber">{{
                    errors?.contactNumber
                  }}</span>
                </label>
              </div>
              <div>
                <inputFile
                  item-label="SCAC"
                  :errors="errors?.scac"
                  :fileData="formData?.scac"
                  :file="
                    typeof formData?.scac == 'object'
                      ? formData?.scac?.name
                      : formData?.scac
                  "
                  @handleFileChange="uploadScac"
                />
                <span class="error-msg" v-if="errors?.scac">{{
                  errors?.scac
                }}</span>
              </div>
              <div>
                <inputFile
                  item-label="CAAT"
                  :errors="errors?.caat"
                  :fileData="formData?.caat"
                  :file="
                    typeof formData?.caat == 'object'
                      ? formData?.caat?.name
                      : formData?.caat
                  "
                  @handleFileChange="uploadCaat"
                />
                <span class="error-msg" v-if="errors?.caat">{{
                  errors?.caat
                }}</span>
              </div>
              <div>
                <inputFile
                  item-label="Insurance Policy"
                  :errors="errors?.insurancePolicy"
                  :fileData="formData?.insurancePolicy"
                  :file="
                    typeof formData?.insurancePolicy == 'object'
                      ? formData?.insurancePolicy?.name
                      : formData?.insurancePolicy
                  "
                  @handleFileChange="uploadInsurancePolicy"
                />
                <span class="error-msg" v-if="errors?.insurancePolicy">{{
                  errors?.insurancePolicy
                }}</span>
              </div>
              <div>
                <inputFile
                  item-label="OEA"
                  :fileData="formData?.oea"
                  :errors="errors?.oea"
                  :file="
                    typeof formData?.oea == 'object'
                      ? formData?.oea?.name
                      : formData?.oea
                  "
                  @handleFileChange="uploadOea"
                />
                <span class="error-msg" v-if="errors?.oea">{{
                  errors?.oea
                }}</span>
              </div>
              <div>
                <inputFile
                  item-label="CTPAT"
                  :fileData="formData?.ctpat"
                  :errors="errors?.ctpat"
                  :file="
                    typeof formData?.ctpat == 'object'
                      ? formData?.ctpat?.name
                      : formData?.ctpat
                  "
                  @handleFileChange="uploadCtpat"
                />
                <span class="error-msg" v-if="errors?.ctpat">{{
                  errors?.ctpat
                }}</span>
              </div>
              <div class="">
                <label
                  for="companyFormation"
                  class="block mb-2 text-sm font-normal text-[#1E1E1E]"
                  >Company Formation</label
                >
                <Dropdown
                  :items="countriesList"
                  :selectedLabel="selectedLabel"
                  @getValue="getValue"
                  :isDisabled="isDropdownDisabled"
                />
              </div>
              <div v-if="selectedLabel === 'USA'">
                <inputFile
                  item-label="W9 Form"
                  :errors="errors?.w9_Form"
                  :fileData="formData?.companyFormation?.usa?.w9_Form"
                  :file="
                    typeof formData?.companyFormation?.usa?.w9_Form == 'object'
                      ? formData?.companyFormation?.usa?.w9_Form?.name
                      : formData?.companyFormation?.usa?.w9_Form
                  "
                  @handleFileChange="uploadW9Form"
                />
                <span class="error-msg" v-if="errors?.w9_Form">{{
                  errors?.w9_Form
                }}</span>
              </div>
              <div v-if="selectedLabel === 'USA'">
                <inputFile
                  item-label="Utility Bill"
                  :errors="errors?.utility_Bill"
                  :fileData="formData?.companyFormation?.usa?.utility_Bill"
                  :file="
                    typeof formData?.companyFormation?.usa?.utility_Bill ==
                    'object'
                      ? formData?.companyFormation?.usa?.utility_Bill?.name
                      : formData?.companyFormation?.usa?.utility_Bill
                  "
                  @handleFileChange="uploadUtilityBill"
                />
                <span class="error-msg" v-if="errors?.utility_Bill">{{
                  errors?.utility_Bill
                }}</span>
              </div>
              <div v-if="selectedLabel === 'MEXICO'">
                <inputFile
                  item-label="COPIA RFC Form"
                  :errors="errors?.copia_Rfc_Form"
                  :fileData="formData?.companyFormation?.maxico?.copia_Rfc_Form"
                  :file="
                    typeof formData?.companyFormation?.maxico?.copia_Rfc_Form ==
                    'object'
                      ? formData?.companyFormation?.maxico?.copia_Rfc_Form?.name
                      : formData?.companyFormation?.maxico?.copia_Rfc_Form
                  "
                  @handleFileChange="uploadCopiaRfcForm"
                />
                <span class="error-msg" v-if="errors?.copia_Rfc_Form">{{
                  errors?.copia_Rfc_Form
                }}</span>
              </div>
              <div v-if="selectedLabel === 'MEXICO'">
                <inputFile
                  item-label="Constance of Fiscal Situation"
                  :errors="errors?.constance_Of_Fiscal_Situation"
                  :fileData="
                    formData?.companyFormation?.maxico
                      ?.constance_Of_Fiscal_Situation
                  "
                  :file="
                    typeof formData?.companyFormation?.maxico
                      ?.constance_Of_Fiscal_Situation == 'object'
                      ? formData?.companyFormation?.maxico
                          ?.constance_Of_Fiscal_Situation?.name
                      : formData?.companyFormation?.maxico
                          ?.constance_Of_Fiscal_Situation
                  "
                  @handleFileChange="uploadConstanceOfFiscalSituation"
                />
                <span
                  class="error-msg"
                  v-if="errors?.constance_Of_Fiscal_Situation"
                  >{{ errors?.constance_Of_Fiscal_Situation }}</span
                >
              </div>
              <div v-if="selectedLabel === 'MEXICO'">
                <inputFile
                  item-label="Proof of Favorable"
                  :errors="errors?.proof_of_Favorable"
                  :fileData="
                    formData?.companyFormation?.maxico?.proof_of_Favorable
                  "
                  :file="
                    typeof formData?.companyFormation?.maxico
                      ?.proof_of_Favorable == 'object'
                      ? formData?.companyFormation?.maxico?.proof_of_Favorable
                          ?.name
                      : formData?.companyFormation?.maxico?.proof_of_Favorable
                  "
                  @handleFileChange="uploadProofOfFavorable"
                />
                <span class="error-msg" v-if="errors?.proof_of_Favorable">{{
                  errors?.proof_of_Favorable
                }}</span>
              </div>
              <div v-if="selectedLabel === 'MEXICO'">
                <inputFile
                  item-label="Proof of Address"
                  :errors="errors?.proof_Of_Address"
                  :fileData="
                    formData?.companyFormation?.maxico?.proof_Of_Address
                  "
                  :file="
                    typeof formData?.companyFormation?.maxico
                      ?.proof_Of_Address == 'object'
                      ? formData?.companyFormation?.maxico?.proof_Of_Address
                          ?.name
                      : formData?.companyFormation?.maxico?.proof_Of_Address
                  "
                  @handleFileChange="uploadProofOfAddress"
                />
                <span class="error-msg" v-if="errors?.proof_Of_Address">{{
                  errors?.proof_Of_Address
                }}</span>
              </div>
            </div>

            <div
              v-if="selectedLabel != 'Select option'"
              class="grid grid-cols-3 mt-1"
            >
              <div
                v-for="(reference, key) in formData.commercialReference"
                :key="key"
                class="grid gap-y-2"
              >
                <div>
                  <h1 class="text-[#1E1E1E] font-medium text-base">
                    Commercial Reference {{ key + 1 }}
                  </h1>
                  <label
                    for="Company name"
                    class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                    >Company name</label
                  >
                  <input
                    type="text"
                    name="CompanyName"
                    id="CompanyName"
                    :class="
                      errors[`commercialReference[${key}].companyName`]
                        ? 'border border-red-600'
                        : 'border border-gray-300'
                    "
                    class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                    placeholder="Your company name"
                    v-model="reference.companyName"
                  />
                  <span
                    class="error-msg"
                    v-if="errors[`commercialReference[${key}].companyName`]"
                  >
                    {{ errors[`commercialReference[${key}].companyName`] }}
                  </span>
                </div>
                <div>
                  <label
                    for="ContactName"
                    class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                    >Contact name</label
                  >
                  <input
                    type="text"
                    name="ContactName"
                    id="ContactName"
                    placeholder="Your contact name"
                    class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                    :class="
                      errors[`commercialReference[${key}].contactName`]
                        ? 'border border-red-600'
                        : 'border border-gray-300'
                    "
                    v-model="reference.contactName"
                  />
                  <span
                    class="error-msg"
                    v-if="errors[`commercialReference[${key}].contactName`]"
                  >
                    {{ errors[`commercialReference[${key}].contactName`] }}
                  </span>
                </div>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                    >Email Address</label
                  >
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email Address"
                    class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                    v-model="reference.emailAddress"
                    :class="
                      errors[`commercialReference[${key}].emailAddress`]
                        ? 'border border-red-600'
                        : 'border border-gray-300'
                    "
                  />
                  <span
                    class="error-msg"
                    v-if="errors[`commercialReference[${key}].emailAddress`]"
                  >
                    {{ errors[`commercialReference[${key}].emailAddress`] }}
                  </span>
                </div>
                <div>
                  <label
                    for="ContactNo"
                    class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                    >Contact No.</label
                  >
                  <label
                    class="xl:w-[382px] relative flex cursor-pointer flex-col"
                  >
                    <div class="flex justify-between">
                      <CountryDropdown
                        :items="countries"
                        :selectedLabel="reference?.countryCode"
                        @getValue="
                          (value) => getReferenceCountry(value, reference)
                        "
                        class="absolute mb-3 mr-4"
                      />
                      <div
                        class="border-r border-gray-400 h-[40%] absolute left-20 top-4"
                      ></div>
                      <input
                        type="text"
                        name="ContactNo"
                        id="ContactNo"
                        placeholder="Your Contact No."
                        class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[15px] bg-white pl-24 focus:outline-none mb-3"
                        v-model="reference.contactNo"
                        :class="
                          errors[`commercialReference[${key}].contactNo`]
                            ? 'border border-red-600'
                            : 'border border-gray-300'
                        "
                        @input="validateReferrenceInput(reference)"
                      />
                    </div>
                    <span
                      class="error-msg"
                      v-if="errors[`commercialReference[${key}].contactNo`]"
                    >
                      {{ errors[`commercialReference[${key}].contactNo`] }}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-center mt-4">
            <button
              class="mb-5 w-[20%] text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[16px] px-5 py-[15px] text-center"
            >
              Update Profile
            </button>
          </div>
        </form>
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
      errors: {},
      maxFileSize: 2000000,
      profileURL: "",
      countriesList: [
        {
          label: "USA",
        },
        {
          label: "MEXICO",
        },
      ],
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
      selectedLabel: "Select option",
      formData: {
        companyName: "",
        contactName: "",
        countryCode: 1,
        contactNumber: "",
        profilePicture: "",
        email: "",
        password: "",
        scac: "",
        caat: "",
        insurancePolicy: "",
        oea: "",
        ctpat: "",
        companyFormationType: "",
        companyFormation: {
          usa: {
            w9_Form: "",
            utility_Bill: "",
          },
          maxico: {
            copia_Rfc_Form: "",
            constance_Of_Fiscal_Situation: "",
            proof_of_Favorable: "",
            proof_Of_Address: "",
          },
        },
        commercialReference: [
          {
            companyName: "",
            contactName: "",
            emailAddress: "",
            countryCode: 1,
            contactNo: "",
          },
          {
            companyName: "",
            contactName: "",
            emailAddress: "",
            countryCode: 1,
            contactNo: "",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      getUserProfile: "auth/getUserProfile",
    }),
    isDropdownDisabled() {
      return (
        this.getUserProfile?.companyFormationType !== "" &&
        this.getUserProfile?.companyFormationType != null
      );
    },
  },
  methods: {
    ...mapActions({
      profile: "auth/profile",
      updateProfile: "auth/updateProfile",
    }),
    getCountry(item) {
      this.formData.countryCode = item.value;
    },
    getReferenceCountry(item, ref) {
      ref.countryCode = item.value;
    },
    getValue(item) {
      this.selectedLabel = item.label;
      this.formData.companyFormationType = item.label;
    },
    checkFileSize(file) {
      if (file?.size > this.maxFileSize) {
        return false;
      }
      return true;
    },
    async handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        try {
          if (!this.checkFileSize(file)) {
            this.$toast.open({
              message: this.$i18n.t("fileSizeErrorMessage"),
              type: "error",
            });
            return;
          }
          this.profileURL = file ? URL.createObjectURL(file) : "";
          this.formData.profilePicture = file;
          await this.upateUserProfile();
        } catch (error) {
          console.log(error);
          this.$toast.open({
            message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
            type: "error",
          });
        }
      }
    },
    async validateContactInput(event) {
      this.formData.contactNumber = await this.$validateNumber(
        event.target.value
      );
    },
    async validateReferrenceInput(reference) {
      reference.contactNo = await this.$validateNumber(reference.contactNo);
    },
    async uploadW9Form(event) {
      try {
        const file = event.target.files[0];
        this.formData.companyFormation.usa.w9_Form = file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadUtilityBill(event) {
      try {
        const file = event.target.files[0];
        this.formData.companyFormation.usa.utility_Bill = file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadCopiaRfcForm(event) {
      try {
        const file = event.target.files[0];
        this.formData.companyFormation.maxico.copia_Rfc_Form = file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadConstanceOfFiscalSituation(event) {
      try {
        const file = event.target.files[0];
        this.formData.companyFormation.maxico.constance_Of_Fiscal_Situation =
          file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadProofOfFavorable(event) {
      try {
        const file = event.target.files[0];
        this.formData.companyFormation.maxico.proof_of_Favorable = file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadProofOfAddress(event) {
      try {
        const file = event.target.files[0];
        this.formData.companyFormation.maxico.proof_Of_Address = file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadScac(event) {
      try {
        const file = event.target.files[0];
        this.formData.scac = file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadCaat(event) {
      try {
        const file = event.target.files[0];
        this.formData.caat = file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadInsurancePolicy(event) {
      try {
        const file = event.target.files[0];
        this.formData.insurancePolicy = file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadOea(event) {
      try {
        const file = event.target.files[0];
        this.formData.oea = file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadCtpat(event) {
      try {
        const file = event.target.files[0];
        this.formData.ctpat = file;
      } catch (error) {
        console.log(error);
      }
    },
    async formatCommercialReference() {
      if (
        !this.getUserProfile.commercialReference ||
        this.getUserProfile.commercialReference.length === 0
      ) {
        this.formData.commercialReference = [
          {
            companyName: "",
            contactName: "",
            emailAddress: "",
            countryCode: 1,
            contactNo: "",
          },
          {
            companyName: "",
            contactName: "",
            emailAddress: "",
            countryCode: 1,
            contactNo: "",
          },
        ];
      } else if (this.getUserProfile.commercialReference.length === 1) {
        this.formData.commercialReference = [
          this.getUserProfile.commercialReference[0],
          {
            companyName: "",
            contactName: "",
            emailAddress: "",
            countryCode: 1,
            contactNo: "",
          },
        ];
      } else {
        this.formData.commercialReference =
          this.getUserProfile.commercialReference;
      }
    },
    async upateUserProfile() {
      try {
        this.errors = await this.$validateFormData({
          form: this.formData,
          isEdit: true,
        });
        if (Object.keys(this.errors).length > 0) {
          this.$toast.open({
            message: "Please fix the errors before submitting.",
            type: "error",
          });
          return;
        }
        const formData = new FormData();
        formData.append("companyName", this.formData.companyName);
        formData.append("contactName", this.formData.contactName);
        formData.append("contactNumber", this.formData.contactNumber);
        formData.append("countryCode", this.formData.countryCode);
        formData.append("email", this.formData.email.toLowerCase());
        formData.append("profilePicture", this.formData.profilePicture);
        if (
          this.formData.companyFormationType &&
          this.formData.companyFormationType != null
        ) {
          formData.append(
            "companyFormationType",
            this.formData.companyFormationType
          );
        }
        if (
          this.formData?.scac != null &&
          typeof this.formData?.scac == "object"
        ) {
          formData.append("scac", this.formData?.scac);
        }
        if (
          this.formData?.caat != null &&
          typeof this.formData?.caat == "object"
        ) {
          formData.append("caat", this.formData?.caat);
        }
        if (
          this.formData?.insurancePolicy != null &&
          typeof this.formData?.insurancePolicy == "object"
        ) {
          formData.append("insurancePolicy", this.formData?.insurancePolicy);
        }
        if (
          this.formData?.oea != null &&
          typeof this.formData?.oea == "object"
        ) {
          formData.append("oea", this.formData?.oea);
        }
        if (
          this.formData?.ctpat != null &&
          typeof this.formData?.ctpat == "object"
        ) {
          formData.append("ctpat", this.formData?.ctpat);
        }

        if (this.selectedLabel === "USA") {
          delete this.formData?.companyFormation?.maxico;

          if (
            this.formData?.companyFormation?.usa?.w9_Form != null &&
            typeof this.formData?.companyFormation?.usa?.w9_Form == "object"
          ) {
            formData.append(
              "companyFormation_usa_w9_Form",
              this.formData?.companyFormation?.usa?.w9_Form
            );
          }
          if (
            this.formData?.companyFormation?.usa?.utility_Bill != null &&
            typeof this.formData?.companyFormation?.usa?.utility_Bill ==
              "object"
          ) {
            formData.append(
              "companyFormation_usa_utility_Bill",
              this.formData?.companyFormation?.usa?.utility_Bill
            );
          }
        }
        if (this.selectedLabel === "MEXICO") {
          delete this.formData.companyFormation.usa;

          if (
            this.formData?.companyFormation?.maxico?.copia_Rfc_Form != null &&
            typeof this.formData?.companyFormation?.maxico?.copia_Rfc_Form ==
              "object"
          ) {
            formData.append(
              "companyFormation_maxico_copia_Rfc_Form",
              this.formData?.companyFormation?.maxico?.copia_Rfc_Form
            );
          }
          if (
            this.formData?.companyFormation?.maxico
              ?.constance_Of_Fiscal_Situation != null &&
            typeof this.formData?.companyFormation?.maxico
              ?.constance_Of_Fiscal_Situation == "object"
          ) {
            formData.append(
              "companyFormation_maxico_constance_Of_Fiscal_Situation",
              this.formData?.companyFormation?.maxico
                ?.constance_Of_Fiscal_Situation
            );
          }
          if (
            this.formData?.companyFormation?.maxico?.proof_of_Favorable !=
              null &&
            typeof this.formData?.companyFormation?.maxico
              ?.proof_of_Favorable == "object"
          ) {
            formData.append(
              "companyFormation_maxico_proof_of_Favorable",
              this.formData?.companyFormation?.maxico?.proof_of_Favorable
            );
          }
          if (
            this.formData?.companyFormation?.maxico?.proof_Of_Address != null &&
            typeof this.formData?.companyFormation?.maxico.proof_Of_Address ==
              "object"
          ) {
            formData.append(
              "companyFormation_maxico_proof_Of_Address",
              this.formData?.companyFormation?.maxico?.proof_Of_Address
            );
          }
        }
        this.formData.commercialReference.forEach((ref, index) => {
          let hasValidValue = Object.keys(ref).some(
            (key) =>
              key !== "countryCode" &&
              key !== "accountId" &&
              key !== "_id" &&
              ref[key] &&
              ref[key] !== ""
          );
          if (hasValidValue) {
            for (let key in ref) {
              let value = ref[key];

              if (key === "contactNo") {
                value = value ? `${value}` : "";
              }
              if (key === "countryCode") {
                value = `${value}`;
              }
              if (
                value &&
                value != "" &&
                value != null &&
                key != "accountId" &&
                key != "_id"
              ) {
                formData.append(`commercialReference[${index}][${key}]`, value);
              }
            }
          }
        });
        const response = await this.updateProfile(formData);
        this.$toast.open({
          message: response.msg,
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
      await this.profile();
      this.formData = await this.$lodash.cloneDeep(this.getUserProfile);
      this.profileURL = this.formData?.profilePicture || "";
      this.selectedLabel =
        this.formData.companyFormationType &&
        this.formData.companyFormationType != "" &&
        this.formData.companyFormationType != null
          ? this.formData.companyFormationType
          : "Select option";
      await this.formatCommercialReference();
    } catch (error) {
      console.log(error);
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
