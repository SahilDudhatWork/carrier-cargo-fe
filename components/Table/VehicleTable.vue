<template>
  <div>
    <div class="mt-6">
      <div class="relative overflow-x-auto">
        <table class="w-full text-left rtl:text-right">
          <thead class="bg-[#F4F4F4]">
            <tr>
              <th
                scope="col"
                class="pl-3 py-3 rounded-tl-lg text-[#000000] font-normal text-[12px]"
              >
                Sr. no
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                Vehicle Info
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                Us Plates
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                Us Expiration Date
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                Mx Plates
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                Mx Expiration Date
              </th>
              <th
                scope="col"
                class="ml-6 pr-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                Status
              </th>
              <th
                v-if="isEditBtn || isDeleteBtn"
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
              <td class="pl-3">#</td>
              <td class="px-6 py-6">
                <span class="text-[#000000] font-normal text-[12px] pt-3">{{
                  item?.vehicleName
                }}</span>
              </td>
              <td class="px-6 text-[#000000] font-normal text-[12px]">
                <span v-if="item?.usPlates"> {{ item?.usPlates }}</span>
                <span v-else>-</span>
              </td>
              <td class="px-6 text-[#000000] font-normal text-[12px]">
                <span
                  v-if="item?.usPlatesExpirationDate"
                  :class="getExpiryClass(item.usPlatesExpirationDate)"
                  >{{
                    $moment(item?.usPlatesExpirationDate).format("DD-MM-YYYY")
                  }}</span
                >
                <span v-else>-</span>
              </td>
              <td class="px-6 text-[#000000] font-normal text-[12px]">
                <span v-if="item?.mxPlates"> {{ item?.mxPlates }}</span>
                <span v-else>-</span>
              </td>
              <td class="px-6 text-[#000000] font-normal text-[12px]">
                <span
                  v-if="item?.mxPlatesExpirationDate"
                  :class="getExpiryClass(item.mxPlatesExpirationDate)"
                  >{{
                    $moment(item?.mxPlatesExpirationDate).format("DD-MM-YYYY")
                  }}</span
                >
                <span v-else>-</span>
              </td>
              <td
                @click="handleVerify(item)"
                class="font-normal text-[12px]"
                :class="
                  item?.status === 'Active'
                    ? ' text-[#59D31C]'
                    : 'text-[#ed2132]'
                "
              >
                {{ item?.status }}
              </td>
              <td
                class="flex items-center gap-2 py-8"
                v-if="isEditBtn || isDeleteBtn"
              >
                <img
                  v-if="isEditBtn"
                  src="@/static/svg/edit-icon.svg"
                  alt=""
                  class="w-[17px] h-[17px]"
                  @click="editOperator(item)"
                />
                <img
                  v-if="isDeleteBtn"
                  src="@/static/svg/delete-icon.svg"
                  alt=""
                  class="w-[20px] h-[20px]"
                  @click="$emit('deleteItem', item._id)"
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
        <div
          v-if="allData?.length > 0"
          class="mt-4 flex justify-end gap-5 items-center mb-10"
        >
          <span>{{ paginationText }}</span>
          <button
            class="p-1 rounded-lg"
            @click="$emit('firstPage')"
            :disabled="vehiclePaginationData.pre_page_url === null"
            :class="
              vehiclePaginationData.pre_page_url === null
                ? 'bg-[#89abcf]'
                : 'bg-[#3683D5]'
            "
          >
            <svg
              class="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
              fill="#ffffff"
            >
              <path
                d="M18.41,16.59L13.82,12L18.41,7.41L17,6L11,12L17,18L18.41,16.59M6,6H8V18H6V6Z"
              ></path>
            </svg>
          </button>
          <button
            @click="$emit('prevPage')"
            class="p-[9px] rounded-lg"
            :disabled="vehiclePaginationData.pre_page_url === null"
            :class="
              vehiclePaginationData.pre_page_url === null
                ? 'bg-[#89abcf]'
                : 'bg-[#3683D5]'
            "
          >
            <svg
              class="w-3.5 h-3.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
              stroke="#ffffff"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>

          <button
            @click="$emit('nextPage')"
            class="p-[9px] rounded-lg"
            :disabled="vehiclePaginationData.next_page_url === null"
            :class="
              vehiclePaginationData.next_page_url === null
                ? 'bg-[#89abcf]'
                : 'bg-[#3683D5]'
            "
          >
            <svg
              class="w-3.5 h-3.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
              stroke="#ffffff"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>

          <button
            @click="$emit('lastPage')"
            class="p-1 rounded-lg"
            :disabled="vehiclePaginationData.next_page_url === null"
            :class="
              vehiclePaginationData.next_page_url === null
                ? 'bg-[#89abcf]'
                : 'bg-[#3683D5]'
            "
          >
            <svg
              class="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
              fill="#ffffff"
            >
              <path
                d="M5.59,7.41L10.18,12L5.59,16.59L7,18L13,12L7,6L5.59,7.41M16,6H18V18H16V6Z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    allData: {
      type: Array,
      required: true,
    },
    paginationText: {
      type: String,
      default: "",
    },
    isEditBtn: {
      type: Boolean,
      default: false,
    },
    isDeleteBtn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      vehiclePaginationData: "vehicle/getVehiclePaginationData",
    }),
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
    editOperator(item) {
      this.$emit("handleClick", item);
    },
    async handleVerify(item) {
      this.$emit("handleVerify", item);
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
};
</script>
