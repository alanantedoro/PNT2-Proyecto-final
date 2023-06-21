import { defineStore } from "pinia";

export const useLoginStatusStore = defineStore('loginStatus', {
    id: 'loginStatus',
    state: () => ({
        isLoggedIn: false
    }),
    actions: {
        logIn() {
            this.isLoggedIn = true
            sessionStorage.setItem("loginCheck", this.isLoggedIn);
            console.log("Login", this.isLoggedIn)
        },
        logOut() {
            this.isLoggedIn = false
            sessionStorage.setItem("loginCheck", this.isLoggedIn);
            console.log("Logout", this.isLoggedIn)
        }
    }
})