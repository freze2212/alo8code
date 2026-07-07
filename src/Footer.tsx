import "./Footer.css";

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
      {/* ── Desktop / Tablet / Laptop — PC layout thu nhỏ ── */}
      <div className="footer-desktop mx-auto hidden w-10/12 flex-col gap-[clamp(6px,0.5vw,8px)] px-[clamp(12px,1.25vw,24px)] py-[clamp(16px,1.25vw,24px)] text-[clamp(10px,0.68vw,13px)] md:flex">
        <div className="footer-desktop__top-row">
          <div className="footer-desktop__banner-col">
            <img
              src="/banner.webp"
              alt="Footer Banner"
              className="h-auto w-full object-contain"
            />
          </div>

          <div className="footer-desktop__center-col">
            <img
              src="/title-alo8.png"
              alt="ALO8 - Nơi vận may đón chờ"
              className="footer-desktop__title-img"
            />
            <div className="footer-desktop__partner-row">
              <div className="flex flex-col items-start">
                <span className="footer-desktop__partner-text">
                  Juventus FC & KJC
                </span>
                <span className="footer-desktop__partner-text">
                  Đối tác chính thức Năm 2025-2026
                </span>
              </div>

              <img
                src="/juve-kjc.webp"
                alt="Juventus & KJC"
                className="footer-desktop__juve-img"
              />
            </div>
          </div>

          <div className="footer-desktop__kjc-col">
            <div className="footer-desktop__kjc-card">
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <span className="footer-desktop__kjc-title">
                    KJC | JUVENTUS – ĐỐI TÁC ĐỘC QUYỀN KHU VỰC CHÂU Á
                  </span>
                  <span className="footer-desktop__kjc-desc">
                    <span className="font-semibold">KJC</span> hợp tác độc quyền
                    với <span className="font-semibold">CLB Juventus</span> tại
                    châu Á, đưa thương hiệu vươn tầm quốc tế. Juventus – biểu
                    tượng bóng đá Ý với nhiều danh hiệu lẫy lừng – trở thành đại
                    sứ độc quyền quyền, nâng uy tín...
                  </span>
                </div>
                <div className="mt-[clamp(4px,0.5vw,8px)]">
                  <button className="text-[clamp(9px,0.73vw,14px)] text-white underline transition hover:opacity-80">
                    Ẩn bớt
                  </button>
                </div>
              </div>
              <div className="footer-desktop__kjc-collab">
                <img src="/collab.webp" alt="Collab KJC-Juventus" />
              </div>
            </div>
          </div>
        </div>

        <nav className="footer-desktop__nav">
          {navLinks.map((label, index) => [
            <button
              key={`nav-${index}`}
              className="font-normal transition hover:opacity-80"
            >
              {label}
            </button>,
            index < navLinks.length - 1 && (
              <span key={`sep-${index}`}>|</span>
            ),
          ])}
        </nav>

        <div className="footer-desktop__icons">
          {desktopIcons.map((src, idx) => (
            <div
              key={`desktop-icon-${idx}`}
              className="flex items-center justify-center transition hover:opacity-80"
            >
              <img
                src={src}
                alt={`Footer icon ${idx + 1}`}
                className="footer-desktop__icon"
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
