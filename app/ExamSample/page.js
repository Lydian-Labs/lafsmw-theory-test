"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BlankStaff from "../components/BlankStaff";
import BlankStaff2 from "../components/BlankStaff2";
import BlankStaff4 from "../components/BlankStaff4";
import BlankStaff6 from "../components/BlankStaff6";
import BlankStaff7 from "../components/BlankStaff7";
import SeventhChords from "../components/SeventhChords";

export default function ExamSample() {
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
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>
            <h2 className="ml-4 mt-4">
              Identify the following key signatures:
            </h2>
            <BlankStaff4 addDoubleBarLine={true} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>
            <h2 className="ml-4 mt-4">Write the following scales:</h2>
            <BlankStaff2 />
            <BlankStaff2 noTimeSignature={false} />
            <BlankStaff2 noTimeSignature={false} addDoubleBarLine={true} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>
            <h2 className="ml-4 mt-4">Write the following triads:</h2>
            <BlankStaff6 addDoubleBarLine={true} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>
            <h2 className="ml-4 mt-4">Write the following 7th chords:</h2>
            <BlankStaff7 addDoubleBarLine={true} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>
            <h2 className="ml-4 mt-4">Identify the following 7th chords:</h2>
            <SeventhChords />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>
            <h2 className="ml-4 mt-4">
              Write a I-IV-V progression in the following keys:
            </h2>
            <BlankStaff4 />
            <BlankStaff4 noTimeSignature={true} />
            <BlankStaff4 noTimeSignature={true} addDoubleBarLine={true} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>
            <h2 className="ml-4 mt-4">
              Write the changes to a Bb blues using ii-V7-I in the last 4
              measures (extra credit for hip reharms in the first 8 measures):
            </h2>
            <BlankStaff4 />
            <BlankStaff4 noTimeSignature={true} />
            <BlankStaff4 noTimeSignature={true} addDoubleBarLine={true} />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
