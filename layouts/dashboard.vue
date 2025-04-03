<template>
  <div>
    <header>
      <nav
        class="!fixed z-50 bg-white w-full"
        :class="isShow ? 'sm:ml-[14rem]' : 'sm:ml-[3.5rem]'"
      >
        <div class="flex justify-between items-center w-full">
          <button
            @click="toggleSidebar"
            type="button"
            class="inline-flex items-center ms-3 display-block text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              width="32"
              height="32"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <div class="flex justify-between gap-5 items-center py-5 px-4 w-full">
            <div>
              <div class="flex gap-1 items-center">
                <p
                  class="sm:font-semibold font-normal sm:text-[20px] text-[10px] text-[#414141] sm:block hidden"
                >
                  Hi Welcome!
                </p>
                <img
                  src="@/static/Images/slap.webp"
                  alt=""
                  class="sm:block hidden"
                />
              </div>
              <p class="text-[#575757] text-sm font-light sm:block hidden">
                Login as Carrier
              </p>
            </div>
            <div
              class="flex gap-4 items-center"
              :class="isShow ? 'sm:!mr-[15rem]' : 'sm:!mr-[4rem]'"
            >
              <img src="@/static/svg/moon.svg" alt="" />
              <img src="@/static/svg/bell.svg" alt="" />
              <h1 class="text-[#11263C] font-semibold text-[16px] capitalize">
                {{ profileData?.contactName }}
              </h1>
              <div
                class="flex gap-2 cursor-pointer"
                @click="isDropdown = !isDropdown"
              >
                <img
                  :src="profileData?.profilePicture"
                  alt=""
                  class="w-[32px] h-[32px] rounded-full"
                  v-if="profileData?.profilePicture"
                />
                <img src="@/static/Images/header-image.webp" alt="" v-else />
                <img src="@/static/svg/down-arrow.svg" alt="" />
              </div>
            </div>
          </div>
          <div class="relative">
            <div
              v-if="isDropdown"
              v-click-outside="closeDropdown"
              :class="isShow ? 'sm:right-[16rem] right-2' : 'sm:right-[5rem]'"
              class="z-50 absolute top-8 bg-white divide-y divide-gray-100 rounded-2xl w-40 shadow flex flex-col items-center dropdown-content"
              style="box-shadow: rgba(0, 0, 0, 0.5) 0px 6px 50px 0px"
            >
              <ul class="py-2 cursor-pointer" @click="closeDropdown">
                <nuxt-link to="/edit-profile">
                  <li class="flex items-center gap-3 px-[18px]">
                    <img src="@/static/svg/profile-user.svg" alt="" />
                    <span
                      class="block py-2.5 text-[#333333] font-medium text-base"
                    >
                      Profile
                    </span>
                  </li>
                </nuxt-link>
                <nuxt-link to="/settings">
                  <li class="flex items-center gap-3 px-[18px]">
                    <img src="@/static/svg/settings-sliders.svg" alt="" />
                    <a class="block py-2.5 text-[#333333] font-medium text-base"
                      >Settings</a
                    >
                  </li>
                </nuxt-link>
                <li class="flex items-center gap-3 px-[18px]" @click="logOut">
                  <img src="@/static/svg/logout.svg" alt="" class="w-6 h-6" />
                  <a class="block py-2.5 text-[#333333] font-medium text-base"
                    >Logout</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <transition name="fade">
      <aside
        :class="
          isSidebarOpen ? 'translate-x-0 slide-in-right' : '-translate-x-full'
        "
        :style="{ width: sidebarWidth }"
        class="fixed top-0 left-0 z-40 h-screen transition-transform sm:translate-x-0 bg-[#F5F9FD] ease-in-out duration-500 delay-1000"
        aria-label="Sidebar"
      >
        <div class="bg-dashboard-img h-full py-7">
          <div>
            <div class="flex items-center justify-center gap-3">
              <img
                src="@/static/Images/slime.webp"
                alt=""
                class="cursor-pointer sm:block hidden"
                @click="toggleSidebarWidth"
              />
              <img
                src="@/static/Images/header-logo.webp"
                alt=""
                v-if="isShow"
              />
            </div>
            <div class="flex justify-center mt-12">
              <ul
                class="flex flex-col text-white text-xl font-medium w-full justify-center"
              >
                <li
                  v-for="(tab, key) in sideBarItems"
                  :key="key"
                  @click="toggleSidebarItems"
                  :class="
                    previousPath == tab.href ? 'bg-[#3683D5] text-white' : ''
                  "
                >
                  <nuxt-link
                    :to="tab.href"
                    class="flex items-center gap-2 ml-5 py-[20px] group relative"
                    :class="{
                      'pointer-events-none':
                        !isVerified && tab.name !== 'Dashboard',
                    }"
                  >
                    <img
                      :src="previousPath == tab.href ? tab.svg : tab.blackSvg"
                      alt=""
                    />
                    <div v-if="!isShow" :class="['tooltip', 'visible-tooltip']">
                      <span>
                        {{ tab?.name }}
                      </span>
                    </div>
                    <span
                      v-if="isShow"
                      class="flex gap-4 font-medium text-sm text-justify"
                      :class="
                        previousPath == tab.href
                          ? 'text-white'
                          : 'text-[#686868]'
                      "
                      >{{ tab.name }}</span
                    >
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </transition>
    <div class="p-4 ml-0" :class="isShow ? 'sm:ml-[14rem]' : 'sm:ml-[3.5rem]'">
      <div
        v-if="isSidebarOpen"
        @click="isSidebarOpen = false"
        class="bg-gray-900/50 fixed sm:inset-full inset-0 z-30"
      ></div>
      <div class="mt-24">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import dashboardSvg from "@/static/svg/dashboard.svg";
