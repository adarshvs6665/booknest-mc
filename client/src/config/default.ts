export const config = {
  api: {
    baseUrl: "http://72.145.0.203:5000",
    user: {},
    auth: {
      signIn: "/auth/sign-in",
      signUp: "/auth/sign-up",
    },
    books: {
      createBook: "/books",
      updateBook: "/books/:bookId",
      deleteBook: "/books/:bookId",
      fetchBooks: "/books",
      fetchBorrowRequestCodes: "/books/codes",
      fetchBorrowedBookCodes: "/books/borrowed-codes",
      fetchBorrowInfo: "/books/borrow-info",
      fetchBorrowHistory: "/books/borrow-history",
      issueBook: "/books/borrowings/:borrowingId/issue-book",
      returnBook: "/books/borrowings/:borrowingId/return-book",
      sendBorrowRequest: "/books/:bookId/borrow-request",
    },
    librarian: {},
  },
};
