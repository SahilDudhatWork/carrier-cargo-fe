<template>
  <div>
    <div>
      <h1 class="text-[#B9B9B9] text-[10px] font-semibold mb-2">USER INFO</h1>
      <div class="grid grid-cols-3">
        <div>
          <p class="text-[#1E1E1E] font-medium text-sm">
            {{ activitySingleData?.userData?.contactName }}
          </p>
          <p class="text-[#686868] font-normal text-xs">
            (+{{ activitySingleData?.userData?.countryCode }}
            {{ activitySingleData?.userData?.contactNumber }},
            {{ activitySingleData?.userData?.email }})
          </p>
        </div>
      </div>
      <!-- <div class="mt-5" v-if="activitySingleData?.documents">
        <Document
          @handleClick="$emit('downloadDocument')"
          title="User’s required Information"
          description="(Lorem ipsum doit sum to en la pat)"
        />
      </div> -->
      <!-- <div
        class="mt-4 bg-[#F7F7F7] px-2 rounded-lg py-2"
        v-if="
          activitySingleData?.documents && activitySingleData?.documents.length
        "
      >
        <p class="text-[#1E1E1E] font-normal text-xs">
          You received an <span class="font-semibold">QR code</span> from
          carrier for further verification with user.
        </p>
        <div class="flex flex-wrap gap-4 mt-3">
          <div v-for="(doc, key) in activitySingleData?.documents" :key="key">
            <img
              v-if="
                fileTypes[doc] === 'application/pdf' || fileTypes[doc] === 'pdf'
              "
              src="@/static/svg/pdf.svg"
              alt="Image Preview"
              class="w-20 object-contain h-12 rounded-lg"
              @click="$emit('downloadDocument', doc)"
            />
            <img
              v-else-if="
                fileTypes[doc] === 'application/msword' ||
                fileTypes[doc] === 'doc' ||
                fileTypes[doc] === 'document'
              "
              src="@/static/svg/doc.svg"
              alt="Image Preview"
              class="w-20 object-contain h-12 rounded-lg"
              @click="$emit('downloadDocument', doc)"
            />
            <img
              v-else
              :src="doc"
              alt=""
              class="mt-2 w-[100px] h-[100px] cursor-pointer"
              @click="$emit('downloadDocument', doc)"
            />
          </div>
          <!-- <div v-for="(doc, key) in activitySingleData?.documents" :key="key">
            <img
              :src="doc"
              alt=""
              class="mt-2 w-[100px] h-[100px] cursor-pointer"
              @click="$emit('downloadDocument', doc)"
            />
          </div> -->
    </div>
    <!-- <div
          class="mt-3"
          v-if="
            activitySingleData?.status !== 'NewAssignments' &&
            activitySingleData?.status !== 'Completed'
          "
        >
          <span
            @click="fileUpload"
            class="cursor-pointer bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] bg-clip-text text-transparent font-normal text-sm border-b border-[#0464CB]"
          >
            Change QR code
          </span>
          <input
            type="file"
            ref="fileInput"
            class="hidden"
            @change="handleFileUpload"
          />
        </div> -->
    <!-- </div> -->

    <!-- </div> -->
  </div>
</template>

<script>
export default {
  props: {
    activitySingleData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    // fileUpload() {
    //   this.$refs.fileInput.click();
    // },
    // handleFileUpload(event) {
    //   const file = event.target.files[0];
    //   if (file) {
    //     this.uploadQrCode(file);
    //   }
    // },
    // uploadQrCode(file) {
    //   this.$emit("uploadQrCode", {
    //     file,
    //     movementId: this.activitySingleData?.movementId,
    //   });
    // },
  },
};
</script>
