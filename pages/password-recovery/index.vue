<template>
  <div>
    <div>
      <Content>
        <template #modalContent>
          <div class="mt-20">
            <h1 class="font-bold text-[2rem] text-[#3683D5]">
              Password Recovery
            </h1>
            <p
              class="text-[18px] text-[#494949] font-normal mt-2 max-w-[361px]"
            >
              Enter email address to get password recovery mail on registered
              email
            </p>
            <form class="space-y-4 md:space-y-6 mt-6">
              <div>
                <label
                  for="Email Address"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >Email Address</label
                >
                <input
                  type="email"
                  name="email"
                  id="email"
                  v-model="forgetEmail"
                  class="xl:w-[382px] bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-3 py-[13px]"
                  placeholder="Email"
                />
              </div>
              <VueLoadingButton
                ref="loader"
                aria-label="Post message"
                :loading="isLoader"
                :disabled="isLoader"
                :styled="true"
                class="!xl:w-[382px] !w-full !text-white !bg-gradient-to-r !from-[#0464CB] !to-[#2AA1EB] !font-medium !rounded-lg !text-[16px] !px-5 h-[54px] !text-center"
                @click.native="sendCode"
              >
                Continue
              </VueLoadingButton>
              <p class="text-sm font-normal text-[#1E1E1E] max-w-[362px] mt-12">
                By creating an account or signing you have read and agree to our
                <span class="font-medium text-sm text-[#1E1E1E]"
                  >Terms and Conditions </span
                >and
                <span class="font-medium text-sm text-[#1E1E1E]"
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
  middleware: "guest",
  data() {
    return {
      forgetEmail: "",
      isLoader: false,
    };
  },
  methods: {
    ...mapActions({
      sendOtp: "auth/sendOtp",
    }),
    async sendCode() {
      this.isLoader = true;
      try {
        if (!this.forgetEmail) {
          this.$toast.open({
            message: this.$i18n.t("requiredErrorMessage"),
            type: "error",
          });
        } else {
          const res = await this.sendOtp({
            email: this.forgetEmail,
            otp_type: "forgot",
          });
          this.$toast.open({
            message: res.msg,
          });
          this.$cookies.set("email", this.forgetEmail, { expires: 1 });
          this.$router.push("/otp-sent");
          this.isLoader = false;
        }
      } catch (error) {
        this.isLoader = false;
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      } finally {
        this.isLoader = false;
      }
    },
  },
};
</script>
