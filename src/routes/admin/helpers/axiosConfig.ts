import axios, { AxiosInstance } from "axios";

export const axiosUnplashInstance: AxiosInstance = axios.create({
  baseURL: `https://api.unsplash.com`,
  headers: { Authorization: `Client-ID ${process.env.UNPLASH_ACCESS_KEY}` },
});

export const axiosPexelsInstance = axios.create({
  baseURL: `https://api.pexels.com`,
  headers: { Authorization: `${process.env.PEXELS_ACCESS_KEY}` },
});
