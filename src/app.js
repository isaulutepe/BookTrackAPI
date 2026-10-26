import express from "express"
import bookRoutes from "../src/routes/bookRoutes.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { errorHandler } from "./middleware/errorHandler.js"
import helmet from "helmet";

const app = express();
app.use(helmet());

app.use(express.json());
app.use(requestLogger);
app.get("/", (req, res) => {
    res.json({ message: "Welcome to BookTrack API!" });
});

app.use("/api/books", bookRoutes);
//Tanımlanmamış endpointleri yakalamak için, İstek tanımlı rotaların hiçbirine eşleşmezse bu middleware'e ulaşır. next(error) çağrısı da hatayı merkezi hata yönetimine gönderir.(Express de kodlar sırayla çalışıtğı için route kodlarından sonra, errorhandlerdan önce tanımladım .)
app.use((req, res, next) => {
    const error = new Error("Endpoint bulunamadı.");
    error.statusCode = 404;
    next(error);
});

app.use(errorHandler);
export default app;