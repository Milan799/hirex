"use client";

import { fetchProfile } from "@/lib/redux/slices/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() { 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch( fetchProfile({
      payload:{},
      onSuccess:(res: any) => {
        console.log("Profile data", res);
      },
      onError : (error:any) => {
        console.log(error)
      }
    }));
  },[]);

  return <div>HireX Home</div> 
}