<template>
  <div>
    <div
      @click="$emit('selectVehicle')"
      class="xxl:w-[384px] w-full h-[84px] py-3 px-3 rounded-lg cursor-pointer"
      :class="
        isSelected ? 'border border-[#3683D5]' : 'border border-[#E7E7E7] '
      "
    >
      <div class="flex w-full justify-between">
        <div>
          <div class="flex gap-3">
            <h1 class="text-[#1E1E1E] font-medium text-sm">
              {{ allVehicleData?.vehicleName }}
            </h1>
            <div>
              <h1
                :class="
                  allVehicleData?.status == 'Active'
                    ? 'bg-[#3ECC48]'
                    : 'bg-[#D1D1D1]'
                "
                class="text-[#FEFEFE] font-medium text-[10px] px-2.5 rounded py-[1px]"
              >
                {{
                  allVehicleData?.status == "Active" ? "AVAILABLE" : "INACTIVE"
                }}
              </h1>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <h1 class="text-[#1E1E1E] font-medium text-sm">MX plates :-</h1>
            <p
              class="text-[#414141] font-light text-xs"
              v-if="allVehicleData?.mxPlatesExpirationDate"
            >
              {{
                $moment(allVehicleData?.mxPlatesExpirationDate).format(
                  "DD-MM-YYYY"
                )
              }}
            </p>
            <p class="text-[#414141] font-light text-xs" v-else>-</p>
          </div>
          <div class="flex items-center gap-2">
            <h1 class="text-[#1E1E1E] font-medium text-sm">Us plates :-</h1>
            <p
              class="text-[#414141] font-light text-xs"
              v-if="allVehicleData?.usPlatesExpirationDate"
            >
              {{
                $moment(allVehicleData?.usPlatesExpirationDate).format(
                  "DD-MM-YYYY"
                )
              }}
            </p>
            <p class="text-[#414141] font-light text-xs" v-else>-</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    allVehicleData: {
      type: Object,
      required: true,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
