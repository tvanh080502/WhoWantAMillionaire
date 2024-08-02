import _ from 'lodash';

// Hàm để trích xuất token và sessionCookie từ response
const extractTokenFromResponse = (response) => {
  const headers = response.headers.raw();
  const cookies = headers['set-cookie'];

  let token, sessionCookie;

  if (cookies) {
    // Tìm token CSRF
    const tokenMatch = cookies.find(cookie => cookie.startsWith('XSRF-TOKEN='));
    if (tokenMatch) {
      token = _.first(tokenMatch.match(/XSRF-TOKEN=(.*?)%3D;/gm));
      if (token) {
        token = token.replace('XSRF-TOKEN=', '');
        token = _.first(token.split('%3D'));
        token = _.first(token.split('; '));
      }
    }

    // Tìm cookie session
    const sessionCookieMatch = cookies.find(cookie => cookie.startsWith('wwbm_session='));
    if (sessionCookieMatch) {
      sessionCookie = _.first(sessionCookieMatch.match(/wwbm_session=(.*?)%3D;/gm));
      if (sessionCookie) {
        sessionCookie = sessionCookie.replace('wwbm_session=', '');
        sessionCookie = _.first(sessionCookie.split('%3D'));
        sessionCookie = _.first(sessionCookie.split('; '));
      }
    }
  }

  return { token, sessionCookie };
};
  
// Hàm getQuestion
export const getQuestion = async (questionKey, t) => {
  const myHeaders = new Headers({
    'Connection': 'keep-alive',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8'
  });

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    credentials: 'include'
  };

  const url = `https://${t('host_url')}/game/get-question/${questionKey}`;
  // console.log('Request URL:', url);
  // console.log('Request Options:', requestOptions);

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      // throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Trích xuất dữ liệu từ phản hồi
    const result = {
      question: await response.json(),
      ...extractTokenFromResponse(response)
    };

    // console.log('Extracted result:', result); // Log kết quả để kiểm tra

    return result;
  } catch (error) {
    // console.error('[API] getQuestion error:', error);
    return undefined;
  }
};

// Hàm getCorrectedAnswer
export const getCorrectedAnswer = async (question, t, token, sessionCookie) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'X-XSRF-TOKEN': token,
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
        'Cookie': `wwbm_session=${sessionCookie}` 
      },
      body: JSON.stringify({ question }),
      credentials: 'include'
    };

    const url = `https://${('host_url')}/game/get-answer`;

    // console.log('Request URL:', url);
    // console.log('Request Options:', requestOptions);

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const errorText = await response.text();
      // console.error('Response Error Text:', errorText); // Log lỗi từ server
      // throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.text();
    // console.log('Response Text:', result); // Log phản hồi để kiểm tra

    return parseInt(result);
  } catch (error) {
    // console.error('[API] getCorrectedAnswer error:', error);
    return -1;
  }
};

// Hàm getHelp50
export const getHelp50 = async (question, t, token) => {
  try {
    const myHeaders = new Headers({
      'Accept': 'application/json, text/plain, */*',
      'X-XSRF-TOKEN': token,
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
    });

    // console.log('Token to send:', token); // Log token để kiểm tra
    // console.log('Question to send:', JSON.stringify({ question }, null, 2)); // Log nội dung question để kiểm tra

    const raw = JSON.stringify({ question });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      credentials: 'include'
    };

    const url = `https://${('host_url')}/game/get-help/h5050`;
    // console.log('Request URL:', url);
    // console.log('Request Options:', requestOptions);

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const errorText = await response.text();
      // console.error('Response Error Text:', errorText); // Log lỗi từ server
      // throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    // console.log('Response Text:', text); // Log phản hồi để kiểm tra

    try {
      const result = JSON.parse(text);
      // console.log('[API] get Help50: ', { result });
      return result;
    } catch (error) {
      // console.error('JSON parse error:', error); // Log lỗi parse JSON
      // throw new Error(`JSON Parse error: ${error}`);
    }
  } catch (error) {
    // console.error('[API] getHelp50 error:', error);
    // throw error;
  }
};

// Hàm getHelpHall
export const getHelpHall = async (question, t, token) => {
  try {
    const myHeaders = new Headers({
      'Accept': 'application/json, text/plain, */*',
      'X-XSRF-TOKEN': token,
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
    });

    // console.log('Token to send:', token); // Log token để kiểm tra
    // console.log('Question to send:', JSON.stringify({ question }, null, 2)); // Log nội dung question để kiểm tra

    const raw = JSON.stringify({ question });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw
    };

    const url = `https://${('host_url')}/game/get-help/hallHelp`;
    // console.log('Request URL:', url);
    // console.log('Request Options:', requestOptions);

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const errorText = await response.text();
      // console.error('Response Error Text:', errorText); // Log lỗi từ server
      // throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    // console.log('Response Text:', text); // Log phản hồi để kiểm tra

    return text;
  } catch (error) {
    // console.error('[API] getHelpHall failed: ', error);
    // throw error;
  }
};

// Hàm getHelpCallFriend
export const getHelpCallFriend = async (question, t, token) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json, text/plain, */*');
    myHeaders.append('X-XSRF-TOKEN', token);
    myHeaders.append('Content-Type', 'application/json;charset=UTF-8');
    myHeaders.append('Accept-Language', 'en-US,en;q=0.9,vi;q=0.8');
    myHeaders.append('Content-Type', 'text/plain');

    var raw = JSON.stringify({ question });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,

    };

    let url = `https://${('host_url')}/game/get-help/call-friend`;
    // console.log('[API] getHelpCallFriend: ', { url, raw });

    const response = await fetch(url, requestOptions);
    const result = await response.text();

    // console.log('[API] getHelpCallFriend: ', { result });
    return result;
  } catch (error) {
    // console.log('[API] getHelpCallFriend failed: ', { error });
    // throw error;
  }
};