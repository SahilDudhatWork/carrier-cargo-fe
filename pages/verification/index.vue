<template>
  <div>
    <div>
      <Content>
        <template #modalContent>
          <div class="mt-10">
            <h1 class="font-normal text-[44px] text-[#212121]">Email Sent</h1>
            <p
              class="text-[18px] text-[#494949] font-normal mt-2 xl:max-w-[420px]"
            >
              We’ve sent an OTP on your mail please check and fill it.
            </p>
            <form
              class="space-y-4 md:space-y-6 mt-6"
              @submit.prevent="veryfyCode"
            >
              <div class="flex space-x-2">
                <input
                  v-for="(digit, index) in otp"
                  :key="index"
                  type="tel"
                  maxlength="1"
                  class="sm:w-12 w-11 h-12 text-center border rounded"
                  v-model="otp[index]"
                  @input="handleInput(index)"
                  @keydown.backspace="handleBackspace(index)"
                  ref="otpInput"
                  @keypress="isNumber"
                />
              </div>
              <div class="!m-0">
                <p
                  class="text-sm font-normal text-[#1E1E1E] max-w-[362px] mt-4"
                >
                  Didn’t get it?
                  <span
                    class="font-medium text-sm text-[#1E1E1E] border-b border-[#1E1E1E] cursor-pointer"
                    @click="resendCode"
                    >Resend code</span
                  >
                </p>
              </div>
              <button
                class="xl:w-[382px] w-full text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[16px] px-5 py-[15px] text-center"
              >
                Submit
              </button>
              <div
                class="text-sm font-normal text-[#1E1E1E] max-w-[362px] mt-10 !m-0"
              >
                <p class="mt-8">
                  By creating an account or signing you have read and agree to
                  our
                  <span
                    class="font-medium text-sm text-[#1E1E1E] cursor-pointer"
                    >Terms and Conditions </span
                  >and
                  <span
                    class="font-medium text-sm text-[#1E1E1E] cursor-pointer"
                    >Privacy Policies</span
                  >
                </p>
              </div>
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
      otp: Array(6).fill(""),
    };
  },
  computed: {},
  methods: {
    ...mapActions({
      verifyCarrierOtp: "auth/verifyCarrierOtp",
      sendOtp: "auth/sendOtp",
    }),
    async veryfyCode() {
      try {
        if (this.otp.some((digit) => digit === "")) {
          this.$toast.open({
            message: this.$i18n.t("errorMessage"),
            type: "error",
          });
          return;
        } else {
          let otpString = "";
          for (let i = 0; i < this.otp.length; i++) {
            otpString += this.otp[i];
          }
          const accessEmail = this.$cookies.get("email");

          const res = await this.verifyCarrierOtp({
            email: accessEmail,
            otp: parseInt(otpString),
          });

          this.$cookies.set("token", res.data.accessToken);
          this.$cookies.remove("email");

          this.$router.push("/dashboard");
        }
      } catch (error) {
        console.log(error);

        this.$toast.open({
          message: error?.response?.data?.msg,
          type: "error",
        });
      }
    },
    async resendCode() {
      try {
        let accessEmail = this.$cookies.get("email");
        const res = await this.sendOtp({ email: accessEmail });
        this.$toast.open({
          message: res.msg,
        });
      } catch (error) {
        this.$toast.open({
          message: error?.response?.data?.msg,
          type: "error",
        });
      }
    },
    handleInput(index) {
      if (this.otp[index].length === 1 && index < this.otp.length - 1) {
        this.$refs.otpInput[index + 1].focus();
      }
    },
    handleBackspace(index) {
      if (this.otp[index] === "" && index > 0) {
        this.$refs.otpInput[index - 1].focus();
      }
    },
    isNumber(event) {
      const charCode = event.charCode ? event.charCode : event.keyCode;
      if (charCode < 48 || charCode > 57) {
        event.preventDefault();
      }
    },
  },
};
</script>

<style scoped>
input[type="text"]::-ms-clear {
  display: none;
}
</style>
