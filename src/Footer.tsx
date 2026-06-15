function Footer() {
  const navLinks = [
    "Giới thiệu về ALO8",
    "Điều khoản & điều kiện",
    "Chơi có trách nhiệm",
    "Miễn trách nhiệm",
    "Quyền riêng tư",
    "Hướng dẫn nạp rút",
    "Câu hỏi thường gặp",
    "Liên hệ",
  ];

  const desktopIcons = Array.from(
    { length: 12 },
    (_, idx) => `/icon-${idx + 1}.webp`
  );

  const mobileSocialIcons = [
    { src: "/icon-fb.png", alt: "Facebook" },
    { src: "/icon-ytb.png", alt: "YouTube" },
    { src: "/icon-tele.png", alt: "Telegram" },
    { src: "/icon-tiktok.png", alt: "TikTok" },
    { src: "/alo-logo.png", alt: "ALO8" },
  ];

  return (
    <footer className="mt-0 w-full bg-[#1A1A1A] text-white md:mt-[5px]">
      {/* ── Desktop ── */}
      <div className="mx-auto hidden w-10/12 flex-col gap-2 px-6 py-6 text-[13px] md:flex">
        <div className="flex w-full flex-row items-center justify-between gap-4">
          <div className="flex justify-start">
            <img
              src="/banner.webp"
              alt="Footer Banner"
              className="h-auto max-w-[234px] object-contain"
            />
          </div>

          <div className="flex flex-col items-start">
            <div className="flex justify-start">
              <img
                src="/title-alo8.png"
                alt="ALO8 - Nơi vận may đón chờ"
                className="h-auto w-[578px] object-contain pb-4"
              />
            </div>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex flex-col items-start">
                <span
                  className="text-white text-[21.32px] leading-[100%]"
                  style={{
                    fontFamily:
                      "Roboto, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 400,
                  }}
                >
                  Juventus FC & KJC
                </span>
                <span
                  className="text-white text-[21.32px] leading-[100%]"
                  style={{
                    fontFamily:
                      "Roboto, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 400,
                  }}
                >
                  Đối tác chính thức Năm 2025-2026
                </span>
              </div>

              <div className="flex items-center">
                <img
                  src="/juve-kjc.webp"
                  alt="Juventus & KJC"
                  className="h-[64px] w-auto object-contain"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="flex w-[732px] items-stretch gap-4 rounded-xl border border-white border-opacity-10 bg-transparent px-4 py-3">
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <span
                    className="mb-1 block text-[24px] font-extrabold leading-[131%] text-white"
                    style={{ fontWeight: 900 }}
                  >
                    KJC | JUVENTUS – ĐỐI TÁC ĐỘC QUYỀN KHU VỰC CHÂU Á
                  </span>
                  <span className="block text-[15px] leading-snug text-white">
                    <span className="font-semibold">KJC</span> hợp tác độc quyền
                    với <span className="font-semibold">CLB Juventus</span> tại
                    châu Á, đưa thương hiệu vươn tầm quốc tế. Juventus – biểu
                    tượng bóng đá Ý với nhiều danh hiệu lẫy lừng – trở thành đại
                    sứ độc quyền quyền, nâng uy tín...
                  </span>
                </div>
                <div className="mt-2">
                  <button className="text-sm text-white underline transition hover:opacity-80">
                    Ẩn bớt
                  </button>
                </div>
              </div>
              <div className="relative mt-auto mb-auto h-auto w-[246px] flex-shrink-0 overflow-hidden rounded-[8px]">
                <img
                  src="/collab.webp"
                  alt="Collab KJC-Juventus"
                  className="block h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <nav className="flex w-full flex-nowrap items-center justify-between gap-0 text-[17px] font-normal leading-[131%] text-[rgba(134,141,165,1)]">
          {navLinks.map((label, index) => [
            <button
              key={`nav-${index}`}
              className="whitespace-nowrap text-[17px] font-normal transition hover:opacity-80"
            >
              {label}
            </button>,
            index < navLinks.length - 1 && (
              <span key={`sep-${index}`} className="text-[17px]">
                |
              </span>
            ),
          ])}
        </nav>

        <div className="flex w-full flex-nowrap items-center justify-between gap-0 py-2">
          {desktopIcons.map((src, idx) => (
            <div
              key={`desktop-icon-${idx}`}
              className="flex items-center justify-center transition hover:opacity-80"
            >
              <img
                src={src}
                alt={`Footer icon ${idx + 1}`}
                className="h-auto w-[44px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="flex w-full flex-col md:hidden">
        <img
          src="/banner-footer-mb.png"
          alt="ALO8 Footer Banner"
          className="block h-auto w-full"
        />

        <div className="mt-3 bg-[#292929] px-6 py-5">
          <div className="flex items-center justify-center gap-6">
            {mobileSocialIcons.map((icon) => (
              <img
                key={icon.src}
                src={icon.src}
                alt={icon.alt}
                className="h-[32px] w-auto object-contain"
              />
            ))}
          </div>
        </div>

        <div className="px-4 py-4">
          <nav className="flex w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] font-normal leading-[131%] text-[rgba(134,141,165,1)]">
            {navLinks.map((label, index) => [
              <button
                key={`mobile-nav-${index}`}
                className="whitespace-nowrap text-[11px] font-normal transition hover:opacity-80"
              >
                {label}
              </button>,
              index < navLinks.length - 1 && (
                <span key={`mobile-sep-${index}`} className="text-[11px]">
                  |
                </span>
              ),
            ])}
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
