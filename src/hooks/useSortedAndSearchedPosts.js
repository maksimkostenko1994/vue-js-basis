import {computed, ref} from "vue";

export default function useSortedAndSearchedPosts(sortedPosts) {
    const searchValue = ref('')

    const sortedAndSearchedPosts = computed(() => {
        return sortedPosts.value.filter(post => post.title.toLowerCase().includes(searchValue.value.toLowerCase()))
    })

    return {
        searchValue,
        sortedAndSearchedPosts
    }

}