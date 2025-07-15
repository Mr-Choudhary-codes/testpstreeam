import { isAllowedExtensionVersion } from "@/backend/extension/compatibility";
import { extensionInfo } from "@/backend/extension/messaging";

export type ExtensionStatus =
  | "unknown"
  | "failed"
  | "disallowed"
  | "noperms"
  | "outdated"
  | "success";

const EXTENSION_OVERRIDE_KEY = "___dev_extension_override";

function isExtensionOverrideEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(EXTENSION_OVERRIDE_KEY) === "true";
}

export async function getExtensionState(): Promise<ExtensionStatus> {
  if (isExtensionOverrideEnabled()) return "success";
  const info = await extensionInfo();
  if (!info) return "unknown"; // cant talk to extension
  if (!info.success) return "failed"; // extension failed to respond
  if (!info.allowed) return "disallowed"; // extension is not enabled on this page
  if (!info.hasPermission) return "noperms"; // extension has no perms to do it's tasks
  if (!isAllowedExtensionVersion(info.version)) return "outdated"; // extension is too old
  return "success"; // no problems
}
