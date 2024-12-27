<template>
  <div class="flex justify-center mt-8 mb-5">
    <div
      class="rounded-2xl text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] flex justify-between py-3 px-5 sm:gap-14 gap-2 items-center"
    >
      <div>
        <h1 class="text-[#FFFFFF] text-sm font-semibold">{{ title }}</h1>
        <p class="text-[#FFFFFF] text-xs font-normal">{{ description }}</p>
      </div>
      <div>
        <button
          @click="triggerFileUpload"
          class="bg-[#F5F9FD] text-[#0060C9] text-sm font-semibold px-[30px] py-1.5 rounded-lg"
        >
          {{ buttonText }}
        </button>
        <input
          v-if="showInput"
          type="file"
          ref="fileInput"
          class="hidden"
          multiple="true"
          @change="handleFileUpload"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadDocument",
  props: {
    title: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    showInput: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    triggerFileUpload() {
      if (this.showInput) {
        this.$refs.fileInput.click();
      } else {
        this.$emit("handleClick");
      }
    },
    handleFileUpload(event) {
      const file = event.target.files;
      this.$emit("file-uploaded", file);
    },
  },
};
</script>
