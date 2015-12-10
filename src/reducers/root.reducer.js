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

  detailPollId: "sdfdsfdsfdsf",

  polls: {
    poll1Id: {
      key: "1234",
      questionText: "Do you like react-native?",
      closed: false,
      publishedAt: "1449774745",
      answers: {
        "answer1Id": {
          key: "answer1Id",
          text: "Yes"
        },
        "answer2Id": {
          key: "answer2Id",
          text: "No"
        },
        "answer3Id": {
          key: "answer3Id",
          text: "Maybe So"
        }
      }
    },
    poll2Id: {
      key: "1234",
      questionText: "Do you like react-native?",
      closed: false,
      publishedAt: "1449774745",
      answers: {
        "answer4Id": {
          key: "answer1Id",
          text: "Yes"
        },
        "answer5Id": {
          key: "answer2Id",
          text: "No"
        },
        "answer6Id": {
          key: "answer3Id",
          text: "Maybe So"
        }
      }
    }
  },

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
      if (action.loading.isLoading || action.error.isError) {
        return state.merge({loading: action.loading, error: action.error});
      } else {
        return state.merge({polls: action.polls, loading: action.loading, error: action.error});
      }
    }

    case "GET_LIVE_POLL_ID": {
      if (action.loading.isLoading || action.error.isError) {
        return state.merge({loading: action.loading, error: action.error});
      } else {
        return state.merge({openPollId: action.openPollId, loading: action.loading, error: action.error});
      }
    }

    case "POST_VOTE": {
      if (action.loading.isLoading || action.error.isError) {
        return state.merge({loading: action.loading, error: action.error});
      } else {
        return state.merge({votes: action.votes, loading: action.loading, error: action.error});
      }
    }

    case "SET_USER_ID": {
      var result =  state.set('userId', action.userId);
      return result;
    }
  }
  return state;
}
