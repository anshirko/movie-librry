import { defineStore } from 'pinia'
import dataService from "../assets/data-service.js";

export const useMovieStore = defineStore('movie', {
    state: () => {
        return {
            array: []
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        async read() {
            this.array = await dataService.readMovies()
        },
    },
})