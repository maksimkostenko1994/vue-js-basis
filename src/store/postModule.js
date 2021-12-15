import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
        isLoading: false,
        selectedSort: '',
        searchValue: '',
        page: 1,
        limit: 10,
        totalPages: 0,
        sortOptions: [
            {value: 'title', name: 'By name'},
            {value: 'body', name: 'By context'},
        ]
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchValue.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setLoading(state, isLoad) {
            state.isLoading = isLoad
        },
        setPage(state, page) {
            state.page = page
        },
        setSelectedSort(state, sortedPost) {
            state.selectedSort = sortedPost
        },
        setTotalPages(state, total) {
            state.totalPages = total
        },
        setSearchValue(state, searchValue){
            state.searchValue = searchValue
        }
    },
    actions: {
        async getPosts({state, commit}) {
            try {
                commit('setLoading', true)
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                })
                commit('setPosts', response.data)
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
            } catch (e) {
                console.log(e)
            } finally {
                commit('setLoading', false)
            }
        },
        async loadMorePosts({state, commit}) {
            try {
                commit('setPage', state.page + 1)
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                })
                commit('setPosts', [...state.posts, ...response.data])
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
            } catch (e) {
                console.log(e)
            }
        }
    },
    namespaced: true
}