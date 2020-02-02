import React from "react";
import "antd/dist/antd.css";
import { Upload, Icon, message } from "antd";
const { Dragger } = Upload;

export default (props) => {
  const { properties } = props;
  return (
    <Dragger {...properties}>
      <p className="ant-upload-drag-icon">
        <Icon type="inbox" />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
    </Dragger>
  );
};
