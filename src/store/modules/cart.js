const Cart = {
    state: {
        count: 0,
        todoDone: [
            { id: 1, text: '...', done: true },
            { id: 2, text: '...', done: false },
            { id: 3, text: '...', done: false }
        ]
    },
    matutions: {
        increment(state) {
            state.count++
        }
    },
    getters: {
        getCountIndex(state) {
            return state.count + 23
        }
    },
    actions: {
        increment(context) {
            context.commit('increment')
        }
    }
}

export default {
    Cart
}
