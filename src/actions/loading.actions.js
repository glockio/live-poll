

// For some conventions on actions https://github.com/acdlite/flux-standard-action

export function postVote (userId, answerId) {
    return (dispatch) => {
        dispatch(
          {
            type: "POST_VOTE",
            loading: {isLoading: true, message: "Sending Vote"}
          });
        var voteRef = fireRef.child('votes');
    }
}

export function getPolls (fireRef) {
    return (dispatch) => {
        dispatch({type: "GET_POLLS", loading: {isLoading: true, message: "Loading polls"}});
        fireRef.child('polls').once('value', (payload) => {
            dispatch({type: "GET_POLLS", loading: {isLoading: false, message: "Polls Loaded"}, polls: payload.val()});
        })
    }
}

export function getLivePollId (fireRef) {
    return (dispatch) => {
        dispatch({type: "GET_LIVE_POLL_ID", loading: {isLoading: true, message: "Loading live poll"}});
        fireRef.child('openPollId').once('value', (payload) => {
            dispatch({type: "GET_LIVE_POLL_ID", loading: {isLoading: false, message: "Live Poll Loaded"}, openPollId: payload.val()["openPollId"]})
        })
    }
}