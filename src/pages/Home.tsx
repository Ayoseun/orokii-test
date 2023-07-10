import { Link, Navigate, useNavigate } from "react-router-dom";
import React, {
  createRef,
  DOMAttributes,
  Ref,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Progress,
  Button,
  Tooltip,
} from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Home() {
  const style = {
    body: "sm:flex sm:flex-col sm:w-full flex flex-col w-full",
    wrapper: "sm:flex sm:flex-row h-screen w-full flex flex-col",
    title:
      "sm:text-xl sm:text-[#666] sm:text-center sm:font-nunito sm:mx-32 sm:my-8   my-2  text-[8px] text-[#666] text-center font-nunito mx-12 ",
    top: "flex flex-col flex-1 items-center",
    logo: "sm:flex sm:flex-row sm:items-center sm:w-72  flex flex-row items-center w-24",
    left: "flex flex-col flex-1 p-4     sm:flex sm:flex-col sm:flex-1 sm:p-4",
    header:
      "sm:text-2xl sm:ml-2  sm:font-bold sm:text-midnight sm:font-nunito       text-[8px] font-bold text-midnight font-nunito ml-2 font-bold text-midnight",
    leftmiddle: "sm:w-3/4 sm:mt-12 w-3/4 my-12",
    status:
      "sm:font-nunito sm:font-bold sm:text-xs sm:text-[#444444]     font-nunito font-bold text-[10px] text-[#444444]",
    tt: "bg-white font-nunito font-thin text-[#444444]",
    button:
      "sm:bg-midnight sm:font-nunito sm:font-thin sm:text-white sm:px-12    bg-midnight font-nunito font-thin text-white px-12",
    bottom:
      "sm:text-sm sm:w-full sm:font-thin sm:text-silver sm:font-nunito sm:bg-midnight",
    subtitle:
      "sm:text-sm sm:font-thin sm:text-silver sm:font-nunito     text-xs font-thin text-silver font-nunito mt-2",
    progress:
      "sm:text-silver sm:w-8/12 sm:mb-12   text-silver w-8/12 mt-2 mb-8",
    right: "flex flex-col justify-center items-center flex-1 p-4 bg-[#f6f9ff]",
    square:
      "sm:flex sm:flex-row sm:items-center sm:space-x-32 sm:mb-12     flex flex-row items-center space-x-24 my-8",
    squareRow: "flex flex-col items-center space-y-2 ",
    icon: "sm:w-48 sm:items-center sm:shadow-2xl sm:rounded-2xl sm:p-4      w-24 items-center shadow-2xl rounded-lg p-4",
    lIcon: "sm:w-6 w-5",
  };
  const [storedSelfieResult, setStoredSelfieResult] = useState("");
  const [storedIdBackResult, setStoredIdBackResult] = useState("");
  const [storedIdFrontResult, setStoredIdFrontResult] = useState("");
  const [storedPerc, setPerc] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    //localStorage.clear();
    const selfieResult = localStorage.getItem("bestImageTemplate");
    const idBackResult = localStorage.getItem("backResult");
    const idFrontResult = localStorage.getItem("frontResult");
  
    if (selfieResult && !idBackResult && !idFrontResult) {
      setStoredSelfieResult(selfieResult);
      setPerc(30);
    } else if (selfieResult && idBackResult && idFrontResult) {
      setStoredSelfieResult(selfieResult);
      setStoredIdBackResult(idBackResult);
      setStoredIdFrontResult(idFrontResult);
      setPerc(100);
    }
  }, []);
  const submitClick = () => {
    toast.error("Selfie and ID verifying failed", {
      position: toast.POSITION.TOP_CENTER,
    });
  }

  const handleIdClick = () => {
    console.log(storedSelfieResult);
    if (
      storedSelfieResult === "" ||
      storedSelfieResult === null ||
      storedSelfieResult === undefined
    ) {
      toast.error("Please complete selfie capturing first", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      navigate("/id"); // Use navigate to navigate to the "/id" route
    }
  };

  return (
    <>
      <div>
        <div className={style.wrapper}>
          <div className={style.left}>
            <div className={style.top}>
              <div className={style.logo}>
                <img className={style.logo} src="blue.png" alt="logo" />

                <span className={style.header}>KYC Verification </span>
              </div>

              <span className={style.title}>
                Your facial verifcation and document scan help us verify your
                information and protect your data
              </span>

              <div className={style.leftmiddle}>
                <img src="verify.webp" alt="" />
              </div>
            </div>
          </div>

          <div className={style.right}>
            <div className={style.square}>
              <Tooltip
                className={style.tt}
                content="Click to begin Selfie capturing"
              >
                <div
                  className={style.squareRow}
                  onClick={() => navigate("/selphi")}
                >
                  <img src="user.png" alt="" className={style.icon} />
                  <img
                    src={storedSelfieResult ? "v2.png" : "v1.png"}
                    alt=""
                    className={style.lIcon}
                  />
                  <span className={style.status}>
                    {storedSelfieResult
                      ? "Selfie Capture Completed"
                      : "Begin selfie capturing"}
                  </span>
                </div>
              </Tooltip>

              <Tooltip
                className={style.tt}
                content="Click to begin ID capturing"
              >
                <div className={style.squareRow} onClick={handleIdClick}>
                  <img src="id.png" alt="" className={style.icon} />
                  <img
                    src={
                      storedIdBackResult
                        ? "v2.png"
                        : "v1.png"
                    }
                    alt=""
                    className={style.lIcon}
                  />
                  <span className={style.status}>
                    {storedIdBackResult
                      ? "ID Capture Completed"
                      : "Begin ID Capture"}
                  </span>
                </div>
              </Tooltip>
            </div>
            <span className={style.subtitle}>Verification status </span>
            <Progress
              color="brown"
              className={style.progress}
              value={storedPerc}
            />

          
                <Button      onClick={() => submitClick} className={style.button}>Verify</Button>
            
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Home;
