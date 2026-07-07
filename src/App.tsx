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
      <main
        className="main-background main-background-mobile relative w-full flex items-start justify-start px-16 md:px-[clamp(16px,2.08vw,32px)] pt-3 md:pt-[clamp(8px,0.52vw,8px)] pb-0 md:pb-[clamp(24px,2.08vw,32px)]"
        aria-label="Landing background"
      >
        <img
          src="/logo.png"
          alt="ALO8 logo"
          width={523}
          height={101}
          className="landing-logo absolute left-1/2 z-10 -translate-x-1/2 object-contain"
        />

        <img
          src="/text-title.png"
          alt="Đăng ký nhận mã"
          width={608}
          height={102}
          className="landing-title absolute left-1/2 z-10 -translate-x-1/2 object-contain"
        />

        <div className="landing-form-wrap mx-auto flex w-full flex-col items-center">
          <form
            onSubmit={handleSubmit}
            className="registration-form w-full"
          >
            <div className="landing-form-stack flex w-full flex-col items-stretch">
              <div className="registration-form__field">
                <label className="registration-form__label">Tài khoản</label>
                <input
                  type="text"
                  placeholder="Nhập tài khoản của bạn"
                  className="registration-form__input"
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                />
              </div>

              <div className="registration-form__field registration-form__field--bank-digits">
                <label className="registration-form__label">
                  4 số cuối tài khoản ngân hàng
                </label>
                <div className="registration-form__digits">
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
                      className="registration-form__digit"
                    />
                  ))}
                </div>
              </div>

              <div className="registration-form__field">
                <p className="registration-form__label">
                  Lựa chọn tham gia sự kiện
                </p>
                <div className="registration-form__radios">
                  <label className="registration-form__radio">
                    <input
                      type="radio"
                      name="eventType"
                      checked={eventType === "signup"}
                      onChange={() => setEventType("signup")}
                    />
                    <span>Nhận mã hoàn thành đăng ký tài khoản</span>
                  </label>
                  <label className="registration-form__radio">
                    <input
                      type="radio"
                      name="eventType"
                      checked={eventType === "turnover"}
                      onChange={() => setEventType("turnover")}
                    />
                    <span>Nhận mã hoàn thành tổng nạp, tổng cược</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="registration-form__submit"
                aria-label={isLoading ? "Đang kiểm tra..." : "Kiểm tra ngay"}
              >
                <img
                  src="/btn-check.png"
                  alt="Kiểm tra ngay"
                  width={327}
                  height={98}
                  className="landing-submit-btn mx-auto block"
                />
              </button>
            </div>
          </form>
        </div>
      </main>

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
