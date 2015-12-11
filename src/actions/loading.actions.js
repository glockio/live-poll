

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

export function setPolls (polls) {
   return {type: "SET_POLLS", polls}
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
                    answers[option]["text"] = data.keys().length;
                })
            });
            dispatch({
                type: "GET_VOTES_FOR_POLL",
                loading: {isLoading: false, message: "Votes retreived"},
                openPollId: answers
            })
        })
    }
}

export function getAnswersVotes(fireRef, answerId) {
    return (dispatch) => {
        dispatch({type: "GET_ANSWERS_VOTES", loading: {isLoading: true, message: "Loading votes for answer"}});

        fireRef.child('votes').child(answerId).on('value', (payload) => {
            dispatch({
                type: "GET_ANSWERS_VOTES",
                loading: {isLoading: false, message: "Votes for Answer loaded"},
                votesForAnswer: payload.val().length
            });
        });
    }
}

    //return ({type: "GET_ANSWERS_VOTES", adction: })

export function getVotesForAnswer (answerId) {
    dispatch({type: "GET_VOTES_FOR_ANSWER", loading: {isLoading: true, message: "Loading votes for answer " + answerId}});
    fireRef.child('votes').child(answerId).on('value', (payload) => {
        var data = payload.val();
        dispatch({type: "GET_VOTES_FOR_ANSWER", loading: {isLoading: true, message: "Loaded answers for " + answerId}, answer: data.keys().length});
    })
}

export function createPoll (question, answers) {
    dispatch({type: "PUT_CREATE_POLL", loading: {isLoading: true, message: "Creating new poll"}});
    //get the current live poll and make it dead

    //create the new live poll
    var newPoll = fireRef.child('poll').push({answers: {}, closed: false, publishedAt: Date.now(), questionText:question});
    var answerRef = newPoll.child('poll').child(newPoll).child('answers');
    answers.map((answer) => {
        answerRef.push({text: answer})
    });
    fireRef.child('openPollId').update(newPoll.key());
    //swap the openPollId

}