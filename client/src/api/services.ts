import { useMutation, useQuery } from "react-query";
import { client } from "./axios";
import { config } from "../config";
import { AxiosError } from "axios";
import { ApiResponse, Book, BorrowInfo, QueryOptions, User } from "../types";
import { DEFAULT_QUERY_OPTIONS } from "../constants";

export const useSignInMutation = () => {
  const mutation = useMutation<
    User,
    AxiosError<ApiResponse<any>>,
    { userName: string; password: string },
    unknown
  >(async (data: { userName: string; password: string }): Promise<User> => {
    const path = config.api.auth.signIn;

    const response = await client.post<ApiResponse<{ user: User }>>(
      path,
      {
        ...data,
      },
      {
        headers: {
          Authorization: false,
        },
      }
    );
    return response.data.data.user;
  });

  return mutation;
};
export const useSignoutMutation = () => {
  const mutation = useMutation<any, any, any, any>(async (): Promise<any> => {
    const path = config.api.auth.signOut;

    const response = await client.post(path);
    return response.data;
  });

  return mutation;
};
export const useSignUpMutation = () => {
  const mutation = useMutation<
    unknown,
    AxiosError<ApiResponse<any>>,
    { userName: string; password: string; fullName: string; email: string },
    unknown
  >(
    async (data: {
      userName: string;
      password: string;
      fullName: string;
      email: string;
    }): Promise<any> => {
      const path = config.api.auth.signUp;

      const response = await client.post(
        path,
        {
          ...data,
        },
        {
          headers: {
            Authorization: false,
          },
        }
      );
      return response.data;
    }
  );

  return mutation;
};

export const useFetchBooksQuery = (queryOptions?: QueryOptions<string>) => {
  const fetchBooks = async (): Promise<Book[]> => {
    const path = config.api.books.fetchBooks;

    const response = await client.get<ApiResponse<{ books: Book[] }>>(path);

    return response.data.data.books;
  };

  return useQuery(["fetchBooks"], fetchBooks, {
    ...queryOptions,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

export const useFetchBorrowInfoQuery = (
  queryOptions?: QueryOptions<string>
) => {
  const fetchBorrowInfo = async (): Promise<BorrowInfo[]> => {
    const path = config.api.borrow.fetchBorrowInfo;

    const response = await client.get<
      ApiResponse<{ borrowInfo: BorrowInfo[] }>
    >(path);

    return response.data.data.borrowInfo;
  };

  return useQuery(["fetchBorrowInfo"], fetchBorrowInfo, {
    ...queryOptions,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

export const useFetchHistoryQuery = (queryOptions?: QueryOptions<string>) => {
  const fetchBorrowHistory = async (): Promise<BorrowInfo[]> => {
    const path = config.api.borrow.fetchBorrowHistory;

    const response = await client.get<
      ApiResponse<{ borrowHistory: BorrowInfo[] }>
    >(path);

    return response.data.data.borrowHistory;
  };

  return useQuery(["fetchBorrowHistory"], fetchBorrowHistory, {
    ...queryOptions,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

export const useSendBorrowRequestMutation = () => {
  const mutation = useMutation<
    unknown,
    AxiosError<ApiResponse<any>>,
    { bookId: string },
    unknown
  >(async (data: { bookId: string }): Promise<any> => {
    const { bookId } = data;
    const path = config.api.borrow.sendBorrowRequest.replace(":bookId", bookId);

    const response = await client.post(path);
    return response.data;
  });

  return mutation;
};

export const useCreateBookMutation = () => {
  const mutation = useMutation<
    unknown,
    AxiosError<ApiResponse<any>>,
    Omit<Book, "bookId">,
    unknown
  >(async (data: Omit<Book, "bookId">): Promise<any> => {
    const path = config.api.books.createBook;

    const response = await client.post(path, {
      ...data,
    });
    return response.data;
  });

  return mutation;
};

export const useUpdateBookMutation = () => {
  const mutation = useMutation<
    unknown,
    AxiosError<ApiResponse<any>>,
    Book,
    unknown
  >(async ({ bookId, ...data }: Book): Promise<any> => {
    const path = config.api.books.updateBook.replace(":bookId", bookId);

    const response = await client.put(path, {
      ...data,
    });
    return response.data;
  });

  return mutation;
};

export const useDeleteBookMutation = () => {
  const mutation = useMutation<
    unknown,
    AxiosError<ApiResponse<any>>,
    string,
    unknown
  >(async (bookId): Promise<any> => {
    const path = config.api.books.deleteBook.replace(":bookId", bookId);
    const response = await client.delete(path);

    return response.data;
  });

  return mutation;
};

export const useFetchBorrowRequestCodesQuery = (
  queryOptions?: QueryOptions<string>
) => {
  const fetchBorrowRequestCodes = async (): Promise<string[]> => {
    const path = config.api.borrow.fetchBorrowRequestCodes;

    const response = await client.get<ApiResponse<{ codes: string[] }>>(path);

    return response.data.data.codes;
  };

  return useQuery(["fetchBorrowRequestCodes"], fetchBorrowRequestCodes, {
    ...queryOptions,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

export const useFetchBorrowedBookCodesQuery = (
  queryOptions?: QueryOptions<string>
) => {
  const fetchBorrowedBookCodes = async (): Promise<string[]> => {
    const path = config.api.borrow.fetchBorrowedBookCodes;

    const response = await client.get<ApiResponse<{ codes: string[] }>>(path);

    return response.data.data.codes;
  };

  return useQuery(["fetchBorrowedBookCodes"], fetchBorrowedBookCodes, {
    ...queryOptions,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

export const useIssueBookMutation = () => {
  const mutation = useMutation<
    unknown,
    AxiosError<ApiResponse<any>>,
    string,
    unknown
  >(async (borrowingId: string): Promise<any> => {
    const path = config.api.borrow.issueBook.replace(
      ":borrowingId",
      borrowingId
    );

    const response = await client.post(path);
    return response.data;
  });

  return mutation;
};

export const useReturnBookMutation = () => {
  const mutation = useMutation<
    unknown,
    AxiosError<ApiResponse<any>>,
    string,
    unknown
  >(async (borrowingId: string): Promise<any> => {
    const path = config.api.borrow.returnBook.replace(
      ":borrowingId",
      borrowingId
    );

    const response = await client.post(path);
    return response.data;
  });

  return mutation;
};
