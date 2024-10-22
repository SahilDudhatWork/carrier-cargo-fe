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
            {{ activitySingleData?.userData?.contactNumber }})
          </p>
        </div>
      </div>
      <div class="mt-5">
        <Document
          title="User’s required Information"
          description="(Lorem ipsum doit sum to en la pat)"
        />
      </div>
      <div class="mt-4 bg-[#F7F7F7] px-2 rounded-lg py-2">
        <p class="text-[#1E1E1E] font-normal text-xs">
          You received an <span class="font-semibold">QR code</span> from
          carrier for further verification with user.
        </p>
        <img src="@/static/Images/qr.webp" alt="" class="mt-2" />
        <div class="mt-3">
          <span
            @click="fileUpload"
            class="cursor-pointer bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] bg-clip-text text-transparent font-normal text-sm border-b border-[#0464CB]"
          >
            Change QR code
          </span>
          <input type="file" ref="fileInput" class="hidden" />
        </div>
      </div>
    </div>
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
  methods: {
    fileUpload() {
      this.$refs.fileInput.click();
    },
  },
};
</script>
