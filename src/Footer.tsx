function Footer() {
  const navLinks = [
    "Giới thiệu về RR88",
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

  const mobileIcons = [
    "/icon-1.webp",
    "/icon-2.webp",
    "/icon-3.webp",
    "/icon-4.webp",
    "/icon-5.webp",
    "/icon-6.webp",
    "/icon-7.webp",
    "/icon-8.webp",
    "/icon-9.webp",
    "/icon-fb.png",
    "/icon-ytb.png",
    "/icon-tele.png",
  ];

  return (
    <footer className="w-full sm:mt-0 bg-[rgba(13,19,41,1)] mt-[80px] bg-gradient-to-b from-[rgba(13,19,41,1)] via-[rgba(16,31,83,1)] to-[rgba(13,19,41,1)] text-white">
      <div className="mx-auto flex w-full sm:w-11/12 md:w-10/12 flex-col gap-3 sm:gap-2 py-4 sm:py-5 md:py-6 px-4 sm:px-6 text-[11px] sm:text-[12px] md:text-[13px]">
        {/* Top desktop */}
        <div className="hidden md:flex w-full flex-row items-center justify-between gap-4">
          {/* Banner */}
          <div className="flex justify-start">
            <img
              src="/banner.webp"
              alt="Footer Banner"
              className="h-auto max-w-[234px] object-contain"
            />
          </div>

          {/* Slogan + Partner */}
          <div className="flex flex-col items-start">
            <div className="flex justify-start">
              <img
                src="/slogan.webp"
                alt="Footer Slogan"
                className="h-auto w-[578px] object-contain pb-4"
              />
            </div>
            <div className="mt-2 flex items-center gap-4">
              {/* Text block */}
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

              {/* Logo block */}
              <div className="flex items-center">
                <img
                  src="/juve-kjc.webp"
                  alt="Juventus & KJC"
                  className="h-[64px] w-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Collab Info */}
          <div className="flex justify-end">
            <div
              className="border border-white border-opacity-10 rounded-xl px-4 py-3 flex items-stretch gap-4 w-[732px]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(25,38,85,1) 0%, rgba(35,85,146,1) 100%)",
              }}
            >
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span
                    className="block text-white font-extrabold text-[24px] leading-[131%] mb-1"
                    style={{ fontWeight: 900 }}
                  >
                    KJC | JUVENTUS – ĐỐI TÁC ĐỘC QUYỀN KHU VỰC CHÂU Á
                  </span>
                  <span className="block text-white text-[15px] leading-snug">
                    <span className="font-semibold">KJC</span> hợp tác độc quyền
                    với <span className="font-semibold">CLB Juventus</span> tại
                    châu Á, đưa thương hiệu vươn tầm quốc tế. Juventus – biểu
                    tượng bóng đá Ý với nhiều danh hiệu lẫy lừng – trở thành đại
                    sứ độc quyền quyền, nâng uy tín...
                  </span>
                </div>
                <div className="mt-2">
                  <button className="text-white text-sm underline hover:opacity-80 transition">
                    Ẩn bớt
                  </button>
                </div>
              </div>
              <div className="flex-shrink-0 relative w-[246px] h-auto mt-auto mb-auto rounded-[8px] overflow-hidden">
                <img
                  src="/collab.webp"
                  alt="Collab KJC-Juventus"
                  className="w-full h-full object-cover"
                  style={{ display: "block" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Top mobile – thêm phần giống mockup */}
        <div className="flex md:hidden w-full flex-col gap-4">
          {/* Collab card mobile */}
          <div
            className="border border-white border-opacity-10 rounded-xl px-3 py-3 flex items-stretch gap-3 w-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(25,38,85,1) 0%, rgba(35,85,146,1) 100%)",
            }}
          >
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span
                  className="block text-white font-extrabold text-[16px] leading-[131%] mb-1"
                  style={{ fontWeight: 900 }}
                >
                  KJC | JUVENTUS – ĐỐI TÁC ĐỘC QUYỀN KHU VỰC CHÂU Á
                </span>
                <span className="block text-white text-[12px] leading-snug">
                  <span className="font-semibold">KJC</span> hợp tác độc quyền
                  với <span className="font-semibold">CLB Juventus</span> tại
                  châu Á, đưa thương hiệu vươn tầm quốc tế. Juventus – biểu
                  tượng bóng đá Ý với nhiều danh hiệu lẫy lừng – trở thành đại
                  sứ độc quyền quyền, nâng uy tín...
                </span>
              </div>
              <div className="mt-2">
                <button className="text-white text-[12px] underline hover:opacity-80 transition">
                  Ẩn bớt
                </button>
              </div>
            </div>
            <div className="flex-shrink-0 relative w-[132px] h-auto my-auto rounded-[8px] overflow-hidden">
              <img
                src="/collab.webp"
                alt="Collab KJC-Juventus"
                className="w-full h-full object-cover"
                style={{ display: "block" }}
              />
            </div>
          </div>

          {/* Banner + Juventus text mobile */}
          {/* Banner + Juventus text mobile */}
          <div className="flex flex-col items-center gap-3">
            <img
              src="/banner.webp"
              alt="Footer Banner"
              className="h-auto max-w-[260px] object-contain"
            />

            {/* Text + logo cùng 1 hàng */}
            <div className="flex items-center justify-center gap-3">
              <div className="flex flex-col">
                <span
                  className="text-white text-[16px] leading-[100%]"
                  style={{
                    fontFamily:
                      "Roboto, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 400,
                  }}
                >
                  Juventus FC & KJC
                </span>
                <span
                  className="text-white text-[14px] leading-[100%]"
                  style={{
                    fontFamily:
                      "Roboto, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 400,
                  }}
                >
                  Đối tác chính thức Năm 2025-2026
                </span>
              </div>

              {/* <img
                src="/juve-kjc.webp"
                alt="Juventus & KJC"
                className="h-[40px] w-auto object-contain"
              /> */}
            </div>
          </div>
        </div>

        {/* Middle */}
        <div className="w-full">
          {/* Logo RR88 | KJC | Juve trên mobile */}
          <div className="mb-4 md:mb-2 flex justify-center sm:hidden">
            <img
              src="/logo-ft.png"
              alt="RR88 Footer Logo"
              className="h-[32px] w-auto object-contain"
            />
          </div>

          <nav className="flex flex-wrap md:flex-nowrap w-full items-center justify-center md:justify-between gap-x-2 gap-y-1 md:gap-0 text-[11px] sm:text-[13px] md:text-[17px] text-[rgba(134,141,165,1)] leading-[131%] font-normal">
            {navLinks.map((label, index) => [
              <button
                key={`nav-${index}`}
                className="whitespace-nowrap text-[11px] sm:text-[13px] md:text-[17px] font-normal hover:opacity-80 transition"
              >
                {label}
              </button>,
              index < navLinks.length - 1 && (
                <span
                  key={`sep-${index}`}
                  className="text-[11px] sm:text-[13px] md:text-[17px]"
                >
                  |
                </span>
              ),
            ])}
          </nav>
        </div>

        {/* Bottom */}
        <div className="w-full">
          {/* Mobile icon grid */}
          <div className="mt-2 grid grid-cols-6 gap-3 w-full items-center justify-center py-2 md:hidden">
            {mobileIcons.map((src, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center hover:opacity-80 transition"
              >
                <img
                  src={src}
                  alt={`Footer icon ${idx + 1}`}
                  className="w-[26px] sm:w-[32px] md:w-[38px] h-auto object-contain"
                />
              </div>
            ))}
          </div>

          {/* Desktop icon row */}
          <div className="hidden md:flex flex-wrap md:flex-nowrap w-full items-center justify-center md:justify-between gap-2 md:gap-0 py-2">
            {desktopIcons.map((src, idx) => (
              <div
                key={`desktop-icon-${idx}`}
                className="flex items-center justify-center hover:opacity-80 transition"
              >
                <img
                  src={src}
                  alt={`Footer icon ${idx + 1}`}
                  className="w-[28px] sm:w-[32px] md:w-[44px] h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
