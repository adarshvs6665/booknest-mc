export const config = {
  api: {
    baseUrl: "http://ec2-34-244-188-242.eu-west-1.compute.amazonaws.com:8001",
    user: {},
    auth: {
      signIn: "/auth/sign-in",
      signUp: "/auth/sign-up",
      signOut: "/auth/sign-out",
    },
    books: {
      createBook: "/books/",
      updateBook: "/books/:bookId",
      deleteBook: "/books/:bookId",
      fetchBooks: "/books/",
    },
    borrow: {
      sendBorrowRequest: "/borrow/books/:bookId/borrow-request",
      fetchBorrowInfo: "/borrow/borrow-info",
      issueBook: "/borrow/:borrowingId/issue-book",
      returnBook: "/borrow/:borrowingId/return-book",
      fetchBorrowHistory: "/borrow/borrow-history",
      fetchBorrowRequestCodes: "/borrow/codes",
      fetchBorrowedBookCodes: "/borrow/borrowed-codes",
    },
  },
};
