

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

export function getVotesForPoll (pollId) {
    return (dispatch) => {
        dispatch({type: "GET_VOTES_FOR_POLL", loading: {isLoading: true, message: "Loading votes for poll " + pollId}});
        fireRef.child('polls').child(pollId).child('answers').on('value', (payload) => {
            var data = payload.val();
            var answers = {};
            data.keys().map((option) => {
                fireRef.child('votes').child(option).on('value', (payload) => {
                    var data = payload.val();
                    answers[option] = data.keys().length;
                })
            });
            dispatch({type: "GET_VOTES_FOR_POLL", loading: {isLoading: false, message: "Votes retreived"}, openPollId: answers})
        })
    }
}