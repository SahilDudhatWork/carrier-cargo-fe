<template>
  <div>
    <div class="flex items-center gap-3 mb-5">
      <h1 class="text-[#4B4B4B] font-normal text-[12px] cursor-pointer">
        <nuxt-link to="/activity">ACTIVITY</nuxt-link>
      </h1>
      <img src="@/static/svg/right-arrow.svg" alt="" />
      <h1 class="text-[#4B4B4B] font-normal text-[12px] cursor-pointer">
        {{ activitySingleData?.movementId }}
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
    <div
      class="bg-[#E6E6E6] h-[1px] w-full mt-6"
      v-if="activitySingleData?.userData"
    ></div>
    <div class="mt-5">
      <UserInfo
        v-if="activitySingleData?.userData"
        :activitySingleData="activitySingleData"
        @downloadDocument="downloadFileItem"
      />
      <div
        class="mt-5"
        v-if="
          activitySingleData?.documents &&
          Object.values(activitySingleData.documents).some(
            (arr) => arr.length > 0
          )
        "
      >
        <h1 class="text-[#000000] font-bold text-lg mb-4">User documents</h1>
        <div
          class="mt-5 grid xxl:grid-cols-6 xl:grid-cols-4 sm:grid-cols-2 grid-cols-2 lg:grid-cols-3 gap-y-5 mb-10"
        >
          <UploadBox
            v-if="
              activitySingleData?.documents &&
              activitySingleData?.documents?.cartaPorte?.length
            "
            :isUploadMode="false"
            :filePreview="
              activitySingleData?.documents &&
              activitySingleData?.documents?.cartaPorte[0]
            "
            title="CARTA PORTE"
            :fileTypes="
              fileTypes[activitySingleData?.documents?.cartaPorte?.[0]]
            "
            @downloadFileItem="
              downloadFileItem(activitySingleData?.documents?.cartaPorte?.[0])
            "
          />
          <UploadBox
            v-if="
              activitySingleData?.documents &&
              activitySingleData?.documents?.doda?.length
            "
            :isUploadMode="false"
            :filePreview="
              activitySingleData?.documents &&
              activitySingleData?.documents?.doda[0]
            "
            title="DODA"
            :fileTypes="fileTypes[activitySingleData?.documents?.doda?.[0]]"
            @downloadFileItem="
              downloadFileItem(activitySingleData?.documents?.doda?.[0])
            "
          />
          <UploadBox
            v-if="
              activitySingleData?.documents &&
              activitySingleData?.documents?.entryPrefileInbond?.length
            "
            :isUploadMode="false"
            :filePreview="
              activitySingleData?.documents &&
              activitySingleData?.documents?.entryPrefileInbond[0]
            "
            title="ENTRY / PREFILE / INBOND"
            :fileTypes="
              fileTypes[activitySingleData?.documents?.entryPrefileInbond?.[0]]
            "
            @downloadFileItem="
              downloadFileItem(
                activitySingleData?.documents?.entryPrefileInbond?.[0]
              )
            "
          />
          <UploadBox
            v-if="
              activitySingleData?.documents &&
              activitySingleData?.documents?.itnInbondNoItnNeeded?.length
            "
            :isUploadMode="false"
            :filePreview="
              activitySingleData?.documents &&
              activitySingleData?.documents?.itnInbondNoItnNeeded[0]
            "
            title="ITN # / INBOND / NO ITN NEEDED"
            :fileTypes="
              fileTypes[
                activitySingleData?.documents?.itnInbondNoItnNeeded?.[0]
              ]
            "
            @downloadFileItem="
              downloadFileItem(
                activitySingleData?.documents?.itnInbondNoItnNeeded?.[0]
              )
            "
          />
          <UploadBox
            v-if="
              activitySingleData?.documents &&
              activitySingleData?.documents?.letterWithInstructionsMemo?.length
            "
            :isUploadMode="false"
            :filePreview="
              activitySingleData?.documents &&
              activitySingleData?.documents?.letterWithInstructionsMemo[0]
            "
            title="LETTER WITH INSTRUCTIONS/ MEMO"
            :fileTypes="
              fileTypes[
                activitySingleData?.documents?.letterWithInstructionsMemo?.[0]
              ]
            "
            @downloadFileItem="
              downloadFileItem(
                activitySingleData?.documents?.letterWithInstructionsMemo?.[0]
              )
            "
          />
          <UploadBox
            v-if="
              activitySingleData?.documents &&
              activitySingleData?.documents?.oversizeNotificationUser?.length
            "
            :isUploadMode="false"
            :filePreview="
              activitySingleData?.documents &&
              activitySingleData?.documents?.oversizeNotificationUser[0]
            "
            title="OVERSIZE NOTIFICATION USER"
            :fileTypes="
              fileTypes[
                activitySingleData?.documents?.oversizeNotificationUser?.[0]
              ]
            "
            @downloadFileItem="
              downloadFileItem(
                activitySingleData?.documents?.oversizeNotificationUser?.[0]
              )
            "
          />
          <UploadBox
            v-if="
              activitySingleData?.documents &&
              activitySingleData?.documents?.overweightPermit?.length
            "
            :isUploadMode="false"
            :filePreview="
              activitySingleData?.documents &&
              activitySingleData?.documents?.overweightPermit[0]
            "
            title="OVERWEIGHT PERMIT"
            :fileTypes="
              fileTypes[activitySingleData?.documents?.overweightPermit?.[0]]
            "
            @downloadFileItem="
              downloadFileItem(
                activitySingleData?.documents?.overweightPermit?.[0]
              )
            "
          />
          <UploadBox
            v-if="
              activitySingleData?.documents &&
              activitySingleData?.documents?.hazmatBol?.length
            "
            :isUploadMode="false"
            :filePreview="
              activitySingleData?.documents &&
              activitySingleData?.documents?.hazmatBol[0]
            "
            title="HAZMAT BOL"
            :fileTypes="
              fileTypes[activitySingleData?.documents?.hazmatBol?.[0]]
            "
            @downloadFileItem="
              downloadFileItem(activitySingleData?.documents?.hazmatBol?.[0])
            "
          />
          <UploadBox
            v-if="
              activitySingleData?.documents &&
              activitySingleData?.documents?.hazmatSdsSafetyDataSheet?.length
            "
            :isUploadMode="false"
            :filePreview="
              activitySingleData?.documents &&
              activitySingleData?.documents?.hazmatSdsSafetyDataSheet[0]
            "
            title="HAZMAT SDS (SAFETY DATA SHEET)"
            :fileTypes="
              fileTypes[
                activitySingleData?.documents?.hazmatSdsSafetyDataSheet?.[0]
              ]
            "
            @downloadFileItem="
              downloadFileItem(
                activitySingleData?.documents?.hazmatSdsSafetyDataSheet?.[0]
              )
            "
          />
          <UploadBox
            v-if="
              activitySingleData?.documents &&
              activitySingleData?.documents?.sagarpaPackageAgriculture?.length
            "
            :isUploadMode="false"
            :filePreview="
              activitySingleData?.documents &&
              activitySingleData?.documents?.sagarpaPackageAgriculture[0]
            "
            title="SAGARPA PACKAGE (AGRICULTURE)"
            :fileTypes="
              fileTypes[
                activitySingleData?.documents?.sagarpaPackageAgriculture?.[0]
              ]
            "
            @downloadFileItem="
              downloadFileItem(
                activitySingleData?.documents?.sagarpaPackageAgriculture?.[0]
              )
            "
          />
          <UploadBox
            v-if="
              activitySingleData?.documents &&
              activitySingleData?.documents?.profepaPackageEnvironmental?.length
            "
            :isUploadMode="false"
            :filePreview="
              activitySingleData?.documents &&
              activitySingleData?.documents?.profepaPackageEnvironmental[0]
            "
            title="PROFEPA PACKAGE (ENVIRONMENTAL)"
            :fileTypes="
              fileTypes[
                activitySingleData?.documents?.profepaPackageEnvironmental?.[0]
              ]
            "
            @downloadFileItem="
              downloadFileItem(
                activitySingleData?.documents?.profepaPackageEnvironmental?.[0]
              )
            "
          />
          <UploadBox
            v-if="
              activitySingleData?.documents &&
              activitySingleData?.documents?.intercambioTrailerRelease?.length
            "
            :isUploadMode="false"
            :filePreview="
              activitySingleData?.documents &&
              activitySingleData?.documents?.intercambioTrailerRelease[0]
            "
            title="INTERCAMBIO (TRAILER RELEASE)"
            :fileTypes="
              fileTypes[
                activitySingleData?.documents?.intercambioTrailerRelease?.[0]
              ]
            "
            @downloadFileItem="
              downloadFileItem(
                activitySingleData?.documents?.intercambioTrailerRelease?.[0]
              )
            "
          />
          <UploadBox
            v-if="
              activitySingleData?.documents &&
              activitySingleData?.documents?.sedenaPackage?.length
            "
            :isUploadMode="false"
            :filePreview="
              activitySingleData?.documents &&
              activitySingleData?.documents?.sedenaPackage[0]
            "
            title="SEDENA PACKAGE"
            :fileTypes="
              fileTypes[activitySingleData?.documents?.sedenaPackage?.[0]]
            "
            @downloadFileItem="
              downloadFileItem(
                activitySingleData?.documents?.sedenaPackage?.[0]
              )
            "
          />
          <UploadBox
            v-if="
              activitySingleData?.documents &&
              activitySingleData?.documents?.damagesDiscrepancies?.length
            "
            :isUploadMode="false"
            :filePreview="
              activitySingleData?.documents &&
              activitySingleData?.documents?.damagesDiscrepancies[0]
            "
            title="DAMAGES / DISCREPANCIES"
            :fileTypes="
              fileTypes[
                activitySingleData?.documents?.damagesDiscrepancies?.[0]
              ]
            "
            @downloadFileItem="
              downloadFileItem(
                activitySingleData?.documents?.damagesDiscrepancies?.[0]
              )
            "
          />
        </div>
      </div>
      <!-- <div
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
      </div> -->
    </div>
    <div class="bg-[#E6E6E6] h-[1px] w-full mt-6"></div>
    <div class="mt-5" v-if="activitySingleData?.carrierData">
      <div class="mt-5">
        <CarrierInfo :activitySingleData="activitySingleData" />
        <div
          class="mt-5"
          v-if="
            activitySingleData?.typeOfService?.title === 'Northbound Service' ||
            activitySingleData?.typeOfService?.title === 'Southbound'
          "
        >
          <h1 class="text-[#000000] font-bold text-lg mb-4">
            Carrier documents
          </h1>
          <div
            class="mt-5 grid xxl:grid-cols-6 xl:grid-cols-4 sm:grid-cols-2 grid-cols-2 lg:grid-cols-3 gap-y-5 mb-10"
          >
            <UploadBox
              v-if="userProfile?.companyFormationType === 'MEXICO'"
              v-model="formData.cartaPorteFolio"
              :filePreview="
                cartaPorteFolioPreview ||
                (activitySingleData?.documents &&
                  activitySingleData?.documents?.cartaPorteFolio?.[0]) ||
                null
              "
              @file-selected="handleCartaPorteFolioFile"
              title="CARTA PORTE FOLIO"
              :fileTypes="
                fileTypes[activitySingleData?.documents?.cartaPorteFolio?.[0]]
              "
              @downloadFileItem="
                downloadFileItem(
                  activitySingleData?.documents?.cartaPorteFolio?.[0]
                )
              "
            />

            <UploadBox
              v-model="formData.aceEManifest"
              :filePreview="
                aceEManifestPreview ||
                (activitySingleData?.documents &&
                  activitySingleData?.documents?.aceEManifest?.[0]) ||
                null
              "
              @file-selected="handleAceEManifestFile"
              title="ACE E MANIFEST"
              :fileTypes="
                fileTypes[activitySingleData?.documents?.aceEManifest?.[0]]
              "
              @downloadFileItem="
                downloadFileItem(
                  activitySingleData?.documents?.aceEManifest?.[0]
                )
              "
            />

            <UploadBox
              v-if="
                activitySingleData?.specialRequirements?.some((req) =>
                  req.type.includes('Over Size')
                )
              "
              v-model="formData.oversizePermitCarrier"
              :filePreview="
                oversizePermitCarrierPreview ||
                (activitySingleData?.documents &&
                  activitySingleData?.documents?.oversizePermitCarrier?.[0]) ||
                null
              "
              @file-selected="handleOversizePermitCarrierFile"
              title="OVERSIZE PERMIT CARRIER"
              :fileTypes="
                fileTypes[
                  activitySingleData?.documents?.oversizePermitCarrier?.[0]
                ]
              "
              @downloadFileItem="
                downloadFileItem(
                  activitySingleData?.documents?.oversizePermitCarrier?.[0]
                )
              "
            />
            <UploadBox
              v-if="
                activitySingleData?.specialRequirements?.some((req) =>
                  req.type.includes('Over Weight')
                )
              "
              v-model="formData.overweightPermit"
              :filePreview="
                overweightPermitPreview ||
                (activitySingleData?.documents &&
                  activitySingleData?.documents?.overweightPermit?.[0]) ||
                null
              "
              @file-selected="handleOverweightPermitFile"
              title="OVERWEIGHT PERMIT"
              :fileTypes="
                fileTypes[activitySingleData?.documents?.overweightPermit?.[0]]
              "
              @downloadFileItem="
                downloadFileItem(
                  activitySingleData?.documents?.overweightPermit?.[0]
                )
              "
            />
            <UploadBox
              v-if="
                activitySingleData?.modeOfTransportation?.title === 'Reefer'
              "
              v-model="formData.temperatureControlIn"
              :filePreview="
                temperatureControlInPreview ||
                (activitySingleData?.documents &&
                  activitySingleData?.documents?.temperatureControlIn?.[0]) ||
                null
              "
              @file-selected="handleTemperatureControlInFile"
              title="TEMPERATURE CONTROL IN"
              :fileTypes="
                fileTypes[
                  activitySingleData?.documents?.temperatureControlIn?.[0]
                ]
              "
              @downloadFileItem="
                downloadFileItem(
                  activitySingleData?.documents?.temperatureControlIn?.[0]
                )
              "
            />
            <UploadBox
              v-if="
                activitySingleData?.modeOfTransportation?.title === 'Reefer'
              "
              v-model="formData.temperatureControlOut"
              :filePreview="
                temperatureControlOutPreview ||
                (activitySingleData?.documents &&
                  activitySingleData?.documents?.temperatureControlOut?.[0]) ||
                null
              "
              @file-selected="handleTemperatureControlOutFile"
              title="TEMPERATURE CONTROL OUT"
              :fileTypes="
                fileTypes[
                  activitySingleData?.documents?.temperatureControlOut?.[0]
                ]
              "
              @downloadFileItem="
                downloadFileItem(
                  activitySingleData?.documents?.temperatureControlOut?.[0]
                )
              "
            />

            <UploadBox
              v-model="formData.proofOfDelivery"
              :filePreview="
                proofOfDeliveryPreview ||
                (activitySingleData?.documents &&
                  activitySingleData?.documents?.proofOfDelivery?.[0]) ||
                null
              "
              @file-selected="handleProofOfDeliveryFile"
              title="PROOF OF DELIVERY"
              :fileTypes="
                fileTypes[activitySingleData?.documents?.proofOfDelivery?.[0]]
              "
              @downloadFileItem="
                downloadFileItem(
                  activitySingleData?.documents?.proofOfDelivery?.[0]
                )
              "
            />

            <UploadBox
              v-model="formData.damagesDiscrepancies"
              :filePreview="
                damagesDiscrepanciesPreview ||
                (activitySingleData?.documents &&
                  activitySingleData?.documents?.damagesDiscrepancies?.[0]) ||
                null
              "
              @file-selected="handleDamagesDiscrepanciesFile"
              title="DAMAGES / DISCREPANCIES"
              :fileTypes="
                fileTypes[
                  activitySingleData?.documents?.damagesDiscrepancies?.[0]
                ]
              "
              @downloadFileItem="
                downloadFileItem(
                  activitySingleData?.documents?.damagesDiscrepancies?.[0]
                )
              "
            />
          </div>
        </div>

        <!-- <div class="mt-4">
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
        </div> -->
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
        Operator location is waiting for assignment
      </p>
      <GoogleMap
        :addressDetails="location"
        height="300px"
        :isMarkerEnabled="false"
        :isShowMarker="location?.lat && location?.long ? true : false"
        :pickUpAddressData="activitySingleData?.pickUpAddressData"
        :dropAddressData="activitySingleData?.dropAddressData"
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

    <loading
      :active="isLoader"
      :is-full-page="true"
      color="#007BFF"
      loader="bars"
      :height="70"
      :width="70"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  layout: "dashboard",
  data() {
    return {
      isLoader: false,
      isShareReviewModal: false,
      isProofOfPhotography: false,
      isUploadComplete: false,
      location: {},
      fileTypes: {},
      formData: {
        cartaPorteFolio: null,
        aceEManifest: null,
        oversizePermitCarrier: null,
        overweightPermit: null,
        temperatureControlIn: null,
        temperatureControlOut: null,
        proofOfDelivery: null,
        damagesDiscrepancies: null,
      },
      cartaPorteFolioPreview: null,
      aceEManifestPreview: null,
      oversizePermitCarrierPreview: null,
      overweightPermitPreview: null,
      temperatureControlInPreview: null,
      temperatureControlOutPreview: null,
      proofOfDeliveryPreview: null,
      damagesDiscrepanciesPreview: null,
    };
  },
  watch: {
    activitySingleData: {
      deep: true,
      handler(item) {
        const qrCode = Array.isArray(item?.qrCode) ? item.qrCode : [];
        const documents =
          item?.documents && Object.keys(item.documents).length > 0
            ? Object.values(item.documents).flat()
            : [];

        this.checkFileTypes([...qrCode, ...documents]);
      },
    },
  },
  computed: {
    ...mapGetters({
      activitySingleData: "activity/getSingleActivity",
      userProfile: "auth/getUserProfile",
    }),
  },
  methods: {
    ...mapActions({
      fetchSingleActivity: "activity/fetchSingleActivity",
      createRating: "activity/createRating",
      uploadFile: "activity/uploadFile",
      movementComplete: "activity/movementComplete",
      fetchLocation: "activity/fetchLocation",
      uploadDocuments: "activity/uploadDocuments",
    }),
    async handleCartaPorteFolioFile(file) {
      this.formData.cartaPorteFolio = file;
      this.cartaPorteFolioPreview = file ? URL.createObjectURL(file) : null;
      await this.uploadDocumentFiles("cartaPorteFolio", file);
    },

    async handleAceEManifestFile(file) {
      this.formData.aceEManifest = file;
      this.aceEManifestPreview = file ? URL.createObjectURL(file) : null;
      await this.uploadDocumentFiles("aceEManifest", file);
    },

    async handleOversizePermitCarrierFile(file) {
      this.formData.oversizePermitCarrier = file;
      this.oversizePermitCarrierPreview = file
        ? URL.createObjectURL(file)
        : null;
      await this.uploadDocumentFiles("oversizePermitCarrier", file);
    },

    async handleOverweightPermitFile(file) {
      this.formData.overweightPermit = file;
      this.overweightPermitPreview = file ? URL.createObjectURL(file) : null;
      await this.uploadDocumentFiles("overweightPermit", file);
    },

    async handleTemperatureControlInFile(file) {
      this.formData.temperatureControlIn = file;
      this.temperatureControlInPreview = file
        ? URL.createObjectURL(file)
        : null;
      await this.uploadDocumentFiles("temperatureControlIn", file);
    },

    async handleTemperatureControlOutFile(file) {
      this.formData.temperatureControlOut = file;
      this.temperatureControlOutPreview = file
        ? URL.createObjectURL(file)
        : null;
      await this.uploadDocumentFiles("temperatureControlOut", file);
    },

    async handleProofOfDeliveryFile(file) {
      this.formData.proofOfDelivery = file;
      this.proofOfDeliveryPreview = file ? URL.createObjectURL(file) : null;
      await this.uploadDocumentFiles("proofOfDelivery", file);
    },

    async handleDamagesDiscrepanciesFile(file) {
      this.formData.damagesDiscrepancies = file;
      this.damagesDiscrepanciesPreview = file
        ? URL.createObjectURL(file)
        : null;
      await this.uploadDocumentFiles("damagesDiscrepancies", file);
    },

    async uploadDocumentFiles(fileName, file) {
      try {
        const formData = new FormData();
        formData.append(fileName, file);
        formData.append("movementId", this.movementId);

        const res = await this.uploadDocuments({
          id: this.movementId,
          data: formData,
        });

        this.$toast.open({
          message: res.msg,
          type: "success",
        });

        await this.getSingleTransitInfo();
      } catch (error) {
        console.error(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },

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
      this.isLoader = true;
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
        this.isLoader = false;
        await this.getSingleTransitInfo();
      } catch (error) {
        this.isLoader = false;
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      } finally {
        this.isLoader = false;
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
      this.isLoader = true;
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
        this.isLoader = false;
      } catch (error) {
        this.isLoader = false;
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      } finally {
        this.isLoader = false;
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
      this.isLoader = true;
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
        this.isLoader = false;
      } catch (error) {
        this.isLoader = false;
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      } finally {
        this.isLoader = false;
      }
    },
    async getSingleTransitInfo() {
      this.isLoader = true;
      try {
        await this.fetchSingleActivity({
          id: this.movementId,
        });
        this.isLoader = false;
      } catch (error) {
        this.isLoader = false;
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      } finally {
        this.isLoader = false;
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
  async mounted() {
    await this.getSingleTransitInfo();
    await this.getLocation();
  },
  async beforeMount() {
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
