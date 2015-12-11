import {Map, Seq, List,OrderedMap, Record} from 'immutable';

const initialState = Map({
  userId: null,

  loading: {
    isLoading: false,
    message: "Loading ..."
  },

  error: {
    isError: false,
    message: "error message"
  },

  openPollId: "sdfdsfsfdsfsd",

  openPoll: {},

  polls: Map({}),

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
