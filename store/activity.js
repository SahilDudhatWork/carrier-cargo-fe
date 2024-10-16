import $axios from "@/plugins/axios";

export const state = () => ({
  singleActivity: {},
});

export const getters = {
  getSingleActivity(state) {
    return state.singleActivity;
  },
};

export const mutations = {
  setSingleActivity(state, payload) {
    state.singleActivity = payload;
  },
};

export const actions = {
  async fetchAllActivities(ctx, payload) {
    try {
      const sortBy = payload?.sortBy || "";
      const keyWord = payload?.keyWord || "";
      const page = payload?.page || "";
      const limit = payload?.limit || "";

      const response = await $axios.get(
        `v1/carrier/movement?&keyWord=${keyWord}&sortBy=${sortBy}&page=${page}&limit=${limit}`,
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchSingleActivity(ctx, payload) {
    try {
      const response = await $axios.get(
        `v1/carrier/movement/${payload.id}`,
        payload
      );
      ctx.commit("setSingleActivity", response.data);

      return response;
    } catch (error) {
      throw error;
    }
  },
  async updateActivity(ctx, { formData, id }) {
    try {
      const response = await $axios.put(`v1/carrier/movement/${id}`, formData);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
