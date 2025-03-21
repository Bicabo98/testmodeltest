import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";

import { haxios } from "@/lib/haxios";
export const useTestLogin = () => {
    const navigate = useNavigate();
    const handleTestLogin = useCallback(async () => {
        try {
            const rs = await haxios.get("/api/v1/users/info");
            console.log(rs);
            if(rs.data.result.address){
                navigate("/portal");
            }
            return rs;
        } catch (error) {
            console.log(error);
            // navigate("/login");
        }
    }, [navigate]); 
    useEffect(() => {
        handleTestLogin();
    }, [handleTestLogin]);
};
