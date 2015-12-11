import LocalStore from 'react-native-simple-store';


export const updateVotingHistory  = (answerId, pollId) => {

  return (dispatch, getState) => {

    const openPollId = getState().get('openPollId');

    // dispatch to update redux store
    dispatch({type: "UPDATE_VOTING_HISTORY", answerId, pollId} )

    // Write to device to save voteHistory
    const voteHistoryAsJS = getState().get('votingHistory').toJS();

    LocalStore.save('votingHistory', voteHistoryAsJS).then(() => {
      console.log("Updated Voting History")
    });

  }

}


export const clearVotingHistory  = () => {

  return (dispatch) => {
    // dispatch to update redux store
    dispatch({type: "CLEAR_VOTING_HISTORY"})

    LocalStore.save('votingHistory', {}).then(() => {
      console.log("Clear voting History");
    });

  }
}
export const loadVotingHistory = () => {

  return (dispatch) =>  {
    console.log("TRYING TO LOAD VOTE HISTORY")
    LocalStore.get('votingHistory').then( (votingHistory={}) => {
      dispatch({ type: "LOAD_VOTING_HISTORY", votingHistory})
    });

  }
}
export const setUserId = () => {
  return (dispatch) => {
    LocalStore.get('userId').then( (userId) => {

      return userId;

    }).then((userId) => {

      if(userId) {
        dispatch({type: "SET_USER_ID", userId});
      } else {
        const newUserId = guid();
         LocalStore.save('userId', newUserId).then( () => {
            dispatch({type: "SET_USER_ID", userId: newUserId});
        });
      }

    })
  }
}

export const removeUserId = () => {
  return (dispatch) => {
    LocalStore.delete('userId').then( () => {
      dispatch({type: "REMOVE_USER_ID"});
    });
  }
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}




