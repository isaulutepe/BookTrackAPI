import { title } from "node:process";
import books from "../data/books.js";
import allowed from "../rules/allowed.js"
import { publicDecrypt } from "node:crypto";

export function getBooks(author = "all", category = "all") {
    if (category !== "all" && !allowed.category.includes(category)) {
        const error = new Error("Kategori filtresi geçerli değil.");
        error.statusCode = 400;
        throw error;
    }

    if (typeof author !== "string" || author.trim() === "") {
        const error = new Error("Yazar filtresi geçerli değil.");
        error.statusCode = 400;
        throw error;
    }
    const result = books.filter(book =>
        (category === "all" || book.category === category) &&
        (author === "all" || book.author === author)
    );
    return result;
}

export function getBookById(bookId) {
    if (!Number.isInteger(bookId) || bookId <= 0) {
        const error = new Error("Geçersiz kitap ID");
        error.statusCode = 400;
        throw error;
    }
    const book = books.find(x => x.id === bookId);
    if (book === undefined) {
        const error = new Error("Kitap bulunamadı");
        error.statusCode = 404;
        throw error;
    }
    return book;
}

export function addBook(title, author, category, publicationYear) {
    if (typeof title !== "string" || title.trim() === "") {
        const error = new Error("Title alanı boş olamaz.");
        error.statusCode = 400;
        throw error;
    }
    if (typeof author !== "string" || author.trim() === "") {
        const error = new Error("Yazar alanı boş olamaz.");
        error.statusCode = 400;
        throw error;
    }
    if (!allowed.category.includes(category)) {
        const error = new Error("Geçersiz kategori değeri.");
        error.statusCode = 400;
        throw error;
    }
    if (!Number.isInteger(publicationYear) || publicationYear <= 0) {
        const error = new Error("Geçerli bir yayın yılı girilmelidir.");
        error.statusCode = 400;
        throw error;
    }
    const nextId = books.length > 0
        ? Math.max(...books.map(book => book.id)) + 1
        : 1;
    const newBook = {
        id: nextId,
        title,
        author,
        category,
        publicationYear
    };
    books.push(newBook);
    return newBook;
}

export function updateBook(bookId, title, author, category, publicationYear) {
    if (!Number.isInteger(bookId) || bookId <= 0) {
        const error = new Error("Geçersiz kitap ID.");
        error.statusCode = 400;
        throw error;
    }

    const book = books.find(x => x.id === bookId);

    if (!book) {
        const error = new Error("Kitap bulunamadı.");
        error.statusCode = 404;
        throw error;
    }

    if (
        title === undefined &&
        author === undefined &&
        category === undefined &&
        publicationYear === undefined
    ) {
        const error = new Error("Güncellenecek alan yok.");
        error.statusCode = 400;
        throw error;
    }

    if (title !== undefined) {
        if (typeof title !== "string" || title.trim() === "") {
            const error = new Error("Geçerli bir kitap başlığı girilmelidir.");
            error.statusCode = 400;
            throw error;
        }
        book.title = title.trim();
    }

    if (author !== undefined) {
        if (typeof author !== "string" || author.trim() === "") {
            const error = new Error("Geçerli bir yazar adı girilmelidir.");
            error.statusCode = 400;
            throw error;
        }
        book.author = author.trim();
    }

    if (category !== undefined) {
        if (!allowed.category.includes(category)) {
            const error = new Error("Geçersiz kategori değeri.");
            error.statusCode = 400;
            throw error;
        }
        book.category = category;
    }

    if (publicationYear !== undefined) {
        if (!Number.isInteger(publicationYear) || publicationYear <= 0) {
            const error = new Error("Geçerli bir yayın yılı girilmelidir.");
            error.statusCode = 400;
            throw error;
        }
        book.publicationYear = publicationYear;
    }

    return book;
}

export function deleteBook(bookId) {
    if (!Number.isInteger(bookId) || bookId <= 0) {
        const error = new Error("Geçersiz görev Id");
        error.statusCode = 400;
        throw error;
    }
    const bookIndex = books.findIndex(x => x.id === bookId); //Silinecek olan id ye sahip kitabın indexnini bulu.
    if (bookIndex === -1) {
        const error = new Error("Kitap bulunamadı");
        error.statusCode = 404;
        throw error;
    }
    const deletedBook = books.splice(bookIndex, 1)[0];
    return deletedBook;

}

