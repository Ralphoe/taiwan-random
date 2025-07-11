import React, { useRef, useEffect } from "react";
import JsBarcode from "jsbarcode";
import "./FixedBarcode.scss";

const FixedBarcode = ({
  value = "SAMPLE-BARCODE",
  format = "CODE128",
  options = {},
}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current) {
      svgRef.current.innerHTML = "";
      try {
        JsBarcode(svgRef.current, value, {
          format: format,
          displayValue: false,
          height: 30,
          width: 2,
          margin: 5,
          background: "transparent",
          ...options,
        });
      } catch (error) {
        console.error("生成條碼時發生錯誤:", error);
      }
    }
  }, [value, format, options]);
  return <svg ref={svgRef} style={{ width: "100%", height: "100%" }}></svg>;
};

export default FixedBarcode;
