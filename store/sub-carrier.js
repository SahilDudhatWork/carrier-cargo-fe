import $axios from "@/plugins/axios";

export const state = () => ({
  allSubCarrierData: [],
  singleSubCarrierData: [],
});

export const getters = {
  getAllSubCarrierData(state) {
    return state.allSubCarrierData;
  },
  getSingleSubCarrierData(state) {
    return state.singleSubCarrierData;
  },
};

export const mutations = {
  setAllSubCarrierData(state, payload) {
    state.allSubCarrierData = payload;
  },
  setSingleSubCarrierData(state, payload) {
    state.singleSubCarrierData = payload;
  },
  removeSubCarrier(state, payload) {
    state.allSubCarrierData = state.allSubCarrierData.filter(
      (carrier) => carrier.accountId !== payload.accountId
    );
  },
};

export const actions = {
  async fetchAllSubCarrier(ctx, payload) {
    try {
      const response = await $axios.get("v1/carrier/sub/carrier", payload);
      ctx.commit("setAllSubCarrierData", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchSingleSubCarrier(ctx, payload) {
    try {
      const response = await $axios.get(
        `v1/carrier/sub/carrier/${payload.accountId}`
      );
      ctx.commit("setSingleSubCarrierData", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async updateSubCarrier(ctx, payload) {
    try {
      const response = await $axios.put(
        `v1/carrier/sub/carrier/${payload.accountId}`,
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async deleteSubCarrier(ctx, payload) {
    try {
      const response = await $axios.delete(
        `v1/carrier/sub/carrier/${payload.accountId}`,
        payload
      );
      ctx.commit("removeSubCarrier", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async CreateSubCarrier(ctx, payload) {
    try {
      const response = await $axios.post("v1/carrier/sub/carrier", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