import blackDashboardSvg from "@/static/svg/black-dashboard.svg";
import activitySvg from "@/static/svg/activity.svg";
import blackActivitySvg from "@/static/svg/black-activity.svg";
import truckSideSvg from "@/static/svg/truck-side.svg";
import blackTruckSideSvg from "@/static/svg/black-truck-side.svg";
import userSvg from "@/static/svg/user.svg";
import blackUserSvg from "@/static/svg/black-user.svg";
import settingsSvg from "@/static/svg/settings.svg";
import blackSettingsSvg from "@/static/svg/black-settings.svg";
// import manageRoleSvg from "@/static/svg/manage-role.svg";
// import subCarrierSvg from "@/static/svg/sub-carrier.svg";
// import blackSubCarrierSvg from "@/static/svg/black-sub-carrier.svg";
// import blackManageRoleSvg from "@/static/svg/black-manage-role.svg";
import Cookies from "js-cookie";
import { getToken } from "firebase/messaging";
import { messaging } from "@/plugins/firebase";

export default {
  middleware: ["auth"],
  computed: {
    ...mapGetters({
      profileData: "auth/getUserProfile",
      permissionsData: "auth/getPermissionsData",
    }),
    isVerified() {
      return this.profileData && this.profileData?.verifyByAdmin;
    },
  },
  data() {
    return {
      isSidebarOpen: false,
      isDropdown: false,
      isShow: true,
      sidebarWidth: "14rem",
      sideBarItems: [
        {
          name: "Dashboard",
          href: "/dashboard",
          isActive: true,
          svg: dashboardSvg,
          blackSvg: blackDashboardSvg,
        },
        {
          name: "Activity",
          href: "/activity",
          isActive: false,
          svg: activitySvg,
          blackSvg: blackActivitySvg,
        },
        {
          name: "Vehicle",
          href: "/vehicle",
          isActive: false,
          svg: truckSideSvg,
          blackSvg: blackTruckSideSvg,
        },
        {
          name: "Operator",
          href: "/operator",
          isActive: false,
          svg: userSvg,
          blackSvg: blackUserSvg,
        },
        // {
        //   name: "Manage Role",
        //   href: "/manage-role",
        //   isActive: false,
        //   svg: manageRoleSvg,
        //   blackSvg: blackManageRoleSvg,
        // },
        // {
        //   name: "Sub Carrier",
        //   href: "/sub-carrier",
        //   isActive: false,
        //   svg: subCarrierSvg,
        //   blackSvg: blackSubCarrierSvg,
        // },
        {
          name: "Settings",
          href: "/settings",
          isActive: false,
          svg: settingsSvg,
          blackSvg: blackSettingsSvg,
        },
      ],
      previousPath: "/dashboard",
      userName: "",
    };
  },
  watch: {
    "$route.path"(newPath) {
      this.previousPath = this.$router.history.current.fullPath;
      this.updateActiveTab(newPath);
    },
  },
  methods: {
    ...mapActions({
      updateNotificationToken: "activity/updateNotificationToken",
      checkPermissions: "auth/checkPermissions",
    }),
    closeDropdown() {
      this.isDropdown = false;
    },
    logOut() {
      Cookies.remove("token");
      Cookies.remove("refreshToken");
      this.$router.push("login");
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    toggleSidebarItems() {
      this.previousPath = this.$router.history.current.fullPath;
      this.isSidebarOpen = false;
    },
    toggleSidebarWidth() {
      this.sidebarWidth = this.sidebarWidth === "14rem" ? "3.5rem" : "14rem";
      this.isShow = !this.isShow;
    },
    updateActiveTab(path) {
      const previousPath = this.sideBarItems.find((tab) =>
        path.startsWith(tab.href)
      );
      if (previousPath) {
        this.previousPath = previousPath.href;
        this.sideBarItems = this.sideBarItems.map((item) => ({
          ...item,
          isActive: path.startsWith(item.href),
        }));
      }
    },
    async activate() {
      const token = await getToken(messaging, {
        vapidKey: process.env.NOTIFICATION_KEY,
      });
      if (token) {
        this.webToken = token;
      }
    },
    async notificationToken() {
      try {
        await this.updateNotificationToken({
          webToken: this.webToken,
        });
      } catch (error) {
        console.log(error, "error");
      }
    },
    async fetchPermissions() {
      try {
        await this.checkPermissions();
        if (this.permissionsData && this.permissionsData.menuDetails) {
          this.sideBarItems = this.sideBarItems.filter((item) => {
            const matchedMenu = this.permissionsData.menuDetails.find(
              (menu) => menu.menuTitle === item.name
            );
            return matchedMenu?.read;
          });
        } else {
          console.warn("menuDetails not found in API response.");
        }
      } catch (error) {
        console.log(error, "error");
      }
    },
  },
  mounted() {
    this.activate().then(() => {
      this.notificationToken();
    });
  },
  beforeMount() {
    // this.fetchPermissions();
    this.updateActiveTab(this.$router.history.current.fullPath);
  },
};
</script>
<style scoped>
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(3%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.slide-in-right {
  animation: slideInRight 0.5s ease-in-out forwards;
}
.tooltip {
  position: absolute;
  z-index: 999;
  left: 36px;
  top: 32px;
  transform: translateY(-50%);
  background-color: #3683d5;
  color: white;
  font-size: 16px;
  padding: 5px 35px;
  border-radius: 4px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease;
}

.group:hover .visible-tooltip {
  opacity: 1;
  visibility: visible;
  display: block;
}
.dropdown-content:after {
  content: "";
  position: absolute;
  top: 4px;
  right: 15%;
  margin-top: -15px;
  z-index: 1;
  border-bottom: solid 15px #fff;
  border-left: solid 12px transparent;
  border-right: solid 12px transparent;
}
</style>
