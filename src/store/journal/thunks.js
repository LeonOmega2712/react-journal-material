export const startNewNote = () => {
  return async (dispatch, getState) => {
    

    console.log(getState());
    // uid

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    // ! dispatch
    // dispatch(newNote)
    // dispatch(activarNote)
  };
};
