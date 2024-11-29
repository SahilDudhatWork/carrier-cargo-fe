<template>
  <div>
    <div class="mt-6">
      <div class="relative overflow-x-auto">
        <table class="w-full text-left rtl:text-right">
          <thead class="bg-[#F4F4F4]">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 rounded-tl-lg text-[#000000] font-normal text-[12px]"
              >
                Sr. no
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                Sub Carrier ID
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                Sub Carrier Info
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                Company name
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                Status
              </th>
              <th
                scope="col"
                class="px-3 py-3 rounded-tr-lg text-[#000000] font-normal text-[12px]"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody v-if="allData?.length > 0">
            <tr
              class="bg-white border-b cursor-pointer"
              v-for="(item, index) in allData"
              :key="index"
            >
              <td class="px-6">#</td>
              <th
                scope="row"
                class="px-6 ftext-[#000000] font-normal text-[12px]"
              >
                <span class="border-b border-black">{{ item?.accountId }}</span>
              </th>
              <td class="px-6 flex flex-col justify-center">
                <span class="text-[#000000] font-normal text-[12px] pt-3">{{
                  item?.contactName
                }}</span>
                <span class="text-[#989898] font-normal text-[10px] pb-5">
                  {{ item?.email }}
                </span>
              </td>
              <td class="px-6 text-[#000000] font-normal text-[12px]">
                {{ item?.companyName }}
              </td>
              <td class="cursor-pointer">
                <span
                  class="ml-6 border-b font-normal text-[12px]"
                  :class="
                    item?.verifyByAdmin
                      ? 'text-[#59D31C] border-[#59D31C]'
                      : 'text-yellow-500 border-yellow-500'
                  "
                >
                  {{ item?.verifyByAdmin ? "Verified" : "Verify" }}
                </span>
              </td>
              <td class="flex items-center gap-2">
                <img
                  src="@/static/svg/edit-icon.svg"
                  alt=""
                  class="w-[17px] h-[17px] mt-6"
                  @click="editSubCarrier(item)"
                />
                <img
                  src="@/static/svg/delete-icon.svg"
                  alt=""
                  class="w-[20px] h-[20px] mt-6"
                  @click="$emit('deleteItem', item.accountId)"
                />
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td
                colspan="8"
                class="text-xl font-medium text-gray-400 text-center py-10"
              >
                No records available
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    allData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    editSubCarrier(item) {
      this.$emit("handleClick", item);
    },
  },
};
</script>
