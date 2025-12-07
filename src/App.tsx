import type { FormEvent, KeyboardEvent } from "react";
import { useRef, useState } from "react";
import "./index.css";
import "./App.css";
import Footer from "./Footer";
import StatusModal from "./components/StatusModal";

function App() {
  const [bankDigits, setBankDigits] = useState<string[]>(["", "", "", ""]);
  const [accountId, setAccountId] = useState("");
  const [eventType, setEventType] = useState<"signup" | "turnover">("signup");
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) ?? "";
  const digitRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleDigitChange = (index: number, value: string) => {
    // Chỉ cho phép nhập 1 ký tự số
    if (!/^\d?$/.test(value)) return;

    const next = [...bankDigits];
    next[index] = value;
    setBankDigits(next);

    // Nếu đã nhập 1 số thì tự nhảy sang ô kế tiếp
    if (value && digitRefs.current[index + 1]) {
      digitRefs.current[index + 1]?.focus();
    }
  };

  const handleDigitKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    // Backspace ở ô trống thì lùi về ô trước
    if (
      event.key === "Backspace" &&
      !bankDigits[index] &&
      digitRefs.current[index - 1]
    ) {
      event.preventDefault();
      digitRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPopup(null);

    if (!accountId.trim()) {
      setPopup({ type: "error", message: "Vui lòng nhập tài khoản." });
      return;
    }

    if (bankDigits.some((digit) => digit === "")) {
      setPopup({
        type: "error",
        message: "Vui lòng nhập đủ 4 số cuối tài khoản ngân hàng.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/user/draws/claim`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountName: accountId.trim(),
          bankAccountLast4: bankDigits.join(""),
          type: eventType === "signup" ? "registration" : "reward",
        }),
      });

      if (!response.ok) {
        let errorMessage =
          "Hiện tại tài khoản quý khách không đủ điều kiện nhận mã dự thưởng.";
        try {
          const errorData = (await response.json()) as { message?: string };
          if (errorData?.message) {
            errorMessage = errorData.message;
          }
        } catch {
          // ignore parse errors
        }
        throw new Error(errorMessage);
      }

      // Success: luôn dùng thông điệp mặc định theo yêu cầu
      // vẫn đọc response để tránh lỗi stream
      await response.json().catch(() => null);

      setPopup({
        type: "success",
        message:
          "Mã dự thưởng đã được gửi thư về tài khoản của quý khách.\nVui lòng kiểm tra thư !",
      });
    } catch (error) {
      setPopup({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Hiện tại tài khoản quý khách không đủ điều kiện nhận mã dự thưởng.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const closePopup = () => setPopup(null);

  return (
    <>
      <div className="relative">
        {/* Video background cho PC */}
        <video
          className="hidden md:block absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/bg-pc.mp4" type="video/mp4" />
        </video>
        <main
          className="main-background main-background-mobile w-full flex items-start justify-center  px-4 sm:px-6 md:px-8 relative z-10"
          aria-label="Landing background"
        >
          <div className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6 w-full max-w-[520px]">
            {/* Logo */}
            <img
              src="/logo.webp"
              alt="Get Gift logo"
              className="w-full max-w-[280px] sm:max-w-[380px] md:max-w-[520px] object-contain"
            />

            {/* Nền sân khấu + banner ĐĂNG KÝ NHẬN QUÀ */}
            <div
              className="
    relative w-full max-w-[320px] sm:max-w-[420px] md:max-w-none md:w-auto
    h-[300px] sm:h-[400px] md:h-[535px]
    flex items-center justify-center
     max-[430px]:mt-[9rem]
   
   
  "
            >
              <img
                src="/Vector-1.webp"
                alt="Decorative vector"
                className="w-full h-[103%] sm:h-full object-contain"
              />

              <div className="absolute inset-0 flex items-start justify-end mt-[4px] sm:mt-[6px] md:mt-[8px] mr-[4px] sm:mr-[6px] md:mr-[8px]">
                <div className="relative">
                  <img
                    src="/Vector-2.webp"
                    alt="Decorative vector 2"
                    className="w-[194px] sm:w-[250px] md:w-[311.42px] h-auto object-contain mt-[-4px] md:mt-[1rem]"
                  />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span
                      className="mt-0 md:mt-[1rem] ml-2 sm:ml-3 md:ml-4 text-[12px] sm:text-[16px] md:text-[22.75px] font-black uppercase text-white text-center"
                      style={{
                        fontFamily:
                          "Roboto, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                      }}
                    >
                      ĐĂNG KÝ NHẬN QUÀ
                    </span>
                  </div>
                </div>
              </div>

              {/* Form card như mock */}
              <form
                onSubmit={handleSubmit}
                className="absolute bottom-[10px] sm:bottom-[24px] md:bottom-[32px] w-[calc(100%-40px)] sm:w-[360px] md:w-[420px] max-w-[420px] rounded-[18px] sm:rounded-[24px] md:rounded-[28px] px-0 sm:px-6 md:px-8 py-0 sm:py-5 md:py-7 text-[13px] sm:text-[15px] md:text-[17px] text-[#082047] scale-[0.9] sm:scale-100 origin-bottom"
              >
                <div className="space-y-3 sm:space-y-4 md:space-y-5">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[14px] sm:text-[16px] md:text-[18px] font-semibold">
                      Tài khoản
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập tài khoản của bạn"
                      className="w-full rounded-xl border border-[#d9e2ff] bg-white px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 text-[14px] sm:text-[16px] md:text-[18px] outline-none placeholder:text-[#9caac7] focus:border-[#4a8bff] focus:ring-0"
                      value={accountId}
                      onChange={(e) => setAccountId(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[14px] sm:text-[16px] md:text-[18px] font-semibold">
                      4 số cuối tài khoản ngân hàng
                    </label>
                    <div className="flex gap-2 sm:gap-3 md:gap-4">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <input
                          key={index}
                          ref={(el) => {
                            digitRefs.current[index] = el;
                          }}
                          type="text"
                          maxLength={1}
                          inputMode="numeric"
                          value={bankDigits[index]}
                          onChange={(event) =>
                            handleDigitChange(index, event.target.value)
                          }
                          onKeyDown={(event) =>
                            handleDigitKeyDown(index, event)
                          }
                          className="h-10 sm:h-11 md:h-12 w-10 sm:w-11 md:w-12 rounded-[10px] sm:rounded-[11px] md:rounded-[12px] border border-[#d9e2ff] bg-white text-center text-[16px] sm:text-[18px] md:text-[21px] font-semibold outline-none focus:border-[#4a8bff]"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <p className="text-[14px] sm:text-[16px] md:text-[18px] font-semibold">
                      Lựa chọn tham gia sự kiện
                    </p>
                    <div className="space-y-1.5 sm:space-y-2 text-[13px] sm:text-[15px] md:text-[17px]">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="eventType"
                          checked={eventType === "signup"}
                          onChange={() => setEventType("signup")}
                          className="h-[11px] sm:h-[12px] md:h-[13px] w-[11px] sm:w-[12px] md:w-[13px] accent-[#2b6cff]"
                        />
                        <span>Nhận mã hoàn thành đăng ký tài khoản</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="eventType"
                          checked={eventType === "turnover"}
                          onChange={() => setEventType("turnover")}
                          className="h-[11px] sm:h-[12px] md:h-[13px] w-[11px] sm:w-[12px] md:w-[13px] accent-[#2b6cff]"
                        />
                        <span>Nhận mã hoàn thành tổng nạp, tổng cược</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-3 sm:mt-4 w-full rounded-full bg-gradient-to-b from-[#4aa3ff] to-[#0053c7] py-2.5 sm:py-3 md:py-3.5 text-[14px] sm:text-[15px] md:text-[16px] font-semibold text-white shadow-[0_8px_20px_rgba(0,74,163,0.5)] sm:shadow-[0_10px_25px_rgba(0,74,163,0.55)] md:shadow-[0_12px_30px_rgba(0,74,163,0.6)] disabled:opacity-70 disabled:cursor-progress"
                  >
                    {isLoading ? "Đang kiểm tra..." : "Kiểm Tra Ngay"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>

      <Footer />
      {popup && (
        <StatusModal
          type={popup.type}
          message={popup.message}
          onClose={closePopup}
        />
      )}
    </>
  );
}

export default App;
