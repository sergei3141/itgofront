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

export function createTable (data) {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${base}/v1/table`,
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

export function changeTableById (id, data) {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${base}/v1/table/${id}`,
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    data:data
  };
  return(
    axios.request(config)
    .then((response) => {
      console.log(response)
      return response;
    })
    .catch((error) => {
      console.log(error);
  }))
}

export function deleteTableById (id) {
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `${base}/v1/table/${id}`,
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
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

export function getAllUsersAdminOnly (active) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${base}/v1/users/adminOnly?active=${active}`,
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

export function getAllUsersAccountantOnly (active, rowsPerPage, page, sort) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${base}/v1/users/adminOnly?active=${active}&perPage=${rowsPerPage}&page=${page}&sort=${sort}`,
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

export function changeGroupById (id, data) {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${base}/v1/groups/${id}`,
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    data:data
  };
  return(
    axios.request(config)
    .then((response) => {
      console.log(response)
      return response;
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

export function getExerciseById (id) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${base}/v1/exercises/${id}`,
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

export function getAllExercises () {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${base}/v1/exercises`,
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

export function createNewExercise (data) {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${base}/v1/exercises`,
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

export function changeExerciseById (data, id) {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${base}/v1/exercises/${id}`,
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

export function sendToTelegram(){}

export function createNewCourse (data) {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${base}/v1/courses`,
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

export function changeCourseById (data, id) {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${base}/v1/courses/${id}`,
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

export function deleteThemeById (id) {
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `${base}/v1/themes/${id}`,
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
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

export function changeThemeById (id, data) {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${base}/v1/themes/${id}`,
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

export function createNewTheme (data) {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${base}/v1/themes`,
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

export function createNewClient (data) {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${base}/v1/clients`,
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

export function getAllClients (num) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${base}/v1/clients?page=${num}`,
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
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

export function deleteClientById (id) {
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `${base}/v1/clients/${id}`,
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
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

export function getAdress () {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${base}/v1/contantmap`,
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
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

export function setAdress (data) {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${base}/v1/contantmap/1`,
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    data:data,
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

export function setTransaction (data) {
  debugger
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${base}/v1/transaction`,
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    data:data,
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

export function getTransactions (rowsPerPage, page, sort) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${base}/v1/transaction?perPage=${rowsPerPage}&page=${page}&sort=${sort}`,
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