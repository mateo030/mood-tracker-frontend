import { useState } from "react";
import "../index.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

type FormData = {
  userId: number;
  mood: string;
  note: string;
};

const MoodForm: React.FC = () => {
  //userId get from session?
  const [formData, setFormData] = useState<FormData>({
    userId: 1,
    mood: "",
    note: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //TODO: Handle endpoint in env file
  const handleSubmit = async (e: React.FormEvent) => {
    const response = await axios.post("http://localhost:3000/moods", formData);
    console.log(response);
  };

  return (
    <div className="container">
      <h2 style={{ margin: "0 0 12px 0" }}>Input Your Mood</h2>
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset" sx={{ width: "100%" }}>
          <FormLabel id="demo-row-radio-buttons-group-label">
            How are you feeling today?
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="mood"
            sx={{ gap: 1, flexWrap: "wrap", marginBottom: 2 }}
            value={formData.mood}
            onChange={handleChange}
          >
            <FormControlLabel value="1" control={<Radio />} label="Happy" />
            <FormControlLabel value="2" control={<Radio />} label="Sad" />
            <FormControlLabel value="3" control={<Radio />} label="Angry" />
            <FormControlLabel value="4" control={<Radio />} label="Excited" />
            <FormControlLabel value="5" control={<Radio />} label="Chill" />
          </RadioGroup>
          <TextField
            fullWidth
            name="note"
            label="Any thoughts?"
            id="fullWidth"
            variant="outlined"
            multiline
            rows={3}
            margin="normal"
            sx={{ mb: 2 }}
            value={formData.note}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" fullWidth={false}>
            Save
          </Button>
        </FormControl>
      </form>
    </div>
  );
};

export default MoodForm;
