import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Icon, Icons } from "@/components/Icon";
import { conf } from "@/setup/config";
import { useBannerStore, useRegisterBanner } from "@/stores/banner";

export function Banner(props: {
  children: React.ReactNode;
  type: "error" | "info";
  id: string;
}) {
  const [ref] = useRegisterBanner<HTMLDivElement>(props.id);
  const hideBanner = useBannerStore((s) => s.hideBanner);
  const styles = {
    error: "bg-[#C93957] text-white",
    info: "bg-[#126FD3] text-white",
  };
  const icons = {
    error: Icons.CIRCLE_EXCLAMATION,
    info: Icons.CIRCLE_EXCLAMATION,
  };

  useEffect(() => {
    const hideBannerFlag = sessionStorage.getItem(`hideBanner-${props.id}`);
    if (hideBannerFlag) {
      hideBanner(props.id, true);
    }
  }, [hideBanner, props.id]);

  return (
    <div ref={ref}>
      <div
        className={[
          styles[props.type],
          "flex items-center justify-center p-1",
        ].join(" ")}
      >
        <div className="flex items-center space-x-3">
          <Icon icon={icons[props.type]} />
          <div>{props.children}</div>
        </div>
        <span
          className="absolute right-4 hover:cursor-pointer"
          onClick={() => {
            hideBanner(props.id, true);
            sessionStorage.setItem(`hideBanner-${props.id}`, "true");
          }}
        >
          <Icon icon={Icons.X} />
        </span>
      </div>
    </div>
  );
}

export function BannerLocation(props: { location?: string }) {
  const { t } = useTranslation();
  const isOnline = useBannerStore((s) => s.isOnline);
  const setLocation = useBannerStore((s) => s.setLocation);
  const ignoredBannerIds = useBannerStore((s) => s.ignoredBannerIds);
  const currentLocation = useBannerStore((s) => s.location);
  const banners = useBannerStore((s) => s.banners);
  const showBanner = useBannerStore((s) => s.showBanner);
  const loc = props.location ?? null;

  useEffect(() => {
    if (!loc) return;
    setLocation(loc);
    return () => {
      setLocation(null);
    };
  }, [setLocation, loc]);

  useEffect(() => {
    const config = conf();
    const customMessage = config.BANNER_MESSAGE;
    const bannerId = config.BANNER_ID || "custom-message";
    const shouldShow = customMessage && loc === null;

    if (shouldShow) {
      showBanner(bannerId);
    }
  }, [loc, showBanner]);

  if (currentLocation !== loc) return null;

  const config = conf();
  const customMessage = config.BANNER_MESSAGE;
  const bannerId = config.BANNER_ID || "custom-message";
  const hasCustomBanner = banners.some((b) => b.id === bannerId);

  return (
    <div>
      {!isOnline && !ignoredBannerIds.includes("offline") ? (
        <Banner id="offline" type="error">
          {t("navigation.banner.offline")}
        </Banner>
      ) : null}
      {hasCustomBanner && customMessage ? (
        <Banner id={bannerId} type="info">
          {customMessage}
        </Banner>
      ) : null}
    </div>
  );
}
