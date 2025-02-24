export default async (ctx, inject) => {
  const validatePhoneNumber = async (number) => {
    const phonePattern = /^\d{10}$/;
    if (number && !phonePattern.test(number)) {
      return false;
    }
    return true;
  };
  const validateNumber = async (value) => {
    let number = value.replace(/\D/g, "");

    if (number.length > 10) {
      number = number.slice(0, 10);
    }
    return number;
  };

  const validateFormData = async ({ form, isEdit }) => {
    const errors = {};
    const isEmpty = (value) => {
      return typeof value === "string" ? value.trim() === "" : !value;
    };
    const setError = (fieldName, message) => {
      errors[fieldName] = message;
    };

    const validateField = (field, fieldName, errorLabel) => {
      if (isEmpty(field)) {
        setError(fieldName, `${errorLabel} is required`);
      }
    };

    validateField(form.companyName, "companyName", "company-name");
    validateField(form.contactName, "contactName", "contact-name");
    validateField(form.contactNumber, "contactNumber", "contact-number");
    if (!isEdit) {
      validateField(form.password, "password", "password");
      validateField(
        form.confirmPassword,
        "confirmPassword",
        "confirm-password"
      );
    }
    validateField(form.email, "email", "email");

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("email", "Invalid email format");
    }
    if (!(await validatePhoneNumber(form.contactNumber))) {
      setError("contactNumber", "Invalid contact-number format");
    }
    if (!isEdit) {
      if (form.password !== form.confirmPassword) {
        setError("confirmPassword", "Passwords do not match.");
      }
    }
    // if (!form.scac) {
    //   setError("scac", "scac is required");
    // }
    // if (!form.caat) {
    //   setError("caat", "Caat is required");
    // }
    // if (!form.insurancePolicy) {
    //   setError("insurancePolicy", "InsurancePolicy is required");
    // }
    // if (!form.oea) {
    //   setError("oea", "Oea is required");
    // }
    // if (!form.ctpat) {
    //   setError("ctpat", "Ctpat is required");
    // }

    if (form.companyFormationType === "USA") {
      if (!form.companyFormation.usa.w9_Form) {
        setError("w9_Form", "W9 Form is required");
      }
      if (!form.companyFormation.usa.utility_Bill) {
        setError("utility_Bill", "Utility Bill is required");
      }
    } else if (form.companyFormationType === "MEXICO") {
      if (!form.companyFormation.maxico.copia_Rfc_Form) {
        setError("copia_Rfc_Form", "Copia Rfc Form is required");
      }
      if (!form.companyFormation.maxico.constance_Of_Fiscal_Situation) {
        setError(
          "constance_Of_Fiscal_Situation",
          "Constance Of Fiscal Situation is required"
        );
      }
      if (!form.companyFormation.maxico.proof_of_Favorable) {
        setError("proof_of_Favorable", "Proof Of Favorable is required");
      }
      if (!form.companyFormation.maxico.proof_Of_Address) {
        setError("proof_Of_Address", "Proof Of Address is required");
      }
    }

    form.commercialReference.forEach(async (ref, index) => {
      if (
        ref.companyName ||
        ref.contactName ||
        ref.emailAddress ||
        ref.contactNo
      ) {
        validateField(
          ref.companyName,
          `commercialReference[${index}].companyName`,
          "company-name"
        );
        validateField(
          ref.contactName,
          `commercialReference[${index}].contactName`,
          "contact-name"
        );
        validateField(
          ref.emailAddress,
          `commercialReference[${index}].emailAddress`,
          "email"
        );
        if (
          ref.emailAddress &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ref.emailAddress)
        ) {
          setError(
            `commercialReference[${index}].emailAddress`,
            "Invalid email format"
          );
        }
        validateField(
          ref.contactNo,
          `commercialReference[${index}].contactNo`,
          "contact-number"
        );
      }
      if (!(await validatePhoneNumber(ref.contactNo))) {
        setError(
          `commercialReference[${index}].contactNo`,
          "Invalid contact-number format"
        );
      }
    });

    return errors;
  };

  const validateOperatorField = async ({ form }) => {
    const errors = {};
    const isEmpty = (value) => {
      return typeof value === "string" ? value.trim() === "" : !value;
    };
    const setError = (fieldName, message) => {
      errors[fieldName] = message;
    };

    const validateField = (field, fieldName, errorLabel) => {
      if (isEmpty(field)) {
        setError(fieldName, `${errorLabel} is required`);
      }
    };

    validateField(form.operatorName, "operatorName", "operator-name");
    validateField(form.operatorNumber, "operatorNumber", "operator-number");
    validateField(form.mxIdBadge, "mxIdBadge", "mx-id-badge");
    validateField(
      form.mxIdBadgeExpirationDate,
      "mxIdBadgeExpirationDate",
      "license-expiration-date"
    );
    validateField(form.fastId, "fastId", "fast-id");
    validateField(
      form.fastIdExpirationDate,
      "fastIdExpirationDate",
      "fast-id-expiration-date"
    );
    validateField(
      form.mxDriversLicense,
      "mxDriversLicense",
      "mx-drivers-license"
    );
    validateField(
      form.mxDriversLicenseExpirationDate,
      "mxDriversLicenseExpirationDate",
      "mx-drivers-license-expiration-date"
    );
    validateField(
      form.usDriversLicense,
      "usDriversLicense",
      "us-drivers-license"
    );
    validateField(
      form.usDriversLicenseExpirationDate,
      "usDriversLicenseExpirationDate",
      "us-drivers-license-expiration-date"
    );
    validateField(
      form.visaExpirationDate,
      "visaExpirationDate",
      "visa-expiration-date"
    );
    validateField(
      form.customsBadgeExpirationDate,
      "customsBadgeExpirationDate",
      "customs-badge-expiration-date"
    );

    if (!(await validatePhoneNumber(form.operatorNumber))) {
      setError("operatorNumber", "Invalid operator-number format");
    }

    return errors;
  };
  const validateVehicleField = async ({ form }) => {
    const errors = {};
    const isEmpty = (value) => {
      return typeof value === "string" ? value.trim() === "" : !value;
    };
    const setError = (fieldName, message) => {
      errors[fieldName] = message;
    };

    const validateField = (field, fieldName, errorLabel) => {
      if (isEmpty(field)) {
        setError(fieldName, `${errorLabel} is required`);
      }
    };

    validateField(form.vehicleName, "vehicleName", "vehicle-name");
    validateField(form.mxPlates, "mxPlates", "mx-plates");
    validateField(
      form.mxPlatesExpirationDate,
      "mxPlatesExpirationDate",
      "mx-plates-expiration-date"
    );
    validateField(form.usPlates, "usPlates", "us-plates");
    validateField(
      form.usPlatesExpirationDate,
      "usPlatesExpirationDate",
      "us-plates-expiration-date"
    );
    validateField(
      form.mxInsurancePlates,
      "mxInsurancePlates",
      "mx-insurance-plates"
    );
    validateField(
      form.mxInsurancePlatesExpirationDate,
      "mxInsurancePlatesExpirationDate",
      "mx-insurance-plates-expiration-date"
    );
    validateField(
      form.usInsurancePlates,
      "usInsurancePlates",
      "us-insurance-plates"
    );
    validateField(
      form.usInsurancePlatesExpirationDate,
      "usInsurancePlatesExpirationDate",
      "us-insurance-plates-expiration-date"
    );

    if (!(await validatePhoneNumber(form.operatorNumber))) {
      setError("operatorNumber", "Invalid operator-number format");
    }

    return errors;
  };

  const validateActivityModal = async ({ form, fieldsToValidate }) => {
    const errors = [];
    const isEmpty = (value) => {
      return typeof value === null || value === "string"
        ? value.trim() === ""
        : !value;
    };

    const setError = (fieldName, message) => {
      errors[fieldName] = message;
    };

    const validateField = (field, fieldName, errorLabel) => {
      if (isEmpty(field)) {
        setError(`${fieldName}`, `${errorLabel} is required`);
      }
    };
    if (fieldsToValidate.includes("carrierReference")) {
      validateField(
        form?.carrierReference,
        "carrierReference",
        "carrier reference"
      );
    }
    if (fieldsToValidate.includes("selectedOperator")) {
      validateField(
        form.selectedOperator,
        "selectedOperator",
        "selectedOperator"
      );
    }
    if (fieldsToValidate.includes("selectedVehicle")) {
      validateField(form.selectedVehicle, "selectedVehicle", "selectedVehicle");
    }
    return errors;
  };

  const validateRole = async ({ form }) => {
    const errors = [];

    const isEmpty = (value) => {
      return typeof value === "string" ? value.trim() === "" : !value;
    };

    const setError = (fieldName, message) => {
      errors[fieldName] = message;
    };

    if (isEmpty(form.roleTitle)) {
      setError("roleTitle", "role-title is required");
    }

    return errors;
  };

  const validateSubCarrierForm = async ({
    form,
    isEdit = false,
    selectedLabel,
  }) => {
    const errors = {};
    const isEmpty = (value) => {
      return typeof value === "string" ? value.trim() === "" : !value;
    };
    const setError = (fieldName, message) => {
      errors[fieldName] = message;
    };

    const validateField = (field, fieldName, errorLabel) => {
      if (isEmpty(field)) {
        setError(fieldName, `${errorLabel} is required`);
      }
    };

    validateField(form.contactName, "contactName", "contact-name");
    validateField(form.contactNumber, "contactNumber", "contact-number");
    validateField(form.email, "email", "email");
    if (!isEdit) {
      validateField(form.password, "password", "password");
    }
    if (selectedLabel === "Select option") {
      setError("selectedLabel", "Please select an option");
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("email", "Invalid email format");
    }
    if (!(await validatePhoneNumber(form.contactNumber))) {
      setError("contactNumber", "Invalid contact-number format");
    }

    return errors;
  };

  inject("validateFormData", validateFormData);
  inject("validateOperatorField", validateOperatorField);
  inject("validateVehicleField", validateVehicleField);
  inject("validateActivityModal", validateActivityModal);
  inject("validateSubCarrierForm", validateSubCarrierForm);
  inject("validateRole", validateRole);
  inject("validateNumber", validateNumber);
};
