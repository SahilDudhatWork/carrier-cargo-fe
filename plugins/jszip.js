// plugins/jszip.js
import JSZip from "jszip";

export default (context, inject) => {
  // Inject JSZip into the context and Vue instance
  inject("jszip", JSZip);
};
