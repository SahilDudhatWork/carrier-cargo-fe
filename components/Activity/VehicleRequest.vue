<template>
  <div>
    <div>
      <h1 class="text-[#B9B9B9] text-[10px] font-semibold mb-2">
        VEHICLE INFO
      </h1>
      <div class="bg-[#F7F7F7] px-5 py-4 rounded-lg">
        <div class="grid sm:grid-cols-3 grid-cols-2 gap-y-3">
          <div>
            <p class="text-[#1E1E1E] font-medium text-xs">Vehicle Name</p>
            <p class="text-[#686868] font-normal text-xs">
              {{ activitySingleData?.vehicleData?.vehicleName }}
            </p>
          </div>
          <div>
            <p class="text-[#1E1E1E] font-medium text-xs">Vehicle Number</p>
            <p class="text-[#686868] font-normal text-xs">
              {{ activitySingleData?.vehicleData?.mxPlates }}
            </p>
          </div>
        </div>
        <div class="bg-[#E6E6E6] h-[1px] w-full mt-4 mb-3"></div>
        <div class="grid sm:grid-cols-3 grid-cols-2">
          <div>
            <p class="text-[#1E1E1E] font-medium text-sm">Drive Type</p>
            <p class="text-[#686868] font-normal text-xs">
              {{ activitySingleData?.typeOfTransportation?.title }}
            </p>
          </div>
          <div>
            <p class="text-[#1E1E1E] font-medium text-sm">Container Type</p>
            <p class="text-[#686868] font-normal text-xs">
              {{ activitySingleData?.modeOfTransportation?.title }}
            </p>
          </div>
        </div>
      </div>
      <!-- <div class="mt-5 grid grid-cols-3">
        <Document
          title="CAAT document"
          description="(Computer assisted audit techniques)"
        />
        <Document
          title="OEA document"
          description="(Authorized Economic Operator)"
        />
      </div> -->
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
