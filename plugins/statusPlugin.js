export default (ctx, inject) => {
  const checkQr = (status) => {
    return status !== "NewAssignments" && status !== "Pending";
  };
  const checkProofOfPhotography = (status) => {
    return status === "Completed";
  };
  const checkUserUpload = (status) => {
    return status !== "NewAssignments";
  };

  inject("checkQr", checkQr);
  inject("checkUserUpload", checkUserUpload);
  inject("checkProofOfPhotography", checkProofOfPhotography);
};
