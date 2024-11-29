export default async function ({ store, route, redirect, from }) {
  try {
    const response = await store.dispatch("auth/checkPermissions");

    if (response && response.data) {
      const roleTitle = response.data;

      if (roleTitle === "Full Permission") {
        return;
      }

      const permissions = {
        "/operator": { action: "read", permission: "Operator" },
        "/operator/add-operator": { action: "add", permission: "Operator" },
        "/operator/edit-operator": { action: "edit", permission: "Operator" },
        "/vehicle": { action: "read", permission: "Vehicle" },
        "/vehicle/add-vehicle": { action: "add", permission: "Vehicle" },
        "/vehicle/edit-vehicle": { action: "edit", permission: "Vehicle" },
        "/activity": { action: "read", permission: "Activity" },
        "/settings": { action: "read", permission: "Settings" },
        "/dashboard": { action: "read", permission: "Dashboard" },
      };

      const currentPath = route.fullPath;
      const currentPermission = permissions[currentPath];

      if (currentPermission) {
        const { action, permission } = currentPermission;
        const access = store.getters["auth/getSinglePermission"](permission);

        if (!access[action]) {
          history.back();
        }
      }
    }
  } catch (error) {
    console.log(error, "error");
  }
}
