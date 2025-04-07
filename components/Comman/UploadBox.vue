<template>
  <div>
    <span class="text-sm font-semibold text-[#393939]">{{ title }}</span>
    <div
      class="rounded-xl w-[84px] h-[84px] flex justify-center items-center cursor-pointer relative mt-2"
      @click="triggerFileInputClick"
      :class="{
        'border-[#8F9AA9] border-dashed border-2':
          !filePreviewLocal && !errorMessage,
        'border-dashed border-red-500 border-2': errorMessage,
      }"
    >
      <img
        src="@/static/svg/image-close.svg"
        v-if="filePreviewLocal && isUploadMode"
        class="object-cover absolute top-[-11px] right-[-11px]"
        @click.stop="removeImage"
      />

      <img
        v-if="fileTypesLocal === 'application/pdf' || fileTypesLocal === 'pdf'"
        src="@/static/svg/pdf.svg"
        alt="PDF Preview"
        class="w-full h-full object-cover rounded-[10px]"
        @click="$emit('downloadFileItem')"
      />
      <img
        v-else-if="
          fileTypesLocal === 'application/msword' ||
          fileTypesLocal ===
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          fileTypesLocal === 'doc' ||
          fileTypesLocal === 'docx' ||
          fileTypesLocal === 'document'
        "
        src="@/static/svg/doc.svg"
        alt="DOC Preview"
        class="w-full h-full object-cover rounded-[10px]"
        @click="$emit('downloadFileItem')"
      />

      <img
        v-else-if="
          fileTypesLocal === 'application/vnd.ms-excel' ||
          fileTypesLocal ===
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          fileTypesLocal === 'xls' ||
          fileTypesLocal === 'xlsx'
        "
        src="@/static/svg/xls.svg"
        alt="XLS Preview"
        class="w-full h-full object-cover rounded-[10px]"
        @click="$emit('downloadFileItem')"
      />

      <img
        v-else-if="fileTypesLocal === 'text/plain' || fileTypesLocal === 'txt'"
        src="@/static/svg/txt.svg"
        alt="TXT Preview"
        class="w-full h-full object-cover rounded-[10px]"
        @click="$emit('downloadFileItem')"
      />
      <img
        v-else-if="
          fileTypesLocal?.includes('image') ||
          fileTypesLocal === 'jpg' ||
          fileTypesLocal === 'jpeg' ||
          fileTypesLocal === 'png' ||
          fileTypesLocal === 'gif' ||
          fileTypesLocal === 'webp'
        "
        :src="filePreviewLocal"
        alt="Image Preview"
        class="w-full h-full object-cover rounded-[10px]"
        @click="$emit('downloadFileItem')"
      />

      <img v-else src="@/static/svg/image.svg" alt="Upload Image" />
    </div>
    <input
      v-if="!filePreviewLocal"
      type="file"
      ref="fileInput"
      style="display: none"
      @change="handleFileChange"
    />
    <div v-if="errorMessage" class="text-red-500 text-xs mt-2">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    filePreview: {
      type: String,
    },
    fileTypes: {
      type: String,
    },
    isUploadMode: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      errorMessage: null,
      filePreviewLocal: this.filePreview,
      fileTypesLocal: this.fileTypes,
    };
  },
  watch: {
    filePreview(newVal) {
      this.filePreviewLocal = newVal;
    },
    fileTypes(newVal) {
      this.fileTypesLocal = newVal;
    },
  },
  methods: {
    triggerFileInputClick() {
      if (this.$refs.fileInput) {
        this.$refs.fileInput.click();
      }
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (!file) return;

      const allowedMimeTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/plain",
        "image/jpeg",
        "image/jpg",
        "image/png",
      ];

      const allowedExtensions = [
        "pdf",
        "doc",
        "docx",
        "xls",
        "xlsx",
        "txt",
        "jpg",
        "jpeg",
        "png",
      ];

      const fileExtension = file.name.split(".").pop().toLowerCase();
      const isMimeValid = allowedMimeTypes.includes(file.type);
      const isExtensionValid = allowedExtensions.includes(fileExtension);

      if (isMimeValid && isExtensionValid) {
        this.errorMessage = null;
        this.filePreviewLocal = URL.createObjectURL(file);
        this.fileTypesLocal = file.type || fileExtension;
        this.$emit("file-selected", file);
      } else {
        this.errorMessage = `Invalid file type. Only XLS, XLSX, TXT, DOC, DOCX, JPG, JPEG, PNG, and PDF are allowed.`;
        this.filePreviewLocal = null;
        this.fileTypesLocal = null;
      }
    },
    removeImage() {
      this.filePreviewLocal = null;
      this.fileTypesLocal = null;
    },
  },
};
</script>
