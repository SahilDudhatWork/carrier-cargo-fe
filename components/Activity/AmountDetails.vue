<template>
  <div>
    <div>
      <h1 class="text-[#B9B9B9] text-[10px] font-semibold mb-4">
        AMOUNT DETAILS
      </h1>
    </div>
    <div class="mt-3 grid sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-y-5">
      <div>
        <p class="text-[#1E1E1E] font-medium text-sm">Drive Type</p>
        <p class="text-[#686868] font-light text-[10px] pt-0.5">
          {{ activitySingleData?.typeOfTransportation?.title }}
        </p>
      </div>
      <div>
        <p class="text-[#1E1E1E] font-medium text-sm">Container Type</p>

        <p class="text-[#686868] font-light text-[10px] pt-0.5">
          {{ activitySingleData?.modeOfTransportation?.title }}
        </p>
      </div>
      <div>
        <p class="text-[#1E1E1E] font-medium text-sm">Special Requirement</p>
        <div
          class="flex flex-wrap gap-2 mt-1"
          v-if="
            activitySingleData?.specialRequirements &&
            activitySingleData?.specialRequirements.length
          "
        >
          <p
            class="bg-[#0060C91A] px-2.5 rounded-[100px] flex items-center py-[2px]"
            v-for="(item, index) in activitySingleData?.specialRequirements"
            :key="index"
          >
            <span class="text-[#0060C9] text-[10px] font-semibold">
              {{ item?.type }}
            </span>
          </p>
        </div>
        <div v-else>
          <p class="text-[#686868] font-light text-[10px]">N/A</p>
        </div>
      </div>
      <div>
        <p class="text-[#1E1E1E] font-medium text-sm">Bridge of crossing</p>
        <div v-if="activitySingleData?.port_BridgeOfCrossing">
          <p class="text-[#686868] font-light text-[10px] pt-0.5">
            {{ activitySingleData?.port_BridgeOfCrossing }}
          </p>
        </div>
        <p v-else class="text-[#686868] font-light text-[10px] pt-0.5">N/A</p>
      </div>
      <div v-if="activitySingleData?.programming !== 'Instant'">
        <p class="text-[#1E1E1E] font-medium text-sm">Scheduled Time</p>
        <p class="text-[#686868] font-light text-[10px] pt-0.5">
          {{ activitySingleData?.schedule?.date }}
          {{ activitySingleData?.schedule?.time }}
        </p>
      </div>
      <div>
        <p class="text-[#1E1E1E] font-medium text-sm">Quantity</p>
        <div
          v-if="
            activitySingleData?.quantityForChains !== null ||
            activitySingleData?.quantityForStraps !== null ||
            activitySingleData?.quantityForTarps !== null
          "
        >
          <p class="text-[#686868] font-light text-[10px]">
            {{ activitySingleData?.quantityForChains || 0 }}xChains,
            {{ activitySingleData?.quantityForStraps || 0 }}xStraps,
            {{ activitySingleData?.quantityForTarps || 0 }}xTarps
          </p>
        </div>
        <div v-else>
          <p class="text-[#686868] font-light text-[10px]">N/A</p>
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
