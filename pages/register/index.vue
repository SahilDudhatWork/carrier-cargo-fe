<template>
  <div>
    <div>
      <Content>
        <template #modalContent>
          <div class="mt-5 sm:w-[400px]">
            <h1 class="font-bold text-[2rem] text-[#3683D5]">
              Explore the app
            </h1>
            <p class="text-[18px] text-[#494949] font-normal mt-2">
              Now your finances are in one place and always under control Need a
              cargo-connect account?
              <NuxtLink
                to="/login"
                class="text-[#0464CB] font-normal text-[18px] border-b border-[#0464CB]"
                >Login</NuxtLink
              >
            </p>
            <form
              class="space-y-4 md:space-y-6 mt-6"
              @submit.prevent="sendRegistrationRequest"
            >
              <div class="overflow-y-scroll h-[450px]">
                <div>
                  <label
                    for="Company name"
                    class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                    >Company name</label
                  >
                  <input
                    type="text"
                    name="CompanyName"
                    id="CompanyName"
                    class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                    placeholder="Your company name"
                    v-model="formData.companyName"
                  />
                </div>
                <div>
                  <label
                    for="ContactName"
                    class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2"
                    >Contact name</label
                  >
                  <input
                    type="text"
                    name="ContactName"
                    id="ContactName"
                    placeholder="Your contact name"
                    class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                    v-model="formData.contactName"
                  />
                </div>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2"
                    >Email Address</label
                  >
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email Address"
                    class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                    v-model="formData.email"
                  />
                </div>
                <div>
                  <div class="relative mt-2">
                    <label
                      for="createPassword"
                      class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                      >Create Password</label
                    >

                    <svg
                      @click="togglePassword"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      class="cursor-pointer w-6 h-6 absolute xl:right-5 lg:right-3 sm:right-3 right-2 top-10"
                    >
                      <path
                        v-if="!isPassword"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"
                      />
                      <path
                        v-if="!isPassword"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.458 12C3.732 7.943 7.297 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-4.839 7-9.542 7S3.732 16.057 2.458 12z"
                      />
                      <path
                        v-else
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.98 8.218a10.451 10.451 0 00-.31.282C2.763 9.463 2 10.656 2 12c1.581 4.77 5.804 7.5 10.5 7.5 1.348 0 2.639-.21 3.843-.603M6.179 6.177a9.718 9.718 0 015.821-1.677c3.966 0 7.455 2.12 9.542 5.5a10.354 10.354 0 01-1.065 1.502m-1.814 2.904C15.869 15.673 14.5 16.5 12 16.5a3.5 3.5 0 01-3.5-3.5c0-.861.327-1.656.865-2.245M15 12c0-1.657-1.343-3-3-3a2.992 2.992 0 00-2.78 1.943M3 3l18 18"
                      />
                    </svg>
                    <input
                      :type="isPassword ? 'text' : 'password'"
                      name="createPassword"
                      id="createPassword"
                      class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[13px]"
                      placeholder="Type your email address"
                      v-model="formData.password"
                    />
                  </div>
                </div>
                <div>
                  <label
                    for="ContactNo"
                    class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2"
                    >Contact No.</label
                  >
                  <div class="flex items-center text-lg relative">
                    <img
                      src="@/static/svg/usa-flag.svg"
                      alt=""
                      class="absolute ml-3 mb-3 mr-4 top-4 w-6 h-6"
                    />
                    <span
                      class="absolute left-12 mb-3 mr-4 text-[#1E1E1E] font-normal text-base"
                      >+1</span
                    >
                    <div
                      class="border-r border-gray-400 h-[40%] absolute left-20 top-4"
                    ></div>
                    <input
                      type="number"
                      name="ContactNo"
                      id="ContactNo"
                      placeholder="Your Contact No."
                      class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[12px] bg-white pl-24 focus:outline-none mb-3"
                      v-model="formData.contactNumber"
                    />
                  </div>
                </div>
                <div>
                  <inputFile
                    item-label="SCAC"
                    :file="formData.scac?.name"
                    @handleFileChange="uploadScac"
                  />
                </div>
                <div>
                  <inputFile
                    class="mt-3"
                    item-label="CAAT"
                    :file="formData.caat?.name"
                    @handleFileChange="uploadCaat"
                  />
                </div>
                <div>
                  <inputFile
                    class="mt-3"
                    item-label="Insurance Policy"
                    :file="formData.insurancePolicy?.name"
                    @handleFileChange="uploadInsurancePolicy"
                  />
                </div>
                <div>
                  <inputFile
                    class="mt-3"
                    item-label="OEA"
                    :file="formData.oea?.name"
                    @handleFileChange="uploadOea"
                  />
                </div>
                <div>
                  <inputFile
                    class="mt-3"
                    item-label="CTPAT"
                    :file="formData.ctpat?.name"
                    @handleFileChange="uploadCtpat"
                  />
                </div>
                <div>
                  <label
                    for="companyFormation"
                    class="block mb-2 text-sm font-normal text-[#1E1E1E] mt-2"
                    >Company Formation</label
                  >
                  <Dropdown
                    :items="countriesList"
                    :selectedLabel="selectedLabel"
                    @getValue="getValue"
                  />
                </div>
                <div v-if="selectedLabel === 'USA'">
                  <inputFile
                    class="mt-2"
                    item-label="W9 Form"
                    :file="formData.companyFormation.usa.w9_Form?.name"
                    @handleFileChange="uploadW9Form"
                  />
                  <inputFile
                    class="mt-4"
                    item-label="Utility Bill"
                    :file="formData.companyFormation.usa.utility_Bill?.name"
                    @handleFileChange="uploadUtilityBill"
                  />
                </div>

                <div v-if="selectedLabel === 'MEXICO'">
                  <inputFile
                    class="mt-2"
                    item-label="COPIA RFC Form"
                    :file="
                      typeof formData.companyFormation.maxico.copia_Rfc_Form ==
                      'object'
                        ? formData.companyFormation.maxico.copia_Rfc_Form?.name
                        : formData.companyFormation.maxico.copia_Rfc_Form
                    "
                    @handleFileChange="uploadCopiaRfcForm"
                  />
                  <inputFile
                    class="mt-2"
                    item-label="Constance of Fiscal Situation"
                    :file="
                      formData.companyFormation.maxico
                        .constance_Of_Fiscal_Situation?.name
                    "
                    @handleFileChange="uploadConstanceOfFiscalSituation"
                  />
                  <inputFile
                    class="mt-2"
                    item-label="Proof of Favorable"
                    :file="
                      formData.companyFormation.maxico.proof_of_Favorable?.name
                    "
                    @handleFileChange="uploadProofOfFavorable"
                  />
                  <inputFile
                    class="mt-2"
                    item-label="Proof of Address"
                    :file="
                      formData.companyFormation.maxico.proof_Of_Address?.name
                    "
                    @handleFileChange="uploadProofOfAddress"
                  />
                </div>
                <div v-if="selectedLabel != 'Select option'" class="mt-1">
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
                        class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                        placeholder="Your company name"
                        v-model="reference.companyName"
                      />
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
                        class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                        v-model="reference.contactName"
                      />
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
                        class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                        v-model="reference.emailAddress"
                      />
                    </div>
                    <div>
                      <label
                        for="ContactNo"
                        class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                        >Contact No.</label
                      >
                      <label class="xl:w-[382px] relative flex cursor-pointer">
                        <div class="flex justify-between">
                          <img
                            src="@/static/svg/usa-flag.svg"
                            alt=""
                            class="absolute ml-3 mb-3 mr-4 top-4 w-6 h-6"
                          />
                          <span
                            class="absolute left-12 mb-3 mr-4 top-4 text-[#1E1E1E] font-normal text-base"
                            >+1</span
                          >
                          <div
                            class="border-r border-gray-400 h-[40%] absolute left-20 top-4"
                          ></div>
                          <input
                            type="number"
                            name="ContactNo"
                            id="ContactNo"
                            placeholder="Your Contact No."
                            class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[15px] bg-white pl-24 focus:outline-none mb-3"
                            v-model="reference.contactNo"
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <button
                class="w-full text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[16px] px-5 py-[15px] text-center"
              >
                Send Registration Request
              </button>
              <p class="text-sm font-normal text-[#1E1E1E] max-w-[362px]">
                By creating an account or signing you have read and agree to our
                <span class="font-medium text-sm text-[#1E1E1E] cursor-pointer"
                  >Terms and Conditions </span
                >and
                <span class="font-medium text-sm text-[#1E1E1E] cursor-pointer"
                  >Privacy Policies</span
                >
              </p>
            </form>
          </div>
        </template>
      </Content>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      isPassword: false,
      countriesList: [
        {
          label: "USA",
        },
        {
          label: "MEXICO",
        },
      ],
      selectedLabel: "Select option",
      formData: {
        companyName: "",
        contactName: "",
        contactNumber: "",
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
            countryCode: "",
            contactNo: "",
          },
          {
            companyName: "",
            contactName: "",
            emailAddress: "",
            countryCode: "",
            contactNo: "",
          },
        ],
      },
      selectedW9File: "",
      selectedUtilityBill: "",
      selectedCopiaRfcForm: "",
      selectedConstanceOfFiscalSituation: "",
      selectedProofOfFavorable: "",
      selectedProofOfAddress: "",
      selectedScac: "",
      selectedCaat: "",
      selectedInsurancePolicy: "",
      selectedOea: "",
      selectedCtpat: "",
    };
  },

  methods: {
    ...mapActions({
      signup: "auth/signup",
      uploadImage: "auth/uploadImage",
    }),
    togglePassword() {
      this.isPassword = !this.isPassword;
    },
    getValue(item) {
      this.selectedLabel = item.label;
      this.formData.companyFormationType = item.label;
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
    async sendRegistrationRequest() {
      try {
        const formData = new FormData();
        formData.append("companyName", this.formData.companyName);
        formData.append("contactName", this.formData.contactName);
        formData.append("contactNumber", `+1${this.formData.contactNumber}`);
        formData.append("email", this.formData.email);
        formData.append("password", this.formData.password);
        formData.append("scac", this.formData.scac);
        formData.append("caat", this.formData.caat);
        formData.append("insurancePolicy", this.formData.insurancePolicy);
        formData.append("oea", this.formData.oea);
        formData.append("ctpat", this.formData.ctpat);
        formData.append(
          "companyFormationType",
          this.formData.companyFormationType
        );
        if (this.selectedLabel === "USA") {
          delete this.formData.companyFormation.maxico;

          formData.append(
            "companyFormation_usa_w9_Form",
            this.formData.companyFormation.usa.w9_Form
          );
          formData.append(
            "companyFormation_usa_utility_Bill",
            this.formData.companyFormation.usa.utility_Bill
          );
        }
        if (this.selectedLabel === "MEXICO") {
          delete this.formData.companyFormation.usa;

          formData.append(
            "companyFormation_maxico_copia_Rfc_Form",
            this.formData.companyFormation.maxico.copia_Rfc_Form
          );
          formData.append(
            "companyFormation_maxico_constance_Of_Fiscal_Situation",
            this.formData.companyFormation.maxico.constance_Of_Fiscal_Situation
          );
          formData.append(
            "companyFormation_maxico_proof_of_Favorable",
            this.formData.companyFormation.maxico.proof_of_Favorable
          );
          formData.append(
            "companyFormation_maxico_proof_Of_Address",
            this.formData.companyFormation.maxico.proof_Of_Address
          );
        }

        this.formData.commercialReference.forEach((ref, index) => {
          for (let key in ref) {
            let value = ref[key];

            if (key === "countryCode" || key === "contactNo") {
              value = `+1${value}`;
            }
            formData.append(`commercialReference[${index}][${key}]`, value);
          }
        });

        const response = await this.signup(formData);
        this.$toast.open({
          message: response.msg,
        });
        this.$router.push("/login");
      } catch (error) {
        this.$toast.open({
          message: error?.response?.data?.msg,
          type: "error",
        });
      }
    },
  },
};
</script>
