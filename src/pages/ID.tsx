import React, {
  Ref,
  createRef,
  DOMAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Checkbox,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import { FPhi, WidgetComponent } from "@facephi/selphid-widget-web";
import { useNavigate } from "react-router-dom";
import  face_IDMatchingData  from "../network/matching";

type CustomElement<T> = Partial<T & DOMAttributes<T> & { children: any }>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ["facephi-selphid"]: CustomElement<WidgetComponent>;
    }
  }
}

type MapType = {
  [id: string]: { title: string; width: number; height: number };
};

function ID() {
    const navigate = useNavigate();
  const style = {
    wrapper: "sm:flex sm:flex-row sm:w-full sm:h-screen  flex flex-col w-full",
    left: "sm:flex sm:flex-col sm:h-4/5 justify-center mt-24  flex flex-1 items-center sm:justify-center ",
    right:
      "bg-[#f6f9ff] sm:flex sm:flex-col flex-1 items-center  justify-center",
    btn: " sm:flex sm:flex-row sm:space-x-8 sm:my-12 p-4",
    bottommiddle:
      "sm:flex sm:flex-row sm:items-center sm:h-72 space-x-8 sm:justify-center",
    cardbody: " space-y-12 items-center",
  };
  const FPhiCameraResolutions: MapType = {
    res480p: { title: "640x480", width: 640, height: 480 },
    res600p: { title: "800x600", width: 800, height: 600 },
    res768p: { title: "1024x768", width: 1024, height: 768 },
    res720p: { title: "1280x720 (720p)", width: 1280, height: 720 },
    res1080p: { title: "1920x1080 (1080p)", width: 1920, height: 1080 },
  };

  const [isWidgetCaptureStarted, setIsWidgetCaptureStarted] = useState(false);
  const [widgetPreviewCapture, setWidgetPreviewCapture] = useState(true);
  const [widgetForceLandscape, setWidgetForceLandscape] = useState(false);
  const [widgetInitialTip, setWidgetInitialTip] = useState(false);
  const [widgetDebugMode, setWidgetDebugMode] = useState(false);
  const [widgetCameraResolution, setWidgetCameraResolution] =
    useState("res720p");
  const [widgetCameraWidth, setWidgetCameraWidth] = useState(
    FPhiCameraResolutions.res720p.width
  );
  const [widgetCameraHeight, setWidgetCameraHeight] = useState(
    FPhiCameraResolutions.res720p.height
  );
  const [widgetVideoRecord, setWidgetVideoRecord] = useState(false);
  const [widgetShowLog, setWidgetShowLog] = useState(false);
  const [widgetStartSimpleMode, setWidgetStartSimpleMode] = useState(false);
  const [widgetLicenseKey, setWidgetLicenseKey] = useState("");

  const startSimpleMode = () => {
    setWidgetStartSimpleMode(true);
    setIsWidgetCaptureStarted(true);
  };

  const onCameraResolutionSet = (event: any) => {
    setWidgetCameraWidth(FPhiCameraResolutions[event.target.value].width);
    setWidgetCameraHeight(FPhiCameraResolutions[event.target.value].height);

    setWidgetCameraResolution(event.target.value);
  };

  const onStartCapture = async () => {
    console.warn(">>>> [app] onStartCapture");

    setIsWidgetCaptureStarted(true);
  };

  const onStopCapture = () => {
    console.warn(">>>> [app] onStopCapture");

    setIsWidgetCaptureStarted(false);
    setWidgetStartSimpleMode(false);
  };

  // Widget event handlers
  const onModuleLoaded = (eventData: any) =>
    console.warn("[SelphID] onModuleLoaded", eventData);

  const onExtractionFinished = (extractionResult: any) => {
    console.warn("[SelphID] onExtractionFinished", extractionResult);

    const backResult = extractionResult.detail.images.backDocument || null;
    const frontResult = extractionResult.detail.images.frontDocument || null;
    //const docCaptured = extractionResult.detail.extractionData || null;

    //console.log("Document Captured:", JSON.stringify(docCaptured));

    if (backResult !== null) {
      console.log("Document back:", JSON.stringify(backResult));
      localStorage.setItem('backResult', JSON.stringify(backResult));
    }

    if (frontResult !== null) {
      console.log("Document front:", JSON.stringify(frontResult));
      localStorage.setItem('frontResult', JSON.stringify(frontResult));
    }
    matchingCheck(JSON.stringify(frontResult)) 
  
  };


  async function matchingCheck(data:any) {
    try {
      const response = await face_IDMatchingData(data); // Call the fetchData function to make the API request
      console.log(response); // Handle the response as needed
       // Auto-navigate back
       navigate(-1);
       setIsWidgetCaptureStarted(false);
       setWidgetStartSimpleMode(false);
       navigate(-1);
    } catch (error) {
      console.error("Error during API request:", error);
    }
  }
  const onUserCancelled = () => {
    console.warn("[SelphID] onUserCancelled");

    setIsWidgetCaptureStarted(false);
    setWidgetStartSimpleMode(false);
  };

  const onExceptionCaptured = (exceptionResult: any) => {
    console.warn("[SelphID] onExceptionCaptured", exceptionResult);
    console.log(`exceptionType: ${exceptionResult.detail.exceptionType}`);
    console.log(`exceptionMessage: ${exceptionResult.detail.message}`);

    setIsWidgetCaptureStarted(false);
    setWidgetStartSimpleMode(false);
  };

  const onExtractionTimeout = (eventInfo: any) => {
    console.warn("[SelphID] onExtractionTimeout", eventInfo);

    setIsWidgetCaptureStarted(false);
    setWidgetStartSimpleMode(false);
  };

  const onTrackStatus = (eventData: any) => {
    let trackStatusCode =
      Object.entries(FPhi.SelphID.TrackStatus).find(
        (e) => e[1] === eventData.detail.code
      ) || [];
    console.warn(
      `[SelphID] onTrackStatus (Code: ${trackStatusCode[1]} - ${trackStatusCode[0]}, Timestamp: ${eventData.detail.timeStamp}`
    );
    console.log(eventData);
  };

  // Create references
  const widgetRef: Ref<HTMLElement> = createRef();
  const [componentMounted, setComponentMounted] = useState(false);

  useEffect(() => {
    if (!componentMounted) {
      setComponentMounted(true);
    } else {
      if (isWidgetCaptureStarted) {
        const node = widgetRef.current;

        if (node) {
          node.addEventListener("onModuleLoaded", onModuleLoaded);
          node.addEventListener("onExtractionFinished", onExtractionFinished);
          node.addEventListener("onUserCancelled", onUserCancelled);
          node.addEventListener("onExceptionCaptured", onExceptionCaptured);
          node.addEventListener("onExtractionTimeout", onExtractionTimeout);
          node.addEventListener("onTrackStatus", onTrackStatus);
        }

        // if (widgetLicenseKey === "") {
        //   const licenseKey: string =
        //     window.prompt(
        //       "Please, enter the license key before start the operations: "
        //     ) || "3D430010231C062B0411476A4A2F2702063538014B6A43070A331D04230F173129180C645B4129390B0C281206203E1E0C2A0E130072444B2A0800003E1B0C645B18473307042B040D11234A5364434F4734091D23240D0172524B745151567D595B6B5050477C4A0C3E15110414091D27435947632C5D75512555135B5A76255352635D5972535455115B5A77255351625B5900505451675E2872205224615C587053515764595875505156625C5B705422551658507527525462515975545357125E597720575362295B03525055625B2F72565220675D5C7253535465592876555020602C5B76532655665A5173515255615D5A7E545455685A597652522362515B04542155115B5D75535021602D5C75525A5761592A76505354632E5A04505257135E5D7520532462515B02515255675B2D77595621662C5A04505456635A5174525121635E5C725050541359587724515D635D5A70512254145E5973505054675B5C74545751115E5A73235320615C590351555062595F7252515563595C75505054625B5B7625525562515D03515655155E5E75585152622E5B73525357695B5D74525354615C5A77545755635B2876225152632D5A71555B5767595A7656502062585974512756675B2D74205123615E5B73525056615E5F75225227622A5A71512150615B2C745056216258597F522250615958762551516258597151515115592F75595023615D5903515A50135A5977595324622E5C7152505766595074545654632D5D0751275562585C75245153615F5C7451215767595B7456515660295B00532656625F2B73505150672E5870505A54135A597256562162585A73515A5467585E7450565560595B04532151155F2F7725575362595C77502255605B2F72205750665C5902512255665B5C76575224625B5A73512055155B5C7657512162515974505555685B5C76575221665C5C0455525415582A72205324635B5874505455115B2D7625522761295D75545A56695F5B7424535D625D5972525055145B507555572766295A02555255615B2F76235226622A597251275461585D7750525C625B5A0255525016582A72205150622E5974515555125A5A7625512662505871515555695B2F7759532661295D75552556695F5B76555355625D5972512754665B5C75555727672B5807522551675B5A76565351622A5972512754615A5A75555727672B5A02555256695F5B72555050665C5973515154615B5C74255352625A5A0255525016582A72205627675E5C75545351685E5873205751675F5C74522551675F2A755557276229597E515355605B2C77235326605A5903515354605B2D76255352635A5A0255525016582A72205224615C587053515764595875505156625C5B705422551658507527525462515975545357125E597720575362295B03525055625B2F72565220675D5C7253535465592876555020602C5B76532655665A5173515255615D5A7E545455685A597652522362515B04542155115B5D75535021602D5C75525A5761592A76505354632E5A04505257135E5D7520532462515B02515255675B2D77595621662C5A04505456635A5174525121635E5C725050541359587724515D635D5A70512254145E5973505054675B5C74545751115E5A73235320615C590351555062595F7252515563595C75505054625B5B7625525562515D03515655155E5E75585152622E5B73525357695B5D74525354615C5A77545755635B2876225152632D5A71555B5767595A7656502062585974512756675B2D74205123615E5B73525056615E5F75225227622A5A71512150615B2C745056216258597F522250615958762551516258597151515115592F75595023615D5903515A50135A5977595324622E5C7152505766595074545654632D5D0751275562585C75245153615F5C7451215767595B7456515660295B00532656625F2B73505150672E5870505A54135A597256562162585A73515A5467585E7450565560595B04532151155F2F7725575362595C77502255605B2F7555572766295A02555254655B5876235357625F5970515557125B587654532661295D75545A56695F5B76555353625D5976512555145B2F7723522161295D75552556695F5B762553526259597E51275560585D7750525C625B5A0255525016582A72205151622E5974505255115B5B7655535562505907522551675F2A75555727635E5875512055615A5C7623522161295D75545A56695F5B752353266229587751215713595D7555572766295A02555254635B5C77205224622E5903512756695F5B73535050665C5C7655275065582A7220525166295A02555254655A5B76565223622E597351555467582A7220565661295D75535655645B5A7625505C622D597E522551675A2D72205750665C5902512055625B5E7650535262595D75545A55635B5876555224625B5D02555255605B2C7627535562505972525454135A5976255727672B5D75532655135B5A77205353625C5902512255125B2B7220525172444B2A0800003E1B0C020E00103D0D0732435911221D0C6A430F0C330D07350425043301082A43590331041A234D4109390B0C281206313F030C28250C0625050C2815415F241A1C234D41093F0F0E2F0F04476A0E082A12064972071A645B41243E114B6A43130433030821042D043D0D4B7C430F0A3309052E0E101172444B230F040C3E0D3D3F1106476A4A242F02110A320400280A414972181B29051606244A536432060920002002434F47260D1B35080C0B72524B774F53472D444B36130C13390C0C3443594716090A23310B0C7215";
        //   setWidgetLicenseKey(licenseKey);
        // }
        const licenseKey: string = "3D430010231C062B0411476A4A2F2702063538014B6A43070A331D04230F173129180C645B4129390B0C281206203E1E0C2A0E130072444B2A0800003E1B0C645B18473307042B040D11234A5364434F4734091D23240D0172524B745151567D595B6B5050477C4A0C3E15110414091D27435947632C5D75512555135B5A76255352635D5972535455115B5A77255351625B5900505451675E2872205224615C587053515764595875505156625C5B705422551658507527525462515975545357125E597720575362295B03525055625B2F72565220675D5C7253535465592876555020602C5B76532655665A5173515255615D5A7E545455685A597652522362515B04542155115B5D75535021602D5C75525A5761592A76505354632E5A04505257135E5D7520532462515B02515255675B2D77595621662C5A04505456635A5174525121635E5C725050541359587724515D635D5A70512254145E5973505054675B5C74545751115E5A73235320615C590351555062595F7252515563595C75505054625B5B7625525562515D03515655155E5E75585152622E5B73525357695B5D74525354615C5A77545755635B2876225152632D5A71555B5767595A7656502062585974512756675B2D74205123615E5B73525056615E5F75225227622A5A71512150615B2C745056216258597F522250615958762551516258597151515115592F75595023615D5903515A50135A5977595324622E5C7152505766595074545654632D5D0751275562585C75245153615F5C7451215767595B7456515660295B00532656625F2B73505150672E5870505A54135A597256562162585A73515A5467585E7450565560595B04532151155F2F7725575362595C77502255605B2F72205750665C5902512255665B5C76575224625B5A73512055155B5C7657512162515974505555685B5C76575221665C5C0455525415582A72205324635B5874505455115B2D7625522761295D75545A56695F5B7424535D625D5972525055145B507555572766295A02555255615B2F76235226622A597251275461585D7750525C625B5A0255525016582A72205150622E5974515555125A5A7625512662505871515555695B2F7759532661295D75552556695F5B76555355625D5972512754665B5C75555727672B5807522551675B5A76565351622A5972512754615A5A75555727672B5A02555256695F5B72555050665C5973515154615B5C74255352625A5A0255525016582A72205627675E5C75545351685E5873205751675F5C74522551675F2A755557276229597E515355605B2C77235326605A5903515354605B2D76255352635A5A0255525016582A72205224615C587053515764595875505156625C5B705422551658507527525462515975545357125E597720575362295B03525055625B2F72565220675D5C7253535465592876555020602C5B76532655665A5173515255615D5A7E545455685A597652522362515B04542155115B5D75535021602D5C75525A5761592A76505354632E5A04505257135E5D7520532462515B02515255675B2D77595621662C5A04505456635A5174525121635E5C725050541359587724515D635D5A70512254145E5973505054675B5C74545751115E5A73235320615C590351555062595F7252515563595C75505054625B5B7625525562515D03515655155E5E75585152622E5B73525357695B5D74525354615C5A77545755635B2876225152632D5A71555B5767595A7656502062585974512756675B2D74205123615E5B73525056615E5F75225227622A5A71512150615B2C745056216258597F522250615958762551516258597151515115592F75595023615D5903515A50135A5977595324622E5C7152505766595074545654632D5D0751275562585C75245153615F5C7451215767595B7456515660295B00532656625F2B73505150672E5870505A54135A597256562162585A73515A5467585E7450565560595B04532151155F2F7725575362595C77502255605B2F7555572766295A02555254655B5876235357625F5970515557125B587654532661295D75545A56695F5B76555353625D5976512555145B2F7723522161295D75552556695F5B762553526259597E51275560585D7750525C625B5A0255525016582A72205151622E5974505255115B5B7655535562505907522551675F2A75555727635E5875512055615A5C7623522161295D75545A56695F5B752353266229587751215713595D7555572766295A02555254635B5C77205224622E5903512756695F5B73535050665C5C7655275065582A7220525166295A02555254655A5B76565223622E597351555467582A7220565661295D75535655645B5A7625505C622D597E522551675A2D72205750665C5902512055625B5E7650535262595D75545A55635B5876555224625B5D02555255605B2C7627535562505972525454135A5976255727672B5D75532655135B5A77205353625C5902512255125B2B7220525172444B2A0800003E1B0C020E00103D0D0732435911221D0C6A430F0C330D07350425043301082A43590331041A234D4109390B0C281206313F030C28250C0625050C2815415F241A1C234D41093F0F0E2F0F04476A0E082A12064972071A645B41243E114B6A43130433030821042D043D0D4B7C430F0A3309052E0E101172444B230F040C3E0D3D3F1106476A4A242F02110A320400280A414972181B29051606244A536432060920002002434F47260D1B35080C0B72524B774F53472D444B36130C13390C0C3443594716090A23310B0C7215";
        setWidgetLicenseKey(licenseKey)
      }
    }
  }, [isWidgetCaptureStarted, widgetRef, widgetLicenseKey]);

  return (
    <div className={style.wrapper}>
      <div className={style.left}>
          {isWidgetCaptureStarted && (
    
          <facephi-selphid
            ref={widgetRef}
            className={`bg-midnight items-center mt-12`}
            language="en"
            documentAspectRatio={85.6 / 53.98}
            bundlePath="../../assets/selphid"
            previewCapture={widgetPreviewCapture}
            forceLandscape={widgetForceLandscape}
            initialTip={widgetInitialTip}
            licenseKey={widgetLicenseKey}
            imageFormat={"image/jpeg"}
            style={{
              width: "100%",
              height: widgetForceLandscape ? "56.25%" : "100%",
            }}
            cameraWidth={widgetCameraWidth}
            cameraHeight={widgetCameraHeight}
            specificData={"ES"}
            videoRecord={widgetVideoRecord}
            videoRecordType={FPhi.SelphID.RecorderType.Remote}
            videoRecordScale={widgetCameraWidth < 1280 ? 1 : 0.5}
            showLog={widgetShowLog}
            debugMode={widgetDebugMode}
            startSimpleMode={widgetStartSimpleMode}
          ></facephi-selphid>
        )}
      </div>
      <div className={style.right}>
        <div className={style.bottommiddle}>
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
                      checked={widgetPreviewCapture}
                      onChange={(e) =>
                        setWidgetPreviewCapture(e.target.checked)
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
                    WidgetPreviewCapture
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
                      type="checkbox"
                      id="widgetForceLandscape"
                      checked={widgetForceLandscape}
                      onChange={(e) =>
                        setWidgetForceLandscape(e.target.checked)
                      }
                      disabled={isWidgetCaptureStarted}
                      ripple={false}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                    />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-medium">
                    Force Landscape
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
                      type="checkbox"
                      id="widgetInitialTip"
                      checked={widgetInitialTip}
                      onChange={(e) => setWidgetInitialTip(e.target.checked)}
                      disabled={isWidgetCaptureStarted}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                    />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-medium">
                    {" "}
                    Initial tip
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
                      type="checkbox"
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
                      type="checkbox"
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
                      type="checkbox"
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
                    ebug
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
                    className="font-nuninto form-control"
                    label="Camera Resolution"
                    id="widgetCameraResolution"
                    value={widgetCameraResolution}
                    onChange={onCameraResolutionSet}
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
                      .map((mode) => (
                        <option value={mode.key} key={mode.key}>
                          {mode.value.title}
                        </option>
                      ))}
                  </Select>
                </div>
                <div className="form-group mt-12">
                  <span>Widget Version: {FPhi.SelphID.Version}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className={style.btn}>
          <Button
            id="btnStartCapture"
            onClick={onStartCapture}
            disabled={isWidgetCaptureStarted}
          >
            {" "}
            Start capture
          </Button>
          <Button
            type="button"
            id="btnsimplemode"
            onClick={startSimpleMode}
            disabled={isWidgetCaptureStarted}
          >
            {" "}
            Start Simple Mode
          </Button>
          <Button
            color="red"
            id="btnStopCapture"
            variant="outlined"
            onClick={onStopCapture}
            disabled={!isWidgetCaptureStarted}
          >
            {" "}
            Stop capture
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ID;
