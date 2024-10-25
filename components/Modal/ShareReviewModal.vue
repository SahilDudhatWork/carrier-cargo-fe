<template>
  <div style="z-index: 999" class="fixed top-0 w-full lef-0">
    <div class="fixed inset-0" v-if="isModal">
      <div class="flex items-center justify-center min-h-screen">
        <div
          class="fixed inset-0 transition-opacity"
          @click="$emit('closeModal')"
        >
          <div class="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div class="!max-w-4xl mx-auto z-50 bg-white rounded-md p-5">
          <div class="sm:w-[42rem] w-full">
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
                <img
                  v-for="(star, index) in 5"
                  :key="star"
                  :src="raiting[index] ? yellowStar : whiteStar"
                  alt="star"
                  @click="selectRating(index)"
                  class="cursor-pointer"
                />
              </div>
            </div>
            <div class="mt-4">
              <h1 class="text-[#1E1E1E] font-normal text-base">
                Share your Experience
              </h1>
              <div class="">
                <input
                  type="input"
                  class="text-[#1E1E1E] font-normal text-base border border-[#D8DADC] p-4 rounded-[10px] mt-3 focus:outline-none w-full"
                  v-model="experience"
                />
              </div>
            </div>
            <div class="flex gap-3 justify-end pt-5 mb-4">
              <button
                @click="$emit('closeModal')"
                type="submit"
                class="border border-[#0464CB] text-transparent bg-clip-text bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium !rounded-xl text-[20px] px-10 py-[13px] text-center"
              >
                Cancel
              </button>
              <button
                @click="handleSubmit"
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
  data() {
    return {
      raiting: [false, false, false, false, false],
      experience: "",
      yellowStar: require("@/static/svg/yellow-star.svg"),
      whiteStar: require("@/static/svg/white-star.svg"),
    };
  },
  methods: {
    selectRating(index) {
      if (this.raiting[index]) {
        for (let i = index; i < this.raiting.length; i++) {
          this.$set(this.raiting, i, false);
        }
      } else {
        for (let i = 0; i <= index; i++) {
          this.$set(this.raiting, i, true);
        }
      }
    },
    handleSubmit() {
      const selectedRating = this.raiting.filter((star) => star).length;
      const formData = {
        rating: selectedRating,
        experience: this.experience,
      };
      this.$emit("handleSubmit", formData);
    },
  },
};
</script>
