export default async function ({ store, route, redirect, from }) {
  try {
    const response = await store.dispatch("auth/checkPermissions");

    if (response && response.data) {
      const roleTitle = response.data.roleTitle;

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
        "/manage-role": { action: "read", permission: "Manage Role" },
        "/manage-role/add-role": { action: "add", permission: "Manage Role" },
        "/manage-role/edit-role": { action: "edit", permission: "Manage Role" },
        "/sub-carrier": { action: "read", permission: "Sub Carrier" },
        "/sub-carrier/add-sub-carrier": {
          action: "add",
          permission: "Sub Carrier",
        },
        "/sub-carrier/edit-sub-carrier": {
          action: "edit",
          permission: "Sub Carrier",
        },
        "/activity": { action: "read", permission: "Activity" },
        "/settings": { action: "read", permission: "Settings" },
        "/dashboard": { action: "read", permission: "Dashboard" },
      };

      let currentPath = route.fullPath;
      if (route.params.pathMatch) {
        currentPath = route.fullPath.replace(`/${route.params.pathMatch}`, "");
      }
      let currentPermission = null;
      currentPermission = currentPath ? permissions[currentPath] : null;

      // for (const path in permissions) {
      //   const regexPattern = path.replace(/:\w+/g, "\\w+");
      //   const regex = new RegExp(`^${regexPattern}$`);

      //   if (regex.test(currentPath)) {
      //     currentPermission = permissions[path];
      //     break;
      //   }
      // }

      if (currentPermission && currentPermission !== null) {
        const { action, permission } = currentPermission;
        const access = store.getters["auth/getSinglePermission"](permission);

        if (!access || !access[action]) {
          history.back();
        }
      } else {
        history.back();
      }
    }
  } catch (error) {
    console.log(error, "error");
  }
}
