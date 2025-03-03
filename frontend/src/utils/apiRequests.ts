/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = import.meta.env.VITE_API_URL;

export const postOrPutData = async ({
  url,
  operation,
  data,
}: {
  url: string;
  operation: "POST" | "PUT";
  data: any;
}) => {
  const res = await fetch(`${API_URL}/${url}`, {
    method: operation,
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
};

export const fetchData = async (url: string) => {
  try {
    const res = await fetch(`${API_URL}/${url}`);
    return res.json();
  } catch (error: any) {
    return error.message;
  }
};

export const deleteData = async (id: string, url: string) => {
  const res = await fetch(`${API_URL}/${url}/${id}`, {
    method: "DELETE",
  });
  return res.json();
};
