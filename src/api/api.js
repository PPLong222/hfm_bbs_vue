import request, {get, post} from './request'

export const test = p => get("/test", p)


export const login = (userName, password) =>
    post("/user/login", {userName, password})

export const signup = (userName, email, password) =>
    post("/signup", {userName, email, password})

export const confirmCode = (email, code) =>
    post("/signup/confirm", {email, code})

export const submitPostInfo = (postInfo, tags) =>
    post("/post/edit", {postInfo, tags})

export const showPostEdit = (postId) =>
    get("/post/" + postId, {postId})

// 测试文章返回值
export const getTestPostList = (p) => get("/test/test_post", p)

export function findPostById(id) {
    return request({
        url: `/post/view/${id}`,
        method: 'post'
    })
}

export function getCommentsByPost(id) {
    return request({
        url: `/comments/post/${id}`,
        method: 'post'
    })
}

export function publishComment(comment,token) {
    return request({
        headers: {'Authorization': token},
        url: '/comments/create/change',
        method: 'post',
        data: comment
    })
}



export const getRecommendPostList = (category, languageField, pageIndex, pageNum) => get("/post/getRecommendPostByPage", {
    category,
    languageField,
    pageIndex,
    pageNum
})

export const getHotPostList = (category, languageField, pageIndex, pageNum) => get("/post/getTopPostByPage", {
    category,
    languageField,
    pageIndex,
    pageNum
})
export const searchPostByWords = (category, languageField, words, pageIndex, pageNum) => get("/post/search/searchPostByWords", {
    category,
    languageField,
    words,
    pageIndex,
    pageNum
})

export const searchUserByNickName = (name, userId, pageIndex, pageNum) => get("/user/searchUserByNickNameInPage", {
    name,
    userId,
    pageIndex,
    pageNum
})

export const unfollowSingleUser = (followeeId, followerId) => post("/user/unfollow", {
    followeeId,
    followerId
})

export const followSingleUser = (followeeId, followerId) => post("/user/follow", {
    followeeId,
    followerId
})

export const getTopAuthor = (limit) => get("/user/getTopAuthor", {limit})