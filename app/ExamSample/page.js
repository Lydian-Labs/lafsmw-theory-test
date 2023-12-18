"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import BlankStaff from "../components/BlankStaff";
import StaffChords from "../components/StaffChords";
import seventhChords from "../../lib/seventhChords";
import FormInput from "../components/form/FormInput";
import { useState } from "react";

const initialFormInputState = {
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
};

export default function ExamSample() {
  const [formInput, setFormInput] = useState(initialFormInputState);

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(formInput);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} minHeight={500}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <h1 className="text-3xl text-center mt-24">LAFSMW Theory Test</h1>
        </Grid>
        <Grid item xs={12}>
          <label className="ml-4 mt-4 text-xl text-center" for="level-select">
            Choose your Level IV class preference:
          </label>

          <select name="levels" id="level-select">
            <option value="">Please choose an option</option>
            <option value="advanced-theory">Advanced theory</option>
            <option value="advanced-improvisation">
              Advanced improvisation
            </option>
            <option value="intro-to-arranging">Intro to arranging</option>
            <option value="intermediate-arranging">
              Intermediate arranging
            </option>
            <option value="advanced-arranging">Advanced arranging</option>
            <option value="rhythm-class">Rhythm class</option>
            <option value="sibelius-class">Sibelius class</option>
          </select>
        </Grid>
        <Grid item xs={12}>
          <div>
            <h2 className="ml-4 mt-4">Write the following key signatures:</h2>
            <BlankStaff addDoubleBarLine={true} />
            <div className="ml-24 grid grid-cols-4">
              <h3 className="ml-4 mt-4">Key of F# major:</h3>
              <h3 className="ml-4 mt-4">Key of F# major:</h3>
              <h3 className="ml-4 mt-4">Key of F# major:</h3>
              <h3 className="ml-4 mt-4">Key of F# major:</h3>
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>
            <h2 className="ml-4 mt-4">
              Identify the following key signatures:
            </h2>
            <BlankStaff addDoubleBarLine={true} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>
            <h2 className="ml-4 mt-4">Write the following scales:</h2>
            <BlankStaff numBars={2} />
            <BlankStaff numBars={2} noTimeSignature={false} />
            <BlankStaff
              numBars={2}
              noTimeSignature={false}
              addDoubleBarLine={true}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>
            <h2 className="ml-4 mt-4">Write the following triads:</h2>
            <BlankStaff numBars={6} addDoubleBarLine={true} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>
            <h2 className="ml-4 mt-4">Write the following 7th chords:</h2>
            <BlankStaff numBars={7} addDoubleBarLine={true} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>
            <h2 className="ml-4 mt-4">Identify the following 7th chords:</h2>
            <StaffChords
              addDoubleBarLine={true}
              numBars={7}
              chords={seventhChords}
            />
            <form
              id="submit-form"
              className="ml-24 grid grid-cols-7"
              onSubmit={handleFormSubmit}
            >
              <FormInput
                name="1"
                type="text"
                value={formInput[1]}
                width="50px"
                onChange={(e) =>
                  setFormInput({ ...formInput, 1: e.target.value })
                }
                required={true}
              />
              <FormInput
                name="2"
                type="text"
                value={formInput[2]}
                width="50px"
                onChange={(e) =>
                  setFormInput({ ...formInput, 2: e.target.value })
                }
                required={true}
              />
              <FormInput
                name="3"
                type="text"
                value={formInput[3]}
                width="50px"
                onChange={(e) =>
                  setFormInput({ ...formInput, 3: e.target.value })
                }
                required={true}
              />
              <FormInput
                name="4"
                type="text"
                value={formInput[4]}
                width="50px"
                onChange={(e) =>
                  setFormInput({ ...formInput, 4: e.target.value })
                }
                required={true}
              />
              <FormInput
                name="5"
                type="text"
                value={formInput[5]}
                width="50px"
                onChange={(e) =>
                  setFormInput({ ...formInput, 5: e.target.value })
                }
                required={true}
              />
              <FormInput
                name="6"
                type="text"
                value={formInput[6]}
                width="50px"
                onChange={(e) =>
                  setFormInput({ ...formInput, 6: e.target.value })
                }
                required={true}
              />
              <FormInput
                name="7"
                type="text"
                value={formInput[7]}
                width="50px"
                onChange={(e) =>
                  setFormInput({ ...formInput, 7: e.target.value })
                }
                required={true}
              />
            </form>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>
            <h2 className="ml-4 mt-4">
              Write a I-IV-V progression in the following keys:
            </h2>
            <BlankStaff />
            <BlankStaff noTimeSignature={true} />
            <BlankStaff noTimeSignature={true} addDoubleBarLine={true} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>
            <h2 className="ml-4 mt-4">
              Write the changes to a Bb blues using ii-V7-I in the last 4
              measures (extra credit for hip reharms in the first 8 measures):
            </h2>
            <BlankStaff />
            <BlankStaff noTimeSignature={true} />
            <BlankStaff noTimeSignature={true} addDoubleBarLine={true} />
          </div>
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 8 }}
        >
          <Button
            sx={{
              color: "#2b2b2b",
              borderColor: "#2b2b2b",
              borderRadius: "8px",
              fontSize: "1em",
            }}
            type="submit"
            form="submit-form"
            variant="outlined"
          >
            Submit Answers
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
