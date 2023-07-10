// import React, { createRef, Ref, useEffect, useState } from "react";
// import { FPhi } from "@facephi/selphi-widget-web";
// import { MapType } from "../models/dataTypes";

const Panel = () => {
//   // Widget Camera Resolutions
//   const FPhiCameraResolutions: MapType = {
//     res480p: { title: "640x480", width: 640, height: 480 },
//     res600p: { title: "800x600", width: 800, height: 600 },
//     res768p: { title: "1024x768", width: 1024, height: 768 },
//     res720p: { title: "1280x720 (720p)", width: 1280, height: 720 },
//     res1080p: { title: "1920x1080 (1080p)", width: 1920, height: 1080 },
//   };
//   // Widget Capture State
//   const [isWidgetCaptureStarted, setIsWidgetCaptureStarted] = useState(false);

//   // Widget General Options
//   const [widgetLivenessMode, setWidgetLivenessMode] = useState(
//     FPhi.Selphi.LivenessMode.Passive
//   );
//   const [widgetInteractible, setWidgetInteractible] = useState(true);
//   const [widgetTutorial, setWidgetTutorial] = useState(false);
//   const [widgetStabilizationStage, setWidgetStabilizationStage] =
//     useState(false);
//   const [widgetVideoRecord, setWidgetVideoRecord] = useState(false);
//   // const [widgetFaceTracking, setWidgetFaceTracking] = useState(false);

//   // Widget Debug Options
//   const [widgetShowLog, setWidgetShowLog] = useState(false);
//   const [widgetDebugMode, setWidgetDebugMode] = useState(false);

//   // Widget Camera Options
//   const [widgetCameraResolution, setWidgetCameraResolution] =
//     useState("res720p");
//   const [widgetCameraType, setWidgetCameraType] = useState(
//     FPhi.Selphi.CameraType.Front
//   );
//   const [widgetCameraWidth, setWidgetCameraWidth] = useState(
//     FPhiCameraResolutions.res720p.width
//   );
//   const [widgetCameraHeight, setWidgetCameraHeight] = useState(
//     FPhiCameraResolutions.res720p.height
//   );

//   // Create references
//   const widgetRef: Ref<HTMLElement> = createRef();
//   const [componentMounted, setComponentMounted] = useState(false);

//   // Link events with effect
//   useEffect(() => {
//     if (!componentMounted) {
//       setComponentMounted(true);
//     } else {
//       if (isWidgetCaptureStarted) {
//         const node = widgetRef.current;

//         node?.addEventListener("onModuleLoaded", onModuleLoaded);
//         node?.addEventListener("onStabilizing", onStabilizing);
//         node?.addEventListener("onExtractionFinish", onExtractionFinish);
//         node?.addEventListener("onUserCancel", onUserCancel);
//         node?.addEventListener("onExceptionCaptured", onExceptionCaptured);
//         node?.addEventListener("onLivenessError", onLivenessError);
//         node?.addEventListener(
//           "onLivenessErrorButtonClick",
//           onLivenessErrorButtonClick
//         );
//         node?.addEventListener("onExtractionTimeout", onExtractionTimeout);
//         node?.addEventListener(
//           "onTimeoutErrorButtonClick",
//           onTimeoutErrorButtonClick
//         );
//         node?.addEventListener("onTrackStatus", onTrackStatus);
//       }
//     }
//   }, [componentMounted, isWidgetCaptureStarted, widgetRef]);

//   // Widget event input handler
//   function onCameraResolutionChanged(event: any) {
//     setWidgetCameraWidth(FPhiCameraResolutions[event.target.value].width);
//     setWidgetCameraHeight(FPhiCameraResolutions[event.target.value].height);

//     setWidgetCameraResolution(event.target.value);
//   }

//   // Widget start & stop buttons
//   function onStartCapture() {
//     console.warn(">>>> [app] onStartCapture", isWidgetCaptureStarted);
//     setIsWidgetCaptureStarted(!isWidgetCaptureStarted);
//   }

//   function onStopCapture() {
//     console.warn(">>>> [app] onStopCapture", isWidgetCaptureStarted);
//     setIsWidgetCaptureStarted(false);
//   }

//   // Widget event handlers
//   function onModuleLoaded(eventData: any) {
//     console.warn("[Selphi] onModuleLoaded");
//     console.log(eventData);
//   }

//   function onStabilizing(stabilizingResult: any) {
//     console.warn("[Selphi] onStabilizing");
//     console.log(stabilizingResult);
//   }

//   function onExtractionFinish(extractionResult: any) {
//     console.warn("[Selphi] onExtractionFinish");
//     console.log(extractionResult);

//     console.log("Images returned: ", extractionResult.detail.images);
//     for (let i = 0; i < extractionResult.detail.images.length; i++) {
//       const img = extractionResult.detail.images[i];
//       console.log(`Image ${i}: ${img.src}`);
//     }

//     if (extractionResult.detail.bestImage)
//       console.log("BestImage: ", extractionResult.detail.bestImage.src);
//     if (extractionResult.detail.bestImageCropped)
//       console.log(
//         "BestImageCropped: ",
//         extractionResult.detail.bestImageCropped.src
//       );

//     console.log("Template: ", extractionResult.detail.template);
//     console.log("TemplateRaw: ", extractionResult.detail.templateRaw);
//     console.log("TimeStamp: ", extractionResult.detail.timeStamp);

//     console.log("SunGlassesScore: ", extractionResult.detail.sunGlassesScore);

//     if (extractionResult.detail.bestImage) {
//       FPhi.Selphi.Component.generateTemplateRawFromByteArray(
//         "../../assets/selphid",
//         extractionResult.detail.bestImage,
//         (result) => {
//           console.log("BestImage Template Raw: ", result);
//           setIsWidgetCaptureStarted(false);
//         }
//       );
//     } else {
//       setIsWidgetCaptureStarted(false);
//     }
//   }

//   function onUserCancel() {
//     console.warn("[Selphi] onUserCancel");
//     setIsWidgetCaptureStarted(false);
//   }

//   function onExceptionCaptured(exceptionResult: any) {
//     console.warn("[Selphi] onExceptionCaptured");
//     console.log(`exceptionType: ${exceptionResult.detail.exceptionType}`);
//     console.log(`exceptionMessage: ${exceptionResult.detail.message}`);
//     console.log(exceptionResult);

//     setIsWidgetCaptureStarted(false);
//   }

//   function onLivenessError(livenessErrorResult: any) {
//     console.warn("[Selphi] onLivenessError");
//     console.log(livenessErrorResult);

//     switch (livenessErrorResult.detail.livenessErrorType) {
//       case FPhi.Selphi.LivenessDiagnostic.Unsuccess:
//         console.log("[Selphi] Liveness error: Blink or movement not detected");
//         break;
//       case FPhi.Selphi.LivenessDiagnostic.UnsuccessLowPerformance:
//         console.log("[Selphi] Liveness error: Low performance");
//         break;
//       case FPhi.Selphi.LivenessDiagnostic.UnsuccessGlasses:
//         console.log("[Selphi] Liveness error: Glasses detected");
//         break;
//       case FPhi.Selphi.LivenessDiagnostic.UnsuccessLight:
//         console.log("[Selphi] Liveness error: Bad lighting conditions");
//         break;
//       case FPhi.Selphi.LivenessDiagnostic.UnsuccessNoMovement:
//         console.log("[Selphi] Liveness error: No movement");
//         break;
//       case FPhi.Selphi.LivenessDiagnostic.UnsuccessWrongDirection:
//         console.log("[Selphi] Liveness error: Wrong direction");
//         break;
//       case FPhi.Selphi.LivenessDiagnostic.UnsuccessTooFar:
//         console.log("[Selphi] Liveness error: Face too far");
//         break;
//       default:
//         console.log("[Selphi] Liveness error");
//         break;
//     }
//   }

//   function onLivenessErrorButtonClick() {
//     console.warn("[Selphi] onLivenessErrorButtonClick");
//     setIsWidgetCaptureStarted(false);
//   }

//   function onExtractionTimeout(extractionTimeoutResult: any) {
//     console.warn("[Selphi] onExtractionTimeout");
//     console.log(extractionTimeoutResult);
//   }

//   function onTimeoutErrorButtonClick() {
//     console.warn("[Selphi] onTimeoutErrorButtonClick");
//     setIsWidgetCaptureStarted(false);
//   }

//   function onTrackStatus(eventData: any) {
//     let trackStatusCode: any = Object.entries(FPhi.Selphi.TrackStatus).find(
//       (e: any) => e[1] === eventData.detail.code
//     );
//     console.warn(
//       `[Selphi] onTrackStatus (Code: ${trackStatusCode[1]} - ${trackStatusCode[0]}, Timestamp: ${eventData.detail.timeStamp}`
//     );
//     console.log(eventData);
//   }

//   return (
//     <div className="container p-3">
//       <div className="row h-100">
//         {/* Widget web SelphID */}
//         <div className="col-12 col-md-9" style={{ minHeight: 550 }}>
//           {isWidgetCaptureStarted && (
//             <facephi-selphi
//               className="h-100"
//               ref={widgetRef}
//               bundlePath="../../assets/selphid"
//               // faceTracking={widgetFaceTracking}

//               language="es"
//               livenessMode={widgetLivenessMode}
//               cameraWidth={widgetCameraWidth}
//               cameraHeight={widgetCameraHeight}
//               cameraType={widgetCameraType}
//               interactible={widgetInteractible}
//               tutorial={widgetTutorial}
//               stabilizationStage={widgetStabilizationStage}
//               logImages={true}
//               cropFactor={1.7}
//               videoRecord={widgetVideoRecord}
//               videoRecordType={FPhi.Selphi.RecorderType.Remote}
//               videoRecordScale={widgetCameraWidth < 1280 ? 1 : 0.5}
//               showLog={widgetShowLog}
//               debugMode={widgetDebugMode}
//             />
//           )}
//         </div>

//         {/* Elementos de configuración del widget */}
//         <div className="col-12 col-md-3 mt-3 mt-md-0">
//           <div className="form-group">
//             <label htmlFor="widgetLivenessMode">Liveness mode</label>
//             <select
//               id="widgetLivenessMode"
//               className="form-control"
//               value={widgetLivenessMode}
//               onChange={(e: any) => setWidgetLivenessMode(e.target.value)}
//               disabled={isWidgetCaptureStarted}
//             >
//               {Object.entries(FPhi.Selphi.LivenessMode)
//                 .map((mode) => ({ key: mode[0], value: mode[1] }))
//                 .map((mode) => (
//                   <option value={mode.value} key={mode.value}>
//                     {mode.key}
//                   </option>
//                 ))}
//             </select>
//           </div>
//           <div className="form-group form-check m-0">
//             <input
//               type="checkbox"
//               id="widgetInteractible"
//               className="form-check-input"
//               checked={widgetInteractible}
//               onChange={(e) => setWidgetInteractible(e.target.checked)}
//               disabled={isWidgetCaptureStarted}
//             />
//             <label htmlFor="widgetInteractible" className="form-check-label">
//               Interactible
//             </label>
//           </div>
//           <div className="form-group form-check m-0">
//             <input
//               type="checkbox"
//               id="widgetTutorial"
//               className="form-check-input"
//               checked={widgetTutorial}
//               onChange={(e) => setWidgetTutorial(e.target.checked)}
//               disabled={isWidgetCaptureStarted}
//             />
//             <label htmlFor="widgetTutorial" className="form-check-label">
//               Tutorial
//             </label>
//           </div>
//           <div className="form-group form-check m-0">
//             <input
//               type="checkbox"
//               id="widgetStabilizationStage"
//               className="form-check-input"
//               checked={widgetStabilizationStage}
//               onChange={(e) => setWidgetStabilizationStage(e.target.checked)}
//               disabled={isWidgetCaptureStarted}
//             />
//             <label
//               htmlFor="widgetStabilizationStage"
//               className="form-check-label"
//             >
//               Stabilization Stage
//             </label>
//           </div>
//           <div className="form-group form-check m-0">
//             <input
//               type="checkbox"
//               id="widgetVideoRecord"
//               className="form-check-input"
//               checked={widgetVideoRecord}
//               onChange={(e) => setWidgetVideoRecord(e.target.checked)}
//               disabled={isWidgetCaptureStarted}
//             />
//             <label htmlFor="widgetVideoRecord" className="form-check-label">
//               Record video session
//             </label>
//           </div>
//           {/* <div className="form-group form-check m-0">
//                         <input type="checkbox" id="widgetFaceTracking" className="form-check-input"
//                                checked={widgetFaceTracking} onChange={e => setWidgetFaceTracking(e.target.checked)} disabled={isWidgetCaptureStarted}/>
//                         <label htmlFor="widgetFaceTracking" className="form-check-label">Face Tracking</label>
//                     </div> */}
//           <div className="form-group form-check m-0">
//             <input
//               type="checkbox"
//               id="widgetShowLog"
//               className="form-check-input"
//               checked={widgetShowLog}
//               onChange={(e) => setWidgetShowLog(e.target.checked)}
//               disabled={isWidgetCaptureStarted}
//             />
//             <label htmlFor="widgetShowLog" className="form-check-label">
//               Show extended log
//             </label>
//           </div>
//           <div className="form-group form-check">
//             <input
//               type="checkbox"
//               id="widgetDebugMode"
//               className="form-check-input"
//               checked={widgetDebugMode}
//               onChange={(e) => setWidgetDebugMode(e.target.checked)}
//               disabled={isWidgetCaptureStarted}
//             />
//             <label htmlFor="widgetDebugMode" className="form-check-label">
//               Debug
//             </label>
//           </div>
//           <div className="form-group">
//             <label htmlFor="widgetCameraResolution">Camera resolution</label>
//             <select
//               id="widgetCameraResolution"
//               className="form-control"
//               value={widgetCameraResolution}
//               onChange={onCameraResolutionChanged}
//               disabled={isWidgetCaptureStarted}
//             >
//               {Object.entries(FPhiCameraResolutions)
//                 .map((mode) => ({ key: mode[0], value: mode[1] }))
//                 .map((mode) => (
//                   <option value={mode.key} key={mode.key}>
//                     {mode.value.title}
//                   </option>
//                 ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="widgetCameraType">Camera type</label>
//             <select
//               id="widgetCameraType"
//               className="form-control"
//               value={widgetCameraType}
//               onChange={(e: any) => setWidgetCameraType(e.target.value)}
//               disabled={isWidgetCaptureStarted}
//             >
//               {Object.entries(FPhi.Selphi.CameraType)
//                 .map((mode) => ({ key: mode[0], value: mode[1] }))
//                 .map((mode) => (
//                   <option value={mode.value} key={mode.value}>
//                     {mode.key}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           <div className="form-group">
//             <span>Widget Version: {FPhi.Selphi.Version}</span>
//           </div>

//           <button
//             type="button"
//             id="btnStartCapture"
//             className="btn btn-primary btn-block"
//             onClick={onStartCapture}
//             disabled={isWidgetCaptureStarted}
//           >
//             Start capture
//           </button>
//           <button
//             type="button"
//             id="btnStopCapture"
//             className="btn btn-danger btn-block"
//             onClick={onStopCapture}
//             disabled={!isWidgetCaptureStarted}
//           >
//             Stop capture
//           </button>
//         </div>
//       </div>
//     </div>
//   );
};

 export default Panel;
