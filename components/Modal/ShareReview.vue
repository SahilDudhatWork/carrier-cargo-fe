<template>
  <div style="z-index: 999" class="fixed top-0 w-full lef-0">
    <div class="fixed inset-0" v-if="isModal">
      <div class="flex items-center justify-center min-h-screen">
        <div class="fixed inset-0 transition-opacity" @click="closeModal">
          <div class="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div class="max-w-4xl mx-auto z-50 bg-white rounded-md p-5">
          <div>
            <div class="flex gap-3 items-center">
              <img
                src="@/static/svg/star.svg"
                alt=""
                class="bg-[#F0F0F0] py-2.5 px-1.5 rounded-xl mt-3"
              />
              <div>
                <p class="text-[#1E1E1E] font-medium text-sm">
                  {{ activitySingleData?.userData?.contactName }}
                </p>
                <p class="text-[#686868] font-normal text-xs">
                  {{ activitySingleData?.userData?.companyName }}, +{{
                    activitySingleData?.userData?.countryCode
                  }}
                  {{ activitySingleData?.userData?.contactNumber }},
                  {{ activitySingleData?.userData?.email }}
                </p>
              </div>
            </div>
          </div>
          <div class="bg-[#E6E6E6] h-[1px] w-full mt-6"></div>
          <div class="mt-5">
            <h1 class="text-[#1E1E1E] font-normal text-base">Rating</h1>
            <div class="flex gap-3 mt-3">
              <img src="@/static/svg/yellow-star.svg" alt="" />
              <img src="@/static/svg/yellow-star.svg" alt="" />
              <img src="@/static/svg/yellow-star.svg" alt="" />
              <img src="@/static/svg/yellow-star.svg" alt="" />
              <img src="@/static/svg/white-star.svg" alt="" />
            </div>
          </div>
          <div class="mt-4">
            <h1 class="text-[#1E1E1E] font-normal text-base">
              Share your Experience
            </h1>
            <div
              class="text-[#1E1E1E] font-normal text-base border border-[#D8DADC] p-4 rounded-[10px] mt-3"
            >
              Lorem ipsum dolor sit amet consectetur. Vitae netus augue mattis
              cras pellentesque suspendisse sit quisque pharetra.
            </div>
          </div>
          <div
            class="flex gap-3 justify-end border-t border-gray-200 pt-5 mb-4"
          >
            <button
              type="submit"
              class="border border-[#0464CB] text-transparent bg-clip-text bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium !rounded-xl text-[20px] px-10 py-[13px] text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[20px] px-10 py-[13px] text-center"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isModal: {
      type: Boolean,
      required: true,
      default: false,
    },
    activitySingleData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    handleSubmit() {
      this.$emit("handleSubmit");
    },
  },
};
</script>
