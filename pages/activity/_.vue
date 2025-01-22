<template>
  <div>
    <div class="flex items-center gap-3 mb-5">
      <h1 class="text-[#4B4B4B] font-normal text-[12px] cursor-pointer">
        <nuxt-link to="/activity">ACTIVITY</nuxt-link>
      </h1>
      <img src="@/static/svg/right-arrow.svg" alt="" />
      <h1 class="text-[#4B4B4B] font-normal text-[12px] cursor-pointer">
        {{ activitySingleData.movementId }}
      </h1>
    </div>
    <!-- <div v-if="$checkUserUpload(activitySingleData?.status)">
      <h1 class="text-[#B9B9B9] font-semibold text-[10px] mb-5">UPDATES</h1>
      <div class="flex items-center gap-4 sm:flex-row flex-col">
        <p class="text-[#1E1E1E] font-medium text-[10px]">
          User’s details info uploaded
        </p>
        <p class="text-[#3683D5] font-normal text-[10px]">view details</p>
        <div
          v-if="activitySingleData?.status !== 'Completed'"
          class="flex gap-1 items-center"
        >
          <span class="bg-[#E6E6E6] w-[1px] h-2"></span>

          <div class="flex gap-1 items-center">
            <img src="@/static/svg/qr-code.svg" alt="" />
            <p class="font-medium text-xs text-[#151515]">QR code uploaded</p>
          </div>
          <div>
            <button
              @click="uploadQrCodeFile"
              class="text-[#3683D5] font-normal text-[10px] cursor-pointer"
            >
              Generate & Upload
            </button>
            <input
              type="file"
              ref="qrInput"
              class="hidden"
              multiple="true"
              @change="handleFileUpload"
            />
          </div>
        </div>
      </div>
      <div class="mt-4 mb-4 flex sm:justify-normal justify-center">
        <button
          class="text-[#FFFFFF] font-semibold text-sm rounded-md px-5 py-2 bg-gradient-to-r from-[#0464CB] to-[#2AA1EB]"
        >
          Generate Invoice
        </button>
      </div>
      <div class="bg-[#E6E6E6] h-[1px] w-full mt-6"></div>
    </div> -->
    <div class="mt-5">
      <AmountDetails :activitySingleData="activitySingleData" />
    </div>
    <div class="bg-[#E6E6E6] h-[1px] w-full mt-6"></div>
    <div class="mt-5">
      <UserInfo
        :activitySingleData="activitySingleData"
        @downloadDocument="downloadFileItem"
      />
      <div
        class="mt-4 bg-[#F7F7F7] px-2 rounded-lg py-2"
        v-if="
          activitySingleData?.documents && activitySingleData?.documents.length
        "
      >
        <p class="text-[#1E1E1E] font-normal text-xs">
          You received an <span class="font-semibold">QR code</span> from
          carrier for further verification with user.
        </p>
        <div class="flex flex-wrap gap-4 mt-3">
          <div v-for="(doc, key) in activitySingleData?.documents" :key="key">
            <img
              v-if="
                fileTypes[doc] === 'application/pdf' || fileTypes[doc] === 'pdf'
              "
              src="@/static/svg/pdf.svg"
              alt="PDF Preview"
              class="mt-2 w-[100px] h-[100px] cursor-pointer"
              @click="downloadFileItem(doc)"
            />
            <img
              v-else-if="
                fileTypes[doc] === 'application/msword' ||
                fileTypes[doc] === 'doc' ||
                fileTypes[doc] === 'document'
              "
              src="@/static/svg/doc.svg"
              alt="DOC Preview"
              class="mt-2 w-[100px] h-[100px] cursor-pointer"
              @click="downloadFileItem(doc)"
            />

            <img
              v-else-if="
                fileTypes[doc] === 'image' ||
                fileTypes[doc] === 'jpg' ||
                fileTypes[doc] === 'jpeg' ||
                fileTypes[doc] === 'png' ||
                fileTypes[doc] === 'gif' ||
                fileTypes[doc] === 'webp'
              "
              :src="doc"
              alt="Image Preview"
              class="mt-2 w-[100px] h-[100px] cursor-pointer"
              @click="downloadFileItem(doc)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="bg-[#E6E6E6] h-[1px] w-full mt-6"></div>
    <div class="mt-5" v-if="activitySingleData?.carrierData">
      <div class="mt-5">
        <CarrierInfo :activitySingleData="activitySingleData" />
        <div class="mt-4">
          <h1 class="text-[#B9B9B9] text-[10px] font-semibold">CARRIER DOC</h1>
          <div>
            <button
              @click="uploadQrCodeFile"
              class="text-[#3683D5] font-normal text-xs cursor-pointer"
            >
              Upload doc
            </button>
            <input
              type="file"
              ref="qrInput"
              class="hidden"
              multiple="true"
              @change="handleFileUpload"
            />
          </div>
          <div
            class="flex flex-wrap gap-4 mt-3"
            v-if="
              activitySingleData?.qrCode && activitySingleData?.qrCode.length
            "
          >
            <div v-for="(doc, key) in activitySingleData?.qrCode" :key="key">
              <img
                v-if="
                  fileTypes[doc] === 'application/pdf' ||
                  fileTypes[doc] === 'pdf'
                "
                src="@/static/svg/pdf.svg"
                alt="PDF Preview"
                class="mt-2 w-[100px] h-[100px] cursor-pointer"
                @click="downloadFileItem(doc)"
              />
              <img
                v-else-if="
                  fileTypes[doc] === 'application/msword' ||
                  fileTypes[doc] === 'doc' ||
                  fileTypes[doc] === 'document'
                "
                src="@/static/svg/doc.svg"
                alt="DOC Preview"
                class="mt-2 w-[100px] h-[100px] cursor-pointer"
                @click="downloadFileItem(doc)"
              />

              <img
                v-else-if="
                  fileTypes[doc] === 'image' ||
                  fileTypes[doc] === 'jpg' ||
                  fileTypes[doc] === 'jpeg' ||
                  fileTypes[doc] === 'png' ||
                  fileTypes[doc] === 'gif' ||
                  fileTypes[doc] === 'webp'
                "
                :src="doc"
                alt="Image Preview"
                class="mt-2 w-[100px] h-[100px] cursor-pointer"
                @click="downloadFileItem(doc)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="bg-[#E6E6E6] h-[1px] w-full mt-6"></div>
    </div>
    <div class="mt-5" v-if="activitySingleData?.vehicleData">
      <div class="mt-5">
        <VehicleRequest :activitySingleData="activitySingleData" />
      </div>
      <div class="bg-[#E6E6E6] h-[1px] w-full mt-6"></div>
    </div>
    <div class="mt-5">
      <ServiceDetails :activitySingleData="activitySingleData" />
    </div>
    <div class="bg-[#E6E6E6] h-[1px] w-full mt-6"></div>
    <div class="mt-5" v-if="activitySingleData?.operatorData">
      <div>
        <OperatorInfo :activitySingleData="activitySingleData" />
      </div>
      <div class="bg-[#E6E6E6] h-[1px] w-full mt-6"></div>
    </div>
    <div class="mt-7">
      <p
        class="text-[#000000] font-bold text-lg mb-2"
        v-if="!location?.lat && !location?.long"
      >
        Operator location not found
      </p>
      <GoogleMap
        :addressDetails="location"
        height="300px"
        :isMarkerEnabled="false"
        :isShowMarker="location?.lat && location?.long ? true : false"
      />
      <div class="bg-[#E6E6E6] h-[1px] w-full mt-7"></div>
    </div>
    <div class="mt-5">
      <Locations :activitySingleData="activitySingleData" />
    </div>
    <div class="mt-5" v-if="activitySingleData?.status === 'InProgress'">
      <div
        v-if="!isUploadComplete && !isProofOfPhotography"
        class="flex justify-center"
      >
        <button
          @click="isProofOfPhotography = !isProofOfPhotography"
          class="rounded-lg text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] flex justify-between py-3 px-5 sm:gap-14 gap-2 items-center"
        >
          Movement Completed
        </button>
      </div>
      <UploadDocument
        v-if="isProofOfPhotography"
        title="Proof Uploading"
        description="share proof of documents."
        buttonText="Upload"
        :showInput="true"
        @file-uploaded="handleProofOfPhotographyUpload"
      />
    </div>
    <div
      v-if="
        (activitySingleData?.status === 'InProgress' && isUploadComplete) ||
        activitySingleData?.status === 'Completed'
      "
    >
      <UploadDocument
        v-if="!activitySingleData?.ratings?.carrierToUser"
        title="Movement Completed"
        description="share your experience with us."
        buttonText="Share Review"
        @handleClick="shareRiview"
        :showInput="false"
      />
    </div>
    <div>
      <ShareReviewModal
        :isModal="isShareReviewModal"
        :activitySingleData="activitySingleData"
        @handleSubmit="handleShareRiview"
        @closeModal="closeShareReviewModal"
      />
    </div>
    <div
      class="mt-5"
      v-if="$checkProofOfPhotography(activitySingleData?.status)"
    >
      <ProofOfPhotography :activitySingleData="activitySingleData" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  layout: "dashboard",
  data() {
    return {
      isShareReviewModal: false,
      activitySingleData: {},
      isProofOfPhotography: false,
      isUploadComplete: false,
      location: {},
      fileTypes: {},
    };
  },
  watch: {
    activitySingleData: {
      deep: true,
      handler(item) {
        this.checkFileTypes([...item.qrCode, ...item.documents]);
      },
    },
  },
  methods: {
    ...mapActions({
      fetchSingleActivity: "activity/fetchSingleActivity",
      createRating: "activity/createRating",
      uploadFile: "activity/uploadFile",
      movementComplete: "activity/movementComplete",
      fetchLocation: "activity/fetchLocation",
    }),
    getFileTypeFromUrl(url) {
      const extension = url.split(".").pop().toLowerCase();
      const fileTypes = {
        pdf: "pdf",
        doc: "document",
        docx: "document",
        jpg: "image",
        jpeg: "image",
        png: "image",
        gif: "image",
        webp: "image",
        mp4: "video",
        mp3: "audio",
        txt: "text",
      };
      return fileTypes[extension] || "unknown";
    },
    async checkFileTypes(urls) {
      for (let url of urls) {
        const fileType = this.getFileTypeFromUrl(url);
        this.$set(this.fileTypes, url, fileType);
      }
    },
    shareRiview() {
      this.isShareReviewModal = !this.isShareReviewModal;
    },
    async handleShareRiview(formData) {
      try {
        const reviewData = {
          rating: formData.rating,
          experience: formData.experience,
        };
        const res = await this.createRating({
          id: this.movementId,
          data: reviewData,
        });
        this.$toast.open({
          message: res.msg,
        });
        this.isShareReviewModal = false;
        this.isUploadComplete = false;
        await this.getSingleTransitInfo();
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    closeShareReviewModal() {
      this.isShareReviewModal = false;
    },
    // async changeQrCode({ file, movementId }) {
    //   try {
    //     const formData = new FormData();
    //     formData.append("qrCode", file);
    //     formData.append("movementId", movementId);
    //     const res = await this.uploadFile({
    //       id: movementId,
    //       data: formData,
    //     });
    //     this.$toast.open({
    //       message: res.msg,
    //     });
    //   } catch (error) {
    //     console.log(error);
    //     this.$toast.open({
    //       message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
    //       type: "error",
    //     });
    //   }
    // },
    async handleProofOfPhotographyUpload(file) {
      try {
        const formData = new FormData();
        for (let i = 0; i < file.length; i++) {
          formData.append(`proofOfPhotography`, file[i]);
        }
        formData.append("movementId", this.movementId);
        const res = await this.uploadFile({
          id: this.movementId,
          data: formData,
        });
        this.$toast.open({
          message: res.msg,
        });
        await this.movementCompleted();
        this.isUploadComplete = true;
        this.isProofOfPhotography = false;
        await this.getSingleTransitInfo();
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    uploadQrCodeFile() {
      this.$refs.qrInput.click();
    },
    async movementCompleted() {
      try {
        await this.movementComplete({
          movementId: this.movementId,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    handleFileUpload(event) {
      this.qrCode = event.target.files;
      if (this.qrCode) {
        this.uploadQrCode();
      }
    },
    async uploadQrCode() {
      try {
        const formData = new FormData();
        for (let i = 0; i < this.qrCode.length; i++) {
          formData.append(`qrCode`, this.qrCode[i]);
        }
        formData.append("movementId", this.movementId);
        const res = await this.uploadFile({
          id: this.movementId,
          data: formData,
        });
        this.$toast.open({
          message: res.msg,
        });
        await this.getSingleTransitInfo();
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async getSingleTransitInfo() {
      try {
        const res = await this.fetchSingleActivity({
          id: this.movementId,
        });
        this.activitySingleData = res.data;
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async getLocation() {
      try {
        const accountId = this.activitySingleData?.operatorData?.accountId;
        if (!accountId) {
          return;
        }
        const res = await this.fetchLocation({
          id: accountId,
        });
        this.location = res?.data;
      } catch (error) {
        console.log(error, "error");
      }
    },
    downloadFileItem(doc) {
      const baseUrl = "https://cargo-storage-bucket.s3.us-east-1.amazonaws.com";
      if (doc.startsWith(baseUrl)) {
        const fileName = doc.split("/").pop();
        this.$downloadFile({ src: doc, name: fileName });
      }
    },
    // async downloadDocument() {
    //   const zip = new this.$jszip();
    //   try {
    //     for (let i = 0; i < this.activitySingleData?.documents.length; i++) {
    //       const response = await fetch(this.activitySingleData?.documents[i]);
    //       const blob = await response.blob();
    //       const fileName = this.activitySingleData?.documents[i]
    //         .split("/")
    //         .pop();
    //       zip.file(fileName, blob);
    //     }
    //     const content = await zip.generateAsync({ type: "blob" });
    //     const link = document.createElement("a");
    //     link.href = URL.createObjectURL(content);
    //     link.download = "documents.zip";
    //     link.click();
    //     URL.revokeObjectURL(link.href);
    //   } catch (error) {
    //     console.error("Error downloading documents:", error);
    //   }
    // },
  },
  async beforeMount() {
    await this.getSingleTransitInfo();
    await this.getLocation();
    if (this.isProofOfPhotography) {
      this.isUploadComplete = false;
    }
  },
  async asyncData({ params }) {
    return {
      movementId: params.pathMatch,
    };
  },
};
</script>
