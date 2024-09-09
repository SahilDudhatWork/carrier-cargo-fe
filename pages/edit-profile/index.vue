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
          <h1
            class="text-[#3683D5] font-normal text-[12px] bg-white py-2 px-5 absolute right-16 top-12 rounded-2xl cursor-pointer"
          >
            Change Background
          </h1>
        </div>
        <div class="mx-16 relative">
          <img
            src="@/static/Images/edit-profile-truck-circle-imag.webp"
            alt=""
            class="rounded-full absolute w-[300px] -top-36 h-[300px] object-cover border-[17px] border-white"
          />
          <p
            class="text-[#3683D5] font-normal text-sm absolute top-44 left-20 cursor-pointer"
          >
            Change profile picture
          </p>
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
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
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
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
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
                      v-model="formData.contactNumber"
                    />
                  </div>
                </label>
              </div>
              <div>
                <inputFile
                  item-label="SCAC"
                  :file="
                    typeof formData.scac == 'object'
                      ? formData.scac?.name
                      : formData.scac
                  "
                  @handleFileChange="uploadScac"
                />
              </div>
              <div>
                <inputFile
                  item-label="CAAT"
                  :file="
                    typeof formData.caat == 'object'
                      ? formData.caat?.name
                      : formData.caat
                  "
                  @handleFileChange="uploadCaat"
                />
              </div>
              <div>
                <inputFile
                  item-label="Insurance Policy"
                  :file="
                    typeof formData.insurancePolicy == 'object'
                      ? formData.insurancePolicy?.name
                      : formData.insurancePolicy
                  "
                  @handleFileChange="uploadInsurancePolicy"
                />
              </div>
              <div>
                <inputFile
                  item-label="OEA"
                  :file="
                    typeof formData.oea == 'object'
                      ? formData.oea?.name
                      : formData.oea
                  "
                  @handleFileChange="uploadOea"
                />
              </div>
              <div>
                <inputFile
                  item-label="CTPAT"
                  :file="
                    typeof formData.ctpat == 'object'
                      ? formData.ctpat?.name
                      : formData.ctpat
                  "
                  @handleFileChange="uploadCtpat"
                />
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
                />
              </div>
              <div v-if="selectedLabel === 'USA'">
                <inputFile
                  item-label="W9 Form"
                  :file="
                    typeof formData?.companyFormation?.usa?.w9_Form == 'object'
                      ? formData?.companyFormation?.usa?.w9_Form?.name
                      : formData?.companyFormation?.usa?.w9_Form
                  "
                  @handleFileChange="uploadW9Form"
                />
              </div>
              <div v-if="selectedLabel === 'USA'">
                <inputFile
                  item-label="Utility Bill"
                  :file="
                    typeof formData?.companyFormation?.usa?.utility_Bill ==
                    'object'
                      ? formData?.companyFormation?.usa?.utility_Bill?.name
                      : formData?.companyFormation?.usa?.utility_Bill
                  "
                  @handleFileChange="uploadUtilityBill"
                />
              </div>
              <div v-if="selectedLabel === 'MEXICO'">
                <inputFile
                  item-label="COPIA RFC Form"
                  :file="
                    typeof formData?.companyFormation?.maxico?.copia_Rfc_Form ==
                    'object'
                      ? formData?.companyFormation?.maxico?.copia_Rfc_Form?.name
                      : formData?.companyFormation?.maxico?.copia_Rfc_Form
                  "
                  @handleFileChange="uploadCopiaRfcForm"
                />
              </div>
              <div v-if="selectedLabel === 'MEXICO'">
                <inputFile
                  item-label="Constance of Fiscal Situation"
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
              </div>
              <div v-if="selectedLabel === 'MEXICO'">
                <inputFile
                  item-label="Proof of Favorable"
                  :file="
                    typeof formData?.companyFormation?.maxico
                      ?.proof_of_Favorable == 'object'
                      ? formData?.companyFormation?.maxico?.proof_of_Favorable
                          ?.name
                      : formData?.companyFormation?.maxico?.proof_of_Favorable
                  "
                  @handleFileChange="uploadProofOfFavorable"
                />
              </div>
              <div v-if="selectedLabel === 'MEXICO'">
                <inputFile
                  item-label="Proof of Address"
                  :file="
                    typeof formData?.companyFormation?.maxico
                      ?.proof_Of_Address == 'object'
                      ? formData?.companyFormation?.maxico?.proof_Of_Address
                          ?.name
                      : formData?.companyFormation?.maxico?.proof_Of_Address
                  "
                  @handleFileChange="uploadProofOfAddress"
                />
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
    };
  },
  computed: {
    ...mapGetters({
      getUserProfile: "auth/getUserProfile",
    }),
  },
  methods: {
    ...mapActions({
      profile: "auth/profile",
      updateProfile: "auth/updateProfile",
    }),
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
    async upateUserProfile() {
      try {
        console.log("this.formData", this.formData);
        const formData = new FormData();
        formData.append("companyName", this.formData.companyName);
        formData.append("contactName", this.formData.contactName);
        formData.append("contactNumber", `+1${this.formData.contactNumber}`);
        formData.append("email", this.formData.email);
        formData.append(
          "companyFormationType",
          this.formData.companyFormationType
        );
        if (typeof this.formData.scac == "object") {
          formData.append("scac", this.formData.scac);
        }
        if (
          this.formData.caat != null &&
          typeof this.formData.caat == "object"
        ) {
          formData.append("caat", this.formData.caat);
        }
        if (
          this.formData.insurancePolicy != null &&
          typeof this.formData.insurancePolicy == "object"
        ) {
          formData.append("insurancePolicy", this.formData.insurancePolicy);
        }
        if (this.formData.oea != null && typeof this.formData.oea == "object") {
          formData.append("oea", this.formData.oea);
        }
        if (
          this.formData.ctpat != null &&
          typeof this.formData.ctpat == "object"
        ) {
          formData.append("ctpat", this.formData.ctpat);
        }

        if (this.selectedLabel === "USA") {
          delete this.formData.companyFormation.maxico;

          if (
            this.formData.companyFormation.usa.w9_Form != null &&
            typeof this.formData.companyFormation.usa.w9_Form == "object"
          ) {
            formData.append(
              "companyFormation_usa_w9_Form",
              this.formData.companyFormation.usa.w9_Form
            );
          }
          if (
            this.formData.companyFormation.usa.utility_Bill != null &&
            typeof this.formData.companyFormation.usa.utility_Bill == "object"
          ) {
            formData.append(
              "companyFormation_usa_utility_Bill",
              this.formData.companyFormation.usa.utility_Bill
            );
          }
        }
        if (this.selectedLabel === "MEXICO") {
          delete this.formData.companyFormation.usa;

          if (
            this.formData.companyFormation.maxico.copia_Rfc_Form != null &&
            typeof this.formData.companyFormation.maxico.copia_Rfc_Form ==
              "object"
          ) {
            formData.append(
              "companyFormation_maxico_copia_Rfc_Form",
              this.formData.companyFormation.maxico.copia_Rfc_Form
            );
          }
          if (
            this.formData.companyFormation.maxico
              .constance_Of_Fiscal_Situation != null &&
            typeof this.formData.companyFormation.maxico
              .constance_Of_Fiscal_Situation == "object"
          ) {
            formData.append(
              "companyFormation_maxico_constance_Of_Fiscal_Situation",
              this.formData.companyFormation.maxico
                .constance_Of_Fiscal_Situation
            );
          }
          if (
            this.formData.companyFormation.maxico.proof_of_Favorable != null &&
            typeof this.formData.companyFormation.maxico.proof_of_Favorable ==
              "object"
          ) {
            formData.append(
              "companyFormation_maxico_proof_of_Favorable",
              this.formData.companyFormation.maxico.proof_of_Favorable
            );
          }
          if (
            this.formData.companyFormation.maxico.proof_Of_Address != null &&
            typeof this.formData.companyFormation.maxico.proof_Of_Address ==
              "object"
          ) {
            formData.append(
              "companyFormation_maxico_proof_Of_Address",
              this.formData.companyFormation.maxico.proof_Of_Address
            );
          }
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
        const response = await this.updateProfile(formData);
        this.$toast.open({
          message: response.msg,
        });
      } catch (error) {
        this.$toast.open({
          message: error?.response?.data?.msg,
          type: "error",
        });
      }
    },
  },

  async mounted() {
    try {
      await this.profile();
      this.formData = await this.$lodash.cloneDeep(this.getUserProfile);
      this.selectedLabel = this.formData.companyFormationType;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
