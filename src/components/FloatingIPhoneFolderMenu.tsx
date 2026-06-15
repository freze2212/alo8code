import * as React from "react";

type FloatingMenuItem = {
  key: string;
  href?: string;
  iconSrc?: string;
  icon?: React.ReactNode;
  newTab?: boolean;
  onClick?: () => void;
};

type FloatingIPhoneFolderMenuProps = {
  items?: FloatingMenuItem[];
  storageKey?: string;
};

type Position = {
  x: number;
  y: number;
};

type DragState = {
  dragging: boolean;
  pointerId: number;
  startX: number;
  startY: number;
  startPosX: number;
  startPosY: number;
  moved: boolean;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function FloatingIPhoneFolderMenu({
  items,
  storageKey = "alo8_floating_home_pos",
}: FloatingIPhoneFolderMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [homeHref, setHomeHref] = React.useState(
    "https://mb-mm88-link.alo8tino.workers.dev/",
  );
  const [pos, setPos] = React.useState<Position | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const BTN_SIZE = 60;
  const BTN_R = BTN_SIZE / 2;

  const dragRef = React.useRef<DragState>({
    dragging: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    startPosX: 0,
    startPosY: 0,
    moved: false,
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const detect = () => {
      const byWidth =
        window.matchMedia?.("(max-width: 767px)")?.matches ?? false;
      const byUA =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );

      const isMobile = byWidth || byUA;
      setHomeHref(
        isMobile
          ? "https://mb-alo8-link.alo8tino.workers.dev/"
          : "https://pc-alo8-link.alo8tino.workers.dev/",
      );
    };

    detect();
    window.addEventListener("resize", detect);
    return () => window.removeEventListener("resize", detect);
  }, []);

  const defaultItems = React.useMemo<FloatingMenuItem[]>(
    () => [
      {
        key: "CSKH",
        href: "https://alo8cskh.pages.dev/",
        iconSrc: "/IconChat.png",
      },
      {
        key: "tele-vip",
        href: "https://alo8note.com/notebook/",
        iconSrc: "/trangcamnang.png",
      },
      {
        key: "tele-club",
        href: "https://alo8code.com",
        iconSrc: "/code.png",
      },
      {
        key: "nhan-code",
        href: "https://alo8lotto.com/",
        iconSrc: "/maduthuong.png",
      },
      {
        key: "home",
        href: homeHref,
        newTab: false,
        iconSrc: "/home.png",
      },
      {
        key: "huong-dan",
        href: "https://alo8ttkm.com/",
        iconSrc: "/khuyenmai.png",
      },
      {
        key: "videosukien",
        href: "https://alo8video.com/",
        iconSrc: "/trangvideosukien.png",
      },
      {
        key: "thien-nguyen",
        href: "https://alo8thiennguyen.com/",
        iconSrc: "/trangthiennguyen.png",
      },
      {
        key: "qua-tang",
        href: "https://alo8gifts.com/",
        iconSrc: "/trangquatang.png",
      },
    ],
    [homeHref],
  );

  const list = items?.length ? items : defaultItems;

  React.useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const isDesktopSize = w >= 768;
    const marginX = isDesktopSize ? 40 : 8;
    const marginY = isDesktopSize ? 40 : 16;

    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const v = JSON.parse(raw) as Partial<Position>;
        if (typeof v?.x === "number" && typeof v?.y === "number") {
          const clampedX = clamp(v.x, BTN_R + marginX, w - BTN_R - marginX);
          const clampedY = clamp(v.y, BTN_R + marginY, h - BTN_R - marginY);
          setPos({ x: clampedX, y: clampedY });
          return undefined;
        }
      }
    } catch {
      // Ignore invalid persisted position values.
    }

    const defaultX = w - (BTN_R + marginX);
    const defaultY = h - (BTN_R + marginY);
    setPos({ x: defaultX, y: defaultY });
    return undefined;
  }, [storageKey, BTN_R]);

  React.useEffect(() => {
    if (typeof window === "undefined" || !pos) return undefined;

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isDesktopSize = w >= 768;
      const marginX = isDesktopSize ? 40 : 8;
      const marginY = isDesktopSize ? 40 : 16;

      const x = clamp(pos.x, BTN_R + marginX, w - BTN_R - marginX);
      const y = clamp(pos.y, BTN_R + marginY, h - BTN_R - marginY);
      setPos({ x, y });
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [pos, BTN_R]);

  React.useEffect(() => {
    if (!open) return undefined;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!pos) return;

    dragRef.current.dragging = true;
    dragRef.current.pointerId = e.pointerId;
    dragRef.current.startX = e.clientX;
    dragRef.current.startY = e.clientY;
    dragRef.current.startPosX = pos.x;
    dragRef.current.startPosY = pos.y;
    dragRef.current.moved = false;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore unsupported pointer capture implementations.
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragRef.current.dragging) return;
    if (dragRef.current.pointerId !== e.pointerId) return;
    if (typeof window === "undefined") return;

    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;

    if (!dragRef.current.moved && Math.hypot(dx, dy) > 6) {
      dragRef.current.moved = true;
      setIsDragging(true);
    }

    const w = window.innerWidth;
    const h = window.innerHeight;
    const isDesktopSize = w >= 768;
    const marginX = isDesktopSize ? 40 : 8;
    const marginY = isDesktopSize ? 40 : 16;

    const nextX = clamp(
      dragRef.current.startPosX + dx,
      BTN_R + marginX,
      w - BTN_R - marginX,
    );
    const nextY = clamp(
      dragRef.current.startPosY + dy,
      BTN_R + marginY,
      h - BTN_R - marginY,
    );

    setPos({ x: nextX, y: nextY });
  };

  const onPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (dragRef.current.pointerId !== e.pointerId) return;

    const moved = dragRef.current.moved;

    dragRef.current.dragging = false;
    dragRef.current.pointerId = -1;

    setIsDragging(false);

    if (moved && typeof window !== "undefined" && pos) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isDesktopSize = w >= 768;
      const marginX = isDesktopSize ? 40 : 8;
      const marginY = isDesktopSize ? 40 : 16;

      const leftX = BTN_R + marginX;
      const rightX = w - BTN_R - marginX;

      const snapX = pos.x < w / 2 ? leftX : rightX;
      const snapY = clamp(pos.y, BTN_R + marginY, h - BTN_R - marginY);

      const snapped = { x: snapX, y: snapY };
      setPos(snapped);

      try {
        localStorage.setItem(storageKey, JSON.stringify(snapped));
      } catch {
        // Ignore storage failures.
      }
    } else {
      if (pos) {
        try {
          localStorage.setItem(storageKey, JSON.stringify(pos));
        } catch {
          // Ignore storage failures.
        }
      }

      if (!moved) setOpen((v) => !v);
    }

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore unsupported pointer capture implementations.
    }
  };

  if (!pos) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Home menu"
        className={[
          "fixed z-[99998]",
          "w-[60px] h-[60px]",
          "rounded-full overflow-visible",
          "bg-transparent border-0 shadow-none",
          "active:scale-[0.96] transition-all duration-150",
          "select-none touch-none",
        ].join(" ")}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: "translate(-50%, -50%)",
          WebkitTapHighlightColor: "transparent",
          transition: isDragging
            ? "none"
            : "left 180ms cubic-bezier(0.2,0.8,0.2,1), top 180ms cubic-bezier(0.2,0.8,0.2,1), transform 150ms, box-shadow 200ms",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <img
          src="/home.png"
          alt=""
          className="pointer-events-none block w-full h-full object-contain select-none"
          draggable={false}
        />
      </button>

      <div
        className={[
          "fixed inset-0 z-[99997]",
          "transition-opacity duration-200",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div
          className="absolute inset-0 bg-black/25"
          onClick={() => setOpen(false)}
        />

        <div
          className="absolute inset-0 flex items-center justify-center p-6"
          onClick={() => setOpen(false)}
        >
          <div
            className={[
              "w-[280px] max-w-[90vw]",
              "md:w-[360px] lg:w-[420px] xl:w-[460px]",
              "px-5 py-5 md:px-6 md:py-6 lg:px-7 lg:py-7",
              "transition-[transform,opacity] duration-220",
              "ease-[cubic-bezier(0.2,0.8,0.2,1)]",
              open
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-[0.92] translate-y-2",
            ].join(" ")}
            style={{
              transformOrigin: "50% 50%",
              backgroundImage: "url('/bgfloatingbutton1.png')",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-3 gap-3 md:gap-2 lg:gap-2">
              {list.map((it, idx) => {
                const content = (
                  <div
                    className={[
                      "transition-[transform,opacity] duration-220",
                      "ease-[cubic-bezier(0.2,0.8,0.2,1)]",
                      open
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-2 scale-[0.96]",
                    ].join(" ")}
                    style={{ transitionDelay: open ? `${idx * 28}ms` : "0ms" }}
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className="
                          w-full h-full
                          grid place-items-center
                          active:scale-[0.97]
                          transition-transform duration-150
                        "
                      >
                        {it.iconSrc ? (
                          <img
                            src={it.iconSrc}
                            alt=""
                            className="w-full h-full"
                          />
                        ) : (
                          <span className="opacity-95 origin-center transform scale-[1.6] md:scale-[2] lg:scale-[2]">
                            {it.icon}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );

                if (it.href) {
                  const isExternal = it.href.startsWith("http");
                  const newTab = it.newTab ?? isExternal;

                  return (
                    <a
                      key={it.key}
                      href={it.href}
                      target={newTab ? "_blank" : undefined}
                      rel={newTab ? "noopener noreferrer" : undefined}
                      onClick={() => setOpen(false)}
                      className="block"
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <button
                    key={it.key}
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      it.onClick?.();
                    }}
                    className="text-left"
                  >
                    {content}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
