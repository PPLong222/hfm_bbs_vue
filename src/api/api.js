import {get, post} from './request'

export const test = p => get("/test", p)


export const login = (userName, password) =>
    post("/user/login", {userName, password})

export const signup = (userName, email, password) =>
    post("/signup", {userName, email, password})

export const confirmCode = (email, code) =>
    post("/signup/confirm", {email, code})

export const getTestPost = (p) => get("/test/test_post", p)
