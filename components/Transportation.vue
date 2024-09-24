<template>
  <div>
    <div
      class="rounded-2xl py-[12px] px-4 mb-3 flex justify-between cursor-pointer w-[382px]"
      :class="
        isSelected ? 'border border-[#3683D5]' : 'border border-[#E7E7E7] '
      "
      @click="handleClick"
    >
      <div class="flex gap-4 py-1.5">
        <div>
          <span
            class="rounded flex"
            :class="
              isSelected
                ? 'bg-[#034790] p-1'
                : ' p-[7px] border border-gray-400'
            "
          >
            <img
              src="@/static/svg/true.svg"
              alt=""
              class="w-[9px] h-[9px]"
              v-if="isSelected"
            />
          </span>
        </div>
        <div>
          <p class="font-normal text-sm text-[#1E1E1E]">
            {{ item?.title }}
          </p>
          <p class="font-light text-xs text-[#686868]">
            {{ item?.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleClick() {
      this.$emit("select", this.item);
    },
    getUserAddress() {
      this.$emit("getUserAddress", this.item._id);
    },
  },
};
</script>
