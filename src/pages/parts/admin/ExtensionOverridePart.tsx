import { t } from "i18next";
import { useEffect, useState } from "react";

import { Button } from "@/components/buttons/Button";
import { Icon, Icons } from "@/components/Icon";
import { Box } from "@/components/layout/Box";
import { Heading2 } from "@/components/utils/Text";

const EXTENSION_OVERRIDE_KEY = "___dev_extension_override";

export function ExtensionOverridePart() {
  const [isOverrideEnabled, setIsOverrideEnabled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(EXTENSION_OVERRIDE_KEY);
    setIsOverrideEnabled(stored === "true");
  }, []);

  const toggleOverride = () => {
    const newState = !isOverrideEnabled;
    setIsOverrideEnabled(newState);

    if (newState) {
      localStorage.setItem(EXTENSION_OVERRIDE_KEY, "true");
    } else {
      localStorage.removeItem(EXTENSION_OVERRIDE_KEY);
    }

    // Refresh the page to apply the change
    window.location.reload();
  };

  return (
    <>
      <Heading2 className="mb-8 mt-12">
        {t("settings.account.admin.extensionOverride.title")}
      </Heading2>
      <Box>
        <div className="w-full flex gap-6 justify-between items-center">
          <div className="flex-1">
            <p className="text-sm">
              {t("settings.account.admin.extensionOverride.text")}
            </p>
            {isOverrideEnabled && (
              <p className="flex items-center text-md mt-2">
                <Icon
                  icon={Icons.CIRCLE_CHECK}
                  className="text-video-scraping-success mr-2"
                />
                {t("settings.account.admin.extensionOverride.enabled")}
              </p>
            )}
          </div>
          <Button
            theme={isOverrideEnabled ? "danger" : "purple"}
            onClick={toggleOverride}
            className="whitespace-nowrap"
          >
            {isOverrideEnabled
              ? t("settings.account.admin.extensionOverride.buttonDisabled")
              : t("settings.account.admin.extensionOverride.button")}
          </Button>
        </div>
      </Box>
    </>
  );
}
