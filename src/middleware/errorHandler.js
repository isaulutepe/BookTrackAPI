// Merkezi hata yönetimi
export const errorHandler = ((err, req, res, next) => {
    console.error(err);

    if (err.type === "entity.parse.failed") {
        return res.status(400).json({
            message: "Geçersiz JSON formatı."
        });
    }
    const statusCode = Number.isInteger(err.statusCode) && err.statusCode >= 400
        && err.statusCode <= 599 ? err.statusCode : 500;

    return res.status(statusCode).json({
        message: statusCode === 500 ?
            "Sunucuda bir hata oluştu." :
            err.message
    });
});
