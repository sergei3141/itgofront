import axios from 'axios'

// const base = 'http://127.0.0.1:8000/api'
// const base = 'http://91.186.196.131/api'
const base = 'https://it-go.su:90/api'

export function auth (data) {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${base}/auth/login`,
    data:data

  };
  return(
    axios.request(config)
      .then(function (response) {
        localStorage.setItem('jwt', response.data.access_token)
        return response.data})
    .catch((error) => {
      console.log(error);
  }))
}

export function authMe () {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${base}/auth/me`,
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  };
  return(
    axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
  }))
}

export function getTable () {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${base}/v1/table`,
    // headers: { 
    //   'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    // }
  };
  return(
    axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
  }))
}

export function getGroupByUserId (id) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${base}/v1/users/${id}/groups`,
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  };
  return(
    axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
  }))
}

export function getLessonsByGroup (group_id) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${base}/v1/groups/${group_id}/lessons`,
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  };
  return(
    axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
  }))
}

export function getUsersByGroup (group_id) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${base}/v1/groups/${group_id}/users`,
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  };
  return(
    axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
  }))
}

export function getAllUsers () {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${base}/v1/users`,
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  };
  return(
    axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
  }))
}

export function getAllCourses () {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${base}/v1/courses`,
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  };
  return(
    axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
  }))
}

export function getCourseById (id) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${base}/courses/${id}`,
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  };
  return(
    axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
  }))
}

export function getAllGroups () {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${base}/v1/groups`,
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  };
  return(
    axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
  }))
}

export function getGroupsById (id) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${base}/v1/groups/${id}`,
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  };
  return(
    axios.request(config)
    .then((response) => {
      console.log(response)
      return response.data;
    })
    .catch((error) => {
      console.log(error);
  }))
}

export function getGroups (id) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${base}/v1/groups/courseId?course_id=${id}`,
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  };
  return(
    axios.request(config)
    .then((response) => {
      console.log(response)
      return response.data;
    })
    .catch((error) => {
      console.log(error);
  }))
}

export function createNewGroup (data) {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${base}/v1/groups`,
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    data:data
  };
  return(
    axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
  }))
}

export function createNewStudent (data) {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${base}/v1/users`,
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    data:data
  };
  return(
    axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
  }))
}

export function changeStudent (data, id) {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${base}/v1/users/${id}`,
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    data:data
  };
  return(
    axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
  }))
}

export function changeUsersTask (data, id) {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${base}/v1/users/${id}/task_completed`,
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    data:data
  };
  return(
    axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
  }))
}

export function getThemesByCoursesId (id) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${base}/v1/courses/${id}/themes`,
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  };
  return(
    axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
  }))
}

export function createNewLesson (data) {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${base}/v1/lessons`,
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    data:data
  };
  return(
    axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
  }))
}
