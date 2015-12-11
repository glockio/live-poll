import LocalStore from 'react-native-simple-store';

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




