import { useEffect } from "react";

interface Props {
  errorText: string;
  typeAlert: string;
  onHide: () => void;
}

const Alert = ({ errorText, onHide, typeAlert }: Props) => {
  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noreferrer");
  };

  useEffect(() => {
    setTimeout(() => {
      onHide();
    }, 8000);
  }, []);
  return (
    <>
    
      <br />
      <div className={"alert ".concat(typeAlert).concat(" shadow-lg")}>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            {typeAlert == "alert-error" && (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            )}
            {typeAlert == "alert-success" && (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            )}
          </svg>
          <span>
            {errorText.includes("https://sepolia.etherscan.io/tx/")
              ? "Follow your transaction on Etherscan: "
              : errorText}
          </span>
          <a className="link link-error" href={errorText}>
            {errorText.includes("https://sepolia.etherscan.io/tx/") &&
              "Etherscan transaction link"}
          </a>
        </div>
      </div>
      <br />
    </>
  );
};

export default Alert;
