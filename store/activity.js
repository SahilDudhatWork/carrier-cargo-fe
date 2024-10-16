import $axios from "@/plugins/axios";

export const state = () => ({
  singleActivity: {},
  temporarySelected: {
    selectedOperatorData: null,
    selectedCarrierReferenceData: { key: "", label: "" },
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
    return state.temporarySelected.selectedCarrierReferenceData;
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
  setSelectedCarrierReferenceData(state, payload) {
    state.temporarySelected.selectedCarrierReferenceData = payload;
  },
};

export const actions = {
  updateSelectedOperator({ commit }, operatorData) {
    commit("setSelectedOperatorData", operatorData);
  },
  updateSelectedVehicle({ commit }, vehicleData) {
    commit("setSelectedVehicleData", vehicleData);
  },
  updateSelectedCarrierReference({ commit }, carrierReferenceData) {
    commit("setSelectedCarrierReferenceData", carrierReferenceData);
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
};
