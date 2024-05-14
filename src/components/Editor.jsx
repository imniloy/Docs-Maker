import React, { useContext, useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "quill-mention";
import "react-quill/dist/quill.snow.css";
import BlotFormatter from "quill-blot-formatter/dist/BlotFormatter";
import { SocketContext } from "../context/GlobalSocketProvider";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
let Font = Quill.import("formats/font");
let Size = Quill.import("formats/size");
import DocsLogo from "./assets/docs.png";
import { base_url } from "../../utils";
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

const CustomToolbar = ({ doc_name, set_doc_name }) => {
  const [saving_state, set_saving_state] = useState(false);
  const { id } = useParams();
  const userInfo = useContext(AuthContext);
  const socketInstance = useContext(SocketContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    set_saving_state(true);
    try {
      const response = await fetch(
        `${base_url}/api/docs/update-doc-name/${id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, name: doc_name }),
        }
      );

      const data = await response.json();
      if (data.data._id) {
        console.log("enteres");

        socketInstance.emit("document-name-change", {
          docId: id,
          name: data.data.name,
          userId: userInfo.user._id,
        });
      }
    } catch (e) {
      console.error("Error submitting form:", e);
    } finally {
      set_saving_state(false);
    }
  };

  useEffect(() => {
    const handleNewDocumentName = (data) => {
      if (data) {
        if (data.userId != userInfo.user._id) {
          set_doc_name(data.name);
        }
      }
    };

    const loading_handler = (data) => {
      if (data) {
        set_saving_state(data.loading_state);
      }
    };

    socketInstance.on("new-document_name", handleNewDocumentName);
    socketInstance.on("saving_docs", loading_handler);

    return () => {
      socketInstance.off("new-document_name", handleNewDocumentName);
      socketInstance.off("saving_docs", loading_handler);
    };
  }, [socketInstance, userInfo]);

  return (
    <div className="sticky top-0 left-0 right-0 z-10">
      <div className="flex items-center justify-between bg-[#fff] px-4 py-4">
        <form onSubmit={handleSubmit} className="flex items-center space-x-1">
          <img src={DocsLogo} className="h-6 w-6" alt="DocsLogo" />
          <input
            value={doc_name}
            onChange={(e) => {
              set_doc_name(e.target.value);
            }}
            className="font-medium text-lg leading-[24px]"
          />
        </form>

        <div className="px-6 py-2 font-bold bg-blue-500 text-white">
          {saving_state ? "Saveing" : "Saved"}
        </div>
      </div>
      <div id="toolbar" className="flex justify-center bg-blue-50">
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
    </div>
  );
};

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
    // allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
    allowedChars: /^[A-Za-z0-9\sÅÄÖåäö]*$/, // Allow letters, numbers, and whitespace

    mentionDenotationChars: ["@", "#"],
    source: function (searchTerm, renderList, mentionChar) {
      if (searchTerm.length === 0) {
        renderList(atValues, searchTerm);
      } else {
        const matches = [];
        for (let i = 0; i < atValues.length; i++) {
          if (
            atValues[i].value.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            matches.push(atValues[i]);
          }
        }
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
  const userInfo = useContext(AuthContext);
  const { id } = useParams();
  const [value, setValue] = useState("");
  const [doc_name, set_doc_name] = useState("Untitled Document");

  useEffect(() => {
    if (userInfo && userInfo.user && userInfo.user._id) {
      socketInstance.emit("joinRoom", { id, user: userInfo.user });
    }
  }, [socketInstance, id, userInfo]);

  useEffect(() => {
    if (!id || !userInfo || !userInfo.token) return;

    const handleChanges = (data) => {
      if (data.userId != userInfo.user._id) {
        console.log(data);
        setValue(data.content);
      }
    };

    const load_data_change = (data) => {
      setValue(data?.data);
      set_doc_name(data?.name);
    };

    socketInstance.on("load-data", load_data_change);

    socketInstance.on("receive-changes", handleChanges);

    return () => {
      socketInstance.off("receive-changes", handleChanges);
      socketInstance.off("load-data", load_data_change);
    };
  }, [socketInstance, id, userInfo]);

  return (
    <div className="w-full">
      <div className="text-editor">
        <CustomToolbar doc_name={doc_name} set_doc_name={set_doc_name} />
        <ReactQuill
          theme="snow"
          modules={Editor.modules}
          formats={Editor.formats}
          value={value}
          onChange={(value) => {
            setValue(value);

            socketInstance.emit("send-changes", {
              docId: id,
              content: value,
              userId: userInfo.user._id,
            });
          }}
          preserveWhitespace
        />
      </div>
    </div>
  );
}
