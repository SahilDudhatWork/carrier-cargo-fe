<template>
  <div>
    <div>
      <h1 class="text-[#B9B9B9] text-[10px] font-semibold mb-2">
        CARRIER INFO
      </h1>
      <div class="flex gap-3 items-center">
        <img
          src="@/static/svg/star.svg"
          alt=""
          class="bg-[#F0F0F0] py-2.5 px-1.5 rounded-xl mt-3"
        />
        <div>
          <p class="text-[#1E1E1E] font-medium text-sm">
            {{ activitySingleData?.carrierData?.contactName }}
          </p>
          <p class="text-[#686868] font-normal text-xs">
            {{ activitySingleData?.carrierData?.companyName }}, +{{
              activitySingleData?.carrierData?.countryCode
            }}
            {{ activitySingleData?.carrierData?.contactNumber }},
            {{ activitySingleData?.carrierData?.email }}
          </p>
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
};
</script>
