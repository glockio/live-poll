

// For some conventions on actions https://github.com/acdlite/flux-standard-action

export function postVote (userId, answerId) {
    return (dispatch) => {
        dispatch({TYPE: "POST_VOTE", loading: {isLoading: true, message: "Sending Vote"}});
        var voteRef = fireRef.child('votes');
    }
}

export function getPolls () {
    return (dispatch) => {
        dispatch({TYPE: "GET_POLLS", loading: {isLoading: true, message: "Loading polls"}});
        fireRef.child('poles').once('value', (payload) => {
            dispatch({TYPE: "GET_POLLS", loading: {isLoading: false, message: "Polls Loaded"}, polls: payload});
        })
    }
}

export function getLivePollId () {
    return (dispatch) => {
        dispatch({TYPE: "GET_LIVE_POLL_ID", loading: {isLoading: true, message: "Loading live poll"}});
        fireRef.children('openPollId').once('value', (payload) => {
            dispatch({TYPE: "GET_LIVE_POLL_ID", loading: {isLoading: false, message: "Live Poll Loaded"}, openPollId: payload["openPollId"]})
        })
    }
}