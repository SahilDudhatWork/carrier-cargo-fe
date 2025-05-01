<template>
  <div>
    <div
      @click="$emit('selectOperator')"
      class="xxxl:w-[384px] w-full h-[160px] py-3 px-3 rounded-lg cursor-pointer"
      :class="
        isSelected ? 'border border-[#3683D5]' : 'border border-[#E7E7E7] '
      "
    >
      <div class="flex gap-3">
        <div>
          <img src="@/static/Images/truck-circle-img.webp" alt="" />
        </div>
        <div class="flex w-full justify-between">
          <div>
            <div class="flex gap-3">
              <h1 class="text-[#1E1E1E] font-medium text-sm">
                {{ allOperatorData?.operatorName }}
              </h1>
              <div>
                <h1
                  :class="
                    allOperatorData?.status == 'Active'
                      ? 'bg-[#3ECC48]'
                      : 'bg-[#D1D1D1]'
                  "
                  class="text-[#FEFEFE] font-medium text-[10px] px-2.5 rounded py-[1px]"
                >
                  {{
                    allOperatorData?.status == "Active"
                      ? "AVAILABLE"
                      : "INACTIVE"
                  }}
                </h1>
              </div>
            </div>
            <p class="text-[#414141] font-light text-xs">
              + {{ allOperatorData?.countryCode }}
              {{ allOperatorData?.operatorNumber }}
            </p>
          </div>
        </div>
      </div>
      <div class="bg-[#EEEEEE] h-[1px] w-full mt-3 mb-3"></div>
      <div class="grid grid-cols-2">
        <div>
          <h1 class="text-[#989898] font-normal text-xs">License Number</h1>

          <p
            class="text-[#1E1E1E] font-light text-xs"
            v-if="allOperatorData?.mxDriversLicense"
          >
            {{ allOperatorData?.mxDriversLicense }}
          </p>
          <p v-else class="text-[#1E1E1E] font-light text-xs">
            {{ allOperatorData?.usDriversLicense }}
          </p>
        </div>
        <div>
          <h1 class="text-[#989898] font-normal text-xs">License validity</h1>

          <p
            class="text-[#1E1E1E] font-light text-xs inline-flex"
            :class="getExpiryClass(allOperatorData?.mxIdBadgeExpirationDate)"
          >
            {{
              $moment(allOperatorData?.mxIdBadgeExpirationDate).format(
                "YYYY-MM-DD"
              )
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    allOperatorData: {
      type: Object,
      required: true,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getExpiryClass(date) {
      if (!date) return "";

      const expiryDate = this.$moment(date);
      const today = this.$moment();

      if (!expiryDate.isValid()) return "";

      const diffInMonths = expiryDate.diff(today, "months", true);

      if (diffInMonths <= 1) {
        return "errorExpiry-msg";
      } else if (diffInMonths <= 3) {
        return "warningExpiry-msg";
      }

      return "";
    },
  },
};
</script>
