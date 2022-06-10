import React, { useEffect, useRef, useState } from "react";

/**
 * Custom hook to abstract fetching from a server
 * @returns an object with the following properties:
 * - isLoading: a boolean indicating if the request is currently loading
 * - error: a string with the error message or null if no error occurred
 * - data: the data returned by the server or null if no data was returned
 * - get: a function to fetch data from the server
 * - post: a function to post data to the server
 * - put: a function to update data on the server
 * - delete: a function to delete data on the server
 */
export const useFetch = () => {
  const errorRef = useRef<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (errorRef.current) {
      setIsLoading(false);
      setError(errorRef.current);
    }
  }, [errorRef.current]);
  /**
   * Sends a GET request to the given url
   * @param url the url endpoint to fetch data from
   */
  const get = async (url: string) => {
    setIsLoading(true);
    errorRef.current = null;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responsedData = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        errorRef.current = responsedData.error || response.statusText;
        return null;
      }

      setIsLoading(false);
      errorRef.current = null;
      return responsedData;
    } catch (error: any) {
      setIsLoading(false);
      errorRef.current = error.message;
      return null;
    }
  };

  /**
   * Sends a POST request to the given url endpoint
   * @param url the url endpoint to post data to
   * @param body the data to post
   */
  const post = async (url: string, body: any) => {
    setIsLoading(true);
    errorRef.current = null;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const responsedData = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        errorRef.current = responsedData.error || response.statusText;
        return null;
      }

      setIsLoading(false);
      errorRef.current = null;
      return responsedData;
    } catch (error: any) {
      setIsLoading(false);
      errorRef.current = error.message;
      return null;
    }
  };

  /**
   * Sends a PUT request to the given url endpoint
   * @param url the url endpoint to update data to
   * @param body the updated data
   */
  const put = async (url: string, body: any) => {
    setIsLoading(true);
    errorRef.current = null;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const responsedData = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        errorRef.current = responsedData.error || response.statusText;
        return null;
      }

      setIsLoading(false);
      errorRef.current = null;
      return responsedData;
    } catch (error: any) {
      setIsLoading(false);
      errorRef.current = error.message;
      return null;
    }
  };

  /**
   * Sends a DELETE request to the given url endpoint
   * @param url
   */
  const deleteFetch = async (url: string) => {
    setIsLoading(true);
    errorRef.current = null;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responsedData = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        errorRef.current = responsedData.error || response.statusText;
        return null;
      }

      setIsLoading(false);
      errorRef.current = null;
      return responsedData;
    } catch (error: any) {
      setIsLoading(false);
      errorRef.current = error.message;
      return null;
    }
  };

  /**
   * Upload form data to the given url endpoint
   * @param url the url endpoint to upload data to
   * @param formData the form data to upload
   */
  const uploadFormData = async (url: string, formData: FormData) => {
    setIsLoading(true);
    errorRef.current = null;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const responsedData = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        errorRef.current = responsedData.error || response.statusText;
        return null;
      }

      setIsLoading(false);
      errorRef.current = null;
      return responsedData;
    } catch (error: any) {
      setIsLoading(false);
      errorRef.current = error.message;
      return null;
    }
  };

  return {
    isLoading,
    error,
    get,
    post,
    put,
    deleteFetch,
    uploadFormData,
  };
};
