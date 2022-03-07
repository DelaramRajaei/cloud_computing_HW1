import React, { useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Card = ({ movie }) => {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("en");
  const [selectedFile, setSelectedFile] = useState(null);
  const [comments, setComments] = useState([]);

  /* Sending a voice */
  const handleSendVoice = (movieId) => {
    const formData = new FormData();
    formData.append("movieId", movieId);
    formData.append("userName", "delaram");
    formData.append("voiceFile", selectedFile, selectedFile.name);
    console.log(formData)
    fetch("http://localhost:3001/comment", {
      method: "POST",
      body: formData,
    });
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const Input = styled("input")({
    display: "none",
  });

  /* Show all comments*/
  const showComments = async (movieId) => {
    handleClickClose();
    const comments = await fetch(
      `http://localhost:3001/comments?movie=${movieId}&lang=${lang}`
    ).then((response) => response.json());
    setComments(comments);
    //SHOW BOX
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const commentsList = comments.map((comment, index) => (
    <li key={index}>
      {comment.userName}:{comment.text}
    </li>
  ));

  return (
    <>
      <div className="card">
        <img className="movie__image" src={movie.poster} alt="postal" />
        <div className="flex__card">
          <p className="heading">{movie.name}</p>
          <p className="paragraph">Year : {movie.year}</p>
          <p className="paragraph">Director : {movie.director}</p>
          <div className="buttons">
            <Stack direction="row" spacing={1}>
              {/* Send a voice */}
              <div>
                <input accept="audio/*" type="file" onChange={(e) => onFileChange(e)} />
                <Button variant="contained" color="warning" onClick={() => handleSendVoice(movie.movieID)}>Upload</Button>
              </div>
              {/* <label htmlFor="contained-button-file">
                <Input
                  accept="audio/*"
                  id="contained-button-file"
                  multiple={false}
                  type="file"
                  onChange={(e) => handleSendVoice(e, movie.movieID)}
                />
                <Button variant="contained" color="warning" component="span">
                  Send a voice
                </Button>
              </label> */}

              {/* Show all comments */}
              <Button
                variant="outlined"
                color="warning"
                onClick={handleClickOpen}
              >
                Comments
              </Button>
              {/* Box for choosing language */}
              <Dialog
                disableEscapeKeyDown
                open={open}
                onClose={handleClickClose}
              >
                <DialogTitle>Choose a language</DialogTitle>
                <DialogContent>
                  <Box
                    component="form"
                    sx={{ display: "flex", flexWrap: "wrap" }}
                  >
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                      <InputLabel id="demo-dialog-select-label">
                        Lang
                      </InputLabel>
                      <Select
                        labelId="demo-dialog-select-label"
                        id="demo-dialog-select"
                        onChange={(e) => setLang(e.target.value)}
                        input={<OutlinedInput label="lan" />}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"en"}>English</MenuItem>
                        <MenuItem value={"fr"}>French</MenuItem>
                        <MenuItem value={"es"}>German</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClickClose}>Cancel</Button>
                  <Button
                    onClick={(e) => {
                      showComments(movie.movieID);
                    }}
                  >
                    Ok
                  </Button>
                </DialogActions>
              </Dialog>
            </Stack>
          </div>
          <ul>{commentsList}</ul>
        </div>
      </div>
    </>
  );
};

export default Card;
