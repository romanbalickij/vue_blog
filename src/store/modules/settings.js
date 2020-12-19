import {mutationTypes as authMutationType} from "@/store/modules/auth";

const state ={
    isSubmitting:false,
    validationErrors:null
}

const mutations ={
    [authMutationType.updateCurrentUserStart](state) {
        state.isSubmitting = true
        state.validationErrors = null
    },
    [authMutationType.updateCurrentUserSuccess](state) {
        state.isSubmitting = false
    },
    [authMutationType.updateCurrentUserFailure] (state, payload) {
        state.isSubmitting = false
        state.validationErrors = payload
    }
}

export default {
    state,
    mutations
}