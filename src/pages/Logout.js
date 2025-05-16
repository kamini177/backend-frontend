import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { reset } from "../features/Users/userSlice";


export const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {

        dispatch(reset())
        navigate("/login")

    }, [])

    return null
}