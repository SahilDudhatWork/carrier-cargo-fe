import $axios from "@/plugins/axios";

export const state = () => ({
  profileData: {},
  permissionsData: {},
  notificationData: [],
  notificationPaginationData: {},
});

export const getters = {
  getUserProfile(state) {
    return state.profileData;
  },
  getPermissionsData(state) {
    return state.permissionsData;
  },
  getSinglePermission: (state, getters) => (menu) => {
    // return state.permissionsData?.menuDetails?.find((x) => x.menuTitle == menu);
    return { add: true, read: true, edit: true, delete: true };
  },
  getNotificationData(state) {
    return state.notificationData;
  },
  getNotificationPaginationData(state) {
    return state.notificationPaginationData;
  },
};
export const mutations = {
  setUserProfile(state, payload) {
    state.profileData = payload;
  },
  setPermissionsData(state, payload) {
    state.permissionsData = payload;
  },
  setNotificationData(state, payload) {
    state.notificationData = payload;
  },
  setNotificationPaginationData(state, payload) {
    state.notificationPaginationData = payload;
  },
};

export const actions = {
  async signin(ctx, payload) {
    try {
      const response = await $axios.post(`/v1/carrier/auth/logIn`, payload);
      this.$cookies.set("token", response?.data?.accessToken);
      this.$cookies.set("refreshToken", response?.data?.refreshToken);
      // this.$cookies.set("token", response.data.accessToken, {
      // expires: 7,
      // path: "/",
      // secure: true,
      // sameSite: "Strict",
      // });
      return response;
    } catch (error) {
      throw error;
    }
  },
  async signup(ctx, payload) {
    try {
      const response = await $axios.post("/v1/carrier/auth/signUp", payload);
      // this.$cookies.set("token", response.data.accessToken, {
      //   expires: 7,
      //   path: "/",
      //   secure: true,
      //   sameSite: "Strict",
      // });
      return response;
    } catch (error) {
      throw error;
    }
  },
  async tokenVerify(ctx, payload) {
    try {
      const response = await $axios.post(
        "/v1/common/tokenVerify/carrier",
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async profile(ctx, payload) {
    try {
      const response = await $axios.get("/v1/carrier/profile");
      ctx.commit("setUserProfile", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async checkPermissions(ctx, payload) {
    try {
      const response = await $axios.get("/v1/carrier/auth/checkPermissions");
      ctx.commit("setPermissionsData", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async updateProfile(ctx, payload) {
    try {
      const response = await $axios.put("/v1/carrier/profile", payload);
      ctx.commit("setUserProfile", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async sendOtp(ctx, payload) {
    try {
      const response = await $axios.post(
        "/v1/common/otp/sent/carrier",
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  // for forgot password
  async verifyOtp(ctx, payload) {
    try {
      const response = await $axios.post("/v1/common/otp/verify", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  // for login
  async verifyCarrierOtp(ctx, payload) {
    try {
      const response = await $axios.post("/v1/carrier/auth/verifyOtp", payload);
      this.$cookies.set("token", response?.data?.accessToken);
      this.$cookies.set("refreshToken", response?.data?.refreshToken);
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
  async uploadImage(ctx, payload) {
    try {
      const response = await $axios.post("/v1/common/imageUpload", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchNotifications(ctx, payload) {
    try {
      const page = payload?.page || "";
      const limit = payload?.limit || "";
      const response = await $axios.get(
        `v1/carrier/notification?page=${page}&limit=${limit}`,
        payload
      );

      ctx.commit("setNotificationData", response.data.response);
      ctx.commit("setNotificationPaginationData", response.data.pagination);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
