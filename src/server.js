import app from "./app.js";

const PORT = 3008;
app.listen(PORT, () => {
    console.log(`BookTrack API running on port ${PORT}`);
})