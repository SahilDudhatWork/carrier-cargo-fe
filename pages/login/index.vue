<template>
  <div>
    <div>
      <Content>
        <template #modalContent>
          <div class="mt-24">
            <h1 class="font-bold text-[2rem] text-[#3683D5]">Log In</h1>
            <p
              class="text-[18px] text-[#494949] font-normal mt-2 max-w-[350px]"
            >
              You’ve received an access approval along with password, please
              fill to get access. Need a cargo-connect account?
              <NuxtLink
                to="/register"
                class="text-[#0464CB] font-normal text-[18px] border-b border-[#0464CB]"
                >Register</NuxtLink
              >
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
                  class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-3 py-[17px]"
                  placeholder="Your email"
                  v-model="formData.email"
                />
              </div>
              <div class="relative">
                <label
                  for="Password"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >Password</label
                >
                <svg
                  @click="togglePassword"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="cursor-pointer w-6 h-6 absolute xl:right-3 lg:right-3 sm:right-3 right-2 top-12"
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
                  class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[17px]"
                  placeholder="Your password"
                  v-model="formData.password"
                />
              </div>
              <div class="flex justify-end !m-0">
                <NuxtLink
                  to="/password-recovery"
                  class="text-sm font-normal text-[#3683D5] cursor-pointer mt-2"
                  >Forgot password?</NuxtLink
                >
              </div>
              <VueLoadingButton
                ref="loader"
                aria-label="Post message"
                :loading="isLoader"
                :disabled="isLoader"
                :styled="true"
                class="!w-full !text-white !bg-gradient-to-r !from-[#0464CB] !to-[#2AA1EB] !font-medium !rounded-lg !text-[16px] !px-5 h-[54px] !text-center"
                @click.native="login"
              >
                Log In
              </VueLoadingButton>

              <div class="flex items-center justify-between !m-0">
                <div class="flex items-start mt-8">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="remember"
                      class="text-[#1E1E1E] font-normal text-[16px]"
                      >Keep me Logged in</label
                    >
                  </div>
                </div>
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
import { getToken } from "firebase/messaging";
import { messaging } from "@/plugins/firebase";
export default {
  middleware: "guest",
  data() {
    return {
      isPassword: false,
      isLoader: false,
      formData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      signin: "auth/signin",
    }),
    togglePassword() {
      this.isPassword = !this.isPassword;
    },
    async login() {
      this.isLoader = true;
      try {
        if ((!this.formData.email, !this.formData.password)) {
          this.$toast.open({
            message: this.$i18n.t("requiredErrorMessage"),
            type: "error",
          });
        } else {
          this.$cookies.remove("token");
          this.$cookies.remove("refreshToken");
          this.formData.email = this.formData.email.toLowerCase();
          await this.signin(this.formData);
          // this.$cookies.set("email", this.formData?.email, { expires: 1 });
          this.$toast.open({
            message: this.$i18n.t("loginMessage"),
          });

          const redirectUrl = this.$route.query.redirect
            ? decodeURIComponent(this.$route.query.redirect)
            : null;
          if (redirectUrl) {
            this.$router.push(redirectUrl);
          } else {
            this.$router.push("/dashboard");
          }
          this.isLoader = false;
        }
      } catch (error) {
        this.isLoader = false;
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
        console.log(error);
      } finally {
        this.isLoader = false;
      }
    },
    async activate() {
      const token = await getToken(messaging, {
        vapidKey: process.env.NOTIFICATION_KEY,
      });
      if (token) {
        this.formData.webToken = token;
      }
    },
  },
  mounted() {
    this.activate();
  },
};
</script>
