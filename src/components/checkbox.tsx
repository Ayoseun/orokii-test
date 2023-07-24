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

export function CheckIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-3 w-3"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>
    );
  }