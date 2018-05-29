import { CLOUDINARY_URL, STAGING } from "../utils/const";
import { compact } from "lodash";

export const getImg = (
  src,
  { width, height },
  withDpr = true,
  ...otherOptions
) => {
  if (typeof window === "undefined") return null;
  const isLocal = window.location.host.includes("localhost");
  const location = !isLocal ? window.location.origin : STAGING;

  const options = compact([
    "f_auto",
    "q_auto",
    "fl_progressive",
    withDpr && `dpr_${window.devicePixelRatio}`,
    width && `w_${Math.round(width)}`,
    height && `h_${Math.round(height)}`,
    ...otherOptions
  ]).join(",");

  const cloudinary = `${CLOUDINARY_URL}${options}/`;
  const url = `${cloudinary}${location}${src}`;
  return { src: url };
};
