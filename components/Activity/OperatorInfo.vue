<template>
  <div>
    <div>
      <h1 class="text-[#B9B9B9] text-[10px] font-semibold mb-2">
        OPERATOR INFO
      </h1>
      <div class="grid grid-cols-3 bg-[#F7F7F7] px-5 py-4 rounded-lg">
        <div>
          <p class="text-[#1E1E1E] font-medium text-xs">
            {{ acticitySingleData?.operatorData?.operatorName }}
          </p>
          <p class="text-[#686868] font-normal text-xs">
            (+{{ acticitySingleData?.operatorData?.countryCode }}
            {{ acticitySingleData?.operatorData?.operatorNumber }})
          </p>
        </div>
        <div>
          <p class="text-[#1E1E1E] font-medium text-xs">Driver License</p>
          <p class="text-[#686868] font-normal text-xs">
            {{ acticitySingleData?.operatorData?.usDriversLicense }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    acticitySingleData: {
      type: Object,
      required: true,
    },
  },
};
</script>
