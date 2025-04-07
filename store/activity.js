import $axios from "@/plugins/axios";

export const state = () => ({
  singleActivity: {},
  temporarySelected: {
    selectedOperatorData: null,
    carrierReferenceData: null,
    selectedVehicleData: null,
  },
});

export const getters = {
  getSingleActivity(state) {
    return state.singleActivity;
  },
  getSelectedOperatorData(state) {
    return state.temporarySelected.selectedOperatorData;
  },
  getSelectedVehicleData(state) {
    return state.temporarySelected.selectedVehicleData;
  },
  getSelectedCarrierReferenceData(state) {
    return state.temporarySelected.carrierReferenceData;
  },
};

export const mutations = {
  setSingleActivity(state, payload) {
    state.singleActivity = payload;
  },
  setSelectedOperatorData(state, payload) {
    state.temporarySelected.selectedOperatorData = payload;
  },
  setSelectedVehicleData(state, payload) {
    state.temporarySelected.selectedVehicleData = payload;
  },
  setCarrierReferenceData(state, payload) {
    state.temporarySelected.carrierReferenceData = payload;
  },
};

export const actions = {
  updateSelectedOperator({ commit }, operatorData) {
    commit("setSelectedOperatorData", operatorData);
  },
  updateSelectedVehicle({ commit }, vehicleData) {
    commit("setSelectedVehicleData", vehicleData);
  },
  updateCarrierReference({ commit }, carrierReferenceData) {
    commit("setCarrierReferenceData", carrierReferenceData);
  },
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
  async uploadFile(ctx, { id, data }) {
    try {
      const response = await $axios.post(`/v1/common/qr&proof/${id}`, data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async createRating(ctx, { id, data }) {
    try {
      const response = await $axios.post(`/v1/carrier/rating/${id}`, data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async movementComplete(ctx, payload) {
    try {
      const response = await $axios.put(
        `/v1/carrier/movement/complete/${payload.movementId}`,
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async validateCarrierReference(ctx, payload) {
    try {
      const response = await $axios.post(
        "v1/carrier/movement/reference/validate",
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async updateNotificationToken(ctx, payload) {
    try {
      const response = await $axios.put(
        "/v1/carrier/notification/token",
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchLocation(ctx, payload) {
    try {
      const response = await $axios.get(
        `/v1/common/locat/operator/${payload.id}`,
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async uploadDocuments(ctx, { id, data }) {
    try {
      const response = await $axios.post(
        `/v1/common/qr&proof/doc/carrier/${id}`,
        data
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};
