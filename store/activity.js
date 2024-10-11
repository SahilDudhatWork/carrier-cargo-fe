import $axios from "@/plugins/axios";

export const state = () => ({});

export const getters = {};

export const mutations = {};

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
