import * as Tone from "tone";

const SYNTH = new Tone.PolySynth();
SYNTH.set({ oscillator: { type: "sine" } });
const GAIN = new Tone.Gain(0.1).toDestination();
SYNTH.connect(GAIN);

// const sequenceLoop = (time: TransportTime) => {
//   const step = stepCounter % STEPS;
//   const notes = [];
//   for (let rowIndex = 0; rowIndex < STEPS; rowIndex++) {
//     console.log(stepBoxes[rowIndex][step]);
//     const checkbox: HTMLInputElement = document.getElementById(
//       `${stepBoxes[rowIndex][step].key}`
//     ) as HTMLInputElement;
//     checkbox.style.backgroundColor = 'red';

//     checkbox.checked && notes.push(stepBoxes[rowIndex][step].props.note);
//   }
//   SYNTH.triggerAttackRelease(notes, '16n', time);
//   stepCounter++;
// };
