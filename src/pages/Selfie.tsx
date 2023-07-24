import React, {
  createRef,
  DOMAttributes,
  Ref,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { FPhi, WidgetComponent } from "@facephi/selphi-widget-web";
import {
  Card,
  CardBody,
  Checkbox,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  Button,
  Select,
  Option,
  Tooltip,
  Spinner,
  CardHeader,
  CardFooter,
} from "@material-tailwind/react";
import livenessCheck from "../network/liveness";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckIcon } from "../components/checkbox";
type CustomElement<T> = Partial<T & DOMAttributes<T> & { children: any }>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ["facephi-selphi"]: CustomElement<WidgetComponent>;
    }
  }
}

type MapType = {
  [id: string]: { title: string; width: number; height: number };
};
function showToastSuccess(msg: any) {
  toast.success(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
}

function showToastError(msg: any) {
  toast.warning(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
}
const style = {
  logo: "sm:flex sm:flex-row sm:items-top sm:w-48  flex flex-row items-center w-24",
  wrapper: "sm:flex sm:flex-row sm:w-full sm:h-screen  flex flex-col w-full",
  left: "sm:flex sm:flex-col sm:h-4/5 justify-center  flex flex-1 items-center sm:justify-center ",
  right: "bg-[#f6f9ff] sm:flex sm:flex-col flex-1 items-center  justify-center",
  btn: " sm:flex sm:flex-row sm:space-x-8 sm:my-12 sm:p-8 ",
  bottommiddle: "sm:flex sm:flex-row sm:items-center space-x-8",
  cardbody: " space-y-12 items-center",
  status:
    "sm:font-nunito sm:font-bold sm:text-xs sm:text-[#444444]     font-nunito font-bold text-[10px] text-[#444444]",
  tt: "bg-white font-nunito font-thin text-[#444444]",
  squareRow: "flex flex-col items-center space-y-2 ",
  icon: "sm:w-96 sm:items-center sm:shadow-2xl sm:rounded-2xl sm:p-4      w-24 items-center shadow-2xl rounded-lg p-4",
  lIcon: "sm:w-6 w-5",
};

// Create lambda to render the component
function Selfie(props: {}) {
  const navigate = useNavigate();
  // Widget Camera Resolutions
  const FPhiCameraResolutions: MapType = {
    res480p: { title: "640x480", width: 640, height: 480 },
    res600p: { title: "800x600", width: 800, height: 600 },
    res768p: { title: "1024x768", width: 1024, height: 768 },
    res720p: { title: "1280x720 (720p)", width: 1280, height: 720 },
    res1080p: { title: "1920x1080 (1080p)", width: 1920, height: 1080 },
  };

  // Widget Capture State
  const [isWidgetCaptureStarted, setIsWidgetCaptureStarted] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);

  // Widget General Options
  const [widgetLivenessMode, setWidgetLivenessMode] = useState(
    FPhi.Selphi.LivenessMode.Passive
  );
  // Define a state to track if there is a response
  const [hasResponse, setHasResponse] = useState(false);
  const [widgetInteractible, setWidgetInteractible] = useState(true);
  const [widgetTutorial, setWidgetTutorial] = useState(false);
  const [widgetStabilizationStage, setWidgetStabilizationStage] =
    useState(false);
  const [widgetVideoRecord, setWidgetVideoRecord] = useState(false);
  // const [widgetFaceTracking, setWidgetFaceTracking] = useState(false);

  // Widget Debug Options
  const [widgetShowLog, setWidgetShowLog] = useState(false);
  const [widgetDebugMode, setWidgetDebugMode] = useState(false);

  // Widget Camera Options
  const [widgetCameraResolution, setWidgetCameraResolution] =
    useState("res720p");
  const [widgetCameraType, setWidgetCameraType] = useState(
    FPhi.Selphi.CameraType.Front
  );
  const [widgetCameraWidth, setWidgetCameraWidth] = useState(
    FPhiCameraResolutions.res720p.width
  );
  const [widgetCameraHeight, setWidgetCameraHeight] = useState(
    FPhiCameraResolutions.res720p.height
  );

  // Create references
  const widgetRef: Ref<HTMLElement> = createRef();
  const [componentMounted, setComponentMounted] = useState(false);

  // Link events with effect
  useEffect(() => {
    if (!componentMounted) {
      setComponentMounted(true);
    } else {
      if (isWidgetCaptureStarted) {
        const node = widgetRef.current;

        node?.addEventListener("onModuleLoaded", onModuleLoaded);
        node?.addEventListener("onStabilizing", onStabilizing);
        node?.addEventListener("onExtractionFinish", onExtractionFinish);
        node?.addEventListener("onUserCancel", onUserCancel);
        node?.addEventListener("onExceptionCaptured", onExceptionCaptured);
        node?.addEventListener("onLivenessError", onLivenessError);
        node?.addEventListener(
          "onLivenessErrorButtonClick",
          onLivenessErrorButtonClick
        );
        node?.addEventListener("onExtractionTimeout", onExtractionTimeout);
        node?.addEventListener(
          "onTimeoutErrorButtonClick",
          onTimeoutErrorButtonClick
        );
        node?.addEventListener("onTrackStatus", onTrackStatus);
      }
    }
  });

  // Widget event input handler
  function onCameraResolutionChanged(event: any) {
    setWidgetCameraWidth(FPhiCameraResolutions[event.target.value].width);
    setWidgetCameraHeight(FPhiCameraResolutions[event.target.value].height);

    setWidgetCameraResolution(event.target.value);
  }

  // Widget start & stop buttons
  function onStartCapture() {
    console.warn(">>>> [app] onStartCapture", isWidgetCaptureStarted);
    setIsWidgetCaptureStarted(!isWidgetCaptureStarted);
  }

  function onStopCapture() {
    console.warn(">>>> [app] onStopCapture", isWidgetCaptureStarted);
    setIsWidgetCaptureStarted(false);
  }

  // Widget event handlers
  function onModuleLoaded(eventData: any) {
    console.warn("[Selphi] onModuleLoaded");
    console.log(eventData);
  }

  function onStabilizing(stabilizingResult: any) {
    console.warn("[Selphi] onStabilizing");
    console.log(stabilizingResult);
  }

  function onExtractionFinish(extractionResult: any) {
    console.warn("[Selphi] onExtractionFinish");
    console.log(extractionResult);

    console.log("Images returned: ", extractionResult.detail.images);
    for (let i = 0; i < extractionResult.detail.images.length; i++) {
      const img = extractionResult.detail.images[i];
      console.log(`Image ${i}: ${img.src}`);
    }

    if (extractionResult.detail.bestImage)
      console.log("BestImage: ", extractionResult.detail.bestImage.src);
    if (extractionResult.detail.bestImageCropped)
      console.log(
        "BestImageCropped: ",
        extractionResult.detail.bestImageCropped.src
      );

    console.log("Template: ", extractionResult.detail.template);
    console.log("TemplateRaw: ", extractionResult.detail.templateRaw);
    console.log("TimeStamp: ", extractionResult.detail.timeStamp);
    localStorage.setItem(
      "imageTemplateRaw",
      extractionResult.detail.templateRaw
    );
    console.log("SunGlassesScore: ", extractionResult.detail.sunGlassesScore);

    if (extractionResult.detail.bestImage) {
      FPhi.Selphi.Component.generateTemplateRawFromByteArray(
        "../../assets/selphi",
        extractionResult.detail.bestImage,
        (result) => {
          console.log("BestImage Template Raw: ", result);
          localStorage.setItem("bestImageTemplate", result);
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
          liveCheck(result);
          // Auto-navigate back
          //navigate(-1);
        }
      );
    } else {
      setIsWidgetCaptureStarted(false);
    }
  }

  // Function to handle the API request and response
  async function liveCheck(data: any) {
    setIsCaptured(true);
    try {
      // Make the API request
      var response = await livenessCheck(data);
      
      let scanres = response["diagnostic"];
      console.log(scanres);
      // Handle the response based on the scan result
      if (
        scanres === "NoneBecauseFaceNotFound" ||
        scanres === "NoneBecauseEyesClosed"
      ) {
        setIsWidgetCaptureStarted(false);
        showToastError("Your face was not visible, try opening your eyes.");
      }
      else if (scanres === "NoneBecauseEyesClosed" ||  scanres ===
      "NoneBecauseBadQuality") {
        setIsWidgetCaptureStarted(false);
        showToastError("Your eyes were closed.");
      }
      else if (scanres === "NoLive") {
        setIsWidgetCaptureStarted(false);
        showToastError("We couldn't detect that you are human.");
      }
      else if (scanres === "Live") {
        showToastSuccess("Successfully");
        setIsWidgetCaptureStarted(false);
        navigate(-1); // Auto-navigate back
      }

      // Set the state to indicate that there is a response
      setHasResponse(true);
    } catch (error) {
      console.error("Error during API request:", error);
    }
  }

  function onUserCancel() {
    console.warn("[Selphi] onUserCancel");
    setIsWidgetCaptureStarted(false);
  }

  function onExceptionCaptured(exceptionResult: any) {
    console.warn("[Selphi] onExceptionCaptured");
    console.log(`exceptionType: ${exceptionResult.detail.exceptionType}`);
    console.log(`exceptionMessage: ${exceptionResult.detail.message}`);
    console.log(exceptionResult);

    setIsWidgetCaptureStarted(false);
  }

  function onLivenessError(livenessErrorResult: any) {
    console.warn("[Selphi] onLivenessError");
    console.log(livenessErrorResult);

    switch (livenessErrorResult.detail.livenessErrorType) {
      case FPhi.Selphi.LivenessDiagnostic.Unsuccess:
        console.log("[Selphi] Liveness error: Blink or movement not detected");
        break;
      case FPhi.Selphi.LivenessDiagnostic.UnsuccessLowPerformance:
        console.log("[Selphi] Liveness error: Low performance");
        break;
      case FPhi.Selphi.LivenessDiagnostic.UnsuccessGlasses:
        console.log("[Selphi] Liveness error: Glasses detected");
        break;
      case FPhi.Selphi.LivenessDiagnostic.UnsuccessLight:
        console.log("[Selphi] Liveness error: Bad lighting conditions");
        break;
      case FPhi.Selphi.LivenessDiagnostic.UnsuccessNoMovement:
        console.log("[Selphi] Liveness error: No movement");
        break;
      case FPhi.Selphi.LivenessDiagnostic.UnsuccessWrongDirection:
        console.log("[Selphi] Liveness error: Wrong direction");
        break;
      case FPhi.Selphi.LivenessDiagnostic.UnsuccessTooFar:
        console.log("[Selphi] Liveness error: Face too far");
        break;
      default:
        console.log("[Selphi] Liveness error");
        break;
    }
  }

  function onLivenessErrorButtonClick() {
    console.warn("[Selphi] onLivenessErrorButtonClick");
    setIsWidgetCaptureStarted(false);
  }

  function onExtractionTimeout(extractionTimeoutResult: any) {
    console.warn("[Selphi] onExtractionTimeout");
    console.log(extractionTimeoutResult);
  }

  function onTimeoutErrorButtonClick() {
    console.warn("[Selphi] onTimeoutErrorButtonClick");
    setIsWidgetCaptureStarted(false);
  }

  function onTrackStatus(eventData: any) {
    let trackStatusCode: any = Object.entries(FPhi.Selphi.TrackStatus).find(
      (e: any) => e[1] === eventData.detail.code
    );
    console.warn(
      `[Selphi] onTrackStatus (Code: ${trackStatusCode[1]} - ${trackStatusCode[0]}, Timestamp: ${eventData.detail.timeStamp}`
    );
    console.log(eventData);
  }

  return (
    <div className={style.wrapper}>
      <div className={style.left}>
      {isCaptured && isWidgetCaptureStarted && <Spinner className="h-16 w-16 text-midnight text-center" />}
      {!isWidgetCaptureStarted && 
      
      <Card  variant="gradient" className="bg-black w-full max-w-[30rem] p-8">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
      >
        <Typography
          variant="small"
          color="white"
          className="font-normal uppercase"
        >
          Capturing guidelines
        </Typography>
        <Typography
          variant="h1"
          color="white"
          className="mt-6 flex justify-center gap-1 font-bold font-nunito text-7xl font-normal"
        >
          <span className="mt-2 text-lg font-bold font-nunito">Selfie Capturing help</span>{" "}
          
        </Typography>
      </CardHeader>
      <CardBody className="p-0">
        <ul className="flex flex-col gap-4">
          <li className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white p-1">
              <CheckIcon />
            </span>
            <Typography className="font-normal">Ensure your face fills the capture window</Typography>
          </li>
          <li className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white p-1">
              <CheckIcon />
            </span>
            <Typography className="font-normal">Keep your face in the center of the image capture</Typography>
          </li>
          <li className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white p-1">
              <CheckIcon />
            </span>
            <Typography className="font-normal">Do not close your eyes</Typography>
          </li>
          <li className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white p-1">
              <CheckIcon />
            </span>
            <Typography className="font-normal">Be in a well lit place</Typography>
          </li>
          
        </ul>
      </CardBody>
      
    </Card>}
        {isWidgetCaptureStarted && (
          <facephi-selphi
            className="h-100"
            ref={widgetRef}
            bundlePath="../../assets/selphi"
            // faceTracking={widgetFaceTracking}

            language="en"
            livenessMode={widgetLivenessMode}
            cameraWidth={widgetCameraWidth}
            cameraHeight={widgetCameraHeight}
            cameraType={widgetCameraType}
            interactible={widgetInteractible}
            tutorial={widgetTutorial}
            stabilizationStage={widgetStabilizationStage}
            logImages={true}
            cropFactor={1.7}
            videoRecord={widgetVideoRecord}
            videoRecordType={FPhi.Selphi.RecorderType.Remote}
            videoRecordScale={widgetCameraWidth < 1280 ? 1 : 0.5}
            showLog={widgetShowLog}
            debugMode={widgetDebugMode}
          />
        )}
      </div>

      <div className={style.right}>
      <img className={style.logo} src="blue.png" alt="logo" />
        <Tooltip className={style.tt} content="Click to begin Selfie capturing">
          <div className={style.squareRow} onClick={() => navigate("/selphi")}>
            <img src="user.png" alt="" className={style.icon} />
            <img
              src={isWidgetCaptureStarted ? "v2.png" : "v1.png"}
              alt=""
              className={style.lIcon}
            />
            <span className={style.status}>
              {isWidgetCaptureStarted
                ? "Camera initialized"
                : "Begin selfie capturing"}
            </span>
          </div>
        </Tooltip>

        {/* <div className={style.bottommiddle}>
          <Card>
            <List>
              <ListItem className="p-0">
                <label
                  htmlFor="vertical-list-react"
                  className="px-3 py-2 flex items-center w-full cursor-pointer"
                >
                  <ListItemPrefix className="mr-3">
                    <Checkbox
                      id="vertical-list-react"
                      ripple={false}
                      checked={widgetInteractible}
                      onChange={(e) => setWidgetInteractible(e.target.checked)}
                      disabled={isWidgetCaptureStarted}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                    />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-medium">
                    {" "}
                    Interactible
                  </Typography>
                </label>
              </ListItem>
              <ListItem className="p-0">
                <label
                  htmlFor="vertical-list-vue"
                  className="px-3 py-2 flex items-center w-full cursor-pointer"
                >
                  <ListItemPrefix className="mr-3">
                    <Checkbox
                      id="widgetTutorial"
                      checked={widgetTutorial}
                      onChange={(e) => setWidgetTutorial(e.target.checked)}
                      disabled={isWidgetCaptureStarted}
                      ripple={false}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                    />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-medium">
                    Tutorial
                  </Typography>
                </label>
              </ListItem>
              <ListItem className="p-0">
                <label
                  htmlFor="vertical-list-svelte"
                  className="px-3 py-2 flex items-center w-full cursor-pointer"
                >
                  <ListItemPrefix className="mr-3">
                    <Checkbox
                      ripple={false}
                      id="widgetStabilizationStage"
                      checked={widgetStabilizationStage}
                      onChange={(e) =>
                        setWidgetStabilizationStage(e.target.checked)
                      }
                      disabled={isWidgetCaptureStarted}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                    />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-medium">
                    {" "}
                    Stabilization Stage
                  </Typography>
                </label>
              </ListItem>
              <ListItem className="p-0">
                <label
                  htmlFor="vertical-list-svelte"
                  className="px-3 py-2 flex items-center w-full cursor-pointer"
                >
                  <ListItemPrefix className="mr-3">
                    <Checkbox
                      ripple={false}
                      id="widgetVideoRecord"
                      checked={widgetVideoRecord}
                      onChange={(e) => setWidgetVideoRecord(e.target.checked)}
                      disabled={isWidgetCaptureStarted}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                    />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-medium">
                    Record video session
                  </Typography>
                </label>
              </ListItem>
              <ListItem className="p-0">
                <label
                  htmlFor="vertical-list-svelte"
                  className="px-3 py-2 flex items-center w-full cursor-pointer"
                >
                  <ListItemPrefix className="mr-3">
                    <Checkbox
                      ripple={false}
                      id="widgetShowLog"
                      checked={widgetShowLog}
                      onChange={(e) => setWidgetShowLog(e.target.checked)}
                      disabled={isWidgetCaptureStarted}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                    />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-medium">
                    Show extended log
                  </Typography>
                </label>
              </ListItem>
              <ListItem className="p-0">
                <label
                  htmlFor="vertical-list-svelte"
                  className="px-3 py-2 flex items-center w-full cursor-pointer"
                >
                  <ListItemPrefix className="mr-3">
                    <Checkbox
                      ripple={false}
                      id="widgetDebugMode"
                      checked={widgetDebugMode}
                      onChange={(e) => setWidgetDebugMode(e.target.checked)}
                      disabled={isWidgetCaptureStarted}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                    />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-medium">
                    Debug
                  </Typography>
                </label>
              </ListItem>
            </List>
          </Card>
          <Card>
            <CardBody className={style.cardbody}>
              <div className="form-group">
                <div>
                  <Select
                    size="lg"
                    className="font-nuninto"
                    label="Select Liveness mode"
                    selected={(element) =>
                      element &&
                      React.cloneElement(element, {
                        className:
                          "flex items-center font-nuninto px-0 gap-2 pointer-events-none",
                      })
                    }
                  >
                    {Object.entries(FPhi.Selphi.LivenessMode)
                      .map((mode) => ({ key: mode[0], value: mode[1] }))
                      .map((mode: any) => (
                        <Option value={mode.value} key={mode.value}>
                          {mode.key}
                        </Option>
                      ))}
                  </Select>
                </div>
              </div>
              <div className="">
                <Select
                  size="lg"
                  className="font-nuninto"
                  label="Camera Resolution"
                  disabled={isWidgetCaptureStarted}
                  value={widgetCameraResolution}
                  selected={(element) =>
                    element &&
                    React.cloneElement(element, {
                      className:
                        "flex items-center font-nuninto px-0 gap-2 pointer-events-none",
                    })
                  }
                >
                  {Object.entries(FPhiCameraResolutions)
                    .map((mode) => ({ key: mode[0], value: mode[1] }))
                    .map((mode: any) => (
                      <Option value={mode.key} key={mode.key}>
                        {mode.value.title}
                      </Option>
                    ))}
                </Select>
              </div>
              <div className="">
                <Select
                  size="lg"
                  className="font-nuninto"
                  label="Camera Type"
                  disabled={isWidgetCaptureStarted}
                  selected={(element) =>
                    element &&
                    React.cloneElement(element, {
                      className:
                        "flex items-center font-nuninto px-0 gap-2 pointer-events-none",
                    })
                  }
                >
                  {Object.entries(FPhi.Selphi.CameraType)
                    .map((mode) => ({ key: mode[0], value: mode[1] }))
                    .map((mode: any) => (
                      <Option value={mode.value} key={mode.value}>
                        {mode.key}
                      </Option>
                    ))}
                </Select>
              </div>
            </CardBody>
          </Card>
        </div> */}

        <div className={style.btn}>
          <Button
            className="bg-midnight"
          size="lg"
            id="btnStartCapture"
            onClick={onStartCapture}
            disabled={isWidgetCaptureStarted}
          >
            {" "}
            Start capture
          </Button>
          <Button
        
            color="red"
            size="lg"
            id="btnStopCapture"
            variant="outlined"
            onClick={onStopCapture}
            disabled={!isWidgetCaptureStarted}
          >
            {" "}
            Cancel
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Selfie;
