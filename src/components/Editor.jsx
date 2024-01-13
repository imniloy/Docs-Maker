import React, { useContext, useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "quill-mention";
import "react-quill/dist/quill.snow.css";
import BlotFormatter from "quill-blot-formatter/dist/BlotFormatter";

import { io } from "socket.io-client";
import { SocketContext } from "../context/GlobalSocketProvider";
const socketInstance = io("http://localhost:5000");

let Font = Quill.import("formats/font");
let Size = Quill.import("formats/size");
// We do not add Aref Ruqaa since it is the default
Font.whitelist = [
  "Arimo",
  "Roboto",
  "Lato",
  "Raleway",
  "Montserrat",
  "Comic Neue",
  "Rubik",
];
Quill.register(Font, true);

Size.whitelist = [
  "9px",
  "10px",
  "11px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "22px",
  "24px",
  "26px",
  "28px",
  "32px",
];
Quill.register(Size, true);
Quill.register("modules/blotFormatter", BlotFormatter);
const atValues = [
  { id: 0, value: "barcode" },
  { id: 1, value: "customername" },
  { id: 2, value: "licensenumber" },
  { id: 3, value: "netweight" },
  { id: 4, value: "packageid" },
  { id: 5, value: "price" },
  { id: 6, value: "productname" },
  { id: 7, value: "supplierid" },
];

const CustomToolbar = () => (
  <div
    id="toolbar"
    className="flex justify-center sticky top-0 left-0 right-0 z-10 bg-[#f3f3f3]"
  >
    <select className="ql-font">
      {Font.whitelist.map((font, index) => (
        <option key={font} value={font} defaultValue={!index}>
          {font[0].toUpperCase() + font.substr(1)}
        </option>
      ))}
    </select>
    <select className="ql-size">
      {Size.whitelist.map((size, index) => (
        <option key={index} value={size} defaultValue={size.includes("12")}>
          {size}
        </option>
      ))}
    </select>

    <button className="ql-bold" />
    <button className="ql-underline" />
    <button className="ql-italic" />
    <button className="ql-strike" />
    <button className="ql-blockquote" />
    <button className="ql-code-block" />
    <button className="ql-list" value="ordered" />
    <button className="ql-list" value="bullet" />
    <button className="ql-link" />
    <button className="ql-image" />
    <button className="ql-video" />

    <button className="ql-indent" value="-1" />
    <button className="ql-indent" value="+1" />

    <button className="ql-align" value="" />
    <button className="ql-align" value="center" />
    <button className="ql-align" value="right" />

    <select className="ql-color ql-picker ql-color-picker"></select>
    <select className="ql-background ql-picker ql-color-picker"></select>
  </div>
);

Editor.modules = {
  toolbar: {
    container: "#toolbar",
  },
  blotFormatter: {
    displaySize: true,
    overlay: {
      style: {
        border: "2px solid red",
      },
    },
  },

  mention: {
    allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
    mentionDenotationChars: ["@", "#"],
    source: function (searchTerm, renderList, mentionChar) {
      if (searchTerm.length === 0) {
        renderList(atValues, searchTerm);
      } else {
        const matches = [];
        for (let i = 0; i < atValues.length; i++)
          if (
            ~atValues[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
          )
            matches.push(atValues[i]);
        renderList(matches, searchTerm);
      }
    },
  },
};

Editor.formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "link",
  "image",
  "video",
  "font",
  "size",
  "align",
  "box",
  "mention",
  "indent",
  "align",
  "color",
  "background",
];

export default function Editor() {
  const socketInstance = useContext(SocketContext);
  const [value, setValue] = useState("");
  console.log(value);

  useEffect(() => {
    if (!value) return;
    if (socketInstance && socketInstance.connected) {
      console.log("send-changes");
      socketInstance.emit("send-changes", value);
    }
  }, [value, socketInstance]);

  useEffect(() => {
    const handleChanges = (data) => {
      console.log("receive-changes");
      setValue(data);
    };

    if (socketInstance && socketInstance.connected) {
      socketInstance.on("receive-changes", handleChanges);
    }
  }, [value, socketInstance]);

  return (
    <div className="text-editor">
      <CustomToolbar />
      <ReactQuill
        theme="snow"
        modules={Editor.modules}
        formats={Editor.formats}
        value={value}
        onChange={setValue}
      />
    </div>
  );
}
