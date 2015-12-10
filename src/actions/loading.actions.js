

// For some conventions on actions https://github.com/acdlite/flux-standard-action

export function postVote (userId, vote) {
    return (dispatch) => {
        dispatch({TYPE: "POST_VOTE"})
    }
}

export function getPolls () {
    return (dispatch) => {
        dispatch({TYPE: "GET_POLLS"})
    }
}

export function getLivePollId () {
    return (dispatch) => {
        dispatch({TYPE: "GET_LIVE_POLL_ID"})
    }
}