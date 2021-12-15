import {computed, onMounted, ref} from "vue";

export default function useSortedPost(posts) {
    const selectedSort = ref('')

    const sortedPosts = computed(() => {
        return [...posts.value].sort((post1, post2) => post1[selectedSort.value]?.localeCompare(post2[selectedSort.value]))
    })

    return {
        selectedSort,
        sortedPosts
    }
}