import {
    getBooks as getBooksService,
    getBookById as getBookByIdService,
    addBook as addBookService,
    updateBook as updateBookService,
    deleteBook as deleteBookService
} from "../services/bookService.js";

export const getBooks = (req, res) => {
    const books = getBooksService(req.query.author ?? "all", req.query.category ?? "all");
    return res.status(200).json(books);
};

export const getBook = (req, res) => {
    const book = getBookByIdService(Number(req.params.bookId));
    return res.status(200).json(book);
};
export const addBook = (req, res) => {
    const newBook = addBookService(req.body.title, req.body.author, req.body.category, req.body.publicationYear);
    return res.status(201).json(newBook);
}
export const updateBook = (req, res) => {
    const updatedBook = updateBookService(Number(req.params.bookId), req.body.title, req.body.author, req.body.category);
    return res.status(200).json(updatedBook);
}
export const deleteBook = (req, res) => {
    const deletedBook = deleteBookService(Number(req.params.bookId));
    return res.status(200).json(deletedBook);
}