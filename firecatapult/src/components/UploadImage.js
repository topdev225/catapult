import React from "react";
import { makeStyles } from "@material-ui/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Box } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  uploadImageUI: {
    backgroundColor: "#f9f9f9",
    border: "1px dashed #D0D0D0",
    color: "#D0D0D0",
    cursor: "pointer",
    display: "flex",
    fontWeight: 500,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem 0"
  },
  input: {
    display: "none"
  }
}));

const UploadImage = ({ inputName, upload }) => {
  const classes = useStyles();
  return (
    <>
      <input
        accept="image/*"
        className={classes.input}
        id="outlined-button-file"
        name={inputName}
        multiple
        type="file"
        onChange={upload}
      />

      <label htmlFor="outlined-button-file">
        <div className={classes.uploadImageUI}>
          <Box mb={0.5}>
            <CloudUploadIcon />
          </Box>
          Click to Upload
        </div>
      </label>
    </>
  );
};

export default UploadImage;
