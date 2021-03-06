import callApi from '../../util/apiCaller';

export function populateCourses(data) {
    return { type: "courses", coursesData: data };
}

export function getCourses() {
    return function (dispatch) {
      dispatch(() => { return { type: "wait" }; });
      return callApi("courses/").then(
        data => { dispatch(populateCourses(data)) }
      )
    }
} 