

// For some conventions on actions https://github.com/acdlite/flux-standard-action

export function postVote (userId, vote) {
    return (dispatch) => {
        dispatch({TYPE: "POST_VOTE"})
    }
}

export function getPastPolls () {
    return (dispatch) => {
        dispatch({TYPE: "GET_PAST_POLLS"})
    }
}

export function getPollById () {
    return (dispatch) => {
        dispatch({TYPE: "GET_ONE_POLL"})
    }
}