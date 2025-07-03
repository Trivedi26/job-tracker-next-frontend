"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export default function AuthInitializer() {
    const initAuth = useAuthStore((state: { initAuth: any; }) => state.initAuth);

    useEffect(() => {
        initAuth();
    }, []);

    return null; // no UI
}
