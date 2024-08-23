import $axios from "@/plugins/axios";

export const state = () => ({
});

export const getters = {
};
export const mutations = {
};

export const actions = {
  async signin(ctx, payload) {
    try {
      const response = await $axios.post(`/v1/carrier/auth/logIn`, payload);
      this.$cookies.set("token", response.data.accessToken, {
        expires: 7,
        path: "/",
        secure: true,
        sameSite: "Strict",
      });
      ctx.commit("getuserData", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async signup(ctx, payload) {
    try {
      const response = await $axios.post("/v1/carrier/auth/signUp", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async profile(ctx, payload) {
    try {
      const response = await $axios.get("/v1/carrier/profile");
      return response;
    } catch (error) {
      throw error;
    }
  },
  async updateProfile(ctx, payload) {
    try {
      const response = await $axios.put("/v1/carrier/profile", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async sendOtp(ctx, payload) {
    try {
      const response = await $axios.post("/v1/common/otp/sent/carrier", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async verifyOtp(ctx, payload) {
    try {
      const response = await $axios.post("/v1/common/otp/verify", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async resetPassword(ctx, payload) {
    try {
      const response = await $axios.post(
        "/v1/common/resetPassword/carrier",
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async uploadImage(ctx,payload){
    try {
      const response = await $axios.post("/v1/common/imageUpload", payload);
      return response;
    } catch (error) {
      throw error
    }
  }
};
