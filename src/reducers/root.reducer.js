import {Map, Seq, List,OrderedMap, Record} from 'immutable';

const initialState = Map({
  userId: null,

  loading: Map({
    isLoading: true,
    message: "Loading ..."
  }),

  error: {
    isError: false,
    message: "error message"
  },

  openPollId: "sdfdsfsfdsfsd",

  openPoll: Map({
    questionText: "abcd",
    answers: Map({
      text: ""
    })
  }),

  polls: Map({}),

  pollDetails: Map({
    questionText: "abcd",
    answers: Map({
      text: ""
    })
  }),

  votes: {
    'answer1Id': {
      voteId: {userId: "09839083"},
      voteId: {userId: "394u3098a9"}
    }
  }
});




export default function rootReducer(state=initialState, action) {

  console.log(`Calling ${action.type}...`);

  switch (action.type) {
    case "GET_POLLS": {
      if (action.loading.isLoading || ("error" in action)) {
        return state.merge({loading: action.loading, error: action.error});
      } else {
        console.log(action.polls);
        return state.merge({polls: action.polls, loading: action.loading, error: action.error});
      }
    }

    case "SET_POLLS": {
      return state.merge({polls: action.polls});
    }

    case "GET_LIVE_POLL_ID": {
      if (action.loading.isLoading) {
        return state.merge({loading: action.loading, error: action.error});
      } else {
        return state.merge({openPollId: action.openPollId, loading: action.loading, error: action.error});
      }
    }

    case "GET_OPEN_POLL": {
      if (action.loading.isLoading) {
        return state.merge({loading: action.loading, error: action.error});
      } else {
        return state.merge({openPoll: action.openPoll, loading: action.loading, error: action.error});
      }
    }

    case "UPDATE_SINGLE_POLL": {
      if (action.loading.isLoading) {
        return state.merge({loading: action.loading, error: action.error});
      } else {
        var polls = state.get("polls");
        polls.updateIn(["polls", "pollId"], action.pollDetails);
        return state.merge({polls: polls, oading: action.loading, error: action.error});
      }
    }

    case "POST_VOTE": {
      if (action.loading.isLoading) {
        return state.merge({loading: action.loading, error: action.error});
      } else {
        return state.merge({votes: action.votes, loading: action.loading, error: action.error});
      }
    }

    case "SET_USER_ID": {
      return state.set('userId', action.userId);
    }

    case "GET_VOTES": {
      if (action.loading.isLoading) {
        return state.merge({loading: action.loading, error: action.error});
      } else {
        return state.merge({votes: action.votes, loading: action.loading, error: action.error});
      }
    }

    case "GET_ANSWERS_VOTES": {
      if (action.loading.isLoading || action.error) {
        return state.merge({loading: action.loading, error: action.error});
      } else {
        return state.merge({votesForAnswer: action.votesForAnswer, loading: action.loading, error: action.error});
      }
    }
  }
  return state;
}
