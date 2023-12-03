"use client";
import { Vex } from "vexflow";
import { useEffect, useRef } from "react";
import Link from "next/link";
import SeventhChords from "../components/SeventhChords";
import BlankStaff4 from "../components/BlankStaff4";
import BlankStaff2 from "../components/BlankStaff2";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function ExamSample() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} minHeight={500}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <h1 className="text-3xl text-center mt-24">LAFSMW Theory Test</h1>
        </Grid>
        <Grid item xs={12}>
          <div>
            <h2 className="ml-4 mt-4">Identify the following 7th chords:</h2>
            <SeventhChords />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>
            <h2 className="ml-4 mt-4">BlankStaff4:</h2>
            <BlankStaff4 />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>
            <h2 className="ml-4 mt-4">BlankStaff2:</h2>
            <BlankStaff2 />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
