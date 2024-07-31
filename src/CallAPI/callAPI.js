import _ from 'lodash';

// Hàm để trích xuất token từ response
const extractTokenFromResponse = (response) => {
    const headers = response.headers;
    const cookie = headers.get('set-cookie');
    if (cookie) {
      let token = _.first(cookie.match(/XSRF-TOKEN=(.*?);/));
      if (token) {
        token = token.replace('XSRF-TOKEN=', '');
        token = _.first(token.split('%3D'));
        token = _.first(token.split('; '));
      }
      return token;
    }
    return undefined;
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
    console.log('Request URL:', url);
    console.log('Request Options:', requestOptions);
  
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = {
        question: await response.json(),
        token: extractTokenFromResponse(response)
      };
  
      console.log('Extracted result:', result); // Log kết quả để kiểm tra
  
      return result;
    } catch (error) {
      console.error('[API] getQuestion error:', error);
      return undefined;
    }
  };
  
//   // Hàm getCorrectedAnswer
//   export const getCorrectedAnswer = async (question, t, token) => {
//     try {
//       const requestOptions = {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json, text/plain, */*',
//           'X-XSRF-TOKEN': token,
//           'Content-Type': 'application/json;charset=UTF-8',
//           'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
//         },
//         body: JSON.stringify({ question }),
//         credentials: 'include'
//       };
  
//       const url = `https://${t('host_url')}/game/get-answer`;
  
//       console.log('Request URL:', url);
//       console.log('Request Options:', requestOptions);
  
//       const response = await fetch(url, requestOptions);
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('Response Error Text:', errorText); // Log lỗi từ server
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
  
//       const result = await response.text();
//       console.log('Response Text:', result); // Log phản hồi để kiểm tra
  
//       return parseInt(result);
//     } catch (error) {
//       console.error('[API] getCorrectedAnswer error:', error);
//       return -1;
//     }
//   };
  
  // Hàm getHelp50
  export const getHelp50 = async (question, t, token) => {
    try {
      const myHeaders = new Headers({
        'Accept': 'application/json, text/plain, */*',
        'X-XSRF-TOKEN': token,
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8'
      });
  
      console.log('Token to send:', token); // Log token để kiểm tra
      console.log('Question to send:', JSON.stringify({ question }, null, 2)); // Log nội dung question để kiểm tra
  
      const raw = JSON.stringify({ question });
  
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        credentials: 'include'
      };
  
      const url = `https://${t('host_url')}/game/get-help/h5050`;
      console.log('Request URL:', url);
      console.log('Request Options:', requestOptions);
  
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response Error Text:', errorText); // Log lỗi từ server
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const text = await response.text();
      console.log('Response Text:', text); // Log phản hồi để kiểm tra
  
      try {
        const result = JSON.parse(text);
        console.log('[API] get Help50: ', { result });
        return result;
      } catch (error) {
        console.error('JSON parse error:', error); // Log lỗi parse JSON
        throw new Error(`JSON Parse error: ${error}`);
      }
    } catch (error) {
      console.error('[API] getHelp50 error:', error);
      throw error;
    }
  };
// // Hàm getHelpHall
// export const getHelpHall = async (question, t, token) => {
//     try {
//       const myHeaders = new Headers({
//         'Accept': 'application/json, text/plain, */*',
//         'X-XSRF-TOKEN': token,
//         'Content-Type': 'application/json;charset=UTF-8',
//         'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8'
//       });
  
//       console.log('Token to send:', token); // Log token để kiểm tra
//       console.log('Question to send:', JSON.stringify({ question }, null, 2)); // Log nội dung question để kiểm tra
  
//       const raw = JSON.stringify({ question });
  
//       const requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw
//       };
  
//       const url = `https://${t('host_url')}/game/get-help/hallHelp`;
//       console.log('Request URL:', url);
//       console.log('Request Options:', requestOptions);
  
//       const response = await fetch(url, requestOptions);
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('Response Error Text:', errorText); // Log lỗi từ server
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
  
//       const text = await response.text();
//       console.log('Response Text:', text); // Log phản hồi để kiểm tra
  
//       return text;
//     } catch (error) {
//       console.error('[API] getHelpHall failed: ', error);
//       throw error;
//     }
//   };
  
//   // Hàm getHelpCallFriend
//   export const getHelpCallFriend = async (question, t, token) => {
//     try {
//       const myHeaders = new Headers({
//         'Accept': 'application/json, text/plain, */*',
//         'X-XSRF-TOKEN': token,
//         'Content-Type': 'application/json;charset=UTF-8',
//         'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
//         'Content-Type': 'text/plain'
//       });
  
//       console.log('Token to send:', token); // Log token để kiểm tra
//       console.log('Question to send:', JSON.stringify({ question }, null, 2)); // Log nội dung question để kiểm tra
  
//       const raw = JSON.stringify({ question });
  
//       const requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw
//       };
  
//       const url = `https://${t('host_url')}/game/get-help/call-friend`;
//       console.log('Request URL:', url);
//       console.log('Request Options:', requestOptions);
  
//       const response = await fetch(url, requestOptions);
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('Response Error Text:', errorText); // Log lỗi từ server
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
  
//       const text = await response.text();
//       console.log('Response Text:', text); // Log phản hồi để kiểm tra
  
//       return text;
//     } catch (error) {
//       console.error('[API] getHelpCallFriend failed: ', error);
//       throw error;
//     }
//   };
  