import AdditionMathProblems from './AnswerAssessment/Components/AdditionMathProblems';
import './App.css';
import { Stack } from '@mui/material';

function App() {
  return (
    <div
      style={{
        minWidth: "100vw",
        minHeight: "100vh",
        background: "#caf0f8"
      }}
    >
      <Stack direction="column" alignItems="center" justifyContent="center">
        <AdditionMathProblems/>
      </Stack>
    </div>
  );
}

export default App;
