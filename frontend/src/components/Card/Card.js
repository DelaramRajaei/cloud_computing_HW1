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

const Input = styled("input")({
  display: "none",
});

const Card = ({ movies }) => {
  const [open, setOpen] = React.useState(false);
  const [lan, setLan] = React.useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = () => {
      //TODO: Save the file in directory 
      //TODO: Get All comments of a movie
      //TODO: Translate all 
  };

  const handleChange = (event) => {
    setLan(String(event.target.value) || "");
    // TODO: Save the file in the voices directory
    // TODO: Call the "add comment"  function
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <div className="cardlist__movies">
      {movies
        .filter((movie) => movie.poster)
        .map((movie, index) => (
          <div className="card" key={index}>
            <img className="movie__image" src={movie.poster} alt="postal" />
            <div className="flex__card">
              <p className="heading">{movie.name}</p>
              <p className="paragraph">Year : {movie.year}</p>
              <p className="paragraph">Director : {movie.director}</p>
              <div className="buttons">
                <Stack direction="row" spacing={1}>
                  <label htmlFor="contained-button-file">
                    <Input
                      accept="image/*"
                      id="contained-button-file"
                      multiple={false}
                      type="file"
                      onChange={changeHandler}
                    />
                    <Button
                      variant="contained"
                      color="warning"
                      component="span"
                      onClick={handleSubmission}
                    >
                      Send a voice
                    </Button>
                  </label>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={handleClickOpen}
                  >
                    Comments
                  </Button>
                  <Dialog
                    disableEscapeKeyDown
                    open={open}
                    onClose={handleClose}
                  >
                    <DialogTitle>Choose a language</DialogTitle>
                    <DialogContent>
                      <Box
                        component="form"
                        sx={{ display: "flex", flexWrap: "wrap" }}
                      >
                        <FormControl sx={{ m: 1, minWidth: 200 }}>
                          <InputLabel id="demo-dialog-select-label">
                            Lan
                          </InputLabel>
                          <Select
                            labelId="demo-dialog-select-label"
                            id="demo-dialog-select"
                            value={lan}
                            onChange={handleChange}
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
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={handleClose}>Ok</Button>
                    </DialogActions>
                  </Dialog>
                </Stack>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Card;
